import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { FinalistModelSection } from '../components/FinalistModelSection';
import { supabase } from '../lib/supabase';
import { Users, Shield, ArrowRight } from 'lucide-react';

interface ApprovedTeam {
  id: string | number;
  application_id: string;
  team_name: string;
  track: string;
  team_lead_name: string;
  members: Array<{ name: string; role: string }>;
  status: string;
}

export const TeamsPage: React.FC = () => {
  const [approvedTeams, setApprovedTeams] = useState<ApprovedTeam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApprovedTeams() {
      try {
        const { data, error } = await supabase
          .from('team_registrations')
          .select('id, application_id, team_name, track, team_lead_name, members, status')
          .eq('status', 'approved')
          .order('created_at', { ascending: true });

        if (!error && Array.isArray(data)) {
          setApprovedTeams(data as any);
        }
      } catch (err) {
        console.error('Error loading approved teams:', err);
      } finally {
        setLoading(false);
      }
    }

    loadApprovedTeams();
  }, []);

  return (
    <div className="min-h-screen bg-neo-hero text-black">
      <CustomCursor />
      <Navbar />
      <div className="pt-20">
        <FinalistModelSection />

        {/* Live Approved Finalist Roster */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4 flex flex-col items-center">
            <span className="neo-tag bg-black text-[#00D9FF]">
              LIVE COHORT ROSTER
            </span>
            <div className="inline-block bg-white text-black border-3 border-black px-6 sm:px-10 py-3 rounded-md shadow-[6px_6px_0px_#000000]">
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight">
                OFFICIAL FINALIST COHORT
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-white max-w-xl text-center">
              The approved student engineering teams selected to build live in the arena.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-white font-mono text-sm">
              LOADING ROSTER...
            </div>
          ) : approvedTeams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedTeams.map((team, idx) => (
                <div
                  key={team.id}
                  className="bg-white border-3 border-black rounded-lg p-6 shadow-[6px_6px_0px_#000000] space-y-4 hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  <div className="flex items-center justify-between border-b-2 border-black pb-3">
                    <span className="font-mono text-xs font-black bg-black text-[#00D9FF] px-2 py-0.5 rounded">
                      TEAM #{idx + 1}
                    </span>
                    <span className="font-mono text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800 border border-emerald-400 px-2 py-0.5 rounded">
                      APPROVED FINALIST
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-black text-xl uppercase tracking-tight text-black">
                      {team.team_name}
                    </h3>
                    <div className="font-mono text-xs uppercase font-bold text-gray-600 mt-1">
                      TRACK: <span className="text-black font-black underline">{team.track}</span>
                    </div>
                  </div>

                  <div className="bg-gray-100 border-2 border-black rounded p-3 font-sans text-xs space-y-1">
                    <div>
                      <span className="text-gray-500 font-medium">Lead:</span>{' '}
                      <span className="text-black font-semibold">{team.team_lead_name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Users className="w-3.5 h-3.5" />
                      <span>
                        {(team.members?.length || 0) + 1} Builders in squad
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white text-black border-3 border-black p-8 sm:p-12 rounded-xl text-center max-w-2xl mx-auto shadow-[8px_8px_0px_#000000] space-y-4">
              <Shield className="w-12 h-12 text-black mx-auto" />
              <h3 className="font-display font-black text-xl sm:text-2xl uppercase">
                COHORT SCREENING IN PROGRESS
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gray-700 max-w-md mx-auto leading-relaxed">
                Applications are currently being reviewed by the OTC technical board. The 15 official finalist teams will be published here upon selection.
              </p>
              <div className="pt-2">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 neo-btn-primary px-6 py-3 text-xs font-display uppercase tracking-wider"
                >
                  <span>APPLY TO JOIN THE 15 TEAMS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};
