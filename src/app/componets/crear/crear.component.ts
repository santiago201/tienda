import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { producto } from 'src/app/models/producto';
import { ToastrService } from 'ngx-toastr';
import { PeliculaService } from 'src/app/services/pelicula.service';
//liberia para convertir archivo a base 64
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class CrearComponent implements OnInit {
  // creamos una variable tipo fromGrup la cual contendra nuestro formulario
  // luego en el constructor creamos una variable tipo FormBuilder
  // la cual nos permiitra manipular nuestro formulario ,
  // esta variable la igualamos a nuestra variable FormGroup
  // y creamos un objeto el cual tendrá nuestros inputs
  public previsualizacion : string | any;
  prodForm: FormGroup;
  titulo = 'AGREGAR PRODUCTO';
  id: string | null;
  public archivos : any  = []
  

  constructor(
    private fb: FormBuilder, //esta clase nos permite manipular los formularios
    private router: Router,
    private toastr: ToastrService,
    private _peliculaService: PeliculaService, // instanciamos la clase de los servicios http
    private aRouter: ActivatedRoute, // nos permite manipular las rutas y asi obtenr el id de el registro
    private sanintezer : DomSanitizer//libreria para pasar a base 64 
  ) {
    //capturamoms la info de el formulario
    this.prodForm = this.fb.group({
      codigo_peli: ['', Validators.required],
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      temporadas: ['', Validators.required],
      genero: ['', Validators.required],
      actores: ['', Validators.required],
      sinopsis: ['', Validators.required],
      
    });
    
    this.id = aRouter.snapshot.paramMap.get('codigo_prod');//comprobamos si a el enlace se le esta pasando el id 
   
  }

  ngOnInit(): void {
    this.cambiarTitulo();
  }
  agregarPeli() {
    //creamos un objeto de esta clase modelo y le damos los valores
    const PRODUCTO: producto = {
      codigo_prod: this.prodForm.get('codigo_peli')?.value,
      titulo: this.prodForm.get('titulo')?.value,
      fecha: this.prodForm.get('fecha')?.value,
      precio: this.prodForm.get('temporadas')?.value,
      tipo: this.prodForm.get('genero')?.value,
      sinopsis: this.prodForm.get('sinopsis')?.value,
      imagen: this.previsualizacion
    };
    console.log(PRODUCTO);

    // **ACTUALIZAR REGISTRO **
    if(this.id !== null){
     this._peliculaService.editarPeli(this.id,PRODUCTO).subscribe( data=>{
       this.toastr.info('REGISTRO ACTUALIZADO CORRECTAMENTE');
       this.router.navigate(['/admin']); //redirección
     },
     (error)=>{
      this.toastr.error(error);
      console.log(error);
      this.prodForm.reset(); //limpiar formulario
     })
    }
    else{
      
      // **AGREGAMOS EL REGISTRO**
    //llamamos a el meotodo de nuestro servicio el cual nos permite enviar el nuevo registro
    //le pasamos como parametro nuestro objeto  que tiene los valores capturados
    this._peliculaService.createPeli(PRODUCTO).subscribe(
      (data) => {
        this.toastr.info('PRODUCTO AGREGADO'); //alerta
        this.router.navigate(['/admin']); //redirección
      },
      (error) => {
        this.toastr.error(error);
        console.log(error);
        this.prodForm.reset(); //limpiar formulario
      }
    );
  }

    }
 cambiarTitulo() {
    if (this.id !== null) {
      this.titulo = 'EDITAR PRODUCTOan';//comprabamos si la ruta que extraimos trae en id si lo tiene cambiara el tirulo
                
      this._peliculaService.updatePeli(this.id).subscribe(data =>{
        console.log(data)
          this.prodForm.patchValue({
            // pasamos la info traida de la bd según el id y rellenamos el formulario con cada uno de los campos
            titulo: data.titulo,
            fecha: data.fecha,
            temporadas: data.temporadas,
            genero: data.genero,
            actores: data.actores,
            sinopsis: data.sinopsis,
            imagen: data.imagen,
            
          })
        }
        
      )
    
  }
  }

  capturarFile($event: any): any{
     const archivoCapturado  = $event.target.files[0]
    //  this.archivos.push(archivoCapturado)
     this.extrarBase64(archivoCapturado).then((imagen: any)=>{
       this.previsualizacion = imagen.base
       console.log(imagen);

     })
    

  }

extrarBase64 = async ($event: any) => new Promise((resolve, reject) =>  {
  
    const usafeImg = window.URL.createObjectURL($event);
    const image = this.sanintezer.bypassSecurityTrustUrl(usafeImg);
    const reader = new FileReader();
    reader.readAsDataURL($event);
    reader.onload = () =>{
      resolve({
        base : reader.result
      });
    };
    reader.onerror = error =>{
      resolve({
          base: null
      });
    };
    
 

}
)}