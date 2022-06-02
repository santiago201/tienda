import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { observable, Observable } from 'rxjs';
import { busqueda, producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  //creamos una variable donde estara nuestra url de el backend
  url = 'http://localhost:3000/api/';
  urlbus = 'http://localhost:3000/api/search';
  urlLogin = 'http://localhost:3000/api/sigin'
  urlusers = 'http://localhost:3000/api/users';
   public token : string | any;

  //en el constructor incializamos una variable tipo http
  constructor(
    private http : HttpClient,//servicios http
    private jwhelper : JwtHelperService//liberia para combprobar si el token existe o expiro
    ) { }

  // metodos y consultas de el backend



  // meotodo el cual traera todos los registros
  getplis(): Observable<any>{
     return this.http.get(this.url);
     
}

// metodo de barra de busqueda
getPelisBusq(busqueda: busqueda):Observable<any>{
    return this.http.post(this.urlbus,busqueda); 
}

//metodo para eliminar registro 
deletePeli(codigo_prod : string): Observable<any>{
 return this.http.delete(this.url+codigo_prod); 
}

// meotodo para agregar registro
createPeli(producto : any): Observable<any>{
  return this.http.post(this.url, producto);

}


// metodo para actualizar registro

editarPeli(codigo_prod: string, producto: any):Observable<any>{
return this.http.put(this.url + codigo_prod, producto)
}
updatePeli(codigo_prod : string): Observable<any>{
return this.http.get(this.url + codigo_prod)
}




//servicios login 

getUser(Credenciales : any): Observable<any>{
  return this.http.post(this.urlLogin,Credenciales)

}

//cremos un meotodo para comprobar si el toekn existe o si ya expiro 
//para saber si ya expprio usamos la librería auth0 angular-jwt
// también nos permite deodificar el token para ver los permisos de el usuario
isPermises(): boolean{
   this.token  = localStorage.getItem('token')
  if(this.jwhelper.isTokenExpired(this.token) ||  !localStorage.getItem('token')){
    return false
  }
  return true;
}
}