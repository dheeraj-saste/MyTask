import { catchError, finalize } from 'rxjs/operators';
// RxJS
import { map } from 'rxjs/operators';
// CRUD
import { BaseDataSource } from './base/base.datasource';
import { BehaviorSubject, of } from 'rxjs';

import { MyTaskService } from '../services/my-task.service';


export class TaskDataSource extends BaseDataSource {
	
	private loadingSubject = new BehaviorSubject<boolean>(false);
	private isPreloadTextViewedSubject = new BehaviorSubject<boolean>(true);

	public override loading$ = this.loadingSubject.asObservable();
	public override isPreloadTextViewed$ = this.isPreloadTextViewedSubject.asObservable();

	constructor(private taskService: MyTaskService) {
		super();
	}

	loadMyTask(from:any, to:any, title:any, userId:any, isArchive:boolean, userIds:any, priority:any, StatusIds:any, FromDate:any, ToDate:any, SortColumn:any, SortOrder:any){
        this.loadingSubject.next(true);
        let params = {
            From: from,
            To: to,
            Title: title,
            UserId: userId,
            IsArchive: isArchive,
            UserIds: userIds,
            Priority: priority,
            TaskStatus: StatusIds,
            FromDueDate: FromDate,
            ToDueDate: ToDate,
            SortByDueDate: '',
            SortColumn: SortColumn,
            SortOrder: SortOrder
        }

		this.taskService.getTasksMyTask(params)
			.pipe(
				map(
					(task:any) => {
						this.paginatorTotalSubject.next(task.data.TotalCount);
						this.entitySubject.next(task.data.TaskList);
					}
				),
				catchError(() => of([])),
				finalize(() => {
					this.loadingSubject.next(false);
					this.isPreloadTextViewedSubject.next(false);
				})
			)
			.subscribe();
	}

	loadCC(from:any, to:any, title:any, userId:any, isArchive:any, userIds:any,StatusIds:any, priority:any){
        this.loadingSubject.next(true);
        const params = {
            From: from,
            To: to,
            Title: title,
            UserId: userId,
            IsArchive: isArchive,
            UserIds: userIds,
            TaskStatus: StatusIds,
            Priority: priority
          }

		this.taskService.getTasksCc(params)
			.pipe(
				map(
					(task:any) => {
						this.paginatorTotalSubject.next(task.data.TotalCount);
						this.entitySubject.next(task.data.TaskList);
					}
				),
				catchError(() => of([])),
				finalize(() => {
					this.loadingSubject.next(false);
					this.isPreloadTextViewedSubject.next(false);
				})
			)
			.subscribe();
	}

	loadAssignedByMe(from:any, to:any, title:any, userId:any, isArchive:any, userIds:any, priority:any, StatusIds:any, FromDate:any, ToDate:any, SortColumn:any, SortOrder:any){
        this.loadingSubject.next(true);
        const params = {
            From: from,
            To: to,
            Title: title,
            UserId: userId,
            IsArchive: isArchive,
            UserIds: userIds,
            Priority: priority,
            TaskStatus: StatusIds,
            FromDueDate: FromDate,
            ToDueDate: ToDate,
            SortByDueDate: '',
            SortColumn: SortColumn,
            SortOrder: SortOrder
          }

		this.taskService.getTasksAssignedByMe(params)
			.pipe(
				map(
					(task:any) => {
						this.paginatorTotalSubject.next(task.data.TotalCount);
						this.entitySubject.next(task.data.TaskList);
					}
				),
				catchError(() => of([])),
				finalize(() => {
					this.loadingSubject.next(false);
					this.isPreloadTextViewedSubject.next(false);
				})
			)
			.subscribe();
	}

	loadArchive(from:any, to:any, title:any, userId:any, isArchive:any, userIds:any){
        this.loadingSubject.next(true);
        const params = {
            From: from,
            To: to,
            Title: title,
            UserId: userId,
            IsArchive: isArchive,
            UserIds: userIds
          }

		this.taskService.getTasksArchive(params)
			.pipe(
				map(
					(task:any) => {
						this.paginatorTotalSubject.next(task.data.TotalCount);
						this.entitySubject.next(task.data.TaskList);
					}
				),
				catchError(() => of([])),
				finalize(() => {
					this.loadingSubject.next(false);
					this.isPreloadTextViewedSubject.next(false);
				})
			)
			.subscribe();
	}
}