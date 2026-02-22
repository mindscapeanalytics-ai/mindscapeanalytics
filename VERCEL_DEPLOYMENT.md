# Vercel Deployment Guide: Mindscape Analytics LLC

This guide ensures a flawless deployment to Vercel. All necessary configurations have been optimized for serverless performance.

## 1. Environment Variables
Copy and paste these keys into your **Vercel Project Settings > Environment Variables** dashboard.

| Variable | Recommended Value |
| :--- | :--- |
| `DATABASE_URL` | Your Supabase Pooler URL (Port 6543) |
| `DIRECT_URL` | Your Direct Supabase URL (Port 5432) |
| `BETTER_AUTH_SECRET` | 64-character random string (already in your `.env`) |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` (or your custom domain) |
| `BETTER_AUTH_URL` | `https://your-domain.vercel.app` |
| `STRIPE_SECRET_KEY` | Your Stripe Secret Key (sk_live_...) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your Stripe Publishable Key (pk_live_...) |
| `STRIPE_WEBHOOK_SECRET` | whsec_... (obtained from Stripe Dashboard) |
| `ALLOWED_ADMINS` | `imzeeshan.ai@gmail.com,zeeshan.keerio@mindscapeanalytics.com` |
| `RESEND_API_KEY` | Your Resend API Key |
| `EMAIL_FROM` | `MSA Architect <noreply@mindscapeanalytics.com>` |

## 2. Optimized Build Command
I have updated your `package.json`. Vercel will automatically use the following command:
`prisma generate && next build`

This ensures your database client is always up-to-date with your schema before the site goes live.

## 3. Deployment Steps
1. Push your code to a GitHub repository.
2. Link the repository to a new Vercel project.
3. Configure the **Environment Variables** listed above.
4. Click **Deploy**.

## 4. Post-Deployment Check
- Verify that **Sign Up / Sign In** works (Better-Auth).
- Check the **Shop** page to ensure product images load smoothly.
- Test the **Admin Dashboard** (`/admin`) to confirm your admin privileges are active.

> [!IMPORTANT]
> Ensure your **Supabase IP Allowlist** includes Vercel's outgoing IPs if you have strict firewall settings enabled. By default, Supabase allows all connections if no allowlist is configured.

---
© 2025 Mindscape Analytics LLC. Ready for Global Scale.
