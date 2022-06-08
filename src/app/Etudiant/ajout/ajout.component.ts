import { Component, OnInit } from '@angular/core';
import{AuthChangeEvent, createClient, Session, SupabaseClient, User} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { angularMaterialRenderers } from "@jsonforms/angular-material";

import * as formSchema from './formSchema.json';
import * as uiSchema from './uiSchema.json';
import { NotifierService } from 'angular-notifier';


export interface IUser {
  nom: string;
  prenom:string;
  
  
}
export interface IEtudiant{
  nom :string,
  prenom :string,
  dateNaissance:string,
  telEtudiant:string,
  nomPere:string,
  metierPere:string,
  telPere:string,
  nomMere:string,
  metierMere:string,
  telMere:string,
}
@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.sass']
})
export class AjoutComponent implements OnInit {

  heading = 'Ajouter un étudiant';
  subheading = 'Entrez les informations du nouvel étudiant et ceux des parents.';
  icon = 'pe-7s-display1 icon-gradient bg-premium-dark';

  private readonly notifier: NotifierService;

  ngOnInit(): void {

  }
  renderers = angularMaterialRenderers;
  supabaseClient:SupabaseClient;
  constructor(notifierService: NotifierService) {
    this.supabaseClient = createClient(environment.supabase_url, environment.supabase_key);
    this.notifier = notifierService;

   }

  uischema = uiSchema;
  schema = formSchema;
  data:IEtudiant={
    nom :'',
  prenom :'',
  dateNaissance:'',
  telEtudiant:'',
  nomPere:'',
  metierPere:'',
  telPere:'',
  nomMere:'',
  metierMere:'',
  telMere:'',
  };


  async addNewEtudiant(){
    this.notifier.notify('success',"test");
    console.log(this.data);
    var res = await this.supabaseClient.from('etudiant').insert([
      this.data
    ]);
    console.log(res);
    
    
  }

}
