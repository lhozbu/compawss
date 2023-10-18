import {Component, Input, ViewChild} from '@angular/core';
import {GeolocationService} from "../../../services/geolocation.service";

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent {
  @Input() public searchMapComponent: any;
  @ViewChild("loadingModalComponent") public loadingModalComponent: any;

  public address: any;

  /**
   *
   * @param geolocationService
   */
  constructor(private geolocationService: GeolocationService) {
  }

  /**
   * Centers the map with the given address
   */
  public centerMapAddress() {
    this.loadingModalComponent.open("Searching...");
    this.geolocationService.getAddressCoordinates(this.address)
      .then((coordinates) => {
        this.searchMapComponent.center(coordinates);
        this.loadingModalComponent.close();
      })
      .catch((e) => this.loadingModalComponent.close());
  }

  /**
   * Centers the map using geolocation
   */
  public centerMapGeolocation(): void {
    this.loadingModalComponent.open("Searching...");
    this.address = "";
    this.geolocationService.getCurrentCoordinates()
      .then((coordinates) => {
        this.searchMapComponent.center(coordinates);
        this.loadingModalComponent.close();
      })
      .catch((e) => this.loadingModalComponent.close());
  }
}
