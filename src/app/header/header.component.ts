import { Subscription } from 'rxjs';
import { AuthServiceService } from './../auth/auth-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(
    private dataSerivce: DataStorageService,
    private AuthService: AuthServiceService
  ) {}
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  ngOnInit(): void {
    this.userSub = this.AuthService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
  }
  onSaveData() {
    this.dataSerivce.storeRecipes();
  }
  onFetchData() {
    this.dataSerivce.fetchRecipe().subscribe();
  }
  onLogout() {
    this.AuthService.logout();
  }
}
