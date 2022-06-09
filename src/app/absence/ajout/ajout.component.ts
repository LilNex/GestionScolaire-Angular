import { Component, OnInit } from '@angular/core';
import { angularMaterialRenderers } from "@jsonforms/angular-material";
// import { SupabaseClient } from '@supabase/supabase-js';
import { NotifierService } from 'angular-notifier';
import{AuthChangeEvent, createClient, Session, SupabaseClient, User} from '@supabase/supabase-js';

import * as formSchema from './formSchema.json';
import * as uiSchema from './uiSchema.json';
import { environment } from 'src/environments/environment';

export interface IAbsence{
  nom :string,
  date :string,
  justifie:boolean,
  idEtudiant:number,
  justification:string,

}
@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.sass']
})
export class AjoutComponent implements OnInit {

  private readonly notifier: NotifierService;

  renderers = angularMaterialRenderers;
  supabaseClient:SupabaseClient;

  constructor(notifierService: NotifierService) {
    this.supabaseClient = createClient(environment.supabase_url, environment.supabase_key);
    this.notifier = notifierService;

   }

   data:IAbsence={
    nom :'',
    date :'',
    justifie:false,
    idEtudiant:-1,
    justification:'',
   };
   uischema = uiSchema;
   schema = formSchema;

  // constructor() { }

  ngOnInit(): void {
  }

  async addNewAbsence(){
    this.notifier.notify('success',"test");
    console.log(this.data);
    var res = await this.supabaseClient.from('absence').insert([
      this.data
    ]);
    console.log(res);
    
    
  }

}
