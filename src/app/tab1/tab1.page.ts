import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonImg,
  ModalController,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {
  CameraPreview,
  CameraPreviewOptions,
  CameraPreviewPictureOptions,
} from '@capacitor-community/camera-preview';
import { CameraModalComponent } from '../camera-modal/camera-modal.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonIcon,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    CameraModalComponent,
  ],
})
export class Tab1Page {
  image!: string;
  cameraInView = false;
  constructor(private modalController: ModalController) {}

  async openModal() {
    console.log('test');
    const modal = await this.modalController.create({
      component: CameraModalComponent,
    });

    await modal.present();
  }
}
