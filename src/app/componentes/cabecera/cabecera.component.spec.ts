import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraComponent } from './cabecera.component';

describe('CabeceraComponent', () => {
  let component: Component;
  let fixture: ComponentFixture<CabeceraComponent
>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabeceraComponent
 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraComponent
);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});