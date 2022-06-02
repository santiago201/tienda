import { Component, OnInit } from '@angular/core';
import { producto } from 'src/app/models/producto';
import { PeliculaService } from 'src/app/services/pelicula.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  listProd : producto[] =[];

  constructor(
    private _peliculaService: PeliculaService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getPoducts()
  }


getPoducts(){
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
}
}
