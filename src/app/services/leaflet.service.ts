import {Injectable} from '@angular/core';
import * as L from "leaflet";
import {Circle, LatLng, latLng, Map, Marker} from "leaflet";
import Coordinates from "./models/coordinates";

@Injectable({
  providedIn: 'root'
})
export class LeafletService {

  /**
   * Renders the map in the given HTML element at the given coordinates
   * @param container
   * @param coordinates
   */
  public render(container: HTMLElement, coordinates: Coordinates): Map {
    // Creates latitude and longitude object
    const latitudeLongitude: LatLng = latLng(coordinates.latitude, coordinates.longitude);

    // Renders the map
    const map: Map = L.map(container, {
      zoomControl: false
    }).setView(latitudeLongitude, 10);

    // Renders the open street map tile
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return map;
  }

  /**
   * Sets the location of the map and marks the center
   * @param map
   * @param coordinates
   */
  public setLocation(map: Map, coordinates: any): void {
    // Creates latitude and longitude object
    const latitudeLongitude: LatLng = latLng(coordinates.latitude, coordinates.longitude);

    // Updates the map location
    map.flyTo(latitudeLongitude, 10);
  }

  /**
   * Sets the search area in the map
   * @param map
   * @param coordinates
   * @param range
   */
  public drawArea(map: Map, coordinates: any, range: number): Circle {
    // Creates the latitude longitude object
    const latitudeLongitude: LatLng = latLng(coordinates.latitude, coordinates.longitude);

    // Creates the area circle
    const area = L.circle(latitudeLongitude, {
      color: "blue",
      fillColor: "#AAD3DF",
      fillOpacity: 0.2,
      radius: this.toMeters(range)
    }).addTo(map);

    return area;
  }

  /**
   * Draws the indicated marker
   * @param map
   * @param coordinates
   * @param text
   */
  public drawMarker(map: Map, coordinates: any, text: string): Marker {
    // Creates the latitude longitude object
    const latitudeLongitude: LatLng = latLng(coordinates.latitude, coordinates.longitude);

    const marker = L.marker(latitudeLongitude).addTo(map);
    marker.bindPopup(text);

    return marker;
  }

  /**
   * Transforms miles to meters
   * @param miles
   * @private
   */
  private toMeters(miles: number) {
    return Math.ceil((miles + 2) * 1609.344);
  }
}
