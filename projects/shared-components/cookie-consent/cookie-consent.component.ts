import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let cc = window as any;
    cc.cookieconsent.initialise({
     container: document.getElementById("cookieconsent"),
     palette:{
       popup: { background: "#3366ff" },
       button: { background: "#ffe000" },
     },
     revokable: true,
     onStatusChange: function(status) {
       console.log(this.hasConsented() ?
       'enable cookies' : 'disable cookies');
     },
     "theme": "classic"
   });
  }

}
