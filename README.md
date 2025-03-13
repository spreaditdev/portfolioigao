# PortDev - Frontend Developer Portfolio

A comprehensive, visually striking portfolio platform for frontend developers to showcase their skills, projects, and professional journey with interactive elements and modern design aesthetics.

## Features

- Responsive hero section with animated typography, developer photo/avatar, and a brief professional summary
- Interactive project gallery with filterable categories, detailed project modals, and live demo links
- Skills section with visual proficiency indicators and technology icons
- Professional timeline/experience section with company logos and achievement highlights
- Contact form with validation and email notification integration
- Blog section for sharing knowledge and experiences
- Dark/light mode toggle
- Internationalization support (Portuguese, English, Spanish, Chinese)
- Admin panel for managing contact messages

## Tech Stack

- React with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Framer Motion for animations
- Supabase for backend and authentication
- React Router for navigation
- React Hook Form for form handling
- Zod for validation
- i18next for internationalization

## Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Set up the database schema using the migration file in `supabase/migrations/20240601000000_initial_schema.sql`
3. Deploy the Edge Function for email notifications in `supabase/functions/send-contact-email`
4. Set up authentication in the Supabase dashboard
5. Create a `.env` file with your Supabase URL and anon key:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Email Notifications Setup

To enable email notifications from the contact form:

1. Deploy the Edge Function in `supabase/functions/send-contact-email`
2. Set the following environment variables in your Supabase project:
   - `SMTP_HOSTNAME`: Your SMTP server hostname (e.g., smtp.gmail.com)
   - `SMTP_PORT`: Your SMTP server port (e.g., 465 for SSL)
   - `SMTP_USERNAME`: Your SMTP username/email
   - `SMTP_PASSWORD`: Your SMTP password or app password
   - `SMTP_FROM_EMAIL`: The email address to send from

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Admin Access

To access the admin panel:

1. Create a user in Supabase Authentication
2. Navigate to `/login` in your browser
3. Log in with your credentials
4. You'll be redirected to the admin panel at `/admin`

## Deployment

This project can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages. Make sure to set up the environment variables for Supabase in your hosting provider.

## License

MIT
