import { DOCUMENT } from '@angular/common'
import { Inject, Injectable } from '@angular/core'
import { dateTimePickerUtil } from '@delon/util'
@Injectable({
  providedIn: 'root'
})
export class GeneralFunctionService {
  constructor(@Inject(DOCUMENT) private doc: any) {}

  /**
   * 字符串截取并加省略号
   *
   * @param str 需要截取的字符串
   * @param size 截取的长度
   * @returns 截取后的字符串
   */
  truncate(str: string, size: number) {
    return str.length > size ? `${str.slice(0, size)}...` : str
  }

  /**
   * 文件下载
   *
   * @param file 文件buffer流
   * @param name 文件名称
   * @param type 文件类型
   */
  downloadFile(file: any, name: string, type: string) {
    const blob = new Blob([file], { type })
    const link = this.doc.createElement('a')
    const body = this.doc.querySelector('body')
    link.href = window.URL.createObjectURL(blob) // 创建对象url
    link.download = `${name}.xlsx`
    link.style.display = 'none'
    body.appendChild(link)
    link.click()
    body.removeChild(link)
    window.URL.revokeObjectURL(link.href)
  }

  /**
   * 获取某月的第一天和最后一天
   *
   * @param value 日期（'2022-06'/'2022-06-23'）
   * @returns
   */
  getMonthStartAndEnd(value: string): { start: string; end: string } {
    const date = new Date(value)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const start = dateTimePickerUtil.format(new Date(year, month - 1, 1), 'yyyy-MM-dd')
    const end = dateTimePickerUtil.format(new Date(year, month, 0), 'yyyy-MM-dd')
    return { start, end }
  }

  /**
   * 获取一个区间的起始日期，比如距离2022年6月28日的{begin}到{end}月
   *
   * @param value 日期（new Date()）
   * @param begin 开始
   * @param finish 结束
   * @returns
   */
  getMonthRange(value: Date, begin: number, finish?: number) {
    const year = value.getFullYear()
    const month = value.getMonth()
    const day = value.getDate()
    const start = dateTimePickerUtil.format(new Date(year, month - begin, day), 'yyyy-MM-dd')
    let end = ''
    if (finish) {
      end = dateTimePickerUtil.format(new Date(year, month - finish, day), 'yyyy-MM-dd')
      return { start: end, end: start }
    } else {
      return { start }
    }
  }
}
