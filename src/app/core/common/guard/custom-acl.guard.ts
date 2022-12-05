import { Injectable } from '@angular/core'
import { CanLoad, Route, UrlSegment } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class CustomAclGuard {
  async canLoadChildren(router: Route, segments: UrlSegment[]): Promise<boolean> {
    return false
  }
}
