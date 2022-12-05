import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  constructor(private router: Router) {}

  get localPath() {
    return this.router.url
  }

  goToHome() {}

  goToLogin() {
    setTimeout(() => {
      this.router.navigateByUrl('/passport/login')
    }, 0)
  }

  goTo(path: string) {
    setTimeout(() => {
      this.router.navigateByUrl(path)
    }, 0)
  }
}
