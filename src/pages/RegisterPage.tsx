import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import {
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Check,
  AlertTriangle,
  Search,
  Copy,
  CheckCircle2,
  Users,
  ShieldAlert,
  Printer,
  Sparkles,
  Trophy,
  Calendar,
  MapPin,
  Coins
} from 'lucide-react';
import { RegistrationFormData } from '../types';
import { supabase } from '../lib/supabase';

// Helper to normalize phone numbers (e.g. +234 806 176 4593 -> 8061764593)
const normalizePhone = (phone: string) => {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  return digits.slice(-10);
};

export const RegisterPage: React.FC = () => {
  const location = useLocation();

  // Rules & Eligibility screen step
  const [hasSeenRules, setHasSeenRules] = useState(false);

  // Submission state
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applicationRecord, setApplicationRecord] = useState<any>(null);

  // Duplicate / Welcome Back state
  const [isWelcomeBack, setIsWelcomeBack] = useState(false);
  const [welcomeRecord, setWelcomeRecord] = useState<any>(null);
  const [duplicateReason, setDuplicateReason] = useState<string | null>(null);
  const [copiedAppId, setCopiedAppId] = useState(false);

  // Search / Lookup state
  const [showLookup, setShowLookup] = useState(false);
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);

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

  // Check URL parameters for status lookup
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('lookup') === 'true' || location.pathname === '/status' || location.pathname === '/my-team') {
      setShowLookup(true);
      setHasSeenRules(true);
    }
  }, [location]);

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

  const copyApplicationId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedAppId(true);
    setTimeout(() => setCopiedAppId(false), 2500);
  };

  // Lookup existing registration manually
  const handleLookup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = lookupQuery.trim();
    if (!query) return;

    setLookupLoading(true);
    setLookupError(null);

    try {
      const qNorm = query.toLowerCase();
      const qPhone = normalizePhone(query);

      const { data: teams, error: searchError } = await supabase
        .from('team_registrations')
        .select('*');

      if (searchError) throw searchError;

      let found: any = null;
      if (Array.isArray(teams)) {
        for (const t of teams) {
          const appId = (t.application_id || '').toLowerCase();
          const teamName = (t.team_name || '').toLowerCase();
          const leadEmail = (t.team_lead_email || '').toLowerCase();
          const leadPhone = normalizePhone(t.team_lead_phone || '');
          const members: Array<{ email?: string; name?: string }> = Array.isArray(t.members) ? t.members : [];

          if (
            appId === qNorm ||
            teamName === qNorm ||
            leadEmail === qNorm ||
            (qPhone && leadPhone === qPhone) ||
            members.some((m) => (m.email || '').toLowerCase() === qNorm)
          ) {
            found = t;
            break;
          }
        }
      }

      if (found) {
        setWelcomeRecord(found);
        setDuplicateReason(null);
        setIsWelcomeBack(true);
        setShowLookup(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setLookupError('No existing team registration found for that search. You can register your team below!');
      }
    } catch (err: any) {
      console.error('Lookup error:', err);
      setLookupError(err.message || 'Error looking up registration.');
    } finally {
      setLookupLoading(false);
    }
  };

  // Main Form Submission with Duplicate Prevention
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const leadEmailNorm = formData.teamLeadEmail.trim().toLowerCase();
      const leadPhoneNorm = normalizePhone(formData.teamLeadPhone);
      const teamNameNorm = formData.teamName.trim().toLowerCase();

      // 1. In-Form Validations
      const memberEmails = formData.members
        .map((m) => m.email.trim().toLowerCase())
        .filter((em) => em.length > 0);

      // Check if lead email is also entered in members
      if (memberEmails.includes(leadEmailNorm)) {
        throw new Error(
          'Team Lead email cannot be added as a team member. The team lead is already registered as Builder #1.'
        );
      }

      // Check if there are duplicate member emails inside this form
      const uniqueMemberEmails = new Set(memberEmails);
      if (uniqueMemberEmails.size !== memberEmails.length) {
        throw new Error(
          'Duplicate member emails detected in your team list. Each builder must have a unique email address.'
        );
      }

      // 2. Query Existing Registrations for Duplicate Checking
      const { data: existingTeams, error: fetchErr } = await supabase
        .from('team_registrations')
        .select('*');

      if (fetchErr) {
        console.warn('Could not read existing registrations:', fetchErr.message);
      }

      if (Array.isArray(existingTeams) && existingTeams.length > 0) {
        let matchedTeam: any = null;
        let matchReason = '';

        for (const t of existingTeams) {
          const existingTeamName = (t.team_name || '').trim().toLowerCase();
          const existingLeadEmail = (t.team_lead_email || '').trim().toLowerCase();
          const existingLeadPhone = normalizePhone(t.team_lead_phone || '');
          const existingMembers: Array<{ name?: string; email?: string }> = Array.isArray(t.members)
            ? t.members
            : [];

          // 1) Match Team Name
          if (existingTeamName === teamNameNorm) {
            matchedTeam = t;
            matchReason = `The team name "${t.team_name}" is already registered.`;
            break;
          }

          // 2) Match Team Lead Email
          if (existingLeadEmail === leadEmailNorm) {
            matchedTeam = t;
            matchReason = `The email ${formData.teamLeadEmail} is already registered as the Team Lead of team "${t.team_name}".`;
            break;
          }

          // 3) Match Team Lead Phone
          if (leadPhoneNorm && existingLeadPhone && leadPhoneNorm === existingLeadPhone) {
            matchedTeam = t;
            matchReason = `The phone number ${formData.teamLeadPhone} is already registered with team "${t.team_name}".`;
            break;
          }

          // 4) Check if Team Lead email is already in an existing team's members list
          const leadInExistingMembers = existingMembers.find(
            (em) => (em.email || '').trim().toLowerCase() === leadEmailNorm
          );
          if (leadInExistingMembers) {
            matchedTeam = t;
            matchReason = `The email ${formData.teamLeadEmail} is already registered as a builder in team "${t.team_name}".`;
            break;
          }

          // 5) Check if any new team member is already registered in an existing team (as lead or member)
          for (const newM of formData.members) {
            const mEmail = (newM.email || '').trim().toLowerCase();
            if (!mEmail) continue;

            if (existingLeadEmail === mEmail) {
              matchedTeam = t;
              matchReason = `Builder ${newM.name || mEmail} is already registered as the Team Lead of team "${t.team_name}".`;
              break;
            }

            const inExistingMembers = existingMembers.find(
              (em) => (em.email || '').trim().toLowerCase() === mEmail
            );
            if (inExistingMembers) {
              matchedTeam = t;
              matchReason = `Builder ${newM.name || mEmail} is already registered in team "${t.team_name}".`;
              break;
            }
          }

          if (matchedTeam) break;
        }

        // DUPLICATE DETECTED: Block duplicate insert and show Welcome Back page
        if (matchedTeam) {
          setWelcomeRecord(matchedTeam);
          setDuplicateReason(matchReason);
          setIsWelcomeBack(true);
          setLoading(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      // 3. No Duplicate Found: Proceed with Insertion!
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const applicationId = `BA2026-APP-${randNum}`;

      const { data, error: insertError } = await supabase
        .from('team_registrations')
        .insert([
          {
            application_id: applicationId,
            team_name: formData.teamName.trim(),
            track: formData.track,
            team_lead_name: formData.teamLeadName.trim(),
            team_lead_email: leadEmailNorm,
            team_lead_phone: formData.teamLeadPhone.trim(),
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

  const handleProceedFromRules = () => {
    setHasSeenRules(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neo-hero text-black">
      <CustomCursor />
      <Navbar />

      <main className="pt-36 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Header */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 neo-btn-secondary px-4 py-2 text-xs font-sans font-bold uppercase"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO HOME</span>
            </Link>

            {/* Quick Status Lookup Toggle Button */}
            {!isWelcomeBack && !submitted && (
              <button
                type="button"
                onClick={() => {
                  setShowLookup(!showLookup);
                  setLookupError(null);
                }}
                className="inline-flex items-center gap-2 bg-white text-black border-2 border-black px-4 py-2 rounded-md font-sans text-xs font-bold shadow-[3px_3px_0px_#000000] hover:bg-yellow-300 transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{showLookup ? 'HIDE LOOKUP' : 'ALREADY REGISTERED? CHECK STATUS'}</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="neo-tag">BUILDERS ARENA 2026</span>
            <span className="neo-tag-accent">48-HOUR SPRINT REGISTRATION</span>
          </div>

          <div className="inline-block bg-white text-black border-3 border-black px-8 py-3 rounded-md shadow-[6px_6px_0px_#000000]">
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight">
              {isWelcomeBack
                ? 'WELCOME BACK, BUILDER!'
                : submitted
                  ? 'APPLICATION RECEIVED!'
                  : !hasSeenRules
                    ? 'RULES & ELIGIBILITY'
                    : 'REGISTER YOUR TEAM'}
            </h1>
          </div>

          <p className="font-sans font-medium text-xs sm:text-sm text-white bg-black px-6 py-2.5 rounded-md border-2 border-black shadow-[4px_4px_0px_#000000]">
            {isWelcomeBack
              ? 'Our system verified your registration record. Below are your existing application details.'
              : !hasSeenRules
                ? 'Review the participation rules, eligibility requirements, and cash prize details before beginning your application.'
                : 'Submit your team details and solution proposal for screening into the top 15 finalist cohort.'}
          </p>
        </div>

        {/* Quick Lookup Bar */}
        {showLookup && !isWelcomeBack && !submitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-yellow-300 border-3 border-black rounded-md shadow-[6px_6px_0px_#000000] space-y-4"
          >
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-black" />
              <h3 className="font-display font-black text-sm uppercase">
                LOOK UP YOUR EXISTING REGISTRATION
              </h3>
            </div>
            <p className="text-xs font-sans text-gray-900">
              Enter your <strong>Team Lead Email</strong>, <strong>Phone Number</strong>, or <strong>Application ID</strong> (e.g. BA2026-APP-1234) to view your team's application details and screening status.
            </p>
            <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="e.g. temy@example.com or 08012345678"
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                className="flex-1 bg-white border-2 border-black rounded p-3 text-black font-sans text-xs font-semibold focus:shadow-[3px_3px_0px_#000000] focus:outline-none"
              />
              <button
                type="submit"
                disabled={lookupLoading}
                className="neo-btn-primary px-6 py-3 text-xs font-display uppercase tracking-wider flex items-center justify-center gap-2 shrink-0"
              >
                <span>{lookupLoading ? 'SEARCHING...' : 'FIND APPLICATION'}</span>
              </button>
            </form>
            {lookupError && (
              <div className="p-3 bg-red-100 border-2 border-black rounded text-red-800 font-sans text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{lookupError}</span>
              </div>
            )}
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* CASE 1: WELCOME BACK / ALREADY REGISTERED RECEIPT VIEW                    */}
        {/* ========================================================================= */}
        {isWelcomeBack && welcomeRecord ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Duplicate Notice Banner (if triggered by a duplicate attempt) */}
            {duplicateReason && (
              <div className="p-5 rounded-md bg-amber-100 border-3 border-black text-black shadow-[6px_6px_0px_#000000] space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-display font-black text-sm uppercase">
                  <ShieldAlert className="w-5 h-5 text-amber-800" />
                  <span>DUPLICATE SUBMISSION PREVENTED</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-amber-950 font-medium">
                  {duplicateReason}
                </p>
                <p className="font-sans text-xs text-amber-800">
                  To ensure equal opportunity and fair judging, each applicant is strictly limited to <strong>one team</strong> and <strong>one application</strong>. Your existing team record is already stored below.
                </p>
              </div>
            )}

            {/* Application Card */}
            <div className="bg-white text-black border-3 border-black rounded-md p-6 sm:p-10 shadow-[10px_10px_0px_#000000] space-y-8">
              {/* Header inside card */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-3 border-black pb-6">
                <div>
                  <span className="neo-tag mb-2 inline-block">REGISTERED APPLICATION</span>
                  <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-black">
                    {welcomeRecord.team_name}
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-gray-700 mt-1">
                    Track:{' '}
                    <strong className="text-black uppercase bg-[#00D9FF] px-2 py-0.5 rounded border border-black font-bold">
                      {welcomeRecord.track} TRACK
                    </strong>
                  </p>
                </div>

                {/* Screening Status Badge */}
                <div className="sm:text-right space-y-1">
                  <span className="block font-sans text-[11px] font-bold uppercase text-gray-600">
                    SCREENING STATUS
                  </span>
                  <span
                    className={`inline-block px-3 py-1.5 rounded-md border-2 border-black font-sans text-xs font-black uppercase shadow-[3px_3px_0px_#000000] ${
                      welcomeRecord.status === 'approved'
                        ? 'bg-emerald-300 text-black'
                        : welcomeRecord.status === 'rejected'
                        ? 'bg-red-300 text-black'
                        : 'bg-yellow-300 text-black'
                    }`}
                  >
                    {welcomeRecord.status === 'approved'
                      ? 'SELECTED FINALIST (TOP 15)'
                      : welcomeRecord.status === 'rejected'
                      ? 'NOT SELECTED'
                      : 'UNDER REVIEW'}
                  </span>
                </div>
              </div>

              {/* Application ID & Quick Copy */}
              <div className="p-4 bg-gray-50 border-2 border-black rounded-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[4px_4px_0px_#000000]">
                <div>
                  <span className="font-sans text-[11px] text-gray-600 font-bold uppercase block">
                    OFFICIAL APPLICATION ID
                  </span>
                  <span className="font-sans text-lg sm:text-xl font-black text-black">
                    {welcomeRecord.application_id || 'BA2026-APP-ON-FILE'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyApplicationId(welcomeRecord.application_id)}
                  className="neo-btn-secondary px-4 py-2 text-xs font-sans font-bold flex items-center gap-1.5"
                >
                  {copiedAppId ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY ID</span>
                    </>
                  )}
                </button>
              </div>

              {/* Team Lead & University Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-black rounded-md bg-white shadow-[3px_3px_0px_#000000] space-y-2">
                  <span className="font-sans text-[11px] text-gray-600 font-bold uppercase block">
                    TEAM LEAD (BUILDER #1)
                  </span>
                  <div className="font-display font-black text-base text-black">
                    {welcomeRecord.team_lead_name}
                  </div>
                  <div className="font-sans text-xs text-gray-800 space-y-1">
                    <div>
                      <strong>Email:</strong> {welcomeRecord.team_lead_email}
                    </div>
                    <div>
                      <strong>Phone / WhatsApp:</strong> {welcomeRecord.team_lead_phone}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-2 border-black rounded-md bg-white shadow-[3px_3px_0px_#000000] space-y-2">
                  <span className="font-sans text-[11px] text-gray-600 font-bold uppercase block">
                    ACADEMIC INSTITUTION
                  </span>
                  <div className="font-display font-black text-base text-black">
                    {welcomeRecord.department_level || 'Olabisi Onabanjo University'}
                  </div>
                  <div className="font-sans text-xs text-gray-800">
                    <strong>Department / Level:</strong> {welcomeRecord.matric_number || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Team Members List */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-black" />
                  <h4 className="font-display font-black text-sm uppercase">
                    REGISTERED TEAM MEMBERS (
                    {(Array.isArray(welcomeRecord.members) ? welcomeRecord.members.length : 0) + 1} TOTAL)
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
                  {/* Lead builder chip */}
                  <div className="p-3 bg-yellow-100 border-2 border-black rounded shadow-[2px_2px_0px_#000000]">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-black">{welcomeRecord.team_lead_name}</strong>
                      <span className="bg-black text-white px-2 py-0.5 rounded text-[10px] font-bold">
                        LEAD
                      </span>
                    </div>
                    <span className="text-gray-700 text-[11px] block">{welcomeRecord.team_lead_email}</span>
                  </div>

                  {/* Additional members */}
                  {Array.isArray(welcomeRecord.members) &&
                    welcomeRecord.members.map((m: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 bg-gray-50 border-2 border-black rounded shadow-[2px_2px_0px_#000000]"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <strong className="text-black">{m.name || `Builder #${idx + 2}`}</strong>
                          <span className="bg-[#00D9FF] text-black px-2 py-0.5 rounded text-[10px] font-bold border border-black">
                            {m.role || 'Member'}
                          </span>
                        </div>
                        <span className="text-gray-700 text-[11px] block">{m.email || 'No email provided'}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Solution Proposal Preview */}
              {welcomeRecord.problem_statement && (
                <div className="p-4 rounded-md bg-gray-50 border-2 border-black space-y-2">
                  <span className="font-sans text-[11px] text-gray-600 font-bold uppercase block">
                    PROJECT PROPOSAL SUMMARY
                  </span>
                  <p className="font-sans text-xs text-gray-900 whitespace-pre-line leading-relaxed">
                    {welcomeRecord.problem_statement}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t-2 border-black flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="neo-btn-secondary px-5 py-3 text-xs font-sans font-bold flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>PRINT SLIP</span>
                  </button>

                  <a
                    href="https://wa.me/2348061764593"
                    target="_blank"
                    rel="noreferrer"
                    className="neo-btn-primary px-5 py-3 text-xs font-sans font-bold flex items-center gap-1.5"
                  >
                    <span>JOIN OTC COMMUNITY</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsWelcomeBack(false);
                    setWelcomeRecord(null);
                    setDuplicateReason(null);
                    setShowLookup(false);
                  }}
                  className="text-xs font-sans font-bold underline hover:text-[#00D9FF] text-black"
                >
                  Look up another team or start new form →
                </button>
              </div>
            </div>
          </motion.div>
        ) : submitted ? (
          /* ========================================================================= */
          /* CASE 2: BRAND NEW REGISTRATION RECEIPT                                    */
          /* ========================================================================= */
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
              Thank you for applying to{' '}
              <strong className="text-black bg-[#00D9FF] px-1.5 py-0.5 rounded border border-black font-semibold">
                BUILDERS ARENA 2026
              </strong>
              . Your team <strong className="text-black underline font-semibold">{formData.teamName || 'Your Team'}</strong> is registered under the{' '}
              <strong className="text-black uppercase font-semibold">{formData.track}</strong> track.
            </p>

            {/* RECEIPT SLIP */}
            <div className="p-6 rounded bg-gray-50 border-3 border-black text-left max-w-lg mx-auto font-sans text-xs space-y-3 shadow-[6px_6px_0px_#000000]">
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
              Confirmation and screening updates will be sent to{' '}
              <strong className="text-black underline font-semibold">{formData.teamLeadEmail}</strong>.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="neo-btn-primary px-8 py-3.5 text-xs font-display uppercase tracking-wider"
              >
                RETURN HOME
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setIsWelcomeBack(false);
                  setHasSeenRules(false);
                }}
                className="neo-btn-secondary px-8 py-3.5 text-xs font-sans uppercase font-bold"
              >
                VIEW APPLICATION DETAILS
              </button>
            </div>
          </motion.div>
        ) : !hasSeenRules ? (
          /* ========================================================================= */
          /* CASE 3: RULES & ELIGIBILITY SCREEN (INSPIRED BY IMAGE 2 + CASH PRIZES)    */
          /* ========================================================================= */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#EBF4EC] text-black border-3 border-black rounded-lg p-6 sm:p-12 shadow-[12px_12px_0px_#000000] space-y-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Heading & Cash Prize Highlight */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="font-sans font-black text-xs uppercase tracking-wider text-[#165B33] block mb-2">
                    ELIGIBILITY
                  </span>
                  <h2 className="font-display font-black text-3xl sm:text-5xl text-[#0A381E] tracking-tight leading-tight">
                    What every team needs.
                  </h2>
                </div>

                <p className="font-sans font-medium text-xs sm:text-sm text-gray-800 leading-relaxed">
                  Make sure your team satisfies all the requirements below before submitting your official solution proposal.
                </p>

                {/* PROMINENT CASH PRIZES HIGHLIGHT */}
                <div className="bg-yellow-300 text-black border-2 border-black rounded-md p-5 shadow-[5px_5px_0px_#000000] space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-black text-yellow-300 flex items-center justify-center font-bold">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <span className="font-display font-black text-sm uppercase tracking-tight">
                      CASH PRIZES & GRANTS
                    </span>
                  </div>
                  <p className="font-sans text-xs font-semibold leading-relaxed text-gray-900">
                    Winners will take home substantial <strong className="underline">cash prizes</strong>, cloud credits, venture incubation support, and direct investor pitch opportunities!
                  </p>
                </div>

                {/* Event Highlights & Venue */}
                <div className="p-4 bg-white border-2 border-black rounded-md shadow-[4px_4px_0px_#000000] space-y-3 font-sans text-xs">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#165B33] shrink-0" />
                    <div>
                      <strong className="text-black block">Virtual Sprint:</strong>
                      <span className="text-gray-700">18th November 2026</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#165B33] shrink-0" />
                    <div>
                      <strong className="text-black block">Physical Grand Finale:</strong>
                      <span className="text-gray-700">19th – 20th November 2026</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#165B33] shrink-0" />
                    <div>
                      <strong className="text-black block">Physical Venue:</strong>
                      <span className="text-gray-700">OOU Tech Hub, ICT Building, OOU</span>
                    </div>
                  </div>
                </div>

                {/* Desktop Action Button */}
                <div className="hidden lg:block pt-2">
                  <button
                    type="button"
                    onClick={handleProceedFromRules}
                    className="w-full neo-btn-primary py-4 px-6 text-xs sm:text-sm font-display uppercase tracking-wider flex items-center justify-center gap-2 bg-black text-white hover:bg-[#165B33] transition-colors"
                  >
                    <span>PROCEED TO APPLICATION</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Numbered Eligibility Checklist */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Item 1 */}
                <div className="flex items-start gap-4 p-3.5 bg-white border-2 border-black rounded-md shadow-[3px_3px_0px_#000000]">
                  <div className="w-8 h-8 rounded-full bg-[#165B33] text-white flex items-center justify-center font-display font-black text-xs shrink-0 border border-black">
                    1
                  </div>
                  <div className="font-sans text-xs sm:text-sm">
                    <strong className="text-black block font-bold">Open to OOU Students (OOUites)</strong>
                    <span className="text-gray-700 font-normal leading-relaxed">
                      For teams with students from other tertiary institutions, at least one active member must be an OOU student.
                    </span>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-4 p-3.5 bg-white border-2 border-black rounded-md shadow-[3px_3px_0px_#000000]">
                  <div className="w-8 h-8 rounded-full bg-[#165B33] text-white flex items-center justify-center font-display font-black text-xs shrink-0 border border-black">
                    2
                  </div>
                  <div className="font-sans text-xs sm:text-sm">
                    <strong className="text-black block font-bold">Must Participate as a Team</strong>
                    <span className="text-gray-700 font-normal leading-relaxed">
                      Minimum of <strong>2</strong> and maximum of <strong>5</strong> builders per team. Individual (solo) submissions are not eligible.
                    </span>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-4 p-3.5 bg-white border-2 border-black rounded-md shadow-[3px_3px_0px_#000000]">
                  <div className="w-8 h-8 rounded-full bg-[#165B33] text-white flex items-center justify-center font-display font-black text-xs shrink-0 border border-black">
                    3
                  </div>
                  <div className="font-sans text-xs sm:text-sm">
                    <strong className="text-black block font-bold">Substantial Cash Prizes & Seed Funding</strong>
                    <span className="text-gray-700 font-normal leading-relaxed">
                      Top 3 finalist teams receive cash prizes, project incubation, sponsor perks, and certificates of excellence.
                    </span>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex items-start gap-4 p-3.5 bg-white border-2 border-black rounded-md shadow-[3px_3px_0px_#000000]">
                  <div className="w-8 h-8 rounded-full bg-[#165B33] text-white flex items-center justify-center font-display font-black text-xs shrink-0 border border-black">
                    4
                  </div>
                  <div className="font-sans text-xs sm:text-sm">
                    <strong className="text-black block font-bold">Hybrid Sprint Format</strong>
                    <span className="text-gray-700 font-normal leading-relaxed">
                      Both virtual (online development sprint) and physical participation for the demo day and grand finale are available.
                    </span>
                  </div>
                </div>

                {/* Item 5 */}
                <div className="flex items-start gap-4 p-3.5 bg-white border-2 border-black rounded-md shadow-[3px_3px_0px_#000000]">
                  <div className="w-8 h-8 rounded-full bg-[#165B33] text-white flex items-center justify-center font-display font-black text-xs shrink-0 border border-black">
                    5
                  </div>
                  <div className="font-sans text-xs sm:text-sm">
                    <strong className="text-black block font-bold">100% Free Participation</strong>
                    <span className="text-gray-700 font-normal leading-relaxed">
                      Zero entry fees and zero hidden charges for all selected finalist teams.
                    </span>
                  </div>
                </div>

                {/* Item 6 */}
                <div className="flex items-start gap-4 p-3.5 bg-white border-2 border-black rounded-md shadow-[3px_3px_0px_#000000]">
                  <div className="w-8 h-8 rounded-full bg-[#165B33] text-white flex items-center justify-center font-display font-black text-xs shrink-0 border border-black">
                    6
                  </div>
                  <div className="font-sans text-xs sm:text-sm">
                    <strong className="text-black block font-bold">Solve a Real-World Problem</strong>
                    <span className="text-gray-700 font-normal leading-relaxed">
                      Your solution must address a tangible problem in Nigeria and fall under one of the 4 tracks: <strong>FinTech</strong>, <strong>AgriTech</strong>, <strong>Web3</strong>, or <strong>AI & Software</strong>.
                    </span>
                  </div>
                </div>

                {/* Item 7 */}
                <div className="flex items-start gap-4 p-3.5 bg-white border-2 border-black rounded-md shadow-[3px_3px_0px_#000000]">
                  <div className="w-8 h-8 rounded-full bg-[#165B33] text-white flex items-center justify-center font-display font-black text-xs shrink-0 border border-black">
                    7
                  </div>
                  <div className="font-sans text-xs sm:text-sm">
                    <strong className="text-black block font-bold">Availability for Mentorship & Pitching</strong>
                    <span className="text-gray-700 font-normal leading-relaxed">
                      Team members must be available for scheduled mentor office hours and live presentation before the jury.
                    </span>
                  </div>
                </div>

                {/* Mobile Action Button */}
                <div className="block lg:hidden pt-4">
                  <button
                    type="button"
                    onClick={handleProceedFromRules}
                    className="w-full neo-btn-primary py-4 px-6 text-xs sm:text-sm font-display uppercase tracking-wider flex items-center justify-center gap-2 bg-black text-white hover:bg-[#165B33] transition-colors"
                  >
                    <span>PROCEED TO APPLICATION</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        ) : (
          /* ========================================================================= */
          /* CASE 4: NEO-BRUTALIST REGISTRATION FORM                                   */
          /* ========================================================================= */
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Back button to view rules again */}
            <div className="flex justify-between items-center bg-white p-3 border-2 border-black rounded-md shadow-[3px_3px_0px_#000000]">
              <span className="text-xs font-sans font-bold text-gray-700">
                Step 2 of 2: Team & Proposal Information
              </span>
              <button
                type="button"
                onClick={() => {
                  setHasSeenRules(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-sans font-bold underline hover:text-[#165B33] text-black"
              >
                ← Review Eligibility & Rules
              </button>
            </div>

            {error && (
              <div className="p-4 rounded bg-red-100 border-3 border-black text-red-800 font-sans text-xs shadow-[4px_4px_0px_#000000] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-700 shrink-0" />
                <span className="font-semibold">{error}</span>
              </div>
            )}

            {/* Step 1: Team & Track Information */}
            <div className="bg-white text-black border-3 border-black rounded-md p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_#000000]">
              <h3 className="font-display font-black text-xl uppercase flex items-center gap-2 border-b-3 border-black pb-4">
                <span className="neo-tag">01</span> TEAM & TRACK SELECTION
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-sans font-black uppercase mb-2">
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
                  <label className="block text-xs font-sans font-black uppercase mb-2">
                    Challenge Track *
                  </label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded p-3 text-black font-sans text-sm font-normal focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
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
                  <label className="block text-xs font-sans font-black uppercase mb-2">
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
                  <label className="block text-xs font-sans font-black uppercase mb-2">
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
                  <label className="block text-xs font-sans font-black uppercase mb-2">
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
                  <label className="block text-xs font-sans font-black uppercase mb-2">
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
                  <label className="block text-xs font-sans font-black uppercase mb-2">
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
                    className="neo-btn-primary px-3.5 py-2 text-xs font-sans font-extrabold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ADD MEMBER</span>
                  </button>
                )}
              </div>

              {formData.members.map((member, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded bg-gray-50 border-2 border-black space-y-4 shadow-[4px_4px_0px_#000000]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs font-black bg-black text-white px-2.5 py-0.5 rounded border border-black">
                      BUILDER #{idx + 2}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(idx)}
                      className="text-black hover:text-red-600 font-sans text-xs font-bold flex items-center gap-1"
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
                        className="w-full bg-white border-2 border-black rounded p-2.5 text-black font-sans text-xs font-normal focus:shadow-[3px_3px_0px_#000000] focus:outline-none"
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
                  <label className="block text-xs font-sans font-black uppercase mb-2">
                    GitHub Profile / Team Portfolio Link *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/your-username-or-team"
                    value={formData.githubPortfolio}
                    onChange={(e) => setFormData({ ...formData, githubPortfolio: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded p-3 text-black font-sans text-sm font-normal focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-black uppercase mb-2">
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
                  <label className="block text-xs font-sans font-black uppercase mb-2">
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
              <span>{loading ? 'CHECKING DETAILS & SUBMITTING...' : 'SUBMIT HACKATHON APPLICATION'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
};
