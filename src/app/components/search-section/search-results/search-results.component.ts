import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import Animal from "../../../services/models/animal";

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  @ViewChild("resultsOffCanvas") private resultsOffCanvas: any;
  public animals : any = [];

  /**
   *
   * @param offCanvas
   */
  constructor(private offCanvas: NgbOffcanvas) {
  }

  /**
   *
   */
  public open(): void {
    this.offCanvas.open(this.resultsOffCanvas, {
      position: "end"
    });
  }

  /**
   * Updates the animals value
   * @param animals
   */
  public setAnimals(animals: Animal[]) : void {
    this.animals = animals;
  }
}
