import {Component, HostListener, OnInit} from '@angular/core';

const TOOLBAR_HEIGHT = 64;

@Component({
    templateUrl: 'home.component.html' ,
    styleUrls: ['home.component.css']
  })
export class HomeComponent implements OnInit {

  screenHeight: number;

  constructor() {}

  ngOnInit() {
    this.screenHeight = window.innerHeight - TOOLBAR_HEIGHT;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenHeight = window.innerHeight - TOOLBAR_HEIGHT;
  }
}

