import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MyTaskService } from 'src/app/shared/services/my-task.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { distinctUntilChanged, map, skip } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TaskDataSource } from 'src/app/shared/datasource/myTask.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.css']
})
export class ArchiveListComponent implements OnInit {
  
  displayedColumns: string[] = [
    'Title',
    'CustomerName',
    'AssignedBy',
    'AssignedDate',
    'DueDate',
    'Priority',
    'Status',
    'Action',
  ];
  myTasks: any = [];
  

  taskParams: any = {
    From: 1,
    IsArchive: true,
    Title: '',
    To: 10,
    UserId: '',
    UserIds: [],
  };
  dataSource!: TaskDataSource;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  private subscriptions: Subscription[] = [];
  userDetails: any;
  userId: any;
  constructor(
    private taskService: MyTaskService,
    private matDialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataSource = new TaskDataSource(this.taskService);
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '');
    this.userId = this.userDetails.UserId;
    
    const entitiesSubscription = this.dataSource.entitySubject
      .pipe(skip(1), distinctUntilChanged())
      .subscribe((res) => {
        this.myTasks = res;
      });
    this.subscriptions.push(entitiesSubscription);
    this.dataSource.loadArchive(1,10,'',this.userId,true,[])
  }


  unarchive(taskId: number){

    let params = {
      title: 'Unarchive Task',
      description: 'Do you want to unarchive this Task?',
      waitDescription: 'Task is unarchiving...',
      successMessage: 'Task Unarchived Successfully',
      btnName: 'Unarchive',
    };

    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      height: '250px',
      width: '500px',
      data: params,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      let data = { IsArchive: false, TaskId: taskId };

      this.taskService
        .archiveTask(data)
        .pipe(
          map((res: any) => {
            if (res.Status == 200) {
              this.toastr.success(params.successMessage);
              this.dataSource.loadArchive(1,10,'',this.userId,true,[])
              
            }
          })
        )
        .subscribe();
    });

   
  }
}
