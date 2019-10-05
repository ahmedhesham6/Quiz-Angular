import { Component, OnInit } from '@angular/core';
import { QuizApiService } from '../../services/quiz-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  constructor(private quizService:QuizApiService) { }
  public selectedQuiz=[];
  router:Router;
  selectChangeHandler(event:any , id:number){
    this.selectedQuiz[id]=event.target.value;
  }
  ignite(){
    this.quizService.setQuizAtt(this.selectedQuiz);
  }
  ngOnInit() {
  }

}
