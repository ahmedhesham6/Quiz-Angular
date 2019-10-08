import { Component,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'usersList',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  closeResult: string;
  users;
  currentUser=new User;

  constructor(private modalService: NgbModal,private _userService:UserService) {}
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  Add(){
    this.currentUser.id=1;
    if(this.users.data.length!=0)this.currentUser.id=this.users.data[this.users.data.length-1].id+1;
    this.users.data.push(this.currentUser);
    console.log(this.users.data);
    this._userService.addUser(this.currentUser);
    this.currentUser= new User;
  }
  Edit(id:number){
    let x;
    console.log(id);
    this.users.data.forEach((element,index) => {
      if (element.id==id){
        this.users.data[index].first_name=this.currentUser.first_name;
        this.users.data[index].last_name=this.currentUser.last_name;
        this.users.data[index].email=this.currentUser.email;
        x=index;
      }      
    });
    this._userService.editUser(this.users.data[x]);
    this.currentUser= new User;
  }
  Delete(user:User){
    this.users.data = this.users.data.filter(t=> t.id !=user.id);
    this._userService.deleteUser(user);
  }
  setValue(user){
    this.currentUser.first_name=user.first_name;
    this.currentUser.email=user.email;
    this.currentUser.last_name=user.last_name;
    //this.currentUser.id=user.id;
    //console.log(this.currentUser);
  }
  ngOnInit() {
    this._userService.getPage(1)
    .subscribe(item => this.users = item);
  }
}

