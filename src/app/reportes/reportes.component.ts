import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Gener02 } from '../models/gener02';
import { Gener02Service } from '../services/gener02.service';
import { PermisosService } from '../services/permisos.service';
import { Reporte } from '../models/reporte';
import { Nomin02Service } from '../services/nomin02.service';
import { Conta28Service } from '../services/conta28.service';
import { Nomin02 } from '../models/nomin02';
import { ReporteService } from '../services/reporte.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  providers: [PermisosService, Gener02Service, Nomin02Service, Conta28Service, ReporteService]
})
export class ReportesComponent implements OnInit {

  tipo_horario: any;
  data: any = [];
  public gener02: Gener02;
  public identity: any;
  public permisos21: any = [];
  public reporte: Reporte;
  public empleado: any = [];
  trabajadores: any = [];
  coddep: any;
  nomin02: Nomin02;
  vacio: any;
  constructor(private _reporteService: ReporteService, private _permisoService: PermisosService, private _conta28Service: Conta28Service, private _gener02Service: Gener02Service, private _nomin02Service: Nomin02Service) {
    this.gener02 = new Gener02('', '', '');
    this.identity = this._gener02Service.getIdentity();
    this.reporte = new Reporte('', '', '', '');
    this.nomin02 = new Nomin02('', '', '', '', '', '', '', 0);
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

  }

  ngOnInit(): void {
  }
  registerHorarios(form) {

    if (this.reporte.coddep == '') {
      this.reporte.coddep = '-';
    }
    if (this.reporte.docemp == '') {
      this.reporte.docemp = '-';
    }
    if (this.reporte.fecfin == '') {
      this.reporte.fecfin = '-';
    }
    if (this.reporte.fecini == '') {
      this.reporte.fecini = '-';
    }
    console.log("form!");
    console.log(this.reporte);
    this._reporteService.getData(this.reporte).subscribe(
      response => {
        console.log("respuesta!!!");
        console.log(response);
        this._reporteService.dowloadExcel(response);
      }
    )

  }
  traerEmpleado(docemp: any) {
    this._nomin02Service.getDataNomin02(this.reporte).subscribe(
      response => {
        if (response.status != 'error') {
          console.log("reportes!");
          console.log(response);
          this.empleado = response;
        } else {
          Swal.fire('Información', 'Trabajador No Existe!', 'error');
          this.empleado = '';
          this.reporte.docemp = '';
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

  getDependencia(result) {
    this.trabajadores = [];
    this.coddep = result.coddep;
    this.reporte.coddep = this.coddep;
    this.vacio = result.detalle;
    this._nomin02Service.getNomin02(this.nomin02).subscribe(
      response => {
        if (response) {
          this.trabajadores = response;
          this.data = [];
        } else {
          this.data = [];
          this.trabajadores = [];
        }
      }
    )


  }

}
