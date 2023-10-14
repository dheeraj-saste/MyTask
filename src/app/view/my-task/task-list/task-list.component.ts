import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
constructor(private  router:Router,private dialog:MatDialog){}

  
  EditTask() {

    const dialog = this.dialog.open(EditTaskDialogComponent)
  }

  clear() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['auth/login']);
}
}
