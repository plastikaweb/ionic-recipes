import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, IonicPage, LoadingController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(private authService: AuthService, private loadingController: LoadingController, private alertController: AlertController) {}

  onSubmit(form: NgForm) {
    const loading = this.loadingController.create({
      content: 'Sign up...'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password).then((data) => {
      loading.dismiss();
    }).catch((error) => {
      loading.dismiss();
      const alert = this.alertController.create({
        title: 'Signup failed!',
        message: error.message,
        buttons: [ 'Ok' ]
      });
      alert.present();
    });
  }

}
