import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExternoServicesService {

  constructor( public http: HttpClient) { }

  obtenerCP( cp: string ) {

    const url = 'https://api-codigos-postales.herokuapp.com/v2/codigo_postal/' + cp;

    return this.http.get(url);

  }

}
