import {Circle, Map, Marker} from "leaflet";
import Coordinates from "./coordinates";

/**
 * Map status representation
 */
export default class MapData {
  public map: Map = ({} as Map);
  public area: Circle = ({} as Circle);
  public markers: Marker[] = [];

  public coordinates: Coordinates = new Coordinates();
  public range: number = 20;
}
