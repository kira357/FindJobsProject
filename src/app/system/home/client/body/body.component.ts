import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  
  constructor() { }
  timePost :any [] = ['Laster post', 'New post', 'Old post'];
  ngOnInit() {
  }

}
