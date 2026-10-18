import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCardComponent implements OnInit {

  @Input('trip') trip: any;
  @Output() deleted = new EventEmitter<string>();

  constructor(
    private router: Router,
    private tripDataService: TripDataService,
    private authenticationService: Authentication
  ) { }

  ngOnInit(): void {
  }

  // Seed data stores images as "images/reef1.jpg", while trips added in the
  // admin app store just "reef1.jpg". Strip any folder so both resolve to
  // the files in public/assets/images.
  public get imageUrl(): string {
    const file = (this.trip?.image || '').split('/').pop();
    return 'assets/images/' + file;
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  public deleteTrip(trip: Trip) {
    if (!confirm('Delete trip ' + trip.name + ' (' + trip.code + ')?')) {
      return;
    }
    this.tripDataService.deleteTrip(trip.code)
      .subscribe({
        next: (value: any) => {
          console.log('Deleted trip: ' + trip.code);
          // Tell the trip-listing component so it can remove this card
          this.deleted.emit(trip.code);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }
}
