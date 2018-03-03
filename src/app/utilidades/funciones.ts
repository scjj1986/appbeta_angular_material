import {MatTableDataSource,MatTableModule} from '@angular/material';

//------------- Validadores y corrector en entrada de campos de texto --------------------//
export function validarEntradaCampos(evento,tipo) {
			  var k; 
			  k=document.all?parseInt(evento.keyCode): parseInt(evento.which); 
			  return (tipo.indexOf(String.fromCharCode(k))!=-1); 
}

export function validarEntradaDecimales(evento){
	evento = evento || window.event;
    var caracterAscii = evento.keyCode || evento.which;
    var primero = (caracterAscii <= 57 && caracterAscii >= 48);
    var elemento = evento.srcElement || evento.target;
    return primero || (elemento.value.indexOf('.') == -1 ? caracterAscii == 46 : false);
}

export function validarValorDecimal(valor){
	return ( parseFloat(valor)===NaN || parseFloat(valor)===0 ? false : true);
	
}

//Función que corrige valores decimales, ej: 10. lo convierte en 10
export function corregirDecimal(valor){
	return parseFloat(valor).toString();
}

export function validarFormatoLogin(valor){
	let patron = /^[\w\.\_\-]+$/;
	return (patron.test(valor));
}
//----------------------------------------------------------------------------------------//


//Filtrado en tablas de listados
export function filtrarTabla(valor: string,tabla :MatTableDataSource<Object>) {
    valor = valor.trim();
    valor = valor.toLowerCase();
    tabla.filter = valor;
 }

export function minuscula(valor){
	return valor.toLowerCase();
}

export function mayuscula(valor){
	return valor.toUpperCase();
}

export function logueado(){
	return !(localStorage.getItem("Usuario")===null);
}


//-------------------- Gestión de localStorages --------------//
export function cargarLocalStorages(nombre,login,perfil){
	localStorage.setItem("Nombre",nombre);
	localStorage.setItem("Usuario",login);
	localStorage.setItem("Perfil",perfil);
}

export function removerLocalStorages(){
	 localStorage.removeItem("Nombre");
	 localStorage.removeItem("Usuario");
	 localStorage.removeItem("Perfil");
}
//--------------------------------------------------------------//

//Carga de un FormData desde un objeto (modelo o clase) para ser enviado al backend
export function formularioDatos(objeto){
   let datos = new FormData();
	for (var item in objeto)
		datos.append(item,objeto[item].toString());
	return datos;
}

//Carga de datos (arreglo de datos) al objeto (modelo o clase), el cual está vinculado a los campos de texto de un formulario específico
export function cargarDatosEnObjeto(objeto,data){
   for (var item in objeto)
   		objeto[item]=data[item];
	return objeto;
}

export function bloquearBotonPrimario(formulario){
	for (var item in formulario){
		if (formulario[item]==="")
			return true;
	}
	return false;
}


//Autocompletados en campo de texto
export function filtrarArreglo(arreglo:any[],campo: string,valor: string) {
    return arreglo.filter(filtro =>
      filtro[campo].toLowerCase().indexOf(valor.toLowerCase()) === 0);
 }



//-------------------- Gestores de Búsqueda en arreglo de datos por campo y valor -----------//

//Obtiene la posición de un arreglo de datos, buscando por campo y valor
 export function obtenerItemArreglo(arreglo:any[],campoABuscar: string,valor: string): any[]{
 	if (arreglo===undefined)
 		return arreglo;
 	return arreglo.find(i => i[campoABuscar] === valor.toUpperCase());
 }

//Devuelve el id de la búsqueda del arreglo de datos
 export function obtenerValorItemArreglo(arreglo:any[],campo: string,campoABuscar: string,valor: string){
 	let resultado = obtenerItemArreglo(arreglo,campoABuscar,valor);
 	return (resultado===undefined? "" : resultado[campo].toString());
 }

//Devuelve el resultado de la búsqueda del arreglo de datos (booleano)
 export function busquedaValorEnArreglo(arreglo:any[],campo: string,valor: string){
    return (obtenerItemArreglo(arreglo,campo,valor)==undefined && !(valor===""))? false: true;
 }

 //---------------------------------------------------------------------------------------------//



 export function fechaActualFormatoAaaaMmDd (){
 	var fecha = new Date();
 	var mm = fecha.getMonth() + 1;
  	var dd = fecha.getDate();
    return [fecha.getFullYear(),(mm>9 ? '' : '0') + mm,(dd>9 ? '' : '0') + dd].join('-');
 }