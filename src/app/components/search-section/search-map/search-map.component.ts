import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';

import {LeafletService} from "../../../services/leaflet.service";
import MapData from "../../../services/models/map-data";
import {AnimalSearchService} from "../../../services/animal-search.service";
import {LeafletMouseEvent, Marker} from "leaflet";
import Coordinates from "../../../services/models/coordinates";
import Animal from "../../../services/models/animal";
import {GeolocationService} from "../../../services/geolocation.service";
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.css']
})
export class SearchMapComponent implements AfterViewInit {
  @ViewChild("mapContainer") public mapContainer: any;
  @ViewChild("loadingModalComponent") public loadingModalComponent: any;
  @Input() public searchResultsComponent: any;
  @Input() public searchFilterComponent: any;

  public mapData: MapData = new MapData();
  public animals: Animal[] = [];

  /**
   *
   * @param leafletEndpoint
   * @param animalSearchService
   * @param geolocationService
   */
  public constructor(private leafletEndpoint: LeafletService,
                     private animalSearchService: AnimalSearchService,
                     private geolocationService: GeolocationService,
                     private localStorageService: LocalStorageService) {

    // Obtains the coordinates and range if present
    this.mapData.coordinates = this.localStorageService.loadCoordinates();
    this.mapData.range = this.localStorageService.loadRange();

  }

  /**
   * After initialization
   */
  public ngAfterViewInit(): void {
    // Renders and centers the map
    this.mapData.map = this.leafletEndpoint.render(this.mapContainer.nativeElement, this.mapData.coordinates);
    this.center(this.mapData.coordinates);

    // Listener to double-click on the map
    this.mapData.map.addEventListener("dblclick",
      (e: LeafletMouseEvent) => this.center({latitude: e.latlng.lat, longitude: e.latlng.lng} as Coordinates));
  }

  /**
   * Centers the map into the indicated coordinates
   * @param coordinates
   */
  public center(coordinates: Coordinates): void {
    // Updates the coordinates
    this.mapData.coordinates = coordinates;

    // Updates the necessary elements
    this.centerMap();
    this.drawArea();
    this.findAnimals();

    // Saves the coordinates
    this.localStorageService.saveCoordinates(coordinates);
  }

  /**
   * Updates the range in the current coordinates
   * @param range
   */
  public rangeChanged(range: number): void {
    // Updates the range
    this.mapData.range = range;

    // Draws the area
    this.drawArea();

    // Searches for the animals
    this.findAnimals();

    // Saves the range
    this.localStorageService.saveRange(range);
  }

  /**
   * Filters the animals in memory with the given indications
   * @param filters
   */
  public filter(filters: any): void {
    // Filters by species and sizes
    const animals = this.animals
      .filter((animal: Animal) => filters.species.includes(animal.species))
      .filter((animal: Animal) => filters.sizes.includes(animal.size))
      .filter((animal: Animal) => filters.breeds.includes(animal.breed));

    // Displays the animals
    this.displayAnimals(animals);
  }

  /**
   * Centers the map with the coordinates in the map data
   * @private
   */
  private centerMap(): void {
    this.leafletEndpoint.setLocation(this.mapData.map, this.mapData.coordinates);
  }

  /**
   * Draws the range with the range in the map data
   * @private
   */
  private drawArea(): void {
    if (typeof this.mapData.area.remove === "function") this.mapData.area.remove();
    this.mapData.area = this.leafletEndpoint.drawArea(this.mapData.map, this.mapData.coordinates, this.mapData.range);
  }

  /**
   * Finds the available animals in the current coordinates and range
   * @private
   */
  private findAnimals(): void {
    this.loadingModalComponent.open("Loading...");
    this.animalSearchService.findAnimals(this.mapData.coordinates, this.mapData.range)
      .then((animals: Animal[]) => {
        this.animals = animals;
        this.displayAnimals();
        this.searchFilterComponent.setAnimals(animals);
        this.loadingModalComponent.close();
      })
      .catch(() => this.loadingModalComponent.close());
  }

  /**
   * Displays the animals on the map<br>
   * If the list is not given then the one in memory is used
   *
   * @param animals
   * @private
   */
  private displayAnimals(animals: Animal[] = this.animals): void {
    // Removes any existing markers
    this.mapData.markers.forEach((marker: Marker) => {
      marker.remove();
    })
    this.mapData.markers = [];

    // Groups the animals by address
    const animalsByAddress: any = {};
    animals.forEach((animal: Animal) => {
      const animalsInAddress: Animal[] = animalsByAddress.hasOwnProperty(animal.address) ? animalsByAddress[animal.address] : [];
      animalsInAddress.push(animal);
      animalsByAddress[animal.address] = animalsInAddress;
    });

    // Obtains the coordinates and displays
    Object.keys(animalsByAddress).forEach((address: string) => {
      const animalsInAddress: Animal[] = animalsByAddress[address];
      const animalCount = animalsInAddress.length;

      this.geolocationService.getAddressCoordinates(address)
        .then((coordinates: Coordinates) => {
          // language=HTML
          const text = `
            <strong>${animalCount == 1 ? '1 result' : animalCount + ' results'}</strong>
            <br>
            <span>${address}</span>
          `;
          const marker = this.leafletEndpoint.drawMarker(this.mapData.map, coordinates, text);
          this.mapData.markers.push(marker);
        });
    });

    // Updates the results
    this.searchResultsComponent.setAnimals(animals);
  }
}
