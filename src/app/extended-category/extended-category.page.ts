import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-extended-category',
  templateUrl: './extended-category.page.html',
  styleUrls: ['./extended-category.page.scss'],
})
export class ExtendedCategoryPage implements OnInit {

  public title: string;
  public data: any;
  public category: object;
  public videoSrc: string;
  public videoSrcSafe: any;
  

  public categoryData: object = {
    "Kommunikation" : {
        "video": "https://www.youtube.com/embed/oS0fSq9P0tc",
        "category": "communication",
        "text": "<p>Die ideale Kommunikation in der Partnerschaft ist der liebevolle, aufmerksame und offene Austausch von Gedanken und Gef&uuml;hlen. Dabei ist Kommunikation nicht nur das, was du sagst. Kommunikation h&auml;ngt mit vielen Faktoren zusammen: K&ouml;rpersprache, Mimik, Gespr&auml;chston und die Art und Weise, wie dein Partner h&ouml;rt, was du sagst.</p><p>&nbsp;</p><p>Tipp:</p><ol><li>Bevor du Kritik ausspricht, sage erst mal 5 Dinge, die du gut findest!</li><li>Nehmt euch einen Abend in der Woche Zeit zu zweit und tauscht euch &uuml;ber Folgendes aus:</li></ol><ul><li>Was besch&auml;ftigt dich momentan am meisten?</li><li>Was waren deine besten Erlebnisse in der vergangenen Woche?</li><li>Was war schwierig f&uuml;r dich?</li><li>Was w&uuml;nschst du dir?</li></ul><p>Siehe auch Special Tips &ndash; Let&rsquo;s talk together</p>"
    },
    "Bedürfnisse" : {
        "video" : "https://www.youtube.com/embed/OHcTEbumxAc",
        "category" : "needs",
        "text" : "<p>Unterschiedliche Menschen haben unterschiedliche Bed&uuml;rfnisse. Manche Menschen f&uuml;hlen sich nur dann geliebt, wenn sie es h&auml;ufig gesagt bekommen. Andere w&uuml;nschen sich hin und wieder ein kleines Geschenk als Zeichen, dass der Partner an sie gedacht hat. Wieder andere brauchen z&auml;rtliche Ber&uuml;hrung oder einfach ein gutes Gespr&auml;ch mit dem Partner.</p><p>&nbsp;</p><p>Tipp:</p><p>&nbsp;</p><ol><li>Sprecht miteinander &uuml;ber das, was euch in der Beziehung zu eurem Partner am meisten gibt. Wann f&uuml;hlt ihr euch wohl. Das kann unterschiedlich sein.</li><li>Wenn du dich entscheiden m&uuml;sstest, was ist dir am wichtigsten?*</li></ol><ul><li>Ich f&uuml;hle mich geliebt, wenn ich ber&uuml;hrt werde.</li><li>F&uuml;r mich bedeutet es viel, wenn mir mein Partner hin und wieder etwas mitbringt. Es muss nicht teuer sein.</li><li>Ich f&uuml;hle mich am meisten geliebt, wenn mein Partner mir Komplimente macht und mich ermutigt.</li><li>Ich liebe es, wenn wir Zeit zu zweit verbringen.</li><li>Ich f&uuml;hle mich geliebt, wenn mir mein Partner hilft, wenn er sieht, wo ich ihn brauche.</li></ul><ol start='3'><li>Schaut euch die Special Tips - 5 Sprachen der Liebe an</li></ol><p>*Gary Chapman: Die 5 Sprachen der Liebe</p>"
    },
    "Zeit" : {
        "video" : "https://www.youtube.com/embed/mrxNX4mrZgw",
        "category" : "time",
        "text": "<p>Partnerschaft braucht Zeit. Zeit um sich richtig kennenzulernen, um sch&ouml;ne Erinnerungen aufzubauen, die Liebe zu genie&szlig;en und das Leben zu planen.</p><p>Jeder hat eine andere Vorstellung davon, wieviel Zeit man mit dem Partner verbringen m&ouml;chte und wie diese gestaltet sein soll: Findet einen guten Kompromiss.</p><p>&nbsp;</p><p>Tipp:</p><ol><li>Kl&auml;rt eure Erwartungen:</li></ol><ul><li>Seid ihr beide mit eurer Zeitgestaltung gl&uuml;cklich?</li><li>Was k&ouml;nntet ihr verbessern?</li><li>Wie w&uuml;rde der perfekte gemeinsame Tag aussehen?</li></ul><ol start='2'><li>Plant einen gemeinsamen Ausflug oder Urlaub.</li><li>Habt ihr ein gemeinsames Hobby? &Uuml;berlegt euch eins.</li></ol>"
    },
    "Werte und Träume" : {
        "video" : "https://www.youtube.com/embed/lZPb_NT3A7o",
        "category" : "valuesDreams",
        "text" : "<p>Die &Uuml;berzeugungen, die dein Leben pr&auml;gen, sind deine Werte. Eure Werte und &Uuml;berzeugungen k&ouml;nnen unterschiedlich sein. F&uuml;r eine tragf&auml;hige Beziehung solltet ihr jedoch die wichtigsten Werte eures Lebens teilen.</p><p>Tr&auml;ume sind deine W&uuml;nsche und Ziele f&uuml;r die Zukunft. Sie h&auml;ngen eng mit deinen Werten zusammen.</p><p>&nbsp;</p><p>Tipp:</p><ol><li>Tauscht euch &uuml;ber eure &Uuml;berzeugungen und Werte aus:</li></ol><ul><li>Was erwartest du von eurer Beziehung?</li><li>Wie stehst du zu Treue und Ehrlichkeit?</li><li>Wie siehst du das Thema Sexualit&auml;t?</li><li>Welche Rolle spielt dein Beruf?</li><li>Bist du ein gl&auml;ubiger Mensch?</li><li>Was bedeuten dir Freiheit und Unabh&auml;ngigkeit?</li><li>Was ist mit Kindern? Wie w&uuml;nschst du dir die Erziehung der Kinder?</li></ul><ol start='2'><li>Welche Lebenstr&auml;ume hast du? &Uuml;berlegt euch gemeinsam, wie euer Leben in 10 Jahren aussehen soll.</li></ol>"
    },
    "Persönlichkeit" : {
        "video" : "https://www.youtube.com/embed/a3ICy-bMUsk",
        "category" : "personality",
        "text" : "<p>Die Pers&ouml;nlichkeit des Menschen beschreibt seine Charaktereigenschaften und Verhaltensweisen. Manche Menschen sind impulsiv, andere eher zur&uuml;ckhaltend. Manchen Menschen ist das Zusammensein mit anderen Menschen sehr wichtig, andere sind lieber allein. Wenn ihr die Pers&ouml;nlichkeit des anderen kennt, k&ouml;nnt ihr die Unterschiede sch&auml;tzen lernen.</p><p>&nbsp;</p><p>Tipp:</p><ol><li>Welcher Typ Mensch bist du, welcher dein Partner?</li></ol><ul><li>Redest du gerne oder h&ouml;rst du lieber zu?</li><li>Arbeitest du lieber im Team oder alleine?</li><li>Leitest du gerne andere Menschen an oder ist dir lieber, wenn dir jemand sagt, was du tun sollst?</li><li>Tr&auml;umst du gerne gro&szlig;e Tr&auml;ume oder bist du eher ein Realist?</li><li>Siehst du das Leben immer positiv oder eher bedrohlich und sorgenvoll?</li><li>Planst du alles korrekt oder lebst du eher in den Tag hinein?</li></ul><ol start='2'><li>Was ist das Besondere an deinem Partner? Was hat dich von Beginn an am meisten begeistert?</li></ol>"
    },
    "Ehrlichkeit und Vertrauen" : {
        "video" : "https://www.youtube.com/embed/JPI0SmNQzaM",
        "category" : "honestyTrust",
        "text" : "<p>Ehrlichkeit und Vertrauen</p><p>Ehrlichkeit und Vertrauen h&auml;ngen eng zusammen. Nur wenn ich wei&szlig;, dass ich nicht angelogen werde, kann ich Vertrauen aufbauen. Kompromisse im Bezug auf Ehrlichkeit und Vertrauen haben schlimme Folgen. Oft h&auml;ngt meine F&auml;higkeit zu vertrauen und der Mut zur Ehrlichkeit mit meiner eigenen Geschichte zusammen.</p><p>Tipp:</p><ol><li>Sprecht &uuml;ber eure Erfahrungen:</li></ol><ul><li>Wann ist es schwer zu vertrauen und warum?</li><li>Hast du bereits erlebt, dass dein Vertrauen missbraucht wurde? Wie k&ouml;nnt ihr nun vorgehen?</li><li>Wann f&auml;llt es dir schwer, ehrlich zu sein?</li></ul><ol start='2'><li>Erz&auml;hlt einander ein Geheimnis, dass ihr noch mit niemand anderem geteilt habt.</li></ol>"
    },
    "Zärtlichkeit" : {
        "video" : "https://www.youtube.com/embed/_PN9OPKl6HY",
        "category" : "physical",
        "text" : "<p>Der Umgang mit dem K&ouml;rper des anderen spiegelt die Liebe wider. Eine gesunde Beziehung ist gepr&auml;gt von respektvollem Verhalten und dem Achten der gesetzten Grenzen. Es ist wichtig, klar die Erwartungen zu formulieren und einen gemeinsam Weg zu finden.</p><p>&nbsp;</p><p>Tipp:</p><ol><li>Sprecht &uuml;ber eure Vorstellungen zum Thema Z&auml;rtlichkeit und Sexualit&auml;t.</li></ol><ul><li>Welche W&uuml;nsche hast du?</li><li>Was ist sch&ouml;n f&uuml;r dich, was ist unangenehm?</li><li>Wovor hast du Angst?</li></ul><ol start='2'><li>Schafft euch die Rahmenbedingungen, um eure Z&auml;rtlichkeit und Sexualit&auml;t f&uuml;r beide so zu gestalten, dass ihr euch wohlf&uuml;hlt.</li><li>Respektiert die Grenzen!</li></ol>"
    }
}


  constructor(public _activeRoute: ActivatedRoute, public _nav: NavController, public http: Http,
     public _sanitizer: DomSanitizer, public _router: Router) { 
  }

  ngOnInit() {
    this._activeRoute.queryParams.subscribe((res)=>{
      this.title = res.name;
      this.videoSrc = this.categoryData[this.title].video;
      this.videoSrcSafe = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoSrc);
      this.setTipp(this.title);
  });
  }

  back(){
    this._nav.back();
  }

  setTipp(name: string){
    //var doc = new DOMParser().parseFromString(this.categoryData[name].string, "text/xml");
    console.log(this.categoryData[name].text);
    let d1 = document.getElementById("dom");
    d1.insertAdjacentHTML('afterbegin', this.categoryData[name].text);
  }

  questions(){
    console.log("questions");
    this._router.navigate(['/questions'], {queryParams: {name: this.categoryData[this.title].category}});
  }



}
