import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-valuation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './valuation.html',
  styleUrl: './valuation.css'
})
export class ValuationComponent {
  private router = inject(Router);
  isMobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  navigateToSection(sectionId: string, event?: Event) {
    if (event) event.preventDefault();
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    });
  }

  // Valuation Form Data (Dubai Market)
  valuationForm = {
    fullName: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    propertyAddress: '',
    city: 'Downtown Dubai',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1350,
    currentRent: '',
    occupancyStatus: 'Vacant',
    additionalDetails: ''
  };

  formSubmitted = signal<boolean>(false);

  submitValuation(event: Event) {
    event.preventDefault();
    if (!this.valuationForm.fullName || !this.valuationForm.email || !this.valuationForm.propertyAddress) {
      alert('Please fill out your name, email, and property address.');
      return;
    }
    this.formSubmitted.set(true);
  }

  resetForm() {
    this.valuationForm = {
      fullName: '',
      email: '',
      phone: '',
      preferredContact: 'email',
      propertyAddress: '',
      city: 'Downtown Dubai',
      propertyType: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1350,
      currentRent: '',
      occupancyStatus: 'Vacant',
      additionalDetails: ''
    };
    this.formSubmitted.set(false);
  }

  // Newsletter Form State
  newsletterEmail = signal<string>('');
  newsletterSubscribed = signal<boolean>(false);

  subscribeNewsletter(event: Event) {
    event.preventDefault();
    if (this.newsletterEmail()) {
      this.newsletterSubscribed.set(true);
      setTimeout(() => {
        this.newsletterSubscribed.set(false);
        this.newsletterEmail.set('');
      }, 4000);
    }
  }

  // Active FAQ accordion item
  activeFaq = signal<number | null>(0);

  toggleFaq(index: number) {
    if (this.activeFaq() === index) {
      this.activeFaq.set(null);
    } else {
      this.activeFaq.set(index);
    }
  }
}
