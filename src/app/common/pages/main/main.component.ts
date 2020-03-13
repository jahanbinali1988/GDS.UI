import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/Http';

@Component({
selector: 'app-main',
templateUrl: './main.component.html',
styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    constructor(private router: Router, private http: HttpClient) { }

    ngOnInit() { }

    logOut() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('SamtikPermissions');
        this.router.navigate(['/login']);
    }

    restorePermissions() {
        const result = this.http.post('http://localhost:52212/api/auth/RestoreComponents', null, this.httpOptions);
        result.subscribe(response => {
        });
    }

    isAllowed(actionMenu: string): boolean {
        let result = false;
        if (localStorage.getItem('SamtikPermissions') !== null) {
            const permissions = localStorage.getItem('SamtikPermissions');
            if (permissions !== null) {
                const permisssionsArray = permissions.split(',');
                permisssionsArray.forEach(element => {
                    if (actionMenu === element) {
                        result = true;
                    }
                });
            }
        }
        return result;
    }
}
