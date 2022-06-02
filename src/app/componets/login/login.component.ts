import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginData, producto } from 'src/app/models/producto';

import { ToastrService } from 'ngx-toastr';
import { PeliculaService } from 'src/app/services/pelicula.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginForm : FormGroup
 
  
  constructor(
    private fb : FormBuilder,
    private router : Router,
    private toastr : ToastrService,
    private arouter : ActivatedRoute,
    private PeliServe : PeliculaService,
    

  ) { 
    this.loginForm = fb.group({
      user : ['',Validators.required],
      password : [ '', Validators.required]

    });
  }

  ngOnInit(): void {
  }

autentication(){
  const Credenciales : LoginData = {
    user : this.loginForm.get('user')?.value,
    password : this.loginForm.get('password')?.value

  };

  this.PeliServe.getUser(Credenciales).subscribe((data: any)=>{
    if(data == 'usuario incorrecto'){
      this.toastr.error('usuario incorrecto')
   //capturamos el token que nos regresa y lo guardamos en el local storage
    }else{localStorage.setItem('token',data.token);
  //se redirigue admin
  this.router.navigate(['admin'])

}})
}
}
