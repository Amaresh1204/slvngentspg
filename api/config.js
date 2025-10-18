export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const config = {
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    serviceId: process.env.EMAILJS_SERVICE_ID,
    templateId: process.env.EMAILJS_TEMPLATE_ID,
    visitTemplateId: process.env.EMAILJS_VISIT_TEMPLATE_ID,
    generalPublicKey: process.env.EMAILJS_GENERAL_PUBLIC_KEY,
    generalServiceId: process.env.EMAILJS_GENERAL_SERVICE_ID,
    bookingTemplateId: process.env.EMAILJS_BOOKING_TEMPLATE_ID,
    contactTemplateId: process.env.EMAILJS_CONTACT_TEMPLATE_ID,
    recipientEmail: process.env.RECIPIENT_EMAIL
  };

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  res.status(200).json(config);
}