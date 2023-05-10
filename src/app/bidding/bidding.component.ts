import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ApiservicesService } from '../apiservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LivescoreService } from '../livescore.service';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

export interface DialogData {
  animal: string;
  namee: string;
}
export interface PeriodicElement {
  no: number;
  team_image: string;
  team_name: string;
  team_type: string;
  team_bid: number;
  team_player: number;
}

export interface PeriodicElementplayer {
  no: number;
  regi_id: number;
  player_image: string;
  name: string;
  team_name: string;
  biding_amount: number;
  action: number;
}

export interface PeriodicElementbidsetting {
  no:any
  check: any;
  column: any,
  order_id: any;
  textbox: any;

}

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})
export class BiddingComponent implements OnInit {
  active = 1;
  txtOwnerAge = 0;
  imageChangedEvent: any = '';
  isCropper = false;
  croppedImage: any = '';
  croppingType: any;
  selectbidding: any;
  // selectb = 'ON';
  selected = '';
  firstTeam: any;
  registeno = '';
  regi_id: any;
  animal!: string;
  namee!: string;
  selectedTeam = '';
  bidmatchseries: any;
  selectedplayer: any;
  bidonoff = '';
  bid = '';
  teamdetail: any[] = [];
  resultDataarray: any[] = [];
  playerimg: any[] = [];
  hideshowtv: any[] = [];
  // databid :any[]=[];
  public bidData: any;
  playerimgsearch: any[] = [];
  editplayerimg: any[] = [];
  playerteam: any;
  teampoint!: '';
  bidsocket: any[] = [];
  editbidarray: any[] = [];
  playerimage: any;
  series: any;
  enterbidinng!: number;
  resultData: any;
  getselectteam: any;
  total_player: any;
  min_bid: any;
  titlethree: any;
  txtreg: any;
  notification: any;
  setting: any;
  settingtxt: any[] = [];
  changeplayerarray: any[] = [];
  selectedFeatures: any[] = [];
  public bidmessages: string[] = [];
  public bidmessage!: string;
  selecteddd: any;
  selectedp: any;
  isbidShow = false;
  isdataShow = false;
  soldbuttonDisabled = true;
  unsoldbuttonDisabled = true;
  point: any;
  maxpoint: any;
  bidarray: any;
  regi_no: any;
  regiid: any;
  dob: any;
  age: any;
  native: any;
  playertp: any;
  public jsonarray: any;
  name: any;
  mobile: any;
  mtype1: any;
  regnum: any;
  bidingamount: any;
  player_image: any;
  moduletype: any;
  animationdata: any;
  onlyaudio: any;
  firecrackers: any;
  audio: any;
  unsoldgif: any;
  cleardata: any;
  team: any;
  teamimg:any;
  t1!: ' ';
  count = 0;
  roundtext: any;
  firstamt = 0;
  cropper = {
    x1: 0,
    y1: 0,
    x2: 150,
    y2: 150
  };
  matchId: '';
  unbid: any;
  displayedColumns: string[] = [
    'no',
    'team_image',
    'team_name',
    'team_type',
    'team_bid',
    'team_player'
  ];
  ELEMENT_DATA: PeriodicElement[] = [];
  dataSource: any;
  playerDetail: any[] = [];
  player: any;

  @ViewChild('paginator') paginator!: MatPaginator;

  displayedColumnsplayer: string[] = [
    'no',
    'regi_id',
    'player_image',
    'name',
    'team_name',
    'biding_amount',
    'action'];
  ELEMENT_DATAplayer: PeriodicElementplayer[] = [];
  dataSourceplayer: any;
  playerDetailplayer: any[] = [];
  @ViewChild(MatPaginator) paginatorplayer!: MatPaginator;

  


  isLoaderShow = false;
  results: any;
  ticker: any;
  points!: number;
value: any;
value1: any;

  constructor(private serviceService: ApiservicesService,
    public router: Router,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private liveservice: LivescoreService) {
    this.matchId = this.route.snapshot.params['matchId'];
    this.series = window.localStorage.getItem('selectedSeries');
    this.getTeamdetail();
  }




