import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/Angular-Material/angular-material.module';
import { DeleteTaskDialogComponent } from './delete-task-dialog/delete-task-dialog.component';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CoreModule } from 'src/app/core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { AddUserDialogComponent } from './edit-task-dialog/add-user-dialog/add-user-dialog.component';
import { DatePipe } from 'src/app/core/pipes/date.pipe';
import { MyTaskService } from 'src/app/shared/services/my-task.service';

const route: Route[] = [
  {
    path: '',
    component: TaskListComponent,
  },
];

@NgModule({
  declarations: [
    TaskListComponent,
    EditTaskDialogComponent,
    DeleteTaskDialogComponent,
    AddUserDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
  ],
  providers: [MyTaskService,DatePipe],
})
export class MyTaskModule {}
