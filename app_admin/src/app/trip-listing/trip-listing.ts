import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card';

import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {

  trips!: Trip[];
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authenticationService: Authentication
  ) {
    console.log('trip-listing constructor');
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  // Called by a trip-card after it deletes its trip
  public onTripDeleted(tripCode: string): void {
    this.trips = this.trips.filter(t => t.code !== tripCode);
    this.message = 'There are ' + this.trips.length + ' trips available.';
    console.log(this.message);
    this.cdr.markForCheck();
  }

  private getStuff(): void {
    this.tripDataService.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips = value;
          if (value.length > 0) {
            this.message = 'There are ' + value.length + ' trips available.';
          }
          else {
            this.message = 'There were no trips retrieved from the database';
          }
          console.log(this.message);
          // Angular 22 is zoneless: tell it the data changed so the cards render
          this.cdr.markForCheck();
        },
        error: (error: any) => {
          console.error('Error loading trips:', error.status, error.statusText, error.message);
        }
      })
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
