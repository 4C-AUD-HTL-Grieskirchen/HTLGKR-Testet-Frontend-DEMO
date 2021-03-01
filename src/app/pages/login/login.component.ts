import {Component, OnInit} from '@angular/core';
import {FirebaseAuthService} from '../../services/firebase-auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private loginService: FirebaseAuthService) {}

    ngOnInit(): void {
    }

    login(email: string, pw: string): void {
        this.loginService.login(email, pw).then(value => {
            alert(value.user?.uid);
        }).catch(reason => {
            alert(reason);
        });
    }

}
