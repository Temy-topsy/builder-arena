import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { TracksPage } from './pages/TracksPage';
import { SchedulePage } from './pages/SchedulePage';
import { SponsorsPage } from './pages/SponsorsPage';
import { MentorsPage } from './pages/MentorsPage';
import { TeamsPage } from './pages/TeamsPage';
import { FAQPage } from './pages/FAQPage';
import { SponsorApplyPage } from './pages/SponsorApplyPage';
import { AdminPage } from './pages/AdminPage';

export const App: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/status" element={<RegisterPage />} />
      <Route path="/my-team" element={<RegisterPage />} />
      <Route path="/tracks" element={<TracksPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/sponsors" element={<SponsorsPage />} />
      <Route path="/sponsor-apply" element={<SponsorApplyPage />} />
      <Route path="/mentors" element={<MentorsPage />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};
