import {CUSTOM_ELEMENTS_SCHEMA, Component, inject, OnInit, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonGrid, IonRow, IonIcon,IonButton, IonPopover, IonImg, IonAccordionGroup ,IonAccordion, IonInput, IonLabel  } from '@ionic/angular/standalone';
import { PrevisionesService } from '../../services/previsiones.service';
import { IAlumbrado } from '../../models/ialumbrado';
import { IAscensor } from '../../models/iascensor';
import { IGarage } from '../../models/igarage';
import { IGMotor } from '../../models/igmotor';
import { ILocal } from '../../models/ilocal';

import { ModalViviendasComponent } from './modal-viviendas/modal-viviendas.component';
import { ModalGaragesComponent } from './modal-garages/modal-garages.component';
import { ModalLocalesComponent } from './modal-locales/modal-locales.component';
import { ModalServGeneralesComponent } from './modal-serv-generales/modal-serv-generales.component';
import { ModalController ,  IonActionSheet  } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alarm, logoIonic, trash, helpOutline, heart, add } from 'ionicons/icons';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-previsiones',
  templateUrl: './previsiones.page.html',
  styleUrls: ['./previsiones.page.scss'],
  standalone: true,
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [IonRow, IonGrid, IonItem, IonGrid, IonRow, IonIcon, IonContent,
    IonHeader, IonTitle, IonToolbar, FormsModule, CommonModule, IonButton,IonPopover,IonImg,IonAccordionGroup , IonAccordion, IonLabel ]
})

export class PrevisionesPage  implements OnInit  {
  previsionesService = inject(PrevisionesService);
  utilService = inject(UtilsService);
  //popoverController = inject(PopoverController );
  ngOnInit (){}

  calculaPotLocal(){
    console.log('toi en previ')
  }

  agregarIrve() {
     // no es necesario, las irves se incluyen en las viviendas, el irve ha de ir asociado a un contador.
    this.agregarVivienda() ;

  }


 /* Funcion agregar servicios generales */
  async agregarServGrales() {
    const modal = await this.modalCtrl.create({
      component: ModalServGeneralesComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.previsionesService.agregraServiciosGenerales(data);

      this.actualizaResultados();
      //console.log('agregados servicios generales ', this.previsionActual);


    }
    this.actualizaResultados();
  }

  /* Funcion agregar vivienda */

  async agregarVivienda() {
    const modal = await this.modalCtrl.create({
      component: ModalViviendasComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.previsionesService.agregraVivienda(data);

      this.actualizaResultados();
      console.log('agregada vivienda: ', this.previsionesService.prevision);


    }
  }
  /* Funcion agregar garage */
  async agregarGarage() {
    const modal = await this.modalCtrl.create({
      component: ModalGaragesComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      //this.previsionesService.agregarGarage(data);

      //this.actualizaResultados();
      console.log('agregado garage: ', this.previsionesService.prevision);


    }
    this.actualizaResultados();

  }

  async agregarLocales() {
    const modal = await this.modalCtrl.create({
      component: ModalLocalesComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      //this.previsionesService.agregrarLocales(data);

      this.actualizaResultados();
      //console.log('agregados servicios generales ', this.previsionActual);


    }
    this.actualizaResultados();
  }
  //Elimina la vivienda
  eliminaVivienda(ev: any) {
    this.previsionesService.eliminaVivienda(ev.id);
    console.log("eliminando vivienda ID : ", JSON.stringify(ev));
    let listaVivTemp = this.previsionesService.eliminaVivienda(ev.id);
    //this.previsionesService.listaViviendas.update(listaVivTemp);
    //this.listaIrve$ = this.previsionesService.obtenListaIrve();
    //this.prevision$ = this.previsionesService.calculaPT();

    this.actualizaResultados();

  }
  //Elimina ascensor y actualiza datos
  eliminaAscensor(ascElement: IAscensor){
    this.previsionesService.eliminaAscensor(ascElement);
    this.actualizaResultados();
  }
  //Elimina grupo motor
  eliminaGrupoMotor(gmElement:IGMotor){
    this.previsionesService.eliminaGrupoMotor(gmElement);
    this.actualizaResultados();
  }

  //Elimina grupo motor
  eliminaAlumbrado (AlumElement:IAlumbrado){
    this.previsionesService.eliminaAlumbrado(AlumElement);
    this.actualizaResultados();
  }

   //Elimina local
   eliminarLocal(locElement:ILocal){
    this.previsionesService.eliminarLocal(locElement);
    this.actualizaResultados();
  }

    //Elimina garage
    eliminarGarage(garageElement:IGarage){
      this.previsionesService.eliminarGarage(garageElement);
      this.actualizaResultados();
    }


  //Funcion encagada de actualizar los datos de P1,P2, P3,P4,P5 y PT
  actualizaResultados() {

       /* Hace los calculos y actualiza los resultados PX*/
    this.previsionesService.calculaPT();

    //Si ya hay viviendas creadas, cambia el color del boton.
    if (this.previsionesService.listaViviendas().length>0) {
      document.getElementById("btnAgregarViv")?.setAttribute('color','success') ;
    } else  document.getElementById("btnAgregarViv")?.setAttribute('color','warning') ;


    //Si ya hay servicos generales creados, cambia el color del boton.
    if ((this.previsionesService.PAlum()+this.previsionesService.Pasc()+this.previsionesService.Pgm())>0) {
      document.getElementById("btnAgregarSerGen")?.setAttribute('color','success') ;

    } else  document.getElementById("btnAgregarSerGen")?.setAttribute('color','warning') ;

    //Si ya hay locales creados, cambia el color del boton.
    if (this.previsionesService.Ploc()>0) {
      document.getElementById("btnAgregarLocales")?.setAttribute('color','success') ;
    } else  document.getElementById("btnAgregarLocales")?.setAttribute('color','warning') ;


     //Si ya hay garages creados, cambia el color del boton.
     if ((this.previsionesService.PGar())>0) {
      document.getElementById("btnAgregarGarage")?.setAttribute('color','success') ;
    } else  document.getElementById("btnAgregarGarage")?.setAttribute('color','warning') ;

  }
  //Cambia el valor de la variable SPL si el edificio dispone del sistema SPL.
  cambiaSPL(argspl: boolean) {
    this.previsionesService.prevision().spl = argspl;
    this.actualizaResultados();
    //console.log('spl', arg0, 'total ', this.PTotal, this.P5);
  }

  cambiaEsquema(arg0: any) {
    this.previsionesService.prevision().esquema = arg0.value;
    // this.previsionesService.calculaPT();
    this.actualizaResultados();
  }

  constructor(

    private modalCtrl: ModalController
  ) { addIcons({helpOutline,trash,add,heart,alarm,logoIonic});}




}
