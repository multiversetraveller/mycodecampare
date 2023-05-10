import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from '../apiservices.service';

@Component({
  selector: 'app-pushnotification',
  templateUrl: './pushnotification.component.html',
  styleUrls: ['./pushnotification.component.css']
})
export class PushnotificationComponent implements OnInit {
  selectedPlatform = 'both';
  teamDetail = [];
  isLoaderShow = false;
  selectedTeam = '';
  message ='';
  constructor(
    private serviceService: ApiservicesService
  ) { }

  ngOnInit() {
  }

 

  send() {
   
      this.sendAndroid();
   
  }

  sendAndroid() {
    this.serviceService.sendAndroidPush(this.message).subscribe(
      (data:any) => {
        this.isLoaderShow = false;
        this.serviceService.openSnackBar('Send Android Push Successfully', 'Close');
      
      this.message = data['message'];
    },
      (error:any) => {
        this.isLoaderShow = false;
        this.serviceService.openSnackBar('Send Android Push Failed', 'Close');
      });
  }

  
}

