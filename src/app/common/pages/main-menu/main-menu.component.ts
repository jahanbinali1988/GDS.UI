import { Component, OnInit } from '@angular/core';
// declare function mainMenuAction(): any;
import { mainMenuAction } from '../../../../assets/js/mainMenu';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    mainMenuAction();
  }
}
