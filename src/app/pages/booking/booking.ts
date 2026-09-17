import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface BookingRecord {
  bookingId: string;
  customerName: string;
  propertyName: string;
  startDate: string;
  endDate: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
  bookings = signal<BookingRecord[]>([
    {
      bookingId: 'BK-1001',
      customerName: 'Sarah Jenkins',
      propertyName: 'Skyline Terrace Executive Suite',
      startDate: '2026-10-01',
      endDate: '2026-10-15',
      status: 'Confirmed'
    },
    {
      bookingId: 'BK-1002',
      customerName: 'David Miller',
      propertyName: 'Oakwood Estate Villa',
      startDate: '2026-10-05',
      endDate: '2026-10-20',
      status: 'Pending'
    },
    {
      bookingId: 'BK-1003',
      customerName: 'Amanda Lopez',
      propertyName: 'Harbor Light Waterfront Loft',
      startDate: '2026-11-01',
      endDate: '2026-11-10',
      status: 'Confirmed'
    }
  ]);

  bookingDialog = signal<boolean>(false);
  isEditMode = signal<boolean>(false);

  currentBooking: BookingRecord = {
    bookingId: '',
    customerName: '',
    propertyName: '',
    startDate: '',
    endDate: '',
    status: 'Pending'
  };

  openBookingDialog() {
    this.isEditMode.set(false);
    this.currentBooking = {
      bookingId: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: '',
      propertyName: '',
      startDate: '',
      endDate: '',
      status: 'Pending'
    };
    this.bookingDialog.set(true);
  }

  closeBookingDialog() {
    this.bookingDialog.set(false);
  }

  editBooking(b: BookingRecord) {
    this.isEditMode.set(true);
    this.currentBooking = { ...b };
    this.bookingDialog.set(true);
  }

  deleteBooking(id: string) {
    this.bookings.update(list => list.filter(b => b.bookingId !== id));
  }

  saveBooking() {
    if (!this.currentBooking.customerName || !this.currentBooking.propertyName) return;

    if (this.isEditMode()) {
      this.bookings.update(list =>
        list.map(b => b.bookingId === this.currentBooking.bookingId ? { ...this.currentBooking } : b)
      );
    } else {
      this.bookings.update(list => [...list, { ...this.currentBooking }]);
    }
    this.closeBookingDialog();
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Confirmed': return 'bg-success-subtle text-success border-success-subtle';
      case 'Pending': return 'bg-warning-subtle text-warning border-warning-subtle';
      case 'Cancelled': return 'bg-danger-subtle text-danger border-danger-subtle';
      default: return 'bg-secondary-subtle text-secondary';
    }
  }
}
