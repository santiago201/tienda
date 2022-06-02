import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConocenosComponent } from './componets/conocenos/conocenos.component';


import { CrearComponent } from './componets/crear/crear.component';
import { ListarComponent } from './componets/listar/listar.component';
import { LoginComponent } from './componets/login/login.component';
import { PublicComponent } from './componets/public/public.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  //ruta raiz la que cargara de primeras
  { path: 'admin', component: ListarComponent,canActivate:[AuthGuard] },
  {path: 'conocenos', component: ConocenosComponent},
  { path: '', component: PublicComponent },
  //siguentes vistas
  { path: 'agregar-peli', component: CrearComponent },
  { path: 'editar-peli/:codigo_prod', component: CrearComponent },
  //barra de busqueda
  {path : 'login', component:  LoginComponent},
  // esta ruta es por si el usuario ingresa una ruta que no exista nos muestre la ruta raiz
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