  ngOnInit() {
    this.enterbidinng = 0;
    this.isbidShow = false;
    this.isdataShow = false;
    this.soldbuttonDisabled = true;
    this.unsoldbuttonDisabled =true;
    this.roundtext = 1;
    this.getTeamdetail();
    this.getPlayer();
    this.getTeam();
    this.getAllSetting();
    this.liveservice.getMessages().subscribe((bidmessage: string) => {
      this.bidmessages.push(bidmessage);
    });
  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
  fileChangeEvent(event: any, type: any): void {
    this.croppingType = type;
    this.imageChangedEvent = event;
    this.isCropper = true;
  }
  openPushDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const DIALOGREF = this.dialog.open(settingpopup, {
    
      autoFocus: false,
      data: {
      }

    });
    DIALOGREF.afterClosed().subscribe(result => {
    });
  }
  addmaxbid(e:any) {
    this.isbidShow = true;
    this.jsonarray = {};
    this.maxpoint = '';
    this.point = '';
    for (let i = 0; i < this.playerteam.length; i++) {
      var selectedteamid = this.playerteam[i].team_id;
      var selecteddp = Number(this.selectedTeam);
      if (selectedteamid == selecteddp) {
        this.point = this.playerteam[i].team_bid;
        this.maxpoint = this.playerteam[i].team_bidd;
        this.moduletype = "bid";
        this.series = window.localStorage.getItem('selectedSeries');
        this.jsonarray = {
          "col1": { "moduletype": this.moduletype, "playername": this.playerteam[i].team_name, "hideshow": this.hideshowtv, "addpoint": this.enterbidinng, "series": this.series }
        }
        this.sendMessage(this.bidData, this.jsonarray);
        // this.playerteam=[];

      } else {
        (error:any) => { console.log(error); }
      }
    }
  }
  getTeamdetail() {
    this.serviceService.getteam()
      .subscribe((data:any) => {
        this.teamdetail.push(data);
        this.playerteam = this.teamdetail[0].data;
        var teampoint = this.playerteam[0].team_point;

      });
  }

  searchimg() {
    // this.firstamt=0;
    this.count = 0;
    this.isdataShow = true;
    this.soldbuttonDisabled = false;
    this.unsoldbuttonDisabled =false;
    this.playerimg = [];
    this.bidData = [];
    this.enterbidinng = 0;
    this.serviceService.searchimage(this.registeno)
      .subscribe((data:any) => {
        this.results = data;
        if (this.results.flag == true) {
          this.playerimg.push(data);
          this.playerimgsearch = this.playerimg;
          this.bidsocket.push(this.playerimgsearch[0]);
          this.regiid = this.playerimgsearch[0].regi_id;
          this.name = this.playerimgsearch[0].name;
          this.dob = this.playerimgsearch[0].dob;
          this.age = this.playerimgsearch[0].age;
          this.native = this.playerimgsearch[0].native;
          this.playertp = this.playerimgsearch[0].playertype;
          this.mobile = this.playerimgsearch[0].resmobile;
          this.player_image = this.playerimgsearch[0].player_image;
          this.bidData.push(data);
          this.searchimghideshow();
        } else { this.serviceService.openSnackBar('Player not found', 'Close'); }
      },
        (error:any) => {
          console.log(error);
        });
  }

  searchimghideshow() {
    this.isdataShow = true;
    this.hideshowtv = [];
    // this.bidData = [];
    this.serviceService.sockethideshow()
      .subscribe((data:any) => {
        this.results = data;
        if (this.results.flag == true) {
          this.hideshowtv.push(data);
          this.moduletype = "bid";
          this.animationdata = "animation";
          this.onlyaudio = "audiohere"
          this.series = window.localStorage.getItem('selectedSeries');
          this.jsonarray = {
            "col1": { "moduletype": this.moduletype, "hideshow": this.hideshowtv, "series": this.series, "animation": this.animationdata, "onlyaudio": this.onlyaudio }
          }
          this.sendMessage(this.bidData, this.jsonarray);
        } else { this.serviceService.openSnackBar('Player not found', 'Close'); }
      },
      );
  }

