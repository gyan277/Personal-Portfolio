-- ============================================
-- DODOW AMANMUO - Complete Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'citizen' CHECK (role IN ('citizen', 'assembly', 'minister')),
  region TEXT NOT NULL DEFAULT '',
  district TEXT,
  ghana_card_verified BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  votes_cast INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, role, region)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Citizen'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'citizen'),
    COALESCE(NEW.raw_user_meta_data->>'region', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- 2. POLICIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS policies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  bullets TEXT[] DEFAULT '{}',
  full_text TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  region TEXT NOT NULL DEFAULT 'National',
  district TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'passed', 'rejected')),
  votes_for INTEGER DEFAULT 0,
  votes_against INTEGER DEFAULT 0,
  votes_abstain INTEGER DEFAULT 0,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. VOTES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS votes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  policy_id UUID REFERENCES policies(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('for', 'against', 'abstain')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(policy_id, user_id) -- One vote per user per policy
);

-- Auto-update vote counts on policies
CREATE OR REPLACE FUNCTION update_vote_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.vote_type = 'for' THEN
      UPDATE policies SET votes_for = votes_for + 1 WHERE id = NEW.policy_id;
    ELSIF NEW.vote_type = 'against' THEN
      UPDATE policies SET votes_against = votes_against + 1 WHERE id = NEW.policy_id;
    ELSE
      UPDATE policies SET votes_abstain = votes_abstain + 1 WHERE id = NEW.policy_id;
    END IF;
    UPDATE profiles SET votes_cast = votes_cast + 1 WHERE id = NEW.user_id;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.vote_type = 'for' THEN
      UPDATE policies SET votes_for = GREATEST(votes_for - 1, 0) WHERE id = OLD.policy_id;
    ELSIF OLD.vote_type = 'against' THEN
      UPDATE policies SET votes_against = GREATEST(votes_against - 1, 0) WHERE id = OLD.policy_id;
    ELSE
      UPDATE policies SET votes_abstain = GREATEST(votes_abstain - 1, 0) WHERE id = OLD.policy_id;
    END IF;
    UPDATE profiles SET votes_cast = GREATEST(votes_cast - 1, 0) WHERE id = OLD.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_vote_change ON votes;
CREATE TRIGGER on_vote_change
  AFTER INSERT OR DELETE ON votes
  FOR EACH ROW EXECUTE FUNCTION update_vote_counts();

-- ============================================
-- 4. FORUM POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS forum_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  district TEXT,
  region TEXT NOT NULL DEFAULT 'National',
  is_national BOOLEAN DEFAULT TRUE,
  category TEXT DEFAULT 'General',
  likes INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. FORUM REPLIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS forum_replies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update reply count
CREATE OR REPLACE FUNCTION update_reply_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE forum_posts SET replies_count = replies_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE forum_posts SET replies_count = GREATEST(replies_count - 1, 0) WHERE id = OLD.post_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_reply_change ON forum_replies;
CREATE TRIGGER on_reply_change
  AFTER INSERT OR DELETE ON forum_replies
  FOR EACH ROW EXECUTE FUNCTION update_reply_count();

-- ============================================
-- 6. POST LIKES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS post_likes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Auto-update likes count
CREATE OR REPLACE FUNCTION update_post_likes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE forum_posts SET likes = likes + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE forum_posts SET likes = GREATEST(likes - 1, 0) WHERE id = OLD.post_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_post_like_change ON post_likes;
CREATE TRIGGER on_post_like_change
  AFTER INSERT OR DELETE ON post_likes
  FOR EACH ROW EXECUTE FUNCTION update_post_likes();

-- ============================================
-- 7. ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

-- PROFILES policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- POLICIES policies
CREATE POLICY "Policies are viewable by everyone"
  ON policies FOR SELECT USING (true);

CREATE POLICY "Assembly and ministers can create policies"
  ON policies FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('assembly', 'minister')
    )
  );

CREATE POLICY "Creators can update their policies"
  ON policies FOR UPDATE USING (created_by = auth.uid());

-- VOTES policies
CREATE POLICY "Users can view all votes"
  ON votes FOR SELECT USING (true);

CREATE POLICY "Authenticated users can vote"
  ON votes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes"
  ON votes FOR DELETE USING (auth.uid() = user_id);

-- FORUM POSTS policies
CREATE POLICY "Forum posts are viewable by everyone"
  ON forum_posts FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON forum_posts FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their posts"
  ON forum_posts FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their posts"
  ON forum_posts FOR DELETE USING (auth.uid() = author_id);

-- FORUM REPLIES policies
CREATE POLICY "Replies are viewable by everyone"
  ON forum_replies FOR SELECT USING (true);

CREATE POLICY "Authenticated users can reply"
  ON forum_replies FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can delete their replies"
  ON forum_replies FOR DELETE USING (auth.uid() = author_id);

-- POST LIKES policies
CREATE POLICY "Likes are viewable by everyone"
  ON post_likes FOR SELECT USING (true);

