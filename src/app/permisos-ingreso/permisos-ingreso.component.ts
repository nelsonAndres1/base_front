import { Component, OnInit } from '@angular/core';
import { Gener02 } from '../models/gener02';
import { Gener02Service } from '../services/gener02.service';
import { Permisos_ingreso } from '../models/permisos_ingreso';
import Swal from 'sweetalert2';
import { PermisosService } from '../services/permisos.service';
@Component({
  selector: 'app-permisos-ingreso',
  templateUrl: './permisos-ingreso.component.html',
  styleUrls: ['./permisos-ingreso.component.css'],
  providers: [Gener02Service, PermisosService]
})
export class PermisosIngresoComponent implements OnInit {

  public vacio: any = null;
  public gener02: Gener02;
  public data: any = [];
  permisos: any = [];
  permisos_ingreso: Permisos_ingreso;
  seleccionado:any = [];
  constructor(private _gener02Service: Gener02Service, private _permisosService: PermisosService) {
    this.gener02 = new Gener02('', '', '');
    this.permisos_ingreso = new Permisos_ingreso('', '', '');
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
    console.log("detallle!");
    console.log(detalle);
    this.seleccionado = detalle;
    this.permisos_ingreso.usuario = detalle.usuario;
    this.data = [];
  }
  enviar() {
    if (this.permisos_ingreso.usuario == '') {
      Swal.fire('Incorrecto!', 'Seleccione Usuario', 'info');
    } else {
      if (this.permisos.length <= 0) {
        Swal.fire('Incorrecto!', 'Seleccione Permisos', 'info');
      } else {
        this.permisos_ingreso.permiso = this.permisos;

        this._permisosService.permisos(this.permisos_ingreso).subscribe(
          response => {
            if (response.status != 'success') {
              Swal.fire('Incorrecto!', 'Permisos No Guardados!', 'error');
            } else {
              Swal.fire('Correcto!', 'Permisos Guardados!', 'success');
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          }
        );
      }
    }
    console.log("permisoso!");
    console.log(this.permisos_ingreso);
  }
}
