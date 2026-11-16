import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sql, initDb } from './db.js';
import sendEmailHandler from '../api/send-email.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'arena2026!admin';

app.use(cors());
app.use(express.json());

// Email dispatch route
app.all('/api/send-email', (req, res) => sendEmailHandler(req, res));

// Helper for generating application/proposal IDs
function generateId(prefix) {
  const randNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${randNum}`;
}

// Authentication middleware for admin routes
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }
  const token = authHeader.split(' ')[1];
  if (token !== ADMIN_PASSCODE) {
    return res.status(403).json({ error: 'Forbidden: Invalid admin passcode' });
  }
  next();
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// --- PUBLIC FORM SUBMISSIONS ---

// 1. Submit Team Registration
app.post('/api/register', async (req, res) => {
  try {
    const {
      teamName,
      track,
      teamLeadName,
      teamLeadEmail,
      teamLeadPhone,
      matricNumber,
      departmentLevel,
      members,
      githubPortfolio,
      problemStatement,
    } = req.body;

    if (!teamName || !track || !teamLeadName || !teamLeadEmail || !teamLeadPhone) {
      return res.status(400).json({ error: 'Missing required registration fields.' });
    }

    const applicationId = generateId('BA2026-APP');
    const membersJson = JSON.stringify(members || []);

    const result = await sql`
      INSERT INTO team_registrations (
        application_id,
        team_name,
        track,
        team_lead_name,
        team_lead_email,
        team_lead_phone,
        matric_number,
        department_level,
        members,
        github_portfolio,
        problem_statement,
        status
      ) VALUES (
        ${applicationId},
        ${teamName},
        ${track},
        ${teamLeadName},
        ${teamLeadEmail},
        ${teamLeadPhone},
        ${matricNumber || ''},
        ${departmentLevel || ''},
        ${membersJson},
        ${githubPortfolio || ''},
        ${problemStatement || ''},
        'under_review'
      )
      RETURNING *;
    `;

    res.status(201).json({
      success: true,
      message: 'Team registration successfully submitted.',
      application: result[0],
    });
  } catch (err) {
    console.error('Error submitting team registration:', err);
    res.status(500).json({ error: 'Failed to process team registration. Please try again.' });
  }
});

// 2. Submit Sponsor Application
app.post('/api/sponsor-apply', async (req, res) => {
  try {
    const {
      companyName,
      tier,
      contactName,
      contactEmail,
      contactPhone,
      companyWebsite,
      industry,
      sponsorshipGoals,
      participationTypes,
      customRequests,
    } = req.body;

    if (!companyName || !tier || !contactName || !contactEmail || !contactPhone) {
      return res.status(400).json({ error: 'Missing required sponsorship fields.' });
    }

    const proposalId = generateId('BA2026-SPONSOR');
    const participationJson = JSON.stringify(participationTypes || []);

    const result = await sql`
      INSERT INTO sponsor_applications (
        proposal_id,
        company_name,
        tier,
        contact_name,
        contact_email,
        contact_phone,
        company_website,
        industry,
        sponsorship_goals,
        participation_types,
        custom_requests,
        status
      ) VALUES (
        ${proposalId},
        ${companyName},
        ${tier},
        ${contactName},
        ${contactEmail},
        ${contactPhone},
        ${companyWebsite || ''},
        ${industry || ''},
        ${sponsorshipGoals || ''},
        ${participationJson},
        ${customRequests || ''},
        'under_review'
      )
      RETURNING *;
    `;

    res.status(201).json({
      success: true,
      message: 'Sponsorship application successfully submitted.',
      proposal: result[0],
    });
  } catch (err) {
    console.error('Error submitting sponsor application:', err);
    res.status(500).json({ error: 'Failed to process sponsorship application. Please try again.' });
  }
});

// --- ADMIN PORTAL ENDPOINTS ---

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { passcode } = req.body;
  if (!passcode) {
    return res.status(400).json({ error: 'Passcode is required.' });
  }
  if (passcode !== ADMIN_PASSCODE) {
    return res.status(401).json({ error: 'Invalid admin passcode.' });
  }
  res.json({ success: true, token: ADMIN_PASSCODE, message: 'Authenticated successfully.' });
});

// Admin Stats
app.get('/api/admin/stats', requireAdminAuth, async (req, res) => {
  try {
    const statsRes = await sql`
      SELECT 
        (SELECT COUNT(*) FROM team_registrations)::int as total_teams,
        (SELECT COUNT(*) FROM team_registrations WHERE status = 'approved')::int as approved_teams,
        (SELECT COUNT(*) FROM sponsor_applications)::int as total_sponsors,
        (SELECT COUNT(*) FROM sponsor_applications WHERE status = 'approved')::int as approved_sponsors;
    `;

    const teamsRes = await sql`SELECT members FROM team_registrations`;
    let totalBuilders = teamsRes.length;
    teamsRes.forEach((t) => {
      if (Array.isArray(t.members)) {
        totalBuilders += t.members.length;
      }
    });

    const s = statsRes[0] || {};
    res.json({
      totalTeams: Number(s.total_teams || 0),
      approvedTeams: Number(s.approved_teams || 0),
      totalBuilders,
      totalSponsors: Number(s.total_sponsors || 0),
      approvedSponsors: Number(s.approved_sponsors || 0),
    });
  } catch (err) {
    console.error('Error fetching admin stats:', err);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});

// Get all team registrations (with optional search/filter)
app.get('/api/admin/registrations', requireAdminAuth, async (req, res) => {
  try {
    const { track, status } = req.query;

    let rows;
    if (track && status) {
      rows = await sql`
        SELECT * FROM team_registrations 
        WHERE track = ${track} AND status = ${status} 
        ORDER BY created_at DESC
      `;
    } else if (track) {
      rows = await sql`
        SELECT * FROM team_registrations 
        WHERE track = ${track} 
        ORDER BY created_at DESC
      `;
    } else if (status) {
      rows = await sql`
        SELECT * FROM team_registrations 
        WHERE status = ${status} 
        ORDER BY created_at DESC
      `;
    } else {
      rows = await sql`
        SELECT * FROM team_registrations 
        ORDER BY created_at DESC
      `;
    }

    res.json(rows);
  } catch (err) {
    console.error('Error fetching team registrations:', err);
    res.status(500).json({ error: 'Failed to fetch team registrations' });
  }
});

// Update team registration status
app.patch('/api/admin/registrations/:id/status', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['under_review', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updated = await sql`
      UPDATE team_registrations
      SET status = ${status}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (updated.length === 0) {
      return res.status(404).json({ error: 'Registration record not found' });
    }

    res.json({ success: true, registration: updated[0] });
  } catch (err) {
    console.error('Error updating registration status:', err);
    res.status(500).json({ error: 'Failed to update registration status' });
  }
});

