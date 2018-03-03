import { Component } from '@angular/core';

//Ruta
import { Router, ActivatedRoute } from '@angular/router';

//Constantes y Funciones 
import {rutaPhpDepartamento,rutaPhpCargo,letras} from '../../utilidades/constantes';
import {logueado,bloquearBotonPrimario,validarEntradaCampos,formularioDatos,filtrarArreglo,
        busquedaValorEnArreglo,obtenerItemArreglo,obtenerValorItemArreglo,validarEntradaDecimales,
        validarValorDecimal,corregirDecimal,cargarDatosEnObjeto} from '../../utilidades/funciones';

//Modelos
import {cargo} from '../../clases/cargo';
import {mensaje} from '../../clases/mensaje';

//Servicio
import {BaseDatosService} from '../../servicios/base-datos.service';

//Componentes (Mensajes de Alerta)
import { MensajeErrorComponent } from '../mensaje-error/mensaje-error.component';
import { MensajeExitosoComponent } from '../mensaje-exitoso/mensaje-exitoso.component';

//Mensaje de Alerta
import { MatDialog, MatDialogRef } from '@angular/material';

//Autocompletar en campo de texto-----------------//
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
//-----------------------------------------------//

@Component({
  selector: 'app-cargo-formulario',
  templateUrl: './cargo-formulario.component.html',
  styleUrls: ['./cargo-formulario.component.css'],
  providers: [BaseDatosService]
})
export class CargoFormularioComponent{

  public titulo: string = "AGREGAR CARGO";
  public logo:string = "add_circle_outline";
  public _cargo: cargo = new cargo();
  public ruta: Router;
  public baseDatosService:BaseDatosService;
  public _mensaje: mensaje;
  mensajeError: MatDialogRef<MensajeErrorComponent>;
  mensajeExitoso: MatDialogRef<MensajeExitosoComponent>;


  public mostrarErrorNombreDepto: boolean = false;

  //Atributos para el autocompletado en campo de texto------------------------------------//
  public controlNombreDepto: FormControl= new FormControl();
  public filtroNombreDepto: Observable<any[]>;
  public _arrDepto: any[];//Arreglo de todos los elementos que se aplicará el filtrado
  //-------------------------------------------------------------------------------------//

  constructor(public mensaje: MatDialog,private rutaActivada: ActivatedRoute,private _ruta: Router,public _BaseDatosService:BaseDatosService){
    	this.ruta=_ruta;
      this.baseDatosService=_BaseDatosService;
      this.cargarListadoDepartamento();
   }

   //Métodos para gestionar el autocompletado---------------------------------------------------------//
   cargarListadoDepartamento(){
      this.baseDatosService.consulta(null,rutaPhpDepartamento,"departamento_listado").subscribe(respuesta => {
          this._arrDepto= respuesta;
          this.autocompletar();
        }, (error) => {
        });
   }

   autocompletar(){
    this.controlNombreDepto = new FormControl();
    this.filtroNombreDepto = this.controlNombreDepto.valueChanges
          .pipe(
            startWith(''),
            map(valor => valor ? filtrarArreglo(this._arrDepto,"nombre",this._cargo.depto) : this._arrDepto.slice())
          );

  }
   //------------------------------------------------------------------------------------------------//

  buscarNombreDepto(){
      this.mostrarErrorNombreDepto = !(busquedaValorEnArreglo(this._arrDepto,"nombre",this._cargo.depto));
  }

  ngOnInit() {
  		var id=-1;
        this.rutaActivada.params.subscribe(params => {
              id=params['id'];
        });
        if (!logueado())
        	this.ruta.navigate(['/login']);
        if (isNaN(id))
               this.volverListado();
        else if (id==-1)
            this.generarCodigo();
        else if (id!=-1){
          let parametros=new FormData();
          parametros.append('id',id.toString());
          this.baseDatosService.consulta(parametros,rutaPhpCargo,"cargo_buscarPorId").subscribe(data => {
                if(data[0].id!=-1){
                  this._cargo = cargarDatosEnObjeto(this._cargo,data[0]);
                  this.titulo="EDITAR CARGO";
                  this.logo="create";
                }
                else
                  this.volverListado();

            }, (error) => {
              console.log('Error : ',error);
            });
        }
  }

  generarCodigo(){
  	this.baseDatosService.consulta(null,rutaPhpCargo,"cargo_generarCodigo").subscribe(data => {
                  this._cargo.codigo=data[0].codigo;
            }, (error) => {
              console.log('Error : ',error);
            });
  }

  validarLetras(evento){
       return validarEntradaCampos(evento,letras);
  }

  _validarDecimales(evento){
    return validarEntradaDecimales(evento);
  }

  bloquearBotonGuardar(){
      this._cargo.id_depto=obtenerValorItemArreglo(this._arrDepto,"id","nombre",this._cargo.depto);
    	return (bloquearBotonPrimario(this._cargo) || this._cargo.sueldo==='.'  ||  !(validarValorDecimal(this._cargo.sueldo)) );
  }

  volverListado(){
     	this.ruta.navigate(['/cargoListado']);
  }

  agregarEditar(){
      this._cargo.sueldo=corregirDecimal(this._cargo.sueldo);
      this.baseDatosService.consulta(formularioDatos(this._cargo),rutaPhpCargo,"cargo_agregarEditar").subscribe(data => {
            
            if(data[0].estatusConsulta===1){
              this.mensajeExitoso = this.mensaje.open(MensajeExitosoComponent,{
                width:'40%'
              });

              this.mensajeExitoso.afterClosed().subscribe(result => {
                this.volverListado();
              });
              return;
            }
            else if(data[0].estatusConsulta===-1)
              this._mensaje = new mensaje("REDUNDANCIA DE DATOS","*El Nombre debe ser irrepetible");

            this.mensajeError = this.mensaje.open(MensajeErrorComponent,{
              width:'40%',
              data: this._mensaje
            });
            
        }, (error) => {
          console.log('Error : ',error);
        });
     }

}
