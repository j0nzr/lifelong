import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from '../data.service';
import { Slides } from 'ionic-angular';
import { Router } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  @ViewChild('slides', {static: false}) slides: Slides;

  public relLength: string;
  public relDate: Date;
  public questions: any;
  public slider: any;
  public uid: string;
  public answer;
  
  


  constructor(public _store: AngularFirestore, public _data: DataService, public _auth: AngularFireAuth, public _nav: Router, 
    public _date: DatePicker) { 
    this.uid = this._auth.auth.currentUser.uid;
    console.log(this.uid);
  }

  ngOnInit() {
  }

  start(dClass: string)
  {
    document.getElementsByClassName(dClass)[0].setAttribute("style", "display: none");
    document.getElementsByClassName('start')[0].setAttribute("style", "display: block");

    this.addAnswerFieldsToDatabase();
  }

  test(dClass: string)
  {
    document.getElementsByClassName(dClass)[0].setAttribute("style", "display: none");
    document.getElementsByClassName('test')[0].setAttribute("style", "display: block");
  }

  addAnswerFieldsToDatabase()
  {
    //Add Fields for answer categories to Database
    this._store.collection('user').doc(this.uid).update({
      communication: 0,
      honestyTrust: 0,
      needs: 0,
      personality: 0,
      physical: 0,
      time: 0,
      valuesDreams: 0
    });
  }

  async relationshipLength(event)
  {
    this.relLength = event.detail.value;
    //Add Data to Database
    this._store.collection('user').doc(this.uid).update({
      relationshipLength: this.relLength
    });

    //Load JS-File
    this.questions = await this._data.load(this.relLength);    

    //Change visibility
    document.getElementsByClassName('start')[0].setAttribute("style", "display: none");
    document.getElementsByClassName('test')[0].setAttribute("style", "");
  }

  randomizeAnswers(rawAnswers: any[]): any[] {

    for (let i = rawAnswers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = rawAnswers[i];
        rawAnswers[i] = rawAnswers[j];
        rawAnswers[j] = temp;
    }

    return rawAnswers;

}

async next(question: any){
  //get answer data
  let categorie: string = question.type;
  let answer: number = parseInt(this.answer);
  var value: number;

  //get values from firebase
  let previous = await this._store.collection('user').doc(this.uid).get().subscribe(async result =>{
    let data = await result.data();
    value = data[categorie];

    //add answer to value
    if(data.isReversed){
      value = value - answer
    }else {
      value = value + answer;
    }
    //send answer data to firebase
    var upload = {};
    upload[categorie] = value;
    this._store.collection('user').doc(this.uid).update(upload);
    
  });

  //next slide
  this.slides.slideNext();
  this.answer = 0;
}

async relationshipDate()
  {
    //Add Data to Database
    this._store.collection('user').doc(this.uid).update({
      relationshipLength: this.relLength
    });

    //Load JS-File
    this.questions = await this._data.load(this.relLength);    

    //Change visibility
    document.getElementsByClassName('start')[0].setAttribute("style", "display: none");
    document.getElementsByClassName('test')[0].setAttribute("style", "");
  }

showDatePicker(){
  this._date.show({
    date: new Date(),
    mode: 'date',
    androidTheme: this._date.ANDROID_THEMES.THEME_HOLO_DARK
  }).then(
    date => console.log('Got date: ', date),
    err => console.log('Error occurred while getting date: ', err)
  );
}

toHome()
{
  this._nav.navigateByUrl('/tabs/tabs/home');
}

toResults()
{
  this._store.collection('user').doc(this.uid).update({
    test: true
  });
  this._nav.navigateByUrl('/tabs/tabs/results');
}

}
