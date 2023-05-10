import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changeapiurl',
  templateUrl: './changeapiurl.component.html',
  styleUrls: ['./changeapiurl.component.css']
})
export class ChangeapiurlComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  changeUrl(type: string) {
    if (type === 'test') {
      window.localStorage.setItem('apiUrl', 'https://demo.vthinksolution.com/crictest/cric/services/scoringapp/');
      this.router.navigate(['/tournamentlist']);
    } else if (type === 'live') {
      window.localStorage.setItem('apiUrl', 'https://demo.vthinksolution.com/cricket/cric_new/services/scoringapp/');
      this.router.navigate(['/tournamentlist']);
    }
  }

}
