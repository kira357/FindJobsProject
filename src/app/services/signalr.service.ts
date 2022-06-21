import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as signalR from '@microsoft/signalr';
import { MethodName } from '../core/base/hub-methods.enum';
import { ChatRecruitment } from '../core/model/chat/model/chat-recruitment';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;
  private mapHubs: Map<string, signalR.HubConnection> = new Map();
  Message$: BehaviorSubject<ChatRecruitment> = new BehaviorSubject<ChatRecruitment>({} as ChatRecruitment);
  connectionEstablished = new EventEmitter<Boolean>();  
  constructor() {}

  get hub() {
    return this.hubConnection;
  }
  private HubConnection = (hubName: string) => {
    return (this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apis.default.url}/${hubName}`, {
        // headers: {
        //     'Authorization': `Bearer ${token}`,
        //     'Accept-Language': this.sessionState.getLanguage()
        // }
        // accessTokenFactory: () => this.oAuthService.getAccessToken()
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .configureLogging(signalR.LogLevel.Trace)
      .build());
  };

  data: any[] = [];
  OnStartToConnection = async () => {
    try {
      await this.hubConnection.start();
      if (this.hubConnection.state === signalR.HubConnectionState.Connected)
        console.log('SignalR Connected.');
        this.connectionEstablished.emit(true);  
      return true;
    } catch (err) {
      if (this.hubConnection.state === signalR.HubConnectionState.Disconnected)
        console.log(err);
      setTimeout(() => this.OnStartToConnection, 5000);
      return false;
    }
  };

  private async handleHubConnection(
    hubName: string,
    methodName: string,
    restartTime: number = 5000
  ) {
    if (this.mapHubs.has(hubName)) {
      const _hub = this.mapHubs.get(hubName);
      this.handleHubMethod(methodName);
      if (_hub.state != signalR.HubConnectionState.Connected) {
        const _isConnected = await this.OnStartToConnection();
        if (_isConnected) {
          _hub.onclose((error) => {
            console.log(error);
            this.onReconnected(hubName, methodName, restartTime);
          });
        } else {
          this.onReconnected(hubName, methodName, restartTime);
        }
      } else {
      }
    } else {
      console.log('Not found -- Cannot handle hub: ' + hubName);
    }
  }

  private handleHubMethod(methodName: string) {
    this.hubConnection.off(methodName);
    this.hubConnection.on(methodName, data => {
        const parseData = JSON.parse(data);
        switch (methodName) {
            case MethodName.SendMessage:
                const { IdChat, IdSender, IdReceiver,Messages,TimeSend ,ConnectionId} = parseData.Data;
                const Message: ChatRecruitment = { idChat : IdChat, idSender: IdSender, idReceiver: IdReceiver, messages : Messages, timeSend : TimeSend , connectionId : ConnectionId};
                this.Message$.next(Message);
                break;
        }
    });
}

  private onReconnected(
    hubName: string,
    methodName: string,
    _after: number = 5000
  ) {
    if (this.mapHubs.has(hubName) && _after > 0) {
      const _hub = this.mapHubs.get(hubName);
      if (_hub.state != signalR.HubConnectionState.Connected) {
        setTimeout(
          () => this.handleHubConnection(hubName, methodName, _after),
          _after
        );
      }
    } else {
      console.log('Not found / Disable  -- Cannot reconnect hub: ' + hubName);
    }
  }

  OnAskServerListener = async (
    hubName: string,
    methodName: string,
    restartTime: number = 5000
  ) => {
    if (this.mapHubs.has(hubName)) {
      return this.mapHubs.get(hubName);
    } else {
      const _hub = this.HubConnection(hubName);
      this.mapHubs.set(hubName, _hub);
      await this.handleHubConnection(hubName, methodName, restartTime);
      return _hub;
    }
  };

  OnAskServerInvoke = (message : any) => {
    this.hubConnection
      .invoke('SendMessage', message)
      .then((data) => console.log('Invoke success' , data))
      .catch((err) => console.log('Invoke fail ', err));
  };

  onDisconnect = () => {
    this.hubConnection.onclose(() => {
      console.log('Connection closed');
    });
  };
}
