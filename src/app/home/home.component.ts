import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  template: `
  <header>
  <!-- Slide One - Set the background image for this slide in the line below -->
  <div class="carousel-item active" style="background-image: url('https://source.unsplash.com/LAaSoL0LrYs/1920x1080')">
    <div class="carousel-caption d-none d-md-block">
      <h2 class="display-4">Quiz</h2>
      <p class="lead">Test your knowledge in various categories.</p>
    </div>
   </div>
   </header>
  `,
  styles: [`.carousel-item {
    height: 100vh;
    min-height: 350px;
    background: no-repeat center center scroll;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }`]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
