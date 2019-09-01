import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  public form: FormGroup;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private fireAuth: AngularFireAuth
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required,
      ])]
    })
  }

  submit(): void {
    let loading = this.loadingCtrl.create({content: 'Cadastrando..'});
    loading.present();

    this.fireAuth.auth.createUserWithEmailAndPassword(
      this.form.controls['email'].value,
      this.form.controls['password'].value
    ).then(() => {
      loading.dismiss();

      this.alertCtrl.create({
        title: 'Bem vindo!',
        subTitle: 'Seu cadastro foi criado com sucesso e você já tem acesso.',
        buttons: ['OK']
      }).present();

      this.navCtrl.setRoot(LoginPage);
    }).catch(() => {
      loading.dismiss();

      this.alertCtrl.create({
        title: 'Ops, algo deu errado!',
        subTitle: 'Não foi possível realizar o seu cadastro.',
        buttons: ['OK']
      }).present();
    });

  }

  goToLogin(): void {
    this.navCtrl.setRoot(LoginPage);
  }
}
