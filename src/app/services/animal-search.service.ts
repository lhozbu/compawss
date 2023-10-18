import {Injectable} from '@angular/core';
import {PetFinderEndpointService} from "./pet-finder-endpoint.service";
import Animal from "./models/animal";

@Injectable({
  providedIn: 'root'
})
export class AnimalSearchService {

  /**
   *
   * @param petFinderEndpoint
   */
  constructor(private petFinderEndpoint: PetFinderEndpointService) {
  }

  /**
   * Finds the list of the animals from all the available endpoints
   * @param coordinates
   * @param range
   */
  public findAnimals(coordinates: any, range: number): Promise<any> {
    const petFinderPromise = this.petFinderEndpoint.findAnimals(coordinates, range);

    return Promise.all([petFinderPromise])
      .then((results) => {
        const animals: Animal[] = [];
        results.forEach((result : Animal[]) => animals.push(...result));

        return Promise.resolve(animals);
      });
  }
}
