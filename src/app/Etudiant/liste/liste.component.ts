import { Component, OnInit } from '@angular/core';
import{AuthChangeEvent, createClient, Session, SupabaseClient, User} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { angularMaterialRenderers } from "@jsonforms/angular-material";

// import * as formSchema from './formSchema.json';
// import * as uiSchema from './uiSchema.json';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.sass']
})
export class ListeComponent implements OnInit {

  supabaseClient:SupabaseClient;
  constructor() { 
    this.supabaseClient = createClient(environment.supabase_url, environment.supabase_key);

  }

  ngOnInit(): void {
  }

  async search(){
   let  {data,error} =await this.supabaseClient.from('etudiant').select('*');
   console.log(data);
   
  }

}
