import { VMCreateChatRecruitment } from './../../../../core/model/chat/model/chat-recruitment';
import { ChatRecruitment } from '../../../../core/model/chat/model/chat-recruitment';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { HubName, MethodName } from 'src/app/core/base/hub-methods.enum';
import { VMGetCurrentUser } from 'src/app/core/model/user/model/model';
import { ApiAuthenService } from 'src/app/services/api-authen.service';
import { SignalrService } from 'src/app/services/signalr.service';

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
    private _ngZone: NgZone
  ) {}
  chatMessages = new Array<VMCreateChatRecruitment>();
  onlineUser: any[] = [];
  chatUsername: any;
  txtMessage: string = '';
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

  users:any;
  chatUser:any;

  messages: any[] = [];
  displayMessages: any[] = []
  message: string
  connectedUsers: any[] = []
  messageCreated = this.formBuilder.group({
    message: '',
  });
  ngOnInit() {
    this.getCurrentUser();
    this._signalRService.OnAskServerListener(
      HubName.Chatting,
      MethodName.SendMessage
    );
    this.receiveMessage();
  }
  data = localStorage.getItem('data');
  getCurrentUser() {
    const dataJson = JSON.parse(this.data || '');
    this.apiAuthenService
      .RequestGetCurrentUser(dataJson.data.id)
      .subscribe((data: any) => {
        this.currentUser = data[0];
      });
  }

  SendMessage() {
    if (this.txtMessage) {
     
      this._signalRService.OnAskServerInvoke( this.txtMessage , this.currentUser.id);
      // this.chatMessages.push(this.message);
      this.txtMessage = '';
    }
  }
  receiveMessage() {
    this._signalRService.Message$.subscribe((data: any) => {
      console.log('123', data);
      this._ngZone.run(() => {
        if (this.currentUser.id !== data.idSender) {
          // this.message.type = 'received';
          this.chatMessages.push(data);
        }
      });
    });
  }
}
