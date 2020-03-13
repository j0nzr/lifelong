import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';



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
      "de" : {
        "video": "https://www.youtube.com/embed/oS0fSq9P0tc",
        "category": "communication",
        "text": "<p>Die ideale Kommunikation in der Partnerschaft ist der liebevolle, aufmerksame und offene Austausch von Gedanken und Gef&uuml;hlen. Dabei ist Kommunikation nicht nur das, was du sagst. Kommunikation h&auml;ngt mit vielen Faktoren zusammen: K&ouml;rpersprache, Mimik, Gespr&auml;chston und die Art und Weise, wie dein Partner h&ouml;rt, was du sagst.</p><p>&nbsp;</p><p>Tipp:</p><ol><li>Bevor du Kritik ausspricht, sage erst mal 5 Dinge, die du gut findest!</li><li>Nehmt euch einen Abend in der Woche Zeit zu zweit und tauscht euch &uuml;ber Folgendes aus:</li></ol><ul><li>Was besch&auml;ftigt dich momentan am meisten?</li><li>Was waren deine besten Erlebnisse in der vergangenen Woche?</li><li>Was war schwierig f&uuml;r dich?</li><li>Was w&uuml;nschst du dir?</li></ul><p>Siehe auch Special Tips &ndash; Let&rsquo;s talk together</p>"
      },
      "en": {
        "video":"https://www.youtube.com/embed/a26L1aZLYhE",
        "category": "communication",
        "text": "<p>The ideal way to communicate in a relationship is the loving, attentive and open exchange of thoughts and feelings. But communication isn't just the words we speak. Communication is related to many factors: Body language, facial expressions, intonation and the way the other actually hears what we say.</p><p>Recommendation</p><ol><li>Before you criticize, say five things you like about the other person!</li><li>Take one evening a week for just the two of you and talk about the following:</li></ol><ul><li>What's on your mind right now?</li><li>What were your best experiences in the past week?</li><li>What was difficult for you?</li><li>What would you wish for right now?</li></ul><p>See also: special recommendations - Let's talk together</p>"
      }
    },
    "Bedürfnisse" : {
      "de": {
        "video" : "https://www.youtube.com/embed/OHcTEbumxAc",
        "category" : "needs",
        "text" : "<p>Unterschiedliche Menschen haben unterschiedliche Bed&uuml;rfnisse. Manche Menschen f&uuml;hlen sich nur dann geliebt, wenn sie es h&auml;ufig gesagt bekommen. Andere w&uuml;nschen sich hin und wieder ein kleines Geschenk als Zeichen, dass der Partner an sie gedacht hat. Wieder andere brauchen z&auml;rtliche Ber&uuml;hrung oder einfach ein gutes Gespr&auml;ch mit dem Partner.</p><p>&nbsp;</p><p>Tipp:</p><p>&nbsp;</p><ol><li>Sprecht miteinander &uuml;ber das, was euch in der Beziehung zu eurem Partner am meisten gibt. Wann f&uuml;hlt ihr euch wohl. Das kann unterschiedlich sein.</li><li>Wenn du dich entscheiden m&uuml;sstest, was ist dir am wichtigsten?*</li></ol><ul><li>Ich f&uuml;hle mich geliebt, wenn ich ber&uuml;hrt werde.</li><li>F&uuml;r mich bedeutet es viel, wenn mir mein Partner hin und wieder etwas mitbringt. Es muss nicht teuer sein.</li><li>Ich f&uuml;hle mich am meisten geliebt, wenn mein Partner mir Komplimente macht und mich ermutigt.</li><li>Ich liebe es, wenn wir Zeit zu zweit verbringen.</li><li>Ich f&uuml;hle mich geliebt, wenn mir mein Partner hilft, wenn er sieht, wo ich ihn brauche.</li></ul><ol start='3'><li>Schaut euch die Special Tips - 5 Sprachen der Liebe an</li></ol><p>*Gary Chapman: Die 5 Sprachen der Liebe</p>"
      },
      "en": {
        "video" : "https://www.youtube.com/embed/F2Nkl9IA6w4",
        "category" : "needs",
        "text" : "<p>Different people have different needs. Some people only feel loved when they are told 'I love you' often. Others like receiving small gifts as a sign that their partner has thought of them. Yet others need a gentle touch or simply a good conversation with their partner to feel loved.</p><p>Recommendation</p><ol><li>Talk about what gives you both the most satisfaction in your relationship. When do you feel good? This can be different for each of you.</li><li>If you had to decide, what is most important to you?*</li></ol><ul><li>I feel loved when I'm touched.</li><li>It means a lot to me when my partner gives me small gifts every now and then. They don&rsquo;t have to be expensive.</li><li>I feel most loved when my partner gives me words of affirmation and encourages me.</li><li>I love spending time together.</li><li>I feel loved when my partner helps me; when he sees where I need him or her (acts of service).</li></ul><p>See also:</p><ol start='3'><li>Gary Chapman: The Five Love Languages</li></ol>"
      }
    },
    "Zeit" : {
      "de":{ 
        "video" : "https://www.youtube.com/embed/mrxNX4mrZgw",
        "category" : "time",
        "text": "<p>Partnerschaft braucht Zeit. Zeit um sich richtig kennenzulernen, um sch&ouml;ne Erinnerungen aufzubauen, die Liebe zu genie&szlig;en und das Leben zu planen.</p><p>Jeder hat eine andere Vorstellung davon, wieviel Zeit man mit dem Partner verbringen m&ouml;chte und wie diese gestaltet sein soll: Findet einen guten Kompromiss.</p><p>&nbsp;</p><p>Tipp:</p><ol><li>Kl&auml;rt eure Erwartungen:</li></ol><ul><li>Seid ihr beide mit eurer Zeitgestaltung gl&uuml;cklich?</li><li>Was k&ouml;nntet ihr verbessern?</li><li>Wie w&uuml;rde der perfekte gemeinsame Tag aussehen?</li></ul><ol start='2'><li>Plant einen gemeinsamen Ausflug oder Urlaub.</li><li>Habt ihr ein gemeinsames Hobby? &Uuml;berlegt euch eins.</li></ol>"
      },
      "en": {
        "video" : "https://www.youtube.com/embed/8PT0DUqLuHo",
        "category" : "time",
        "text" : "<p>Relationships take time. Time to get to know each other, to make beautiful memories, to enjoy love and to plan your life together. Everyone has a different idea of how much time they want to spend together and how that time should be structured: If you don&rsquo;t agree, find a compromise.</p><p>Recommendation</p><ol><li>Clarify your expectations:</li></ol><ul><li>Are you both happy with the time you spend together?</li><li>What could be improved?</li><li>What would a perfect day together look like?</li></ul><ol start='2'><li>Plan a trip for the two of you.</li><li>Do you have a hobby in common? If not, come up with one you both like.</li></ol>"
      }
    },
    "Werte und Träume" : {
      "de" : {
        "video" : "https://www.youtube.com/embed/lZPb_NT3A7o",
        "category" : "valuesDreams",
        "text" : "<p>Die &Uuml;berzeugungen, die dein Leben pr&auml;gen, sind deine Werte. Eure Werte und &Uuml;berzeugungen k&ouml;nnen unterschiedlich sein. F&uuml;r eine tragf&auml;hige Beziehung solltet ihr jedoch die wichtigsten Werte eures Lebens teilen.</p><p>Tr&auml;ume sind deine W&uuml;nsche und Ziele f&uuml;r die Zukunft. Sie h&auml;ngen eng mit deinen Werten zusammen.</p><p>&nbsp;</p><p>Tipp:</p><ol><li>Tauscht euch &uuml;ber eure &Uuml;berzeugungen und Werte aus:</li></ol><ul><li>Was erwartest du von eurer Beziehung?</li><li>Wie stehst du zu Treue und Ehrlichkeit?</li><li>Wie siehst du das Thema Sexualit&auml;t?</li><li>Welche Rolle spielt dein Beruf?</li><li>Bist du ein gl&auml;ubiger Mensch?</li><li>Was bedeuten dir Freiheit und Unabh&auml;ngigkeit?</li><li>Was ist mit Kindern? Wie w&uuml;nschst du dir die Erziehung der Kinder?</li></ul><ol start='2'><li>Welche Lebenstr&auml;ume hast du? &Uuml;berlegt euch gemeinsam, wie euer Leben in 10 Jahren aussehen soll.</li></ol>"
      },
      "en": {
        "video" : "https://www.youtube.com/embed/DgN4DMjeIp4",
        "category" : "valuesDreams",
        "text" : "<p>The beliefs that shape your life are your values. Your values and beliefs can be different for each of you. For a sustainable relationship, however, you should share the most important values.</p><p>Dreams are your hopes and goals for the future. They are closely related to your values.</p><p>Recommendation</p><ol><li>Share your beliefs and values:</li></ol><ul><li>What do you expect from your relationship?</li><li>How do you feel about faithfulness and honesty?</li><li>What are your views about sexuality?</li><li>What role does your profession play?</li><li>Are you a religious person?</li><li>What do freedom and independence mean to you?</li><li>What about kids? How would you like the children to be brought up?</li></ul><ol start='2'><li>What are your dreams in life? With your partner think about how your life should look in 10 years.</li></ol>"
      }
    },
    "Persönlichkeit" : {
      "de": {
        "video" : "https://www.youtube.com/embed/a3ICy-bMUsk",
        "category" : "personality",
        "text" : "<p>Die Pers&ouml;nlichkeit des Menschen beschreibt seine Charaktereigenschaften und Verhaltensweisen. Manche Menschen sind impulsiv, andere eher zur&uuml;ckhaltend. Manchen Menschen ist das Zusammensein mit anderen Menschen sehr wichtig, andere sind lieber allein. Wenn ihr die Pers&ouml;nlichkeit des anderen kennt, k&ouml;nnt ihr die Unterschiede sch&auml;tzen lernen.</p><p>&nbsp;</p><p>Tipp:</p><ol><li>Welcher Typ Mensch bist du, welcher dein Partner?</li></ol><ul><li>Redest du gerne oder h&ouml;rst du lieber zu?</li><li>Arbeitest du lieber im Team oder alleine?</li><li>Leitest du gerne andere Menschen an oder ist dir lieber, wenn dir jemand sagt, was du tun sollst?</li><li>Tr&auml;umst du gerne gro&szlig;e Tr&auml;ume oder bist du eher ein Realist?</li><li>Siehst du das Leben immer positiv oder eher bedrohlich und sorgenvoll?</li><li>Planst du alles korrekt oder lebst du eher in den Tag hinein?</li></ul><ol start='2'><li>Was ist das Besondere an deinem Partner? Was hat dich von Beginn an am meisten begeistert?</li></ol>"
      },
      "en": {
        "video": "https://www.youtube.com/embed/6eJpTqbphOI",
        "category" : "personality",
        "text": "<p>The personality of a person describes his or her character traits and behaviors. Some people are impulsive, others more reserved. Some people find it very important to socialize, others prefer to be alone. If you know the personality of your partner, you can learn to appreciate the differences.</p><p>Recommendation</p><ol><li>What type of person are you, what type is your partner?</li></ol><ul><li>Do you like to talk, or do you prefer to listen?</li><li>Are you a team player or do you prefer to work alone?</li><li>Do you like to lead people, or do you prefer when someone tells you what to do?</li><li>Do you like to dream big or are you more of a realist?</li></ul>"
      }
    },
    "Ehrlichkeit und Vertrauen" : {
      "de": {
        "video" : "https://www.youtube.com/embed/JPI0SmNQzaM",
        "category" : "honestyTrust",
        "text" : "<p>Ehrlichkeit und Vertrauen</p><p>Ehrlichkeit und Vertrauen h&auml;ngen eng zusammen. Nur wenn ich wei&szlig;, dass ich nicht angelogen werde, kann ich Vertrauen aufbauen. Kompromisse im Bezug auf Ehrlichkeit und Vertrauen haben schlimme Folgen. Oft h&auml;ngt meine F&auml;higkeit zu vertrauen und der Mut zur Ehrlichkeit mit meiner eigenen Geschichte zusammen.</p><p>Tipp:</p><ol><li>Sprecht &uuml;ber eure Erfahrungen:</li></ol><ul><li>Wann ist es schwer zu vertrauen und warum?</li><li>Hast du bereits erlebt, dass dein Vertrauen missbraucht wurde? Wie k&ouml;nnt ihr nun vorgehen?</li><li>Wann f&auml;llt es dir schwer, ehrlich zu sein?</li></ul><ol start='2'><li>Erz&auml;hlt einander ein Geheimnis, dass ihr noch mit niemand anderem geteilt habt.</li></ol>"
      },
      "en" : {
        "video": "https://www.youtube.com/embed/N2P8dVI0JLk",
        "category" : "honestyTrust",
        "text": "<p>Honesty and trust are closely linked. Only when we know we are not being lied to can we build trust. Compromises in terms of honesty and trust have serious consequences. Often our ability to trust and the courage to be honest are related to our own history.</p><p>Recommendation</p><ol><li>Talk about your experiences:</li></ol><ul><li>When is it difficult to trust someone and why is that difficult for you?</li><li>Has your trust ever been betrayed? What can we do about it?</li><li>When is it difficult for you to be honest?</li></ul><ol start='2'><li>Tell each other a secret you haven't shared with anyone else.</li></ol>"
      } 
    },
    "Zärtlichkeit" : {
      "de": { 
        "video" : "https://www.youtube.com/embed/_PN9OPKl6HY",
        "category" : "physical",
        "text" : "<p>Der Umgang mit dem K&ouml;rper des anderen spiegelt die Liebe wider. Eine gesunde Beziehung ist gepr&auml;gt von respektvollem Verhalten und dem Achten der gesetzten Grenzen. Es ist wichtig, klar die Erwartungen zu formulieren und einen gemeinsam Weg zu finden.</p><p>&nbsp;</p><p>Tipp:</p><ol><li>Sprecht &uuml;ber eure Vorstellungen zum Thema Z&auml;rtlichkeit und Sexualit&auml;t.</li></ol><ul><li>Welche W&uuml;nsche hast du?</li><li>Was ist sch&ouml;n f&uuml;r dich, was ist unangenehm?</li><li>Wovor hast du Angst?</li></ul><ol start='2'><li>Schafft euch die Rahmenbedingungen, um eure Z&auml;rtlichkeit und Sexualit&auml;t f&uuml;r beide so zu gestalten, dass ihr euch wohlf&uuml;hlt.</li><li>Respektiert die Grenzen!</li></ol>"
      },
      "en": {
        "video" : "https://www.youtube.com/embed/gay-wdvEZR4",
        "category" : "physical",
        "text": "<p>Touching each other's bodies reflects the love you have for each other. A healthy relationship is characterized by respectful behavior and respect for certain boundaries. It is important to clearly speak about expectations and to find common ground.</p><p>Recommendation</p><ol><li>Talk about what your ideas are about gentleness and sexuality.</li></ol><ul><li>What are your desires?</li><li>What feels good, what is unpleasant?</li><li>What are you afraid of?</li></ul><ol start='2'><li>Create conditions to make affection and sex comfortable for both of you</li><li>Respect boundaries!</li></ol>"
      }
    }
}


  constructor(public _activeRoute: ActivatedRoute, public _nav: NavController, public http: Http,
     public _sanitizer: DomSanitizer, public _router: Router, public _translate: TranslateService) { 
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
    let lang = this._translate.currentLang;
    d1.insertAdjacentHTML('afterbegin', this.categoryData[name][lang].text);
  }

  questions(){
    console.log("questions");
    this._router.navigate(['/questions'], {queryParams: {name: this.categoryData[this.title].category}});
  }



}
