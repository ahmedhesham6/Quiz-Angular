import { Component, OnInit } from '@angular/core';
import { UserService }from '../services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public _userService:UserService) { }

  ngOnInit() {
  }

}