  stop() {
    this.serviceService.stopbidding()
      .subscribe((data:any) => {
        this.results = data;
        if (this.results.flag == true) {
          this.serviceService.openSnackBar('Bidding Stop SuccessFully  ', 'Close');
          this.clear();
          this.router.navigate(['/bidding']);
        } else {
          this.serviceService.openSnackBar('Error while stop bidding', 'Close');
        }
      },);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  clearsearch1(){
    this.value1 = '';
    this.dataSource.filter ='';
  }
  applyFilterplayer(event: Event) {
    const filterValueplayer = (event.target as HTMLInputElement).value;
    this.dataSourceplayer.filter = filterValueplayer.trim().toLowerCase();
  }
  clearsearch(){
    this.value = '';
    this.dataSourceplayer.filter ='';
  }
  getTeam() {
    this.ELEMENT_DATA = [];
    this.playerDetail = [];
    this.isLoaderShow = true;
    this.serviceService.getteam().subscribe(
      (data:any) => {
        this.isLoaderShow = false;
        this.playerDetail.push(data);
        this.player = this.playerDetail[0].data;
        let i = 1;
        for (const item of this.player) {
          this.ELEMENT_DATA.push({
            no: i++,
            team_bid: item.team_bid,
            team_player: item.team_player,
            team_image: item.team_image,
            team_type: item.team_type,
            team_name: item.team_name,
          });
        }
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      },
      (error:any) => {
        this.isLoaderShow = false;
      });
  }
  getPlayer() {
    this.ELEMENT_DATAplayer = [];
    this.playerDetail = [];
    this.isLoaderShow = true;
    this.serviceService.getplayer().subscribe(
      (data:any) => {
        this.isLoaderShow = false;
        this.playerDetail.push(data);
        this.player = this.playerDetail[0].data;
        let i = 1;
        for (const item of this.player) {
          this.ELEMENT_DATAplayer.push({
            no: i++,
            regi_id: item.regi_id,
            name: item.name,
            player_image: item.player_image,
            team_name: item.team_name,
            biding_amount: item.biding_amount,
            action: item.regi_id
          });
        }
        this.dataSourceplayer = new MatTableDataSource<PeriodicElementplayer>(this.ELEMENT_DATAplayer);
        this.dataSourceplayer.paginator = this.paginatorplayer;
      },
      (error:any) => {
        this.isLoaderShow = false;
      });
  }

  savebidding() {
    // if(this.point<this.enterbidinng){
    if (this.enterbidinng > this.point) {
      // alert("please enter Bid Point < "+this.point);
      this.serviceService.openSnackBar('please enter Bid Point <' + this.point, 'Close');
    }
    else if (this.registeno === '' || this.registeno == null || this.registeno === undefined) {
      this.serviceService.openSnackBar('Please Enter Registration Number', 'Close');
    }
    else if (this.enterbidinng == null || this.enterbidinng === undefined) {
      this.serviceService.openSnackBar('Please Enter Bidding Points', 'Close');
    } else if (this.selectedTeam == 'selectedTeam' ) {
      this.serviceService.openSnackBar('Please Select Team', 'Close');
    }else if (this.roundtext === '' || this.roundtext == null || this.roundtext === undefined) {
      this.serviceService.openSnackBar('Please Enter Round', 'Close');
    } else {
      for (let i = 0; i < this.playerteam.length; i++) {
        var selectedteamid = this.playerteam[i].team_id;
        var selecteddp = Number(this.selectedTeam);
        if (selectedteamid == selecteddp) {
          this.point = this.playerteam[i].team_bid;
        } else {
          (error:any) => { console.log(error); }
        }
      }
      const data = {
        selectteam: Number(this.selectedTeam),
        series: this.series,
        maxbid: this.point,
        txtbiding: this.enterbidinng,
        biding_regi_id: this.registeno,
        bidding_type: this.playerimgsearch[0].biding_status,
      };

      this.results = [];
      this.serviceService.savebid(data).subscribe(
        (data:any) => {
          this.results = data;
          if (this.results.flag == true) {

            // this.point='';
            this.serviceService.openSnackBar('Bidding Successfully', 'Close');

            this.router.navigate(['/bidding']);
            this.whatsappcall();
            this.getPlayer();
            this.t1 = ' ';
            this.registeno = ' ';
            this.regiid = '';
            this.name = ' ';
            this.dob = ' ';
            this.age = ' ';
            this.point = '';
            this.maxpoint = '';
            this.native = ' ';
            this.playertp = ' ';
            this.mobile = ' ';
            this.player_image = ' ';
            this.selectbidding = '';
            this.isbidShow = true;
            for (let i = 0; i < this.playerteam.length; i++) {
              var selectedteamid = this.playerteam[i].team_id;
              var selecteddp = Number(this.selectedTeam);
              if (selectedteamid == selecteddp) {
                this.point = this.playerteam[i].team_bid;
                this.teamimg = this.playerteam[i].team_image;
                this.moduletype = "bid";
                this.firecrackers = "firecrackers";
                this.audio = "on";
                this.series = window.localStorage.getItem('selectedSeries');
                this.soldbuttonDisabled = true;
                this.unsoldbuttonDisabled = true;
                this.jsonarray = {
                  "col1": { "moduletype": this.moduletype, "playername": this.playerteam[i].team_name,"teamimg":this.teamimg, "addpoint": this.enterbidinng, "hideshow": this.hideshowtv, "firecrackers": this.firecrackers, "audio": this.audio, "series": this.series }
                }
                this.sendMessage(this.bidData, this.jsonarray);
              }

            }
            this.registeno = '';
            this.point='';
            this.selectedTeam = '';
            this.enterbidinng = 0;
          } else {
            (error:any) => {
              this.serviceService.openSnackBar('player already bidding', 'Close');
            }
          }
        },

        (error:any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Some Error During Bidding', 'Close');
        });
    }
  }

  whatsappcall() {
    this.team = Number(this.selectedTeam);
    this.serviceService.whatsaapmsg(this.registeno, this.team, this.enterbidinng).subscribe(
      (data:any) => {
      },
      (error:any) => {
      });
  }

  
  unbidding(regi_id: string) {
    this.unbid = this.playerDetail[0].data;
    for (let i = 0; i < this.unbid.length; i++) {
      var selectedregid = this.unbid[i].regi_id;
      // var selecteddp = Number(this.selectedTeam);
      if (selectedregid == regi_id) {
        this.bidingamount = this.unbid[i].biding_amount;
      } else {
        (error:any) => { console.log(error); }
      }
    }
    this.isbidShow = true;
    const data = {
      series: this.series,
      selectteam: 0,
      maxbid: Number(this.bidingamount),
      txtbiding: 0,
      biding_regi_id: Number(regi_id),
      bidding_type: 1,
    };
    const buttonClicked = confirm('Are You Want To Sure Unbidding This Member');
    if (buttonClicked === true) {
      this.serviceService.saveunbid(data).subscribe(
        (data:any) => {
          this.results = data;
          if (this.results.flag == true) {
            this.serviceService.openSnackBar('Unbidding Successfully', 'Close');
            this.router.navigate(['/bidding']);
            this.whatsappcall();
            this.getPlayer();
            window.location.reload();
          } else {
            (error:any) => { console.log(error); }
          }
        },

        (error:any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Some Error During unBidding', 'Close');
        });
    }
  }

  // SOCKET PROGRAMMING FOR LIVE TV SCREEN

  sendMessage(bidmessage: any, jsonarray: any) {
    //console.log(_.cloneDeep(bidmessage, jsonarray));
    setTimeout(() => {
      this.liveservice.sendMessage(bidmessage, this.jsonarray);
    }, 500);
  }
  unbiddedlist() {
    const series = window.localStorage.getItem('selectedSeries');
    window.open(`http://demo.vthinksolution.com/cricket/cric/services/scoringapp/unbidded_list.php?series=${series}`);
  }

  unsoldplayer() {
    this.regi_id = this.playerimgsearch[0].regi_id;
    this.bidonoff = "ON";
    this.serviceService.unsold(this.selectedplayer, this.regi_id, this.regi_id, this.bidonoff, this.roundtext).subscribe(
      (data:any) => {
        this.moduletype = "bid";
        this.unsoldgif = "unsoldgif";
        this.series = window.localStorage.getItem('selectedSeries');
        this.jsonarray = {
          "col1": { "moduletype": this.moduletype, "hideshow": this.hideshowtv, "unsoldgif": this.unsoldgif, "series": this.series }
        }
        console.log(this.jsonarray);
        this.sendMessage(this.bidData, this.jsonarray);
        this.serviceService.openSnackBar('player unsold successfully', 'Close');
      },
      (error:any) => {
        this.serviceService.openSnackBar('Error during unsold player', 'Close');
      });
  }

  changeplayer() {
    this.teamdetail = [];
    this.point = '';
    this.maxpoint = '';
    this.selectedTeam = '';
    this.t1 = ' ';
    this.serviceService.getteam()
      .subscribe((data:any) => {
        this.teamdetail.push(data);
        this.playerteam = this.teamdetail[0].data;
        var teampoint = this.playerteam[0].team_point;

      });
    // this.selectedp=' ';
    this.clear();
    this.enterbidinng = 0;
    this.bidonoff = 'ON';
    this.serviceService.UNbid(this.selectedplayer, this.bidonoff, this.roundtext).subscribe(
      (data:any) => {
        this.changeplayerarray = [];
        this.changeplayerarray.push(data);
        this.regnum = this.changeplayerarray[0].regi_no;
        this.roundtext = this.changeplayerarray[0].playerround;
        this.playerchangeimg(this.regnum);
        this.soldbuttonDisabled=false;
        this.unsoldbuttonDisabled =false;
      }, (error:any) => {
      });


  }

  playerchangeimg(regnum: any) {
    this.isdataShow = true;
    this.playerimg = [];
    this.serviceService.searchimage(this.regnum)
      .subscribe((data:any) => {
        // this.results = data;
        // if (data == true) {
          this.playerimg.push(data);
          this.playerimgsearch = this.playerimg;
          this.bidsocket.push(this.playerimgsearch[0]);
          this.registeno = this.playerimgsearch[0].regi_id;
          this.regiid = this.playerimgsearch[0].regi_id;
          this.name = this.playerimgsearch[0].name;
          this.selected = this.playerimgsearch[0].team_name;
          this.dob = this.playerimgsearch[0].dob;
          this.age = this.playerimgsearch[0].age;
          this.native = this.playerimgsearch[0].native;
          this.playertp = this.playerimgsearch[0].playertype;
          this.mobile = this.playerimgsearch[0].resmobile;
          this.player_image = this.playerimgsearch[0].player_image;
          this.serviceService.openSnackBar('Get Change Player Data Successfully', 'Close');
          this.getTeamdetail();
        // } else {
        //   this.serviceService.openSnackBar('player not found...', 'Close');
        // }
      },
        (error:any) => {

          console.log(error);
        });
  }

  editbidding(regi_id: any) {
    this.isdataShow = true;
    this.playerimg = [];
    this.serviceService.editPlayer(regi_id)
      .subscribe((data:any) => {
        this.playerimg.push(data);
        this.playerimgsearch = this.playerimg;
        this.regiid = this.playerimgsearch[0].data.regi_id;
        this.name = this.playerimgsearch[0].data.name;
        this.t1 = this.playerimgsearch[0].data.team_id;
        this.enterbidinng = this.playerimgsearch[0].data.biding_amount;
        this.dob = this.playerimgsearch[0].data.dob;
        this.age = this.playerimgsearch[0].data.age;
        this.native = this.playerimgsearch[0].data.native;
        this.selectedp = this.playerimgsearch[0].data.playertype;
        this.mobile = this.playerimgsearch[0].data.resmobile;
        this.player_image = this.playerimgsearch[0].data.player_image;
        this.selectbidding = "ON";

      },
        (error:any) => {
          console.log(error);
        });
  }
  editbid() {

    this.isdataShow = true;
    this.playerimg = [];
    if (this.registeno === '' || this.registeno == null || this.registeno === undefined) {
      this.serviceService.openSnackBar('Please Enter Registration Number for unbid Player', 'Close');
    } else {
      this.serviceService.editPlayer(this.registeno)
        .subscribe((data:any) => {
          this.playerimg.push(data);
          this.playerimgsearch = this.playerimg;
          this.regiid = this.playerimgsearch[0].data.regi_id;
          this.name = this.playerimgsearch[0].data.name;
          this.t1 = this.playerimgsearch[0].data.team_id;
          this.selectedp = this.playerimgsearch[0].data.playertype
          this.enterbidinng = this.playerimgsearch[0].data.biding_amount;
          this.selectbidding = "ON";
          this.dob = this.playerimgsearch[0].data.dob;
          this.age = this.playerimgsearch[0].data.age;
          this.native = this.playerimgsearch[0].data.native;
          this.selectedp = this.playerimgsearch[0].data.playertype;
          this.mobile = this.playerimgsearch[0].data.resmobile;
          this.player_image = this.playerimgsearch[0].data.player_image;
          this.serviceService.openSnackBar('Player Already Bidded', 'Close');
          this.unbidding(this.registeno);
          this.refresh();
        },
          (error:any) => {
            console.log(error);
          });
    }
  }
  getAllSetting() {
    this.settingtxt = [];
    this.isLoaderShow = true;
    this.serviceService.getAllSetting()
      .subscribe(
        data => {
          this.isLoaderShow = false;
          this.settingtxt.push(data);
          this.setting = this.settingtxt[0].data;
          for (const item of this.setting) {
            this.ticker = item.ticker
          }
        },
        error => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Failed to Fetch Data Of Setting', 'Close');
        });
  }
  addpointsocket() {
    // this.count++;
    if (this.registeno === '' || this.registeno == null || this.registeno === undefined) {
      this.serviceService.openSnackBar('Please Enter Registration Number for unbid Player', 'Close');
    } else {
      // this.points=this.enterbidinng+this.ticker;

      this.enterbidinng += parseInt(this.ticker);
      this.moduletype = "bid";
      this.series = window.localStorage.getItem('selectedSeries');
      this.jsonarray = {
        "col1": { "moduletype": this.moduletype, "addpoint": this.enterbidinng, "hideshow": this.hideshowtv, "series": this.series }
      }
      this.sendMessage(this.bidData, this.jsonarray);

    }

  }
  refresh() {
    this.soldbuttonDisabled = true;
    this.unsoldbuttonDisabled = true;
    this.isbidShow = true;
    this.enterbidinng = 0;
    this.t1 = ' ';
    this.registeno = ' ';
    this.regiid = '';
    this.name = ' ';
    this.dob = ' ';
    this.age = ' ';
    this.point = '';
    this.maxpoint = '';
    this.native = ' ';
    this.playertp = ' ';
    this.mobile = ' ';
    this.player_image = ' ';
    this.selectbidding = '';
    this.clear();
    // this.reloadComponent(); 
  }
  clear() {
    this.cleardata = "clearhere";
    this.moduletype = "bid";
    this.series = window.localStorage.getItem('selectedSeries');
    this.jsonarray = {
      "col1": { "moduletype": this.moduletype, "hideshow": this.hideshowtv, "series": this.series, "clear": this.cleardata }
    }
    this.sendMessage(this.bidData, this.jsonarray);
  }

  
  directpoint() {
    if (this.registeno === '' || this.registeno == null || this.registeno === undefined) {
      this.serviceService.openSnackBar('Please Enter Registration Number for unbid Player', 'Close');
    } else {
      this.enterbidinng;
      this.moduletype = "bid";
      this.series = window.localStorage.getItem('selectedSeries');
      this.jsonarray = {
        "col1": { "moduletype": this.moduletype, "addpoint": this.enterbidinng, "hideshow": this.hideshowtv, "series": this.series }
      }
      this.sendMessage(this.bidData, this.jsonarray);
    }
  }
  minuspointsocket() {
    if (this.registeno === '' || this.registeno == null || this.registeno === undefined) {
      this.serviceService.openSnackBar('Please Enter Registration Number for unbid Player', 'Close');
    } else {
      this.enterbidinng -= this.ticker;
      this.moduletype = "bid";
      this.series = window.localStorage.getItem('selectedSeries');
      this.jsonarray = {
        "col1": { "moduletype": this.moduletype, "addpoint": this.enterbidinng, "hideshow": this.hideshowtv, "series": this.series }
      }
      this.sendMessage(this.bidData, this.jsonarray);
    }
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'settingpopup',
  templateUrl: 'settingpopup.html',
  styleUrls: ['./bidding.component.css']
})

