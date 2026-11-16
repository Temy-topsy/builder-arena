import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  Key,
  LogOut,
  Users,
  Building,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Filter,
  Download,
  ExternalLink,
  Eye,
  RefreshCw,
  ArrowLeft,
  X,
  Phone,
  Mail,
  Award,
  AlertTriangle,
  Trash2,
  Send,
  Check,
  Sparkles,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface TeamMember {
  name: string;
  email: string;
  role: string;
}

interface TeamRegistration {
  id: string | number;
  application_id: string;
  team_name: string;
  track: string;
  team_lead_name: string;
  team_lead_email: string;
  team_lead_phone: string;
  matric_number?: string;
  department_level?: string;
  members: TeamMember[];
  github_portfolio?: string;
  problem_statement?: string;
  status: 'under_review' | 'approved' | 'rejected';
  created_at: string;
}

interface SponsorApplication {
  id: string | number;
  proposal_id: string;
  company_name: string;
  tier: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  company_website?: string;
  industry?: string;
  sponsorship_goals?: string;
  participation_types?: string[];
  custom_requests?: string;
  status: 'under_review' | 'approved' | 'rejected';
  created_at: string;
}

interface StatsData {
  totalTeams: number;
  approvedTeams: number;
  totalBuilders: number;
  totalSponsors: number;
  approvedSponsors: number;
}

