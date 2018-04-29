import { Note } from 'ionic-angular/es2015';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { GouvernoratProvider } from '../../providers/gouvernorat/gouvernorat';
import { CommuneProvider } from '../../providers/commune/commune';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { AuthentificationProvider } from '../../providers/authentification/authentification';
import { HomePage } from '../home/home';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  user;
  gov_list: any; //              liste des gov
  commune_list: any; //
  gov = -1;
  commune;
  private token;
  private password={
    new:"",
    old:""
  }
  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams, private _dialog: Dialogs, private _govService: GouvernoratProvider, private _comService: CommuneProvider, private _userService:UserServiceProvider, private _auth:AuthentificationProvider) {
    this.user = navParams.get('user');
    this.gov_list = [];
    this.commune_list = [];
    this._auth.getToken().then((val)=>{
      this.token = val;
    }).catch((err)=>{
      console.log("err");
      this.navCtrl.setRoot(HomePage);
    })
    this._govService.getGovList()
      .subscribe(data => {
        if (data['status'] === true) {
          let tmp = data['data'];
          for (let index = 0; index < tmp.length; index++) {
            const element = tmp[index];
            this.gov_list.push({
              id: element.id,
              name: element.nom
            })
          }
        }
        else {
          console.log("no data here ");
        }
      }, err => {
        console.log(err);
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }
  delete(i: number) {
    let new_array: Array<any>;
    let id_commune = this.user.commune[i].id;
    this._userService.Desabon_commune(id_commune,this.token).subscribe((val)=>{
      if(val['status']=== true){
        new_array = this.user.commune;
        new_array.splice(i, 1);
        this.user.commune = new_array;
        console.log("commune updated");
        this._dialog.alert("Commune Deleted", "Done", "Good").then(() => {
          console.log("done");
        }).catch((err) => {
          console.log(err);
        });
      }
      else{
        console.log("cant");
        this._dialog.alert("Shh, we can't take this commune down", "No god plz", "oki").then(() => {
          console.log("done");
        }).catch((err) => {
          console.log(err);
        });
      }
    },err=>{
      console.log(err);
      this._dialog.alert("Dude check your internet connexion", "Connexion trouble", "try again").then(() => {
        console.log("done");
      }).catch((err) => {
        console.log(err);
      });
    });

  }
  add_commune() {
    console.log("start commune add proce");

    if (this.user.commune.length < 3)
    {
      console.log("good space ");

      // check if commune existe already in user prefs
      if(this.user.commune.length > 0){
        this.user.commune.forEach(element => {
          if (element.id === this.commune) {
            console.log("already there ");
            this._dialog.alert('You are already associated with this commune', 'Hi you', 'ok')
              .then(() => {
                console.log("done");
              })
              .catch(() => {
                console.log("dalogs not supported");
              })
            return false
          }
          else {
            this.commune_list.forEach(element => {
              if (element.id == this.commune) {
                this._userService.Abon_commune(this.commune, this.token).subscribe((val) => {
                  if (val['status'] === true) {
                    console.log("done add");
                    this.user.commune.push(element);
                    this._dialog.alert('Cheers , you are now follwing ' + element.name, 'New Commune', 'ok')
                      .then(() => {
                        console.log("done");
                      })
                      .catch(() => {
                        console.log("dalogs not supported");
                      })
                  }
                  else {
                    console.log(val);
                    this._dialog.alert('Seems there is some thing wrong', 'Fail', 'ok')
                      .then(() => {
                        console.log("done");
                      })
                      .catch(() => {
                        console.log("dalogs not supported");
                      })
                  }
                }, err => {
                  console.log(err);
                  this._dialog.alert('Enable to reach the server , try later plz', 'Hi you', 'ok')
                    .then(() => {
                      console.log("done");
                    })
                    .catch(() => {
                      console.log("dalogs not supported");
                    })
                });

              }
            });
          }
        });
      }
      else{
        // drect add
        /**
         * this is bad code i have to chnage it it look like noob code or girl
         */
        this.commune_list.forEach(element => {
          if (element.id == this.commune) {
            this._userService.Abon_commune(this.commune, this.token).subscribe((val) => {
              if (val['status'] === true) {
                console.log("done add");
                this.user.commune.push(element);
                this._dialog.alert('Cheers , you are now follwing ' + element.name, 'New Commune', 'ok')
                  .then(() => {
                    console.log("done");
                  })
                  .catch(() => {
                    console.log("dalogs not supported");
                  })
              }
              else {
                console.log(val);
                this._dialog.alert('Seems there is some thing wrong', 'Fail', 'ok')
                  .then(() => {
                    console.log("done");
                  })
                  .catch(() => {
                    console.log("dalogs not supported");
                  })
              }
            }, err => {
              console.log(err);
              this._dialog.alert('Enable to reach the server , try later plz', 'Hi you', 'ok')
                .then(() => {
                  console.log("done");
                })
                .catch(() => {
                  console.log("dalogs not supported");
                })
            });

          }
        });
      }
    }
    else {
      console.log("only 3 commune are gven per user");
      this._dialog.alert('you are succesfully authentified', 'success', 'ok')
        .then(() => {
          console.log("done");
        })
        .catch(() => {
          console.log("dalogs not supported");
        })
    }
  }
  get_commune(obj) {
    this._comService.getCommuneList(obj)
      .subscribe(data => {
        if (data['status'] === true) {
          let tmp = data["data"];
          this.commune_list = []
          for (let index = 0; index < tmp.length; index++) {
            const element = tmp[index];
            this.commune_list.push({
              id: element.id,
              name: element.nom
            })
          }
        }
        else {
          console.log("no data");

        }
      }, err => {
        console.log(err);

      });
  }
  save_User(){
    if(!(this.user['name_u'].length > 2 && this.user['last_name'].length > 2 && this.user['email'].length > 5)){
      console.log('empty fields');
      this._dialog.alert("Some field are empty","Watch out","ok").then(()=>{
        console.log("dismiss");
        }).catch((err)=>{
          console.log(err);
        });
      return false ;
    }
    let clone = Object.create(this.user);
    this._userService.updateUser(clone,this.token)
    .subscribe((data)=>{
      if (data['status'] === true) {
        console.log("update done");
        this.user = clone;
        this._dialog.alert("Profile updated","Done","Good").then(()=>{
          console.log("done");
        }).catch((err)=>{
          console.log(err);
        });
      } else {
        console.log(data['msg']);
        this._dialog.alert("We are not able to update your profile , "+data['msg'], "Ok", "Fail").then(() => {
          console.log("done");
        }).catch((err) => {
          console.log(err);
        });
      }
    },(err)=>{
      this._dialog.alert("We got trouble to reach our serve", "Ok", "Fail").then(() => {
        console.log("done");
      }).catch((err) => {
        console.log(err);
      });
    })
  }
  save_Password(){
    this._userService.updateSecurity(this.password,this.token).subscribe((data)=>{
      if(data['status']=== true){
        // done
        console.log("chnaged password");
        this._dialog.alert("Your password Succesfully chnaged", "Done", "Good").then(() => {
          console.log("done");
        }).catch((err) => {
          console.log(err);
        });
      }
      else{
        // wrong pass
        console.log("wrong password");
        this._dialog.alert("Wrong password gived, check again ", "Fail", "try again").then(() => {
          console.log("done");
        }).catch((err) => {
          console.log(err);
        });
      }
    },err=>{
      console.log(err);
      this._dialog.alert("We got trouble to reach our serve", "Ok", "Fail").then(() => {
        console.log("done");
      }).catch((err) => {
        console.log(err);
      });
    });
  }

}
// nterface jaw beh -> mba3ed rabten m3a les service
