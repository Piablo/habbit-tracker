import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from '../../../../node_modules/rxjs';
import { Router } from '@angular/router';

export interface UserCreds {
  email:string;
  userPassword:string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private afs: AngularFirestore, private router: Router) { }

  ngOnInit() {  }

  userCollection: AngularFirestoreCollection<UserCreds>;
  users: Observable<UserCreds[]>;

  password:string;
  email:string;

  login(){
    this.userCollection = this.afs.collection('users', ref => ref.where('userEmail', '==', this.email));
    this.users = this.userCollection.valueChanges();
    this.users.subscribe(res => {
      var resPassword = res[0].userPassword;
      if(resPassword == this.password){
        console.log('this point was reached');
        this.router.navigate(['/dashboard']);
      }else{
        alert("Incorrect credentials supplied");
        this.password = "";
      }
    });
  }
}
