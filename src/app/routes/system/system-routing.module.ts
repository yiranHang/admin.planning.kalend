import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemRoleComponent } from './role/role.component';

const routes: Routes = [{ path: 'role', component: SystemRoleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
