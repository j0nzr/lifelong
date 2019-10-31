import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: any;

    constructor(public http: Http) {

    }

    load(file){

        if(this.data){
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {

            this.http.get(`./assets/testData/de/${file}.json`).map(res => res.json()).subscribe(data => {
                this.data = data.data;
                resolve(this.data);
            });

        });

    }


}
