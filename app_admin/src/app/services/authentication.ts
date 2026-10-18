import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class Authentication {

  // Setup our storage and service access
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  // Variable to handle Authentication Responses
  authResp: AuthResponse = new AuthResponse();

  // Get our token from our Storage provider.
  // NOTE: For this application, we have decided that we will name the key
  // for our token 'travlr_token' and store it in the browser's localStorage
  public getToken(): string {
    const out = this.storage.getItem('travlr_token');
    // Make sure we return a string, even if the token is null
    return out ? out : '';
  }

  // Store our token in our Storage provider
  public saveToken(token: string): void {
    this.storage.setItem('travlr_token', token);
  }

  // Logout the user by removing the token from our Storage provider
  public logout(): void {
    this.storage.removeItem('travlr_token');
  }

  // Boolean to determine if the user is logged in or not
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  // Retrieve the current user from the token stored in our Storage provider
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  // Login method that leverages the TripDataService to authenticate the user
  // and store the token in our Storage provider
  public login(user: User, password: string): void {
    this.tripDataService.login(user, password)
      .subscribe({
        next: (value: any) => {
          if (value) {
            console.log(value);
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.error('Error during login:', error);
        }
      });
  }

  // Register method that leverages the TripDataService to register the user
  // and store the token in our Storage provider
  public register(user: User, password: string): void {
    this.tripDataService.register(user, password)
      .subscribe({
        next: (value: any) => {
          if (value) {
            console.log(value);
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.error('Error during registration:', error);
        }
      });
  }
}
