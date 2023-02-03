import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/_interfaces/product.model';
import { ProductService } from '../product.service';

import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { taggedTemplate } from '@angular/compiler/src/output/output_ast';
// import { ProductDTO } from 'src/app/_interfaces/productDTO.model';


@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

 // @Output() onRefreshParent =new EventEmitter();


  productID :string|null|undefined;

  product: Product={
   id: '',
     id_categories: '',
      id_location: '',
       name:'',
        description: '',
         price:'',
          stock:'',
           picture:'',
        //   picture_path:''
  }

  Locations:any;
  Categories:any;

  objSlika:any;

  id:any;


isNewProduct = false;
header='';

  constructor(private productService: ProductService,
    private readonly route:ActivatedRoute,
    private http:HttpClient,
    private snackbar:MatSnackBar,
    private router:Router
    ) { }

    displayIMG ='';

  ngOnInit(): void {


      this.GetLocationList();
      this.GetCategoryList();


this.route.paramMap.subscribe(

(params)=>{

  this.productID = params.get('id');

if(this.productID){

// ako url ima string ADD

if(this.productID.toLocaleLowerCase()==='Add'.toLocaleLowerCase()){


  this.isNewProduct = true;
  this.header = 'Add new Product';

}

else{

  this.isNewProduct = false;
  this.header = 'Edit Product';

  this.productService.find(this.productID)

  .subscribe(

    (successResponse)=>{

     console.log(successResponse);
    this.setImage();
    this.product= successResponse;
    },
    (errorResponse)=>{

      this.setImage();

    }


  );
}


}

}

);



  }


  onUpdate():void{


    this.productService.update(this.productID, this.product)
    .subscribe(

      (successResponse)=>{


//* ZA REFRESOVANJE KOMPONENTE */
        this.notifyForChange();

this.snackbar.open('Product updated successfully', undefined, {

duration:2000
});


      },

      (errorResponse)=>{

        console.log(errorResponse);
      }

    )

    this.router.navigateByUrl('products');
  //  .then(() => {
  //    window.location.reload();

  //  });;






  }


  onDelete():void{

this.productService.delete(this.productID)
.subscribe(
  (successResponse)=>{

    this.notifyForChange();


    this.snackbar.open('Product deleted successfully', undefined, {

      duration:2000
      });

          setTimeout(()=>{
      this.router.navigateByUrl('products');
          },2000);
    },

  (errorResponse)=>{

    console.log(errorResponse);
  }

);

  }

  onAdd():void{

 // console.log(this.product);

  //console.log(this.objSlika);



this.productService.create(this.product)
.subscribe(

  (successResponse)=>{

    console.log(successResponse);

    const file:File =  this.objSlika;
    this.id = successResponse;


// PROVERA DA LI JE UPLOAD SLIKA AKO JESTE INSERT
  if(this.objSlika != undefined){


    this.productService.uploadImage(this.id, file).subscribe(

        (successResponse)=>{},

        (errorResponse)=>{}

       );

  }


    this.snackbar.open('Product add successfully', undefined, {

      duration:2000
      });

          setTimeout(()=>{
      this.router.navigateByUrl('products');
          },2000);

          // setTimeout(()=>{
          //   this.router.navigateByUrl(`products/${this.productID}`);


          //       },2000);

  },
  (errorResponse)=>{

    console.log(errorResponse);
  }

)
  }

  GetLocationList(){
    this.http.get(`https://localhost:44365/api/Locations`).subscribe(
      data => this.Locations = data
    );
  }

  GetCategoryList(){
    this.http.get(`https://localhost:44365/api/Products/categoryMeni`).subscribe(
      data => this.Categories = data
    );
  }

  // onFileSelected() {
  //   const inputNode: any = document.querySelector('#file');

  //   if (typeof (FileReader) !== 'undefined') {
  //     const reader = new FileReader();

  //     reader.onload = (e: any) => {
  //      // this.srcResult = e.target.result;
  //     };

  //     reader.readAsArrayBuffer(inputNode.files[0]);
  //   }
  // }



  imageUpload(event:any):void{

if(this.productID){

 const file:File =  event.target.files[0];


 this.productService.uploadImage(this.productID, file).subscribe(


  (successResponse)=>{

    this.product.picture = successResponse;

this.setImage();

this.snackbar.open('Product image updated', undefined, {

  duration:2000
  });


  },
  (errorResponse)=>{



  }
 );

}



  }

  // imageUpload2(event:any):void{

  //    const file:File =  event.target.files[0];

  //   // this.product.picture =file.name;
  //    this.product.picture =file;
  //     }

      slikaNovProizvod(event:any):void{

        const file:File =  event.target.files[0];

       // this.product.picture =file.name;
        this.objSlika =file;

      }





//* ZA REFRESOVANJE KOMPONENTE */
  notifyForChange() {
    this.productService.notifyAboutChange();
  }


   setImage():void{



    this.productService.find(this.productID)

  .subscribe(

    (successResponse)=>{

    this.product= successResponse;


    if(this.product.picture !== ""){


      this.displayIMG = this.productService.getImagePath(this.product.picture);

    }else{

    this.displayIMG = '/assets/user.jpg';

    }

    }
    ,
    // (errorResponse)=>{

    //   this.displayIMG = '/assets/user.jpg';

    // }
    );






  }


}
