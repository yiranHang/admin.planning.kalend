import { Injectable } from '@angular/core'
import { CurdOrder, NestCurdRequest } from '@core'
import { STColumnTag } from '@delon/abc/st'
import { MenuService, SettingsService, _HttpClient, _HttpHeaders } from '@delon/theme'
import { CondOperator, QueryFilter, QueryFilterArr } from '@nestjsx/crud-request'
import { format } from 'date-fns'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { IEnumVal } from 'src/app/routes/sys/menu/menu.type'

@Injectable({
  providedIn: 'root'
})
export class GeneralApiService {
  constructor(private menuSrv: MenuService, private http: _HttpClient, private curd: NestCurdRequest, private setting: SettingsService) {}

  getDictionary(code: string) {
    const query = this.curd.getQuery({
      filter: [
        {
          field: 'code',
          operator: CondOperator.EQUALS,
          value: code
        },
        {
          field: 'isOpen',
          operator: CondOperator.EQUALS,
          value: true
        }
      ],
      join: {
        field: 'detail',
        select: ['label', 'value', 'disabled']
      },
      sort: [
        {
          field: 'detail.label',
          order: CurdOrder.DESC
        },
        {
          field: 'detail.createTime',
          order: CurdOrder.DESC
        }
      ]
    })
    return new Observable(subscribe => {
      this.http.get(`/dictionary?${query}`).subscribe(res => {
        let result = []
        if (res && res[0] && Array.isArray(res[0].detail)) {
          result = res[0].detail
        }
        subscribe.next(result)
      })
    })
  }

  getDictionaryToPromise(code: string) {
    const query = this.curd.getQuery({
      filter: [
        {
          field: 'code',
          operator: CondOperator.EQUALS,
          value: code
        },
        {
          field: 'isOpen',
          operator: CondOperator.EQUALS,
          value: true
        }
      ],
      join: {
        field: 'detail',
        select: ['label', 'value', 'disabled','path','order']
      },
      sort: [
        {
          field: 'detail.label',
          order: CurdOrder.DESC
        },
        {
          field: 'detail.createTime',
          order: CurdOrder.DESC
        }
      ]
    })
    return new Promise((resolve, reject) => {
      this.http.get(`/dictionary?${query}`).subscribe(
        res => {
          let result = []
          if (res && res[0] && Array.isArray(res[0].detail)) {
            result = res[0].detail
          }
          resolve(result)
        },
        error => reject(error)
      )
    })
  }

