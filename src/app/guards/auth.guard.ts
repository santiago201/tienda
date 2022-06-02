import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PeliculaService } from '../services/pelicula.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    //TRAEMOS NUESTRO SERVICIO
    private peliService : PeliculaService, 
    private router : Router
  
  ){}
  canActivate():boolean{
    if(!this.peliService.isPermises()){
      this.router.navigate(['login'])
      console.log('token no valido o ya expiro')
      return false
    }
  
    return true;
}
  }
  

