import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import Animal from "../../../services/models/animal";

@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements AfterViewInit {
  @Input() public searchMapComponent: any;
  @ViewChild("filterOffCanvas") filterOffCanvas: any;

  public range: number = 5;

  public animals: any = [];

  public species: any[] = [];
  public sizes: any[] = [];
  public breeds: any[] = [];

  /**
   *
   * @param offCanvas
   */
  constructor(private offCanvas: NgbOffcanvas) {
  }

  /**
   * After initialization
   */
  public ngAfterViewInit(): void {
    this.range = this.searchMapComponent.mapData.range;
  }

  /**
   *
   */
  public open(): void {
    this.offCanvas.open(this.filterOffCanvas);
  }

  /**
   * Toggles all the species
   */
  public toggleSpecies(): void {
    if (this.species.length > 0) {
      const value: boolean = !this.species[0].checked;
      this.species.forEach((specie: any) => specie.checked = value);
      this.filterChanged();
    }
  }

  /**
   * Toggles all the sizes
   */
  public toggleSizes(): void {
    if (this.sizes.length > 0) {
      const value: boolean = !this.sizes[0].checked;
      this.sizes.forEach((size: any) => size.checked = value);
      this.filterChanged();
    }
  }

  /**
   * Toggles all the breeds
   */
  public toggleBreeds(): void {
    if (this.breeds.length > 0) {
      const value: boolean = !this.breeds[0].checked;
      this.breeds.forEach((breed: any) => breed.checked = value);
      this.filterChanged();
    }
  }

  /**
   *
   * @param animals
   */
  public setAnimals(animals: Animal[]): void {
    this.animals = animals;

    this.setSpecies();
    this.setSizes();
    this.setBreeds();
  }

  /**
   * Event when the filter selection changed
   */
  public filterChanged(): void {
    this.searchMapComponent.filter({
      "species": this.getSelectedSpecies(),
      "sizes": this.getSelectedSizes(),
      "breeds": this.getSelectedBreeds()
    })
  }

  /**
   * Obtains the selected species
   * @private
   */
  private getSelectedSpecies(): string[] {
    return this.species
      .filter((specie) => specie.checked)
      .map((specie) => specie.id);
  }

  /**
   * Updates the selected sizes
   * @private
   */
  private getSelectedSizes(): string[] {
    return this.sizes
      .filter((size) => size.checked)
      .map((size) => size.id);
  }

  /**
   * Updates the selected breeds
   * @private
   */
  private getSelectedBreeds(): string [] {
    return this.breeds
      .filter((breed) => breed.checked)
      .map((breed) => breed.id);
  }

  /**
   * Sets the sizes based on the animals in memory
   * @private
   */
  private setSizes(): void {
    this.sizes = [];
    this.animals
      .map((animal: Animal) => animal.size)
      .filter((size: string, index: number, array: string[]) => array.indexOf(size) == index)
      .sort()
      .forEach((size: string) => this.sizes.push({
        id: size,
        checked: true
      }));
  }

  /**
   * Sets the species based on the animals in memory
   * @private
   */
  private setSpecies(): void {
    this.species = [];
    this.animals
      .map((animal: Animal) => animal.species)
      .filter((specie: string, index: number, array: string[]) => array.indexOf(specie) == index)
      .sort()
      .forEach((specie: string) => this.species.push({
        id: specie,
        checked: true
      }));
  }

  /**
   * Sets the breeds based on the animals in memory
   * @private
   */
  private setBreeds(): void {
    this.breeds = [];
    this.animals
      .map((animal: Animal) => animal.breed)
      .filter((breed: string, index: number, array: string[]) => array.indexOf(breed) == index)
      .sort()
      .forEach((breed: string) => this.breeds.push({
        id: breed,
        checked: true
      }));
  }
}
