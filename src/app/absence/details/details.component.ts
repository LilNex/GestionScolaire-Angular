import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-absence-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {

@Input() idAbsence;

  isJustifie:boolean = false;
  justification:string = "";


  constructor() { }

  ngOnInit(): void {
  }

  submitJustif(a:any,b:any){
    console.log("ISjustif : " + a);
    console.log("justif : " + b);
    
  }

}