CREATE POLICY "Authenticated users can like"
  ON post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike"
  ON post_likes FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 8. SEED DATA - Sample Policies
-- ============================================
INSERT INTO policies (title, summary, bullets, full_text, category, region, status, votes_for, votes_against, votes_abstain)
VALUES
(
  'National Health Insurance Amendment Act',
  'Expanding NHIS coverage to include mental health services and chronic disease management.',
  ARRAY[
    'Mental health services will be covered under NHIS for all registered members.',
    'Chronic disease medications including diabetes and hypertension drugs are now free.',
    'Registration fee waived for citizens below the poverty line.'
  ],
  'The National Health Insurance Authority (NHIA) hereby proposes amendments to the National Health Insurance Act, 2003 (Act 650) to expand coverage and improve access to healthcare for all Ghanaian citizens.

Section 1: Mental Health Coverage
All registered NHIS members shall be entitled to mental health services including outpatient consultations, prescribed medications, and inpatient care at accredited facilities.

Section 2: Chronic Disease Management
The following chronic disease medications shall be provided free of charge to registered members: antidiabetic drugs, antihypertensive medications, antiretroviral therapy, and cancer treatment drugs on the essential medicines list.

Section 3: Poverty Exemption
Citizens identified as indigent by the District Social Welfare Department shall be registered under NHIS free of charge and shall receive full benefits under this Act.',
  'Health', 'National', 'active', 8420, 1230, 540
),
(
  'Free SHS Extension Policy 2025',
  'Extending free senior high school education to include TVET and vocational training.',
  ARRAY[
    'Technical and vocational schools will be fully funded under the Free SHS program.',
    'Students in TVET programs receive monthly stipends for tools and materials.',
    'New TVET centers to be built in all 16 regions by 2026.'
  ],
  'The Ministry of Education hereby announces the extension of the Free Senior High School (Free SHS) policy to include Technical and Vocational Education and Training (TVET) institutions across Ghana.

Section 1: Scope of Extension
All accredited TVET institutions shall be included under the Free SHS program effective January 2025. Students enrolled in approved vocational programs shall receive full tuition coverage.

Section 2: Student Stipends
Students enrolled in TVET programs shall receive a monthly stipend of GHS 200 for tools, materials, and transportation to support their practical training requirements.

Section 3: Infrastructure Development
The government shall construct new TVET centers in all 16 regions of Ghana by December 2026, with priority given to underserved communities.',
  'Education', 'National', 'active', 12800, 890, 320
),
(
  'Road Infrastructure Levy Bill',
  'Introducing a 2% levy on fuel to fund road construction and maintenance nationwide.',
  ARRAY[
    'A 2% levy on all petroleum products will fund road infrastructure.',
    'Revenue will be managed by a new independent Road Fund Board.',
    'Priority roads in rural areas will receive 40% of the fund allocation.'
  ],
  'The Ministry of Roads and Highways proposes the Road Infrastructure Development Levy Act to establish a dedicated funding mechanism for road construction and maintenance across Ghana.

Section 1: Levy Imposition
A levy of two percent (2%) shall be imposed on all petroleum products sold at retail outlets in Ghana, effective from the first day of the quarter following enactment.

Section 2: Road Fund Board
An independent Road Fund Board shall be established to manage and disburse funds collected under this Act. The Board shall comprise representatives from government, civil society, and the private sector.

Section 3: Allocation Formula
Forty percent (40%) of funds shall be allocated to rural and feeder roads. Thirty percent (30%) shall go to urban roads. Twenty percent (20%) shall fund highway maintenance. Ten percent (10%) shall cover administrative costs.',
  'Infrastructure', 'National', 'active', 4200, 6800, 1100
),
(
  'Agricultural Modernization Fund',
  'GHS 500 million fund to support smallholder farmers with modern equipment and training.',
  ARRAY[
    'Smallholder farmers can access low-interest loans up to GHS 50,000.',
    'Free training programs on modern farming techniques in all districts.',
    'Subsidized fertilizers and seeds for registered farmers.'
  ],
  'The Ministry of Food and Agriculture announces the establishment of the Agricultural Modernization Fund (AMF) to transform Ghana''s agricultural sector and improve food security.

Section 1: Fund Establishment
A fund of GHS 500 million shall be established to provide financial support, training, and resources to smallholder farmers across all regions of Ghana.

Section 2: Loan Facility
Registered smallholder farmers shall be eligible for low-interest loans of up to GHS 50,000 at an annual interest rate not exceeding 10% for the purchase of equipment, seeds, and other agricultural inputs.

Section 3: Training Programs
The Ministry shall organize free training programs in all districts covering modern farming techniques, irrigation management, post-harvest handling, and market access strategies.

Section 4: Input Subsidies
Registered farmers shall receive subsidized fertilizers at 50% of market price and certified seeds at 30% of market price through accredited agro-input dealers.',
  'Agriculture', 'National', 'active', 9100, 420, 680
);

-- ============================================
-- DONE! All tables created successfully.
-- ============================================
