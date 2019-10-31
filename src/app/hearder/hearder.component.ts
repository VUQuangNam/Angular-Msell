import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../model/user';

@Component({
    selector: 'app-hearder',
    templateUrl: './hearder.component.html',
    styleUrls: ['./hearder.component.scss']
})
export class HearderComponent implements OnInit {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { this.authenticationService.currentUser.subscribe(x => this.currentUser = x); }

    ngOnInit() {
    }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

}
