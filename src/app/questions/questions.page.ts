import { Component, OnInit, ɵoverrideProvider } from '@angular/core';
import {AccordionComponent} from '../widgets/accordion/accordion.component'
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  data: any;
  title: string;
  relLen: string;
  questions: any[];
  tipps: any[];
  message: string;

  constructor(public _auth: AngularFireAuth, public _store: AngularFirestore, public _activeRoute: ActivatedRoute,
    public _service: DataService, public _nav: NavController, public _alert: AlertController) { 
  }

  ngOnInit() {
    this._activeRoute.queryParams.subscribe((res)=>{
      this.title = res.name;
    });
    let data = this._store.collection('user').doc(this._auth.auth.currentUser.uid).get().subscribe(
      async (res) => {
        this.relLen = await res.data().relationshipLength;
        console.log(this.relLen);
        this.getQuestions();
      }
    );
    
  }



  async getQuestions(){
    this.data = await this._service.load("4+");
    let q = [];
    let t = [];


    for(let el of this.data){
      if(el["type"]==this.title){
        console.log(el);
        q.push(el["text"]);
        if(el["tips"]["listitems"]){
          t.push([el["tips"]["text"], el["tips"]["listitems"]]);
        } else{
          t.push(el["tips"]["text"]);
        }
      }
      console.log(t);
      
    }
    console.log(t);
    this.questions = q;
    this.tipps = t;

  }

  back(){
    this._nav.back();
  }

  async tipp(question: string){
    let position = this.getPosition(question);
    if(this.tipps[position][1]){
      this.message = this.tipps[position][0];
      this.message += "<ul>"
      for(let l of this.tipps[position][1]){
        this.message += "<li>" + l + "</li>"
      }
      this.message += "</ul>"

    }else{
      this.message = this.tipps[position];
    }
    const alert = await this._alert.create({
      header: 'Tipp',
      message: this.message,
      buttons: ['Okay']
    });

    await alert.present();
  }

  getPosition(text: string): number{
    let fin = 0;
    for(let p = 0; p < this.questions.length; p++){
      if(this.questions[p]==text){
        fin = p;
      }
    }
    return fin;
  }

}
