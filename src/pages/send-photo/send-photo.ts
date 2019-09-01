import { Component, ViewChild } from "@angular/core";
import {
  AlertController,
  ViewController,
  NavParams,
  Slides,
  LoadingController,
  NavController,
  ToastController
} from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";
import { HomePage } from "../home/home";


@Component({
  selector: 'page-send-photo',
  templateUrl: 'send-photo.html'
})
export class SendPhotoPage {
  @ViewChild(Slides) slides: Slides;
  
  public user: string = '';
  public photos: AngularFireList<any>;
  public form: FormGroup;
  public photo: string;
  public location: string = '';
  public filter: string = 'original';
  public filters: string[] = [
    "original",
    "_1977",
    "aden",
    "amaro",
    "brannan",
    "brooklyn",
    "clarendon",
    "gingham",
    "hudson",
    "inkwell",
    "kelvin",
    "lark",
    "lofi",
    "mayfair",
    "moon",
    "nashville",
    "perpetua",
    "reyes",
    "rise",
    "slumber",
    "stinson",
    "toaster",
    "valencia",
    "walden",
    "willow",
    "xpro2"
  ];
  
  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navParams: NavParams,
    private db: AngularFireDatabase,
    private fireAuth: AngularFireAuth
  ) {
    this.photos = this.db.list<any>('/photos');
    this.photo = this.navParams.get('photo');
    
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user.email
      }
    });
    
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      message: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.required
      ])]
    })
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        this.location = data.coords.latitude + ',' + data.coords.longitude;
      }, (error) => {
        this.alertCtrl.create({
          title: 'Ops, algo deu errado',
          subTitle: 'Não foi possível obter sua localização',
          buttons: ['OK']
        }).present();
      })
    }
  }
  
  changeFilter() {
    let currentIndex = this.slides.getActiveIndex();
    this.filter = this.filters[currentIndex];
  }
  
  submit(): void {
    let loader = this.loadingCtrl.create({content: "Enviando..."});
    loader.present();
    
    if (!navigator.onLine) {
      let data = JSON.parse(localStorage.getItem('photos'));
      if (!data) {
        data = [];
      }
      
      data.push({
        user: this.user,
        image: this.photo,
        filter: this.filter,
        location: this.location,
        title: this.form.controls['title'].value,
        message: this.form.controls['message'].value
      });
      
      localStorage.setItem('photos', JSON.stringify(data));
      
      this.toastCtrl.create({
        message: 'Foto salva para ser enviada depois!',
        duration: 3000
      }).present();
      
      this.dismiss();
      this.navCtrl.setRoot(HomePage);
      
    } else {
      this.photos.push({
        user: this.user,
        image: this.photo,
        filter: this.filter,
        location: this.location,
        title: this.form.controls['title'].value,
        message: this.form.controls['message'].value,
        date: firebase.database.ServerValue.TIMESTAMP
      }).then(() => {
        loader.dismiss();
        this.dismiss();
        this.navCtrl.setRoot(HomePage);
      }, () => {
        loader.dismiss();
    
        this.alertCtrl.create({
          title: 'Ops, algo deu errado',
          subTitle: 'Não foi possivel enviar sua imagem',
          buttons: ['OK']
        }).present();
      });
    }
  }
}
