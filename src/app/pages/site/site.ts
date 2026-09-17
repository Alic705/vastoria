import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface PropertyItem {
  id: number;
  title: string;
  category: 'residential' | 'commercial' | 'luxury' | 'apartment';
  location: string;
  city: string;
  price: number;
  priceType: 'sale' | 'rent';
  rentPerMonth: number;
  rentPerYear: number;
  yieldRate: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  badge: string;
  rating: number;
  verified: boolean;
  features: string[];
}

export interface ServiceItem {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  statLabel: string;
  statValue: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  propertiesCount: string;
  rating: number;
  location: string;
}

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './site.html',
  styleUrl: './site.css',
})
export class Site {
  // Scroll Helpers (Clean URL without #hash tags)
  scrollToTop(event?: Event) {
    if (event) event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToSection(sectionId: string, event?: Event) {
    if (event) event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Mobile Menu State
  isMobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((val) => !val);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  // Hero Search Filter State
  searchTab = signal<'rent' | 'buy' | 'manage'>('rent');
  selectedCity = signal<string>('all');
  selectedType = signal<string>('all');
  budgetRange = signal<string>('all');

  setSearchTab(tab: 'rent' | 'buy' | 'manage') {
    this.searchTab.set(tab);
  }

  // Active Category Filter for Properties
  activePropertyFilter = signal<string>('all');

  setPropertyFilter(filter: string) {
    this.activePropertyFilter.set(filter);
  }

  // Properties Data (Dubai UAE Localized Real Data)
  properties = signal<PropertyItem[]>([
    {
      id: 1,
      title: 'Opera Grand Luxury Executive Suite',
      category: 'luxury',
      location: 'Opera District, Downtown Dubai',
      city: 'Downtown Dubai',
      price: 2850000,
      priceType: 'sale',
      rentPerMonth: 13750,
      rentPerYear: 165000,
      yieldRate: 7.1,
      beds: 2,
      baths: 3,
      sqft: 1380,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      badge: 'RERA Verified',
      rating: 4.9,
      verified: true,
      features: ['Burj Khalifa View', '24/7 Concierge', 'Infinity Pool', 'Direct Mall Access']
    },
    {
      id: 2,
      title: 'Marina Gate Waterfront Residence',
      category: 'apartment',
      location: 'Dubai Marina Walk, Dubai Marina',
      city: 'Dubai Marina',
      price: 1650000,
      priceType: 'rent',
      rentPerMonth: 9580,
      rentPerYear: 115000,
      yieldRate: 7.6,
      beds: 1,
      baths: 2,
      sqft: 890,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      badge: 'Ejari Compliant',
      rating: 4.8,
      verified: true,
      features: ['Yacht Club Views', 'Squash Court', 'Dual Gym & Spa', 'Valet Parking']
    },
    {
      id: 3,
      title: 'Frond M Beachfront Luxury Villa',
      category: 'luxury',
      location: 'Frond M, Palm Jumeirah',
      city: 'Palm Jumeirah',
      price: 8500000,
      priceType: 'sale',
      rentPerMonth: 31660,
      rentPerYear: 380000,
      yieldRate: 6.4,
      beds: 4,
      baths: 5,
      sqft: 4850,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      badge: 'Exclusive Beachfront',
      rating: 5.0,
      verified: true,
      features: ['Private Beach Access', 'Infinity Pool', 'Smart Automation', 'Private Dock']
    },
    {
      id: 4,
      title: 'Peninsula Executive Studio Suite',
      category: 'apartment',
      location: 'Waterfront District, Business Bay',
      city: 'Business Bay',
      price: 950000,
      priceType: 'rent',
      rentPerMonth: 6250,
      rentPerYear: 75000,
      yieldRate: 8.2,
      beds: 1,
      baths: 1,
      sqft: 540,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      badge: 'High Yield Studio',
      rating: 4.9,
      verified: true,
      features: ['Dubai Canal Views', 'Co-Working Lounge', 'EV Charging', 'Metro Access']
    },
    {
      id: 5,
      title: 'Sidra Contemporary Park Villa',
      category: 'residential',
      location: 'Sidra 2, Dubai Hills Estate',
      city: 'Dubai Hills Estate',
      price: 5200000,
      priceType: 'sale',
      rentPerMonth: 24160,
      rentPerYear: 290000,
      yieldRate: 6.8,
      beds: 4,
      baths: 4.5,
      sqft: 4200,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      badge: 'Prime Family Community',
      rating: 4.8,
      verified: true,
      features: ['Golf Course Views', 'Landscaped Garden', 'Championship Golf', 'King\'s College Nearby']
    },
    {
      id: 6,
      title: 'Sadaf Beachfront Skyline Apartment',
      category: 'apartment',
      location: 'Sadaf 4, Jumeirah Beach Residence (JBR)',
      city: 'JBR',
      price: 3100000,
      priceType: 'rent',
      rentPerMonth: 16250,
      rentPerYear: 195000,
      yieldRate: 7.3,
      beds: 3,
      baths: 3.5,
      sqft: 1920,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      badge: 'The Walk JBR',
      rating: 4.8,
      verified: true,
      features: ['Full Sea Views', 'Direct Beach Access', 'Olympic Swimming Pool', 'Covered Parking']
    }
  ]);

  // Filtered Properties Computation
  filteredProperties = computed(() => {
    const filter = this.activePropertyFilter();
    const list = this.properties();
    if (filter === 'all') return list;
    return list.filter((p) => p.category === filter);
  });

  // Selected Property for Quick View Modal
  selectedProperty = signal<PropertyItem | null>(null);

  openPropertyModal(property: PropertyItem) {
    this.selectedProperty.set(property);
  }

  closePropertyModal() {
    this.selectedProperty.set(null);
  }

  // Interactive Rental Yield Calculator Signals (Dubai Market Defaults in AED)
  calcPropertyValue = signal<number>(2500000);
  calcMonthlyRent = signal<number>(15000);
  calcOccupancy = signal<number>(96);
  calcMgmtFeePercent = signal<number>(7.5);

  // Computed Yield Calculations
  annualGrossIncome = computed(() => {
    const rent = this.calcMonthlyRent();
    const occ = this.calcOccupancy() / 100;
    return Math.round(rent * 12 * occ);
  });

  annualMgmtFee = computed(() => {
    const gross = this.annualGrossIncome();
    const feePct = this.calcMgmtFeePercent() / 100;
    return Math.round(gross * feePct);
  });

  netAnnualPayout = computed(() => {
    return this.annualGrossIncome() - this.annualMgmtFee();
  });

  grossYieldPct = computed(() => {
    const val = this.calcPropertyValue();
    if (!val || val <= 0) return 0;
    const gross = this.annualGrossIncome();
    return parseFloat(((gross / val) * 100).toFixed(2));
  });

  netYieldPct = computed(() => {
    const val = this.calcPropertyValue();
    if (!val || val <= 0) return 0;
    const net = this.netAnnualPayout();
    return parseFloat(((net / val) * 100).toFixed(2));
  });

  // Key Management Services List (Dubai Real Estate Framework)
  services = signal<ServiceItem[]>([
    {
      icon: 'ri-user-search-line',
      title: 'Tenant Vetting & Ejari Registration',
      subtitle: 'Dubai Land Department (DLD) Compliant',
      description: 'Rigorous 5-point tenant screening including UAE Residency Visa verification, Emirates ID checks, salary certificates, and automated Ejari tenancy registration.',
      highlights: ['99.6% On-Time Cheque Clearance', 'Instant Ejari Contract Issuance', 'RERA Compliant Leases'],
      statLabel: 'Screening Time',
      statValue: '< 24 Hours'
    },
    {
      icon: 'ri-bank-card-line',
      title: 'Automated Rent & Cheque Management',
      subtitle: 'Post-Dated Cheque Escrow & Payouts',
      description: 'Secure processing of Dubai post-dated cheques and direct UAE bank transfers with automated landlord monthly payouts on the 1st of every month.',
      highlights: ['Direct Owner Bank Deposit (AED)', 'Zero Cheque Bouncing Guarantee', 'Multi-Currency Landlord Payouts'],
      statLabel: 'Collection Rate',
      statValue: '99.8%'
    },
    {
      icon: 'ri-tools-line',
      title: '24/7 Facility & Maintenance Care',
      subtitle: 'Licensed Dubai Maintenance Contracting',
      description: 'Round-the-clock emergency support for air conditioning, plumbing, and electrical. Vetted insured Dubai contractors dispatch at pre-approved rates.',
      highlights: ['24/7 AC & Chiller Emergency Team', 'Pre-Negotiated Bulk Contractor Rates', 'Digital Move-In/Move-Out Snagging'],
      statLabel: 'Avg Response',
      statValue: '18 Mins'
    },
    {
      icon: 'ri-scales-3-line',
      title: 'RERA Legal & Rental Committee Shield',
      subtitle: 'Legal Regulation Protection',
      description: 'Full legal protection under RERA rental index guidelines, rent increase calculator enforcement, dispute resolution committee filing, and eviction notice management.',
      highlights: ['RERA Rent Index Compliance', 'Escrow Account Protection', 'Tenancy Contract Renewal'],
      statLabel: 'Legal Security',
      statValue: '100% Covered'
    },
    {
      icon: 'ri-bar-chart-box-line',
      title: 'Real-Time Financial Portal',
      subtitle: 'Transparent Owner Dashboard',
      description: 'Access real-time statements, VAT tax reporting, occupancy analytics, maintenance receipts, and quarterly yield reports directly from mobile or desktop.',
      highlights: ['Automated UAE VAT Reports', 'Real-Time Revenue Analytics', 'Exportable PDF Statements'],
      statLabel: 'Portal Uptime',
      statValue: '99.9%'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Property Yield Optimization',
      subtitle: 'Dynamic Dubai Market Pricing AI',
      description: 'Continuous market analysis against active MLS listings and DLD transactions to optimize annual rental rates and achieve peak 96%+ occupancy.',
      highlights: ['AI Dubai Market Rent Pricing', 'Annual Asset Valuations', 'Short-Stay vs Long-Stay Strategy'],
      statLabel: 'ROI Increase',
      statValue: '+18.5% Avg'
    }
  ]);

  // How It Works Steps
  activeProcessTab = signal<'landlord' | 'tenant'>('landlord');

  setProcessTab(tab: 'landlord' | 'tenant') {
    this.activeProcessTab.set(tab);
  }

  // Testimonials List (Dubai Real Estate Landlord Reviews)
  testimonials = signal<TestimonialItem[]>([
    {
      id: 1,
      name: 'Tariq Al-Mansoor',
      role: 'Emirati Property Investor',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
      content: 'Vastoria completely transformed how I manage my 8 luxury apartments across Downtown Dubai and Dubai Marina. They handle automated Ejari registration, tenant background checks, and annual post-dated cheque clearances seamlessly. My net rental yield increased by 1.8% in the first year.',
      propertiesCount: '8 Prime Dubai Units',
      rating: 5,
      location: 'Downtown Dubai & Marina'
    },
    {
      id: 2,
      name: 'Sarah Jenkins',
      role: 'UK Expat Investor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      content: 'As an overseas landlord living in London, managing my Palm Jumeirah and Business Bay villas was a constant headache until I partnered with Vastoria. Monthly rent deposits land directly in my UAE bank account on the 1st of every month without fail, and maintenance issues are handled 24/7.',
      propertiesCount: '4 Palm & Bay Villas',
      rating: 5,
      location: 'Palm Jumeirah & Business Bay'
    },
    {
      id: 3,
      name: 'Vikram Shah',
      role: 'Institutional Portfolio Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      content: 'Their RERA compliance team and dynamic AI pricing engine are outstanding. They ensured our 12 units in Dubai Hills Estate and JBR remained at 98% occupancy while staying fully aligned with official RERA rental index guidelines. Highly recommended for serious UAE property investors.',
      propertiesCount: '12 Units Managed',
      rating: 5,
      location: 'Dubai Hills & JBR'
    }
  ]);

  // Lead Capture / Proposal Request Form Model
  proposalForm = {
    fullName: '',
    email: '',
    phone: '',
    propertyType: 'Residential',
    propertyAddress: '',
    unitsCount: 1,
    estimatedRent: ''
  };

  proposalSubmitted = signal<boolean>(false);

  submitProposal(event: Event) {
    event.preventDefault();
    if (!this.proposalForm.fullName || !this.proposalForm.email) {
      alert('Please provide your name and email address.');
      return;
    }
    this.proposalSubmitted.set(true);
  }

  resetProposal() {
    this.proposalForm = {
      fullName: '',
      email: '',
      phone: '',
      propertyType: 'Residential',
      propertyAddress: '',
      unitsCount: 1,
      estimatedRent: ''
    };
    this.proposalSubmitted.set(false);
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
}
