import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

import { Product } from '../../app/_interfaces/product.model';
import { ProductDTO } from '../../app/_interfaces/productDTO.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = "https://localhost:44365/api";
  private img = "https://localhost:44365";

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


  getUsers(): Observable<Product[]> {
    return this.httpClient
      .get(this.apiURL +'/Products/')
      .pipe<Product[]>(map((data: any) => data.producsts));
  }


  getProduct(): Observable<any[]>{

  return this.httpClient.get<Product[]>(this.apiURL +'/Products/').pipe<Product[]>(map((data: Product[]) => data));

  }


  find(id: any): Observable<Product> {
    return this.httpClient.get<Product>(this.apiURL + '/Products/' + id)
  }


  update(id:any, product:Product): Observable<Product> {

    const updateProductRequest: Product={

      id :product.id,
      id_categories: product.id_categories,
       id_location: product.id_location,
        name:product.name,
         description: product.description,
          price:product.price,
           stock:product.stock,
            picture:product.picture,
         //   picture_path:product.picture_path
  }


   return this.httpClient.put<Product>(this.apiURL + '/Products/' + id, JSON.stringify(product), this.httpOptions).pipe(

  //   tap(() =>{

  // this.Refresh.next();
  //   })



  );

 }


 delete(id:any){
  return this.httpClient.delete<Product>(this.apiURL + '/Products/' + id, this.httpOptions)

}

create(product: ProductDTO): Observable<ProductDTO> {


  // ne moze biti klasa Product je tamo ima i ID pa nece raditi, moramo posebnu klasu za insert
  const addProductRequest: ProductDTO={

    id_categories: product.id_categories,
     id_location: product.id_location,
      name:product.name,
       description: product.description,
        price:product.price,
         stock:product.stock,
          picture:product.picture,
     //     picture_path : product.picture_path

}

return this.httpClient.post<ProductDTO>(this.apiURL + '/Products/', JSON.stringify(addProductRequest), this.httpOptions);



}

uploadImage(productID:string, file:File): Observable<any>{

const formData = new FormData();
formData.append("productImage", file);

return this.httpClient.post(this.apiURL + '/Products/'+ productID+'/upload-image', formData, {responseType:'text'});

}


getImagePath(relativePath:string){

  return `${this.img}/${relativePath}`;
}



}
