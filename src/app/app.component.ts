import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

import { Router } from '@angular/router';
import { ApiservicesService } from './apiservices.service';
declare var device: { platform: any; };
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {
  
  mobileQuery: MediaQueryList;
  title = 'Scoring App';
  ngOnInit() {
    document.addEventListener("deviceready", function() {
    alert(device.platform);
    }, false);
  }  

  fillerNav = [
    
    // { title: 'Dashboard', component: '/dashboard', icon: 'dashboard' },
    { title: 'Teams', component: '/teams', icon: 'people' },
    { title: 'Players', component: '/players', icon: 'person'},
    { title: 'Matches', component: '/matches', icon: 'sports_cricket'},
    { title: 'Select Match', component: '/selectmatch', icon: 'view_list' },
    { title: 'Push', component: '/pushnotification', icon: 'notification_important' },
    { title: 'YouTube Live', component: '/youtubelive', icon: 'hd' },
    { title: 'Edit Scoreboard', component: '/editmatch', icon: 'create' },
    { title: 'Points', component: '/points', icon: 'av_timer' },
    { title: 'Groups', component: '/groups', icon: 'group_work' },
    { title: 'Bidding', component: '/bidding', icon: 'donut_large' },
    { title: 'Committee', component: '/committee', icon: 'people' },
    { title: 'Sponsor', component: '/sponsor', icon: 'people' },
    { title: 'Gallery', component: '/gallery', icon: 'add_photo_alternate' },
    { title: 'Setting', component: '/setting', icon: 'settings' },
    { title: 'SMS Setting', component: '/smssetting', icon: 'settings' },
    { title: 'App Setting', component: '/appsetting', icon: 'settings' },
    { title: 'Display Message', component: '/displaymessage', icon: 'message' },
    { title: 'Users', component: '/users', icon: 'people' },
    { title: 'About Us', component: '/aboutus', icon: 'info' },
    { title: 'Change API URL', component: '/changeapiurl', icon: 'info' },
    { title: 'Log Out', component: '/tournamentlist', icon: 'power_settings_new' }
  ];

  private _mobileQueryListener: () => void;
  @ViewChild('snav') public snav!: { toggle: () => void; };

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    mediaMatcher: MediaMatcher,
    private router: Router,
    private liveservice : ApiservicesService) {
    if (window.localStorage.getItem('apiUrl') === null) {
      window.localStorage.setItem('apiUrl', 'https://demo.vthinksolution.com/crictest/cric/services/scoringapp/');
    }
    this.mobileQuery = mediaMatcher.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // tslint:disable-next-line: member-ordering
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  /**
   * @param router router
   */
  isActive(router: any) {
    const onlyUrl = this.router.url.split(';');
    if (onlyUrl[0] === router) {
      return true;
    }else return false;
  }

  toggleNav() {
    this.snav.toggle();
  }

  removeHeader() {
    const onlyUrl = this.router.url.split(';');
    if (onlyUrl[0] === '/teams') {
      this.title = 'TEAMS';
    }
    // if (onlyUrl[0] === '/teams') {
    //   this.title = 'TEAMS';
    // }
    if (onlyUrl[0] === '/players') {
      this.title = 'PLAYERS';
    }
    if (onlyUrl[0] === '/matches') {
      this.title = 'MATCH LIST';
    }
    if (onlyUrl[0] === '/scoreboard') {
      this.title = 'SCOREBOARD';
    }
    if (onlyUrl[0] === '/pushnotification') {
      this.title = 'SEND PUSH';
    }
    if (onlyUrl[0] === '/youtubelive') {
      this.title = 'YOUTUBE LIVE';
    }
    if (onlyUrl[0] === '/editmatch') {
      this.title = 'EDIT SCOREBOARD';
    }
    // if (onlyUrl[0] === '/dashboard') {
    //   this.title = 'Dashboard';
    // }
    if (onlyUrl[0] === '/points') {
      this.title = 'POINTS';
    }
    if (onlyUrl[0] === '/addgroup') {
      if (window.localStorage.getItem('addEvent') === 'yes') {
        this.title = 'ADD GROUP';
      } else {
        this.title = 'UPDATE GROUP';
      }
    }
    if (onlyUrl[0] === '/committee') {
      this.title = 'COMMITTEE';
    }
    if (onlyUrl[0] === '/sponsor') {
      this.title = 'SPONSOR';
    }
    if (onlyUrl[0] === '/gallery') {
      this.title = 'GALLERY';
    }
    if (onlyUrl[0] === '/addgallery') {
      this.title = 'ADD GALLERY';
    }

    if (onlyUrl[0] === '/setting') {
      this.title = 'SETTING';
    }
    if (onlyUrl[0] === '/smssetting') {
      this.title = 'SMS SETTING';
    }
    if (onlyUrl[0] === '/appsetting') {
      this.title = 'APP SETTING';
    }
    if (onlyUrl[0] === '/selectmatch') {
      this.title = 'SELECT MATCH';
    }
    if (onlyUrl[0] === '/selectplayer') {
      this.title = 'SELECT PLAYERS';
    }
   
    if (onlyUrl[0] === '/selecttoss') {
      this.title = 'TOSS';
    }
    if (onlyUrl[0] === '/selectstrikers') {
      this.title = 'SELECT PLAYER';
    }
   
    if (onlyUrl[0] === '/whowon') {
      this.title = 'WHO WON?';
    }
    if (onlyUrl[0] === '/changeapiurl') {
      this.title = 'CHANGE API URL';
    }
 
    if (onlyUrl[0] === '/editselectplayer') {
      this.title = 'SELECT PLAYER';
    }
    if (onlyUrl[0] === '/edittoss') {
      this.title = 'SELECT TOSS';
    }
    if (onlyUrl[0] === '/editovers') {
      this.title = 'EDIT OVERS';
    }
    if (onlyUrl[0] === '/editscoreboard') {
      this.title = 'EDIT SCOREBOARD';
    }
   
    if (onlyUrl[0] === '/addteam') {
      if (window.localStorage.getItem('addEvent') === 'yes') {
        this.title = 'ADD NEW TEAM';
      } else {
        this.title = 'UPDATE TEAM';
      }
    }
    
    if (onlyUrl[0] === '/addplayer') {
      if (window.localStorage.getItem('addEvent') === 'yes') {
        this.title = 'ADD NEW PLAYER';
      } else {
        this.title = 'UPDATE PLAYER';
      }
    }
   
    if (onlyUrl[0] === '/editscorecard') {
      this.title = 'EDITSCORECARD';
    }
    if (onlyUrl[0] === '/groups') {
      this.title = 'GROUPS';
    }
    
    if (onlyUrl[0] === '/displaymessage') {
      this.title = 'DISPLAY MESSAGE';
    }
    if (onlyUrl[0] === '/users') {
      this.title = 'USERS';
    }
    if (onlyUrl[0] === '/aboutus') {
      this.title = 'ABOUT US';
    }
    if (onlyUrl[0] === '/editpoints') {
      this.title = 'EDIT POINTS';
    }
   
    if (onlyUrl[0] === '/addcommittee') {
      this.title = 'ADD COMMITTEE';
      if (window.localStorage.getItem('addEvent') === 'yes') {
        this.title = 'ADD COMMITTEE';
      } else {
        this.title = 'UPDATE COMMITTEE';
      }
    }
    if (onlyUrl[0] === '/addsponsor') {
      if (window.localStorage.getItem('addEvent') === 'yes') {
        this.title = 'ADD SPONSOR';
      } else {
        this.title = 'UPDATE SPONSOR';
      }
    }
    
    if (onlyUrl[0] === '/adduser') {
      if (window.localStorage.getItem('addEvent') === 'yes') {
        this.title = 'ADD USER';
      } else {
        this.title = 'UPDATE USER';
      }
    }
    if (onlyUrl[0] === '/addmatch') {
      if (window.localStorage.getItem('addEvent') === 'yes') {
        this.title = 'ADD MATCH';
      } else {
        this.title = 'UPDATE MATCH';
      }
    }
    if (onlyUrl[0] === '/addappsponsor') {
      if (window.localStorage.getItem('addEvent') === 'yes') {
        this.title = 'ADD SPONSOR';
      } else {
        this.title = 'UPDATE SPONSOR';
      }
    }
    if (onlyUrl[0] === '/tournamentlist' || onlyUrl[0] === '/login') {
      return false;
    } else {
      return true;
    }
  }
  
}