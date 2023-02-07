import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/_interfaces/user.model';

import { AccountService } from '../account.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

  login():void{

    console.log(this.user);


    this.accountService.login(this.user)
    .subscribe(

      (successResponse)=>{

        console.log(successResponse);

        this.snackbar.open('Login successfully', undefined, {

          duration:2000
          });

              setTimeout(()=>{
          this.router.navigateByUrl('products');
              },2000);



      },
      (errorResponse)=>{

        console.log(errorResponse);

        this.errMessage= 'The user name or password is incorrect!' ;

      }

    )

  }


}
