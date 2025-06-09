# Cloud Notes App

A simple notes application built with Vue 3, Vite, Tailwind CSS and Supabase.

## Setup

1. Install dependencies

```bash
pnpm install
```

2. Create a `.env` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_KEY=anon_or_service_role_key
```

3. Run the dev server

```bash
pnpm run dev
```

4. Run unit tests

```bash
pnpm exec vitest run
```

To run the integration tests that hit Supabase, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY` in your environment.

### Supabase setup

Create the `notes` table and enable row level security with the following SQL:

```sql
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_notes_updated_at
  BEFORE UPDATE ON notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notes" ON notes
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own notes" ON notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own notes" ON notes
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own notes" ON notes
  FOR DELETE USING (auth.uid() = user_id);
```

The application provides login and registration pages, a Markdown editor for writing notes and synchronizes them with Supabase per authenticated user.
