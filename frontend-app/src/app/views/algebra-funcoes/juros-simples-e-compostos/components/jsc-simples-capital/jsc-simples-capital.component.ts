
import {tap, take} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ServicoJurosSimplesComposto } from './../../shared/juros-simples-e-compostos.service';
import { ResultadoViewModel } from '../../../../../shared/models/resultado';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ISimplesCapitalComand } from '../../shared/juros-simples-e-compostos.model';




@Component({
  templateUrl: './jsc-simples-capital.component.html',
  styleUrls: ['./jsc-simples-capital.component.scss']
})
export class JscSimplesCapitalComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    j: ['', Validators.required],
    i: ['', Validators.required],
    t: ['', Validators.required],
  });

  loading: boolean;
  resultados: ResultadoViewModel[];

  constructor(private fb: FormBuilder, private servico: ServicoJurosSimplesComposto) { }

  ngOnInit(): void {
    this.resultados = [];
  }

  onSubmit(): void {
    this.loading = true;
    const jurosSimplesComposto: ISimplesCapitalComand = this.form.value;

    this.servico.postSimplesCapital(jurosSimplesComposto).pipe(
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
