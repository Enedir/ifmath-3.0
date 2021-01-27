
import {take} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ResultadoViewModel } from '../../../../../shared/models/resultado';
import { ServicoFuncoes } from '../../shared/funcoes.service';
import { IFUNEncontrarFuncaoComand } from '../../shared/funcoes.model';




@Component({
  templateUrl: './fun-encontrar-funcao.component.html',
  styleUrls: ['./fun-encontrar-funcao.component.scss']
})
export class FunEncontrarFuncaoComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    x: ['', Validators.required],
    x2: ['', Validators.required],
    y: ['', Validators.required],
    y2: ['', Validators.required],
  });

  loading: boolean;
  resultados: ResultadoViewModel[];


  constructor(private fb: FormBuilder, private servico: ServicoFuncoes) { }

  ngOnInit(): void {
    this.resultados = [];
  }

  onSubmit(): void {
    this.loading = true;
    const funcoes: IFUNEncontrarFuncaoComand = this.form.value;

    this.servico.postFUNEncontrarFuncao(funcoes).pipe(
    take(1))
    // .do({this.loading = false;})
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
