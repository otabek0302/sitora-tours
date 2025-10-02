'use client'

import { Shield, Lock, Eye, UserCheck, Bell, Trash2 } from 'lucide-react'

const PrivacyPolicyPage = () => {
  return (
    <section className='py-6 lg:py-8'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-sitora-text-subtitle mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl'>Privacy Policy</h1>
          <p className='text-sitora-body sm:text-md text-sm font-normal'>Last updated: October 1, 2025</p>
        </div>

        {/* Main Content Card */}
        <div className='bg-card border-border rounded-[32px] border p-6 shadow-none sm:p-8 lg:p-10'>
          {/* Introduction */}
          <div className='mb-6'>
            <p className='text-sitora-body text-base leading-relaxed'>At Sitora Tours, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
          </div>

          {/* Sections */}
          <div className='space-y-6'>
            {/* Information We Collect */}
            <div className='bg-card border-border rounded-[26px] border p-6 shadow-none'>
              <div className='mb-4 flex items-center gap-3'>
                <div className='bg-sitora-primary-light flex h-10 w-10 items-center justify-center rounded-2xl'>
                  <Shield className='text-sitora-primary h-5 w-5' />
                </div>
                <h2 className='text-sitora-text-subtitle text-xl font-bold'>1. Information We Collect</h2>
              </div>
              <div className='text-sitora-body space-y-3 text-sm leading-relaxed'>
                <p>We collect information that you provide directly to us, including:</p>
                <ul className='ml-6 list-disc space-y-2'>
                  <li>Name, email address, phone number, and billing information</li>
                  <li>Travel preferences and booking history</li>
                  <li>Payment and transaction information</li>
                  <li>Communications with our customer service team</li>
                  <li>Feedback, reviews, and survey responses</li>
                </ul>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className='bg-card border-border rounded-[26px] border p-6 shadow-none'>
              <div className='mb-4 flex items-center gap-3'>
                <div className='bg-sitora-primary-light flex h-10 w-10 items-center justify-center rounded-2xl'>
                  <Eye className='text-sitora-primary h-5 w-5' />
                </div>
                <h2 className='text-sitora-text-subtitle text-xl font-bold'>2. How We Use Your Information</h2>
              </div>
              <div className='text-sitora-body space-y-3 text-sm leading-relaxed'>
                <p>We use the information we collect to:</p>
                <ul className='ml-6 list-disc space-y-2'>
                  <li>Process your bookings and provide customer support</li>
                  <li>Send booking confirmations and travel-related updates</li>
                  <li>Improve our services and personalize your experience</li>
                  <li>Send promotional offers and marketing communications (with your consent)</li>
                  <li>Comply with legal obligations and prevent fraud</li>
                </ul>
              </div>
            </div>

            {/* Information Sharing */}
            <div className='bg-card border-border rounded-[26px] border p-6 shadow-none'>
              <div className='mb-4 flex items-center gap-3'>
                <div className='bg-sitora-primary-light flex h-10 w-10 items-center justify-center rounded-2xl'>
                  <UserCheck className='text-sitora-primary h-5 w-5' />
                </div>
                <h2 className='text-sitora-text-subtitle text-xl font-bold'>3. Information Sharing</h2>
              </div>
              <div className='text-sitora-body space-y-3 text-sm leading-relaxed'>
                <p>We may share your information with:</p>
                <ul className='ml-6 list-disc space-y-2'>
                  <li>Service providers who assist in our operations (hotels, transport companies)</li>
                  <li>Payment processors to complete transactions</li>
                  <li>Law enforcement when required by law</li>
                  <li>Business partners with your explicit consent</li>
                </ul>
                <p className='mt-3'>We do not sell your personal information to third parties.</p>
              </div>
            </div>

            {/* Data Security */}
            <div className='bg-card border-border rounded-[26px] border p-6 shadow-none'>
              <div className='mb-4 flex items-center gap-3'>
                <div className='bg-sitora-primary-light flex h-10 w-10 items-center justify-center rounded-2xl'>
                  <Lock className='text-sitora-primary h-5 w-5' />
                </div>
                <h2 className='text-sitora-text-subtitle text-xl font-bold'>4. Data Security</h2>
              </div>
              <div className='text-sitora-body space-y-3 text-sm leading-relaxed'>
                <p>We implement appropriate technical and organizational measures to protect your personal information, including:</p>
                <ul className='ml-6 list-disc space-y-2'>
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Secure payment processing through certified providers</li>
                </ul>
              </div>
            </div>

            {/* Your Rights */}
            <div className='bg-card border-border rounded-[26px] border p-6 shadow-none'>
              <div className='mb-4 flex items-center gap-3'>
                <div className='bg-sitora-primary-light flex h-10 w-10 items-center justify-center rounded-2xl'>
                  <Bell className='text-sitora-primary h-5 w-5' />
                </div>
                <h2 className='text-sitora-text-subtitle text-xl font-bold'>5. Your Rights</h2>
              </div>
              <div className='text-sitora-body space-y-3 text-sm leading-relaxed'>
                <p>You have the right to:</p>
                <ul className='ml-6 list-disc space-y-2'>
                  <li>Access and receive a copy of your personal data</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to or restrict certain processing activities</li>
                  <li>Withdraw consent for marketing communications</li>
                  <li>Lodge a complaint with a supervisory authority</li>
                </ul>
              </div>
            </div>

            {/* Data Retention */}
            <div className='bg-card border-border rounded-[26px] border p-6 shadow-none'>
              <div className='mb-4 flex items-center gap-3'>
                <div className='bg-sitora-primary-light flex h-10 w-10 items-center justify-center rounded-2xl'>
                  <Trash2 className='text-sitora-primary h-5 w-5' />
                </div>
                <h2 className='text-sitora-text-subtitle text-xl font-bold'>6. Data Retention</h2>
              </div>
              <div className='text-sitora-body space-y-3 text-sm leading-relaxed'>
                <p>We retain your personal information only for as long as necessary to:</p>
                <ul className='ml-6 list-disc space-y-2'>
                  <li>Provide our services and fulfill bookings</li>
                  <li>Comply with legal and regulatory requirements</li>
                  <li>Resolve disputes and enforce our agreements</li>
                  <li>Maintain business records for accounting purposes</li>
                </ul>
                <p className='mt-3'>After this period, we securely delete or anonymize your data.</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className='bg-sitora-primary-light mt-6 rounded-[26px] p-6 shadow-none'>
            <h3 className='text-sitora-text-subtitle mb-3 text-lg font-bold'>Contact Us</h3>
            <p className='text-sitora-body mb-4 text-sm leading-relaxed'>If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at:</p>
            <div className='text-sitora-body space-y-2 text-sm'>
              <p>
                <span className='font-semibold'>Email:</span>{' '}
                <a href='mailto:privacy@sitoratours.com' className='text-sitora-primary hover:underline'>
                  privacy@sitoratours.com
                </a>
              </p>
              <p>
                <span className='font-semibold'>Phone:</span>{' '}
                <a href='tel:+998915589901' className='text-sitora-primary hover:underline'>
                  +998 91 558 99 01
                </a>
              </p>
              <p>
                <span className='font-semibold'>Address:</span> Mir Said Baraka Street, 1, Tashkent, Uzbekistan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicyPage
