import { Component, OnInit } from '@angular/core';

interface MenuItem {
  ruta: string;
  nombre: string
}



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
     
    li {
      cursor: pointer
    }

    `
  ]
})

export class MenuComponent  {

 menuItems: MenuItem[] = [
    {
      ruta: '/maps/fullscreen',
      nombre: 'FullScreen'
    },
    {
      ruta: '/maps/zoom-range',
      nombre:'Zoom Range'

    },
    {
      ruta: '/maps/markers',
      nombre:'Markers'

    },
    {
      ruta: '/maps/properties',
      nombre:'Properties'

    },
 ]

}
