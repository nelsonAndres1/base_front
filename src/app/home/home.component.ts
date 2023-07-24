import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Nomin02 } from '../models/nomin02';
import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Gener02Service } from '../services/gener02.service';
import { Nomin02Service } from '../services/nomin02.service';
import { Gener02 } from '../models/gener02';
import { PermisosService } from '../services/permisos.service';
import { IpService } from '../services/ip.service';
import { global } from '../services/global';
import axios from 'axios';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [RegisterService, Gener02Service, Nomin02Service, PermisosService, IpService]
})
export class HomeComponent implements OnInit, AfterContentInit {
  @ViewChild("docemp") input: ElementRef | undefined;
  public identity: any;
  public token: any;
  nomin02: any;
  respuesta: any = [];
  show: any = false;
  name: string = '';
  usuario: any;
  bandera = true;
  ultimo: any = [];
  gener02: Gener02;
  permisos21: any = [];
  ip: any;
  usuario_vigilancia = [1695,
    1733,
    1735,
    1737,
    1738,
    1740,
    1743,
    1815,
    1818,
    1833,
    1834,
    1835,
    1836,
    1837,
    1838,
    1839,
    1840,
    1851,
    1750]
  ipAddress: string;
  realIpAddress: any;
  constructor(
    private _registerService: RegisterService,
    private _gener02Service: Gener02Service,
    private _nomin02Service: Nomin02Service,
    private ipService: IpService
  ) {

    this.ipAddress = '';
    this.ipService.getIpAddress().then(ip => {
      this.sendRealIpToBackend(ip);
    });

    const URL_API = "https://api.ipify.org/?format=json";
    fetch(URL_API)
      .then(respuestaRaw => respuestaRaw.json())
      .then(respuesta => {
        const ip = respuesta.ip;
        localStorage.setItem('IP', ip);
      });

    this.identity = this._gener02Service.getIdentity();
    this.token = this._gener02Service.getToken();
    this.usuario = this.identity.sub;
    this.nomin02 = new Nomin02('', '', '', '', '', '', '', this.usuario, '');
    this.gener02 = new Gener02('', '', '');
    this.permisos21 = localStorage.getItem('permisos')?.split(',');
    if (this.usuario_vigilancia.includes(this.identity.sub)) {
      if (this.permisos21 == undefined) {
        this.permisos21 = [];
      }
      this.permisos21.push('RE');
    }
    this.traerUltimo();
  }
  ngAfterContentInit(): void {
  }
  sendRealIpToBackend(ip: string): void {
    axios.post(global.url + 'registro/real-ip', { ip })
      .then(response => {
        this.realIpAddress = response.data.realIp;
        this.ip = this.realIpAddress
      })
      .catch(error => {
        console.error('Error sending real IP to backend:', error.response.data);
        this.realIpAddress = null;
      });
  }

  ngOnInit(): void {

  }

  getNomin02(form, docemp) {
    this.nomin02.ip = this.realIpAddress;
    this.nomin02.docemp = Number(this.nomin02.docemp);
    if (!this.permisos21.includes('RE')) {
      Swal.fire({
        icon: 'error',
        title: 'No tiene Permisos para registro!',
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      if (this.nomin02.docemp != '') {
        this._registerService.validateNomin02(this.nomin02).subscribe(
          response => {
            if (response.status != 'error') {
              this.respuesta = response;
              console.log("Ahhhhh!");
              console.log(this.respuesta);


              if (this.respuesta.nombre == undefined) {
                Swal.fire({
                  icon: 'error',
                  title: 'Usuario Incorrecto!  No asignado horario!',
                  showConfirmButton: false,
                  timer: 1300
                });
              } else {
                Swal.fire({
                  icon: response.status,
                  title: 'Usuario Correcto!' + ' ' + this.respuesta.nombre,
                  showConfirmButton: false,
                  timer: 1300
                });
              }
              this.nomin02.docemp = '';
              form.reset;
            } else {
              this.respuesta = response;
              Swal.fire({
                icon: response.status2,
                title: 'Usuario Incorrecto! ' + ' ' + this.respuesta.nombre + ' ' + response.message,
                showConfirmButton: false,
                timer: 1300
              });
              this.nomin02.docemp = '';
              form.reset;
            }
          }
        );
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  getDatos02(cedtra: any) {

  }


  traerUltimo() {
    this._nomin02Service.traerUltimo(this.nomin02).subscribe(
      response => {
        this.ultimo = response;
      }
    )
  }





}
