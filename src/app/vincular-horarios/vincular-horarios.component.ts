import { Component, OnInit } from '@angular/core';
import { Conta28Service } from '../services/conta28.service';
import { Nomin02Service } from '../services/nomin02.service';
import { Nomin02 } from '../models/nomin02';
import { HorariosService } from '../services/horarios.service';
import { Trabajador_HorarioService } from '../services/trabajador_horario.service';
import { Trabajador_Horario } from '../models/trabajador_horario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vincular-horarios',
  templateUrl: './vincular-horarios.component.html',
  styleUrls: ['./vincular-horarios.component.css'],
  providers: [Conta28Service, Nomin02Service, HorariosService, Trabajador_HorarioService]
})
export class VincularHorariosComponent implements OnInit {

  nomin02: Nomin02;
  public vacio: any = null;
  public data: any = [];
  public coddep: any;
  public trabajadores: any = [];
  public bandera: any = '';
  public seleccionados: any = [];
  public horarios: any = [];
  public horariosSeleccionado: any = [];
  public trabajador_horario: Trabajador_Horario;
  public id_horario;
  public dias: any = [];
  constructor(private _conta28Service: Conta28Service, private _nomin02Service: Nomin02Service, private _horariosService: HorariosService, private _trabajador_horarioService: Trabajador_HorarioService) {
    this.nomin02 = new Nomin02('', '', '', '', '', '', '', 0);

    this.trabajador_horario = new Trabajador_Horario('', []);

    this._horariosService.getHorarios({}).subscribe(
      response => {
        this.horarios = response;
      }
    )
    /*     this.dias = [{'1':'LUNES','2':'MARTES', '3':'MIERCOLES', '4':'JUEVES', '5':'VIERNES', '6':'SABADO', '7':'DOMINGO'}]; */
  }

  ngOnInit(): void {
  }

  agregarDias(dia) {
    let bandera = false;
    if (this.dias.length > 0) {
      for (let index = 0; index < this.dias.length; index++) {
        if (this.dias[index] == dia) {
          this.dias.splice(index, 1);
          bandera = true;
        }
      }
      if (!bandera) {
        this.dias.push(dia);
      }
    } else {
      this.dias.push(dia);
    }
    console.log("diasss!");
    console.log(this.dias);

  }

  registerVincularHorarios(form) {

    if (this.dias.length == 0) {
      Swal.fire('Incorrecto!', 'Favor seleccionar dias!', 'error');
    } else {
      if (this.seleccionados.length == 0) {
        Swal.fire('Incorrecto!', 'Favor seleccionar trabajadores!', 'error');
      } else {
        if (this.id_horario == null) {
          Swal.fire('Incorrecto!', 'Favor seleccionar horario!', 'error');
        } else {
          this.trabajador_horario = new Trabajador_Horario(this.id_horario, this.seleccionados, this.dias);
          this._trabajador_horarioService.guardarTrabajadorHorario(this.trabajador_horario).subscribe(
            response => {
              if (response) {
                Swal.fire('Correcto!', 'Datos Registrados Correctamente', 'success');
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              } else {
                Swal.fire('Incorrecto!', 'Datos No Registrados!', 'error');
              }
            }
          )
        }
      }
    }
  }

  detalleHorario(detalle) {
    console.log("pruebaaaaa!");
    console.log(detalle.target.value);
    this.id_horario = detalle.target.value;
    for (let index = 0; index < this.horarios.length; index++) {
      if (this.horarios[index].id == detalle.target.value) {
        this.horariosSeleccionado = this.horarios[index];
      }
    }
  }

  agregar(docemp) {
    let bandera = false;
    if (this.seleccionados.length > 0) {
      for (let index = 0; index < this.seleccionados.length; index++) {
        if (this.seleccionados[index] == docemp) {
          this.seleccionados.splice(index, 1);
          bandera = true;
        }
      }
      if (bandera) {
      } else {
        this.seleccionados.push(docemp);
      }
    } else {
      this.seleccionados.push(docemp);
    }
    console.log("uno a uno");
    console.log(this.seleccionados);
  }

  Cambio() {
    if (this.bandera == '') {
      this.bandera = true;
      if (this.trabajadores.length > 0) {
        this.seleccionados = [];
        for (let index = 0; index < this.trabajadores.length; index++) {
          this.seleccionados.push(this.trabajadores[index].docemp);
        }
      } else {
        this.seleccionados = [];
      }
    } else {
      this.bandera = '';
      this.seleccionados = [];
    }
    console.log("todos!");
    console.log(this.seleccionados);
  }

  getDependencia(result) {
    this.trabajadores = [];
    this.coddep = result.coddep;
    this.nomin02.coddep = this.coddep;
    this.vacio = result.detalle;
    this._nomin02Service.getNomin02(this.nomin02).subscribe(
      response => {
        if (response) {
          this.trabajadores = response;
        } else {
          this.trabajadores = [];
        }
      }
    )


  }

  getConta28(pclave: any) {
    const keyword = pclave.target.value;
    this._conta28Service.searchConta28(keyword).then(
      response => {
        this.data = response;
      }
    )
  }

}
