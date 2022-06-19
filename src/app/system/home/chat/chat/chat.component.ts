import { Component, OnInit } from '@angular/core';
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
    private _signalRService : SignalrService
  ) {}
  chatMessages: any[] = [];
  onlineUser: any[] = [];
  chatUsername: any;
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
  messageCreated = this.formBuilder.group({
    message: '',
  });
  ngOnInit() {
    this.getCurrentUser();
    this._signalRService.OnAskServerListener(
      HubName.Chatting,
      MethodName.SendMessage
    );
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
  sendMessage(msg: any) {
    const data = this.messageCreated.value;
    this.chatMessages.push({
      Msg: data.message,
      DateSend: moment(),
      messagestatus: 'received',
      IdUser : this.currentUser.id
    });
    const dataSend = {
      Msg: data.message,
      DateSend: moment(),
      messagestatus: 'received',
      IdUser : this.currentUser.id
    };
    this._signalRService.OnAskServerInvoke(dataSend);
  }
  receiveMessage(msg: any) {
  console.log('123', msg);
  }
}
