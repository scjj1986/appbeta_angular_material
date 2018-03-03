import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoFormularioComponent } from './cargo-formulario.component';

describe('CargoFormularioComponent', () => {
  let component: CargoFormularioComponent;
  let fixture: ComponentFixture<CargoFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
