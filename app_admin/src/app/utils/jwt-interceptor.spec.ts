import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { JwtInterceptor } from './jwt-interceptor';
import { Authentication } from '../services/authentication';

describe('JwtInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let loggedIn = true;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: Authentication, useValue: { isLoggedIn: () => loggedIn, getToken: () => 'abc123' } }
      ]
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('adds the Bearer token to trip requests when logged in', () => {
    loggedIn = true;
    http.get('http://localhost:3000/api/trips').subscribe();
    const req = httpMock.expectOne('http://localhost:3000/api/trips');
    expect(req.request.headers.get('Authorization')).toBe('Bearer abc123');
    req.flush([]);
  });

  it('does not add the token to the login call', () => {
    loggedIn = true;
    http.post('http://localhost:3000/api/login', {}).subscribe();
    const req = httpMock.expectOne('http://localhost:3000/api/login');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('does not add a token when logged out', () => {
    loggedIn = false;
    http.get('http://localhost:3000/api/trips').subscribe();
    const req = httpMock.expectOne('http://localhost:3000/api/trips');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush([]);
  });
});
