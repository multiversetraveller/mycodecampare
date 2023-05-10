import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from '../apiservices.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  tournament: any;
  resultData: any;
  series_info: any;
  selectedSeries: any;
  email: any;
  password: any;
  isRemembered: any;
  isRememberme: any;
  tour_id:any;
  tid:any;
  constructor(public route: ActivatedRoute, private service: ApiservicesService, public router: Router) { }

  ngOnInit() {
    this.tournament = this.route.snapshot.params['tournament'];
    if (window.localStorage.getItem('isRemembered') === 'true') {
    this.selectedSeries = window.localStorage.getItem('selectedSeries');
    this.email = window.localStorage.getItem('Email');
    this.password = window.localStorage.getItem('Password');
    this.isRememberme = window.localStorage.getItem('isRemembered');
    this.tid = window.localStorage.getItem('t_id');
    } 
    this.getSeriesList();
  }

  getSeriesList() {
    this.service.getSeriesList(this.tournament)
      .subscribe(
        ( data: any) => {
          this.resultData = data;
          this.series_info = this.resultData.data;
          console.log(this.series_info);
          this.tour_id=this.series_info[0].tour_id;
          
        },
        (error: { json: () => any; }) => {
          console.log(error.json());
        }
      );
  }

  logIn() {
    this.service.getLogin(this.selectedSeries, this.email, this.password)
      .subscribe(
        (data: { flag: string; series: string; tournament_id: string; }) => {
          console.log(data);
          if (data.flag === 'True') {
            window.localStorage.setItem('selectedSeries', data.series);
            window.localStorage.setItem('t_id', data.tournament_id);
            if (this.isRememberme) {
              window.localStorage.setItem('isRemembered', 'true');
              window.localStorage.setItem('Email', this.email);
              window.localStorage.setItem('Password', this.password);
              
            } else {
              window.localStorage.setItem('isRemembered', 'false');
              window.localStorage.removeItem('Email');
              window.localStorage.removeItem('Password');
            }
            setTimeout(() => {
              this.router.navigate(['/selectmatch']);
            }, 100);
          } else {
            alert('Login Failed');
          }

        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  // isRemember(event) {
  //   this.isRemembered = event.checked;
  // }
}
