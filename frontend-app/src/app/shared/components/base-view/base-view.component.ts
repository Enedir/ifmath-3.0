import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-ifmath-ng-base-view',
  templateUrl: './base-view.component.html',
  styleUrls: ['./base-view.component.scss']
})
export class BaseViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.jQueryConfiguracaoSlideBar();
  }

  private jQueryConfiguracaoSlideBar(): void {
    $(document).ready(() => {
      $('[data-toggle="offcanvas"]').click(() => {
        $('.ifmath-view__row__offcanvas').toggleClass('active');
      });
    });
  }

}
