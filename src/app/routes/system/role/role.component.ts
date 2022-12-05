import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { map } from 'rxjs';

import { SystemRoleEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-system-role',
  templateUrl: './role.component.html'
})
export class SystemRoleComponent implements OnInit {
  data: any;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号'
      }
    }
  };
  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: '编号', type: 'no' },
    { title: '角色名称', index: 'name' },
    { title: '角色编码', index: 'code' },
    { title: '备注', index: 'remark' },
    {
      title: '',
      buttons: [
        {
          text: '配置访问权限',
          icon: 'edit',
          click: 'load',
          type: 'drawer',
          drawer: {
            component: SystemRoleEditComponent,
            title: '权限点配置',
            size: 750,
            paramsName: 'i'
          }
        }
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) {}

  ngOnInit(): void {
    this.http
      .get(`http://localhost:3000/role`)
      .pipe(map((res: any) => res.data))
      .subscribe((res: any) => {
        this.data = res.data;
      });
  }
  add(): void {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
}
