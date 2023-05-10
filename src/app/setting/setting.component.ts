import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ApiservicesService } from '../apiservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  txtOwnerAge = 0;
  imageChangedEvent: any = '';
  isCropper = false;
  croppedImage: any = '';
  cropper = {
    x1: 0,
    y1: 0,
    x2: 150,
    y2: 150
  };
  currentScale = 1;
  transform = {};
  popupHeight: any;
  croppingType: any;
  isSettingImageChanged = false;
  headerleft!: any;
  rightheader!: any;
  marquee1!: any;
  marquee2!: any;
  headerlogo!: any;
  isRightImageChanged!: boolean;
  isMrqImageChanged!: boolean;
  isMrq2ImageChanged!: boolean;
  isLogoImageChanged!: boolean;
  isLoaderShow = false;
  titleone: any;
  titletwo: any;
  titlethree: any;
  txtreg: any;
  notification: any;
  settingtxt: any[] = [];
  setting: any;
  appid:any;
  appurl:any;
  minimumbid:any;
  totalplayer:any;
  ticker:any;
  constructor(private serviceService: ApiservicesService, public router: Router) { }

  ngOnInit() {
    this.getAllSetting();
    this.popupHeight = (window.innerHeight - 60) + 'px';
    this.transform = {
      scale: this.currentScale
    };
  }


  getAllSetting() {
    this.settingtxt = [];
    this.isLoaderShow = true;
    this.serviceService.getAllSetting()
    .subscribe(
      (      data: any) => {
          this.isLoaderShow = false;
            this.settingtxt.push(data);
            this.setting = this.settingtxt[0].data;
            console.log(this.setting);
        for (const item of this.setting) {
          this.serviceService.getBase64Photo(item.header_left).then((image:any) => {
            this.headerleft = image['base64'];
          });
          this.serviceService.getBase64Photo(item.header_right).then((image:any) => {
            this.rightheader = image['base64'];
          });
          this.serviceService.getBase64Photo(item.marquee1).then((image:any) => {
            this.marquee1 = image['base64'];
          });
          this.serviceService.getBase64Photo(item.marquee2).then((image:any) => {
            this.marquee2 = image['base64'];
          });
          this.serviceService.getBase64Photo(item.headerpdf).then((image:any) => {
            this.headerlogo = image['base64'];
          });
          this.titleone = item.title1,
          this.titletwo = item.title2,
          this.titlethree = item.title3,
          this.txtreg = item.registration,
          this.notification = item.notificationkey;
          this.appid = item.app_id,
          this.appurl = item.app_url,
          this.minimumbid = item.min_bid,
          this.totalplayer = item.total_player,
          this.ticker = item.ticker
      }
      },
      (      error: any) => {
        this.isLoaderShow = false;
        this.serviceService.openSnackBar('Failed to Fetch Data Of Setting', 'Close');
      });
  }



  scalePlus() {
    this.currentScale = this.currentScale + 0.2;
    this.transform = {
      scale: this.currentScale
    };
  }

  scaleDown() {
    this.currentScale = this.currentScale - 0.2;
    this.transform = {
      scale: this.currentScale
    };
  }

  fileChangeEvent(event: any, type: any): void {
    this.croppingType = type;
    this.imageChangedEvent = event;
    this.isCropper = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    if (this.croppingType === 'headerimg') {
      this.isSettingImageChanged = true;
      this.headerleft = event.base64;
    } else if (this.croppingType === 'righthedimg') {
      this.isRightImageChanged = true;
      this.rightheader = event.base64;
    } else if (this.croppingType === 'marqimg') {
      this.isMrqImageChanged = true;
      this.marquee1 = event.base64;
    } else if (this.croppingType === 'imgmrq') {
      this.isMrq2ImageChanged = true;
      this.marquee2 = event.base64;
    } else {
      this.isLogoImageChanged = true;
      this.headerlogo = event.base64;
    }
  }

  cropConfirm() {
    this.isCropper = false;
  }

  imageLoaded() {
    setTimeout(() => {
      this.cropper = {
        x1: 0,
        y1: 0,
        x2: 150,
        y2: 150
      };
    }, 10);
  }

  Updatesetting() {
    const SetArray = {
      series: window.localStorage.getItem('selectedSeries'),
      header_left: this.headerleft,
      isSettingImageChanged: this.isSettingImageChanged,
      header_right: this.rightheader,
      isRightImageChanged: this.isRightImageChanged,
      marquee1: this.marquee1,
      marquee2: this.marquee2,
      headerpdf: this.headerlogo,
      title1: this.titleone,
      title2: this.titletwo,
      title3: this.titlethree,
      registration: this.txtreg,
      notificationkey: this.notification,
      appid:this.appid,
      appurl:this.appurl,
      minbid:this.minimumbid,
      totplayer:this.totalplayer,
      ticker:this.ticker
    };
    if (this.titleone === '' || this.titleone == null || this.titleone === undefined) {
      this.serviceService.openSnackBar('Please Enter Title One', 'Close');
    } else if (this.titletwo == null || this.titletwo === undefined) {
      this.serviceService.openSnackBar('Please Enter Title Two', 'Close');
    } else if (this.titlethree === '' || this.titlethree == null || this.titlethree === undefined) {
      this.serviceService.openSnackBar('Please Enter Title Three', 'Close');
    } else if (this.notification === '' || this.notification == null || this.notification === undefined) {
      this.serviceService.openSnackBar('Please Enter Notification ', 'Close');
    } else {
      this.isLoaderShow = true;
      this.serviceService.addSetting(SetArray)
        .subscribe(
          (          data: any) => {
          this.serviceService.openSnackBar('Update Setting  Successfully', 'Close');
          this.router.navigate(['/setting']);
          this.getAllSetting();
        },
          (        error: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Some Error During Update Setting', 'Close');
        });
    }
  }
}
