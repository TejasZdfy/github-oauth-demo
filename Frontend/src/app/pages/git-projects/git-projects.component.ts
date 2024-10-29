import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { OAuthService } from 'src/app/services/oauth.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ValueGetterParams, RowNode, GridReadyEvent } from 'ag-grid-community';
@Component({
  selector: 'app-git-projects',
  templateUrl: './git-projects.component.html',
  styleUrls: ['./git-projects.component.css']
})
export class GitProjectsComponent {
  userId: any;
  userData: any;
  isConnected: any;
  repoData: any;
  userWiseRepoData: any;
  gridApi: any;
  selectedRepos: Array<{ ownerName: string; repoName: string }> = [];
  columnDefsForRepoData = [
    { field: 'id', headerName: 'Id', sortable: true },
    { field: 'name', headerName: 'Name', sortable: true },
    {
      field: 'html_url',
      headerName: 'Link',
      sortable: true,
      cellRenderer: (params: any) => {
        return `<a href="${params.value}" target="_blank" rel="noopener noreferrer">${params.value}</a>`;
      }
    },
    {
      headerName: 'Slug',
      valueGetter: (params: ValueGetterParams) => `${params.data.owner?.login}/${params.data.name}`,
      cellRenderer: (params: ValueGetterParams) => `${params.data.owner?.login}/${params.data.name}`,
    },
    {
      headerName: 'Included',
      field: 'included',
      checkboxSelection: true,
    }

  ];
  columnDefsForUserWiseData: ColDef[] = [
    { field: 'id', headerName: 'UserId',  sortable: true },
    { field: 'name', headerName: 'User',  sortable: true },
    { field: 'commit', headerName: 'Total Commits', sortable: true},
    { field: 'pullRequests', headerName: 'Total Pull Requests', sortable: true },
    { field: 'issues', headerName: 'Total Issues', sortable: true }
  ];
  constructor(private oauthService: OAuthService,
    private localStorageService: LocalStorageService,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getAllRepos();
  }

  getUserInfo() {
    this.userData = this.sharedDataService.userdata;
    this.isConnected = this.sharedDataService.isConnected;
  }

  getAllRepos() {
    this.oauthService.getGithubRepos(this.userData.userId).subscribe(res => {
      if (res.success) {
        this.repoData = res.data;
      }
      else {
        console.error(res.error);
      }
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onSelectionChanged() {
    const selectedNodes: RowNode[] = this.gridApi.getSelectedNodes();
    this.selectedRepos = selectedNodes.map(node => ({
      ownerName: node.data.owner.login,
      repoName: node.data.name
    }));
    this.oauthService.getUserWiseRepoData(this.selectedRepos, this.userData.userId).subscribe(res => {
      if (res.success) {
        this.userWiseRepoData = res.userWiseRepoData;
      }
    });
  }

}
