import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemRoleComponent } from './role/role.component';
import { SystemUserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'user', component: SystemUserComponent },
  { path: 'role', component: SystemRoleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
