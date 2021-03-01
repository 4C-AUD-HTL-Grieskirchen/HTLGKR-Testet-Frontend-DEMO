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
        this.store.collection('data').valueChanges().subscribe(value => {
            this.dataCollection = value;

            console.log(this.dataCollection);
        });

    }

    insertData(data: string): void {

        this.store.collection('data').doc('gaming').set({data, timestamp: Date.now(), id: 1});

        if (data !== '') {
            this.mockUser.firstname = data;
        }

        this.store.collection('data').doc(this.mockUser.lastname).set({data: this.mockUser, timestamp: Date.now()});
    }
}
