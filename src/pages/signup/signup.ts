import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    this.authService.signup(form.value.email, form.value.password)
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  }

}
