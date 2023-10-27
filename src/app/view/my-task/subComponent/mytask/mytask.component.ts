import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { PartialCompleteDialogComponent } from '../partial-complete-dialog/partial-complete-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { MyTaskService } from 'src/app/shared/services/my-task.service';
import { distinctUntilChanged, map, skip } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { TaskDataSource } from 'src/app/shared/datasource/myTask.datasource';
import { Subscription } from 'rxjs';
import { ViewCoverageComponent } from '../../view-coverage/view-coverage.component';

@Component({
  selector: 'app-mytask',
  templateUrl: './mytask.component.html',
  styleUrls: ['./mytask.component.css'],
})
export class MytaskComponent implements OnInit {
 
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
    FromDueDate: '',
    IsArchive: false,
    Priority: '',
    SortByDueDate: '',
    SortColumn: '',
    SortOrder: '',
    TaskStatus: '',
    Title: '',
    To: 10,
    ToDueDate: '',
    UserId: '',
    UserIds: '',
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
    this.dataSource.loadMyTask(
      1,
      10,
      '',
      this.userId,
      false,
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );
  }


  unarchive(taskId: number) {
    let params = {
      title: 'Unarchive Task',
      description: 'Do you want to Unarchive this Task?',
      waitDescription: 'Task is Unarchiving...',
      successMessage: 'Task has been Unarchived',
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
          map((res) => {
            if (res.Status == 200) {
              this.toastr.success(params.successMessage);
              this.dataSource.loadMyTask(1, 10, '', this.userId, true, '', '', '', '', '', '', '');
            }
          })
        )
        .subscribe();
    });
  }
  archive(taskId: number) {
    let params = {
      title: 'Archive Task',
      description: 'Do you want to archive this Task?',
      waitDescription: 'Task is archiving...',
      successMessage: 'Task has been Archived',
      btnName: 'Archive',
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
      let data = { IsArchive: true, TaskId: taskId };

      this.taskService
        .archiveTask(data)
        .pipe(
          map((res: any) => {
            if (res.Status == 200) {
              this.toastr.success(params.successMessage);
              this.dataSource.loadMyTask(1, 10, '', this.userId, false, '', '', '', '', '', '', '');
            }
          })
        )
        .subscribe();
    });
  }
  accept(taskId: number) {
    const _successMessage = 'Task Accepted Successfully';
    this.taskService
      .acceptTask(taskId)
      .pipe(
        map((res) => {
          if (res.Status == 200) {
            this.toastr.success(_successMessage);
            this.dataSource.loadMyTask(1, 10, '', this.userId, false, '', '', '', '', '', '', '');
          }
        })
      )
      .subscribe();
  }
  viewCoverage(taskId: number) {
    
    this.matDialog.open(ViewCoverageComponent, {
      height: '250px',
      width: '500px',
      data: taskId,
    });
  }
  deleted(taskId: number) {
    let params = {
      title: 'Delete Task',
      description: 'Do you want to delete this Task?',
      waitDescription: 'Task is deleting...',
      successMessage: 'Task Deleted Successfully',
      btnName: 'Delete',
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

      this.taskService
        .deleteTask(taskId)
        .pipe(
          map((res) => {
            if (res.Status == 200) {
              this.toastr.success(params.successMessage);
              this.dataSource.loadMyTask(1, 10, '', this.userId, false, '', '', '', '', '', '', '');
            }
          })
        )
        .subscribe();
    });
  }
  complete(taskId: number) {
    let params = {
      title: 'Complete Task',
      description: 'Are you sure this Task is complete?',
      waitDescription: 'Task is updating...',
      successMessage: 'Task Completed Successfully',
      btnName: 'Complete',
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
      let data = { TaskId: taskId, TaskStatusValue: 100 };
      this.taskService
        .completeTask(data)
        .pipe(
          map((res) => {
            if (res.Status == 200) {
              this.toastr.success(params.successMessage);
              this.dataSource.loadMyTask(1, 10, '', this.userId, false, '', '', '', '', '', '', '');
            }
          })
        )
        .subscribe();
    });
  }
  partialComplete(taskId: number, taskPercentage: number) {
    const _successMessage = 'Partial Complete Task Updated Successfully';
    const params = {
      TaskId: taskId,
      TaskStatusValue: taskPercentage,
    };
    const dialogRef = this.matDialog.open(PartialCompleteDialogComponent, {
      data: params,
      width: '450px',
      height: '250px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) return;
      this.toastr.success(_successMessage);
      this.dataSource.loadMyTask(1, 10, '', this.userId, false, '', '', '', '', '', '', '');
    });
    console.log(taskId, taskPercentage);
  }
}
