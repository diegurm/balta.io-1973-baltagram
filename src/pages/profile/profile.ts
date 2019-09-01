import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  user: string = '';

  constructor(
    private navCtrl: NavController,
    private fireAuth: AngularFireAuth
  ) {
    fireAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user.email;
      }
    });
  }

  submit(): void {
    this.fireAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }
}
