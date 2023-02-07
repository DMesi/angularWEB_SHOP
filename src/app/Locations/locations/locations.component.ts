import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/_interfaces/product.model';
import { Subscription } from 'rxjs';
import { Location } from 'src/app/_interfaces/location.model';
import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

//TU SMESTAMO PODATKE IZ APIJA
locations: Location[] =[];

//KOLONE KOJE ZELIMO DA PRIKAZEMO U TABELI
displayedColumns:string[] = ['Name','City','Edit'];
// IZVOR /SORCE SA KOJIM CEMO POPUNITI TABELU
dataSource: MatTableDataSource<Location> = new  MatTableDataSource<Location>();

@ViewChild(MatPaginator)matPaginator!: MatPaginator;

@ViewChild(MatSort)matSort!: MatSort;

filterString ='';

constructor(private locationService: LocationService) { }

//* ZA REFRESOVANJE KOMPONENTE */
notifierSubscription: Subscription = this.locationService.subjectNotifier.subscribe(notified => {
  // originator has notified me. refresh my data here.
  this.getAll();

  });



  ngOnInit(): void {

    this.getAll();
  }

  // GetLocationList(){
  //   this.http.get(`https://localhost:44365/api/Locations`).subscribe(
  //     data => this.Locations = data
  //   );
  // }

  getAll(){

    // Fetch products
    this.locationService.getLocation()
    .subscribe(
    (successResponse)=>{
    //  console.log(successResponse);

      this.locations = successResponse;

      this.dataSource = new MatTableDataSource<Location>(this.locations);

      if(this.matPaginator){

        this.dataSource.paginator = this.matPaginator;

    }

    if(this.matSort){

      this.dataSource.sort= this.matSort;

    }

  },

      (errosResponse)=>{

    console.log(errosResponse);
      }
    );




  }

  filterProducts(){

    this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();

      }
}