export class settingpopup {
  tvarr: any[] = [];
  playerDetailsetting: any[] = [];
  textbox: any;
  editsettingdata: any;
  results: any;
  selectedItemsListhide:any = [];
  valueInput($event: any, element: any) {
  }

  submit(): void {
    this.tvarr.push(this.ELEMENT_DATAsetting);
    const data = { "tvarr": this.ELEMENT_DATAsetting }
    // this.tvarr=this.ELEMENT_DATAsetting;
    this.serviceService.addtvsetting(data).subscribe(
      (data:any) => {
        this.results = data;
        if (this.results.flag == true) {
          // this.bidsetting=[];
          this.router.navigate(['/bidding']);
          this.DIALOGREF.close(this.ELEMENT_DATAsetting);
        } else {
          this.serviceService.openSnackBar('Data not insert properly', 'Close');
        }
      },

      // this.DIALOGREF.close(data);
      (error:any) => {
      });

  }

  displayELEMENT_DATAsetting: string[] = [
    'no',
    'check',
    'column',
    'order_id',
    'textbox',
  ];
  ELEMENT_DATAsetting: PeriodicElementbidsetting[] = [];
  dataSourcesetting: any;
  playerset: any;

  @ViewChild(MatPaginator) paginatorsetting!: MatPaginator;
  isLoaderShow = false;
  constructor(private serviceService: ApiservicesService, public DIALOGREF: MatDialogRef<settingpopup>, public router: Router) {
    this.getsetting();
    this.geteditsetting();
  }
  ngOnInit() {


  }
  getsetting() {
    // this.ELEMENT_DATAsetting = [];
    // this.playerDetailsetting = [];
    this.isLoaderShow = true;
    this.serviceService.getcloumn().subscribe(
      (data:any) => {
        this.isLoaderShow = false;
        this.playerDetailsetting.push(data);
        this.playerset = this.playerDetailsetting[0].data;
        let i = 1;
        for (const item of this.playerset) {
          this.ELEMENT_DATAsetting.push({
            "no": i++,
            "column": item,
            "order_id": '',
            "textbox": '',
            "check": false
          });
        }

        this.dataSourcesetting = new MatTableDataSource<PeriodicElementbidsetting>(this.ELEMENT_DATAsetting);
        this.dataSourcesetting.paginator = this.paginatorsetting;
      },
      (      error: any) => {
        this.isLoaderShow = false;
      }
    );

  }

