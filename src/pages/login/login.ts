import { Component } from "@angular/core";
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { SignupPage } from "../signup/signup";
import { HomePage } from "../home/home";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public form: FormGroup;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private fireAuth: AngularFireAuth
  ) {
    fireAuth.authState.subscribe((user) => {
      if (user) {
        this.navCtrl.setRoot(HomePage);
      }
    });

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
    });
  }

  submit(): void {
    let loading = this.loadingCtrl.create({content: 'Autenticando...'});
    loading.present();

    this.fireAuth.auth.signInWithEmailAndPassword(
      this.form.controls['email'].value,
      this.form.controls['password'].value
    ).then(() => {
      loading.dismiss();

      this.navCtrl.setRoot(HomePage);
    }).catch(() => {
      loading.dismiss();

      this.alertCtrl.create({
        title: 'Autenticação Inválida',
        subTitle: 'Usuário ou senha incorretos.',
        buttons: ['OK']
      }).present();
    });
  }

  goToSignup(): void {
    this.navCtrl.setRoot(SignupPage)
  }
}
