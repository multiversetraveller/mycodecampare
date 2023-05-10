import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/apiservices.service';

export interface UserData {
  teamname: string;
  teamwin: string;
  teamloss: number;
  totalpoint: number;
  teamfirst: number;
  team1run: number;
  team1ball: number;
  team1wicket: number;
  teamsecond: string;
  team2ball: number;
  team2wicket: number;
  team1avg: number;
  team2avg: number;
  teamavg: number;
}

@Component({
  selector: 'app-viewpoints',
  templateUrl: './viewpoints.component.html',
  styleUrls: ['./viewpoints.component.css']
})
export class ViewpointsComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['teamname', 'teamwin', 'teamloss', 'totalpoint', 'teamfirst', 'team1run', 'team1ball', 'team1wicket', 'teamsecond', 'team2ball', 'team2wicket', 'team1avg', 'team2avg', 'teamavg'];
  dataSource: MatTableDataSource<UserData>;
  points:any  = [];
  isLoaderShow = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getpoint: any[] = [];
  viewpointdata: any[] = [];
  pointtbl: any;
value: any;
  constructor(
    public router: Router, private serviceService: ApiservicesService
  ) {
    this.dataSource = new MatTableDataSource(this.points);
   }

  ngOnInit() {
    this.viewpoints();
  }

  viewpoints() {
    this.points = [];
    this.getpoint = [];
    this.isLoaderShow = true;
    this.serviceService.viewpoints().subscribe(
      (      data: any) => {
        this.isLoaderShow = false;
        this.getpoint.push(data);
        this.pointtbl = this.getpoint;
        for (const item of this.pointtbl) {
        this.points.push({
          teamname: item.team_name,
          teamwin: item.team_win,
          teamloss: item.team_loss,
          totalpoint: item.totalpoint,
          teamfirst: item.t1,
          team1run: item.team1_run,
          team1ball: item.team1_ball,
          team1wicket: item.team1_wicket,
          teamsecond: item.t2,
          team2ball: item.team2_ball,
          team2wicket: item.team2_wicket,
          team1avg: item.team1_avg,
          team2avg: item.team2_avg,
          teamavg: item.team_avg
        });
      }
      this.dataSource = new MatTableDataSource<UserData>(this.points);
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
}
