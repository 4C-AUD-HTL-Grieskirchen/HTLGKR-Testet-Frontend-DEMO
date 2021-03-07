import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../../User';
import {FirebaseAuthService} from '../../services/firebase-auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    value: string;
    displayedColumns: string[] = ['data', 'timestamp', 'author'];

    userMail = 'undefined';

    dataCollection: any[];

    constructor(private store: AngularFirestore, private auth: FirebaseAuthService) {
        this.dataCollection = [];
        this.value = '';
    }

    ngOnInit(): void {
        this.store.firestore.collection('data').orderBy('timestamp').onSnapshot(snapshot => {
            this.dataCollection = [];
            snapshot.forEach(result => {
                this.dataCollection.push(result.data());
            });
        });

        this.auth.user.subscribe(value1 => {
            this.userMail = value1?.email ?? 'unknown';
        });



    }

    insertData(): void {

        if (this.value.length === 0) { return; }

        this.store.firestore.collection('data').add({data: this.value, timestamp: Date.now(), author:  this.userMail});
        this.value = '';

        // this.store.collection('data').doc(this.mockUser.lastname).set({data: this.mockUser, timestamp: Date.now()});
    }
}
