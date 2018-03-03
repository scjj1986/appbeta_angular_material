import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoFormularioComponent } from './empleado-formulario.component';

describe('EmpleadoFormularioComponent', () => {
  let component: EmpleadoFormularioComponent;
  let fixture: ComponentFixture<EmpleadoFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
