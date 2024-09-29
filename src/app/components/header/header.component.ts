import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { EventBusService } from '../../_shared/event-bus.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  username?: string = '';
  user$ = this.userService.getUserFromToken();
  isAdmin = false;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private eventBusService: EventBusService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(res => {
      this.isLoggedIn = this.storageService.isLoggedIn(); 
    });
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
    this.isAdmin = localStorage.getItem('role')?.includes('ADMIN')|| false;
  }

  ngOnDestroy(): void {
    if (this.eventBusSub) {
      this.eventBusSub.unsubscribe();
    }
  }

  logout(): void {
    this.storageService.logout();
    this.authService.isLoggedIn$.next(false);
    this.router.navigate(['/home']);
  }
}