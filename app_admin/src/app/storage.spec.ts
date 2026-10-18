import { TestBed } from '@angular/core/testing';
import { BROWSER_STORAGE } from './storage';

describe('BROWSER_STORAGE', () => {
  it('should provide localStorage', () => {
    expect(TestBed.inject(BROWSER_STORAGE)).toBe(localStorage);
  });
});
