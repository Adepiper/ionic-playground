import { Component, inject, OnInit } from '@angular/core';
import {
  CameraPreview,
  CameraPreviewOptions,
  CameraPreviewPictureOptions,
} from '@capacitor-community/camera-preview';
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

@Component({
  selector: 'app-camera-modal',
  templateUrl: './camera-modal.component.html',
  styleUrls: ['./camera-modal.component.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonIcon,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class CameraModalComponent implements OnInit {
  image!: string;
  cameraInView = false;
  constructor() {}

  ngOnInit() {
    this.openCamera();
  }

  modal = inject(ModalController);

  openCamera() {
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'rear', // front or rear
      parent: 'content', // the id on the ion-content
      // width: window.screen.width, //width of the camera display
      // height: window.screen.height, //height of the camera
      toBack: false,
      className: 'cameraPreview',
    };
    CameraPreview.start(cameraPreviewOptions);
    this.cameraInView = true;
  }

  stopCamera() {
    CameraPreview.stop();
    this.cameraInView = false;
    this.modal.dismiss();
  }

  async captureImage() {
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 100,
    };
    const result = await CameraPreview.capture(cameraPreviewPictureOptions);
    this.image = `data:image/jpeg;base64,${result.value}`;
    this.stopCamera();
  }

  async flipCamera() {
    await CameraPreview.flip();
  }
}
