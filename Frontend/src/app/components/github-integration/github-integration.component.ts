import { Component } from '@angular/core';
import { OAuthService } from 'src/app/services/oauth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-github-integration',
  templateUrl: './github-integration.component.html',
  styleUrls: ['./github-integration.component.css']
})
export class GithubIntegrationComponent {
  isConnected = false;
  queryParams: any;
  userId: any;
  userData: any;

  constructor(private oauthService: OAuthService,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserIdFromQueryParam();

    this.userId = this.localStorageService.getUserIdFromLocalStorage();
    this.getUserInfo(this.userId);
  }

  getUserIdFromQueryParam() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      if (this.queryParams.success) {
        this.userId = this.queryParams.id;
        if (this.userId) {
          this.localStorageService.saveUserIdToLocalStorage(this.userId);
          this.getUserInfo(this.userId);
        }
        this.router.navigate(["/"]);
      }
    });
  }

  getUserInfo(userId: any) {
    if (userId) {
      this.checkstatus(userId);
      this.getuserData(userId);
    }
  }

  checkstatus(id: any) {
    this.oauthService.checkGithubUserStatus(id).subscribe(res => {
      this.isConnected = res.isConnected;
    });
  }
  getuserData(id: any) {
    this.oauthService.getGithubUserData(id).subscribe(res => {
      this.userData = res.data;
    });
  }

  connectToGitHub(): void {
    this.oauthService.connectToGithub();
  }

  removeIntegration(): void {
    this.oauthService.removeGithubUser(this.userId).subscribe(res => {
      if (res.success) {
        this.isConnected = false;
        this.userData = null;
        this.localStorageService.removeUserIdFromLocalStorage();
      }
    });
  }

}
