import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  firestoreCollection: AngularFirestoreCollection
  constructor(private _firestore: AngularFirestore) {
    this.firestoreCollection = _firestore.collection('todos');
  }
  addTodo(title: string) {
    this.firestoreCollection.add({
      title,
      isDone: false
    })
  }
  updateTodoStatus(id:string, newStatus:boolean){
    this.firestoreCollection.doc(id).update({isDone:newStatus});
  }
  deleteTodo(id:string){
    this.firestoreCollection.doc(id).delete();
  }
  updateTitle(id:string, newTitle:string) {
    this.firestoreCollection.doc(id).update({title: newTitle});
  }
}
