import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { _HttpClient } from '@delon/theme'
type PerMissionOption = Record<string, Record<string, string>>
@Injectable({
  providedIn: 'root'
})
export class PerMissionService {
  static acl: PerMissionOption = {}
  private permission: PerMissionOption = {}
  constructor(private route: Router) {}

  setPermission(acl: PerMissionOption) {
    this.permission = PerMissionService.acl = acl || {}
  }

  getMenuAcl(key: string, url?: string) {
    const path = url ? url : this.route.url
    return (this.permission[path] || {})[key] || ''
  }

  static getAcl(path: string, key: string) {
    const record = PerMissionService.acl[path] || {}
    return record[key]
  }
}
