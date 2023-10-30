import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyTaskService } from 'src/app/shared/services/my-task.service';

import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Subscription, merge } from 'rxjs';
import { distinctUntilChanged, map, skip, tap } from 'rxjs/operators';
import { TaskDataSource } from 'src/app/shared/datasource/myTask.datasource';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { ViewCoverageComponent } from '../view-coverage/view-coverage.component';
import { PartialCompleteDialogComponent } from '../partial-complete-dialog/partial-complete-dialog.component';
import { TaskInfoDialogComponent } from '../task-info-dialog/task-info-dialog.component';

@Component({
  selector: 'app-assigned-by-me',
  templateUrl: './assigned-by-me.component.html',
  styleUrls: ['./assigned-by-me.component.css'],
})
export class AssignedByMeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @Input('searchInput') searchInput!: any;
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
  from: any;
  searchText: any = '';
  to: any;

  dataSource!: TaskDataSource;

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
    this.dataSource.loadAssignedByMe(
      1,
      10,
      '',
      this.userId,
      false,
      [],
      '',
      '',
      '',
      '',
      '',
      ''
    );
  }
  ngAfterViewInit() {
    const paginatorSubscriptions = merge(this.paginator.page)
      .pipe(tap(() => this.loadAssignedByMePage()))
      .subscribe();
    this.subscriptions.push(paginatorSubscriptions);
  }
  loadAssignedByMePage() {
    if (
      this.paginator.pageIndex < 0 ||
      this.paginator.pageIndex > this.paginator.length / this.paginator.pageSize
    )
      return;
    this.from = this.paginator.pageIndex * this.paginator.pageSize + 1;
    this.to = (this.paginator.pageIndex + 1) * this.paginator.pageSize;

    this.dataSource.loadAssignedByMe(
      this.from,
      this.to,
      this.searchText,
      this.userId,
      false,
      [],
      '',
      '',
      '',
      '',
      '',
      ''
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['searchInput']) {
      if (changes?.['searchInput']?.currentValue == '') {
        this.searchText = '';
        this.loadAssignedByMePage();
      } else if (
        changes?.['searchInput']?.currentValue !== '' &&
        changes?.['searchInput']?.currentValue !== undefined
      ) {
        this.searchText = changes?.['searchInput'].currentValue;
        this.loadAssignedByMePage();
      }
    }
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
              this.dataSource.loadAssignedByMe(
                1,
                10,
                '',
                this.userId,
                false,
                [],
                '',
                '',
                '',
                '',
                '',
                ''
              );
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
            this.dataSource.loadAssignedByMe(
              1,
              10,
              '',
              this.userId,
              false,
              [],
              '',
              '',
              '',
              '',
              '',
              ''
            );
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
  displayDetails(taskId: any, isCC: boolean) {
    const params = {
      taskId: taskId,
      isCC: isCC,
    };
    const dialogRef = this.matDialog.open(TaskInfoDialogComponent, {
      data: params,
      width: '1100px',
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
              this.dataSource.loadAssignedByMe(
                1,
                10,
                '',
                this.userId,
                false,
                [],
                '',
                '',
                '',
                '',
                '',
                ''
              );
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
              this.dataSource.loadAssignedByMe(
                1,
                10,
                '',
                this.userId,
                false,
                [],
                '',
                '',
                '',
                '',
                '',
                ''
              );
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
      this.dataSource.loadAssignedByMe(
        1,
        10,
        '',
        this.userId,
        false,
        [],
        '',
        '',
        '',
        '',
        '',
        ''
      );
    });
    
  }
}
