import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../../User';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    mockUser: User = {
        id: 1,
        firstname: 'Michael',
        lastname: 'Wiesinger',
        age: 17
    };

    dataCollection: any[];

    constructor(private store: AngularFirestore) {
        this.dataCollection = [];
    }

    ngOnInit(): void {
        this.store.firestore.collection('data').orderBy('timestamp').onSnapshot(snapshot => {
            this.dataCollection = [];
            snapshot.forEach(result => {
                this.dataCollection.push(result.data());
            });
        });

    }

    insertData(data: string): void {

        this.store.firestore.collection('data').add({data, timestamp: Date.now()});


        // this.store.collection('data').doc(this.mockUser.lastname).set({data: this.mockUser, timestamp: Date.now()});
    }
}
