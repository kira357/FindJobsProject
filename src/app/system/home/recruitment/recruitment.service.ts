import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from 'src/app/core/model/user/model/model';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {
    // currentUser$: BehaviorSubject<UserDto> = new BehaviorSubject<UserDto>();
    avatarImageUrl$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    currentImage$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    flagSaved$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);  
}