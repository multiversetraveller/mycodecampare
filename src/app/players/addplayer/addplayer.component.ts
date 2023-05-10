import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ApiservicesService } from 'src/app/apiservices.service';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/app-material/date.adapter';

@Component({
  selector: 'app-addplayer',
  templateUrl: './addplayer.component.html',
  styleUrls: ['./addplayer.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ],

})
export class AddplayerComponent implements OnInit {
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
  isPlayerImageChanged = false;
  playerImage:any = '';
  teamdetail: any[] = [];
  playerteam: any;
  txtOfficeAddress = '';
  txtOfficeTelephone = '';
  txtResidenceAddress = '';
  txtResidenceTelephone = '';
  selected = '';
  registeno = '';
  txtResidenceMobile = '';
  txtOfficeMobile = '';
  txtNative = '';
  bidvalue = '';
  playerclass = '';
  bidstatus:any = '';
  playername = '';
  fathername = '';
  surname = '';
  txtplayerBdate: any;
  playerAge = 0;
  maritalatatus = '';
  playeremail = '';
  playermobno = '';
  weastsize = '';
  tracksize = '';
  Tshirtsize = '';
  luckyno = '';
  Bowler = '';
  AllRounder = '';
  Batsman = '';
  WicketKeeper = '';
  selectedTeam = '';
  BowlerType = '';
  Batsman_Type = '';
  playerId: any;
  isLoaderShow = false;
  trade: any;
  checkAllTrades: any;
  isTrade: any;
  imageQuality = 70;
  resizeToWidth = 256;
  resizeToHeight = 256;
  seasons: string[] = ['Bid', 'Unbid'];
  playerc: string[] = ['Normal', 'Star'];
  mStatus: string[] = ['Single', 'Married'];


  constructor(private serviceService: ApiservicesService, public  router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.playerId = this.route.snapshot.params['playerId'];
    this.popupHeight = (window.innerHeight - 60) + 'px';
    this.transform = {
      scale: this.currentScale
    };
    // if (this.playerId !== undefined) {
      this.getPlayerById();
    // }
      this.getTeamdetail();
  }

  getPlayerById() {
    this.isLoaderShow = true;
    this.serviceService.getPlayerById(this.playerId).subscribe(
      (data:any) => {
        console.log(data);
        this.isLoaderShow = false;
        this.serviceService.getBase64Photo(data['player_image']).then((image:any) => {
          this.playerImage = image['base64'];
        });
       this.isLoaderShow = false;
       this.selected = data['playertype'];
       this.registeno = data['regi_id'];
       this.selectedTeam = data['team_id'];
       console.log(this.selectedTeam ,'/////////////')
       this.bidvalue = data['biding_amount'];
       this.playerclass = data['player_class'];
       this.bidstatus = data['biding_status'];
       this.playername = data['name'];
       this.fathername = data['fathername'];
       this.surname = data['surname'];
       this.playerAge = data['age'];
       this.maritalatatus = data['marital_status'];
       this.playeremail = data['email'];
       this.txtResidenceAddress = data['resadd'];
       this.txtResidenceTelephone = data['restelephone'];
       this.playermobno = data['resmobile'];
       this.txtOfficeAddress = data['officeadd'];
       this.txtOfficeTelephone = data['officetelephone'];
       this.txtOfficeMobile = data['officemobile'];
       this.txtNative = data['native'];
       this.weastsize = data['weastsize'];
       this.tracksize = data['tracksize'];
       this.Tshirtsize = data['tshirtsize'];
       this.luckyno = data['luckyno'];
       this.Bowler = data['bowler'];
       this.AllRounder = data['allrounder'];
       this.Batsman = data['batsman'];
       this.WicketKeeper = data['wicket_keeper'];
       this.BowlerType = data['bowler_type'];
       this.Batsman_Type = data['batsman_type'];
       let dateFormat = '';
       const dateArr = data['dob'].split('/');
       dateFormat = `${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`;
       this.txtplayerBdate = new Date(dateFormat);
  },
  (data:any) => {
    this.isLoaderShow = false;
    this.serviceService.openSnackBar('Failed to Fetch Data Of Team', 'Close');
  }
  );
}

allTrades(event:any) {
  if (event.checked) {
    this.BowlerType = 'true';
    this.Batsman_Type = 'true';
  } else {
   this.BowlerType = '';
   this.Batsman_Type = '';
  }
}

  getTeamdetail() {
    this.serviceService.getTeamdetail()
    .subscribe( data => {
                this.teamdetail.push(data);
                this.playerteam = this.teamdetail[0].data;
    });
  }


  sameAdd(event:any) {
    if (event.checked) {
      this.txtOfficeAddress = this.txtResidenceAddress;
      this.txtOfficeTelephone = this.txtResidenceTelephone;
    } else {
      this.txtOfficeAddress = '';
      this.txtOfficeTelephone = '';
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

  fileChangeEvent(event: any, type:any): void {
    this.croppingType = type;
    this.imageChangedEvent = event;
    this.isCropper = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
      this.isPlayerImageChanged = true;
      this.playerImage = event.base64;
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

  calculateAge(event:any) {
    if (event.value) {
      const timeDiff = Math.abs(Date.now() - new Date(event.value).getTime());
      this.playerAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
  }

  addplayer(h: any) {
    let finalDate = '';
    let date = '';
    let month = '';
    const datetime = new Date(this.txtplayerBdate);
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
    let playerIdArray = {};
    if (this.playerId !== undefined) {
      playerIdArray = {
        player_id: this.playerId,
        isPlayerImageChanged: this.isPlayerImageChanged
      };
    }
    if(this.selectedTeam===undefined){
       this.selectedTeam = ' ';
    }
  const playerArray = {
      series: window.localStorage.getItem('selectedSeries'),
      player_image: this.playerImage,
      playertype: this.selected,
      regi_id: this.registeno,
      team_id: Number(this.selectedTeam),
      biding_amount: this.bidvalue,
      player_class: this.playerclass,
      name: this.playername,
      fathername: this.fathername,
      surname: this.surname,
      dob: finalDate,
      age: this.playerAge,
      marital_status: this.maritalatatus,
      email: this.playeremail,
      resadd: this.txtResidenceAddress,
      restelephone: this.txtResidenceTelephone,
      resmobile: this.playermobno,
      officeadd: this.txtOfficeAddress,
      officetelephone: this.txtOfficeTelephone,
      officemobile: this.txtOfficeMobile,
      biding_status:this.bidstatus,
      native: this.txtNative,
      weastsize: this.weastsize,
      tracksize: this.tracksize,
      tshirtsize: this.Tshirtsize,
      luckyno: this.luckyno,
      bowler: this.Bowler,
      allrounder: this.AllRounder,
      batsman: this.Batsman,
      wicket_keeper: this.WicketKeeper,
      bowler_type: this.BowlerType,
      batsman_type: this.Batsman_Type,
      ...playerIdArray
  };
   if (this.playername === '' || this.playername == null || this.playername === undefined) {
    this.serviceService.openSnackBar('Please Enter Player Name', 'Close');
   } else if (this.bidstatus === '' || this.bidstatus == null || this.bidstatus === undefined) {
    this.serviceService.openSnackBar('Please Enter Bid Status', 'Close');
   } 
   else {
    this.isLoaderShow = true;
    if (this.playerId !== undefined) {
      this.serviceService.updatePlayer(playerArray).subscribe(
        (        data: any) => {
          this.serviceService.openSnackBar('Player Updated Successfully', 'Close');
          this.router.navigate(['/players']);
        },
        (error:any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Some Error During Update Team', 'Close');
        });
    } else {

    this.serviceService.addNewPlayer(playerArray)
    .subscribe( (data:any) => {
      this.serviceService.openSnackBar('Player Added Successfully', 'Close');
      this.router.navigate(['/players']);
    },
    (error:any) => {
      this.isLoaderShow = false;
      this.serviceService.openSnackBar('Some Error During Add Player', 'Close');
    });
  }
  }
}
  back() {
    this.router.navigate(['/players']);
  }


}
