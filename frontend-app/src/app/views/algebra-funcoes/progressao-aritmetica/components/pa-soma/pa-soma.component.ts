
import {tap, take} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { ResultadoViewModel } from '../../../../../shared/models/resultado';
import { ServicoProgressaoAritmetica } from './../../shared/progressao-aritmetica.service';
import { ISomaComand } from './../../shared/progressao-aritmetica.model';




@Component({
  templateUrl: './pa-soma.component.html',
  styleUrls: ['./pa-soma.component.scss']
})
export class PaSomaComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    a1: ['', Validators.required],
    an: ['', Validators.required],
    n: ['', Validators.required],
  });

  loading: boolean;
  resultados: ResultadoViewModel[];

  constructor(private fb: FormBuilder, private servico: ServicoProgressaoAritmetica) { }

  ngOnInit(): void {
    this.resultados = [];
  }

  onSubmit(): void {
    this.loading = true;
    const progressaoAritmetica: ISomaComand = this.form.value;

    this.servico.postSoma(progressaoAritmetica).pipe(
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
