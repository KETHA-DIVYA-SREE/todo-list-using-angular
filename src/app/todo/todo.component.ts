import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  FirstTitle:string = '';
  SecondTitle:string = '';
  todos: any[] = [];
  Finish: number = 0;
  yetToFinish: number = 0;
  edit = false;
  constructor(private _todoService: TodoService) { }

  ngOnInit(): void {
    this._todoService.firestoreCollection.valueChanges({ idField: 'id' })
    .subscribe(item =>{
      this.Finish = (item.filter(value =>{ return value['isDone']; })).length;
      this.yetToFinish = item.length - this.Finish;
      this.todos = item.sort((a:any,b:any) => {
        return a.isDone -b.isDone
      });
    })
  }

  onClick(titleInput: HTMLInputElement) {
    if(titleInput.value) {
      this._todoService.addTodo(titleInput.value);
      this.FirstTitle = "";
    } else {
      alert('Enter title value');
    }
  }

  onStatusChange(id: string, newStatus: boolean) {
    this._todoService.updateTodoStatus(id, newStatus);
  }

  onDelete(id:string){
    this._todoService.deleteTodo(id);
  }

  onEditClick(id:string, initialTitle:string, newTitle:HTMLInputElement) {
    // console.log("onEditClick------------- " + id);
    // console.log('title after update: ' + newTitle.value);
    // console.log(initialTitle +'===========' + newTitle.value);
    this._todoService.updateTitle(id, newTitle.value);
    this.edit = !this.edit;
    // console.log('edit after update: ' + this.edit);
  }

  onEdit(id:string, initialTitle:string) {
    // console.log('title before update: ' + initialTitle);
    // console.log("onEdit------------- " + id);
    this.SecondTitle = initialTitle;
    // console.log('new title place before update:--------' + this.SecondTitle);
    this.edit = !this.edit;
    // console.log('edit before update: ' + this.edit);
  }

  onReset(id:string, initialTitle:string, newTitle: HTMLInputElement) {
    this.SecondTitle = initialTitle;
  }
}
