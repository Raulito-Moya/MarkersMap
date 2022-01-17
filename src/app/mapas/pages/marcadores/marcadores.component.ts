import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [

    `
    .mapa-container {
      height: 100%;
      width: 100%;
    }
   
    .list-group{
      position: fixed;
      top:20px;
      right: 20px;
      z-index: 99;
    }

    li{
      cursor:pointer
    }

    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {
  

  @ViewChild('mapa') divMapa!: ElementRef
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10
  center: [number, number] = [ -87.90159415011993, 30.52227095520899 ]

//Arreglo e marcadores
marcadores: MarcadorColor[] = []

  constructor() { }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.leerLocalStorage()
const markerHtml: HTMLElement = document.createElement('div')
 // markerHtml.innerHTML = " hola Mundo"

     new mapboxgl.Marker({
       element: markerHtml
     })
     .setLngLat( this.center)
     .addTo(this.mapa)

  }


  agregarMarcador(){
    
    
const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
    .setLngLat(this.center)
    .addTo( this.mapa )

    this.marcadores.push( {
       color,
       marker: nuevoMarcador
    })

    this.guardarMarcadoresLocalStorage()


   nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage()

    })
  }

  irMarcador(marker:any){
   
     this.mapa.flyTo({
       center: marker.getLngLat()
     })
  }

  guardarMarcadoresLocalStorage(){
     
    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach( m => {

      const color = m.color;
      const {lng, lat } = m.marker!.getLngLat();
       
      lngLatArr.push({
        color:color,
        centro: [lng, lat ]
      })

    })

    localStorage.setItem('marcadores',JSON.stringify( lngLatArr))

  }

  leerLocalStorage(){
    
    if( !localStorage.getItem('marcadores')){
       return
    }

    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!); 

    lngLatArr.forEach(m => {
     
      const newmarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
       .setLngLat(m.centro!)
       .addTo( this.mapa)
   
       this.marcadores.push({
         marker: newmarker,
         color: m.color 
       })

       newmarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage()
  
      })
     
    })

  }

  borrarMarcador( i: number){

    this.marcadores[i].marker?.remove()
    this.marcadores.splice(i,1)

    this.guardarMarcadoresLocalStorage()


  }
}