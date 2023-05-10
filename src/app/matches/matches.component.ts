import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiservicesService } from '../apiservices.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface UserData {
  no: number;
  firstteam: string;
  secondteam: string;
  over: number;
  time: string;
  date: string;
  createddate: Date;
  action: number;
}

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  displayedColumns: string[] = ['no', 'firstteam', 'secondteam', 'over', 'time', 'date', 'createddate', 'action'];
  dataSource: MatTableDataSource<UserData>;
  MatchList: UserData[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isLoaderShow = false;
  match: any;
  tid:any;
  matchlist: any[] = [];
value: any;
  constructor(public router: Router, private serviceService: ApiservicesService) {
    this.dataSource = new MatTableDataSource(this.MatchList);
  }

  ngOnInit() {
    this.getAllMatches();
    this.tid=window.localStorage.getItem('t_id'); 
  }

  getAllMatches() {
    this.MatchList = [];
    this.matchlist = [];
    this.isLoaderShow = true;
    this.serviceService.getAllMatches()
    .subscribe(
      (data:any) => {
        this.isLoaderShow = false;
        this.matchlist.push(data);
        this.match = this.matchlist[0].data;
        let i = 1;
        for (const item of this.match) {
          this.MatchList.push({
            no: i++,
            firstteam: item.team_1,
            secondteam: item.team_2,
            over: item.over,
            time: item.timeslot,
            date: item.match_date,
            createddate: item.created_date,
            action: item.match_id
          });
          console.log(this.matchlist);
        }
          this.dataSource = new MatTableDataSource<UserData>(this.MatchList);
          this.dataSource.paginator = this.paginator;
        },
        (error:any) => {
          this.isLoaderShow = false;
        });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  clearsearch(){
    this.value = '';
    this.dataSource.filter ='';
  }

  Addmatch() {
    window.localStorage.setItem('addEvent', 'yes');
    this.router.navigate(['/addmatch']);
  }
  edit(id:any) {
    window.localStorage.setItem('addEvent', 'no');
    this.router.navigate(['/addmatch', {'MatchId': id}], {skipLocationChange: true});
  }
  delete(id:any) {
    const buttonClicked = confirm('Are You Want To Sure Delete This Match');
    if (buttonClicked === true) {
      this.isLoaderShow = true;
      this.serviceService.deleteMatch(id).subscribe(
        (data:any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Match Delete Successfully', 'Close');
          this.getAllMatches();
        },
        (error:any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Match Delete Failed', 'Close');
        });
    }
  }
}
