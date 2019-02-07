import { Component, ViewChild } from '@angular/core';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'test01';
  gente: Array<any> = [{
    nombre: 'Jaime',
    edad: 30,
  },
  {
    nombre: 'Guadalupe',
    edad: 25
  },
  {
    nombre: 'Jacobo',
    edad: 35
  },
  {
    nombre: 'Ruben',
    edad: 31
  }
  ];
  persona: Object = 'Soy otra persona';

  constructor() {
  }
  @ViewChild('lista') lista;
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    console.log(this.lista);
  }
  borramiento() {
    this.gente = [];
  }

}
