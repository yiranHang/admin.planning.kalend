import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';

import { SystemRoleAddComponent } from './role/add/add.component';
import { SystemRoleEditComponent } from './role/edit/edit.component';
import { SystemRoleComponent } from './role/role.component';
import { SystemRoleViewComponent } from './role/view/view.component';
import { SystemRoutingModule } from './system-routing.module';
import { SystemUserComponent } from './user/user.component';
const COMPONENTS: Array<Type<void>> = [
  SystemUserComponent,
  SystemRoleComponent,
  SystemRoleEditComponent,
  SystemRoleViewComponent,
  SystemRoleAddComponent
];

@NgModule({
  imports: [SharedModule, SystemRoutingModule],
  declarations: COMPONENTS
})
export class SystemModule {}
