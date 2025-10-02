'use client'

import { FileText, CheckCircle, XCircle, CreditCard, Users, AlertTriangle } from 'lucide-react'

const TermsPage = () => {
  return (
    <section className='py-6 lg:py-8'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-sitora-text-subtitle mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl'>Terms & Conditions</h1>
          <p className='text-sitora-body sm:text-md text-sm font-normal'>Last updated: October 1, 2025</p>
        </div>

        {/* Main Content Card */}
        <div className='bg-card border-border rounded-[32px] border p-6 shadow-none sm:p-8 lg:p-10'>
          {/* Introduction */}
          <div className='mb-6'>
            <p className='text-sitora-body text-base leading-relaxed'>Welcome to Sitora Tours. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before making any booking or using our services.</p>
          </div>

          {/* Sections */}
          <div className='space-y-6'>
            {/* Acceptance of Terms */}
            <div className='bg-card border-border rounded-[26px] border p-6 shadow-none'>
              <div className='mb-4 flex items-center gap-3'>
                <div className='bg-sitora-primary-light flex h-10 w-10 items-center justify-center rounded-2xl'>
                  <FileText className='text-sitora-primary h-5 w-5' />
                </div>
                <h2 className='text-sitora-text-subtitle text-xl font-bold'>1. Acceptance of Terms</h2>
              </div>
              <div className='text-sitora-body space-y-3 text-sm leading-relaxed'>
                <p>By using this website and our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should not use our services.</p>
                <p>We reserve the right to modify these terms at any time. Your continued use of our services after changes are posted constitutes acceptance of those changes.</p>
              </div>
            </div>

            {/* Booking and Reservations */}
            <div className='bg-card border-border rounded-[26px] border p-6 shadow-none'>
              <div className='mb-4 flex items-center gap-3'>
                <div className='bg-sitora-primary-light flex h-10 w-10 items-center justify-center rounded-2xl'>
                  <CheckCircle className='text-sitora-primary h-5 w-5' />
                </div>
                <h2 className='text-sitora-text-subtitle text-xl font-bold'>2. Booking and Reservations</h2>
              </div>
              <div className='text-sitora-body space-y-3 text-sm leading-relaxed'>
                <ul className='ml-6 list-disc space-y-2'>
                  <li>All bookings are subject to availability and confirmation</li>
                  <li>A deposit or full payment may be required to confirm your booking</li>
                  <li>Prices are quoted in USD and may be subject to change without notice</li>
                  <li>You must provide accurate and complete information when booking</li>
                  <li>Bookings are confirmed only after receiving payment confirmation</li>
                  <li>Special requests cannot be guaranteed but will be noted</li>
                </ul>
              </div>
            </div>

            {/* Cancellation and Refunds */}
            <div className='bg-card border-border rounded-[26px] border p-6 shadow-none'>
              <div className='mb-4 flex items-center gap-3'>
                <div className='bg-sitora-primary-light flex h-10 w-10 items-center justify-center rounded-2xl'>
                  <XCircle className='text-sitora-primary h-5 w-5' />
                </div>
                <h2 className='text-sitora-text-subtitle text-xl font-bold'>3. Cancellation and Refunds</h2>
              </div>
              <div className='text-sitora-body space-y-3 text-sm leading-relaxed'>
                <p>
                  <strong>Cancellation Policy:</strong>
                </p>
                <ul className='ml-6 list-disc space-y-2'>
                  <li>Cancellations made 30+ days before departure: 100% refund (minus processing fee)</li>
                  <li>Cancellations made 15-29 days before: 50% refund</li>
                  <li>Cancellations made 7-14 days before: 25% refund</li>
                  <li>Cancellations made less than 7 days before: No refund</li>
                  <li>No-shows result in forfeiture of all payments</li>
                </ul>
                <p className='mt-3'>Refunds are processed within 14-21 business days to the original payment method.</p>
              </div>
            </div>

            {/* Payment Terms */}
            <div className='bg-card border-border rounded-[26px] border p-6 shadow-none'>
              <div className='mb-4 flex items-center gap-3'>
                <div className='bg-sitora-primary-light flex h-10 w-10 items-center justify-center rounded-2xl'>
                  <CreditCard className='text-sitora-primary h-5 w-5' />
                </div>
                <h2 className='text-sitora-text-subtitle text-xl font-bold'>4. Payment Terms</h2>
              </div>
              <div className='text-sitora-body space-y-3 text-sm leading-relaxed'>
                <ul className='ml-6 list-disc space-y-2'>
                  <li>We accept major credit cards, debit cards, and bank transfers</li>
                  <li>All prices are in USD unless otherwise stated</li>
                  <li>Payment must be made in full before services are rendered</li>
                  <li>Additional charges may apply for special requests or changes</li>
                  <li>Currency conversion fees may apply for international payments</li>
                </ul>
              </div>
            </div>

            {/* Traveler Responsibilities */}
            <div className='bg-card border-border rounded-[26px] border p-6 shadow-none'>
              <div className='mb-4 flex items-center gap-3'>
                <div className='bg-sitora-primary-light flex h-10 w-10 items-center justify-center rounded-2xl'>
                  <Users className='text-sitora-primary h-5 w-5' />
                </div>
                <h2 className='text-sitora-text-subtitle text-xl font-bold'>5. Traveler Responsibilities</h2>
              </div>
              <div className='text-sitora-body space-y-3 text-sm leading-relaxed'>
                <p>As a traveler, you are responsible for:</p>
                <ul className='ml-6 list-disc space-y-2'>
                  <li>Ensuring you have valid passports and visas</li>
                  <li>Meeting health and vaccination requirements</li>
                  <li>Arriving at meeting points on time</li>
                  <li>Respecting local customs and laws</li>
                  <li>Having appropriate travel insurance</li>
                  <li>Being in good health to participate in activities</li>
                </ul>
              </div>
            </div>

            {/* Liability Limitations */}
            <div className='bg-card border-border rounded-[26px] border p-6 shadow-none'>
              <div className='mb-4 flex items-center gap-3'>
                <div className='bg-sitora-primary-light flex h-10 w-10 items-center justify-center rounded-2xl'>
                  <AlertTriangle className='text-sitora-primary h-5 w-5' />
                </div>
                <h2 className='text-sitora-text-subtitle text-xl font-bold'>6. Liability Limitations</h2>
              </div>
              <div className='text-sitora-body space-y-3 text-sm leading-relaxed'>
                <p>Sitora Tours shall not be liable for:</p>
                <ul className='ml-6 list-disc space-y-2'>
                  <li>Delays, cancellations, or changes due to weather, natural disasters, or force majeure</li>
                  <li>Loss, damage, or theft of personal belongings</li>
                  <li>Personal injury or death not caused by our negligence</li>
                  <li>Actions or omissions of third-party service providers</li>
                  <li>Disruptions caused by political unrest or government actions</li>
                </ul>
                <p className='mt-3'>We strongly recommend purchasing comprehensive travel insurance.</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className='bg-sitora-primary-light mt-6 rounded-[26px] p-6 shadow-none'>
            <h3 className='text-sitora-text-subtitle mb-3 text-lg font-bold'>Questions?</h3>
            <p className='text-sitora-body mb-4 text-sm leading-relaxed'>If you have any questions about these Terms & Conditions, please contact us:</p>
            <div className='text-sitora-body space-y-2 text-sm'>
              <p>
                <span className='font-semibold'>Email:</span>{' '}
                <a href='mailto:info@sitoratours.com' className='text-sitora-primary hover:underline'>
                  info@sitoratours.com
                </a>
              </p>
              <p>
                <span className='font-semibold'>Phone:</span>{' '}
                <a href='tel:+998901234567' className='text-sitora-primary hover:underline'>
                  +998 90 123 4567
                </a>
              </p>
              <p>
                <span className='font-semibold'>Address:</span> Street Davlat Obod, 15, Tashkent, Uzbekistan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TermsPage
