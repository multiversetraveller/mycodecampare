import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ApiservicesService } from 'src/app/apiservices.service';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/app-material/date.adapter';

@Component({
  selector: 'app-addcommittee',
  templateUrl: './addcommittee.component.html',
  styleUrls: ['./addcommittee.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class AddcommitteeComponent implements OnInit {
  imageChangedEvent: any = '';
  txtAge = 0;
  isCropper = false;
  memberImage:any = '';
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
  txtSelectPlayer: any;
  txtType: any;
  txtMemberName: any;
  txtFatherName: any;
  txtSurname: any;
  txtBirthDate: any;
  txtMobile: any;
  isLoaderShow = false;
  com_mem_Id: any;
  iscommemImageChanged = false;
imageQuality = 70;
resizeToWidth =256;
resizeToHeight =256;

  constructor(public  serviceService: ApiservicesService, public route: ActivatedRoute, public router: Router) {  }

  ngOnInit() {
    this.com_mem_Id = this.route.snapshot.params['com_mem_Id'];
    this.popupHeight = (window.innerHeight - 60) + 'px';
    this.transform = {
      scale: this.currentScale
    };
    if (this.com_mem_Id !== undefined) {
      this.getCommitieById();
    }
  }

  getCommitieById() {
    this.isLoaderShow = true;
    this.serviceService.getCommitieById(this.com_mem_Id)
    .subscribe(
      (      data: { [x: string]: any; }) => {
        let dateFormat = '';
        const dateArr = data['dob'].split('/');
        dateFormat = `${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`;

        this.serviceService.getBase64Photo(data['img']).then((image:any) => {
          this.memberImage = image['base64'];
        });
        this.isLoaderShow = false;
        this.txtSelectPlayer = data['player_id'];
        this.txtType = data['type'];
        this.txtMemberName = data['name'];
        this.txtFatherName = data['fathername'];
        this.txtSurname = data['surname'];
        this.txtBirthDate = new Date(dateFormat);
        this.txtAge = data['age'];
        this.txtMobile = data['mobile'];

      });
  }
  calculateAge(event: { value: string | number | Date; }) {
    if (event.value) {
      const timeDiff = Math.abs(Date.now() - new Date(event.value).getTime());
      this.txtAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.isCropper = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.iscommemImageChanged = true;
    this.memberImage = event.base64;
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

  save() {
    let finalDate = '';
    let date = '';
    let month = '';
    const datetime = new Date(this.txtBirthDate);
    const dd = datetime.getDate();
    const mm = datetime.getMonth() + 1;
    const yyyy = datetime.getFullYear();
    if (dd < 10) {
      date = `0${dd}`;
    } else {
      date = `${dd}`;
    }
    if (mm < 10) {
      month = `0${mm}`;
    } else {
      month = `${mm}`;
    }
    finalDate = `${date}/${month}/${yyyy}`;

    let com_mem_IdArray = {};
    if (this.com_mem_Id !== undefined) {
      com_mem_IdArray = {
        com_mem_id: this.com_mem_Id,
        iscommemImageChanged: this.iscommemImageChanged
      };
    }

    const commitieArray = {
      series: window.localStorage.getItem('selectedSeries'),
      player_id: this.txtSelectPlayer,
      type: this.txtType,
      name: this.txtMemberName,
      fathername: this.txtFatherName,
      surname: this.txtSurname,
      dob: finalDate,
      age: this.txtAge,
      mobile: this.txtMobile,
      img: this.memberImage,
      ...com_mem_IdArray
    };
    if (this.txtMemberName === '' || this.txtMemberName == null || this.txtMemberName === undefined) {
      this.serviceService.openSnackBar('Please Enter MemberName', 'Close');
    } else if (this.txtFatherName === '' || this.txtFatherName == null || this.txtFatherName === undefined) {
      this.serviceService.openSnackBar('Please Enter Member FatherName', 'Close');
    } else if (this.txtSurname === '' || this.txtSurname == null || this.txtSurname === undefined) {
      this.serviceService.openSnackBar('Please Enter SurName', 'Close');
    } else if (this.txtBirthDate === '' || this.txtBirthDate == null || this.txtBirthDate === undefined) {
      this.serviceService.openSnackBar('Please Select Date of BIRTH', 'Close');
    } else if (this.txtMobile === '' || this.txtMobile == null || this.txtMobile === undefined) {
      this.serviceService.openSnackBar('Please Enter Your Mobile Number', 'Close');
    } else if (this.memberImage === '' || this.memberImage == null || this.memberImage === undefined) {
      this.serviceService.openSnackBar('Please Enter Your Image', 'Close');
    } else {
    this.isLoaderShow = true;
    if (this.com_mem_Id !== undefined) {
      this.serviceService.updateCommitte(commitieArray).subscribe(
        (data:any) => {
          this.serviceService.openSnackBar('Committee Member Updated Successfully', 'Close');
          this.router.navigate(['/committee']);
        },
        (error:any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Some Error During Update Committee Member', 'Close');
        });
    } else {
    this.serviceService.addCommitte(commitieArray)
    .subscribe( (data:any) => {
      this.serviceService.openSnackBar('Committee Member Added Successfully', 'Close');
      this.router.navigate(['/committee']);
    },
    (error:any) => {
      this.isLoaderShow = false;
      this.serviceService.openSnackBar('Some Error During Add Committee Member', 'Close');
    });
  }
 }
}
  back() {
    this.router.navigate(['/committee']);
  }
}
