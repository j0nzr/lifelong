import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  @ViewChild('barChart', {static: false}) barChart;

  bars: any;
  colorArray: any;
  communication: number;
  honestyTrust: number;
  needs: number;
  personality: number;
  physical: number;
  time: number;
  valueDreams: number;
  pcommunication: number;
  phonestyTrust: number;
  pneeds: number;
  ppersonality: number;
  pphysical: number;
  ptime: number;
  pvalueDreams: number;
  communicationMax: number;
  honestyTrustMax: number;
  needsMax: number;
  personalityMax: number;
  physicalMax: number;
  timeMax: number;
  valueDreamsMax: number;
  uid: string = this._auth.auth.currentUser.uid;
  partneruid: string;
  test: boolean;
  partner: boolean;
  uservals: any[];
  partnervals: number[];
  categorys: string[] = ["Kommunikation", "Ehrlichkeit und Vertrauen", "Bedürfnisse", "Persönlichkeit", "Zärtlichkeit", "Zeit", "Werte und Träume"];
  icons : string[] = ["megaphone", "key", "gift", "finger-print", "fitness", "time", "cloud"];
  list = [["",0,0,"",false, false], ["",0,0,"",false, false], ["",0,0,"",false, false], ["",0,0,"",false, false], ["",0,0,"",false, false], ["",0,0,"",false, false], ["",0,0,"",false, false]];
        //[name, userVal, partnerVal, icon, best, worst]
  maxvalues: object = {
    "0-3": {
      communication: 55,
      honestyTrust: 35,
      needs: 40,
      personality: 40,
      physical: 35,
      time: 40,
      valueDreams: 40
    },
    "4+": {
      communication: 55,
      honestyTrust: 35,
      needs: 40,
      personality: 35,
      physical: 35,
      time: 40,
      valueDreams: 40
    }
  }

  constructor(public _nav: Router, public _store: AngularFirestore, public _auth: AngularFireAuth,
    public navCtrl: NavController) {
    this.start();
   }

  ngOnInit(){
  }

  async createChart(partnerData: boolean){

    let barData = [];

    if(partnerData){
      barData = [
        {
          label: "Du",
          backgroundColor: "rgb(219, 57, 103)",
          barThickness: "flex",
          data: this.uservals
        },
        {
          label: "Dein Partner",
          backgroundColor: "rgb(38, 130, 237)",
          barThickness: "flex",
          data: this.partnervals
        }
      ]
    }else{
      barData = [
        {
          label: "Du",
          backgroundColor: "rgb(219, 57, 103)",
          barThickness: "flex",
          data: this.uservals
        }
      ]
    }

    this.barChart = new Chart(this.barChart.nativeElement, {
      type: "bar",
      data: {
        labels: this.categorys,
        datasets: barData
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)"
                }
            }],
            yAxes: [{
              ticks: {
                min: 0,
                max: 100
              },
              gridLines: {
                  color: "rgba(0, 0, 0, 0)",
              }   
          }]
        }
      }
    });
  }


  async start(){
    await this.testDone(this._auth.auth.currentUser);
    await this.hasPartner(this._auth.auth.currentUser);
    await this.getChartData(); 
  }

  async ionViewDidEnter(){
  }

  toTest(){
    this._nav.navigateByUrl('/test');
  }

  async getChartData(){
    await this._store.collection('user').doc(this.uid).get().subscribe(async result => {
      //let data = await result.data(); //.subscribe(data => {
      //console.log(typeof(data));
      this.communication = await result.data().communication;
      this.honestyTrust = await result.data().honestyTrust;
      this.needs = await result.data().needs;
      this.personality = await result.data().personality;
      this.physical = await result.data().physical;
      this.time = await result.data().time;
      this.valueDreams = await result.data().valuesDreams;
      /*console.log(this.communication);
      console.log(typeof(this.communication)); */
      if(this.partner){
        await this.getPartnerData(this.partneruid);
      }else{
        await this.setMaxData(); 
      }
    });
    
  }

  getPartnerData(partnerUid){
    this._store.collection('user').doc(partnerUid).get().subscribe(async result => {
      let data = result.data();
      this.pcommunication = await data.communication;
      this.phonestyTrust = await data.honestyTrust;
      this.pneeds = await data.needs;
      this.ppersonality = await data.personality;
      this.pphysical = await data.physical;
      this.ptime = await data.time;
      this.pvalueDreams = await data.valuesDreams;
      await this.setMaxData(); 
    });
  }

  createObject(){
    let pvs = [];
    let uvs = [];
    let partnerData = false;

    let communicationUV = (this.communication/this.communicationMax)*100;
    let honestyTrustUV = (this.honestyTrust/this.honestyTrustMax)*100;
    let needsUV = (this.needs/this.needsMax)*100;
    let personalityUV = (this.personality/this.personalityMax)*100;
    let physicalUV = (this.physical/this.physicalMax)*100;
    let timeUV = (this.time/this.timeMax)*100;
    let valueDreamsUV = (this.valueDreams/this.valueDreamsMax)*100;
    

    if(this.partner){
      let communicationPV = (this.pcommunication/this.communicationMax)*100;
      let honestyTrustPV = (this.phonestyTrust/this.honestyTrustMax)*100;
      let needsPV = (this.pneeds/this.needsMax)*100;
      let personalityPV = (this.ppersonality/this.personalityMax)*100;
      let physicalPV = (this.pphysical/this.physicalMax)*100;
      let timePV = (this.ptime/this.timeMax)*100;
      let valueDreamsPV = (this.pvalueDreams/this.valueDreamsMax)*100;
      pvs = [
          communicationPV,
          
          honestyTrustPV,
          
          needsPV,
          
          personalityPV,
          
          physicalPV,
          
          timePV,
          
          valueDreamsPV
      ];
      this.partnervals = pvs;
      partnerData = true;
    }
      uvs = [ 
        communicationUV,
        honestyTrustUV,
        needsUV,
        personalityUV,
        physicalUV,
        timeUV,
        valueDreamsUV
      ]
    this.uservals = uvs;
    this.createListObject(); 
    this.createChart(partnerData);
  }

  setMaxData() {
    this._store.collection('user').doc(this.uid).get().subscribe(result => {
      let data = result.data();
      let relLength = data.relationshipLength;

      this.communicationMax = this.maxvalues[relLength].communication;
      this.honestyTrustMax = this.maxvalues[relLength].honestyTrust;
      this.needsMax = this.maxvalues[relLength].needs;
      this.personalityMax = this.maxvalues[relLength].personality;
      this.physicalMax = this.maxvalues[relLength].physical;
      this.timeMax = this.maxvalues[relLength].time;
      this.valueDreamsMax = this.maxvalues[relLength].valueDreams;  
      this.createObject();
    });
  }

  hasPartner(user){
    let partner = false;
    let data = this._store.collection('user').doc(user.uid).get().subscribe(
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
    let data = await this._store.collection('user').doc(user.uid).get().subscribe(
      (result) => {
        test = result.data().test;
        this.test = test;
      }
    );
  }

  async createListObject(){
    let pArr = [];

    if(this.partnervals){

    for(let el in this.categorys){
      this.list[el] = [
        this.categorys[el],
        this.uservals[el],
        this.partnervals[el],
        this.icons[el],
        false,
        false
      ];
    }
  }else{
    for(let el in this.categorys){
      this.list[el] = [
        this.categorys[el],
        this.uservals[el],
        //this.partnervals[el],
        this.icons[el],
        false,
        false
      ];
    }
  }
    await console.log(this.list);
    this.setBestAndWorst(this.list);
  }

  extendCategory(name: string){
    console.log(name);
    this._nav.navigate(['/extended-category'], {queryParams: {name: name}});
    //this.navCtrl.
  }

  setBestAndWorst(arr: any[]){
    console.log(arr)
    let vals = [];
    let best = 0;
    let worst = 999;
    let positionBest = 0;
    let positionWorst = 0;
    for (let i of arr){
      vals.push(i[1]);
    }

    for(let val = 0; val < arr.length; val++){
      if(arr[val][1] > best){
        best = arr[val][1];
        positionBest = val;
      }
      if(arr[val][1] < worst){
        worst = arr[val][1];
        positionWorst = val;
      }
    }
    arr[positionBest][4] = true;
    arr[positionWorst][5] = true;
    console.log(positionBest);
  }

}
