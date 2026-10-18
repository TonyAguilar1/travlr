import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlTree } from '@angular/router';
import { authGuard } from './auth-guard';
import { Authentication } from '../services/authentication';

describe('authGuard', () => {
  let loggedIn = false;

  const runGuard = () =>
    TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: Authentication, useValue: { isLoggedIn: () => loggedIn } }
      ]
    });
  });

  it('allows access when logged in', () => {
    loggedIn = true;
    expect(runGuard()).toBe(true);
  });

  it('redirects to /login when logged out', () => {
    loggedIn = false;
    const result = runGuard() as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(result)).toBe('/login');
  });
});
