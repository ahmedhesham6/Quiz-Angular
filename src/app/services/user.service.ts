import { Injectable } from '@angular/core';
import { Subject , Observable}    from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../user'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
 
const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private myRoute: Router) { }
  usersUrl:string='https://reqres.in/api/users?';
  private currentUser= new Subject<User>();
  $currentUser=this.currentUser.asObservable();

  sendToken(token: string, id:string) {
    localStorage.setItem("LoggedInUser", token)
    localStorage.setItem("id", id);
  }
  getToken() {
    return localStorage.getItem("LoggedInUser")
  }
  getAdToken(){
    return localStorage.getItem("id");
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }
  isAdminLoggedIn(){
    return (this.getAdToken()=="1");
  }
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem("LoggedInUser");
        localStorage.removeItem("id");
        this.myRoute.navigate(["home"]);
        Swal.fire(
          'See you again!',
          'Your are logged out.',
          'success'
        )
      }
    })

  }

  setCurrentUser(title:User){
    this.currentUser.next(title);
  }

  getUsers():Observable<any>{
    return this.http.get<User>(`${this.usersUrl}`);
  }
  getPage(page:number):Observable<any>{
    return this.http.get<User>(`${this.usersUrl}page=${page}`);
  }

}
