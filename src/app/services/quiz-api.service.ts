import { Injectable } from '@angular/core';
import { Subject , Observable}    from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'


const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class QuizApiService {

  constructor(private http:HttpClient) { }
  private quizAtt=[undefined,undefined];
  questionsUrl:string='https://opentdb.com/api.php?amount=10';

  combine():string{
    let finalUrl=this.questionsUrl;
    if(this.quizAtt[0]!=undefined){finalUrl+=`&category=${this.quizAtt[0]}`;}
    if(this.quizAtt[1]!=undefined){finalUrl+=`&difficulty=${this.quizAtt[1]}`;}
    finalUrl+=`&type=multiple`;
    console.log(finalUrl);
    return finalUrl;
  }
  getQuest():Observable<any>{
    return this.http.get<any>(this.combine());
  }
  setQuizAtt(item){
    this.quizAtt=item;
  }
}

