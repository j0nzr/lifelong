import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Chart } from 'chart.js';
import { ResultsService } from '../results.service';
import { Observable } from 'rxjs'; 
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('barChart', {static: false}) public barChart;
  
  uid: string = this._afAuth.auth.currentUser.uid;
  partneruid: any;
  communication: number;
  //communication$ = Observable.of(this.communication);
  honestyTrust: number;
  needs: number;
  personality: number;
  physical: number;
  time: number;
  valueDreams: number;
  best: any[] = ["", 0];
  worst: any[] = ["", 0];
  results: ResultsService;
  tipp: any;
  date: any;

  constructor(private _router: Router, private _afData: AngularFirestore, private _afAuth: AngularFireAuth, public _share: SocialSharing, public service: ResultsService) {
    let pDate = new Date();
    let year = pDate.getFullYear();
    let month = pDate.getMonth() + 1;
    let day = pDate.getDate();
    this.date = year + "/" + month + "/" + day;
    this.hasPartner(this._afAuth.auth.currentUser);
    this.testDone(this._afAuth.auth.currentUser);
    this._afData.collection('user').doc(this.uid).get().subscribe(async result => {
      let data = await result.data();
      this.communication = await data.communication;
      this.honestyTrust = await data.honestyTrust;
      this.personality = await data.personality;
      this.physical = await data.physical;
      this.valueDreams = await data.valueDreams;
      this.time = await data.time;
      this.needs = await data.needs;
      await this.setBestAndWorst();
      await this.getTipp();
      //this._router.navigateByUrl('/test');
      //console.log(this.barChart);
    });
    this.results = new ResultsService(this._afAuth, this._afData);
    console.log("done");
  }

  ionViewDidLoad(){
    this.hasPartner(this._afAuth.auth.currentUser);
    this.testDone(this._afAuth.auth.currentUser);
  }

  ngAfterViewInit(){
    this.results.setChart(this.barChart);
    this.results.start();
  }

  ngOnInit(){
 
  }
  

  public test: any;
  public partner: boolean;



  async addPartner(){
    console.log("add partner");
    if(this.partner == false){
      this._router.navigateByUrl('/add-partner');
    }
  }

  settings(){
    this._router.navigateByUrl('/settings');
  }

  toTest(){
    this._router.navigateByUrl('/test');
  }

  toResults(){
    this._router.navigateByUrl('/tabs/tabs/results');
  }

  hasPartner(user){
    let partner = false;
    let data = this._afData.collection('user').doc(user.uid).get().subscribe(
      (result) => {
        if(result.data().partner != ""){
          partner = true;
          this.partneruid = result.data().partner;
        }else{
          partner = false;
        }
        this.partner = partner;
      }
    );
  }

  async getTipp(){
    let data = await this._afData.collection('tipp').doc("kq2AnZbGdOM1fGHBg59i").get().subscribe(
      (result) => {
        this.tipp = result.data()[this.date];
      }
    );
  }


  async testDone(user){
    let test = false;
    let data = await this._afData.collection('user').doc(user.uid).get().subscribe(
      (result) => {
        test = result.data().test;
        this.test = test;
      }
    );
  }

  async setBestAndWorst(){
    let bestValue = ["", 0];
    let worstValue = ["", 1000];
    let arr = [["Kommunikation", ((this.communication/55)*100)], 
              ["Ehrlichkeit/Vertrauen", (this.honestyTrust/35)*100],
              ["Persönlichkeit", ((this.personality/40)*100)], 
              ["Zärtlichkeit", ((this.physical/35)*100)],
              ["Werte/Träume", ((this.valueDreams/40)*100)], 
              ["Zeit", ((this.time/40)*100)],
              ["Bedürfnisse", ((this.needs/40)*100)]];

            //console.log(arr);

    for (let bq of arr){
      if(bq[1] > bestValue[1]){
        bestValue = bq;
      }
      if(bq[1] < worstValue[1]){
        worstValue = bq;
      }
    }

    this.best = bestValue;
    //this.best.push((this.best[1]/this.best[2])*100);
    this.worst = worstValue;
    //this.worst.push((this.worst[1]/this.best[2])*100)
   
    return [bestValue, worstValue];
    
  }

  shareTipp(){
    this._share.share("Hey. Schau dir doch mal den heutigen Tipp des Tages in der Lifelong App an:" + document.getElementById("tipp").innerHTML);
  }

  toSpecialTipps(){
    this._router.navigateByUrl('/tabs/tabs/special-tipps');
  }

}
