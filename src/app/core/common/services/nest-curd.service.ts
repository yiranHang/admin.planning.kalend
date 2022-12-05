import { HttpContext } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { _HttpClient, _HttpHeaders } from '@delon/theme'
import { CreateQueryParams, RequestQueryBuilder } from '@nestjsx/crud-request'
type THttpOption = {
  headers?: _HttpHeaders
  observe: 'body'
  reportProgress?: boolean
  responseType?: 'json'
  withCredentials?: boolean
  context?: HttpContext
}
export enum CurdOrder {
  /**降序 */
  DESC = 'DESC',
  /**升序 */
  ASC = 'ASC'
}
@Injectable({
  providedIn: 'root'
})
export class NestCurdRequest {
  constructor(private http: _HttpClient) {}

  getQuery(params?: CreateQueryParams) {
    return RequestQueryBuilder.create(params).query()
  }

  execGet(url: string, params?: CreateQueryParams | undefined, option?: THttpOption) {
    return this.http.get(this.megreUrl(url, this.getQuery(params)), undefined, option)
  }

  private megreUrl(url: string, query: string) {
    const op = url?.indexOf('?') ? '?' : '&'
    return `${url}${op}${query}`
  }
}
