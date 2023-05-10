import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from '../apiservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournamentlist',
  templateUrl: './tournamentlist.component.html',
  styleUrls: ['./tournamentlist.component.css']
})
export class TournamentlistComponent implements OnInit {
  resultData: any;
  company_title: any;
  company_phone: any;
  company_url: any;
  series_info: any;
  isNetwork: any;
  tryagain: any;
  searchtournament:any = '';
  isLoading = true;
  value = '';
  constructor(private service: ApiservicesService, public router: Router) {
    window.localStorage.removeItem('series');
    window.localStorage.removeItem('title');
   }

  ngOnInit() {
    this.getglobalseries();
  }

  getglobalseries() {
    this.service.getGlobalSeries(this.searchtournament)
    .subscribe(
      (      data: any) => {
        this.resultData = data;
        this.series_info = this.resultData.data;
        this.isLoading = false;
    },
      (      error: { json: () => any; }) => {
        console.log(error.json());
        this.tryagain = 1;
    }
    );
  }

  search() {
    this.getglobalseries();
  }

  goLogin(tournament: any) {
    window.localStorage.setItem('tourType', tournament);
    this.router.navigate(['/login', {'tournament': tournament}], {skipLocationChange: true});
  }

}
