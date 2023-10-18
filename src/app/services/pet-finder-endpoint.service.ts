import {Injectable} from '@angular/core';
import Animal from "./models/animal";
import PetFinderToken from "./models/pet-finder-token";

@Injectable({
  providedIn: 'root'
})
export class PetFinderEndpointService {
  private token: PetFinderToken = new PetFinderToken();

  private clientId: string = "gIQUUt01qVieOyIihTIzKucYB3oUZakDq7ETPwenCSuBuZWpSU";
  private clientSecret: string = "7YaVYMVIdWUjgKlC7fJAwJkgmA9uR7cWRRtsVUmi";

  private multiplePageSearch: boolean = false;

  /**
   * Finds the animals at the given coordinates in the given range
   * @param coordinates
   * @param range
   */
  public findAnimals(coordinates: any, range: number): Promise<any> {
    // Authenticates
    return new Promise((resolve) => {
      this.authenticate().then((token) => {

        // Obtains the first page results
        this.fetchAnimals(coordinates, range, 1, token).then((firstPageResults) => {

          // Obtains the animals
          const animals: Animal[] = firstPageResults.animals.map((animal: any) => this.toAnimal(animal));

          // Obtains the rest of the pages
          const promises: Promise<any>[] = [];

          if (this.multiplePageSearch) {
            const totalPages = firstPageResults["pagination"]["total_pages"];
            for (let i = 2; i <= totalPages; i++) {
              promises.push(this.fetchAnimals(coordinates, range, i, token));
            }
          }

          if (promises.length > 0) {
            Promise.all(promises).then((otherPagesResults) => {
              otherPagesResults.forEach((otherPageResults: any) => {
                const otherPageAnimals: Animal[] = otherPageResults.animals.map((animal: any) => this.toAnimal(animal));
                animals.push(...otherPageAnimals);
              });

              resolve(animals);
            });
          } else {
            resolve(animals);
          }
        });
      });
    })
  }

  /**
   * Finds the animals in the pet finder API
   * @param coordinates
   * @param range
   * @param page
   * @param token
   * @private
   */
  private fetchAnimals(coordinates: any, range: number, page: number, token: string): Promise<any> {
    // Creates the parameters
    const params = new URLSearchParams();
    params.append("location", coordinates.latitude + "," + coordinates.longitude);
    params.append("distance", range + "");
    params.append("limit", "20");
    params.append("page", page + "");

    return fetch("https://api.petfinder.com/v2/animals?" + params.toString(), {
      method: "get",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then((response) => response.ok ? response.json() : {})
      .catch(() => Promise.resolve({}));
  }

  /**
   * Transforms animal data to the federated Animal object<br>
   * This is done for standardization purposes
   * @param animalData
   */
  private toAnimal(animalData: any): Animal {
    const animal: Animal = new Animal();

    // Sets source and id
    animal.id = animalData.id + "";
    animal.source = "PET_FINDER";

    // Sets the basic animal information
    animal.name = animalData.name;
    animal.species = animalData.species;
    animal.breed = animalData.breeds.primary;
    animal.gender = animalData.gender;
    animal.color = animalData.colors.primary;
    animal.age = animalData.age;
    animal.size = animalData.size;

    // Sets the contact information
    const contactData = animalData.contact;
    animal.email = contactData.email;
    animal.phone = contactData.phone;

    // Sets the address
    const addressData = contactData.address;
    animal.address = [
      (contactData.address.address1 || ""),
      (contactData.address.address2 || ""),
      (contactData.address.city || ""),
      (contactData.address.state || ""),
      (contactData.address.postcode || ""),
      (contactData.address.country || "")
    ].filter((value) => value !== "").join(" ");

    return animal;
  }

  /**
   *
   */
  private authenticate(): Promise<any> {
    // Checks if there is a token and is not expired
    if (this.token.code !== "" && this.token.expiration > new Date()) {
      return new Promise((resolve) => {
        resolve(this.token.code);
      })
    } else {
      // Creates the parameters
      const formData: URLSearchParams = new URLSearchParams();
      formData.set("grant_type", "client_credentials");
      formData.set("client_id", this.clientId);
      formData.set("client_secret", this.clientSecret);

      // Obtains the authentication token
      return fetch("https://api.petfinder.com/v2/oauth2/token", {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
      })
        .then((response) => {
          if (response.ok) return response.json();
          return response.json().then((e) => Promise.reject(e));
        })
        .then((token) => {
          // Obtains the expiration date for easy analysis
          const expiration: Date = new Date();
          expiration.setSeconds(expiration.getSeconds() + token["expires_in"]);

          // Sets the token values
          this.token.code = token["access_token"];
          this.token.expiration = expiration;

          // Responds with the token
          return Promise.resolve(this.token.code);
        });
    }
  }
}
