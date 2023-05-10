import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from '../apiservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-smssetting',
  templateUrl: './smssetting.component.html',
  styleUrls: ['./smssetting.component.css']
})
export class SmssettingComponent implements OnInit {

  isLoaderShow = false;
  txtUserName!: String;
  txtPassword = '';
  txtsenderId = '';
  txtmessage = '';
  txtUnicode = '';
  smstxt: any[] = [];
  sms: any;

  constructor(private serviceService: ApiservicesService, public router: Router) { }

  ngOnInit() {
    this.getAllSmsInfo();
  }


  getAllSmsInfo() {
    this.smstxt = [];
    this.isLoaderShow = true;
    this.serviceService.getAllSmsInfo()
    .subscribe(
      (      data: any) => {
        this.isLoaderShow = false;
          this.smstxt.push(data);
          this.sms = this.smstxt[0].data;
          for (const item of this.sms) {
              this.txtUserName = item.sms_username,
              this.txtPassword = item.sms_password,
              this.txtsenderId = item.sms_senderid,
              this.txtmessage = item.sms_text,
              this.txtUnicode = item.sms_unicode;
          }
        this.isLoaderShow = false;
      },
      (      error: any) => {
        this.isLoaderShow = false;
        this.serviceService.openSnackBar('Failed to Fetch Data Of SMS Setting', 'Close');
      });
  }

  save() {
    const smsArray = {
      series: window.localStorage.getItem('selectedSeries'),
      sms_username: this.txtUserName,
      sms_password: this.txtPassword,
      sms_senderid: this.txtsenderId,
      sms_text: this.txtmessage,
      sms_unicode: this.txtUnicode
    };
    if (this.txtUserName === '' || this.txtUserName == null || this.txtUserName === undefined) {
      this.serviceService.openSnackBar('Please Enter User Name', 'Close');
    } else if (this.txtPassword == null || this.txtPassword === undefined) {
      this.serviceService.openSnackBar('Please Enter Password', 'Close');
    } else if (this.txtsenderId === '' || this.txtsenderId == null || this.txtsenderId === undefined) {
      this.serviceService.openSnackBar('Please Enter sender Id', 'Close');
    } else if (this.txtmessage === '' || this.txtmessage == null || this.txtmessage === undefined) {
      this.serviceService.openSnackBar('Please Enter Message ', 'Close');
    } else if (this.txtUnicode === '' || this.txtUnicode == null || this.txtUnicode === undefined) {
      this.serviceService.openSnackBar('Please Enter Unicode ', 'Close');
    } else {
      this.isLoaderShow = true;
      this.serviceService.addSmsSetting(smsArray)
        .subscribe( (data: any) => {
          this.serviceService.openSnackBar('Update SMS Setting  Successfully', 'Close');
          this.router.navigate(['/smssetting']);
          this.getAllSmsInfo();
        },
          (        error: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Some Error During Update SMS Setting', 'Close');
        });
    }
  }
}
