import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-special-tipps',
  templateUrl: './special-tipps.page.html',
  styleUrls: ['./special-tipps.page.scss'],
})
export class SpecialTippsPage implements OnInit {

  public type: string;

  constructor(public _activeRoute: ActivatedRoute, public _nav: NavController, public http: Http,
    public _sanitizer: DomSanitizer, public _router: Router) { }

  ngOnInit() {
}

  

  gotoTipp(name: string){
    console.log(name);
    this._router.navigate(['/special-tipp-text'], {queryParams: {content: name}});
    //this.navCtrl.
  }

}
