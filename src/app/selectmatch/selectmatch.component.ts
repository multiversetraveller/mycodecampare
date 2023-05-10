import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiservicesService } from '../apiservices.service';

@Component({
  selector: 'app-selectmatch',
  templateUrl: './selectmatch.component.html',
  styleUrls: ['./selectmatch.component.css']
})
export class SelectmatchComponent implements OnInit {
  isLoading = true;
  matches: any[] = [];
  matchesList: any[] = [];
  checkmatch_status: any[] = [];
  countcurrentstatus: any;
  showalert = false;
  constructor(public router: Router, private servicesService: ApiservicesService) { }

  ngOnInit() {
    this.getMatchesList();
  }

  getMatchesList() {
    this.isLoading = true;
    this.servicesService.getMatchesList().subscribe(
      ( data: any) => {
        this.matches.push(data);
        this.matchesList = this.matches[0].data;
        // console.log(this.matchesList);
        for (var i = 0; i < this.matchesList.length; i++) {
          this.checkmatch_status.push(this.matchesList[i].status);
          // console.log(this.checkmatch_status)
          const count = this.checkmatch_status.reduce((count, num) => num === 'progress' ? count + 1 : count, 0)
          // console.log(count)

        }
        this.isLoading = false;
      });
  }

  matchSelect(matchId: any, team1Id: any, team2Id: any, team1Name: string, team2Name: string, team1Image: string, team2Image: string, matchStat: any) {
   
      window.localStorage.setItem('team1Name', team1Name);
      window.localStorage.setItem('team2Name', team2Name);
      window.localStorage.setItem('team1Image', team1Image);
      window.localStorage.setItem('team2Image', team2Image);
      this.router.navigate(['/selectplayer', {
        'matchId': matchId, 'team1Id': team1Id, 'team2Id': team2Id,
        'matchStat': matchStat
      }], { skipLocationChange: true });
   
  }
    matchSelects(matchId: any, team1Id: any, team2Id: any, team1Name: string, team2Name: string, team1Image: string, team2Image: string, matchStat: any) {
      this.checkmatch_status =[];
      this.servicesService.getMatchesList().subscribe(
        (        data: any) => {
          this.matches.push(data);
          this.matchesList = this.matches[0].data;
          for (var i = 0; i < this.matchesList.length; i++) {
            this.checkmatch_status.push(this.matchesList[i].status);
            this.countcurrentstatus = this.checkmatch_status.reduce((count, num) => num === 'progress' ? count + 1 : count, 0)

          }
       
        // console.log(this.countcurrentstatus)
      if (this.countcurrentstatus == 0) {
        window.localStorage.setItem('team1Name', team1Name);
        window.localStorage.setItem('team2Name', team2Name);
        window.localStorage.setItem('team1Image', team1Image);
        window.localStorage.setItem('team2Image', team2Image);
        this.router.navigate(['/selectplayer', {
          'matchId': matchId, 'team1Id': team1Id, 'team2Id': team2Id,
          'matchStat': matchStat
        }], { skipLocationChange: true });
      }
      else {
        this.showalert = true;
        setTimeout(() => {
          this.showalert = false;
        }, 3000);
      }
    });
  }


  getDate(date: string) {
    const d = date.split('-');
    return d[0];
  }

  getMonth(date: string) {
    const d = date.split('-');
    return d[1];
  }

}
