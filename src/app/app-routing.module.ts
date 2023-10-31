import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticateGuard } from './core/guards/authenticate.guard';
import { reverseGuard } from './core/guards/reverse.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./view/auth/auth.module').then((m) => m.AuthModule),
    canActivate:[reverseGuard],
  },
  {
    path: 'mytask',
    loadChildren: () =>
      import('./view/my-task/my-task.module').then((m) => m.MyTaskModule),
    canActivate: [authenticateGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
