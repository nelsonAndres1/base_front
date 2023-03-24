import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Gener02 } from '../models/gener02';
import { Horario } from '../models/horario';
import { HorariosService } from '../services/horarios.service';
import { Gener02Service } from '../services/gener02.service';
import { PermisosService } from '../services/permisos.service';
@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css'],
  providers: [HorariosService, Gener02Service]
})
export class HorariosComponent implements OnInit {

  bandera = true;
  banderaGeneral = false;
  evento = '';
  horario: Horario;
  tipo_horario: any;
  data: any = [];
  public gener02: Gener02;
  public identity: any;
  permisos21: any = [];
  constructor(private _horariosSetvice: HorariosService, private _gener02Service: Gener02Service, private _permisoService: PermisosService) {
    this.gener02 = new Gener02('', '', '');
    this.identity = this._gener02Service.getIdentity();
    this._horariosSetvice.TipoHorario({}).subscribe(
      response => {
        this.tipo_horario = response;
      }
    )

    this._horariosSetvice.getConta28({}).subscribe(
      response => {
        console.log("Dependencias!");
        console.log(response);
      }
    )

    if (this.identity == undefined) {

    } else {
      this.gener02 = new Gener02(this.identity.sub, '', '');

      this._permisoService.getPermisos(this.gener02).subscribe(
        response => {
          console.log("response!");
          console.log(response);
          for (let index = 0; index < response.length; index++) {
            console.log(response[index].permiso);
            this.permisos21.push(response[index].permiso);
          }
          console.log("permisos!");
          console.log(this.permisos21);
        }
      )
    }


    this.horario = new Horario(0, '', '', '', '', '', '', '');

  }

  ngOnInit(): void {
  }

  getConta28(event) {

  }

  registerHorarios(form) {
    console.log(this.horario);
    this._horariosSetvice.saveHorario(this.horario).subscribe(
      response => {
        if (response.status != 'error') {
          Swal.fire('Registro Exitoso!', '', 'success');
        } else {
          Swal.fire('Registro Incorrecto', '', 'error');
        }
        form.reset();
        this.horario = new Horario(0, '', '', '', '', '', '', '');
      }, error => {
        Swal.fire('Registro Incorrecto', '', 'error');
        form.reset();
        this.horario = new Horario(0, '', '', '', '', '', '', '');
      }
    );
  }
  tipo_de_horario(event: any) {
    this.evento = event.target.value;
    if (this.evento != '') {
      this.banderaGeneral = true;
      if (event.target.value == '1' || event.target.value == '5') {
        this.bandera = true;
      } else {
        this.bandera = false;
      }
    } else {
      this.banderaGeneral = false;
    }
    console.log("bandera!");
    console.log(this.bandera);
    console.log(this.banderaGeneral);
  }
}
