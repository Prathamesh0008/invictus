import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and message are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create transporter with your email service
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Format date
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Email to admin (you) - Professional & Clean
    await transporter.sendMail({
      from: `"Invictus Logistics" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || 'info@invictuslogistics.com',
      replyTo: email,
      subject: `📬 New Contact: ${subject || 'General Inquiry'} from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f7; line-height: 1.6;">
          <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            
            <!-- Header with Gradient -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center;">
              <div style="width: 60px; height: 60px; background-color: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 30px;">📬</span>
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px;">${currentDate}</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px 25px;">
              <!-- Contact Information Card -->
              <div style="background: linear-gradient(135deg, #667eea08 0%, #764ba208 100%); border-radius: 12px; padding: 20px; margin-bottom: 25px; border: 1px solid #eef2f6;">
                <h2 style="color: #2d3748; font-size: 18px; margin: 0 0 15px; font-weight: 600; display: flex; align-items: center;">
                  <span style="display: inline-block; width: 8px; height: 8px; background: #667eea; border-radius: 50%; margin-right: 8px;"></span>
                  Contact Information
                </h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                  <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #eef2f6;">
                    <div style="color: #718096; font-size: 12px; margin-bottom: 4px;">Name</div>
                    <div style="color: #2d3748; font-weight: 500; font-size: 16px;">${name}</div>
                  </div>
                  <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #eef2f6;">
                    <div style="color: #718096; font-size: 12px; margin-bottom: 4px;">Email</div>
                    <div style="color: #2d3748; font-weight: 500; font-size: 16px;">
                      <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                    </div>
                  </div>
                  ${phone ? `
                  <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #eef2f6;">
                    <div style="color: #718096; font-size: 12px; margin-bottom: 4px;">Phone</div>
                    <div style="color: #2d3748; font-weight: 500; font-size: 16px;">${phone}</div>
                  </div>
                  ` : ''}
                  ${company ? `
                  <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #eef2f6;">
                    <div style="color: #718096; font-size: 12px; margin-bottom: 4px;">Company</div>
                    <div style="color: #2d3748; font-weight: 500; font-size: 16px;">${company}</div>
                  </div>
                  ` : ''}
                </div>
              </div>
              
              <!-- Subject Card -->
              <div style="background: #f8fafd; border-radius: 12px; padding: 20px; margin-bottom: 25px; border: 1px solid #eef2f6;">
                <h2 style="color: #2d3748; font-size: 18px; margin: 0 0 10px; font-weight: 600;">Subject</h2>
                <div style="color: #4a5568; font-size: 16px; background: white; padding: 15px; border-radius: 8px; border: 1px solid #eef2f6;">
                  ${subject || 'General Inquiry'}
                </div>
              </div>
              
              <!-- Message Card -->
              <div style="background: #f8fafd; border-radius: 12px; padding: 20px; border: 1px solid #eef2f6;">
                <h2 style="color: #2d3748; font-size: 18px; margin: 0 0 10px; font-weight: 600;">Message</h2>
                <div style="color: #4a5568; font-size: 15px; background: white; padding: 20px; border-radius: 8px; border: 1px solid #eef2f6; white-space: pre-wrap; line-height: 1.6;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f8fafd; padding: 20px 25px; text-align: center; border-top: 1px solid #eef2f6;">
              <p style="color: #718096; font-size: 13px; margin: 0;">
                This message was sent from the Invictus Logistics contact form.<br>
                <span style="color: #a0aec0;">© ${new Date().getFullYear()} Invictus Logistics. All rights reserved.</span>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Confirmation email to user - Modern & Responsive
    await transporter.sendMail({
      from: `"Invictus Logistics" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '✅ We received your message - Invictus Logistics',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for contacting Invictus Logistics</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f7; line-height: 1.6;">
          <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);">
            
            <!-- Hero Section with Brand Colors -->
            <div style="background: linear-gradient(135deg, #FAB045 0%, #f5921e 100%); padding: 40px 20px 30px; text-align: center;">
              <div style="width: 80px; height: 80px; background-color: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px);">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="white"/>
                </svg>
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Thank You!</h1>
              <p style="color: rgba(255,255,255,0.95); margin: 8px 0 0; font-size: 16px;">We've received your message</p>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 35px 30px;">
              <!-- Personalized Greeting -->
              <div style="margin-bottom: 30px;">
                <p style="color: #2d3748; font-size: 18px; margin: 0 0 5px;">Dear <strong style="color: #FAB045;">${name}</strong>,</p>
                <p style="color: #4a5568; font-size: 16px; margin: 0;">Thank you for reaching out to Invictus Logistics. We have received your inquiry and our team will get back to you within <strong style="color: #FAB045;">2 hours</strong>.</p>
              </div>
              
              <!-- Message Summary Card -->
              <div style="background: linear-gradient(135deg, #fff6e5 0%, #ffecd9 100%); border-radius: 16px; padding: 25px; margin-bottom: 30px; border: 1px solid #ffe4bc;">
                <h2 style="color: #2d3748; font-size: 18px; margin: 0 0 15px; font-weight: 600; display: flex; align-items: center;">
                  <span style="background: #FAB045; width: 24px; height: 24px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 14px; margin-right: 10px;">📝</span>
                  Your Message Summary
                </h2>
                
                <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #ffe4bc;">
                  <div style="display: grid; gap: 12px;">
                    <div style="display: flex; flex-wrap: wrap; padding-bottom: 12px; border-bottom: 1px dashed #ffe4bc;">
                      <span style="color: #718096; width: 80px; font-size: 14px;">Subject:</span>
                      <span style="color: #2d3748; font-weight: 500; flex: 1;">${subject || 'General Inquiry'}</span>
                    </div>
                    <div style="display: flex; flex-wrap: wrap;">
                      <span style="color: #718096; width: 80px; font-size: 14px;">Message:</span>
                      <span style="color: #4a5568; flex: 1; line-height: 1.5;">${message.substring(0, 150)}${message.length > 150 ? '...' : ''}</span>
                    </div>
                  </div>
                </div>
              </div>
              
            <!-- Quick Actions Grid -->
<h2 style="color: #2d3748; font-size: 18px; margin: 0 0 15px; font-weight: 600;">
  Need Immediate Assistance?
</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 30px;">
  <!-- Phone Card -->
  <a href="tel:+31685865799" style="text-decoration: none; display: block;">
    <div style="background: #f8fafd; border-radius: 12px; padding: 20px; text-align: center; border: 1px solid #eef2f6;">
      <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #F04A00 0%, #FAB045 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
        <span style="color: white; font-size: 24px;">📞</span>
      </div>
      <div style="color: #2d3748; font-weight: 600; margin-bottom: 4px;">Call Us</div>
      <div style="color: #718096; font-size: 14px;">+31 6 85865799</div>
      <div style="color: #F04A00; font-size: 13px; margin-top: 8px;">24/7 Available</div>
    </div>
  </a>

  <!-- WhatsApp Card -->
  <a href="https://wa.me/918291293651" style="text-decoration: none; display: block;">
    <div style="background: #f8fafd; border-radius: 12px; padding: 20px; text-align: center; border: 1px solid #eef2f6;">
      <div style="width: 48px; height: 48px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
        <span style="color: white; font-size: 28px;">💬</span>
      </div>
      <div style="color: #2d3748; font-weight: 600; margin-bottom: 4px;">WhatsApp</div>
      <div style="color: #718096; font-size: 14px;">+91 8291293651</div>
      <div style="color: #25D366; font-size: 13px; margin-top: 8px;">Instant Chat</div>
    </div>
  </a>
</div>
                
                <!-- Email Card -->
                <div style="background: #f8fafd; border-radius: 12px; padding: 20px; text-align: center; border: 1px solid #eef2f6;">
                  <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
                    <span style="color: white; font-size: 24px;">✉️</span>
                  </div>
                  <div style="color: #2d3748; font-weight: 600; margin-bottom: 4px;">Email</div>
                  <div style="color: #718096; font-size: 14px;">info@invictuslogistics.com</div>
                  <div style="color: #667eea; font-size: 13px; margin-top: 8px;">2h Response</div>
                </div>
              </div>
              
              <!-- Business Hours -->
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 16px; padding: 20px; margin-bottom: 25px;">
                <h3 style="color: #2d3748; font-size: 16px; margin: 0 0 12px; font-weight: 600;">Business Hours</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
                  <div>
                    <div style="color: #718096; font-size: 13px;">Mon - Fri</div>
                    <div style="color: #2d3748; font-weight: 500;">9:00 AM - 6:00 PM</div>
                  </div>
                  <div>
                    <div style="color: #718096; font-size: 13px;">Saturday</div>
                    <div style="color: #2d3748; font-weight: 500;">10:00 AM - 4:00 PM</div>
                  </div>
                  <div>
                    <div style="color: #718096; font-size: 13px;">Sunday</div>
                    <div style="color: #FAB045; font-weight: 500;">Emergency Only</div>
                  </div>
                </div>
              </div>
              
              <!-- Social Links -->
              <div style="text-align: center; padding: 20px; background: #f8fafd; border-radius: 16px;">
                <p style="color: #4a5568; font-size: 14px; margin: 0 0 15px;">Connect with us on social media</p>
                <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                  <a href="#" style="display: inline-block; padding: 8px 16px; background: #0077b5; color: white; text-decoration: none; border-radius: 20px; font-size: 13px;">LinkedIn</a>
                  <a href="#" style="display: inline-block; padding: 8px 16px; background: #1da1f2; color: white; text-decoration: none; border-radius: 20px; font-size: 13px;">Twitter</a>
                  <a href="#" style="display: inline-block; padding: 8px 16px; background: #4267B2; color: white; text-decoration: none; border-radius: 20px; font-size: 13px;">Facebook</a>
                </div>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #1a202c; padding: 25px 30px; text-align: center;">
              <div style="margin-bottom: 15px;">
                <span style="color: #FAB045; font-size: 20px; font-weight: 700;">INVICTUS</span>
                <span style="color: white; font-size: 20px; font-weight: 300;"> LOGISTICS</span>
              </div>
              <p style="color: #718096; font-size: 13px; margin: 0 0 10px;">
                This is an automated confirmation. Please do not reply to this email.
              </p>
              <p style="color: #4a5568; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} Invictus Logistics. All rights reserved.
              </p>
            </div>
          </div>
          
          <!-- Mobile Optimizations -->
          <style>
            @media only screen and (max-width: 480px) {
              div[style*="padding: 35px 30px"] {
                padding: 25px 20px !important;
              }
              div[style*="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))"] {
                grid-template-columns: 1fr !important;
              }
              h1 {
                font-size: 24px !important;
              }
            }
          </style>
        </body>
        </html>
      `,
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Emails sent successfully' 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Email error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send email. Please try again later.' 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}