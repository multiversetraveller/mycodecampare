import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiservicesService } from '../apiservices.service';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  no: number;
  regi_id: number;
  name: string;
  surname:string;
  fathername:string;
  biding_amount: number;
  age: number;
  mobile_number: number;
  player_image: string;
  player_type: string;
  team_name: string;
  action: number;
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  displayedColumns: string[] = ['no', 'regi_id', 'name','biding_amount',
  'age', 'mobile_number', 'player_image', 'player_type', 'team_name', 'action'];
  ELEMENT_DATA: PeriodicElement[] = [];
  dataSource: any;
  playerDetail: any[] = [];
  player: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoaderShow = false;
value: any;
loading = false;
constructor(public router: Router, private serviceService: ApiservicesService) { }

  ngOnInit() {
    this.getPlayerdetail();
  }

  getPlayerdetail() {
    this.ELEMENT_DATA = [];
    this.playerDetail = [];
    this.loading = true;

    this.serviceService.getPlayerdetail().subscribe(
        (data:any) => {
          this.loading = false;
          this.playerDetail.push(data);
          this.player = this.playerDetail[0].data;

          let i = 1;
          for (const item of this.player) {
            this.ELEMENT_DATA.push({
              no: i++,
              regi_id: item.regi_id,
              name: item.name,
              surname:item.surname,
              fathername:item.fathername,
              biding_amount: item.biding_amount,
              age: item.age,
              mobile_number: item.resmobile,
              player_image: item.player_image,
              player_type: item.playertype,
              team_name: item.team_id,
              action: item.player_id
            });
          }
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
        },
        (error:any) => {
          this.loading = false;
        })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  clearsearch(){
    this.value = '';
    this.dataSource.filter ='';
  }
  
  playerAdd() {
    window.localStorage.setItem('addEvent', 'yes');
    this.router.navigate(['/addplayer']);
  }

  editPlayer(id:any) {
    window.localStorage.setItem('addEvent', 'no');
    console.log(id)
    this.router.navigate(['/addplayer', {'playerId': id}], {skipLocationChange: true});
  }

  deletePlayer(id:any) {
    const buttonClicked = confirm('Are You Want To Sure Delete This Player');
    if (buttonClicked === true) {
      this.isLoaderShow = true;
      this.serviceService.deletePlayer(id).subscribe(
        (data:any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Player Delete Successfully', 'Close');
          this.getPlayerdetail();
        },
        (error:any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Player Delete Failed', 'Close');
        });
    }
}

}