  geteditsetting() {
    this.isLoaderShow = true;
    // this.editsettingdata = [];
    this.serviceService.getteditsetting()
      .subscribe(
        (data:any) => {
          this.editsettingdata = data['data'];
          this.isLoaderShow = false;
          for (var dd = 0; dd < this.ELEMENT_DATAsetting.length; dd++) {
            for (var d = 0; d < this.editsettingdata.length; d++) {
              if (this.ELEMENT_DATAsetting[dd].column == this.editsettingdata[d].column_name) {
                this.ELEMENT_DATAsetting[dd].textbox = this.editsettingdata[d].text_lable;
                this.ELEMENT_DATAsetting[dd].order_id = this.editsettingdata[d].order_id;
                if (this.editsettingdata[d].hide_show == 0) {
                  this.ELEMENT_DATAsetting[dd].check = false;
                } else {
                  this.ELEMENT_DATAsetting[dd].check = true;
                }
              }
            }
          }
        },
        (        error: any) => {
          this.isLoaderShow = false;
          this.serviceService.openSnackBar('Failed to Fetch Data Of Team', 'Close');
        });
  }
  onCancelClick() {
    this.DIALOGREF.close('no');
  }
  isChangeLimitAccessTogglehide(e:any) {


    if (e == 'on') {
      for (var d = 0; d < this.ELEMENT_DATAsetting.length; d++) {
        this.ELEMENT_DATAsetting[d].check = true;
      }
    }
    if (e == 'off') {
      for (var d = 0; d < this.ELEMENT_DATAsetting.length; d++) {
        this.ELEMENT_DATAsetting[d].check = false;
      }
    }
    this.fetchSelectedItemshide();
  }
  fetchSelectedItemshide() {
    this.selectedItemsListhide = this.ELEMENT_DATAsetting.filter((value, index) => {
      return value.check
    });
  }
  onCheckedhide() {
    this.fetchSelectedItemshide();
  }

}