  getMenuPerssion(code: string) {
    return this.getDictionary(code).pipe(
      map(res => {
        const gongke = {
          label: '工可阶段',
          group: true,
          children: [] as IEnumVal[]
        }
        const initial = {
          label: '初设阶段',
          group: true,
          children: [] as IEnumVal[]
        }
        const final = {
          label: '决算阶段',
          group: true,
          children: [] as IEnumVal[]
        }
        const design = {
          label: '设计变更',
          group: true,
          children: [] as IEnumVal[]
        }
        const progress = {
          label: '进度填报',
          group: true,
          children: [] as IEnumVal[]
        }
        const acceptance = {
          label: '验收阶段',
          group: true,
          children: [] as IEnumVal[]
        }
        const accept = {
          label: '资料审核',
          group: true,
          children: [] as IEnumVal[]
        }
        const projectApproval = {
          label: '项目审批',
          group: true,
          children: [] as IEnumVal[]
        }
        const formalPlan = {
          label: '资金计划',
          group: true,
          children: [] as IEnumVal[]
        }
        const base = {
          label: '基础操作',
          group: true,
          children: [] as IEnumVal[]
        }
        ;((res || []) as IEnumVal[]).map(r => {
          if ((r.value as string)?.indexOf('gongke') > -1) {
            gongke.children.push({
              label: r.label,
              disabled: r.disabled,
              value: {
                name: r.label,
                code: r.value as string
              }
            })
          } else if ((r.value as string)?.indexOf('initial') > -1) {
            initial.children.push({
              label: r.label,
              disabled: r.disabled,
              value: {
                name: r.label,
                code: r.value as string
              }
            })
          } else if ((r.value as string)?.indexOf('design') > -1) {
            design.children.push({
              label: r.label,
              disabled: r.disabled,
              value: {
                name: r.label,
                code: r.value as string
              }
            })
          } else if ((r.value as string)?.indexOf('final') > -1) {
            final.children.push({
              label: r.label,
              disabled: r.disabled,
              value: {
                name: r.label,
                code: r.value as string
              }
            })
          } else if ((r.value as string)?.indexOf('progress') > -1) {
            progress.children.push({
              label: r.label,
              disabled: r.disabled,
              value: {
                name: r.label,
                code: r.value as string
              }
            })
          } else if ((r.value as string)?.indexOf('acceptance') > -1) {
            acceptance.children.push({
              label: r.label,
              disabled: r.disabled,
              value: {
                name: r.label,
                code: r.value as string
              }
            })
          } else if ((r.value as string)?.indexOf('accept') > -1) {
            accept.children.push({
              label: r.label,
              disabled: r.disabled,
              value: {
                name: r.label,
                code: r.value as string
              }
            })
          } else if ((r.value as string)?.indexOf('project-approval') > -1) {
            projectApproval.children.push({
              label: r.label,
              disabled: r.disabled,
              value: {
                name: r.label,
                code: r.value as string
              }
            })
          } else if ((r.value as string)?.indexOf('formal-plan') > -1) {
            formalPlan.children.push({
              label: r.label,
              disabled: r.disabled,
              value: {
                name: r.label,
                code: r.value as string
              }
            })
          } else {
            base.children.push({
              label: r.label,
              disabled: r.disabled,
              value: {
                name: r.label,
                code: r.value as string
              }
            })
          }
        })
        return [base, gongke, initial, design, progress, final, acceptance, accept, projectApproval, formalPlan]
      })
    )
  }
  // 获取项目中存在的项目年份
  getProjectYear(year?: string | string[]) {
    let query = this.curd.getQuery({
      fields: ['year'],
      sort: [
        {
          field: 'year',
          order: CurdOrder.DESC
        }
      ]
    })
    if (this.isFR) query += `&filter=fillUnit||$eq||${this.setting.user.fillUnit}`
    return new Observable(subscribe => {
      this.http.get(`project-basic-info?${query}`).subscribe(res => {
        let result: string[] = []
        if (res) {
          result = [...new Set(res.map((r: any) => r.year))] as string[]
          if (year) {
            if (Array.isArray(year)) {
              result = [...year, ...result]
            } else {
              result = [year, ...result]
            }
          }
        }
        subscribe.next(result)
      })
    })
  }
  // 获取操作日志的操作类型
  getOption(option?: string | string[]) {
    return new Observable(subscribe => {
      this.http.get(`project-option-history`).subscribe(res => {
        let result: string[] = []
        if (res) {
          result = [...new Set(res.map((r: any) => r.option))] as string[]
          if (option) {
            if (Array.isArray(option)) {
              result = [...option, ...result]
            } else {
              result = [option, ...result]
            }
          }
        }
        subscribe.next(result)
      })
    })
  }
  // 对筛选项输入字符过滤

  stringFilter(value: string | number) {
    if (typeof value === 'string') {
      //删除与数据库相关的词
      value = value.replace('select', '')
      value = value.replace('insert', '')
      value = value.replace('delete from', '')
      value = value.replace("count''", '')
      value = value.replace('drop table', '')
      value = value.replace('truncate', '')
      value = value.replace('asc', '')
      value = value.replace('mid', '')
      value = value.replace('char', '')
      value = value.replace('xp_cmdshell', '')
      value = value.replace('exec master', '')
      value = value.replace('net localgroup administrators', '')
      value = value.replace('and', '')
      value = value.replace('net user', '')
      value = value.replace('or', '')
      value = value.replace('net', '')
      value = value.replace('-', '')
      value = value.replace('delete', '')
      value = value.replace('drop', '')
      value = value.replace('script', '')
      //特殊的字符
      value = value.replace('<', '')
      value = value.replace('>', '')
      value = value.replace('*', '')
      value = value.replace('-', '')
      value = value.replace('?', '')
      value = value.replace("'", "''")
      value = value.replace(',', '')
      value = value.replace('/', '')
      value = value.replace(';', '')
      value = value.replace('*/', '')
      value = value.replace('\r\n', '')
      return value
    } else {
      return value
    }
  }

