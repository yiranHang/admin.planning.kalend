import { Component, OnInit } from '@angular/core';
import { SFSchema } from '@delon/form';
import { SettingsService, User, _HttpClient } from '@delon/theme';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-system-role-edit',
  templateUrl: './edit.component.html'
})
export class SystemRoleEditComponent implements OnInit {
  i!: any;
  treeCheck: string[] = [];
  schema: SFSchema = {
    properties: {
      permission: {
        type: 'string',
        title: '菜单权限点配置',
        ui: {
          widget: 'custom'
        }
      }
    }
  };
  constructor(public setting: SettingsService, public msgSrv: NzMessageService, public http: _HttpClient, public modal: NzDrawerRef) {}
  // 拿到当前用户信息 this.user.id为当前登录用户id
  get user(): User {
    return this.setting.user;
  }
  ngOnInit(): void {
    this.treeCheck = this.i?.permission || [];
  }

  checkTreeChange(treeKeys: string[]) {
    this.treeCheck = treeKeys;
  }
  save() {
    if (this.i?.id) {
      this.http.patch(`http://192.168.2.107/api/role/${this.i?.id}`, { permission: this.treeCheck }).subscribe(() => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
  }
}
