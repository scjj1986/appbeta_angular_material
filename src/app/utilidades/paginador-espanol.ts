import { MatPaginatorIntl } from '@angular/material';

/*
page:pagina
pageSize:tamanoPagina
length:longitud;
startIndex:indiceInicial
endIndex:indiceFinal

*/

const rangoEspanol = (pagina: number, tamanoPagina: number, longitud: number) => {
  if (longitud == 0 || tamanoPagina == 0)
    return `0 de ${longitud}`;
  
  longitud = Math.max(longitud, 0);

  const indiceInicial = pagina * tamanoPagina;

  const indiceFinal = indiceInicial < longitud ?
      Math.min(indiceInicial + tamanoPagina, longitud) :
      indiceInicial + tamanoPagina;

  return `${indiceInicial + 1} - ${indiceFinal} de ${longitud}`;
}


export function paginadorEspanolIntl() {
  const paginadorIntl = new MatPaginatorIntl();
  paginadorIntl.itemsPerPageLabel = 'Elementos por página:';
  paginadorIntl.nextPageLabel = 'Siguiente';
  paginadorIntl.previousPageLabel = 'Anterior';
  paginadorIntl.getRangeLabel = rangoEspanol;
  return paginadorIntl;
}