  getModel(model?: string | string[]) {
    return new Observable(subscribe => {
      this.http.get(`project-option-history`).subscribe(res => {
        let result: string[] = []
        if (res) {
          result = [...new Set(res.map((r: any) => r?.model))] as string[]
          if (model) {
            if (Array.isArray(model)) {
              result = [...model, ...result]
            } else {
              result = [model, ...result]
            }
          }
          result = result.filter(res => {
            return res !== null
          })
        }
        subscribe.next(result)
      })
    })
  }

  get isFR() {
    const area: string[] = [
      '嘉定区',
      '奉贤区',
      '宝山区',
      '徐汇区',
      '普陀区',
      '杨浦区',
      '松江区',
      '浦东新区',
      '虹口区',
      '金山区',
      '长宁区',
      '闵行区',
      '青浦区',
      '静安区',
      '黄浦区',
      '崇明区'
    ]

    return area.indexOf(this.setting.user.fillUnit) > -1
  }

  /**
   *获取当年第一天时间
   *转换为json时会缺少8小时，小时需要改为8
   */
  get yearFirstDay() {
    let today = new Date()
    today.setDate(1)
    today.setMonth(0)
    today.setHours(8, 0, 0, 0)
    return today.toJSON()
  }
  getArea(name?: string) {
    let query = this.curd.getQuery({
      filter: {
        field: 'parentCode',
        operator: CondOperator.EQUALS,
        value: '3101'
      },
      fields: ['name'],
      sort: {
        field: 'code',
        order: CurdOrder.DESC
      }
    })
    if (name || this.isFR) query = `${query}&filter=name||$eq||${name || this.setting.user.fillUnit}`
    return new Observable(subscribe => {
      this.http.get(`/city?${query}`).subscribe(res => {
        subscribe.next(
          res.map((r: { name: string }) => ({
            label: r.name,
            value: r.name
          }))
        )
      })
    })
  }

  getStreet(value: string[]) {
    const or: Array<QueryFilter | QueryFilterArr> = []
    type SelectOption = {
      label: string
      group: boolean
      children: unknown[]
    }
    const data: SelectOption[] = []
    value.map(v => {
      data.push({
        label: v,
        group: true,
        children: []
      })
      or.push({
        field: 'fullname',
        operator: CondOperator.CONTAINS,
        value: v
      })
    })
    const query = this.curd.getQuery({
      or,
      fields: ['name', 'fullname'],
      sort: {
        field: 'code',
        order: CurdOrder.DESC
      }
    })
    return new Observable(subscribe => {
      this.http.get(`/city?${query}`).subscribe(res => {
        const record = data.map(r => {
          r.children = res
            .filter((rs: any) => rs.fullname.indexOf(r.label) > -1)
            .map((re: any) => ({
              label: re.name,
              value: re.name
            }))
          return r
        })
        subscribe.next(record)
      })
    })
  }

  getRole() {
    const query = this.curd.getQuery({
      fields: ['roleName']
    })
    return this.http.get(`/role?${query}`).pipe(
      map(res => {
        return res.map((re: { roleName: string; id: string }) => {
          return {
            label: re.roleName,
            value: { id: re.id }
          }
        })
      })
    )
  }

  getMenuTree() {
    return this.http.get('/menu/permission-tree')
  }

  getMenu() {
    return this.http.get('/menu/tree-menu')
  }

  createFlow<T = unknown>(body: T) {
    return this.http.post(`/project-flow`, body)
  }

