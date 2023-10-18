import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapQuestEndpointService {
  /**
   * Obtains the coordinates from the given address
   * @param address
   */
  public getCoordinates(address: string): Promise<any> {
    // Creates the parameters
    const params = new URLSearchParams();
    params.append("key", "czctv1IL9fYnEMbUZx6DMBaoJ3NOxJSv");
    params.append("location", address);
    params.append("maxResults", "1");

    // Does the API call to figure out the location
    return fetch("https://www.mapquestapi.com/geocoding/v1/address?" + params.toString(), {
      method: "get"
    })
      .then((response) => {
        if (response.ok) return response.json();
        return response.json().then((e) => Promise.reject(e));
      })
      .then((response) => {
        try {
          // Tries to obtain the latitude and longitude
          const latLng = response.results[0].locations[0].displayLatLng;
          return Promise.resolve({
            latitude: latLng.lat,
            longitude: latLng.lng
          });
        } catch (e: any) {
          // Rejects
          return Promise.reject(e);
        }
      });
  }
}
