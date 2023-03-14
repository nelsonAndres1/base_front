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
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [RegisterService, Gener02Service, Nomin02Service, PermisosService]
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
  gener02:Gener02;
  permisos21:any = [];
  constructor(
    private _registerService: RegisterService,
    private _gener02Service: Gener02Service,
    private _nomin02Service: Nomin02Service,
    private host: ElementRef,
    private _permisoService: PermisosService
  ) {
    this.identity = this._gener02Service.getIdentity();
    this.token = this._gener02Service.getToken();
    this.usuario = this.identity.sub;
    this.nomin02 = new Nomin02('', '', '', '', '', '', '', this.usuario);
    this.gener02 = new Gener02('','','');

    if(this.identity == undefined){

    }else{
        this.gener02 = new Gener02(this.identity.sub,'','');
  
        this._permisoService.getPermisos(this.gener02).subscribe(
            response=>{
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

    this.traerUltimo();
  }
  ngAfterContentInit(): void {

  }

  ngOnInit(): void {

  }

  getNomin02(form, docemp) {
    this.nomin02.docemp = Number(this.nomin02.docemp);
    if(!this.permisos21.includes('RE')){
      Swal.fire({
        icon: 'error',
        title: 'No tiene Permisos para registro!',
        showConfirmButton: false,
        timer: 2000
      });
    }else{
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
