import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/_interfaces/product.model';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

import { ElementRef } from '@angular/core';

// import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  preuzimanjeIzInputa='';

//TU SMESTAMO PODATKE IZ APIJA
products: Product[] =[];

//KOLONE KOJE ZELIMO DA PRIKAZEMO U TABELI
displayedColumns:string[] = ['ID','Name','Price','Edit'];
// IZVOR /SORCE SA KOJIM CEMO POPUNITI TABELU
dataSource: MatTableDataSource<Product> = new  MatTableDataSource<Product>();

@ViewChild(MatPaginator)matPaginator!: MatPaginator;

@ViewChild(MatSort)matSort!: MatSort;

 @ViewChild('novaVrednost', {static: true}) vrednostIzInputa! : ElementRef ;


filterString ='';

showchild:boolean = false;

constructor(private productService: ProductService) { }

//* ZA REFRESOVANJE KOMPONENTE */
  notifierSubscription: Subscription = this.productService.subjectNotifier.subscribe(notified => {
  // originator has notified me. refresh my data here.
  this.getAll();

  });

  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.getAll();

  }

  primeViewChildFje() {

    console.log(this.vrednostIzInputa.nativeElement.innerHTML);

  }


  filterProducts(){

this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();

  }

  getAll(){

    // Fetch products
    this.productService.getProduct()
    .subscribe(
    (successResponse)=>{
    //  console.log(successResponse);

      this.products = successResponse;

      this.dataSource = new MatTableDataSource<Product>(this.products);

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

  prikaziVrednost(vrednost:string){

    this.preuzimanjeIzInputa = vrednost;

  }
}
