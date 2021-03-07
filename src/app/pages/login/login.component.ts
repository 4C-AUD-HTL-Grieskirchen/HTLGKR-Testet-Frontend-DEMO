import {Component, OnInit} from '@angular/core';
import {FirebaseAuthService} from '../../services/firebase-auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    uid = '';

    email = '';
    password = '';
    showSpinner = false;

    constructor(private loginService: FirebaseAuthService, private auth: FirebaseAuthService, private snackbar: MatSnackBar) {}

    ngOnInit(): void {
        this.auth.loggedIn();

        this.auth.user.subscribe(value => {
            this.uid = value?.uid ?? 'Not logged in';
        });
    }

    login(): void {



        this.showSpinner = true;
        this.loginService.login(this.email, this.password).then(value => {
            this.snackbar.open('User UID: ' + value.user?.uid);
            this.showSpinner = false;
        }).catch(reason => {
            this.snackbar.open(reason);
            this.showSpinner = false;
        });
    }

}
