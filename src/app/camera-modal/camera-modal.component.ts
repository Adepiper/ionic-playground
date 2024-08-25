import {
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
import { addIcons } from 'ionicons';
import { cameraReverse, camera, closeCircle } from 'ionicons/icons';

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
export class CameraModalComponent implements OnInit, OnChanges {
  image!: string | null;
  cameraInView = false;
  constructor() {
    addIcons({ cameraReverse, camera, closeCircle });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {
    this.openCamera();
  }

  modal = inject(ModalController);

  openCamera() {
    this.image = null;
    const body = document.getElementById('tab-content') as any;
    body.classList.add('display');
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'front',
      parent: 'content',
      toBack: true,
      className: 'cameraPreview',
    };
    CameraPreview.start(cameraPreviewOptions);
    this.cameraInView = true;
  }

  stopCamera() {
    CameraPreview.stop();
    this.cameraInView = false;
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

  closeCamera() {
    this.stopCamera();
    this.modal.dismiss();
    const body = document.getElementById('tab-content') as any;
    body.classList.remove('display');
  }
}
