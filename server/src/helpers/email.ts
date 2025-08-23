import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import SMTPTransport from 'nodemailer/lib/smtp-transport';

dotenv.config();

export const emailRegister = async (email: string, name: string, token: string) => {

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    } as SMTPTransport.Options);

    await transporter.sendMail({
        from: `"openDoor Real Estate" <openDoor@gmail.com>`,
        to: email,
        subject: "🏡 Welcome to openDoor! Confirm Your Account",
        text: `Hi ${name},\n\nWelcome to openDoor! Please confirm your account by clicking the link below:\n\n${process.env.BACKEND_URL}/auth/confirm/${token}\n\nHappy house hunting!\n\n— The openDoor Team`,
        html: `
      <!doctype html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin:0; padding:0; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; }
            p { color: #34495e; line-height: 1.6; }
            a.button { display: inline-block; margin-top: 20px; padding: 12px 20px; background-color: #000; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; }
            a.button:hover { background-color: #000; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to openDoor, ${name}!</h1>
            <p>We’re excited to have you on board. OpenDoor is your gateway to finding your dream property.</p>
            <p>Please confirm your account by clicking the button below:</p>
            <a href="${process.env.BACKEND_URL}/auth/confirm/${token}" class="button">Confirm My Account</a>
            <p>If you didn’t create an account, just ignore this email.</p>
            <p>Happy house hunting!<br>— The openDoor Team</p>
          </div>
        </body>
      </html>
    `
    });
}

export const emailRecoverPassword = async (email: string, name: string, token: string) => {

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    }
  } as SMTPTransport.Options);

  await transporter.sendMail({
    from: `"openDoor Real Estate" <openDoor@gmail.com>`,
    to: email,
    subject: "🔑 Reset Your openDoor Password",
    text: `Hi ${name},\n\nWe received a request to reset your password. Click the link below to set a new password:\n\n${process.env.BACKEND_URL}/auth/newpass/reset/${token}\n\nIf you didn’t request this, please ignore this email.\n\n— The openDoor Team`,
    html: `
  <!doctype html>
  <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin:0; padding:0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        h1 { color: #2c3e50; }
        p { color: #34495e; line-height: 1.6; }
        a.button { display: inline-block; margin-top: 20px; padding: 12px 20px; background-color: #000; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; }
        a.button:hover { background-color: #333; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Password Reset Request</h1>
        <p>Hi ${name},</p>
        <p>We received a request to reset your openDoor password.</p>
        <p>Click the button below to set a new password:</p>
        <a href="${process.env.BACKEND_URL}/auth/newpass/reset/${token}" class="button">Reset My Password</a>
        <p>If you didn’t request this, you can safely ignore this email.</p>
        <p>— The openDoor Team</p>
      </div>
    </body>
  </html>
  `
  });

}