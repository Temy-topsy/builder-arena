import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { Crown, ArrowLeft, ArrowRight, Building, Mail, Phone, Globe, CheckCircle2, ShieldCheck, DollarSign, AlertTriangle } from 'lucide-react';

interface SponsorFormData {
  companyName: string;
  companyWebsite: string;
  industry: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  tier: 'silver' | 'gold' | 'platinum' | 'title' | 'custom';
  contributionType: string[];
  notes: string;
}

export const SponsorApplyPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [proposalRecord, setProposalRecord] = useState<any>(null);

  const [formData, setFormData] = useState<SponsorFormData>({
    companyName: '',
    companyWebsite: '',
    industry: 'Fintech',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    tier: 'gold',
    contributionType: ['Financial Sponsorship', 'API / Tech Integration'],
    notes: '',
  });

  const handleCheckboxChange = (type: string) => {
    if (formData.contributionType.includes(type)) {
      setFormData({
        ...formData,
        contributionType: formData.contributionType.filter((t) => t !== type),
      });
    } else {
      setFormData({
        ...formData,
        contributionType: [...formData.contributionType, type],
      });
    }
  };

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(
      `Builders Arena 2026 Sponsorship Inquiry - ${formData.companyName || 'Brand'} (${formData.tier.toUpperCase()} Tier)`
    );
    const body = encodeURIComponent(
      `Hello OOU Tech Community (OTC) Team,\n\n` +
      `We are interested in partnering with Builders Arena 2026 as a sponsor.\n\n` +
      `SPONSOR DETAILS:\n` +
      `• Company Name: ${formData.companyName}\n` +
      `• Website: ${formData.companyWebsite || 'N/A'}\n` +
      `• Industry: ${formData.industry}\n` +
      `• Selected Tier: ${formData.tier.toUpperCase()} (${getTierPrice(formData.tier)})\n` +
      `• Primary Contact: ${formData.contactName}\n` +
      `• Email: ${formData.contactEmail}\n` +
      `• Phone: ${formData.contactPhone}\n` +
      `• Contribution Interests: ${formData.contributionType.join(', ') || 'Financial Sponsorship'}\n` +
      `• Custom Requests / Goals:\n${formData.notes || 'Looking forward to receiving the sponsorship deck and MOU.'}\n\n` +
      `Best regards,\n${formData.contactName}`
    );
    return `mailto:ooutechcommunity@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const proposalId = `BA2026-SPONSOR-${randNum}`;

      setProposalRecord({
        proposal_id: proposalId,
        ...formData,
        status: 'inquiry_sent',
      });

      const mailtoUrl = generateMailtoUrl();
      window.location.href = mailtoUrl;

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Sponsorship submit error:', err);
      setError('Could not open your email client. You can also email ooutechcommunity@gmail.com directly.');
    } finally {
      setLoading(false);
    }
  };

  const getTierPrice = (tier: string) => {
    switch (tier) {
      case 'silver': return '₦200,000';
      case 'gold': return '₦400,000';
      case 'platinum': return '₦800,000';
      case 'title': return '₦1,500,000';
      default: return 'Custom Partnership';
    }
  };

  return (
    <div className="min-h-screen bg-neo-hero text-black">
      <CustomCursor />
      <Navbar />

      <main className="pt-36 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 space-y-4">
          <Link
            to="/sponsors"
            className="inline-flex items-center gap-1.5 neo-btn-secondary px-4 py-2 text-xs font-mono font-bold uppercase mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>VIEW SPONSORSHIP TIERS</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="neo-tag flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 fill-white" />
              <span>SPONSORSHIP PORTAL</span>
            </span>
            <span className="neo-tag-accent">
              BUILDERS ARENA 2026
            </span>
          </div>

          <div className="inline-block bg-white text-black border-3 border-black px-8 py-3 rounded-md shadow-[6px_6px_0px_#000000]">
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight">
              SPONSOR APPLICATION FORM
            </h1>
          </div>

          <p className="font-sans font-medium text-sm sm:text-base text-white bg-black px-6 py-2.5 rounded-md border-2 border-black shadow-[4px_4px_0px_#000000]">
            Partner with OOU Tech Community to empower 75+ top student developers building real Nigerian tech solutions.
          </p>
        </div>

        {submitted ? (
          /* NEO-BRUTALIST SPONSOR RECEIPT MEMORANDUM */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white text-black border-3 border-black rounded-md p-8 sm:p-12 text-center space-y-6 shadow-[12px_12px_0px_#000000]"
          >
            <div className="w-20 h-20 rounded bg-[#00D9FF] border-3 border-black text-black flex items-center justify-center mx-auto shadow-[4px_4px_0px_#000000]">
              <Crown className="w-10 h-10 text-black fill-black" />
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black">
              SPONSORSHIP PROPOSAL RECEIVED!
            </h2>

            <p className="font-sans font-normal text-base sm:text-lg text-gray-800 max-w-xl mx-auto leading-relaxed">
              Thank you for partnering with <strong className="text-black bg-[#00D9FF] px-1.5 py-0.5 rounded border border-black font-semibold">BUILDERS ARENA 2026</strong>. We have received the sponsorship application for <strong className="text-black underline font-semibold">{formData.companyName || 'Your Brand'}</strong> under the <strong className="text-black uppercase font-semibold">{formData.tier} TIER ({getTierPrice(formData.tier)})</strong>.
            </p>

            {/* RECEIPT SLIP */}
            <div className="p-6 rounded bg-gray-50 border-3 border-black text-left max-w-lg mx-auto font-mono text-xs space-y-3 shadow-[6px_6px_0px_#000000]">
              <div className="flex justify-between border-b-2 border-black pb-2">
                <span className="text-gray-600 font-medium">PROPOSAL ID:</span>
                <span className="text-black font-bold bg-[#00D9FF] px-2 py-0.5 rounded border border-black">
                  {proposalRecord?.proposal_id || 'BA2026-SPONSOR-PROCESSED'}
                </span>
              </div>
              <div className="flex justify-between border-b-2 border-black pb-2">
                <span className="text-gray-600 font-medium">PRIMARY CONTACT:</span>
                <span className="text-black font-semibold">{formData.contactName}</span>
              </div>
              <div className="flex justify-between border-b-2 border-black pb-2">
                <span className="text-gray-600 font-medium">TIER SELECTION:</span>
                <span className="text-black font-bold uppercase">{formData.tier} ({getTierPrice(formData.tier)})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">PARTNERSHIP STATUS:</span>
                <span className="bg-black text-[#00D9FF] px-2 py-0.5 rounded font-bold uppercase">
                  {proposalRecord?.status ? proposalRecord.status.replace('_', ' ') : 'UNDER REVIEW'}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-700 font-sans font-normal">
              Your default email client was opened with your pre-filled inquiry. Our partnership desk will follow up at <strong className="text-black underline font-semibold">{formData.contactEmail}</strong> with full deck details and documentation.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={generateMailtoUrl()}
                className="neo-btn-primary px-8 py-3.5 text-xs font-display uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>OPEN EMAIL APP AGAIN</span>
              </a>

              <a
                href={`https://wa.me/2348061764593?text=${encodeURIComponent(
                  `Hello OTC Team, I just submitted a sponsorship inquiry for ${formData.companyName} (${formData.tier.toUpperCase()} Tier). Looking forward to connecting!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-secondary px-8 py-3.5 text-xs font-mono uppercase font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>CHAT ON WHATSAPP</span>
              </a>

              <Link
                to="/"
                className="bg-black text-white px-8 py-3.5 text-xs font-display uppercase tracking-wider rounded border-2 border-black hover:bg-white hover:text-black transition-colors"
              >
                HOME
              </Link>
            </div>
          </motion.div>
        ) : (
          /* NEO-BRUTALIST SPONSORSHIP APPLICATION FORM */
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 rounded bg-red-100 border-3 border-black text-red-800 font-mono text-xs shadow-[4px_4px_0px_#000000] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-700 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            {/* Step 1: Sponsorship Package Selection */}
            <div className="bg-white text-black border-3 border-black rounded-md p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_#000000]">
              <h3 className="font-display font-black text-xl uppercase flex items-center gap-2 border-b-3 border-black pb-4">
                <span className="neo-tag">01</span> SELECT SPONSORSHIP TIER
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { id: 'silver', name: 'SILVER TIER', price: '₦200,000', desc: 'Logo & mentions' },
                  { id: 'gold', name: 'GOLD TIER', price: '₦400,000', desc: 'Booth + mentor seat' },
                  { id: 'platinum', name: 'PLATINUM TIER', price: '₦800,000', desc: 'Track ownership' },
                  { id: 'title', name: 'TITLE SPONSOR', price: '₦1,500,000', desc: 'Headline partner' },
                  { id: 'custom', name: 'CUSTOM PARTNER', price: 'In-Kind / API', desc: 'Cloud, Swag, Food' },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setFormData({ ...formData, tier: item.id as any })}
                    className={`p-4 rounded border-2 border-black cursor-pointer transition-all ${
                      formData.tier === item.id
                        ? 'bg-[#00D9FF] text-black shadow-[4px_4px_0px_#000000] translate-x-0.5 translate-y-0.5'
                        : 'bg-gray-50 text-black hover:bg-black hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-black uppercase">{item.name}</span>
                      <input
                        type="radio"
                        name="tier"
                        checked={formData.tier === item.id}
                        onChange={() => setFormData({ ...formData, tier: item.id as any })}
                        className="accent-black"
                      />
                    </div>
                    <div className="font-display font-extrabold text-xl">{item.price}</div>
                    <div className="text-[11px] font-sans font-semibold">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Company & Contact Details */}
            <div className="bg-white text-black border-3 border-black rounded-md p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_#000000]">
              <h3 className="font-display font-black text-xl uppercase flex items-center gap-2 border-b-3 border-black pb-4">
                <span className="neo-tag">02</span> COMPANY & CONTACT DETAILS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-black uppercase mb-2">
                    Company / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Paystack / TechCo Africa"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded p-3 text-black font-sans text-sm font-semibold focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-black uppercase mb-2">
                    Company Website / Profile Link *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://yourcompany.com"
                    value={formData.companyWebsite}
                    onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded p-3 text-black font-mono text-sm font-normal focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-black uppercase mb-2">
                    Industry Sector *
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded p-3 text-black font-mono text-sm font-normal focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
                  >
                    <option value="Fintech">Fintech & Payments</option>
                    <option value="Agritech">Agritech & Supply Chain</option>
                    <option value="Web3">Web3 & Blockchain</option>
                    <option value="AI">AI & Machine Learning</option>
                    <option value="Cloud">Cloud & Developer Infrastructure</option>
                    <option value="VC">Venture Capital / Investment</option>
                    <option value="Telecom">Telecom & Energy</option>
                    <option value="Other">Other Sector</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-black uppercase mb-2">
                    Primary Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bisi Onabanjo-Aina"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded p-3 text-black font-sans text-sm font-semibold focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-black uppercase mb-2">
                    Business Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sponsorships@company.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded p-3 text-black font-sans text-sm font-semibold focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-black uppercase mb-2">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded p-3 text-black font-sans text-sm font-semibold focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Engagement & Preferences */}
            <div className="bg-white text-black border-3 border-black rounded-md p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_#000000]">
              <h3 className="font-display font-black text-xl uppercase flex items-center gap-2 border-b-3 border-black pb-4">
                <span className="neo-tag">03</span> ENGAGEMENT & BRANDING PREFERENCES
              </h3>

              <div className="space-y-4">
                <label className="block text-xs font-mono font-black uppercase">
                  How would your organization like to participate? (Select all that apply)
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs font-medium">
                  {[
                    'Financial Sponsorship',
                    'API / SDK Technical Integration',
                    'Developer Workshop / Keynote Presentation',
                    'Judging Panel & Mentor Seat',
                    'In-Kind (Wi-Fi, Power, Swag, Catering)',
                    'Student Talent Recruitment Access',
                  ].map((type) => (
                    <label
                      key={type}
                      className={`flex items-center gap-2.5 p-3 rounded border-2 border-black cursor-pointer transition-all ${
                        formData.contributionType.includes(type)
                          ? 'bg-[#00D9FF] text-black shadow-[3px_3px_0px_#000000]'
                          : 'bg-gray-50 text-black hover:bg-black hover:text-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.contributionType.includes(type)}
                        onChange={() => handleCheckboxChange(type)}
                        className="accent-black"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-black uppercase mb-2">
                  Custom Requirements, API Briefs or Partnership Goals
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us any specific APIs, custom challenge briefs, or recruitment goals your brand has for Builders Arena 2026."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white border-2 border-black rounded p-4 text-black font-sans text-sm font-semibold focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full neo-btn-primary py-5 px-8 text-center text-sm sm:text-base font-display uppercase tracking-wider flex items-center justify-center gap-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <Crown className="w-5 h-5 text-black fill-black" />
              <span>SEND SPONSORSHIP INQUIRY VIA EMAIL</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
};
