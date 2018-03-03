import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoListadoComponent } from './departamento-listado.component';

describe('DepartamentoListadoComponent', () => {
  let component: DepartamentoListadoComponent;
  let fixture: ComponentFixture<DepartamentoListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartamentoListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartamentoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
