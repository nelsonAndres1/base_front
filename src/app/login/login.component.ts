import { Component, OnInit } from '@angular/core';
import { Gener02 } from '../models/gener02';
import { Gener02Service } from '../services/gener02.service';
import { Nomin02 } from '../models/nomin02';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import Swal from 'sweetalert2';
import { iif } from 'rxjs';
import { PermisosService } from '../services/permisos.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [Gener02Service, PermisosService]
})
export class LoginComponent implements OnInit {
  public gener02: Gener02;
  public status: any;
  public token: any;
  public identity: any;
  public v: any = true;
  public arrayN: any = [];
  public bandera: any;
  permisos21: any = [];

  constructor(
    private _gener02Service: Gener02Service,
    private _router: Router,
    private _route: ActivatedRoute,
    private _permisoService: PermisosService
  ) {
    this.gener02 = new Gener02('', '', '');
  }

  ngOnInit(): void {
  }
  olvidoC() {
    Swal.fire('¿Olvido la Contraseña?', 'Por favor comunicarse con la oficina de Sistemas e Informatica.', 'question');
  }

  permisos(ident) {

    if (ident == undefined) {

    } else {
      this.gener02 = new Gener02(ident, '', '');
      this._permisoService.getPermisos(this.gener02).subscribe(
        response => {
          console.log("response!");
          console.log(response);
          for (let index = 0; index < response.length; index++) {
            console.log(response[index].permiso);
            this.permisos21.push(response[index].permiso);
          }
          localStorage.setItem('permisos', this.permisos21);
          console.log("permisos!!!!!!");
          console.log(this.permisos21);
        }
      )
    }

  }

  onSubmit(form: any) {
    let permisos;
    this._gener02Service.signup(this.gener02).subscribe(
      response => {
        //devuelve el token 
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;
          //objeto usuario identificado
          this._gener02Service.signup(this.gener02, this.v).subscribe(
            response => {
              console.log(response);
              Swal.fire({
                title: '¡Bienvenido ' + response.name + ' !',
                text: 'Control de Ingreso - Comfamiliar de Nariño ' + response.sede,
                imageUrl: './assets/logo2.png',
                imageAlt: 'Custom image',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok!'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.identity = response;
                  this.token
                  this.identity;
                  this.permisos(this.identity.sub);
                  localStorage.setItem('token', this.token);
                  localStorage.setItem('identity', JSON.stringify(this.identity));
                  this._router.navigate(['home']);
                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                }
              });
            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );
        } else {
          Swal.fire(
            '¡Usuario o Contraseña Incorrectos!',
            'Vuelva a ingresar sus datos',
            'error'
          )
          form.reset();
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );

  }
  logout() {

    Swal.fire({
      title: 'Salida',
      text: '¿Estas seguro de salir?',
      imageUrl: './assets/logo2.png',
      imageAlt: 'Custom image',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {

        this._route.params.subscribe(
          params => {
            let logout = +params['sure'];
            if (logout == 1) {
              localStorage.removeItem('identity');
              localStorage.removeItem('token');
              localStorage.removeItem('tpago');
              localStorage.removeItem('token1');
              localStorage.removeItem('tpa');
              localStorage.removeItem('identity2');
              localStorage.removeItem('identity1');
              localStorage.removeItem('permisos');
              localStorage.removeItem('tokenConsultado3');
              this.identity = '';
              this.token = null;
              if (this.identity == '') {
                this._router.navigate(['login']);
              }
            }
          }
        );
      }
    });


  }

}
