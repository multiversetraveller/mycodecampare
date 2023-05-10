import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from '../apiservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-displaymessage',
  templateUrl: './displaymessage.component.html',
  styleUrls: ['./displaymessage.component.css']
})
export class DisplaymessageComponent implements OnInit {
  txtMessage = '';
  isLoaderShow = false;

  constructor( private serviceService: ApiservicesService, public router: Router) { }

  ngOnInit() {

  }
  send() {
    const msgArray = {
      series: window.localStorage.getItem('selectedSeries'),
      msg: this.txtMessage
    };
    if (this.txtMessage === '' || this.txtMessage == null || this.txtMessage === undefined) {
      this.serviceService.openSnackBar('Please Enter Message', 'Close');
    } else {
      this.isLoaderShow = true;
      this.serviceService.saveMsg(msgArray).subscribe(
        (        data: any) => {
          console.log('aavi gayu', data);
          this.serviceService.openSnackBar(' Some Error During Update DisplayMessage', 'Close');
          this.router.navigate(['/selectmatch']);
        },
        (        error: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Update DisplayeMessage Successfully', 'Close');
          this.txtMessage = '';
        });
    }
  }

}
