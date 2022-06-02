// librerias
import { NgModule } from '@angular/core';
//formularios reactivos
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

//peticiones http
import {HttpClientModule} from '@angular/common/http';
//componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearComponent } from './componets/crear/crear.component';
import { ListarComponent } from './componets/listar/listar.component';
import { LoginComponent } from './componets/login/login.component';
import { ComprasComponent } from './componets/compras/compras.component';
import { PublicComponent } from './componets/public/public.component';
import { ConocenosComponent } from './componets/conocenos/conocenos.component';
//animacion
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
//desencriptacion de token 
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    AppComponent,
    CrearComponent,
    ListarComponent,
    LoginComponent,
    ComprasComponent,
    PublicComponent,
    ConocenosComponent,
  
    
  ],
  imports:[
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, //formularios
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // animacion
    HttpClientModule,//petcions http
    
  ],
  bootstrap: [AppComponent],
  providers: [
    //INYECTAMOS ESTE PROVIDE PARA VER EL VALOR DEL TOKEN
    {provide: JWT_OPTIONS,useValue:JWT_OPTIONS},
    JwtHelperService
  ], 


 
})
export class AppModule {}
