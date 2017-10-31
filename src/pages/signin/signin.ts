import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, IonicPage, LoadingController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  constructor(private authService: AuthService, private loadingController: LoadingController, private alertController: AlertController) {}

  onSubmit(form: NgForm) {
    const loading = this.loadingController.create({
      content: 'Sign in...'
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password)
    .then((data) => {
      loading.dismiss();
    }).catch((error) => {
      loading.dismiss();
      const alert = this.alertController.create({
        title: 'Signin failed!',
        message: error.message,
        buttons: [ 'Ok' ]
      });
      alert.present();
    });

  }

}
