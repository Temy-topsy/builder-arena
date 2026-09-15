import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { Zap, Plus, Trash2, ArrowRight, ArrowLeft, CheckCircle2, Check, AlertTriangle } from 'lucide-react';
import { RegistrationFormData } from '../types';
import { supabase } from '../lib/supabase';

export const RegisterPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applicationRecord, setApplicationRecord] = useState<any>(null);

  const [formData, setFormData] = useState<RegistrationFormData>({
    teamName: '',
    track: 'fintech',
    teamLeadName: '',
    teamLeadEmail: '',
    teamLeadPhone: '',
    university: 'Olabisi Onabanjo University (OOU)',
    department: '',
    memberCount: 1,
    members: [
      { name: '', email: '', role: 'Frontend Developer' },
    ],
    githubPortfolio: '',
    projectIdea: '',
    whySelected: '',
  });

  const handleAddMember = () => {
    if (formData.members.length < 4) {
      setFormData({
        ...formData,
        memberCount: formData.memberCount + 1,
        members: [
          ...formData.members,
          { name: '', email: '', role: 'Backend Developer' },
        ],
      });
    }
  };

  const handleRemoveMember = (idx: number) => {
    if (formData.members.length > 0) {
      const updated = formData.members.filter((_, i) => i !== idx);
      setFormData({
        ...formData,
        memberCount: updated.length + 1,
        members: updated,
      });
    }
  };

  const handleMemberChange = (idx: number, field: string, value: string) => {
    const updated = [...formData.members];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData({ ...formData, members: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const applicationId = `BA2026-APP-${randNum}`;

      const { data, error: insertError } = await supabase
        .from('team_registrations')
        .insert([
          {
            application_id: applicationId,
            team_name: formData.teamName,
            track: formData.track,
            team_lead_name: formData.teamLeadName,
            team_lead_email: formData.teamLeadEmail,
            team_lead_phone: formData.teamLeadPhone,
            matric_number: formData.department,
            department_level: formData.university,
            members: formData.members,
            github_portfolio: formData.githubPortfolio,
            problem_statement: `${formData.projectIdea}\n\nWhy selected: ${formData.whySelected}`,
            status: 'under_review',
          },
        ])
        .select()
        .single();

      if (insertError) {
        throw new Error(insertError.message || 'Failed to submit registration. Please try again.');
      }

      setApplicationRecord(data);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Registration submission error:', err);
      setError(err.message || 'Network error occurred while submitting.');
    } finally {
      setLoading(false);
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
            to="/"
            className="inline-flex items-center gap-1.5 neo-btn-secondary px-4 py-2 text-xs font-mono font-bold uppercase mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO HOME</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="neo-tag">
              BUILDERS ARENA 2026
            </span>
            <span className="neo-tag-accent">
              48-HOUR SPRINT REGISTRATION
            </span>
          </div>

          <div className="inline-block bg-white text-black border-3 border-black px-8 py-3 rounded-md shadow-[6px_6px_0px_#000000]">
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight">
              REGISTER YOUR TEAM
            </h1>
          </div>

          <p className="font-sans font-medium text-sm sm:text-base text-white bg-black px-6 py-2.5 rounded-md border-2 border-black shadow-[4px_4px_0px_#000000]">
            Submit your team details and solution proposal for screening into the top 15 finalist cohort.
          </p>
        </div>

        {submitted ? (
          /* NEO-BRUTALIST APPLICATION RECEIPT */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white text-black border-3 border-black rounded-md p-8 sm:p-12 text-center space-y-6 shadow-[12px_12px_0px_#000000]"
          >
            <div className="w-20 h-20 rounded bg-[#00D9FF] border-3 border-black text-black flex items-center justify-center mx-auto shadow-[4px_4px_0px_#000000]">
              <Check className="w-10 h-10 text-black stroke-[3]" />
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black">
              APPLICATION RECEIVED!
            </h2>

            <p className="font-sans font-normal text-base sm:text-lg text-gray-800 max-w-xl mx-auto leading-relaxed">
              Thank you for applying to <strong className="text-black bg-[#00D9FF] px-1.5 py-0.5 rounded border border-black font-semibold">BUILDERS ARENA 2026</strong>. Your team <strong className="text-black underline font-semibold">{formData.teamName || 'Your Team'}</strong> is registered under the <strong className="text-black uppercase font-semibold">{formData.track}</strong> track.
            </p>

            {/* RECEIPT SLIP */}
            <div className="p-6 rounded bg-gray-50 border-3 border-black text-left max-w-lg mx-auto font-mono text-xs space-y-3 shadow-[6px_6px_0px_#000000]">
              <div className="flex justify-between border-b-2 border-black pb-2">
                <span className="text-gray-600 font-medium">APPLICATION ID:</span>
                <span className="text-black font-bold bg-[#00D9FF] px-2 py-0.5 rounded border border-black">
                  {applicationRecord?.application_id || 'BA2026-APP-PROCESSED'}
                </span>
              </div>
              <div className="flex justify-between border-b-2 border-black pb-2">
                <span className="text-gray-600 font-medium">TEAM LEAD:</span>
                <span className="text-black font-semibold">{formData.teamLeadName}</span>
              </div>
              <div className="flex justify-between border-b-2 border-black pb-2">
                <span className="text-gray-600 font-medium">TOTAL BUILDERS:</span>
                <span className="text-black font-semibold">{formData.members.length + 1} Members</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">SCREENING STATUS:</span>
                <span className="bg-black text-[#00D9FF] px-2 py-0.5 rounded font-bold uppercase">
                  {applicationRecord?.status ? applicationRecord.status.replace('_', ' ') : 'UNDER REVIEW'}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-700 font-sans font-normal">
              Confirmation and screening updates will be sent to <strong className="text-black underline font-semibold">{formData.teamLeadEmail}</strong>.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="neo-btn-primary px-8 py-3.5 text-xs font-display uppercase tracking-wider"
              >
                RETURN HOME
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="neo-btn-secondary px-8 py-3.5 text-xs font-mono uppercase font-bold"
              >
                SUBMIT ANOTHER APPLICATION
              </button>
            </div>
          </motion.div>
        ) : (
          /* NEO-BRUTALIST REGISTRATION FORM */
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 rounded bg-red-100 border-3 border-black text-red-800 font-mono text-xs shadow-[4px_4px_0px_#000000] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-700 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            {/* Step 1: Team & Track Information */}
            <div className="bg-white text-black border-3 border-black rounded-md p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_#000000]">
              <h3 className="font-display font-black text-xl uppercase flex items-center gap-2 border-b-3 border-black pb-4">
                <span className="neo-tag">01</span> TEAM & TRACK SELECTION
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-black uppercase mb-2">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AgriPulse OOU"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded p-3 text-black font-sans text-sm font-normal focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-black uppercase mb-2">
                    Challenge Track *
                  </label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded p-3 text-black font-mono text-sm font-normal focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
                  >
                    <option value="fintech">FINTECH TRACK</option>
                    <option value="agritech">AGRICTECH TRACK</option>
                    <option value="web3">WEB3 TRACK</option>
                    <option value="ai">AI & SOFTWARE TRACK</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Team Lead Info */}
            <div className="bg-white text-black border-3 border-black rounded-md p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_#000000]">
              <h3 className="font-display font-black text-xl uppercase flex items-center gap-2 border-b-3 border-black pb-4">
                <span className="neo-tag">02</span> TEAM LEAD DETAILS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-black uppercase mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mayokun Ademuwagun"
                    value={formData.teamLeadName}
                    onChange={(e) => setFormData({ ...formData, teamLeadName: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded p-3 text-black font-sans text-sm font-semibold focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-black uppercase mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="lead@university.edu.ng"
                    value={formData.teamLeadEmail}
                    onChange={(e) => setFormData({ ...formData, teamLeadEmail: e.target.value })}
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
                    value={formData.teamLeadPhone}
                    onChange={(e) => setFormData({ ...formData, teamLeadPhone: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded p-3 text-black font-sans text-sm font-semibold focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-black uppercase mb-2">
                    University *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Olabisi Onabanjo University (OOU)"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded p-3 text-black font-sans text-sm font-semibold focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono font-black uppercase mb-2">
                    Department & Level *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Computer Science, 400 Level"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded p-3 text-black font-sans text-sm font-semibold focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Additional Team Members */}
            <div className="bg-white text-black border-3 border-black rounded-md p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_#000000]">
              <div className="flex items-center justify-between border-b-3 border-black pb-4">
                <h3 className="font-display font-black text-xl uppercase flex items-center gap-2">
                  <span className="neo-tag">03</span> ADDITIONAL BUILDERS (MAX 4)
                </h3>

                {formData.members.length < 4 && (
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="neo-btn-primary px-3.5 py-2 text-xs font-mono font-extrabold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ADD MEMBER</span>
                  </button>
                )}
              </div>

              {formData.members.map((member, idx) => (
                <div key={idx} className="p-4 rounded bg-gray-50 border-2 border-black space-y-4 shadow-[4px_4px_0px_#000000]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black bg-black text-white px-2.5 py-0.5 rounded border border-black">
                      BUILDER #{idx + 2}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(idx)}
                      className="text-black hover:text-red-600 font-mono text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>REMOVE</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Member Name"
                        value={member.name}
                        onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                        className="w-full bg-white border-2 border-black rounded p-2.5 text-black font-sans text-xs font-semibold focus:shadow-[3px_3px_0px_#000000] focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Member Email"
                        value={member.email}
                        onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                        className="w-full bg-white border-2 border-black rounded p-2.5 text-black font-sans text-xs font-normal focus:shadow-[3px_3px_0px_#000000] focus:outline-none"
                      />
                    </div>
                    <div>
                      <select
                        value={member.role}
                        onChange={(e) => handleMemberChange(idx, 'role', e.target.value)}
                        className="w-full bg-white border-2 border-black rounded p-2.5 text-black font-mono text-xs font-normal focus:shadow-[3px_3px_0px_#000000] focus:outline-none"
                      >
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="UI/UX Designer">UI/UX Designer</option>
                        <option value="Mobile Engineer">Mobile Engineer</option>
                        <option value="AI / ML Engineer">AI / ML Engineer</option>
                        <option value="Product Manager">Product Manager</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Step 4: Project Pitch & Proposal */}
            <div className="bg-white text-black border-3 border-black rounded-md p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_#000000]">
              <h3 className="font-display font-black text-xl uppercase flex items-center gap-2 border-b-3 border-black pb-4">
                <span className="neo-tag">04</span> PROJECT PITCH & PROPOSAL
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-mono font-black uppercase mb-2">
                    GitHub Profile / Team Portfolio Link *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/your-username-or-team"
                    value={formData.githubPortfolio}
                    onChange={(e) => setFormData({ ...formData, githubPortfolio: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded p-3 text-black font-mono text-sm font-normal focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-black uppercase mb-2">
                    Project Idea & Proposed Tech Solution *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe what problem your team is tackling, your tech stack, and what working prototype you will ship in 48 hours."
                    value={formData.projectIdea}
                    onChange={(e) => setFormData({ ...formData, projectIdea: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded p-4 text-black font-sans text-sm font-semibold focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-black uppercase mb-2">
                    Why should your team be selected into the 15 finalist cohort? *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Highlight your team's technical skills, past projects, or unique insights into the problem."
                    value={formData.whySelected}
                    onChange={(e) => setFormData({ ...formData, whySelected: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded p-4 text-black font-sans text-sm font-semibold focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
                  />
                </div>
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
              <Zap className="w-5 h-5 text-black fill-black" />
              <span>{loading ? 'SUBMITTING APPLICATION...' : 'SUBMIT HACKATHON APPLICATION'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
};
