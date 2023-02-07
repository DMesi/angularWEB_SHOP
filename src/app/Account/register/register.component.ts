import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/_interfaces/user.model';

import { AccountService } from '../account.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  success = false;
  errMessage = ''

  user: User ={

    Email:'',
    Password:'',
    FirstName :'',
    LastName :'',
    PhoneNumber :'',
    Roles :['User'],
    //Roles :['Administrator'],
   }

   constructor(private accountService: AccountService,
    private snackbar:MatSnackBar,
    private router:Router
    ) { }


  ngOnInit(): void {
  }


  register():void{

    console.log(this.user);


    this.accountService.register(this.user)
    .subscribe(

      (successResponse)=>{

        console.log(successResponse);

        this.snackbar.open('Register successfully', undefined, {

          duration:2000
          });

              setTimeout(()=>{
          this.router.navigateByUrl('locations');
              },2000);



      },
      (errorResponse)=>{

        console.log(errorResponse);


        if(errorResponse.error.DuplicateEmail !=''){

          this.errMessage=  errorResponse.error.DuplicateEmail;

        }
        if(errorResponse.error.DuplicateEmail !=''){

          this.errMessage=  errorResponse.error.errors.Password;

        }


      }
//mpm@test.net
    )

  }
}
