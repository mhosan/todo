import { TodoService } from './../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoViewModel } from '../models/todo-view-model';
import { Todo } from '../models/todo';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  todoForm: FormGroup;
  // tslint:disable-next-line:no-inferrable-types
  createMode: boolean = true;
  todo: TodoViewModel;

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private todoService: TodoService) { }

  ngOnInit() {
    // formBuilder.group devuelve un objeto con propiedades que apuntan a los campos del form
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],       // title es un input text en el html, se define en la prop
                                              // 'formControlName'
      description: ['', Validators.required],
      done: false
    });
    if (!this.createMode) {
      this.loadTodo(this.todo);
    }
  }

  loadTodo(todo) {
    this.todoForm.patchValue(todo);
  }

  saveTodo() {
    if (this.todoForm.invalid) {
      return;
    }

    if (this.createMode) {
      const todo: Todo = this.todoForm.value;
      todo.lastModifiedDate = new Date();
      todo.createdDate = new Date();
      this.todoService.saveTodo(todo)
      .then(response => this.handleSuccessfulSaveTodo(response, todo))
      .catch(err => console.error(err));
    } else {
      const todo: TodoViewModel = this.todoForm.value;
      todo.id = this.todo.id;
      todo.lastModifiedDate = new Date();
      this.todoService.editTodo(todo)
        .then(() => this.handleSuccessfulEditTodo(todo))
        .catch(err => console.error(err));
    }
  }

  handleSuccessfulSaveTodo(Response: DocumentReference, todo: Todo) {
      this.activeModal.dismiss({ todo: todo, id: Response.id, createMode: true });
  }

  handleSuccessfulEditTodo(todo: TodoViewModel) {
    this.activeModal.dismiss({ todo: todo, id: todo.id, createMode: false });
  }

    // handleSuccessfulEditTodo(todo: TodoViewModel) {
    //   this.activeModal.dismiss({ todo: todo, id: todo.id, createMode: false });
    // }

  }


