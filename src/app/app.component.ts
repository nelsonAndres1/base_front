import { Component, OnInit, DoCheck } from '@angular/core';

import { Gener02Service } from './services/gener02.service';

import { Gener02 } from './models/gener02';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { identity } from 'rxjs';
import { RegisterService } from './services/register.service';
import { PermisosService } from './services/permisos.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [Gener02Service, RegisterService, PermisosService]
})

export class AppComponent implements OnInit,
    DoCheck {

    title = 'ControlPagos';
    public identity;
    public permis: any;
    public token;

    public status: any;
    public v: any = true;
    public usuario: any;
    public bandera: any = true;
    public arrayN: any = [];
    public permisos: any;
    itemDetail: any = [];
    arrayPermisos: any = [];
    bandera_registro: boolean;
    bandera_asignartipo_horario: boolean;
    bandera_asignartrabajador_horario: boolean;
    fecha: number = Date.now();
    hora: any;
    gener02: Gener02;
    permisos21: any = [];
    band1: number = 0;

    constructor(private _registerService: RegisterService, private route: ActivatedRoute, public _gener02Service: Gener02Service, private router: Router, private _permisoService: PermisosService) {
        this.identity = this._gener02Service.getIdentity();
        this.token = this._gener02Service.getToken();
        this.bandera_registro = false;
        this.bandera_asignartipo_horario = false;
        this.bandera_asignartrabajador_horario = false;
        console.log("Datos!!");
        console.log(this.identity);
        this.gener02 = new Gener02('', '', '');
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
                }
            )
        }
    }

    cerrarSesion() {
        var ratonParado;
        var milisegundosLimite = 2000;
        $(document).on('mousemove', function () {
            clearTimeout(ratonParado);

            ratonParado = setTimeout(function () {
                // aqui lanzarias la ventana
                console.log("si se activo!");
            }, milisegundosLimite);
        });
    }

    mostrarHora() {
        this.hora = new Date();

    }


    ngOnInit(): void {
        this.mostrarHora();

        setInterval(() => {
            this.hora = new Date();
        }, 1000)

    }

    inp() {
        this.router.navigate(['teso10'])
    }

    salir() {

        /*  Swal.fire({
             icon: 'warning',
             title: 'Salida',
             text: '¿Estas seguro de salir?',
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: 'Si!'
         }).then((result) => { */
        /*             if (result.isConfirmed) { */

        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        localStorage.removeItem('tpago');
        localStorage.removeItem('token1');
        localStorage.removeItem('tpa');
        localStorage.removeItem('identity2');
        localStorage.removeItem('identity1');
        localStorage.removeItem('permisos');
        localStorage.removeItem('tokenConsultado');
        localStorage.removeItem('tokenConsultado2');
        localStorage.removeItem('numero');

        this.permisos21 = [];
        this.identity = null;
        this.token = null;
        if (this.identity == null) {

            console.log(this.identity);
            this.router.navigate(['login']);
        }
        /*    }
       }); */




    }

    ngDoCheck(): void {
        this.loadUser();
        this.permisos = localStorage.getItem('permisos');
        if (this.permisos != null) {
            this.arrayPermisos = this.permisos.split(',');
        }
    }

    permisosPago() {
        var ban = false;
        for (let index = 0; index < this.arrayPermisos.length; index++) {
            if (this.arrayPermisos[index] == 'AD' || this.arrayPermisos[index] == 'RA') {
                ban = true;
                break;
            }
        }
        return ban;
    }

    permisosNuevoPago() {
        var bandera = false;
        for (let index = 0; index < this.arrayPermisos.length; index++) {
            if (this.arrayPermisos[index] == 'AD') {
                bandera = true;
                break;
            }
        }
        return bandera;
    }


    loadUser() {
        this.identity = this._gener02Service.getIdentity();
        this.token = this._gener02Service.getToken();
    }
}
