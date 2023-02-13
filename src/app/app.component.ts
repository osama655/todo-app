import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {Guid} from "guid-typescript";
import { Todo } from 'src/models/todo.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'todo-app';
  todos: Todo[] = []


  todoForm: FormGroup =  new FormGroup({
    title: new FormControl(''),
    
  });
  

  ngOnInit() {
    this.todoForm = new FormGroup({
      title: new FormControl(''),
      
    });

    console.log(this.todoForm);
    
  }

  


  onSubmit(){
    console.log('Valid?', this.todoForm); // true or false
    if(this.todoForm.value.title) {
      let todo = new Todo(Guid.create(), this.todoForm.value.title, false);
    this.todos.push(todo);
    this.todoForm.reset();
    } else {
      this.todoForm.setErrors({title: "Please enter value"})
    }

  }

  onComplete(id: Guid){
    let todo = this.todos.filter(x=>x.id === id)[0];
    todo.isComplete = true;

  }

  onDelete(id:Guid){
    let todo = this.todos.filter(x=>x.id === id)[0];
    let index = this.todos.indexOf(todo, 0);
    if(index > -1){
        this.todos.splice(index, 1);
    }
  }
}
