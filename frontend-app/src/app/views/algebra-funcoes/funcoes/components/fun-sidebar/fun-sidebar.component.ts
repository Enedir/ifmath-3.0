import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ifmath-fun-sidebar',
  templateUrl: './fun-sidebar.component.html'
})
export class FunSidebarComponent implements OnInit {

  public isSelected: string;

  constructor() { }

  ngOnInit(): void {
    this.isSelected = 'd';
  }

  public redirectTo(index: string): void {
    this.isSelected = index;
  }

}
