import { EmailComposer } from '@ionic-native/email-composer';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Dialogs } from '@ionic-native/dialogs';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  contact = {
    email: "",
    subject: "",
    body: ""
  }
  constructor(public navCtrl: NavController, private _userService: UserServiceProvider, private emailComposer: EmailComposer, public _dialog: Dialogs) {
    this._userService.getProfile()
      .then((val) => {
        let profile = JSON.parse(val);
        this.contact.email = profile.email;
      })
      .catch((err) => {
        console.log(err);
        this._dialog.alert("you have to connect first to ba able to contact developers", "error", "ok");
        this.navCtrl.setRoot(HomePage);
      })
  }
  sendContact() {
    if (this.contact.body.length >= 30 && this.contact.subject.length >= 20) {
      // ok send 
      this.emailComposer.isAvailable().then((available: boolean) => {
        if (available) {
          let email = {
            to: 'amirs-m-s@live.com',
            cc: this.contact.email,
            //bcc: ['john@doe.com', 'jane@doe.com'],
            subject: this.contact.subject,
            body: this.contact.body,
            isHtml: true
          };
          //Now we know we can send
          this.emailComposer.open(email);
        }
      });
    }
    else {
      this._dialog.alert("you have to provide enogth data for this contact form , you give short subject or content .", "error")
    }
  }

}
