import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule , routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { QuestComponent } from './quizzes/quest/quest.component';
import { QuizApiService } from './services/quiz-api.service'
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UsersListComponent } from './users-list/users-list.component';
import { UserService }from './services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    QuestComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule,
    NgbModule
  ],
  providers: [
    QuizApiService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
