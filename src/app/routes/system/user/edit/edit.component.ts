import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth'
import { SettingsService, User, _HttpClient } from '@delon/theme'
import * as crypto from 'crypto-js'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzModalRef } from 'ng-zorro-antd/modal'

@Component({
  selector: 'app-sys-user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class SysUserEditComponent implements OnInit {
  passwordVisible = false
  passwordVisibles = false
  passwordVisibless = false
  password?: string
  confirm?: string
  oldPassword?: string
  constructor(
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private settings: SettingsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.validateForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      // 自定义方法对密码进行校验
      password: ['', [this.passwordValidator, Validators.required]],
      // 判断两次密码是否一致
      confirm: ['', [this.confirmValidator]]
    })
  }
  // 拿到当前用户信息 this.user.id为用户id
  get user(): User {
    return this.settings.user
  }
  ngOnInit(): void {}
  validateForm: FormGroup
  // 提交信息
  submitForm(): void {
    // 原密码和新密码不能一样

    // 发送请求
    const { password, oldPassword } = this.validateForm.value
    if (password === oldPassword) {
      this.msgSrv.warning('新密码与原密码不能相同!')
      return
    }
    // 修改密码加密
    const data = JSON.stringify({ password, oldPassword })
    const encrypt = crypto.AES.encrypt(data, 'kalendsoft').toString()
    this.http.patch(`/user/editPassword/${this.user.id}`, { data: encrypt }).subscribe(res => {
      if (res && res.id) {
        // 修改密码的历史记录
        let fixRocord = {
          method: '修改',
          model: '系统模块',
          user: { id: this.user.id },
          option: '修改密码',
          optionResult: '成功'
        }
        this.http.post('/project-option-history', fixRocord).subscribe((res: any) => {
          if (res) {
            this.msgSrv.success('修改密码成功,请重新登录')
            this.tokenService.clear()
            this.modal.close(true)
            setTimeout(() => this.router.navigateByUrl(this.tokenService.login_url!), 1000 * 2)
          }
        })

        // 等待两秒，回登录页
      }
    })
  }
  // 重置
  resetForm(e: MouseEvent): void {
    e.preventDefault()
    this.validateForm.reset()
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine()
        this.validateForm.controls[key].updateValueAndValidity()
      }
    }
  }
  // 判断两次密码是否一致
  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity())
  }
  // 对比密码
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true }
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true }
    }
    return {}
  }
  // 判断新密码输入格式
  passwordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true }
    } else {
      // 定义变量标志
      let flag = /^(?=(.*?[A-Z]){0,})(?=(.*?[^\u4e00-\u9fa5]))(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s)(?=()).{8,12}$/.test(
        this.validateForm.controls.password.value
      )
      if (!flag) {
        return { password: true, error: true }
      }
    }
    return {}
  }
}
