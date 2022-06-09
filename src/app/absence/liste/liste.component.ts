import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.sass']
})
export class ListeComponent implements OnInit {

  idAbsence = 1;

  constructor() { }

  ngOnInit(): void {
  }

  getDetail():void{
    console.log('test');
    
  }

}
