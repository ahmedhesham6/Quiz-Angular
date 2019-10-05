import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { QuestComponent } from './quizzes/quest/quest.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthGuard }from './Auth/auth.guard';
import {AdminGuard}from './Auth/admin.guard';

const routes: Routes = [
  {path:'quiz', component:QuizComponent ,canActivate: [AuthGuard]},
  {path:'quiz/:id', component:QuestComponent ,canActivate: [AuthGuard]},
  {path:'login' , component:LoginComponent},
  {path: 'users', component:UsersListComponent,canActivate: [AdminGuard] },
  {path:'home',component:HomeComponent},
  {path:'', component:HomeComponent ,  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =  [HomeComponent,LoginComponent,QuizComponent];
