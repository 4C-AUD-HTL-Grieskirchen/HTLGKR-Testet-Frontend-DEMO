import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private store: AngularFirestore) {
    }

    ngOnInit(): void {
    }

    insertData(data: string): void {

        this.store.collection('data').add({data});

    }
}
