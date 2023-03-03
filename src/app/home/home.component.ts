import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Nomin02 } from '../models/nomin02';
import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Gener02Service } from '../services/gener02.service';
import { Nomin02Service } from '../services/nomin02.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [RegisterService, Gener02Service, Nomin02Service]
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
  ultimo: any =[];

  constructor(
    private _registerService: RegisterService,
    private _gener02Service: Gener02Service,
    private _nomin02Service: Nomin02Service,
    private host: ElementRef,
  ) {
    this.identity = this._gener02Service.getIdentity();
    this.token = this._gener02Service.getToken();
    this.usuario = this.identity.sub;
    this.nomin02 = new Nomin02('', '', '', '', '', '', '', this.usuario);

    this.traerUltimo();
  }
  ngAfterContentInit(): void {

  }

  ngOnInit(): void {

  }

  getNomin02(form, docemp) {
    this.nomin02.docemp = Number(this.nomin02.docemp);
    if (this.nomin02.docemp != '') {
      this._registerService.validateNomin02(this.nomin02).subscribe(
        response => {
          if (response.status != 'error') {
            this.respuesta = response;
            console.log("Ahhhhh!");
            console.log(this.respuesta);

            
            if(this.respuesta.nombre == undefined){
              Swal.fire({
                icon: 'error',
                title: 'Usuario Incorrecto!  No asignado horario!',
                showConfirmButton: false,
                timer: 1300
              });
            }else{
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
              icon: response.status,
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

  getDatos02(cedtra: any) {

  }


  traerUltimo(){
    this._nomin02Service.traerUltimo(this.nomin02).subscribe(
      response =>{
        this.ultimo = response;
      }
    )
  }

}
