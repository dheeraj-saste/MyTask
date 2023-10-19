import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { MyTaskService } from 'src/app/shared/services/my-task.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit,OnChanges {
  displayedColumns: string[] = [
    'Title',
    'CustomerName',
    'AssignedBy',
    'AssignedDate',
    'DueDate',
    'Priority',
    'Status',
    'Action'
  ];
  myTasks: any=[];
  dataSource = new MatTableDataSource<any>(this.myTasks);

  taskParams: any = {
    From: 1,
    FromDueDate: '',
    IsArchive: false,
    Priority: '',
    SortByDueDate: '',
    TaskStatus: '',
    Title: '',
    To: 10,
    ToDueDate: '',
    UserId: '',
    UserIds: [],
  };
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private taskService: MyTaskService
  ) {
    // this.getTaskList();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
 this.dataSource = new MatTableDataSource<any>(this.myTasks);
  }
  ngOnInit(): void {
    this.getTaskList();
  }
  

  getTaskList() {
    this.taskService.getTasksAssignedByMe(this.taskParams).subscribe((res) => {
      this.myTasks = res.data.TaskList;
      console.log(res);
    });
  }

  EditTask() {
    const dialog = this.dialog.open(EditTaskDialogComponent, {
      height: '90vh',
      width: '70%',
    });
  }

  clear() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['auth/login']);
  }
}
