import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { producto } from 'src/app/models/producto';
import { busqueda,users } from 'src/app/models/producto';
import { PeliculaService } from 'src/app/services/pelicula.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  //cremos una variable para que traiga nuestro modelo y guarde los registros que trae de la bd
  search: FormGroup;
  listProd: producto[] = [];
  listUsers : users[] = [];
  //traesmos nuestra clase service en el constructor y la clase para tener una animación
  constructor(
    private _peliculaService: PeliculaService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router : Router
  ) {
    this.search = fb.group({
      busqueda: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerPeli();
  }

  //traer todos los registros
  obtenerPeli() {
    const busqueda: busqueda = {
      busqueda: this.search.get('busqueda')?.value,
    };
// lo primero que hacemos el traer todos los registros
    this._peliculaService.getplis().subscribe(
      (data) => {
        console.log(data);
        this.listProd = data;
      },
      (error) => {
        this.toastr.error('PELICULA NO REGISTRADA ');
        console.log(error);
      }
    );
// si en la barra de busqueda el usuario envia un parametro nos traera el resultado segunn el firto
    if (this.search.valid) {
    
      this._peliculaService.getPelisBusq(busqueda).subscribe(
        (data) => {
          console.log(data);
          this.listProd = data;
        },
        (error) => {
          
          this.toastr.error('PELICULA NO REGISTRADA ');
          console.log(error);
    }
      );
    }
  }

  // eliminar registro por id
  eliminarPeli(codigo_peli: any) {
    this._peliculaService.deletePeli(codigo_peli).subscribe(
      (data) => {
        this.toastr.error('EL PRODUCTO HA SIDO ELIMINADO CORRECTAMENTE ');
        this.obtenerPeli();
      },
      (error) => {
        console.log(error);
      }
    );
  }



closesecion(){
  localStorage.removeItem('token')
  this.router.navigate(['login'])
}
}