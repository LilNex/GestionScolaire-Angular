import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.sass']
})
export class AjoutComponent implements OnInit {

  heading = 'Form Controls';
  subheading = 'Wide selection of forms controls, using the Bootstrap 5 code base, but built with Vue.';
  icon = 'pe-7s-display1 icon-gradient bg-premium-dark';


  constructor() { }

  ngOnInit(): void {

  }

}
