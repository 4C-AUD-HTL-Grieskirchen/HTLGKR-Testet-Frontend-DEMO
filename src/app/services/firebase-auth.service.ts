import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import User = firebase.User;
import UserCredential = firebase.auth.UserCredential;

@Injectable({
    providedIn: 'root'
})
export class FirebaseAuthService {

    user: User | undefined;

    constructor(public auth: AngularFireAuth, public router: Router) {

        auth.authState.subscribe(user => {
            if (user) {
                this.user = user;
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                localStorage.removeItem('user');
            }
        });
    }

    async login(email: string, password: string): Promise<UserCredential> {
        const result = await this.auth.signInWithEmailAndPassword(email, password);
        console.log(result);
        return result;
    }
}
