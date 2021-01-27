
import {tap, take} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ICriarSequenciaComand } from './../../shared/progressao-aritmetica.model';
import { ServicoProgressaoAritmetica } from './../../shared/progressao-aritmetica.service';
import { ResultadoViewModel } from '../../../../../shared/models/resultado';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';




@Component({
  templateUrl: './pa-criar-sequencia.component.html',
  styleUrls: ['./pa-criar-sequencia.component.scss']
})
export class PaCriarSequenciaComponent implements OnInit {

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
    const progressaoAritmetica: ICriarSequenciaComand = this.form.value;

    this.servico.postCriarSequencia(progressaoAritmetica).pipe(
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
