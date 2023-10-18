import {Injectable} from '@angular/core';
import Coordinates from "./models/coordinates";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  /**
   * Saves the coordinates into local storage
   * @param coordinates
   */
  public saveCoordinates(coordinates: Coordinates): void {
    localStorage.setItem("coordinates", JSON.stringify(coordinates));
  }

  /**
   * Obtains the coordinates from the local storage
   */
  public loadCoordinates(): Coordinates {
    let coordinates: Coordinates = new Coordinates();
    if (localStorage.getItem("coordinates") != null) {
      coordinates = JSON.parse(localStorage.getItem("coordinates") || "{}") as Coordinates;
    }

    return coordinates;
  }

  /**
   * Saves the range into local storage
   * @param range
   */
  public saveRange(range: number): void {
    localStorage.setItem("range", range + "");
  }

  /**
   * Loads the range from the local storage
   */
  public loadRange(): number {
    let range = 20;
    if (localStorage.getItem("range") != null) {
      range = parseInt(localStorage.getItem("range") || "0");
    }

    return range;
  }
}
