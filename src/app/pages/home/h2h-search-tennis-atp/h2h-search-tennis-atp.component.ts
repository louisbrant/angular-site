import {Component, Input, OnInit} from '@angular/core';
import {SearchInterface} from "../../../shared/interfaces/search.interface";
import {ProfileService} from "../../profile/services/profile.service";

@Component({
  selector: 'app-h2h-search-tennis-atp',
  templateUrl: './h2h-search-tennis-atp.component.html',
  styleUrls: ['./h2h-search-tennis-atp.component.scss']
})
export class H2hSearchTennisAtpComponent implements OnInit {
  @Input() type: string = 'atp'
  @Input() title: string = 'Tennis H2H Search'

  firstPlayerProfiles?: string[] = [];
  secondPlayerProfiles?: string[] = [];
  firstPlayer: any;
  secondPlayer: any;

  searcheSubscription: any = null;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
  }

  searchPlayer(player: string, playerOrder: string) {
    if (player?.length > 1) {
      if(this.searcheSubscription != null) {
        this.searcheSubscription.unsubscribe();
      }

      this.searcheSubscription = this.profileService.searchProfiles(player, this.type).subscribe(res => {
        playerOrder === 'player 1' ? this.firstPlayerProfiles = res : this.secondPlayerProfiles = res;
      })
    }
  }

  selectPlayer(player:any, playerOrder:string) {
    playerOrder === 'player 1' ? this.firstPlayer = player : this.secondPlayer = player;
    console.log('1', this.firstPlayer, '2', this.secondPlayer)
  }

  navigateToH2h() {
    // if (name != 'Unknown Player' && name2 != 'Unknown Player') {
    //   this.router.navigate(['tennis', 'h2h', `${this.type}`, name, name2])
    //   window.scroll({top: 0, behavior: 'smooth'})
    // }
    window.location.href = `/tennis/h2h/${this.type}/${this.firstPlayer}/${this.secondPlayer}`
  }

}
