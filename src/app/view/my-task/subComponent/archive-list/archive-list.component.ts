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
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Subscription, merge } from 'rxjs';
import { distinctUntilChanged, map, skip, tap } from 'rxjs/operators';
import { TaskDataSource } from 'src/app/shared/datasource/myTask.datasource';
import { MyTaskService } from 'src/app/shared/services/my-task.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { TaskInfoDialogComponent } from '../task-info-dialog/task-info-dialog.component';

@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.css'],
})
export class ArchiveListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @Input('searchInput') searchInput!: ElementRef;

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

  dataSource!: TaskDataSource;

  private subscriptions: Subscription[] = [];
  userDetails: any;
  userId: any;
  searchText: any;
  debounceTimeout: any;
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
    this.dataSource.loadArchive(1, 10, '', this.userId, true, []);
  }
  ngAfterViewInit() {
    const paginatorSubscriptions = merge(this.paginator.page)
      .pipe(tap(() => this.loadArchiveListPage()))
      .subscribe();
    this.subscriptions.push(paginatorSubscriptions);
  }
  loadArchiveListPage() {
    if (
      this.paginator.pageIndex < 0 ||
      this.paginator.pageIndex > this.paginator.length / this.paginator.pageSize
    )
      return;
    let from = this.paginator.pageIndex * this.paginator.pageSize + 1;
    let to = (this.paginator.pageIndex + 1) * this.paginator.pageSize;
    this.dataSource.loadArchive(
      from,
      to,
      this.searchText,
      this.userId,
      true,
      []
    );
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
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['searchInput']) {
      if (changes?.['searchInput']?.currentValue == '') {
        this.searchText = '';
        this.loadArchiveListPage();
      } else if (
        changes?.['searchInput']?.currentValue !== '' &&
        changes?.['searchInput']?.currentValue !== undefined
      ) {
        this.searchText = changes?.['searchInput'].currentValue;
        if (this.debounceTimeout) {
          clearTimeout(this.debounceTimeout);
        }
        this.debounceTimeout = setTimeout(() => {
          this.loadArchiveListPage();
        }, 1000);
      }
    }
  }

  unarchive(taskId: number) {
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
              this.dataSource.loadArchive(1, 10, '', this.userId, true, []);
            }
          })
        )
        .subscribe();
    });
  }
}
