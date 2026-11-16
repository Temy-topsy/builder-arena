import nodemailer from 'nodemailer';

// Create Nodemailer Transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILER_EMAIL || 'ooutechcommunity@gmail.com',
    pass: (process.env.MAILER_PASSWORD || 'nxtklfxuckzhbevp').replace(/\s+/g, ''),
  },
});

// Helper for Neo-Brutalist HTML Email Template for Registration
function getRegistrationEmailHtml({
  applicationId,
  teamName,
  track,
  teamLeadName,
  teamLeadEmail,
  teamLeadPhone,
  departmentLevel,
  matricNumber,
  members,
  githubPortfolio,
  problemStatement,
}) {
  const memberRows = Array.isArray(members) && members.length > 0
    ? members
        .map(
          (m, idx) => `
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #000; font-size: 13px;">Builder #${idx + 2}: <strong>${m.name || 'Member'}</strong></td>
              <td style="padding: 8px 12px; border: 1px solid #000; font-size: 13px;">${m.role || 'Member'}</td>
              <td style="padding: 8px 12px; border: 1px solid #000; font-size: 13px;">${m.email || 'N/A'}</td>
            </tr>`
        )
        .join('')
    : '<tr><td colspan="3" style="padding: 8px 12px; border: 1px solid #000; font-size: 13px; text-align: center;">No additional members listed</td></tr>';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Builders Arena 2026 Application Receipt</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #F8FAFC; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #000;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 3px solid #000000; box-shadow: 6px 6px 0px #000000; border-radius: 8px; overflow: hidden;">
    <!-- Header -->
    <tr>
      <td style="background-color: #060A20; padding: 28px 24px; text-align: center; border-bottom: 3px solid #000000;">
        <div style="display: inline-block; background-color: #FFC700; color: #000; padding: 4px 12px; font-weight: 800; font-size: 11px; text-transform: uppercase; border: 2px solid #000; border-radius: 4px; margin-bottom: 12px; letter-spacing: 0.5px;">
          OOU TECH COMMUNITY (OTC)
        </div>
        <h1 style="color: #FFFFFF; margin: 0; font-size: 26px; font-weight: 900; letter-spacing: -0.5px; text-transform: uppercase;">
          BUILDERS ARENA 2026
        </h1>
        <p style="color: #00E5FF; margin: 6px 0 0 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
          48-Hour Hybrid Hackathon Sprint
        </p>
      </td>
    </tr>

    <!-- Body Content -->
    <tr>
      <td style="padding: 32px 24px;">
        <h2 style="font-size: 20px; font-weight: 900; margin-top: 0; margin-bottom: 8px; text-transform: uppercase;">
          APPLICATION CONFIRMATION SLIP
        </h2>
        <p style="font-size: 14px; line-height: 1.6; color: #1F2937; margin-bottom: 24px;">
          Hello <strong>${teamLeadName}</strong>,<br>
          We have successfully received your team's application for <strong>Builders Arena 2026</strong>! Your solution proposal is now queued for screening by the technical jury into the top 15 finalist cohort.
        </p>

        <!-- Receipt Box -->
        <div style="background-color: #F3F4F6; border: 2px solid #000000; box-shadow: 4px 4px 0px #000000; border-radius: 6px; padding: 18px; margin-bottom: 24px;">
          <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px;">
            <tr>
              <td style="color: #4B5563; font-weight: 700;">APPLICATION ID:</td>
              <td style="text-align: right;"><span style="background-color: #00E5FF; color: #000; padding: 3px 8px; border: 1.5px solid #000; font-weight: 900; border-radius: 4px;">${applicationId}</span></td>
            </tr>
            <tr>
              <td style="color: #4B5563; font-weight: 700;">TEAM NAME:</td>
              <td style="text-align: right; font-weight: 800; color: #000;">${teamName}</td>
            </tr>
            <tr>
              <td style="color: #4B5563; font-weight: 700;">CHALLENGE TRACK:</td>
              <td style="text-align: right;"><span style="background-color: #FFC700; color: #000; padding: 2px 8px; border: 1.5px solid #000; font-weight: 800; border-radius: 4px; text-transform: uppercase;">${track} TRACK</span></td>
            </tr>
            <tr>
              <td style="color: #4B5563; font-weight: 700;">TEAM LEAD:</td>
              <td style="text-align: right; font-weight: 700;">${teamLeadName}</td>
            </tr>
            <tr>
              <td style="color: #4B5563; font-weight: 700;">LEAD CONTACT:</td>
              <td style="text-align: right;">${teamLeadEmail} | ${teamLeadPhone}</td>
            </tr>
            <tr>
              <td style="color: #4B5563; font-weight: 700;">INSTITUTION / LEVEL:</td>
              <td style="text-align: right;">${departmentLevel || 'OOU'} (${matricNumber || 'N/A'})</td>
            </tr>
            <tr>
              <td style="color: #4B5563; font-weight: 700;">SCREENING STATUS:</td>
              <td style="text-align: right;"><span style="background-color: #000; color: #00E5FF; padding: 3px 8px; font-weight: 900; border-radius: 4px; text-transform: uppercase;">UNDER REVIEW</span></td>
            </tr>
          </table>
        </div>

        <!-- Team Roster -->
        <h3 style="font-size: 14px; font-weight: 800; text-transform: uppercase; margin-bottom: 8px;">
          REGISTERED TEAM ROSTER
        </h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 24px; border: 2px solid #000;">
          <thead>
            <tr style="background-color: #000; color: #FFF; font-size: 11px; text-transform: uppercase;">
              <th style="padding: 8px 12px; text-align: left; border: 1px solid #000;">Name</th>
              <th style="padding: 8px 12px; text-align: left; border: 1px solid #000;">Role</th>
              <th style="padding: 8px 12px; text-align: left; border: 1px solid #000;">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background-color: #FFF9DB;">
              <td style="padding: 8px 12px; border: 1px solid #000; font-size: 13px;">Builder #1: <strong>${teamLeadName}</strong></td>
              <td style="padding: 8px 12px; border: 1px solid #000; font-size: 13px;">Team Lead</td>
              <td style="padding: 8px 12px; border: 1px solid #000; font-size: 13px;">${teamLeadEmail}</td>
            </tr>
            ${memberRows}
          </tbody>
        </table>

        <!-- Key Dates -->
        <div style="background-color: #EBF4EC; border: 2px solid #000; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
          <h4 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 900; text-transform: uppercase; color: #165B33;">
            🗓️ IMPORTANT HACKATHON TIMELINE
          </h4>
          <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6; color: #1F2937;">
            <li><strong>Virtual Coding Sprint:</strong> 18th November 2026 (Online)</li>
            <li><strong>Physical Grand Finale:</strong> 19th – 20th November 2026</li>
            <li><strong>Venue:</strong> OOU Tech Hub, ICT Building, OOU Main Campus, Ago-Iwoye</li>
            <li><strong>Top 15 Announcement:</strong> Selected teams will be contacted via email & WhatsApp</li>
          </ul>
        </div>

        <!-- Call to Action Buttons -->
        <div style="text-align: center; margin-top: 32px;">
          <a href="https://wa.me/2348061764593" style="display: inline-block; background-color: #25D366; color: #000; padding: 14px 28px; text-decoration: none; font-weight: 900; font-size: 13px; text-transform: uppercase; border: 2px solid #000; box-shadow: 4px 4px 0px #000; border-radius: 6px; margin-right: 8px; margin-bottom: 12px;">
            JOIN OFFICIAL WHATSAPP GROUP
          </a>
          <a href="https://builder-arena.vercel.app/register?lookup=true" style="display: inline-block; background-color: #FFFFFF; color: #000; padding: 14px 24px; text-decoration: none; font-weight: 900; font-size: 13px; text-transform: uppercase; border: 2px solid #000; box-shadow: 4px 4px 0px #000; border-radius: 6px; margin-bottom: 12px;">
            VIEW APPLICATION STATUS
          </a>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #F3F4F6; padding: 20px 24px; border-top: 2px solid #000000; text-align: center; font-size: 11px; color: #6B7280;">
        <p style="margin: 0 0 6px 0; font-weight: 700; color: #111827;">
          OOU TECH COMMUNITY (OTC) • BUILDERS ARENA 2026
        </p>
        <p style="margin: 0;">
          Olabisi Onabanjo University, Ago-Iwoye, Ogun State, Nigeria.<br>
          Need help? Contact us directly via WhatsApp: +234 806 176 4593 or reply to this email.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

// Handler for Vercel Serverless Function & Express
export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { type, payload } = req.body;

    if (!payload) {
      return res.status(400).json({ error: 'Missing payload data.' });
    }

    const senderEmail = process.env.MAILER_EMAIL || 'ooutechcommunity@gmail.com';

    // TYPE 1: Team Registration Confirmation
    if (type === 'team_registration') {
      const {
        applicationId,
        teamName,
        track,
        teamLeadName,
        teamLeadEmail,
        teamLeadPhone,
        departmentLevel,
        matricNumber,
        members,
        githubPortfolio,
        problemStatement,
      } = payload;

      if (!teamLeadEmail || !teamName) {
        return res.status(400).json({ error: 'Missing team lead email or team name.' });
      }

      // 1. Send confirmation to Team Lead
      const userMailOptions = {
        from: `"Builders Arena 2026" <${senderEmail}>`,
        to: teamLeadEmail,
        subject: `[Builders Arena 2026] Application Received - Team ${teamName} (${applicationId})`,
        html: getRegistrationEmailHtml(payload),
      };

      // 2. Send notification to Admin (OOU Tech Community)
      const adminMailOptions = {
        from: `"Builders Arena Bot" <${senderEmail}>`,
        to: senderEmail,
        subject: `🚨 [New Registration] ${teamName} - ${track?.toUpperCase()} Track (${applicationId})`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #000; max-width: 600px;">
            <h2 style="color: #060A20; border-bottom: 2px solid #000; padding-bottom: 8px;">New Team Registration Received!</h2>
            <p><strong>Application ID:</strong> ${applicationId}</p>
            <p><strong>Team Name:</strong> ${teamName}</p>
            <p><strong>Track:</strong> ${track?.toUpperCase()} TRACK</p>
            <p><strong>Team Lead:</strong> ${teamLeadName} (${teamLeadEmail} | ${teamLeadPhone})</p>
            <p><strong>Institution / Level:</strong> ${departmentLevel} (${matricNumber})</p>
            <p><strong>Total Members:</strong> ${(members?.length || 0) + 1}</p>
            <p><strong>GitHub / Portfolio:</strong> <a href="${githubPortfolio}">${githubPortfolio}</a></p>
            <p><strong>Solution Proposal:</strong><br>${(problemStatement || '').replace(/\n/g, '<br>')}</p>
            <hr style="border: 1px solid #000; margin: 20px 0;">
            <p><a href="https://builder-arena.vercel.app/admin" style="display: inline-block; background: #000; color: #00E5FF; padding: 10px 18px; text-decoration: none; font-weight: bold; border-radius: 4px;">Open Admin Dashboard</a></p>
          </div>
        `,
      };

      // Send in parallel
      await Promise.all([
        transporter.sendMail(userMailOptions),
        transporter.sendMail(adminMailOptions),
      ]);

      return res.status(200).json({
        success: true,
        message: 'Registration confirmation and admin alert sent successfully.',
      });
    }

    // TYPE 2: Sponsorship Proposal Confirmation
    if (type === 'sponsor_proposal') {
      const {
        proposalId,
        companyName,
        tier,
        contactName,
        contactEmail,
        contactPhone,
        companyWebsite,
        industry,
        contributionType,
        notes,
      } = payload;

      if (!contactEmail || !companyName) {
        return res.status(400).json({ error: 'Missing sponsor email or company name.' });
      }

      // 1. Send receipt to Sponsor Contact
      const sponsorMailOptions = {
        from: `"Builders Arena 2026" <${senderEmail}>`,
        to: contactEmail,
        subject: `[Builders Arena 2026] Partnership Proposal Received - ${companyName} (${tier?.toUpperCase()} Tier)`,
        html: `
          <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; padding: 24px; border: 3px solid #000; box-shadow: 6px 6px 0px #000; max-width: 600px; margin: 0 auto; background: #FFF;">
            <h1 style="color: #060A20; font-size: 22px; text-transform: uppercase; border-bottom: 3px solid #000; padding-bottom: 12px; margin-top: 0;">
              Builders Arena 2026 • Sponsorship Proposal
            </h1>
            <p>Dear <strong>${contactName}</strong>,</p>
            <p>Thank you for expressing interest in partnering with <strong>Builders Arena 2026</strong> as a <strong>${tier?.toUpperCase()} Sponsor</strong>.</p>
            <div style="background: #F3F4F6; border: 2px solid #000; padding: 16px; margin: 20px 0;">
              <p style="margin: 4px 0;"><strong>Proposal ID:</strong> ${proposalId}</p>
              <p style="margin: 4px 0;"><strong>Company:</strong> ${companyName}</p>
              <p style="margin: 4px 0;"><strong>Tier:</strong> ${tier?.toUpperCase()}</p>
              <p style="margin: 4px 0;"><strong>Contact:</strong> ${contactName} (${contactEmail} | ${contactPhone})</p>
            </div>
            <p>Our team at OOU Tech Community will review your proposal details and follow up with the formal sponsorship deck, MOU, and technical integration deliverables.</p>
            <p>Warm regards,<br><strong>OOU Tech Community (OTC) Partnerships Team</strong></p>
          </div>
        `,
      };

      // 2. Send alert to Admin
      const adminSponsorOptions = {
        from: `"Builders Arena Bot" <${senderEmail}>`,
        to: senderEmail,
        subject: `💼 [New Sponsor Proposal] ${companyName} (${tier?.toUpperCase()} Tier)`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #000; max-width: 600px;">
            <h2>New Sponsorship Proposal Submitted!</h2>
            <p><strong>Proposal ID:</strong> ${proposalId}</p>
            <p><strong>Company:</strong> ${companyName} (${companyWebsite || 'No website'})</p>
            <p><strong>Industry:</strong> ${industry}</p>
            <p><strong>Tier:</strong> ${tier?.toUpperCase()}</p>
            <p><strong>Contact:</strong> ${contactName} (${contactEmail} | ${contactPhone})</p>
            <p><strong>Contributions:</strong> ${Array.isArray(contributionType) ? contributionType.join(', ') : contributionType}</p>
            <p><strong>Notes:</strong><br>${notes || 'N/A'}</p>
          </div>
        `,
      };

      await Promise.all([
        transporter.sendMail(sponsorMailOptions),
        transporter.sendMail(adminSponsorOptions),
      ]);

      return res.status(200).json({
        success: true,
        message: 'Sponsorship emails sent successfully.',
      });
    }

    return res.status(400).json({ error: `Unknown email type: ${type}` });
  } catch (err) {
    console.error('Send Email Error:', err);
    return res.status(500).json({
      error: err.message || 'Failed to send email through SMTP.',
    });
  }
}
