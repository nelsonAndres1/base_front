import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Horario } from '../models/horario';
import { HorariosService } from '../services/horarios.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css'],
  providers: [HorariosService]
})
export class HorariosComponent implements OnInit {

  horario: Horario;
  tipo_horario: any;
  data: any = [];
  constructor(private _horariosSetvice: HorariosService) {

    this._horariosSetvice.TipoHorario({}).subscribe(
      response => {
        this.tipo_horario = response;
      }
    )

    this._horariosSetvice.getConta28({}).subscribe(
      response =>{
        console.log("Dependencias!");
        console.log(response);
      }
    )


    this.horario = new Horario(0, '', '', '', '', '', '', '');

  }

  ngOnInit(): void {
  }

  getConta28(event){

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

}
