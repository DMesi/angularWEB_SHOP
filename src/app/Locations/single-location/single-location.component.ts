import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/_interfaces/location.model';
import { LocationService } from '../location.service';

import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-single-location',
  templateUrl: './single-location.component.html',
  styleUrls: ['./single-location.component.css']
})
export class SingleLocationComponent implements OnInit {

  productID :string|null|undefined;
  isNewLocation = false;
  header='';

  location: Location ={

    name_location:'',
    city:'',
    city_short:'',
    postal_Code:'',
    street:'',
    street_Number:'',
   }

  constructor(private locationService: LocationService,
    private readonly route:ActivatedRoute,
    private http:HttpClient,
    private snackbar:MatSnackBar,
    private router:Router
    ) { }



  ngOnInit(): void {

    this.route.paramMap.subscribe(

      (params)=>{

        this.productID = params.get('id');

      if(this.productID){

      // ako url ima string ADD

      if(this.productID.toLocaleLowerCase()==='Add'.toLocaleLowerCase()){


        this.isNewLocation = true;
        this.header = 'Add new Location';

      }

      else{

        this.isNewLocation = false;
        this.header = 'Edit Location';

        this.locationService.find(this.productID)

        .subscribe(

          (successResponse)=>{

           console.log(successResponse);

           this.location= successResponse;



          },
          (errorResponse)=>{



          }


        );
      }


      }

      }

      );
  }



  onUpdate():void{



    this.locationService.update(this.productID, this.location)
    .subscribe(

      (successResponse)=>{




//* ZA REFRESOVANJE KOMPONENTE */
        this.notifyForChange();


this.snackbar.open('Location updated successfully', undefined, {

duration:2000
});


      },

      (errorResponse)=>{

        console.log(errorResponse);
      }

    )

    this.router.navigateByUrl('locations');
  //  .then(() => {
  //    window.location.reload();

  //  });;






  }



  onAdd():void{

    console.log(this.location);


   this.locationService.create(this.location)
   .subscribe(

     (successResponse)=>{

       console.log(successResponse);

       this.snackbar.open('Location add successfully', undefined, {

         duration:2000
         });

             setTimeout(()=>{
         this.router.navigateByUrl('locations');
             },2000);



     },
     (errorResponse)=>{

       console.log(errorResponse);
     }

   )
     }


     onDelete():void{

      this.locationService.delete(this.productID)
      .subscribe(
        (successResponse)=>{


         this.notifyForChange();


          this.snackbar.open('Location deleted successfully', undefined, {

            duration:2000
            });

                setTimeout(()=>{
            this.router.navigateByUrl('locations');
                },2000);
          },

        (errorResponse)=>{

          console.log(errorResponse);
        }

      );

        }


//* ZA REFRESOVANJE KOMPONENTE */
notifyForChange() {
  this.locationService.notifyAboutChange();
}


}
