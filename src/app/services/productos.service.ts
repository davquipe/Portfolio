import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.intercafe';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise( ( resolve, reject ) => {

      this.http.get('https://angular-html-f368f.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    });

  }

  getProducto( id: string ) {

    return this.http.get(`https://angular-html-f368f.firebaseio.com/productos/${ id }.json`);

  }

  buscarProducto ( termino: string ) {


    if ( this.productos.length === 0 ) {
          // Cargar Productos
          this.cargarProductos().then( () => {
            // ejecutar despues de tener los Productos
            // Aplicar el Filtro
            this.filtrarProductos( termino );
          });
    } else {
      // Aplica el filtro
      this.filtrarProductos( termino );
    }



  }

  private filtrarProductos( termino: string ) {

    // console.log( this.productos );
    this.productosFiltrados = [];
    // no importa si es MAUSCULA O minuscula
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {
     // tituloLower puede ser cualquer nombre
      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productosFiltrados.push( prod );
      }

    });


  }

}
