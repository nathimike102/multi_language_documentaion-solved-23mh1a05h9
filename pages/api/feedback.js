import nodemailer from 'nodemailer';

function getTransportOptions() {
  const {
    SMTP_SERVICE,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_SECURE,
  } = process.env;

  if (SMTP_SERVICE) {
    return {
      service: SMTP_SERVICE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    };
  }

  return {
    host: SMTP_HOST,
    port: SMTP_PORT ? Number(SMTP_PORT) : 587,
    secure: SMTP_SECURE === 'true',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  };
}

function validateConfig() {
  const { SMTP_SERVICE, SMTP_HOST, SMTP_USER, SMTP_PASS, FEEDBACK_TO } = process.env;

  if (!SMTP_USER || !SMTP_PASS || !FEEDBACK_TO) {
    return 'Missing SMTP_USER, SMTP_PASS, or FEEDBACK_TO';
  }

  if (!SMTP_SERVICE && !SMTP_HOST) {
    return 'Missing SMTP_SERVICE or SMTP_HOST';
  }

  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const configError = validateConfig();
  if (configError) {
    return res.status(500).json({ message: configError });
  }

  const { message, pageUrl } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ message: 'Feedback message is required' });
  }

  try {
    const transport = nodemailer.createTransport(getTransportOptions());

    const from = process.env.FEEDBACK_FROM || process.env.SMTP_USER;
    const to = process.env.FEEDBACK_TO;
    const subject = pageUrl ? `DocPortal Feedback - ${pageUrl}` : 'DocPortal Feedback';

    const text = [
      'New feedback received:',
      '',
      message.trim(),
      '',
      pageUrl ? `Page: ${pageUrl}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    console.log('Feedback send attempt', {
      to,
      from,
      subject,
      pageUrl: pageUrl || null,
      messageLength: message.trim().length,
    });

    const result = await transport.sendMail({
      from,
      to,
      subject,
      text,
      replyTo: from,
    });

    console.log('Feedback sent', { messageId: result.messageId });
    return res.status(200).json({ message: 'Feedback sent' });
  } catch (error) {
    console.error('Feedback send failed', {
      message: error?.message,
      code: error?.code,
      response: error?.response,
    });
    return res.status(500).json({ message: 'Failed to send feedback' });
  }
}
