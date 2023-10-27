import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/Angular-Material/angular-material.module';
import { DeleteTaskDialogComponent } from './delete-task-dialog/delete-task-dialog.component';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CoreModule } from 'src/app/core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { AddUserDialogComponent } from './edit-task-dialog/add-user-dialog/add-user-dialog.component';
import { DatePipe } from '@angular/common';
import { MyTaskService } from 'src/app/shared/services/my-task.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CcComponent } from './subComponent/cc/cc.component';
import { MytaskComponent } from './subComponent/mytask/mytask.component';
import { AssignedByMeComponent } from './subComponent/assigned-by-me/assigned-by-me.component';
import { ArchiveListComponent } from './subComponent/archive-list/archive-list.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { PartialCompleteDialogComponent } from './subComponent/partial-complete-dialog/partial-complete-dialog.component';
import { ViewCoverageComponent } from './view-coverage/view-coverage.component';

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
    CcComponent,
    MytaskComponent,
    AssignedByMeComponent,
    ArchiveListComponent,
    ConfirmationDialogComponent,
    PartialCompleteDialogComponent,
    ViewCoverageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    CoreModule,
  ],
  providers: [MyTaskService, DatePipe],
})
export class MyTaskModule {}
