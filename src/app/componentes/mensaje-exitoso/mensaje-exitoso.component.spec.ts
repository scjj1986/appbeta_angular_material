import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeExitosoComponent } from './mensaje-exitoso.component';

describe('MensajeExitosoComponent', () => {
  let component: MensajeExitosoComponent;
  let fixture: ComponentFixture<MensajeExitosoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeExitosoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeExitosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
