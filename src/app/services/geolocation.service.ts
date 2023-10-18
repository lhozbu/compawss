import {Injectable} from '@angular/core';
import {MapQuestEndpointService} from "./map-quest-endpoint.service";
import Coordinates from "./models/coordinates";

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  /**
   *
   * @param mapQuestService
   */
  constructor(private mapQuestService: MapQuestEndpointService) {
  }

  /**
   *
   * @param address
   */
  public getAddressCoordinates(address: string): Promise<any> {
    return this.mapQuestService.getCoordinates(address);
  }

  /**
   *
   */
  public getCurrentCoordinates(): Promise<any> {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          } as Coordinates),
          (error) => reject(error));
      } else {
        reject({
          message: "Geolocation is not available in the current browser."
        })
      }
    })
  }
}
