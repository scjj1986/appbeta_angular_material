import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoFormularioComponent } from './departamento-formulario.component';

describe('DepartamentoFormularioComponent', () => {
  let component: DepartamentoFormularioComponent;
  let fixture: ComponentFixture<DepartamentoFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartamentoFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartamentoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
