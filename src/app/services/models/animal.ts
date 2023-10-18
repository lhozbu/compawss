import {LatLngExpression} from "leaflet";

/**
 * Animal federated class
 */
export default class Animal {
  public id: string = "";
  public source: string = "";

  public name: string = "";
  public species: string = "";
  public breed: string = "";
  public gender: string = "";
  public color: string = "";
  public age: string = "";
  public size: string = "";

  public email: string = "";
  public phone: string = "";
  public address: string = "";
  public coordinates: number[] = [];
}
