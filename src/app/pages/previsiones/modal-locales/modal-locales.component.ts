import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ILocal } from 'src/app/models/ilocal';
import { PrevisionesService } from '../../../services/previsiones.service';
import { UtilsService } from '../../../services/utils.service';
import { ModalController, IonHeader, IonGrid } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-modal-locales',
  templateUrl: './modal-locales.component.html',
  styleUrls: ['./modal-locales.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
})
export class ModalLocalesComponent  implements OnInit {
  utilService = inject(UtilsService);
  previsionesService = inject(PrevisionesService);
  modelLocal: ILocal ={
    id: 0,
    numLocales: 0,
    mtsLocal: 0,
    potLocal: 0,
    totalPotenciaLocalkW: 0 
  };

  resetLocal() { 
    this.modelLocal={
      id: 0,
      numLocales: 0,
      mtsLocal: 0,
      potLocal: 0,
      totalPotenciaLocalkW: 0
    };
  }
  
  agregarLocales(){
    console.log('locales ', this.modelLocal);
    
    this.calculaPotLocal();

    //Comprobamos que el número de ascensores y potencia es positivo.
    if (this.modelLocal.numLocales < 1) {
      this.utilService.showAlert('Error num de locales', 'El número de locales ha de ser positivo.');

    } else if (this.modelLocal.mtsLocal < 0.1) {
      this.utilService.showAlert('Error superficie local.', 'La superficie del local ha de ser superior a 0.');

    } else {
      
      //Colocamos el id que corresponde al nuevo ascensor
      //this.modelAscensor.id = this.listaAscensores().length;
      this.previsionesService.agregarLocal(this.modelLocal);
      this.resetLocal();
    }
  }
  
  //calcula automaticamente los inputs del form
  calculaPotLocal(){
    if (this.modelLocal!.mtsLocal<34.5) {
        this.modelLocal!.potLocal=3.45;
    }else {
      this.modelLocal.potLocal=this.modelLocal!.mtsLocal*0.1;
    }
    
    this.modelLocal.totalPotenciaLocalkW=this.modelLocal.numLocales*this.modelLocal.potLocal;

  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  
    constructor( private modalCtrl: ModalController) { this.resetLocal()}

    ngOnInit() { this.resetLocal();}


}
