import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ProfileInformationInterface, ProfileStatisticInterface} from "src/app/pages/profile/interfaces/profile";
import {ProfileService} from "src/app/pages/profile/services/profile.service";

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {

  birthday: number = 0

  private _info?: ProfileInformationInterface;

  public h2hProfiles: string[] = [];

  @ViewChild('searchInput', {read: ElementRef}) searchInput!: ElementRef;

  @Input() set info(v: ProfileInformationInterface) {
    if (v) {
      this._info = v
      let today = new Date()
      let birthDate = new Date(v!.birthday)
      this.birthday = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        this.birthday--;
      }
    }
  }
  get info(): ProfileInformationInterface {
    return this._info!
  }

  private _statistics?: ProfileStatisticInterface;
  @Input() set statistics(v: ProfileStatisticInterface) {
    this._statistics = v
  }
  get statistics(): ProfileStatisticInterface {
    return this._statistics!
  }

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
  }

  searchProfiles(str: string) {
    this.profileService.searchProfiles(str, this._info?.type).subscribe(profiles => {
      this.h2hProfiles = profiles;
    })
  }

  focusToSearch() {
    this.searchInput.nativeElement.children[0].children[0].children[0].focus()
  }
}
