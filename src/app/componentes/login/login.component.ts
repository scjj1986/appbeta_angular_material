import { Component} from '@angular/core';

//------------------ Mensaje de Alerta ------------------//
import { MatDialog, MatDialogRef } from '@angular/material';
//-------------------------------------------------------//

//------------------- Componente (Mensaje de Alerta) ---------------------------//
import { MensajeErrorComponent } from '../mensaje-error/mensaje-error.component';
//------------------------------------------------------------------------------//


//------------ Ruta (Navegación) -----------//
import {Router} from '@angular/router';
//------------------------------------------//

//-----------Modelos (Clases)--------------//
import {login} from '../../clases/login';
import {mensaje} from '../../clases/mensaje';
//-----------------------------------------//

//------ Constantes y Funciones -----//
import {rutaPhpLogin} from '../../utilidades/constantes';
import {cargarLocalStorages,logueado,formularioDatos,bloquearBotonPrimario} from '../../utilidades/funciones';
//---------------------------------------//

//------------------------ Servicio -------------------------------//
import {BaseDatosService} from '../../servicios/base-datos.service';
//-----------------------------------------------------------------//

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [BaseDatosService]
})

export class LoginComponent {

  public _login: login = new login("","");
  public _mensaje: mensaje;
  mensajeError: MatDialogRef<MensajeErrorComponent>;
  ruta: Router;
  public baseDatosService:BaseDatosService;

 constructor(public mensaje: MatDialog,public _ruta: Router, public _BaseDatosService:BaseDatosService) {
	 this.ruta = _ruta;
   this.baseDatosService=_BaseDatosService;
 }

 ngOnInit(){
 	if (logueado())
 		this.ruta.navigate(['/inicio']);
 }


 autenticar(){
  this.baseDatosService.consulta(formularioDatos(this._login),rutaPhpLogin,"login_autenticar").subscribe(data => {

        if(data[0].estatusConsulta===1){
          cargarLocalStorages(data[0].nombre,data[0].usuario,data[0].perfil);
          this.ruta.navigate(['/inicio']);
          return;
        }
        else if(data[0].estatusConsulta===-1)
          this._mensaje = new mensaje("ERROR","*Usuario y/o Contraseña incorrectos");
        else if(data[0].estatusConsulta===-2)
          this._mensaje = new mensaje("ERROR","*Usuario inactivo");

        this.mensajeError = this.mensaje.open(MensajeErrorComponent,{
          width:'40%',
          data: this._mensaje
        });
    }, (error) => {
      console.log('Error : ',error);
    });
 }

 redirigirRecuperarContrasena(){
  this.ruta.navigate(['/recuperarContrasena']);
 }


 bloquearBotonAcceder(){
 	return bloquearBotonPrimario(this._login);
 }

}


