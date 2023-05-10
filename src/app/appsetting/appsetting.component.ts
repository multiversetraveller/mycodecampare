import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiservicesService } from '../apiservices.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface UserData {
  no: number;
  image: string;
  sponsortype: number;
  action: number;
}

@Component({
  selector: 'app-appsetting',
  templateUrl: './appsetting.component.html',
  styleUrls: ['./appsetting.component.css']
})
export class AppsettingComponent implements OnInit {
  displayedColumns: string[] = ['no', 'image', 'sponsortype', 'action'];
  dataSource!: MatTableDataSource<UserData>;
  settingapp: UserData[] = [];
  isLoaderShow = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('scroller1') scroller!: ElementRef;

  appset: any[] = [];
  settbl: any;
value: any;

  constructor( private serviceService: ApiservicesService, public router: Router) { }

  ngOnInit() {
    this.getAllAppSponser();
  }

  getAllAppSponser() {
    this.settingapp = [];
    this.appset = [];
    this.isLoaderShow = true;
    this.serviceService.getAllAppSponser()
    .subscribe(
      (      data: any) => {
        this.isLoaderShow = false;
        this.appset.push(data);
        this.settbl = this.appset[0].data;
        let i = 1;
        for (const item of this.settbl) {
         this.settingapp.push({
          no: i++,
          image: item.img,
          sponsortype: item.sponsor_type,
          action: item.id
        });
      }
      this.dataSource = new MatTableDataSource<UserData>(this.settingapp);
      this.dataSource.paginator = this.paginator;
    },
      (    error: any) => {
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
  sponsorAdd() {
      window.localStorage.setItem('addEvent', 'yes');
      this.router.navigate(['/addappsponsor']);
  }
    edit(id: any) {
      window.localStorage.setItem('addEvent', 'no');
      this.router.navigate(['/addappsponsor', {'id': id}], {skipLocationChange: true});
    }
    delete(id: any) {
    const buttonClicked = confirm('Are You Want To Sure Delete This Image');
    if (buttonClicked === true) {
      this.isLoaderShow = true;
      this.serviceService.deleteappsponsor(id).subscribe(
        (        framename: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar(' Delete Successfully', 'Close');
          this.getAllAppSponser();
        },
        
        (        error: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar(' Delete Failed', 'Close');
          this.getAllAppSponser();
        });
    }

    }
}

