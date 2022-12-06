import { HttpContext } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { STColumn } from '@delon/abc/st';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-sys-user',
  templateUrl: './user.component.html'
})
export class SystemUserComponent implements OnInit {
  data: any;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号'
      }
    }
  };
  columns: STColumn[] = [
    { title: '编号', type: 'no' },
    { title: '用户名', index: 'userName' },
    { title: '单位信息', index: 'fillUnit' },
    {
      title: '账号状态',
      index: 'status',
      type: 'tag',
      tag: {
        0: { text: '正常', color: 'green' },
        1: { text: '冻结', color: 'red' },
        2: { text: '异常', color: 'orange' }
      }
    },
    {
      title: '是否禁用',
      index: 'disabled',
      type: 'yn'
    },
    {
      title: '角色',
      index: 'roles',
      render: 'role'
    },

    { title: '创建时间', type: 'date', index: 'createTime' },
    {
      title: '操作',
      buttons: [
        {
          text: '编辑',
          icon: 'edit'
        }
      ]
    }
  ];
  schema: SFSchema = {
    properties: {
      phone: {
        type: 'string',
        title: '账号',
        ui: {
          placeholder: '请输入手机号'
        }
      },
      name: {
        type: 'string',
        title: '用户名',
        ui: {
          placeholder: '请输入用户名'
        }
      },
      roles: {
        type: 'string',
        title: '角色',
        ui: {
          placeholder: '角色选择',
          allowClear: true,
          mode: 'tags',
          widget: 'select',
          // asyncData: () => this.gApi.getRole().pipe(delay(100)),
          compareWith: (o1: any, o2: any) => o1 && o2 && o1.id === o2.id
        }
      }
    },
    required: ['account', 'userName', 'status', 'disabled']
  };
  constructor(private http: _HttpClient, private modal: ModalHelper) {}
  ngOnInit(): void {
    this.http
      .get(`http://192.168.2.107/api/role`, null, {
        context: new HttpContext().set(ALLOW_ANONYMOUS, true)
      })
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
