
import {tap, take} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ResultadoViewModel } from '../../../../../shared/models/resultado';
import { ServicoProgressaoAritmetica } from '../../shared/progressao-aritmetica.service';
import { ITermoGeralComand } from './../../shared/progressao-aritmetica.model';




@Component({
  templateUrl: './pa-termogeral.component.html',
  styleUrls: ['./pa-termogeral.component.scss']
})
export class PaTermogeralComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    a1: ['', Validators.required],
    n: ['', Validators.required],
    r: ['', Validators.required],
  });

  loading: boolean;
  resultados: ResultadoViewModel[];

  constructor(private fb: FormBuilder, private servico: ServicoProgressaoAritmetica) { }

  ngOnInit(): void {
    this.resultados = [];
  }

  onSubmit(): void {
    this.loading = true;
    const progressaoAritmetica: ITermoGeralComand = this.form.value;

    this.servico.postTermoGeral(progressaoAritmetica).pipe(
      take(1),
      tap(() => { this.loading = false; }), )
      .subscribe((response) => {
        if (response.sucesso) {
          this.resultados = (response.objeto as ResultadoViewModel[]);
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
