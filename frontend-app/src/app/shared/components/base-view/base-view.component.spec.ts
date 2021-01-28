import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BaseViewComponent } from './base-view.component';

describe('BaseViewComponent', () => {
  let component: BaseViewComponent;
  let fixture: ComponentFixture<BaseViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
