import { Component } from "@angular/core";
import { LoadingController, ModalController } from "ionic-angular";
import { AngularFireDatabase } from "@angular/fire/database";
import { ShowMapPage } from "../show-map/show-map";

@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html'
})
export class PhotosPage {

  public photos: any[] = [];

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private db: AngularFireDatabase
  ) {
    let loader = this.loadingCtrl.create({content: 'Carregando fotos...'});
    loader.present();

    this.db.list<any>('photos').valueChanges()
      .subscribe((photos) => {
        this.photos = photos;
        loader.dismiss();
      });

  }

  showMap(location){
    console.log(location);

    let modal = this.modalCtrl.create(ShowMapPage, {location : location});
    modal.present();
  }
}
