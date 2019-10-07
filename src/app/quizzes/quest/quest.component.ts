import { Component, OnInit } from '@angular/core';
import { QuizApiService} from '../../services/quiz-api.service'
import {Router,ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit {

  private routeSub: Subscription;
  public QuestList:any=[];
  public QuestId:number;
  public Answers=[];
  public Correct:number=0;

  constructor(private _quizService:QuizApiService,private router: ActivatedRoute) {
    
   }
  getQuestion(id:number){
    
    if(this.QuestId==0){
    this.Answers=[this.QuestList.results[this.QuestId].incorrect_answers[0],this.QuestList.results[this.QuestId].incorrect_answers[1],this.QuestList.results[this.QuestId].incorrect_answers[2],this.QuestList.results[this.QuestId].correct_answer];
    //this.Answers=this.shuffleArray(this.Answers);
    }
    return this.QuestList.results[id].question;
    
  }
  getAnswer(id:number,q:number){
    return this.QuestList.results[id].incorrect_answers[q];
    
  }
  getCrctAnswer(id:number){
    return this.QuestList.results[id].correct_answer;
  }

  getAns(id:number):string{
    return this.Answers[id];
  }
  UpdateAns(){
    this.Answers=[this.getAnswer(this.QuestId+1,0),this.getAnswer(this.QuestId+1,1),this.getAnswer(this.QuestId+1,2),this.getCrctAnswer(this.QuestId+1)];
    this.Answers=this.shuffleArray(this.Answers);
  }
  nextQuest(Ans:string){
    console.log(Ans);
    console.log(this.getCrctAnswer(this.QuestId));
    for(var i=1;i<5;i++)document.getElementById(`btn${i}`).blur();
    if(Ans==this.getCrctAnswer(this.QuestId))this.Correct+=1;
    if(this.QuestId+1>=10){
      Swal.fire({
        title: '<strong>Result</strong>',
        type: 'success',
        html:
          'You got ' + this.Correct +
          ' answers correct out of 10 ',
        showCloseButton: false,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<a href="" style="color:#fff;"><i class="fa fa-thumbs-up"></i>Done!</a>',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '<a href="/quiz" style="color:#fff;"><i class="fa fa-refresh"></i>Try again</a>',
        cancelButtonAriaLabel: 'Thumbs down'
      })
    }
    else{
      this.UpdateAns();
    }
  }
  shuffleArray(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  ngOnInit() {     
    this._quizService.getQuest()
    .subscribe(item => this.QuestList = item); 
    this.routeSub = this.router.params.subscribe(params => {
           console.log(params) //log the entire params object
          console.log(params['id'])
          this.QuestId=+params['id']; //log the value of id
      });
    
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
