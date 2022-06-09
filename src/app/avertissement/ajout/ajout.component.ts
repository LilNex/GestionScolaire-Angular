import { Component, OnInit } from '@angular/core';
import { angularMaterialRenderers } from "@jsonforms/angular-material";
// import { SupabaseClient } from '@supabase/supabase-js';
import { NotifierService } from 'angular-notifier';
import{AuthChangeEvent, createClient, Session, SupabaseClient, User} from '@supabase/supabase-js';

import * as formSchema from './formSchema.json';
import * as uiSchema from './uiSchema.json';
import { environment } from 'src/environments/environment';

export interface IAvertissement{
  idEtudiant :string,
  motif :string,
  severite :string,
  date:string,

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

  data:IAvertissement={
    idEtudiant :'',
    motif :'',
    severite :'',
    date:'',
   };
   uischema = uiSchema;
   schema = formSchema;


  constructor(notifierService: NotifierService) {
    this.supabaseClient = createClient(environment.supabase_url, environment.supabase_key);
    this.notifier = notifierService;
    // this.ngOnInit();
   }



   async ngOnInit() {
    var res = await this.supabaseClient.from('etudiant').select('nom,prenom');
    var arr = [];
    if (typeof(res.data[0].nom) === 'string' && typeof(res.data[0].prenom) === 'string') {
      res.data.forEach(element => {
        arr.push(element.nom + " " + element.prenom);
        var fullName = element.nom + " " + element.prenom;
        console.log('pushing : '+ fullName);
        
        this.schema.properties.idEtudiant.enum.push(element.nom + " " + element.prenom);

      });

    }

    
    // console.log(res.data);
    // this.schema = this.schema.properties.idEtudiant.enum.(arr);
  }

  async addNewAvertissement(){
    this.notifier.notify('success',"test");
    console.log(this.data);
    var res = await this.supabaseClient.from('avertissement').insert([
      this.data
    ]);
    console.log(res);
    
    
  }

}