export const AdminPage: React.FC = () => {
  const [authToken, setAuthToken] = useState<string | null>(() => sessionStorage.getItem('arena_admin_token'));
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Active Tab: 'teams' | 'sponsors'
  const [activeTab, setActiveTab] = useState<'teams' | 'sponsors'>('teams');

  // Data states
  const [teams, setTeams] = useState<TeamRegistration[]>([]);
  const [sponsors, setSponsors] = useState<SponsorApplication[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [trackFilter, setTrackFilter] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');

  // Inspection Modal states
  const [selectedTeam, setSelectedTeam] = useState<TeamRegistration | null>(null);
  const [selectedSponsor, setSelectedSponsor] = useState<SponsorApplication | null>(null);

  // Email Dispatch Modal states
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailTargetMode, setEmailTargetMode] = useState<
    'single' | 'all_teams' | 'approved_teams' | 'under_review_teams' | 'all_sponsors' | 'custom'
  >('all_teams');
  const [emailToInput, setEmailToInput] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailHeading, setEmailHeading] = useState('');
  const [emailBadge, setEmailBadge] = useState('OFFICIAL ANNOUNCEMENT');
  const [emailMessage, setEmailMessage] = useState('');
  const [emailActionText, setEmailActionText] = useState('');
  const [emailActionUrl, setEmailActionUrl] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [emailToast, setEmailToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [activeTemplate, setActiveTemplate] = useState('finalist_selection');

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);

    try {
      const validPasscode = import.meta.env.VITE_ADMIN_PASSCODE || 'arena2026!admin';
      if (passcode.trim() !== validPasscode) {
        throw new Error('Invalid admin passcode. Please enter the correct admin key.');
      }

      const token = 'arena_admin_session_' + Date.now();
      sessionStorage.setItem('arena_admin_token', token);
      setAuthToken(token);
    } catch (err: any) {
      setLoginError(err.message || 'Authentication failed');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('arena_admin_token');
    setAuthToken(null);
    setPasscode('');
  };

  // Fetch Admin Data
  const fetchData = async () => {
    if (!authToken) return;
    setLoadingData(true);
    try {
      // 1. Fetch team registrations from Supabase
      const { data: teamsData, error: teamsError } = await supabase
        .from('team_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (teamsError) {
        throw teamsError;
      }

      const loadedTeams: TeamRegistration[] = Array.isArray(teamsData) ? (teamsData as any) : [];
      setTeams(loadedTeams);

      // 2. Fetch sponsor proposals if table exists, otherwise empty array
      let loadedSponsors: SponsorApplication[] = [];
      try {
        const { data: sponsorsData } = await supabase
          .from('sponsor_applications')
          .select('*')
          .order('created_at', { ascending: false });
        if (Array.isArray(sponsorsData)) {
          loadedSponsors = sponsorsData as any;
        }
      } catch {
        // Sponsors are handled via direct email, table is optional
      }
      setSponsors(loadedSponsors);

      // 3. Calculate live stats
      const totalTeams = loadedTeams.length;
      const approvedTeams = loadedTeams.filter((t) => t.status === 'approved').length;
      let totalBuilders = totalTeams;
      loadedTeams.forEach((t) => {
        if (Array.isArray(t.members)) {
          totalBuilders += t.members.length;
        }
      });

      setStats({
        totalTeams,
        approvedTeams,
        totalBuilders,
        totalSponsors: loadedSponsors.length,
        approvedSponsors: loadedSponsors.filter((s) => s.status === 'approved').length,
      });
    } catch (err: any) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchData();
    }
  }, [authToken]);

  // Update Team Status in Supabase
  const updateTeamStatus = async (id: string | number, status: string) => {
    try {
      const { error } = await supabase
        .from('team_registrations')
        .update({ status })
        .eq('id', id);

      if (error) {
        throw error;
      }

      setTeams((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: status as any } : t))
      );
      if (selectedTeam && selectedTeam.id === id) {
        setSelectedTeam({ ...selectedTeam, status: status as any });
      }

      // Update approved count in stats
      setStats((prev) => {
        if (!prev) return prev;
        const newCount = teams.filter((t) =>
          t.id === id ? status === 'approved' : t.status === 'approved'
        ).length;
        return { ...prev, approvedTeams: newCount };
      });
    } catch (err: any) {
      console.error('Failed to update team status:', err);
      alert('Failed to update status in Supabase: ' + (err.message || 'Check RLS policies'));
    }
  };

  // Update Sponsor Status in Supabase (if used)
  const updateSponsorStatus = async (id: string | number, status: string) => {
    try {
      const { error } = await supabase
        .from('sponsor_applications')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setSponsors((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: status as any } : s))
      );
      if (selectedSponsor && selectedSponsor.id === id) {
        setSelectedSponsor({ ...selectedSponsor, status: status as any });
      }
    } catch (err: any) {
      console.error('Failed to update sponsor status:', err);
    }
  };

  // Filtered Teams
  const filteredTeams = useMemo(() => {
    return teams.filter((t) => {
      const matchesSearch =
        t.team_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.team_lead_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.team_lead_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.application_id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
      const matchesTrack = trackFilter === 'all' || t.track.toLowerCase() === trackFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesTrack;
    });
  }, [teams, searchQuery, statusFilter, trackFilter]);

  // Filtered Sponsors
  const filteredSponsors = useMemo(() => {
    return sponsors.filter((s) => {
      const matchesSearch =
        s.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.contact_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.contact_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.proposal_id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
      const matchesTier = tierFilter === 'all' || s.tier.toLowerCase() === tierFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesTier;
    });
  }, [sponsors, searchQuery, statusFilter, tierFilter]);

  // CSV Exporter
  const exportCSV = () => {
    if (activeTab === 'teams') {
      const headers = ['Application ID', 'Team Name', 'Track', 'Lead Name', 'Lead Email', 'Lead Phone', 'Matric/Dept', 'Members Count', 'Status', 'Date'];
      const rows = filteredTeams.map((t) => [
        t.application_id,
        `"${t.team_name.replace(/"/g, '""')}"`,
        t.track,
        `"${t.team_lead_name.replace(/"/g, '""')}"`,
        t.team_lead_email,
        t.team_lead_phone,
        `"${(t.matric_number || '').replace(/"/g, '""')}"`,
        (t.members?.length || 0) + 1,
        t.status,
        new Date(t.created_at).toLocaleDateString(),
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `builders_arena_teams_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const headers = ['Proposal ID', 'Company Name', 'Tier', 'Contact Name', 'Contact Email', 'Contact Phone', 'Website', 'Industry', 'Status', 'Date'];
      const rows = filteredSponsors.map((s) => [
        s.proposal_id,
        `"${s.company_name.replace(/"/g, '""')}"`,
        s.tier,
        `"${s.contact_name.replace(/"/g, '""')}"`,
        s.contact_email,
        s.contact_phone,
        s.company_website || '',
        s.industry || '',
        s.status,
        new Date(s.created_at).toLocaleDateString(),
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `builders_arena_sponsors_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Email Helper Functions
  const handleSelectTemplate = (templateKey: string) => {
    setActiveTemplate(templateKey);
    if (templateKey === 'finalist_selection') {
      setEmailSubject('[Builders Arena 2026] Congratulations! Your Team Has Been Selected as a Finalist!');
      setEmailHeading('🎉 CONGRATULATIONS! TOP 15 FINALIST SELECTION');
      setEmailBadge('FINALIST SELECTION');
      setEmailMessage(
        `Hello Team,\n\nWe are thrilled to officially announce that your team has been selected into the Top 15 Finalist Cohort for Builders Arena 2026!\n\nKey Next Steps:\n1. Confirm Attendance: Ensure your full team is ready for both the Virtual Sprint and Physical Grand Finale.\n2. Join Finalist WhatsApp Channel: Connect with mentors and organizers.\n3. Prepare Your Environment: Have your Git repositories, dev stack, and APIs ready.\n\nSchedule:\n• Virtual Coding Sprint: 18th November 2026\n• Physical Grand Finale & Pitch: 19th – 20th November 2026 at OOU Tech Hub, ICT Building, Ago-Iwoye\n\nWe look forward to seeing your working prototype in action!`
      );
      setEmailActionText('JOIN FINALIST WHATSAPP');
      setEmailActionUrl('https://wa.me/2348061764593');
    } else if (templateKey === 'schedule_reminder') {
      setEmailSubject('[Builders Arena 2026] Important Reminder: Grand Finale Schedule & Venue Details');
      setEmailHeading('🗓️ GRAND FINALE SCHEDULE & VENUE DETAILS');
      setEmailBadge('VENUE & SCHEDULE');
      setEmailMessage(
        `Hello Builders,\n\nHere is your briefing for the Builders Arena 2026 Grand Finale:\n\n• Venue: OOU Tech Hub, ICT Building, OOU Main Campus, Ago-Iwoye, Ogun State\n• Virtual Sprint Kickoff: 18th November 2026 (09:00 AM WAT)\n• Physical Check-In & Setup: 19th November 2026 (08:30 AM WAT)\n• Live Demo & Jury Pitching: 20th November 2026\n\nSnacks, Wi-Fi, workspace power, and swag will be provided. Please arrive with your laptops, chargers, and identification.`
      );
      setEmailActionText('VIEW EVENT SCHEDULE');
      setEmailActionUrl('https://builder-arena.vercel.app/schedule');
    } else if (templateKey === 'screening_update') {
      setEmailSubject('[Builders Arena 2026] Update Regarding Your Application');
      setEmailHeading('APPLICATION SCREENING UPDATE');
      setEmailBadge('SCREENING STATUS');
      setEmailMessage(
        `Hello Team,\n\nThank you for your patience while our technical screening jury evaluates all team proposals for Builders Arena 2026.\n\nYour application is currently under review. Our panel is assessing technical feasibility, problem statement relevance, and track alignment.\n\nFinalist announcements will be communicated via email and official community channels.`
      );
      setEmailActionText('CHECK APPLICATION STATUS');
      setEmailActionUrl('https://builder-arena.vercel.app/register?lookup=true');
    } else if (templateKey === 'blank') {
      setEmailSubject('');
      setEmailHeading('');
      setEmailBadge('OFFICIAL ANNOUNCEMENT');
      setEmailMessage('');
      setEmailActionText('');
      setEmailActionUrl('');
    }
  };

  const openEmailComposerForTeam = (team: TeamRegistration) => {
    setEmailTargetMode('single');
    setEmailToInput(team.team_lead_email);
    setEmailSubject(`[Builders Arena 2026] Update for Team ${team.team_name}`);
    setEmailHeading(`Team ${team.team_name} - Hackathon Briefing`);
    setEmailBadge(`${team.track.toUpperCase()} TRACK`);
    setEmailMessage(
      `Hello ${team.team_lead_name} and Team ${team.team_name},\n\nWe are writing from the Builders Arena 2026 Organizing Committee regarding your application (${team.application_id}).`
    );
    setEmailActionText('VIEW TEAM PORTAL');
    setEmailActionUrl('https://builder-arena.vercel.app/register?lookup=true');
    setEmailToast(null);
    setEmailModalOpen(true);
  };

  const openEmailComposerForSponsor = (sponsor: SponsorApplication) => {
    setEmailTargetMode('single');
    setEmailToInput(sponsor.contact_email);
    setEmailSubject(`[Builders Arena 2026] Partnership Update - ${sponsor.company_name}`);
    setEmailHeading(`${sponsor.company_name} - Partnership Engagement`);
    setEmailBadge(`${sponsor.tier.toUpperCase()} SPONSOR`);
    setEmailMessage(
      `Dear ${sponsor.contact_name},\n\nThank you for partnering with Builders Arena 2026. Here is an update regarding our sponsorship deliverables, branding placement, and event logistics.`
    );
    setEmailActionText('VIEW SPONSOR DECK');
    setEmailActionUrl('https://builder-arena.vercel.app/sponsors');
    setEmailToast(null);
    setEmailModalOpen(true);
  };

  const openBroadcastComposer = (
    mode: 'all_teams' | 'approved_teams' | 'under_review_teams' | 'all_sponsors' = 'all_teams'
  ) => {
    setEmailTargetMode(mode);
    setEmailToInput('');
    handleSelectTemplate(mode === 'approved_teams' ? 'finalist_selection' : 'schedule_reminder');
    setEmailToast(null);
    setEmailModalOpen(true);
  };

  const calculatedRecipients = useMemo(() => {
    if (emailTargetMode === 'single' || emailTargetMode === 'custom') {
      return emailToInput
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter((e) => e && e.includes('@'));
    }
    if (emailTargetMode === 'all_teams') {
      return Array.from(
        new Set(teams.map((t) => (t.team_lead_email || '').trim().toLowerCase()).filter((e) => e && e.includes('@')))
      );
    }
    if (emailTargetMode === 'approved_teams') {
      return Array.from(
        new Set(
          teams
            .filter((t) => t.status === 'approved')
            .map((t) => (t.team_lead_email || '').trim().toLowerCase())
            .filter((e) => e && e.includes('@'))
        )
      );
    }
    if (emailTargetMode === 'under_review_teams') {
      return Array.from(
        new Set(
          teams
            .filter((t) => t.status === 'under_review')
            .map((t) => (t.team_lead_email || '').trim().toLowerCase())
            .filter((e) => e && e.includes('@'))
        )
      );
    }
    if (emailTargetMode === 'all_sponsors') {
      return Array.from(
        new Set(sponsors.map((s) => (s.contact_email || '').trim().toLowerCase()).filter((e) => e && e.includes('@')))
      );
    }
    return [];
  }, [emailTargetMode, emailToInput, teams, sponsors]);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (calculatedRecipients.length === 0) {
      setEmailToast({ type: 'error', message: 'No valid recipient email addresses found.' });
      return;
    }
    if (!emailSubject.trim() || !emailMessage.trim()) {
      setEmailToast({ type: 'error', message: 'Subject and message body cannot be empty.' });
      return;
    }

    setEmailSending(true);
    setEmailToast(null);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'admin_direct_email',
          payload: {
            to: calculatedRecipients,
            subject: emailSubject.trim(),
            heading: emailHeading.trim() || emailSubject.trim(),
            badgeText: emailBadge.trim() || 'OFFICIAL ANNOUNCEMENT',
            message: emailMessage.trim(),
            actionButtonText: emailActionText.trim(),
            actionButtonUrl: emailActionUrl.trim(),
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send email.');
      }

      setEmailToast({
        type: 'success',
        message: `Email successfully delivered to ${calculatedRecipients.length} recipient(s)!`,
      });

      setTimeout(() => {
        setEmailModalOpen(false);
        setEmailToast(null);
      }, 2200);
    } catch (err: any) {
      console.error('Email send error:', err);
      setEmailToast({
        type: 'error',
        message: err.message || 'Error occurred while sending email.',
      });
    } finally {
      setEmailSending(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 bg-[#00D9FF] text-black font-mono text-xs font-bold px-2.5 py-0.5 rounded border border-black shadow-[2px_2px_0px_#000000]">
            <CheckCircle className="w-3.5 h-3.5" /> APPROVED
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 bg-red-400 text-black font-mono text-xs font-bold px-2.5 py-0.5 rounded border border-black shadow-[2px_2px_0px_#000000]">
            <XCircle className="w-3.5 h-3.5" /> REJECTED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-yellow-300 text-black font-mono text-xs font-bold px-2.5 py-0.5 rounded border border-black shadow-[2px_2px_0px_#000000]">
            <Clock className="w-3.5 h-3.5" /> UNDER REVIEW
          </span>
        );
    }
  };

  // --- LOGIN VIEW ---
  if (!authToken) {
    return (
      <div className="min-h-screen bg-neo-hero flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white text-black border-3 border-black rounded-md p-8 shadow-[10px_10px_0px_#000000] space-y-6"
        >
          <div className="flex items-center gap-3 border-b-3 border-black pb-4">
            <img
              src="/otc-logo.jpg"
              alt="OTC Logo"
              className="w-12 h-12 rounded-md object-contain border-2 border-black shadow-[3px_3px_0px_#000000] bg-white"
            />
            <div>
              <span className="neo-tag text-[10px]">SECURITY CHECKPOINT</span>
              <h1 className="font-display font-black text-2xl uppercase mt-0.5">ADMIN CONSOLE</h1>
            </div>
          </div>

          <p className="font-sans text-xs text-gray-700 font-medium leading-relaxed">
            Enter the Builders Arena organizer passcode to access the database, review team applications, and manage sponsor proposals.
          </p>

          {loginError && (
            <div className="p-3 bg-red-100 border-2 border-black rounded font-mono text-xs text-red-800 shadow-[3px_3px_0px_#000000] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-700 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase mb-1.5">
                Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-white border-2 border-black rounded p-3 text-black font-mono text-sm focus:shadow-[4px_4px_0px_#000000] focus:outline-none"
                />
                <Key className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className={`w-full neo-btn-primary py-3.5 text-xs font-display uppercase tracking-wider flex items-center justify-center gap-2 ${
                loggingIn ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <span>{loggingIn ? 'VERIFYING CREDENTIALS...' : 'UNLOCK ADMIN CONSOLE'}</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link to="/" className="font-mono text-xs text-black underline font-bold hover:text-[#00D9FF]">
              ← Return to public website
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-neo-hero text-black pb-20">
      {/* Top Navbar */}
      <header className="bg-black text-white border-b-3 border-black py-4 sticky top-0 z-30 shadow-[0_4px_0px_#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-white hover:text-[#00D9FF] flex items-center gap-1.5 font-mono text-xs font-bold mr-2">
              <ArrowLeft className="w-4 h-4" /> SITE
            </Link>
            <div className="bg-white text-black font-display font-black px-2.5 py-1 rounded border-2 border-black text-xs uppercase shadow-[2px_2px_0px_#000000] flex items-center gap-2">
              <img src="/otc-logo.jpg" alt="OTC" className="w-5 h-5 rounded object-contain" />
              <span>BUILDERS ARENA</span>
              <span className="bg-black text-white px-1.5 py-0.5 rounded text-[10px]">ADMIN</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loadingData}
              className="px-3 py-1.5 rounded bg-white text-black font-mono text-xs font-bold border-2 border-black hover:bg-[#00D9FF] transition-colors flex items-center gap-1.5 shadow-[2px_2px_0px_#000000]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">REFRESH</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded bg-red-400 text-black font-mono text-xs font-bold border-2 border-black hover:bg-red-500 transition-colors flex items-center gap-1.5 shadow-[2px_2px_0px_#000000]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">LOCK</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white text-black border-3 border-black p-4 rounded-md shadow-[4px_4px_0px_#000000]">
            <span className="font-mono text-[10px] text-gray-600 font-bold uppercase block">TOTAL TEAMS</span>
            <div className="font-display font-black text-3xl mt-1">{stats?.totalTeams ?? teams.length}</div>
          </div>

          <div className="bg-white text-black border-3 border-black p-4 rounded-md shadow-[4px_4px_0px_#000000]">
            <span className="font-mono text-[10px] text-gray-600 font-bold uppercase block">TOTAL BUILDERS</span>
            <div className="font-display font-black text-3xl mt-1 text-[#0088AA]">{stats?.totalBuilders ?? 0}</div>
          </div>

          <div className="bg-white text-black border-3 border-black p-4 rounded-md shadow-[4px_4px_0px_#000000]">
            <span className="font-mono text-[10px] text-gray-600 font-bold uppercase block">APPROVED FINALISTS</span>
            <div className="font-display font-black text-3xl mt-1 text-emerald-600">
              {stats?.approvedTeams ?? 0} <span className="text-sm font-normal text-gray-500">/ 15</span>
            </div>
          </div>

          <div className="bg-white text-black border-3 border-black p-4 rounded-md shadow-[4px_4px_0px_#000000]">
            <span className="font-mono text-[10px] text-gray-600 font-bold uppercase block">TOTAL SPONSORS</span>
            <div className="font-display font-black text-3xl mt-1">{stats?.totalSponsors ?? sponsors.length}</div>
          </div>

          <div className="bg-white text-black border-3 border-black p-4 rounded-md shadow-[4px_4px_0px_#000000] col-span-2 lg:col-span-1">
            <span className="font-mono text-[10px] text-gray-600 font-bold uppercase block">APPROVED PARTNERS</span>
            <div className="font-display font-black text-3xl mt-1 text-[#FF9F00]">{stats?.approvedSponsors ?? 0}</div>
          </div>
        </div>

        {/* Tab & Action Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b-3 border-black pb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('teams')}
              className={`px-5 py-2.5 rounded font-display font-bold text-xs uppercase tracking-wider border-2 border-black transition-all flex items-center gap-2 ${
                activeTab === 'teams'
                  ? 'bg-[#00D9FF] text-black shadow-[4px_4px_0px_#000000]'
                  : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>TEAM REGISTRATIONS ({teams.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('sponsors')}
              className={`px-5 py-2.5 rounded font-display font-bold text-xs uppercase tracking-wider border-2 border-black transition-all flex items-center gap-2 ${
                activeTab === 'sponsors'
                  ? 'bg-[#FF9F00] text-black shadow-[4px_4px_0px_#000000]'
                  : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>SPONSOR APPLICATIONS ({sponsors.length})</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => openBroadcastComposer('all_teams')}
              className="bg-yellow-300 hover:bg-yellow-400 text-black px-4 py-2.5 rounded font-display font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000000] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>SEND EMAIL / BROADCAST</span>
            </button>

            <button
              onClick={exportCSV}
              className="neo-btn-secondary px-4 py-2.5 text-xs font-sans uppercase font-bold flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT CSV</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border-3 border-black p-4 rounded-md shadow-[6px_6px_0px_#000000] flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder={`Search by name, email, or ${activeTab === 'teams' ? 'application ID' : 'proposal ID'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 border-black rounded text-black font-sans text-xs focus:outline-none focus:shadow-[3px_3px_0px_#000000]"
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-gray-600 hidden sm:block" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border-2 border-black rounded px-3 py-2 text-xs font-mono font-bold uppercase w-full md:w-auto"
            >
              <option value="all">ALL STATUSES</option>
              <option value="under_review">UNDER REVIEW</option>
              <option value="approved">APPROVED</option>
              <option value="rejected">REJECTED</option>
            </select>

            {/* Category Filter */}
            {activeTab === 'teams' ? (
              <select
                value={trackFilter}
                onChange={(e) => setTrackFilter(e.target.value)}
                className="bg-white border-2 border-black rounded px-3 py-2 text-xs font-mono font-bold uppercase w-full md:w-auto"
              >
                <option value="all">ALL TRACKS</option>
                <option value="fintech">FINTECH</option>
                <option value="agritech">AGRICTECH</option>
                <option value="web3">WEB3</option>
                <option value="ai">AI & SOFTWARE</option>
              </select>
            ) : (
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="bg-white border-2 border-black rounded px-3 py-2 text-xs font-mono font-bold uppercase w-full md:w-auto"
              >
                <option value="all">ALL TIERS</option>
                <option value="silver">SILVER</option>
                <option value="gold">GOLD</option>
                <option value="platinum">PLATINUM</option>
                <option value="title">TITLE</option>
                <option value="custom">CUSTOM</option>
              </select>
            )}
          </div>
        </div>

        {/* Content Table Area */}
        {activeTab === 'teams' ? (
          /* TEAMS TABLE */
          <div className="bg-white border-3 border-black rounded-md shadow-[8px_8px_0px_#000000] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white font-mono text-xs uppercase border-b-3 border-black">
                    <th className="p-3.5">APP ID</th>
                    <th className="p-3.5">TEAM NAME</th>
                    <th className="p-3.5">TRACK</th>
                    <th className="p-3.5">TEAM LEAD</th>
                    <th className="p-3.5 text-center">ROSTER</th>
                    <th className="p-3.5">STATUS</th>
                    <th className="p-3.5">SUBMITTED</th>
                    <th className="p-3.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black text-xs font-sans">
                  {filteredTeams.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-12 text-center text-gray-500 font-mono">
                        No team registrations found matching current filters.
                      </td>
                    </tr>
                  ) : (
                    filteredTeams.map((team) => (
                      <tr key={team.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-black whitespace-nowrap">
                          {team.application_id}
                        </td>
                        <td className="p-3.5 font-bold text-black max-w-[180px] truncate">
                          {team.team_name}
                        </td>
                        <td className="p-3.5">
                          <span className="font-mono text-[10px] font-bold uppercase bg-black text-white px-2 py-0.5 rounded">
                            {team.track}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="font-medium text-black">{team.team_lead_name}</div>
                          <div className="text-gray-500 text-[11px]">{team.team_lead_email}</div>
                        </td>
                        <td className="p-3.5 text-center font-mono font-bold">
                          {(team.members?.length || 0) + 1}
                        </td>
                        <td className="p-3.5 whitespace-nowrap">
                          {getStatusBadge(team.status)}
                        </td>
                        <td className="p-3.5 text-gray-600 font-mono text-[11px] whitespace-nowrap">
                          {new Date(team.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3.5 text-right whitespace-nowrap space-x-1.5">
                          <button
                            onClick={() => openEmailComposerForTeam(team)}
                            className="p-1.5 rounded bg-white hover:bg-yellow-300 border border-black transition-colors"
                            title="Send Email to Team Lead"
                          >
                            <Mail className="w-3.5 h-3.5 text-black" />
                          </button>
                          <button
                            onClick={() => setSelectedTeam(team)}
                            className="p-1.5 rounded bg-white hover:bg-[#00D9FF] border border-black transition-colors"
                            title="Inspect Application"
                          >
                            <Eye className="w-3.5 h-3.5 text-black" />
                          </button>
                          <button
                            onClick={() => updateTeamStatus(team.id, 'approved')}
                            className={`p-1.5 rounded border border-black transition-colors ${
                              team.status === 'approved' ? 'bg-[#00D9FF]' : 'bg-white hover:bg-emerald-200'
                            }`}
                            title="Approve Team"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-black" />
                          </button>
                          <button
                            onClick={() => updateTeamStatus(team.id, 'rejected')}
                            className={`p-1.5 rounded border border-black transition-colors ${
                              team.status === 'rejected' ? 'bg-red-400' : 'bg-white hover:bg-red-200'
                            }`}
                            title="Reject Team"
                          >
                            <XCircle className="w-3.5 h-3.5 text-black" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* SPONSORS TABLE */
          <div className="bg-white border-3 border-black rounded-md shadow-[8px_8px_0px_#000000] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white font-mono text-xs uppercase border-b-3 border-black">
                    <th className="p-3.5">PROPOSAL ID</th>
                    <th className="p-3.5">COMPANY NAME</th>
                    <th className="p-3.5">TIER</th>
                    <th className="p-3.5">CONTACT PERSON</th>
                    <th className="p-3.5">INDUSTRY</th>
                    <th className="p-3.5">STATUS</th>
                    <th className="p-3.5">SUBMITTED</th>
                    <th className="p-3.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black text-xs font-sans">
                  {filteredSponsors.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-12 text-center text-gray-500 font-mono">
                        No sponsor applications found matching current filters.
                      </td>
                    </tr>
                  ) : (
                    filteredSponsors.map((sponsor) => (
                      <tr key={sponsor.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-black whitespace-nowrap">
                          {sponsor.proposal_id}
                        </td>
                        <td className="p-3.5 font-bold text-black max-w-[180px] truncate">
                          {sponsor.company_name}
                        </td>
                        <td className="p-3.5">
                          <span className="font-mono text-[10px] font-bold uppercase bg-[#FF9F00] text-black px-2 py-0.5 rounded border border-black">
                            {sponsor.tier}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="font-medium text-black">{sponsor.contact_name}</div>
                          <div className="text-gray-500 text-[11px]">{sponsor.contact_email}</div>
                        </td>
                        <td className="p-3.5 font-mono text-gray-700">
                          {sponsor.industry || '—'}
                        </td>
                        <td className="p-3.5 whitespace-nowrap">
                          {getStatusBadge(sponsor.status)}
                        </td>
                        <td className="p-3.5 text-gray-600 font-mono text-[11px] whitespace-nowrap">
                          {new Date(sponsor.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3.5 text-right whitespace-nowrap space-x-1.5">
                          <button
                            onClick={() => openEmailComposerForSponsor(sponsor)}
                            className="p-1.5 rounded bg-white hover:bg-yellow-300 border border-black transition-colors"
                            title="Send Email to Sponsor"
                          >
                            <Mail className="w-3.5 h-3.5 text-black" />
                          </button>
                          <button
                            onClick={() => setSelectedSponsor(sponsor)}
                            className="p-1.5 rounded bg-white hover:bg-[#FF9F00] border border-black transition-colors"
                            title="Inspect Proposal"
                          >
                            <Eye className="w-3.5 h-3.5 text-black" />
                          </button>
                          <button
                            onClick={() => updateSponsorStatus(sponsor.id, 'approved')}
                            className={`p-1.5 rounded border border-black transition-colors ${
                              sponsor.status === 'approved' ? 'bg-[#00D9FF]' : 'bg-white hover:bg-emerald-200'
                            }`}
                            title="Approve Sponsor"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-black" />
                          </button>
                          <button
                            onClick={() => updateSponsorStatus(sponsor.id, 'rejected')}
                            className={`p-1.5 rounded border border-black transition-colors ${
                              sponsor.status === 'rejected' ? 'bg-red-400' : 'bg-white hover:bg-red-200'
                            }`}
                            title="Reject Sponsor"
                          >
                            <XCircle className="w-3.5 h-3.5 text-black" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* TEAM DETAIL MODAL */}
      <AnimatePresence>
        {selectedTeam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white text-black border-3 border-black rounded-md p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-[12px_12px_0px_#000000] space-y-6"
            >
              <button
                onClick={() => setSelectedTeam(null)}
                className="absolute top-5 right-5 p-2 rounded bg-black text-white hover:bg-[#00D9FF] hover:text-black border-2 border-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="border-b-3 border-black pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="neo-tag text-[10px]">{selectedTeam.application_id}</span>
                  <span className="neo-tag-accent text-[10px] uppercase">{selectedTeam.track} TRACK</span>
                  {getStatusBadge(selectedTeam.status)}
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase">{selectedTeam.team_name}</h2>
              </div>

              {/* Lead Details */}
              <div className="bg-gray-50 border-2 border-black p-4 rounded space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase text-black">TEAM LEAD & INSTITUTION</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                  <div><strong>Name:</strong> {selectedTeam.team_lead_name}</div>
                  <div><strong>Email:</strong> {selectedTeam.team_lead_email}</div>
                  <div><strong>Phone:</strong> {selectedTeam.team_lead_phone}</div>
                  <div><strong>Matric / Dept:</strong> {selectedTeam.matric_number || 'N/A'}</div>
                </div>
              </div>

              {/* Members Roster */}
              <div>
                <h4 className="font-mono text-xs font-bold uppercase mb-2">
                  TEAM ROSTER ({(selectedTeam.members?.length || 0) + 1} MEMBERS)
                </h4>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-100 border border-black rounded flex items-center justify-between text-xs">
                    <div>
                      <strong>{selectedTeam.team_lead_name}</strong>
                      <span className="text-gray-600 block text-[11px]">{selectedTeam.team_lead_email}</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold bg-[#00D9FF] px-2 py-0.5 rounded border border-black">
                      TEAM LEAD
                    </span>
                  </div>

                  {selectedTeam.members &&
                    selectedTeam.members.map((m, idx) => (
                      <div key={idx} className="p-3 bg-white border border-black rounded flex items-center justify-between text-xs">
                        <div>
                          <strong>{m.name || 'Member'}</strong>
                          <span className="text-gray-600 block text-[11px]">{m.email}</span>
                        </div>
                        <span className="font-mono text-[10px] font-bold bg-black text-white px-2 py-0.5 rounded">
                          {m.role}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Project Proposal */}
              <div>
                <h4 className="font-mono text-xs font-bold uppercase mb-2">PROJECT PITCH & PROBLEM STATEMENT</h4>
                <div className="p-4 bg-gray-50 border-2 border-black rounded text-xs font-sans whitespace-pre-wrap leading-relaxed">
                  {selectedTeam.problem_statement || 'No project description provided.'}
                </div>
              </div>

              {/* GitHub Link */}
              {selectedTeam.github_portfolio && (
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase mb-1.5">GITHUB PORTFOLIO</h4>
                  <a
                    href={selectedTeam.github_portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-600 underline font-bold"
                  >
                    <span>{selectedTeam.github_portfolio}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t-3 border-black flex flex-wrap gap-2 justify-end">
                <button
                  onClick={() => openEmailComposerForTeam(selectedTeam)}
                  className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 font-sans text-xs font-bold uppercase rounded border-2 border-black flex items-center gap-1.5 shadow-[2px_2px_0px_#000000]"
                >
                  <Mail className="w-3.5 h-3.5 text-black" />
                  <span>Send Email</span>
                </button>
                <button
                  onClick={() => updateTeamStatus(selectedTeam.id, 'under_review')}
                  className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 font-mono text-xs font-bold uppercase rounded border-2 border-black"
                >
                  Mark Under Review
                </button>
                <button
                  onClick={() => updateTeamStatus(selectedTeam.id, 'rejected')}
                  className="px-4 py-2 bg-red-400 hover:bg-red-500 font-mono text-xs font-bold uppercase rounded border-2 border-black"
                >
                  Reject Application
                </button>
                <button
                  onClick={() => updateTeamStatus(selectedTeam.id, 'approved')}
                  className="px-4 py-2 bg-[#00D9FF] hover:bg-cyan-400 font-mono text-xs font-bold uppercase rounded border-2 border-black"
                >
                  Approve Application
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SPONSOR DETAIL MODAL */}
      <AnimatePresence>
        {selectedSponsor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white text-black border-3 border-black rounded-md p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-[12px_12px_0px_#000000] space-y-6"
            >
              <button
                onClick={() => setSelectedSponsor(null)}
                className="absolute top-5 right-5 p-2 rounded bg-black text-white hover:bg-[#FF9F00] hover:text-black border-2 border-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="border-b-3 border-black pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="neo-tag text-[10px]">{selectedSponsor.proposal_id}</span>
                  <span className="bg-[#FF9F00] text-black font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-black uppercase">
                    {selectedSponsor.tier} TIER
                  </span>
                  {getStatusBadge(selectedSponsor.status)}
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase">{selectedSponsor.company_name}</h2>
              </div>

              {/* Primary Contact Details */}
              <div className="bg-gray-50 border-2 border-black p-4 rounded space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase text-black">PRIMARY CONTACT & COMPANY INFO</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                  <div><strong>Contact:</strong> {selectedSponsor.contact_name}</div>
                  <div><strong>Email:</strong> {selectedSponsor.contact_email}</div>
                  <div><strong>Phone:</strong> {selectedSponsor.contact_phone}</div>
                  <div><strong>Industry:</strong> {selectedSponsor.industry || 'N/A'}</div>
                </div>
                {selectedSponsor.company_website && (
                  <div className="pt-1">
                    <a
                      href={selectedSponsor.company_website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs text-blue-600 underline font-bold"
                    >
                      <span>{selectedSponsor.company_website}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Participation Types */}
              <div>
                <h4 className="font-mono text-xs font-bold uppercase mb-2">PARTICIPATION AREAS</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSponsor.participation_types && selectedSponsor.participation_types.length > 0 ? (
                    selectedSponsor.participation_types.map((p, idx) => (
                      <span key={idx} className="bg-black text-white font-mono text-xs font-bold px-3 py-1 rounded border border-black">
                        • {p}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 font-mono text-xs">Standard Tier Package</span>
                  )}
                </div>
              </div>

              {/* Notes & Custom Requests */}
              <div>
                <h4 className="font-mono text-xs font-bold uppercase mb-2">PARTNERSHIP NOTES & GOALS</h4>
                <div className="p-4 bg-gray-50 border-2 border-black rounded text-xs font-sans whitespace-pre-wrap leading-relaxed">
                  {selectedSponsor.sponsorship_goals || selectedSponsor.custom_requests || 'No specific requests noted.'}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t-3 border-black flex flex-wrap gap-2 justify-end">
                <button
                  onClick={() => openEmailComposerForSponsor(selectedSponsor)}
                  className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 font-sans text-xs font-bold uppercase rounded border-2 border-black flex items-center gap-1.5 shadow-[2px_2px_0px_#000000]"
                >
                  <Mail className="w-3.5 h-3.5 text-black" />
                  <span>Send Email</span>
                </button>
                <button
                  onClick={() => updateSponsorStatus(selectedSponsor.id, 'under_review')}
                  className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 font-mono text-xs font-bold uppercase rounded border-2 border-black"
                >
                  Mark Under Review
                </button>
                <button
                  onClick={() => updateSponsorStatus(selectedSponsor.id, 'rejected')}
                  className="px-4 py-2 bg-red-400 hover:bg-red-500 font-mono text-xs font-bold uppercase rounded border-2 border-black"
                >
                  Reject Proposal
                </button>
                <button
                  onClick={() => updateSponsorStatus(selectedSponsor.id, 'approved')}
                  className="px-4 py-2 bg-[#00D9FF] hover:bg-cyan-400 font-mono text-xs font-bold uppercase rounded border-2 border-black"
                >
                  Approve Proposal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EMAIL DISPATCH COMPOSER MODAL */}
      <AnimatePresence>
        {emailModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white text-black border-3 border-black rounded-md p-6 sm:p-8 max-h-[92vh] overflow-y-auto shadow-[12px_12px_0px_#000000] space-y-6"
            >
              <button
                onClick={() => {
                  setEmailModalOpen(false);
                  setEmailToast(null);
                }}
                className="absolute top-5 right-5 p-2 rounded bg-black text-white hover:bg-[#00D9FF] hover:text-black border-2 border-black transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="border-b-3 border-black pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="neo-tag text-[10px]">EMAIL DISPATCHER</span>
                  <span className="neo-tag-accent text-[10px]">SMTP GMAIL</span>
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight flex items-center gap-2">
                  <Mail className="w-6 h-6 text-black" />
                  <span>COMPOSE & SEND EMAIL</span>
                </h2>
                <p className="font-sans text-xs text-gray-700 mt-1">
                  Sends branded neo-brutalist emails from <strong>ooutechcommunity@gmail.com</strong> directly to participants or sponsors.
                </p>
              </div>

              {/* Toast feedback */}
              {emailToast && (
                <div
                  className={`p-3.5 rounded border-2 border-black flex items-center gap-2 text-xs font-sans font-bold shadow-[3px_3px_0px_#000000] ${
                    emailToast.type === 'success' ? 'bg-emerald-200 text-emerald-950' : 'bg-red-200 text-red-950'
                  }`}
                >
                  {emailToast.type === 'success' ? <Check className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
                  <span>{emailToast.message}</span>
                </div>
              )}

              <form onSubmit={handleSendEmail} className="space-y-5">
                {/* 1. Recipient Target Selector */}
                <div>
                  <label className="block text-xs font-sans font-black uppercase mb-2">
                    RECIPIENT TARGET GROUP:
                  </label>
                  <div className="flex flex-wrap gap-2 text-xs font-sans">
                    <button
                      type="button"
                      onClick={() => setEmailTargetMode('all_teams')}
                      className={`px-3 py-1.5 rounded border-2 border-black font-bold uppercase transition-colors ${
                        emailTargetMode === 'all_teams' ? 'bg-[#00D9FF] text-black shadow-[2px_2px_0px_#000000]' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      All Teams ({teams.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmailTargetMode('approved_teams')}
                      className={`px-3 py-1.5 rounded border-2 border-black font-bold uppercase transition-colors ${
                        emailTargetMode === 'approved_teams' ? 'bg-[#00D9FF] text-black shadow-[2px_2px_0px_#000000]' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      Approved Finalists ({teams.filter((t) => t.status === 'approved').length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmailTargetMode('under_review_teams')}
                      className={`px-3 py-1.5 rounded border-2 border-black font-bold uppercase transition-colors ${
                        emailTargetMode === 'under_review_teams' ? 'bg-[#00D9FF] text-black shadow-[2px_2px_0px_#000000]' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      Under Review ({teams.filter((t) => t.status === 'under_review').length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmailTargetMode('all_sponsors')}
                      className={`px-3 py-1.5 rounded border-2 border-black font-bold uppercase transition-colors ${
                        emailTargetMode === 'all_sponsors' ? 'bg-[#FF9F00] text-black shadow-[2px_2px_0px_#000000]' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      All Sponsors ({sponsors.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmailTargetMode('custom')}
                      className={`px-3 py-1.5 rounded border-2 border-black font-bold uppercase transition-colors ${
                        emailTargetMode === 'custom' || emailTargetMode === 'single'
                          ? 'bg-yellow-300 text-black shadow-[2px_2px_0px_#000000]'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      Single / Custom
                    </button>
                  </div>
                </div>

                {/* Recipient Input (if single/custom) */}
                {(emailTargetMode === 'custom' || emailTargetMode === 'single') && (
                  <div>
                    <label className="block text-xs font-sans font-black uppercase mb-1.5">
                      RECIPIENT EMAIL(S) (Comma-separated for multiple):
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. lead@university.edu.ng, member@gmail.com"
                      value={emailToInput}
                      onChange={(e) => setEmailToInput(e.target.value)}
                      className="w-full bg-white border-2 border-black rounded p-2.5 text-xs font-sans focus:outline-none focus:shadow-[3px_3px_0px_#000000]"
                    />
                  </div>
                )}

                {/* Recipient Count Indicator */}
                <div className="p-3 bg-gray-50 border-2 border-black rounded flex items-center justify-between text-xs font-sans">
                  <span className="text-gray-700 font-medium">RECIPIENTS RESOLVED:</span>
                  <span className="font-black bg-[#00D9FF] px-2.5 py-0.5 rounded border border-black">
                    {calculatedRecipients.length} Recipient(s)
                  </span>
                </div>

                {/* 2. Quick Templates Selector */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                    <label className="text-xs font-sans font-black uppercase">
                      LOAD PRESET TEMPLATE:
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] font-sans">
                    <button
                      type="button"
                      onClick={() => handleSelectTemplate('finalist_selection')}
                      className={`px-2.5 py-1 rounded border border-black font-bold transition-colors ${
                        activeTemplate === 'finalist_selection' ? 'bg-yellow-300' : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      🎉 Top 15 Finalist Selection
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectTemplate('schedule_reminder')}
                      className={`px-2.5 py-1 rounded border border-black font-bold transition-colors ${
                        activeTemplate === 'schedule_reminder' ? 'bg-yellow-300' : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      🗓️ Schedule & Venue Details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectTemplate('screening_update')}
                      className={`px-2.5 py-1 rounded border border-black font-bold transition-colors ${
                        activeTemplate === 'screening_update' ? 'bg-yellow-300' : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      ⏳ Screening Status Update
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectTemplate('blank')}
                      className={`px-2.5 py-1 rounded border border-black font-bold transition-colors ${
                        activeTemplate === 'blank' ? 'bg-yellow-300' : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      ✏️ Blank Custom Email
                    </button>
                  </div>
                </div>

                {/* 3. Email Subject */}
                <div>
                  <label className="block text-xs font-sans font-black uppercase mb-1.5">
                    EMAIL SUBJECT LINE *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. [Builders Arena 2026] Important Update"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full bg-white border-2 border-black rounded p-2.5 text-xs font-sans font-semibold focus:outline-none focus:shadow-[3px_3px_0px_#000000]"
                  />
                </div>

                {/* 4. Heading & Badge */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-sans font-black uppercase mb-1.5">
                      EMAIL HEADER TITLE
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. HACKATHON BRIEFING"
                      value={emailHeading}
                      onChange={(e) => setEmailHeading(e.target.value)}
                      className="w-full bg-white border-2 border-black rounded p-2.5 text-xs font-sans focus:outline-none focus:shadow-[3px_3px_0px_#000000]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-black uppercase mb-1.5">
                      CATEGORY BADGE
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. OFFICIAL ANNOUNCEMENT"
                      value={emailBadge}
                      onChange={(e) => setEmailBadge(e.target.value)}
                      className="w-full bg-white border-2 border-black rounded p-2.5 text-xs font-sans focus:outline-none focus:shadow-[3px_3px_0px_#000000]"
                    />
                  </div>
                </div>

                {/* 5. Message Body */}
                <div>
                  <label className="block text-xs font-sans font-black uppercase mb-1.5">
                    MESSAGE CONTENT *
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Write your email body here. Double-line breaks create distinct paragraphs..."
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    className="w-full bg-white border-2 border-black rounded p-3 text-xs font-sans leading-relaxed focus:outline-none focus:shadow-[3px_3px_0px_#000000]"
                  />
                </div>

                {/* 6. Optional Action Button */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-sans font-black uppercase mb-1.5">
                      CALL-TO-ACTION BUTTON TEXT (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. JOIN WHATSAPP COMMUNITY"
                      value={emailActionText}
                      onChange={(e) => setEmailActionText(e.target.value)}
                      className="w-full bg-white border-2 border-black rounded p-2.5 text-xs font-sans focus:outline-none focus:shadow-[3px_3px_0px_#000000]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-black uppercase mb-1.5">
                      CALL-TO-ACTION URL (OPTIONAL)
                    </label>
                    <input
                      type="url"
                      placeholder="e.g. https://wa.me/2348061764593"
                      value={emailActionUrl}
                      onChange={(e) => setEmailActionUrl(e.target.value)}
                      className="w-full bg-white border-2 border-black rounded p-2.5 text-xs font-sans focus:outline-none focus:shadow-[3px_3px_0px_#000000]"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t-3 border-black flex flex-wrap gap-3 justify-end items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setEmailModalOpen(false);
                      setEmailToast(null);
                    }}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 font-sans text-xs font-bold uppercase rounded border-2 border-black transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={emailSending || calculatedRecipients.length === 0}
                    className={`neo-btn-primary px-6 py-2.5 text-xs font-display uppercase tracking-wider flex items-center gap-2 ${
                      emailSending || calculatedRecipients.length === 0 ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{emailSending ? 'DISPATCHING EMAILS...' : `SEND EMAIL (${calculatedRecipients.length})`}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
