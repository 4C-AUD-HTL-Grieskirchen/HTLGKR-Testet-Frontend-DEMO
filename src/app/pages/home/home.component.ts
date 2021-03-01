import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


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

        this.store.collection('data').add({data});


    }
}
