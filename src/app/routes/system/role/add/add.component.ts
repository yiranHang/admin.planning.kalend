import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-system-role-add',
  templateUrl: './add.component.html'
})
export class SystemRoleAddComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '角色名称' },
      code: { type: 'string', title: '角色编码', description: '例如"ADMIN"' },
      remark: { type: 'number', title: '备注' }
    },
    required: ['name', 'code']
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 }
    },
    $remark: {
      widget: 'textarea',
      grid: { span: 24 }
    }
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {
    if (this.record.id > 0) this.http.get(`http://192.168.2.107/api/role/${this.record.id}`).subscribe(res => (this.i = res));
  }

  save(value: any): void {
    this.http.post(`http://192.168.2.107/api/role`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
