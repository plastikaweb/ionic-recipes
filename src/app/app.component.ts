import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import firebase from 'firebase';
import { MenuController, NavController, Platform } from 'ionic-angular';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage: any = TabsPage;
  signinPage: any = SigninPage;
  signupPage: any = SignupPage;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuController: MenuController) {
    firebase.initializeApp({
      apiKey: 'AIzaSyACTK1O21akT7cjnoecjF-hOF-Oc54anfk',
      authDomain: 'plastikaweb-recipebook.firebaseapp.com'
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuController.close();
  }

  logout() {

  }
}

