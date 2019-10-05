import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  userModel= new User();
  check;
  constructor(private _userService:UserService,private myRoute: Router) { }
  
  regSubmit(){
    this.userModel.id=this.check.data.length+1;
    this.check.data.push(this.userModel);
    this.userModel=new User;
    console.log(this.check);
    Swal.fire({
      title:'Registered Successfully',
      type:'success'
    })
  }
  logSubmit(){
    this.checkUser();
    if(this.userModel.id>0){
      this._userService.setCurrentUser(this.userModel);      
      this._userService.sendToken(this.userModel.first_name,`${this.userModel.id}`);
      Swal.fire({
      title: `Welcome ${this.userModel.first_name}`,
      type:'success',
      confirmButtonText:
        '<a href="">Confirm</a>',
    })}
    else{
      console.log(this.userModel);
      console.log(this.check);
      this.userModel=new User;
      Swal.fire({
        title: 'User not found!',
        text:'Please try again',
        type:'error',
        confirmButtonColor:'Red'
      })
    }
  }
  checkUser(){
    this.check.data.forEach(element => {
      console.log(element.first_name);
      if((element.first_name.toLowerCase()==this.userModel.first_name.toLowerCase())&&(element.last_name.toLowerCase()==this.userModel.last_name.toLowerCase())){
        this.userModel=element;
      }
    });
  }

  ngOnInit() {
    this._userService.getUsers()
    .subscribe(item => this.check = item); 
  }

}
