import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//import {FormControl, Validators} from '@angular/forms';

import {CdkTableModule} from '@angular/cdk/table';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorIntl,//Paginador Español (Ojo)
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

//Ruta
import {enrutador} from "./app.routes";

//Paginador en español
import { paginadorEspanolIntl } from './utilidades/paginador-espanol';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { MensajeErrorComponent } from './componentes/mensaje-error/mensaje-error.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { UsuarioListadoComponent } from './componentes/usuario-listado/usuario-listado.component';
import { UsuarioFormularioComponent } from './componentes/usuario-formulario/usuario-formulario.component';
import { MensajeExitosoComponent } from './componentes/mensaje-exitoso/mensaje-exitoso.component';
import { PieDePaginaComponent } from './componentes/pie-de-pagina/pie-de-pagina.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { BarraPrincipalComponent } from './componentes/barra-principal/barra-principal.component';
import { RecuperarContrasenaComponent } from './componentes/recuperar-contrasena/recuperar-contrasena.component';
import { DepartamentoListadoComponent } from './componentes/departamento-listado/departamento-listado.component';
import { DepartamentoFormularioComponent } from './componentes/departamento-formulario/departamento-formulario.component';
import { CargoListadoComponent } from './componentes/cargo-listado/cargo-listado.component';
import { CargoFormularioComponent } from './componentes/cargo-formulario/cargo-formulario.component';
import { EmpleadoListadoComponent } from './componentes/empleado-listado/empleado-listado.component';
import { EmpleadoFormularioComponent } from './componentes/empleado-formulario/empleado-formulario.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MensajeErrorComponent,
    InicioComponent,
    CabeceraComponent,
    UsuarioListadoComponent,
    UsuarioFormularioComponent,
    MensajeExitosoComponent,
    PieDePaginaComponent,
    MenuComponent,
    BarraPrincipalComponent,
    RecuperarContrasenaComponent,
    DepartamentoListadoComponent,
    DepartamentoFormularioComponent,
    CargoListadoComponent,
    CargoFormularioComponent,
    EmpleadoListadoComponent,
    EmpleadoFormularioComponent
  ],
  imports: [
    BrowserModule,
    CdkTableModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    enrutador//Ruta (Ojo)
  ],
  entryComponents: [MensajeErrorComponent,MensajeExitosoComponent],//Compnentes de Mensajes de Alerta (Ojo)
  bootstrap: [AppComponent],

  //-----Paginador (Ojo)-----//
  providers: [
    { provide: MatPaginatorIntl, useValue: paginadorEspanolIntl() }
  ]
  //------------------------//

})
export class AppModule { }
