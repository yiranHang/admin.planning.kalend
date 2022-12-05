import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';

import { SystemRoleEditComponent } from './role/edit/edit.component';
import { SystemRoleComponent } from './role/role.component';
import { SystemRoleViewComponent } from './role/view/view.component';
import { SystemRoutingModule } from './system-routing.module';

const COMPONENTS: Array<Type<void>> = [SystemRoleComponent, SystemRoleEditComponent, SystemRoleViewComponent];

@NgModule({
  imports: [SharedModule, SystemRoutingModule],
  declarations: COMPONENTS
})
export class SystemModule {}
