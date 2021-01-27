
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespostaJson } from '../../../../core/modelos/resposta-json';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import {IRDTDiretamentePorporcionalComand
} from './rdt.model';


import { environment } from '../../../../../environments/environment';

@Injectable()
export class ServicoRdt {

  private data: Observable<RespostaJson>;
  private httpHeaders: HttpHeaders;
  private baseUrl: string;

  constructor(public http: HttpClient) {
      this.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
      this.baseUrl = environment.url;

  }

   public postRDTDiretamentePorporcional(rdt: IRDTDiretamentePorporcionalComand): Observable<RespostaJson> {
    const url = this.baseUrl + 'api/regra_de_tres/diretamente_proporcional';
    const body = JSON.stringify(rdt);

    const options = {
        headers: this.httpHeaders
    };

    return this.http.post<RespostaJson>(url, body, options).pipe(map((response: RespostaJson) => response));
   }

   public postRDTInversamentePorporcional(rdt: IRDTDiretamentePorporcionalComand): Observable<RespostaJson> {
    const url = this.baseUrl + 'api/regra_de_tres/inversamente_proporcional';
    const body = JSON.stringify(rdt);

    const options = {
        headers: this.httpHeaders
    };

    return this.http.post<RespostaJson>(url, body, options).pipe(map((response: RespostaJson) => response));
   }
}