// Delete team registration
app.delete('/api/admin/registrations/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await sql`DELETE FROM team_registrations WHERE id = ${id}`;
    res.json({ success: true, message: 'Registration deleted successfully' });
  } catch (err) {
    console.error('Error deleting registration:', err);
    res.status(500).json({ error: 'Failed to delete registration' });
  }
});

// Get all sponsor proposals (with optional search/filter)
app.get('/api/admin/sponsors', requireAdminAuth, async (req, res) => {
  try {
    const { tier, status } = req.query;

    let rows;
    if (tier && status) {
      rows = await sql`
        SELECT * FROM sponsor_applications 
        WHERE tier = ${tier} AND status = ${status} 
        ORDER BY created_at DESC
      `;
    } else if (tier) {
      rows = await sql`
        SELECT * FROM sponsor_applications 
        WHERE tier = ${tier} 
        ORDER BY created_at DESC
      `;
    } else if (status) {
      rows = await sql`
        SELECT * FROM sponsor_applications 
        WHERE status = ${status} 
        ORDER BY created_at DESC
      `;
    } else {
      rows = await sql`
        SELECT * FROM sponsor_applications 
        ORDER BY created_at DESC
      `;
    }

    res.json(rows);
  } catch (err) {
    console.error('Error fetching sponsor applications:', err);
    res.status(500).json({ error: 'Failed to fetch sponsor applications' });
  }
});

// Update sponsor proposal status
app.patch('/api/admin/sponsors/:id/status', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['under_review', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updated = await sql`
      UPDATE sponsor_applications
      SET status = ${status}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (updated.length === 0) {
      return res.status(404).json({ error: 'Sponsorship record not found' });
    }

    res.json({ success: true, sponsor: updated[0] });
  } catch (err) {
    console.error('Error updating sponsor status:', err);
    res.status(500).json({ error: 'Failed to update sponsor status' });
  }
});

// Delete sponsor application
app.delete('/api/admin/sponsors/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await sql`DELETE FROM sponsor_applications WHERE id = ${id}`;
    res.json({ success: true, message: 'Sponsor proposal deleted successfully' });
  } catch (err) {
    console.error('Error deleting sponsor application:', err);
    res.status(500).json({ error: 'Failed to delete sponsor proposal' });
  }
});

// Start server and initialize database tables
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚡ BUILDERS ARENA Backend API Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server due to database error:', err);
    process.exit(1);
  });
