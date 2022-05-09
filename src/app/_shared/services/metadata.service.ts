import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  metadataRef: any;

  constructor(private db: AngularFirestore) {
    this.metadataRef = db.collection('/metadata');
  }

  getMetadata(){
    return this.metadataRef;
  }

  incrementOrderCountNumber(metadata: any) {
    const newOrderCountNumber= metadata.orderCountNumber+1;
    this.metadataRef.doc(metadata.id).update({
      orderCountNumber: newOrderCountNumber
    })
  }
}
