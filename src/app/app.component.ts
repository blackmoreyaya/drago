import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Agremiado } from './models/agremiado.model';
import { ExternoServicesService } from './services/externo-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'drago';

  // tslint:disable-next-line:variable-name
  constructor( public _externoService: ExternoServicesService ) {}

  forma: FormGroup;

  ngOnInit() {

    this.forma = new FormGroup({
      nombre: new FormControl(),
      personal: new FormGroup({
        rfc: new FormControl(),
        curp: new FormControl(),
        sexo: new FormControl(),
        estadoCivil: new FormControl(),
        estudios: new FormControl()
      }),
      direccion: new FormGroup({
        calle: new FormControl(),
        numeroExt: new FormControl(),
        numeroInterior: new FormControl(),
        referencia: new FormControl(),
        colonia: new FormControl(),
        municipio: new FormControl(null, Validators.required),
        estado: new FormControl(null, Validators.required),
        cp: new FormControl(),
        seccionElectoral: new FormControl()
      })
    });

    console.log(this.forma);

  }

  buscarCP(cp: string) {

    if (cp.length < 5) {
      return;
    }

    if (!/^([0-9])*$/.test(cp)) {
      return;
    }

    // console.log(cp);
    this._externoService.obtenerCP(cp).subscribe((resp: any) => {
      // console.log(resp);
      if (resp.estado === '') {
        console.log('No existe ese cp');
      }

      this.forma.patchValue({
        direccion: {
          municipio: resp.municipio,
          estado: resp.estado
        }
      });
      /******************************************/
      // NO LOGRO DESPLEGAR LAS COLONIAS EN LAS OPCIONES DEL SELECT
      /******************************************/
    });
  }

  registrarAgremiado() {

    console.log('botno submit');
    const agremiado = new Agremiado(
      this.forma.value.nombre,
      this.forma.value.personal,
      this.forma.value.direccion
    );
    console.log(agremiado);
    console.log('/////////////////');
    console.log(this.forma);

  }
}
