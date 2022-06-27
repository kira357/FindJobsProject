import { VMCreateChatRecruitment } from './../../../../core/model/chat/model/chat-recruitment';
import { ChatRecruitment } from '../../../../core/model/chat/model/chat-recruitment';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { HubName, MethodName } from 'src/app/core/base/hub-methods.enum';
import { VMGetCurrentUser } from 'src/app/core/model/user/model/model';
import { ApiAuthenService } from 'src/app/services/api-authen.service';
import { SignalrService } from 'src/app/services/signalr.service';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ChatRecruitmentService } from 'src/app/core/model/chat/chat-recruitment.service';
import { UserService } from 'src/app/core/model/user/User.service';
import { PagingParams } from 'src/app/core/model/paging-params';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiAuthenService: ApiAuthenService,
    private _signalRService: SignalrService,
    private chatRecruitmentService: ChatRecruitmentService,
    private userService: UserService,
    private _ngZone: NgZone
  ) {}
  currentUser: VMGetCurrentUser = {
    id: '',
    fullName: '',
    firstName: '',
    lastName: '',
    roleName: '',
    experience: '',
    nameMajor: '',
    idMajor: 0,
    urlAvatar: '',
    phoneNumber: '',
    address: '',
    email: '',
  };

  hubConnection: HubConnection;

  users: any;
  chatUser: any;
  messages: any[] = [];
  displayMessages: any[] = [];
  message: string;
  connectedUsers: any[] = [];
  pagingParams: PagingParams = new PagingParams();
  ngOnInit() {
    this.getCurrentUser();
    this.connectionSignalr();
  }
  data = localStorage.getItem('data');
  dataJson = JSON.parse(this.data || '');
  getCurrentUser() {
    const dataJson = JSON.parse(this.data || '');
    this.apiAuthenService
      .RequestGetCurrentUser(dataJson.data.id)
      .subscribe((data: any) => {
        this.currentUser = data[0];
      });
  }

  connectionSignalr() {
    const dataJson = JSON.parse(this.data || '');
    this.chatRecruitmentService
      .getUserReceivedMessages(dataJson.data.id)
      .subscribe((item: any) => {
        if (item) {
          this.messages = item.result;
          this.messages.forEach((x: any) => {
            x.type = x.receiver === dataJson.data.id ? 'recieved' : 'sent';
          });
        }
      });
    this.pagingParams.currentPage = 0;
    this.pagingParams.pageSize = 100;
    this.pagingParams.totalRows = 0;

    this.userService.RequestGetAllListWithNoRole(this.pagingParams).subscribe(
      (user: any) => {
        if (user) {
          this.users = user.data.filter((x: any) => x.id !== dataJson.data.id);
          this.users.forEach((item: any) => {
            item['isActive'] = false;
          });
          this.makeItOnline();
        }
      },
      (err) => {
        console.log(err);
      }
    );

    this.message = '';
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.apis.default.url}/${HubName.Chatting}`)
      .withAutomaticReconnect()
      .build();
    const self = this;
    this.hubConnection
      .start()
      .then(() => {
        self.hubConnection
          .invoke(
            'PublishUserOnConnect',
            dataJson.data.id,
            dataJson.data.userName
          )
          .then(() => console.log('User Sent Successfully'))
          .catch((err) => console.error(err));

        this.hubConnection.on('BroadcastUserOnConnect', (Usrs) => {
          this.connectedUsers = Usrs;
          this.makeItOnline();
        });
        this.hubConnection.on('BroadcastUserOnDisconnect', (Usrs) => {
          this.connectedUsers = Usrs;
          this.users.forEach((item: any) => {
            item.isOnline = false;
          });
          this.makeItOnline();
        });
      })
      .catch((err) => console.log(err));

    // this.hubConnection.on("UserConnected", (connectionId) => this.UserConnectionID = connectionId);

    this.hubConnection.on('BroadCastDeleteMessage', (connectionId, message) => {
      let deletedMessage = this.messages.find((x) => x.id === message.id);
      if (deletedMessage) {
        deletedMessage.isReceiverDeleted = message.isReceiverDeleted;
        deletedMessage.isSenderDeleted = message.isSenderDeleted;
        if (
          deletedMessage.isReceiverDeleted &&
          deletedMessage.receiver === this.chatUser.id
        ) {
          this.displayMessages = this.messages.filter(
            (x) =>
              (x.type === 'sent' && x.idReceiver === this.chatUser.id) ||
              (x.type === 'recieved' && x.idSender === this.chatUser.id)
          );
        }
      }
    });

    this.hubConnection.on('ReceiveDM', (connectionId, message) => {
      console.log("123 ReceiveDM",message);
      message.type = 'recieved';
      this.messages.push(message);
      let curentUser = this.users.find((x: any) => x.id === message.idSender);
      this.chatUser = curentUser;
      this.users.forEach((item: any) => {
        item['isActive'] = false;
      });
      var user = this.users.find((x: any) => x.id == this.chatUser.id);
      user['isActive'] = true;
      this.displayMessages = this.messages.filter(
        (x) =>
          (x.type === 'sent' && x.idReceiver === this.chatUser.id) ||
          (x.type === 'recieved' && x.idSender === this.chatUser.id)
      );
    });
  }

  SendDirectMessage() {
    const dataJson = JSON.parse(this.data || '');
    if (this.message != '' && this.message.trim() != '') {
      let guid = Guid.create();
      var msg = {
        idChat: guid.toString(),
        idSender: dataJson.data.id,
        idReceiver: this.chatUser.id,
        timeSend: new Date(),
        type: 'sent',
        messages: this.message,
      };
      this.messages.push(msg);
      let messString = JSON.stringify(msg);
      this.displayMessages = this.messages.filter(
        (x) =>
          (x.type === 'sent' && x.idReceiver === this.chatUser.id) ||
          (x.type === 'recieved' && x.idSender === this.chatUser.id)
      );

      this.hubConnection
        .invoke('SendMessageToUser', messString)
        .then(() => console.log('Message to user Sent Successfully'))
        .catch((err) => console.error(err));
      this.message = '';
    }
  }

  openChat(user: any) {
    console.log("openChat",user);
    this.users.forEach((item: any) => {
      item['isActive'] = false;
    });
    user['isActive'] = true;
    this.chatUser = user;
    this.displayMessages = this.messages.filter(
      (x) =>
        (x.type === 'sent' && x.idReceiver === this.chatUser.id) ||
        (x.type === 'recieved' && x.idSender === this.chatUser.id)
    );
    if(this.displayMessages.length == 0){
    this.chatRecruitmentService.getAllMessage(this.pagingParams).subscribe((item:any) =>{
      console.log("getAllMessage",item);
      if (item.result.data.length > 0) {
        console.log("getAllMessage",item.result.data);
        this.messages = item.result.data;
        this.messages.forEach((x: any) => {
          x.type = x.idReceiver === this.dataJson.data.id ? 'recieved' : 'sent';
        });
        this.displayMessages = this.messages.filter(
          (x) =>
            (x.type === 'sent' && x.idReceiver === this.chatUser.id) ||
            (x.type === 'recieved' && x.idSender === this.chatUser.id)
        );
      }
    })
    }
    console.log("displayMessages",this.displayMessages);

  }

  makeItOnline() {
    if (this.connectedUsers && this.users) {
      this.connectedUsers.forEach((item) => {
        var u = this.users.find((x: any) => x.fullName == item.fullName);
        if (u) {
          u.isOnline = true;
        }
      });
    }
  }
}
