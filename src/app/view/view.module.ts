import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

const route: Route[] = [
  {
    path:'',loadChildren: () =>
    import('./my-task/my-task.module').then((m) => m.MyTaskModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(route),
  ]
})
export class ViewModule { }
