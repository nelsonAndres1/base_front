import { Component, OnInit } from '@angular/core';
import { Gener02 } from '../models/gener02';
import { Gener02Service } from '../services/gener02.service';
@Component({
  selector: 'app-permisos-ingreso',
  templateUrl: './permisos-ingreso.component.html',
  styleUrls: ['./permisos-ingreso.component.css'],
  providers: [Gener02Service]
})
export class PermisosIngresoComponent implements OnInit {

  public vacio: any = null;
  public gener02: Gener02;
  public data: any = [];
  permisos: any = [];
  constructor(private _gener02Service: Gener02Service) {
    this.gener02 = new Gener02('', '', '');
  }

  ngOnInit(): void {
  }
  asignarPermiso(form) {

  }
  getGener02(pclave: any) {
    const keyword = pclave.target.value;
    if (keyword.length == 0) {
      this.data = [];
    } else {
      this._gener02Service.searchGener02(keyword).then(
        response => {
          this.data = response;
          console.log("daa");
          console.log(this.data);
        }, error => {
          this.data = []
        }
      )

    }

  }
  agregar(permiso: any) {
    let bandera = false;
    if (this.permisos.length > 0) {
      for (let index = 0; index < this.permisos.length; index++) {
        if (this.permisos[index] == permiso) {
          this.permisos.splice(index, 1);
          bandera = true;
        }
      }
      if (!bandera) {
        this.permisos.push(permiso);
      }
    } else {
      this.permisos.push(permiso);
    }
    console.log("permisosss!");
    console.log(this.permisos);
  }
  getUsuario(detalle) {
    console.log(detalle);
  }
}
