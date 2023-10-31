import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  @ViewChild('search') search: any;
  seletedTab: any = 0;
  myTaskSearch: any;
  ccSearch: any;
  archiveSearch: any;
  assignedByMe: any;
  searching = new FormControl();
  constructor(private router: Router, private dialog: MatDialog) {}

  searchingInput(event: any) {
    this.search.value = event.target.value;

    if (this.seletedTab == 0) {
      this.myTaskSearch = this.search.value;
    } else if (this.seletedTab == 1) {
      this.ccSearch = this.search.value;
    } else if (this.seletedTab == 2) {
      this.assignedByMe = this.search.value;
    } else if (this.seletedTab == 3) {
      this.archiveSearch = this.search.value;
    }
  }

  ngOnInit(): void {}

  EditTask() {
    const dialog = this.dialog.open(EditTaskDialogComponent, {
      height: '90vh',
      width: '70%',
      disableClose: true,
    });
  }
  tabChange(event: MatTabChangeEvent) {
    this.seletedTab = event.index;
    this.searching.setValue('');
  }

  clear() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['auth/login']);
  }
}
