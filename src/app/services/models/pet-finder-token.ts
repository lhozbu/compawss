/**
 * Pet Finder authentication token representation
 */
export default class PetFinderToken {
  public code: string = "";
  public expiration: Date = new Date();
}
