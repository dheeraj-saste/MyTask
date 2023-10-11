import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/Angular-Material/angular-material.module';
import { DeleteTaskDialogComponent } from './delete-task-dialog/delete-task-dialog.component';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { TaskListComponent } from './task-list/task-list.component';

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
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  exports: [AngularMaterialModule],
})
export class MyTaskModule {}
