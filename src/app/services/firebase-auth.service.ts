import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import User = firebase.User;
import UserCredential = firebase.auth.UserCredential;
import Auth = firebase.auth.Auth;
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FirebaseAuthService {

    public readonly user: Observable<User | null>;

    constructor(public auth: AngularFireAuth, public router: Router) {
        this.auth.setPersistence(Auth.Persistence.SESSION);

        this.user = auth.authState;
    }

    loggedIn(): boolean {
        return this.user !== undefined;
    }

    async login(email: string, password: string): Promise<UserCredential> {

        const result = await this.auth.signInWithEmailAndPassword(email, password);
        console.log(result);
        return result;
    }
}
