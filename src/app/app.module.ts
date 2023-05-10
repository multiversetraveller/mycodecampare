import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { TournamentlistComponent } from './tournamentlist/tournamentlist.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SelectmatchComponent } from './selectmatch/selectmatch.component';
import { SelectplayerComponent } from './selectmatch/selectplayer/selectplayer.component';
import { SelecttossComponent } from './selectmatch/selecttoss/selecttoss.component';
import { SelectstrikersComponent } from './selectmatch/selectstrikers/selectstrikers.component';
import { MatDividerModule } from '@angular/material/divider';
import { ScoreboardComponent,
   DialogOverviewExampleDialog,
  NoBallDialog, SelectPlayerDialog,DialogEditscorecard,Pushpop} from './selectmatch/scoreboard/scoreboard.component';
import { TeamsComponent } from './teams/teams.component';
import { AddteamComponent } from './teams/addteam/addteam.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LivescoreService } from './livescore.service';
import { PlayersComponent } from './players/players.component';
import { AddplayerComponent } from './players/addplayer/addplayer.component';
import { MatchesComponent } from './matches/matches.component';
import { AddmatchComponent } from './matches/addmatch/addmatch.component';
import { PlayerscoreeditComponent } from './matches/playerscoreedit/playerscoreedit.component';
import { LivescoreeditComponent } from './matches/livescoreedit/livescoreedit.component';
import { PushnotificationComponent } from './pushnotification/pushnotification.component';
import { YoutubeliveComponent } from './youtubelive/youtubelive.component';
import { PointsComponent } from './points/points.component';
import { ViewpointsComponent } from './points/viewpoints/viewpoints.component';
import { EditpointsComponent } from './points/editpoints/editpoints.component';
import { GroupsComponent } from './groups/groups.component';
import { AddgroupComponent } from './groups/addgroup/addgroup.component';
import { CommitteeComponent } from './committee/committee.component';
import { AddcommitteeComponent } from './committee/addcommittee/addcommittee.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import { AddsponsorComponent } from './sponsor/addsponsor/addsponsor.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AddgalleryComponent } from './gallery/addgallery/addgallery.component';
import { SettingComponent } from './setting/setting.component';
import { SmssettingComponent } from './smssetting/smssetting.component';
import { AppsettingComponent } from './appsetting/appsetting.component';
import { AddappsponsorComponent } from './appsetting/addappsponsor/addappsponsor.component';
import { DisplaymessageComponent } from './displaymessage/displaymessage.component';
import { UsersComponent } from './users/users.component';
import { AdduserComponent } from './users/adduser/adduser.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ChangeapiurlComponent } from './changeapiurl/changeapiurl.component';
import { BiddingComponent,settingpopup } from './bidding/bidding.component'; 
@NgModule({
  declarations: [
    AppComponent,
    TournamentlistComponent,
    LoginComponent,
    SelectmatchComponent,
    SelectplayerComponent,
    SelecttossComponent,
    SelectstrikersComponent,
    ScoreboardComponent,
    DialogOverviewExampleDialog,
    NoBallDialog,
    SelectPlayerDialog,
    DialogEditscorecard,
    Pushpop,
    TeamsComponent,
    AddteamComponent,
    PlayersComponent,
    AddplayerComponent,
    MatchesComponent,
    AddmatchComponent,
    PlayerscoreeditComponent,
    LivescoreeditComponent,
    PushnotificationComponent,
    YoutubeliveComponent,
    PointsComponent,
    ViewpointsComponent,
    EditpointsComponent,
    GroupsComponent,
    AddgroupComponent,
    CommitteeComponent,
    AddcommitteeComponent,
    SponsorComponent,
    AddsponsorComponent,
    GalleryComponent,
    AddgalleryComponent,
    SettingComponent,
    SmssettingComponent,
    AppsettingComponent,
    AddappsponsorComponent,
    DisplaymessageComponent,
    UsersComponent,
    AdduserComponent,
    AboutusComponent,
    ChangeapiurlComponent,
    BiddingComponent,
    settingpopup
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDividerModule,
    FormsModule,
    ImageCropperModule,
    CKEditorModule,
    HttpClientModule,MaterialModule
    
    
  ],
  providers: [ScoreboardComponent, LivescoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
