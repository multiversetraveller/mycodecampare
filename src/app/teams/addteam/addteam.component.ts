import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../app-material/date.adapter';
import { ApiservicesService } from 'src/app/apiservices.service';

@Component({
  selector: 'app-addteam',
  templateUrl: './addteam.component.html',
  styleUrls: ['./addteam.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class AddteamComponent implements OnInit {
  imageChangedEvent: any = '';
  isCropper = false;
  resizeToWidth = 256;
  resizeToHeight = 256;
  imageQuality = 70;
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

  txtOwnerBdate: any;
  txtOwnerAge:any = 0;
  txtOfficeAddress = '';
  txtResidenceAddress = '';
  txtOfficeTelephone = '';
  txtResidenceTelephone = '';
  txtOfficeMobile = '';
  txtResidenceMobile = '';
  txtTeamName = '';
  txtTeamType = '';
  txtOwnerName = '';
  txtOwnerFatherName = '';
  txtOwnerSurname = '';
  txtTeamPoint = '';
  txtNative = '';
  teamImage:any = '';
  croppingType: any;
  ownerImage:any = '';
  isLoaderShow = false;
  teamId: any;
  responseTeamImage = '';
  responseOwnerImage = '';
  isTeamImageChanged = false;
  isOwnerImageChanged = false;
  constructor(
    public router: Router,
    private serviceService: ApiservicesService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.teamId = this.route.snapshot.params['teamId'];
    this.popupHeight = (window.innerHeight - 60) + 'px';
    this.transform = {
      scale: this.currentScale
    };
    if (this.teamId !== undefined) {
      this.getTeamDetail();
    }
  }

  getTeamDetail() {
    this.isLoaderShow = true;
    this.serviceService.getTeamDetailById(this.teamId).subscribe(
      (      data:any) => {
        let dateFormat = '';
        const dateArr = data['dob'].split('/');
        dateFormat = `${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`;
        this.serviceService.getBase64Photo(data['team_image']).then((image:any) => {
          this.teamImage = image['base64'];
        });
        this.serviceService.getBase64Photo(data['owner_img']).then((image:any) => {
          this.ownerImage = image['base64'];
        });
        this.isLoaderShow = false;
        this.txtTeamName = data['team_name'];
        this.txtTeamType = data['team_type'];
        this.txtOwnerName = data['name'];
        this.txtOwnerSurname = data['surname'];
        this.txtOwnerFatherName = data['fathername'];
        this.txtTeamPoint = data['team_point'];
        this.txtOwnerBdate = new Date(dateFormat);
        this.txtOwnerAge = data['age'];
        this.txtResidenceAddress = data['resadd'];
        this.txtResidenceTelephone = data['restelephone'];
        this.txtResidenceMobile = data['resmobile'];
        this.txtOfficeAddress = data['officeadd'];
        this.txtOfficeTelephone = data['officetelephone'];
        this.txtOfficeMobile = data['officemobile'];
        this.txtNative = data['native'];
      },
      (      error: any) => {
        this.isLoaderShow = false;
        this.serviceService.openSnackBar('Failed to Fetch Data Of Team', 'Close');
      }
    );
  }

  calculateAge(event: { value: string | number | Date; }) {
    if (event.value) {
      const timeDiff = Math.abs(Date.now() - new Date(event.value).getTime());
      this.txtOwnerAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
  }

  sameAdd(event: { checked: any; }) {
    if (event.checked) {
      this.txtOfficeAddress = this.txtResidenceAddress;
      this.txtOfficeTelephone = this.txtResidenceTelephone;
      this.txtOfficeMobile = this.txtResidenceMobile;
    } else {
      this.txtOfficeAddress = '';
      this.txtOfficeTelephone = '';
      this.txtOfficeMobile = '';
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

  fileChangeEvent(event: any, type: any): void {
    this.croppingType = type;
    this.imageChangedEvent = event;
    this.isCropper = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    if (this.croppingType === 'teamimg') {
      this.isTeamImageChanged = true;
      this.teamImage = event.base64;
    } else {
      this.isOwnerImageChanged = true;
      this.ownerImage = event.base64;
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

  addteam(t: any) {
    let finalDate = '';
    let date = '';
    let month = '';
    const datetime = new Date(this.txtOwnerBdate);
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
    let teamIdArray = {};
    if (this.teamId !== undefined) {
      teamIdArray = {
        team_id: this.teamId,
        isTeamImageChanged: this.isTeamImageChanged,
        isOwnerImageChanged: this.isOwnerImageChanged
      };
    }
    const teamArray = {
      series: window.localStorage.getItem('selectedSeries'),
      team_name: this.txtTeamName,
      team_image: this.teamImage,
      team_type: this.txtTeamType,
      team_point: this.txtTeamPoint,
      star_player_id: '0',
      owner_img: this.ownerImage,
      surname: this.txtOwnerSurname,
      name: this.txtOwnerName,
      fathername: this.txtOwnerFatherName,
      dob: finalDate,
      age: this.txtOwnerAge,
      resadd: this.txtResidenceAddress,
      restelephone: this.txtResidenceTelephone,
      resmobile: this.txtResidenceMobile,
      officeadd: this.txtOfficeAddress,
      officetelephone: this.txtOfficeTelephone,
      officemobile: this.txtOfficeMobile,
      native: this.txtNative,
      weastsize: '',
      tracsize: '',
      tshirtsize: '',
      ...teamIdArray
    };
    if (this.txtTeamName === '' || this.txtTeamName == null || this.txtTeamName === undefined) {
      this.serviceService.openSnackBar('Please Enter Team Name', 'Close');
    } 

    else if (this.txtTeamType === '' || this.txtTeamType == null || this.txtTeamType === undefined) {
      this.serviceService.openSnackBar('Please Enter Team Type', 'Close');
    } else if (this.txtTeamPoint === '' || this.txtTeamPoint == null || this.txtTeamPoint === undefined) {
      this.serviceService.openSnackBar('Please Enter Points Of Team', 'Close');
    } 
     else {
      this.isLoaderShow = true;
      if (this.teamId !== undefined) {
        this.serviceService.updateTeam(teamArray).subscribe(
          (          data: any) => {
            this.serviceService.openSnackBar('Team Updated Successfully', 'Close');
            this.router.navigate(['/teams']);
          },
          (          error: any) => {
            this.isLoaderShow = false;
            this.serviceService.openSnackBar('Some Error During Update Team', 'Close');
          });
      } else {
        this.serviceService.addNewTeam(teamArray).subscribe(
          (          data: any) => {
            this.serviceService.openSnackBar('Team Added Successfully', 'Close');
            this.router.navigate(['/teams']);
          },
          (          error: any) => {
            this.isLoaderShow = false;
            this.serviceService.openSnackBar('Some Error During Add Team', 'Close');
          });
      }
    }
  }

  back() {
    this.router.navigate(['/teams']);
  }

}
