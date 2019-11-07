import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Chart } from 'chart.js';
import { ResultsService } from '../results.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('barChart', {static: false}) barChart;
  
  uid: string = this._afAuth.auth.currentUser.uid;
  partneruid: any;
  communication: number;
  honestyTrust: number;
  needs: number;
  personality: number;
  physical: number;
  time: number;
  valueDreams: number;
  best: any[]
  worst: any[];

  constructor(private _router: Router, private _afData: AngularFirestore, private _afAuth: AngularFireAuth) {
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
      //this._router.navigateByUrl('/test');

      let results = new ResultsService(_afAuth, _afData, this.barChart);
      results.start();
    });
  }

  ionViewDidLoad(){
    this.hasPartner(this._afAuth.auth.currentUser);
    this.testDone(this._afAuth.auth.currentUser);
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
    let arr = [["Kommunikation", this.communication], 
              ["Ehrlichkeit/Vertrauen", this.honestyTrust],
              ["Persönlichkeit", this.personality], 
              ["Physisches", this.physical],
              ["Werte/Träume", this.valueDreams], 
              ["Zeit", this.time],
              ["Bedürfnisse", this.needs]];

    for (let bq of arr){
      if(bq[1] > bestValue[1]){
        bestValue = bq;
      }
      if(bq[1] < worstValue[1]){
        worstValue = bq;
      }
    }

    this.best = bestValue;
    this.worst = worstValue;
    
  }

}
