import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  loggedInUser = JSON.parse(localStorage.getItem('login-user')!);
  public chatUser = new BehaviorSubject<string>('');
  selectedchatUser = this.chatUser.asObservable();
  public selectedThemeColor = new BehaviorSubject<string>(
    this.loggedInUser.theme
  );
  selectedThemeColorChanged = this.selectedThemeColor.asObservable();
  updateSelectedThemeChanged(state: string): void {
    this.selectedThemeColor.next(state);
  }
  currentChatUser(state: string): void {
    this.chatUser.next(state);
  }
}