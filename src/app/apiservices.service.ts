import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class ApiservicesService {
  [x: string]: any;

  constructor( 
    private http: HttpClient,
    private snackBar: MatSnackBar,
   ) { }

  /**
   * Get tournament lists
   * @param searchname searchname
   */
  getGlobalSeries(searchname: string): any {
    const URL = `${window.localStorage.getItem('apiUrl')}get_tournament.php?tourpermission=all&name=${searchname}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }

    /**
   * Get series list of particular tournament
   * @param type type
   */
    getSeriesList(type: any): any {
      const URL = `${window.localStorage.getItem('apiUrl')}sponsorurl.php?type=${type}&tid=${window.localStorage.getItem('t_id')}`;
      return this.http.get(URL);
    }

     /**
   * Login api
   * @param series series
   * @param email email
   * @param pass pass
   */
  getLogin(series:any, email:any, pass:any): any {
    const URL = `${window.localStorage.getItem('apiUrl')}login.php?series=${series}&email=${email}&pass=${pass}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }

  getMatchesList() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}get_currentmatches.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }

   /**
   * Get players by team id
   * @param id id
   */
   getPlayersByTeam(id: string) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}get_players_team.php?series=${series}&team_id=${id}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
/**
   * Get live score by match id
   * @param matchId matchId
   */
