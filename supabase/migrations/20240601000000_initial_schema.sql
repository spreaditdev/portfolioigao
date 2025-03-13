-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  title TEXT,
  summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create skill_categories table
CREATE TABLE IF NOT EXISTS public.skill_categories (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create skills table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  proficiency INTEGER NOT NULL,
  color TEXT NOT NULL,
  description TEXT,
  category_id UUID NOT NULL REFERENCES public.skill_categories(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create experiences table
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  logo TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  company_url TEXT,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY,
  description TEXT NOT NULL,
  experience_id UUID NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create technologies table
CREATE TABLE IF NOT EXISTS public.technologies (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create experience_technologies junction table
CREATE TABLE IF NOT EXISTS public.experience_technologies (
  id UUID PRIMARY KEY,
  experience_id UUID NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  technology_id UUID NOT NULL REFERENCES public.technologies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(experience_id, technology_id)
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  image_url TEXT NOT NULL,
  demo_url TEXT,
  repo_url TEXT,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create project_categories table
CREATE TABLE IF NOT EXISTS public.project_categories (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create project_technologies table
CREATE TABLE IF NOT EXISTS public.project_technologies (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create project_images table
CREATE TABLE IF NOT EXISTS public.project_images (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create project_features table
CREATE TABLE IF NOT EXISTS public.project_features (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create project_challenges table
CREATE TABLE IF NOT EXISTS public.project_challenges (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create RLS policies

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_challenges ENABLE ROW LEVEL SECURITY;

-- Public read access for portfolio data
CREATE POLICY "Allow public read access to users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow public read access to skill_categories" ON public.skill_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access to experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read access to achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Allow public read access to technologies" ON public.technologies FOR SELECT USING (true);
CREATE POLICY "Allow public read access to experience_technologies" ON public.experience_technologies FOR SELECT USING (true);
CREATE POLICY "Allow public read access to projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access to project_categories" ON public.project_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to project_technologies" ON public.project_technologies FOR SELECT USING (true);
CREATE POLICY "Allow public read access to project_images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Allow public read access to project_features" ON public.project_features FOR SELECT USING (true);
CREATE POLICY "Allow public read access to project_challenges" ON public.project_challenges FOR SELECT USING (true);

-- Contact form policies
CREATE POLICY "Allow public to create contacts" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to read contacts" ON public.contacts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update contacts" ON public.contacts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete contacts" ON public.contacts FOR DELETE USING (auth.role() = 'authenticated');

-- Admin policies for content management
CREATE POLICY "Allow authenticated users to manage their own data" ON public.users FOR ALL USING (auth.uid() = id);
CREATE POLICY "Allow authenticated users to manage their skill categories" ON public.skill_categories FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Allow authenticated users to manage their skills" ON public.skills FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Allow authenticated users to manage their experiences" ON public.experiences FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Allow authenticated users to manage their achievements" ON public.achievements FOR ALL USING (EXISTS (SELECT 1 FROM public.experiences WHERE id = experience_id AND user_id = auth.uid()));
CREATE POLICY "Allow authenticated users to manage technologies" ON public.technologies FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage experience technologies" ON public.experience_technologies FOR ALL USING (EXISTS (SELECT 1 FROM public.experiences WHERE id = experience_id AND user_id = auth.uid()));
CREATE POLICY "Allow authenticated users to manage their projects" ON public.projects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Allow authenticated users to manage project categories" ON public.project_categories FOR ALL USING (EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND user_id = auth.uid()));
CREATE POLICY "Allow authenticated users to manage project technologies" ON public.project_technologies FOR ALL USING (EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND user_id = auth.uid()));
CREATE POLICY "Allow authenticated users to manage project images" ON public.project_images FOR ALL USING (EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND user_id = auth.uid()));
CREATE POLICY "Allow authenticated users to manage project features" ON public.project_features FOR ALL USING (EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND user_id = auth.uid()));
CREATE POLICY "Allow authenticated users to manage project challenges" ON public.project_challenges FOR ALL USING (EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND user_id = auth.uid()));

-- Create functions and triggers for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_modtime
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_skills_modtime
    BEFORE UPDATE ON skills
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_experiences_modtime
    BEFORE UPDATE ON experiences
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_achievements_modtime
    BEFORE UPDATE ON achievements
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_projects_modtime
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();
