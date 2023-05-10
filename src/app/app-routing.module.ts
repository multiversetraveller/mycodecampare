import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentlistComponent } from './tournamentlist/tournamentlist.component';
import { LoginComponent } from './login/login.component';
import { SelectmatchComponent } from './selectmatch/selectmatch.component';
import { SelectplayerComponent } from './selectmatch/selectplayer/selectplayer.component';
import { SelecttossComponent } from './selectmatch/selecttoss/selecttoss.component';
import { SelectstrikersComponent } from './selectmatch/selectstrikers/selectstrikers.component';
import { ScoreboardComponent } from './selectmatch/scoreboard/scoreboard.component';
import { TeamsComponent } from './teams/teams.component';
import { AddteamComponent } from './teams/addteam/addteam.component';
import { PlayersComponent } from './players/players.component';
import { AddplayerComponent } from './players/addplayer/addplayer.component';
import { MatchesComponent } from './matches/matches.component';
import { AddmatchComponent } from './matches/addmatch/addmatch.component';
import { LivescoreeditComponent } from './matches/livescoreedit/livescoreedit.component';
import { PlayerscoreeditComponent } from './matches/playerscoreedit/playerscoreedit.component';
import { PushnotificationComponent } from './pushnotification/pushnotification.component';
import { YoutubeliveComponent } from './youtubelive/youtubelive.component';
import { PointsComponent } from './points/points.component';
import { EditpointsComponent } from './points/editpoints/editpoints.component';
import { ViewpointsComponent } from './points/viewpoints/viewpoints.component';
import { AddgroupComponent } from './groups/addgroup/addgroup.component';
import { GroupsComponent } from './groups/groups.component';
import { CommitteeComponent } from './committee/committee.component';
import { AddcommitteeComponent } from './committee/addcommittee/addcommittee.component';
import { AddsponsorComponent } from './sponsor/addsponsor/addsponsor.component';
import { SponsorComponent } from './sponsor/sponsor.component';
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
import { ChangeapiurlComponent } from './changeapiurl/changeapiurl.component';
import { BiddingComponent } from './bidding/bidding.component';
import { EditmatchComponent } from './editmatch/editmatch.component';
import { MatchtopointComponent } from './selectmatch/whowon/matchtopoint/matchtopoint.component';
import { WhowonComponent } from './selectmatch/whowon/whowon.component';
import { EditselectplayerComponent } from './editmatch/editselectplayer/editselectplayer.component';
import { EdittossComponent } from './editmatch/edittoss/edittoss.component';
import { EditoversComponent } from './editmatch/editovers/editovers.component';
import { EditscoreboardComponent } from './editmatch/editscoreboard/editscoreboard.component';
import { EditwicketComponent } from './selectmatch/editwicket/editwicket.component';
import { EditscorecardComponent } from './selectmatch/editscorecard/editscorecard.component';
import { Editwicket2Component } from './selectmatch/editwicket2/editwicket2.component';
const routes: Routes = [

  { path: '', redirectTo: '/tournamentlist', pathMatch: 'full' },
  { path: 'tournamentlist', component: TournamentlistComponent },
  { path: 'login', component: LoginComponent },
  { path: 'selectmatch', component: SelectmatchComponent },
  { path: 'selectplayer', component: SelectplayerComponent },
  { path: 'selecttoss', component: SelecttossComponent },
  { path: 'selectstrikers', component: SelectstrikersComponent },
  { path: 'scoreboard', component: ScoreboardComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'addteam', component: AddteamComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'addplayer', component: AddplayerComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'addmatch', component: AddmatchComponent },
  { path: 'livescoreedit', component: LivescoreeditComponent },
  { path: 'playerscoreedit', component: PlayerscoreeditComponent },
  { path: 'pushnotification', component: PushnotificationComponent },
  { path: 'youtubelive', component: YoutubeliveComponent },
  { path: 'points', component: PointsComponent },
  { path: 'viewpoints', component: ViewpointsComponent },
  { path: 'editpoints', component: EditpointsComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'addgroup', component: AddgroupComponent },
  { path: 'committee', component: CommitteeComponent },
  { path: 'addcommittee', component: AddcommitteeComponent },
  { path: 'addsponsor', component: AddsponsorComponent },
  { path: 'sponsor', component: SponsorComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'addgallery', component: AddgalleryComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'smssetting', component: SmssettingComponent },
  { path: 'appsetting', component: AppsettingComponent },
  { path: 'addappsponsor', component: AddappsponsorComponent },
  { path: 'displaymessage', component: DisplaymessageComponent },
  { path: 'users', component: UsersComponent },
  { path: 'adduser', component: AdduserComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'changeapiurl', component: ChangeapiurlComponent },
  { path: 'bidding', component: BiddingComponent },
  { path: 'editmatch', component: EditmatchComponent },
  { path: 'matchtopoint', component: MatchtopointComponent },
  { path: 'whowon', component: WhowonComponent },
  { path: 'editselectplayer', component: EditselectplayerComponent },
  { path: 'edittoss', component: EdittossComponent },
  { path: 'editovers', component: EditoversComponent },
  { path: 'editscoreboard', component: EditscoreboardComponent },
  { path: 'editwicket', component: EditwicketComponent },
  { path: 'editwicket', component: EditwicketComponent },
  { path: 'editscorecard', component: EditscorecardComponent },
  { path: 'editwicket2', component: Editwicket2Component },





];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
