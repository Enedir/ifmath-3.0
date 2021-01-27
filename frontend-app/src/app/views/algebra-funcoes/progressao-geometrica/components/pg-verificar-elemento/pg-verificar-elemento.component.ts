
import {tap, take} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ResultadoViewModel } from '../../../../../shared/models/resultado';
import { ServicoProgressaoGeometrica } from '../../shared/progressao-geometrica.service';
import { IPGVerificarElementoComand } from './../../shared/progressao-geometrica.model';




@Component({
  templateUrl: './pg-verificar-elemento.component.html',
  styleUrls: ['./pg-verificar-elemento.component.scss']
})
export class PgVerificarElementoComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    an: ['', Validators.required],
    q: ['', Validators.required],
    a1: ['', Validators.required],
    n: ['', Validators.required]
  });

  loading: boolean;
  resultados: ResultadoViewModel[];

  constructor(private fb: FormBuilder, private servico: ServicoProgressaoGeometrica) { }

  ngOnInit(): void {
    this.resultados = [];
  }

  onSubmit(): void {
    this.loading = true;
    const progressaoGeometrica: IPGVerificarElementoComand = this.form.value;

    this.servico.postVerificarElemento(progressaoGeometrica).pipe(
      take(1),
      tap(() => { this.loading = false; }), )
      .subscribe((response) => {
        if (response.sucesso) {
          this.resultados = ( response.objeto as ResultadoViewModel[]);
        }

        this.loading = false;
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred.
          console.log('An error occurred:', err.error.message);
        } else {
          // Backend returns unsuccessful response codes such as 404, 500 etc.
          console.log('Backend returned status code: ', err.status);
          console.log('Response body:', err.error);
          // Log errors if any
          this.loading = false;
        }
      });
  }

}
