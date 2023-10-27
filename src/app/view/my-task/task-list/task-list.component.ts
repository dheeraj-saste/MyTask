import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}

  EditTask() {
    const dialog = this.dialog.open(EditTaskDialogComponent, {
      height: '90vh',
      width: '70%',
      disableClose: true,
    });
  }

  clear() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['auth/login']);
  }
}