  /**
   * 比较两对象的值是否一样
   *
   * @param object1 对象1-原数据
   * @param object2 对象2-修改后的数据
   * @returns 返回结果
   */
  deepEqual(object1: any, object2: any) {
    const obj: any = { isChanged: false }
    const keys1 = Object.keys(object1)
    const keys2 = Object.keys(object2)
    const value: Partial<any> = {}
    if (keys1.length !== keys2.length) {
      obj.isChanged = true
    }
    for (const item of keys1) {
      let val1 = object1[item]
      let val2 = object2[item]
      if (item === 'examineDate') {
        val1 = format(new Date(val1), 'yyyy-MM-dd')
        val2 = format(new Date(val2), 'yyyy-MM-dd')
      }
      const areObjects = this.isObject(val1) && this.isObject(val2)
      if ((areObjects && !this.deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
        obj.isChanged = true
        if (item === 'report' || item === 'request') {
          value[item] = { before: val1, after: val2 }
        } else if (item === 'area' || item === 'street') {
          value[item] = `${val1?.join(',')} => ${val2?.join(',')}`
        } else if (item === 'isOverStandard') {
          value[item] = `${val1 ? '超标' : '不超标'} => ${val2 ? '超标' : '不超标'}`
        } else {
          value[item] = `${val1} => ${val2}`
        }
      }
    }
    obj.value = value
    return obj.isChanged ? value : { message: '该条记录没有变化' }
  }

  isObject(object: any) {
    return object !== null && typeof object === 'object' && Array.isArray(object) === false
  }

  /**
   * 获取标题，流程状态
   *
   * @param status 状态
   * @returns {}
   */
  getStatus(status: number) {
    switch (status) {
      case 100:
        return { text: '预备待上报', color: 'green', title: { remark: '上报说明' } }
      case 101:
        return { text: '工可上报', color: 'green', title: { remark: '上报说明' } }
      case 102:
        return { text: '预储备驳回', color: 'red', title: { remark: '说明' } }
      case 110:
        return { text: '工可初审', color: 'green', title: { remark: '评审备注', file: '评审文件' } }
      case 111:
        return { text: '工可初审驳回', color: 'red', title: { remark: '审批备注' } }
      case 120:
        return { text: '评审委托', color: 'green', title: { remark: '评审说明', file: '委托文件' } }
      case 130:
        return { text: '技术审查组织评审', color: 'green', title: { file: '会议通知单', date: '会议时间' } }
      case 131:
        return { text: '技术审查驳回', color: 'red', title: { remark: '审查备注' } }
      case 132:
        return { text: '技术审查修编', color: 'orange', title: { remark: '说明', date: '修编时间' } }
      case 133:
        return { text: '技术审查', color: 'green', title: { remark: '审查备注', file: '评估报告', date: '审查时间' } }
      case 140:
        return { text: '估算审核组织评审', color: 'green', title: { date: '会议时间', file: '会议通知单' } }
      case 142:
        return { text: '估算审核修编', color: 'orange', title: { remark: '说明', date: '修编时间' } }
      case 143:
        return { text: '估算审核退回', color: 'red', title: { remark: '说明', date: '修编时间' } }
      case 144:
        return { text: '估算审核', color: 'green', title: { remark: '审核备注', date: '审核时间', file: '评估报告' } }
      case 150:
        return { text: '工可批复', color: 'green', title: { remark: '主要建设内容', file: '批复文件' } }
      case 151:
        return { text: '工可批复驳回', color: 'red', title: { remark: '主要建设内容' } }
      case 160:
        return { text: '项目储备', color: 'blue', title: { remark: '说明' } }
      case 200:
        return { text: '储备待上报', color: 'green', title: { remark: '上报说明' } }
      case 201:
        return { text: '储备待审核', color: 'green', title: { remark: '审核说明' } }
      case 210:
        return { text: '初设初审', color: 'green', title: { remark: '评审备注', file: '委托文件' } }
      case 211:
        return { text: '初设初审驳回', color: 'red', title: { remark: '审批备注' } }
      case 220:
        return { text: '评审委托', color: 'green', title: { remark: '评审说明', file: '委托文件' } }
      case 230:
        return { text: '技术审查组织会议', color: 'green', title: { file: '会议通知单', date: '会议时间' } }
      case 231:
        return { text: '技术审查驳回', color: 'red', title: { remark: '审查备注' } }
      case 232:
        return { text: '技术审查修编', color: 'orange', title: { remark: '说明', date: '修编时间' } }
      case 233:
        return { text: '技术审查', color: 'green', title: { remark: '审查备注', file: '评估报告', date: '审查时间' } }
      case 240:
        return { text: '概算审核组织会议', color: 'green', title: { file: '会议通知单', date: '会议时间' } }
      case 242:
        return { text: '概算审核修编', color: 'orange', title: { remark: '说明', date: '修编时间' } }
      case 243:
        return { text: '概算审核退回', color: 'orange', title: { remark: '说明', date: '修编时间' } }
      case 244:
        return { text: '概算审核', color: 'green', title: { remark: '审核备注', date: '审核时间', file: '评估报告' } }
      case 250:
        return { text: '初设批复', color: 'green', title: { remark: '主要建设内容', file: '批复文件' } }
      case 251:
        return { text: '初设批复驳回', color: 'red', title: { remark: '主要建设内容' } }
      case 260:
        return { text: '计划项目', color: 'blue', title: { remark: '说明' } }
      case 300:
        return { text: '在建', color: 'blue' }
      case 310:
        return { text: '在建', color: 'blue' }
      case 320:
        return { text: '开工', color: 'blue' }
      case 330:
        return { text: '在建', color: 'blue' }
      case 340:
        return { text: '完工', color: 'blue' }
        case 360:
        return { text: '完工验收', color: 'blue' }
      case 400:
        return { text: '竣工验收', color: 'blue' }
      case 500:
        return { text: '决算请示', color: 'blue' }
      case 510:
        return { text: '决算批复', color: 'blue' }
      default:
        return { text: status }
    }
  }

  /**
   * 获取st Tags
   *
   * @returns STColumnTag
   */
  getStageTags(): STColumnTag {
    return {
      100: { text: '预备待上报', color: 'green' },
      101: { text: '预储备待审核', color: 'green' },
      102: { text: '预储备驳回', color: 'red' },
      110: { text: '待工可初审', color: 'green' },
      111: { text: '工可初核退回', color: 'red' },
      120: { text: '待评审委托', color: 'green' },
      130: { text: '待技术审查', color: 'green' },
      131: { text: '技术审查退回', color: 'red' },
      132: { text: '技术审查修编', color: 'orange' },
      140: { text: '待估算审核', color: 'green' },
      142: { text: '估算审核修编', color: 'orange' },
      150: { text: '待工可批复', color: 'green' },
      151: { text: '工可批复退回', color: 'red' },
      160: { text: '储备项目', color: 'blue' },
      200: { text: '待初设上报', color: 'green' },
      210: { text: '待初设初审', color: 'green' },
      211: { text: '初设初审驳回', color: 'red' },
      220: { text: '待评审委托', color: 'green' },
      230: { text: '待技术审查', color: 'green' },
      232: { text: '技术审查修编', color: 'orange' },
      233: { text: '待技术审查', color: 'green' },
      240: { text: '待概算审核', color: 'green' },
      242: { text: '概算审核修编', color: 'orange' },
      250: { text: '待初设批复', color: 'green' },
      251: { text: '初设批复驳回', color: 'red' },
      260: { text: '正式项目', color: 'blue' },
      300: { text: '在建', color: 'blue' },
      310: { text: '在建', color: 'blue' },
      320: { text: '开工', color: 'blue' },
      330: { text: '在建', color: 'blue' },
      340: { text: '完工', color: 'blue' },
      360: { text: '完工验收', color: 'blue' },
      400: { text: '竣工验收', color: 'blue' },
      500: { text: '决算请示', color: 'blue' },
      510: { text: '决算批复', color: 'blue' }
    }
  }

  /**
   * 菜单切换方法
   *
   * @param item 菜单信息
   */
  menuChanged(item: { label: string; value: string }) {
    window.sessionStorage.setItem('menuKey', JSON.stringify(item))
    this.menuSrv.add([
      // {
      //   text: '首页',
      //   group: false,
      //   hideInBreadcrumb: true,
      //   children: [JSON.parse(`${window.sessionStorage.getItem('menu')}`).homePage]
      // },
      JSON.parse(`${window.sessionStorage.getItem('menu')}`)[item.value]
        ? JSON.parse(`${window.sessionStorage.getItem('menu')}`)[item.value]
        : {
            text: item.label,
            group: false,
            hideInBreadcrumb: true,
            children: []
          }
    ])
  }
}
