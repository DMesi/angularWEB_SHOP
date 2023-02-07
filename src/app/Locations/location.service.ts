import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

import { Location } from 'src/app/_interfaces/location.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiURL = "https://localhost:44365/api";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //* ZA REFRESOVANJE KOMPONENTE */
subjectNotifier: Subject<null> = new Subject<null>();

notifyAboutChange() {
  this.subjectNotifier.next(null);
}
//******************* KRAJ */


  constructor(private httpClient: HttpClient) { }


  getLocation(): Observable<any[]>{

    return this.httpClient.get<Location[]>(this.apiURL +'/Locations/').pipe<Location[]>(map((data: Location[]) => data));

    }

    find(id: any): Observable<Location> {
      return this.httpClient.get<Location>(this.apiURL + '/Locations/' + id)
    }


    update(id:any, location:Location): Observable<Location> {

    //   const updateProductRequest: Location={

    //   //  id :location.id,
    //     id:location.id,
    //     name_location:location.name_location,
    //     city:location.city,
    //     city_short:location.city_short,
    //     postal_Code:location.postal_Code,
    //     street:location.street,
    //     street_Number:location.street_Number

    // }


     return this.httpClient.put<Location>(this.apiURL + '/Locations/' + id, JSON.stringify(location), this.httpOptions).pipe(


    );

   }
   create(location: Location): Observable<Location> {



  //   const addLocationRequest: Location={

  //       name_location:location.name_location,
  //       city:location.city,
  //        city_short:location.city_short,
  //       postal_Code:location.postal_Code,
  //        street:location.street,
  //        street_Number:location.street_Number

  // }

  return this.httpClient.post<Location>(this.apiURL + '/Locations/', JSON.stringify(location), this.httpOptions);



  }

  delete(id:any){
    return this.httpClient.delete<Location>(this.apiURL + '/Locations/' + id, this.httpOptions)

  }
}