getLiveScore(matchId: string) {
  const series = window.localStorage.getItem('selectedSeries');
  const URL = `${window.localStorage.getItem('apiUrl')}get_livescoreapp.php?series=${series}&matchid=${matchId}&tid=${window.localStorage.getItem('t_id')}`;
  return this.http.get(URL);
}

  /**
   * Get Match Data By Match Id
   * @param matchId matchId
   */
  getMatchDataById(matchId: string) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getmatchdatabyid.php?series=${series}&` +
      `match_id=${matchId}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }

    /**
   * register striker, non-striker and bowler
   * @param match_id match_id
   * @param chk_team1 chk_team1
   * @param chk_team2 chk_team2
   * @param inning inning
   */
  selectStrikers(match_id: string, chk_team1: any, chk_team2: any, inning: number) {
    const URL = `${window.localStorage.getItem('apiUrl')}select_strikers.php?tid=${window.localStorage.getItem('t_id')}`;
    const data = {
      series: window.localStorage.getItem('selectedSeries'),
      match_id: match_id,
      chk_team1: chk_team1,
      chk_team2: chk_team2,
      inning: inning
    };
    return this.http.post(URL, data);
  }

    /**
   * Get players for select striker, non-striker and bowler
   * @param match_id match_id
   */
    selectTossPlayer(match_id: string) {
      const series = window.localStorage.getItem('selectedSeries');
      const URL = `${window.localStorage.getItem('apiUrl')}select_tossplayer.php?series=${series}&match_id=${match_id}&tid=${window.localStorage.getItem('t_id')}`;
      return this.http.get(URL);
    }
    sendAndroidPush(message: any) {
      // const URL = `${window.localStorage.getItem('apiUrl')}androidPush.php`;
      const series = window.localStorage.getItem('selectedSeries');
      const URL = `https://demo.vthinksolution.com/cricket/cric_new/services/scoringapp/push.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
      const data = {
        // tour_type: window.localStorage.getItem('tourType'),
        // series: window.localStorage.getItem('selectedSeries'),
        msg: message
      };
      console.log(data);
      return this.http.post(URL, data);
    }
  /**
   * Update Single Bowl score
   * @param data data
   */
  updateSingleBowl(data:any) {
    const URL = `${window.localStorage.getItem('apiUrl')}updatesinglebowler.php?tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  /**
   * This will popup message at bottom of screen
   * @param message message
   * @param action action
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
    getLiveMatchData() {
      const series = window.localStorage.getItem('selectedSeries');
      // const URL = `http://demo.vthinksolution.com/cricket/cric/services/get_live_matchdata.php?series=${series}`;
      const URL = `${window.localStorage.getItem('apiUrl')}get_live_matchdata.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
      return this.http.get(URL);
    }

    /**
   * Add score
   * @param data data
   */
  addScore(data:any) {
    const URL = `${window.localStorage.getItem('apiUrl')}add_score.php?tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }

  /**
   * Change striker
   * @param playerId playerId
   * @param matchId matchId
   */
  changeStrike(playerId: any, matchId: any) {
    const URL = `${window.localStorage.getItem('apiUrl')}changestrikeapp.php?tid=${window.localStorage.getItem('t_id')}`;
    const data = {
      series: window.localStorage.getItem('selectedSeries'),
      player_id: playerId,
      match_id: matchId
    };
    return this.http.post(URL, data);
  }

    /**
   * End inning
   * @param matchId matchId
   */
    endInning(matchId: any) {
      const URL = `${window.localStorage.getItem('apiUrl')}endinning.php?tid=${window.localStorage.getItem('t_id')}`;
      const data = {
        series: window.localStorage.getItem('selectedSeries'),
        match_id: matchId,
        tid: window.localStorage.getItem('t_id')
      };
      return this.http.post(URL, data);
    }
  /**
   * Delete single bowl
   */
  deleteBowl(scoreId: any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}deletebowl.php?tid=${window.localStorage.getItem('t_id')}`;
    const data = {
      score_id: scoreId,
      series: series,
      tid:window.localStorage.getItem('t_id')
    };
    return this.http.post(URL, data);
  }

  getalloverdata(matchid: any, innings: any) {
    const data = {
      series: window.localStorage.getItem('selectedSeries'),
      match_id: matchid,
      inning: innings,
      tid:window.localStorage.getItem('t_id')
    };
    const URL = `${window.localStorage.getItem('apiUrl')}get_over.php?series=${data.series}&match_id=${data.match_id}&inning=${data.inning}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
    // const URL = `${window.localStorage.getItem('apiUrl')}get_over.php`;

    // return this.http.post(URL, data);
  }
  editScorecard(matchId: any, inningno: any, overno: string) {
    console.log(matchId, inningno, overno + '------------------')
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}get_over_data.php?series=${series}&` +
      `match_id=${matchId}&inning=${inningno}&over=${overno}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }

 /**
   * set toss who win
   * @param match_id match_id
   * @param toss_win toss_win
   * @param elect_to elect_to
   */
 selectToss(match_id: string, toss_win: string, elect_to: string) {
  const URL = `${window.localStorage.getItem('apiUrl')}select_toss.php?tid=${window.localStorage.getItem('t_id')}`;
  const data = {
    series: window.localStorage.getItem('selectedSeries'),
    match_id: match_id,
    toss_win: toss_win,
    elect_to: elect_to,
    tid:window.localStorage.getItem('t_id')
  };
  return this.http.post(URL, data);
}
  /**
   * select player from player list
   * @param match_id match_id
   * @param chk_team1 chk_team1
   * @param chk_team2 chk_team2
   */
  selectPlayers(match_id: string, chk_team1: string, chk_team2: string) {
    const URL = `${window.localStorage.getItem('apiUrl')}select_player.php?tid=${window.localStorage.getItem('t_id')}`;
    const data = {
      series: window.localStorage.getItem('selectedSeries'),
      match_id: match_id,
      chk_team1: chk_team1,
      chk_team2: chk_team2,
      tid:window.localStorage.getItem('t_id')
    };
    return this.http.post(URL, data);
  }
  deleteallover(over: number, matchid: any, inning: any) {

    const data = {
      series: window.localStorage.getItem('selectedSeries'),
      over: over,
      match_id: matchid,
      inning: inning,
      tid:window.localStorage.getItem('t_id')
    };
    const URL = `${window.localStorage.getItem('apiUrl')}del_over.php?series=${data.series}&match_id=${data.match_id}&inning=${data.inning}&over=${data.over}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  /**
   * Get bowler list for change bowler
   * @param matchId matchId
   * @param bowler bowler
   * @param inning inning
   */
  getChangeBowlers(matchId: string, bowler: string, inning: string) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}get_bowler_data.php?series=${series}&` +
      `match_id=${matchId}&bowler=${bowler}&inning=${inning}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
    /**
   * Change bowler
   * @param playerId playerId
   * @param matchId matchId
   */
    changeBowler(playerId: string, matchId: string) {
      const URL = `${window.localStorage.getItem('apiUrl')}changebowlerapp.php?tid=${window.localStorage.getItem('t_id')}`;
      const data = {
        series: window.localStorage.getItem('selectedSeries'),
        player_id: playerId,
        match_id: matchId,
        tid:window.localStorage.getItem('t_id')
      };
      return this.http.post(URL, data);
    }
/**
   * Change Batsman
   * @param playerId playerId
   * @param matchId matchId
   * @param position position
   */
changeBatsman(playerId: string, matchId: string, position: number) {
  const URL = `${window.localStorage.getItem('apiUrl')}changebatsman.php?tid=${window.localStorage.getItem('t_id')}`;
  const data = {
    series: window.localStorage.getItem('selectedSeries'),
    player_id: playerId,
    match_id: matchId,
    batsman_position: position,
    tid:window.localStorage.getItem('t_id')
  };
  return this.http.post(URL, data);
}
   /**
   * Get batsman list for change batsman
   * @param matchId matchId
   * @param batsman1 batsman1
   * @param batsman2 batsman2
   * @param inning inning
   */
   getChangeBatsman(matchId: string, batsman1: string, batsman2: string, inning: string) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}get_batsman_data.php?series=${series}&` +
      `match_id=${matchId}&batsman1=${batsman1}&batsman2=${batsman2}&inning=${inning}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  getBase64Photo(link: string) {
    return new Promise((resolve, reject) => {
      this.toDataURL(link, (data: any) => {
        resolve({
          base64: data
        });
      });
    });
  }
  toDataURL(url: string | URL, callback: { (data: any): void; (arg0: string | ArrayBuffer | null): void; }) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
      /**
   * Call api for get score by scoreId
   * @param scoreId scoreId
   * @param matchId matchId
   */
  editScore(scoreId: any, matchId: any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getbowldatabyscoreid.php?series=${series}&` +
      `match_id=${matchId}&score_id=${scoreId}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }

    /**
   * Update Team
   * @param data Json
   */
    updateTeam(data:any) {
      const URL = `${window.localStorage.getItem('apiUrl')}update_team.php?tid=${window.localStorage.getItem('t_id')}`;
      return this.http.post(URL, data);
    }
   /**
   * Add New Team
   * @param data Json
   */
   addNewTeam(data: {
       series: string | null; team_name: string; team_image: string; team_type: string; team_point: string; star_player_id: string; owner_img: string; surname: string; name: string; fathername: string; dob: string; age: any; resadd: string; restelephone: string; resmobile: string; officeadd: string; officetelephone: string; officemobile: string; native: string; weastsize: string; // return this.http.post(URL, data);
       // return this.http.post(URL, data);
       tracsize: string; tshirtsize: string;
     }) {
    const URL = `${window.localStorage.getItem('apiUrl')}add_team.php?tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  /**
   * Delete Team
   * @param teamId teamId
   */
  deleteTeam(teamId: any) {
    const URL = `${window.localStorage.getItem('apiUrl')}delete_team.php?tid=${window.localStorage.getItem('t_id')}`;
    const data = {
      series: window.localStorage.getItem('selectedSeries'),
      team_id: teamId,
      tid:window.localStorage.getItem('t_id')
    };
    return this.http.post(URL, data);
  }
    /**
   * Get All Team Detail
   */
    getTeamdetail() {
      const series = window.localStorage.getItem('selectedSeries');
      const URL = `${window.localStorage.getItem('apiUrl')}get_team_list.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
      return this.http.get(URL);
    }
    deletePlayer(playerId:any) {
      const series = window.localStorage.getItem('selectedSeries');

      const URL = `${window.localStorage.getItem('apiUrl')}deletePlayer.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
      const data = {
        player_id: playerId,
      };
      return this.http.post(URL, data);
    }
    getPlayerdetail() {
      const series = window.localStorage.getItem('selectedSeries');
      const URL = `${window.localStorage.getItem('apiUrl')}get_player.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
      return this.http.get(URL);
    }
    getGallery() {
      const series = window.localStorage.getItem('selectedSeries');
      const URL = `${window.localStorage.getItem('apiUrl')}getGallery.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
      return this.http.get(URL);
    }

    addGallery(data: { series: string | null; framename: any; }) {
      const series = window.localStorage.getItem('selectedSeries');
      const URL = `${window.localStorage.getItem('apiUrl')}addGallery.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
      return this.http.post(URL, data);
    }
    deleteGallery(framename: any) {
      const URL = `${window.localStorage.getItem('apiUrl')}deleteGallery.php?tid=${window.localStorage.getItem('t_id')}`;
      const data = {
        series: window.localStorage.getItem('selectedSeries'),
        framename: framename,
        tid:window.localStorage.getItem('t_id')

      };
      return this.http.post(URL, data);
    }
      /**
   * Get Team Data By Team Id
   * @param teamId teamId
   */
  getTeamDetailById(teamId: any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}get_team_detailbyid.php?series=${series}&team_id=${teamId}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }

  updatePlayer(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}updatePlayer.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }

  deleteMatch(match_id:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}deleteMatch.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    const data = {
      match_id: match_id,
    };
    return this.http.post(URL, data);
  }
  getAllMatches() {
    const series = window.localStorage.getItem('selectedSeries');
    const tid=window.localStorage.getItem('t_id'); 
    const URL = `${window.localStorage.getItem('apiUrl')}getAllMatches.php?series=${series}&tid=${tid}`;
   
    return this.http.get(URL);
  }
  addNewPlayer(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}add_player.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  getPlayerById(playerId:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getPlayerById.php?series=${series}&player_id=${playerId}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }

  getmatchdatabyid(match_id:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getmatchdatabyid.php?series=${series}&match_id=${match_id}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  addMatch(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}addMatch.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  updateMatch(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}updateMatch.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  getLivescoredata(matchId:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}livescoreedit.php?series=${series}&` +
      `matchid=${matchId}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  updateLiveMatch(data:any, matchId:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}updatelivematch.php?series=${series}&` +
      `matchid=${matchId}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }

  getPlayerscoredata(matchId:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}playerscoreedit.php?series=${series}&` +
      `match_id=${matchId}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  getdata(matchId:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getdata.php?series=${series}&` +
      `match_id=${matchId}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }

  getYoutube() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getYoutube.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }

  addYoutubeLink(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}addYoutubeLink.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  matchtopointdata() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `http://demo.vthinksolution.com/cricket/cric/services/scoringapp/matchtoscoredata.php?match_id=ALL&`+`series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
     
  }
  scoretomatchdata() {
    const series = window.localStorage.getItem('selectedSeries');
    
    const URL = `http://demo.vthinksolution.com/cricket/cric/services/scoringapp/scoretomatchdata.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  getAllSponser() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getAllSponser.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  updateGroup(data:any) {
    const URL = `${window.localStorage.getItem('apiUrl')}updateGroup.php?tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  viewpoints() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}viewpoints.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  updateSponser(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}updateSponser.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  addSponser(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}addSponser.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  getSponserById(sponsorId: any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getSponserById.php?series=${series}&s_id=${sponsorId}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  deleteSponser(sponsorId: any) {
    const URL = `${window.localStorage.getItem('apiUrl')}deleteSponser.php?tid=${window.localStorage.getItem('t_id')}`;
    const data = {
      series: window.localStorage.getItem('selectedSeries'),
      s_id: sponsorId,
      tid:window.localStorage.getItem('t_id')
    };
    return this.http.post(URL, data);
  }
  deleteCommitte(com_mem_Id: any) {
    const URL = `${window.localStorage.getItem('apiUrl')}deleteCommitte.php?tid=${window.localStorage.getItem('t_id')}`;
    const data = {
      series: window.localStorage.getItem('selectedSeries'),
      com_mem_id: com_mem_Id,
      tid:window.localStorage.getItem('t_id')
    };
    return this.http.post(URL, data);
  }
  getCommitieById(com_mem_Id: any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getCommitieById.php?series=${series}&com_mem_id=${com_mem_Id}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  getAllPoints() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getAllPoints.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }

  updateCommitte(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}updateCommitte.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  getAllCommitte() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getAllCommitte.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  addCommitte(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}addCommitte.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  addGroup(data:any) {
    const URL = `${window.localStorage.getItem('apiUrl')}addGroup.php?tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  updatePoints(data:any) {
    const URL = `${window.localStorage.getItem('apiUrl')}updatePoints.php?tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  deleteGroup(groupId:any) {
    const URL = `${window.localStorage.getItem('apiUrl')}deleteGroup.php?tid=${window.localStorage.getItem('t_id')}`;
    const data = {
      series: window.localStorage.getItem('selectedSeries'),
      group_id: groupId,
      tid:window.localStorage.getItem('t_id')
    };
    return this.http.post(URL, data);
  }
  getAllGroup() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getAllGroup.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  getPointsById(groupId:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getPointsById.php?series=${series}&group_id=${groupId}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  addSetting(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}addSetting.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  getAllSetting() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getAllSetting.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  getAllSmsInfo() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getAllSmsInfo.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  addSmsSetting(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}addSmsSetting.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  updateAppSponser(data: any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}updateAppSponser.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  deleteappsponsor(id: any) {
    const URL = `${window.localStorage.getItem('apiUrl')}deleteappsponsor.php?tid=${window.localStorage.getItem('t_id')}`;
    const data = {
      series: window.localStorage.getItem('selectedSeries'),
      id: id
    };
    return this.http.post(URL, data);

  } addUser(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}addUser.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  updateUser(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}updateUser.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  getAbout() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getAbout.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  getUserById(admin_id:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getUserById.php?series=${series}&admin_id=${admin_id}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  getAllUsers() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getAllUsers.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }

  deleteUser(admin_id:any) {
    const URL = `${window.localStorage.getItem('apiUrl')}deleteUser.php?tid=${window.localStorage.getItem('t_id')}`;
    const data = {
      series: window.localStorage.getItem('selectedSeries'),
      admin_id: admin_id
    };
    return this.http.post(URL, data);
  }
  saveMsg(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}saveMsg.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  getAllAppSponser() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getAllAppSponser.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  updateAboutus(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}updateAboutus.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  addAppSponser(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}addAppSponser.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }
  getAppSponserById(id: any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getAppSponserById.php?series=${series}&id=${id}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  getteditsetting() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}gettvsetting.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  getcloumn() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}getplayercol.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }
  addtvsetting(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}addtvsetting.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data);
  }

  editPlayer(regi_no:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}get_editplayer_data.php?series=${series}&player_id=${regi_no}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL).pipe(map(
      (response) => response
    ));
  }

  searchimage(regi_no:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}get_user_info.php?series=${series}&regi_no=${regi_no}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL).pipe(map(
      (response) => response
    ));
  }

  UNbid(playertype: any, playeron: string, roundtext: any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}unbidded_load_data.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    const data = {
      playertype: playertype,
      playeron: playeron,
      playerround: roundtext
    };
    return this.http.post(URL, data)

  }

  getteam() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}get_team_data.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL).pipe(map(
      (response) => response
    ));
  }

  unsold(playertype: any, biding_regi_id: any, num: any, playeron: string, roundtext: any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}unbidded_data.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    const data = {
      playertype: playertype,
      biding_regi_id: biding_regi_id,
      num: num,
      playeron: playeron,
      playerround: roundtext
    };
    return this.http.post(URL, data)

  }
  saveunbid(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}save_bid_data.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data)
  }

  
  whatsaapmsg(regi_no: string, team: any, amt: number) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}whatsapp_api.php?regid=${regi_no}&team=${team}&amt=${amt}&series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL).pipe(map(
      (response) => response
    ));
  }

  savebid(data:any) {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}save_bid_data.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.post(URL, data)
  }
  getplayer() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}get_player_data.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL).pipe(map(
      (response) => response
    ));
  }

  stopbidding() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}stop_bidding_data.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);
  }

  sockethideshow() {
    const series = window.localStorage.getItem('selectedSeries');
    const URL = `${window.localStorage.getItem('apiUrl')}get_livetv_bidding.php?series=${series}&tid=${window.localStorage.getItem('t_id')}`;
    return this.http.get(URL);

}
}
