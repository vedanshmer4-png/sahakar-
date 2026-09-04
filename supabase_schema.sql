-- ==============================================================================
-- 🏛️ SAHAKAR - National Labour Cooperative Digital Public Infrastructure (DPI)
-- PostgreSQL / Supabase Complete Production Schema & Seed Data
-- Framework: Multi-State Cooperative Societies (MSCS) Act 2002 Compliant
-- Financial Architecture: 90% Worker DBT / 1% Welfare Pool / 9% Primary Society
-- ==============================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PRIMARY LABOUR COOPERATIVE SOCIETIES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.primary_societies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reg_no VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    state VARCHAR(64) NOT NULL,
    district VARCHAR(64) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    trades TEXT[] DEFAULT '{}',
    total_members INT DEFAULT 0,
    depot_address TEXT,
    contact_phone VARCHAR(20),
    contact_email VARCHAR(128),
    mscs_compliant BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. USERS / PROFILES TABLE (Linked with Supabase auth.users)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(128) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(32) NOT NULL CHECK (role IN ('Customer', 'Worker', 'Federation Admin', 'District Council Member')),
    avatar_url TEXT,
    society_id UUID REFERENCES public.primary_societies(id) ON DELETE SET NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    kyc_status VARCHAR(32) DEFAULT 'PENDING' CHECK (kyc_status IN ('PENDING', 'VERIFIED', 'REJECTED')),
    aadhaar_hash VARCHAR(128),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. WORKER-OWNER PROSPERITY & CREDENTIALS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.workers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    trade VARCHAR(64) NOT NULL,
    hourly_rate NUMERIC(10, 2) NOT NULL DEFAULT 350.00,
    experience_years INT DEFAULT 1,
    trust_score NUMERIC(3, 2) DEFAULT 4.90,
    w3c_passport_hash VARCHAR(255),
    cooperative_equity_pct NUMERIC(5, 3) DEFAULT 0.120,
    total_completed_jobs INT DEFAULT 0,
    total_dbt_earnings NUMERIC(12, 2) DEFAULT 0.00,
    total_welfare_contributed NUMERIC(10, 2) DEFAULT 0.00,
    pincode_coverage TEXT[] DEFAULT '{}',
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. BOOKINGS & AUDITED ESCROW LEDGER (90/1/9 Financial Split)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_ref VARCHAR(32) UNIQUE NOT NULL,
    customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    worker_id UUID REFERENCES public.workers(id) ON DELETE SET NULL,
    society_id UUID REFERENCES public.primary_societies(id) ON DELETE SET NULL,
    trade VARCHAR(64) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    duration_hours NUMERIC(4, 2) NOT NULL DEFAULT 2.0,
    hourly_rate NUMERIC(10, 2) NOT NULL,
    
    -- 90/1/9 Revenue Distribution Formulas
    total_amount NUMERIC(10, 2) NOT NULL,
    worker_dbt_amount NUMERIC(10, 2) GENERATED ALWAYS AS (ROUND(total_amount * 0.90, 2)) STORED,
    welfare_pool_amount NUMERIC(10, 2) GENERATED ALWAYS AS (ROUND(total_amount * 0.01, 2)) STORED,
    society_fee_amount NUMERIC(10, 2) GENERATED ALWAYS AS (ROUND(total_amount * 0.09, 2)) STORED,
    
    status VARCHAR(32) DEFAULT 'CONFIRMED' CHECK (status IN ('PENDING', 'CONFIRMED', 'DISPATCHED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
    payment_status VARCHAR(32) DEFAULT 'SETTLED' CHECK (payment_status IN ('ESCROW_HELD', 'SETTLED', 'REFUNDED', 'DISPUTED')),
    emergency_sos BOOLEAN DEFAULT FALSE,
    customer_rating INT CHECK (customer_rating BETWEEN 1 AND 5),
    customer_review TEXT,
    scheduled_at TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. EMERGENCY WELFARE ESCROW POOL & CLAIMS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.welfare_claims (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_ref VARCHAR(32) UNIQUE NOT NULL,
    worker_id UUID REFERENCES public.workers(id) ON DELETE CASCADE,
    claim_type VARCHAR(64) NOT NULL CHECK (claim_type IN ('Hospitalization', 'Disability', 'Tool Insurance', 'Maternity', 'Emergency Grant')),
    claim_amount NUMERIC(10, 2) NOT NULL,
    reason TEXT NOT NULL,
    document_url TEXT,
    status VARCHAR(32) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'DISBURSED')),
    reviewed_by UUID REFERENCES public.profiles(id),
    disbursed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. DISTRICT DEMOCRATIC COUNCIL PROPOSALS & 1-MEMBER-1-VOTE BALLOTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.council_proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    proposal_code VARCHAR(32) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(64) NOT NULL CHECK (category IN ('Wage Floor Policy', 'Tool Procurement', 'Welfare Levy Rate', 'Safety Standards', 'Guild Affiliation')),
    author_id UUID REFERENCES public.profiles(id),
    yes_votes INT DEFAULT 0,
    no_votes INT DEFAULT 0,
    status VARCHAR(32) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'PASSED', 'REJECTED', 'GAZETTED')),
    voting_deadline TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.council_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    proposal_id UUID REFERENCES public.council_proposals(id) ON DELETE CASCADE,
    voter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    vote VARCHAR(8) NOT NULL CHECK (vote IN ('YES', 'NO', 'ABSTAIN')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(proposal_id, voter_id)
);

-- ------------------------------------------------------------------------------
-- 7. TOOL GROUP-BUYS (Bulk Cooperative Procurement)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tool_group_buys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tool_name VARCHAR(128) NOT NULL,
    brand VARCHAR(64),
    mrp_price NUMERIC(10, 2) NOT NULL,
    coop_price NUMERIC(10, 2) NOT NULL,
    min_order_threshold INT DEFAULT 20,
    current_orders INT DEFAULT 0,
    status VARCHAR(32) DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'LOCKED', 'DISPATCHED', 'DELIVERED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.primary_societies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.welfare_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.council_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.council_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_group_buys ENABLE ROW LEVEL SECURITY;

-- Public readable policies
CREATE POLICY "Public societies view" ON public.primary_societies FOR SELECT USING (true);
CREATE POLICY "Public worker directory view" ON public.workers FOR SELECT USING (true);
CREATE POLICY "Public council proposals view" ON public.council_proposals FOR SELECT USING (true);
CREATE POLICY "Public tool group buys view" ON public.tool_group_buys FOR SELECT USING (true);

-- User-specific access policies
CREATE POLICY "Users can view and update own profile" ON public.profiles
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "Customers and workers can view their bookings" ON public.bookings
    FOR SELECT USING (auth.uid() = customer_id OR auth.uid() IN (SELECT profile_id FROM public.workers WHERE id = worker_id));

-- ------------------------------------------------------------------------------
-- 9. INITIAL SEED DATA (For Immediate Demo Testing)
-- ------------------------------------------------------------------------------

-- Insert Primary Cooperative Societies
INSERT INTO public.primary_societies (id, reg_no, name, state, district, pincode, trades, total_members, contact_phone, contact_email)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'MSCS/ND/2019/412', 'Delhi Central Electrical & Tech Co-op Society', 'Delhi', 'Central Delhi', '110001', ARRAY['Electrician', 'Technician'], 420, '+919557687953', 'delhi.coop@sahakar.in'),
    ('22222222-2222-2222-2222-222222222222', 'MSCS/MH/2021/184', 'Mumbai Precision Plumbing & Sanitation Co-op', 'Maharashtra', 'Mumbai City', '400001', ARRAY['Plumber', 'Sanitation'], 380, '+919557687953', 'mumbai.coop@sahakar.in'),
    ('33333333-3333-3333-3333-333333333333', 'MSCS/KA/2020/629', 'Bengaluru Skilled Carpentry & Guild Union', 'Karnataka', 'Bengaluru Urban', '560001', ARRAY['Carpenter', 'Woodwork'], 310, '+919557687953', 'blr.coop@sahakar.in')
ON CONFLICT (reg_no) DO NOTHING;

-- Insert Council Proposals
INSERT INTO public.council_proposals (proposal_code, title, description, category, yes_votes, no_votes, status, voting_deadline)
VALUES
    ('PROP-2026-08', 'Establish ₹400/hr Minimum Wage Floor for Certified Electricians', 'Mandatory district wage floor adjustment in response to tools and inflation benchmark index.', 'Wage Floor Policy', 342, 18, 'ACTIVE', NOW() + INTERVAL '14 days'),
    ('PROP-2026-09', 'Bulk Procurement of 500 Heavy-Duty SDS Rotary Hammer Drills', 'Direct wholesale discount agreement with registered tool manufacturers for primary depots.', 'Tool Procurement', 289, 12, 'ACTIVE', NOW() + INTERVAL '7 days')
ON CONFLICT (proposal_code) DO NOTHING;

-- Insert Tool Group-Buys
INSERT INTO public.tool_group_buys (tool_name, brand, mrp_price, coop_price, min_order_threshold, current_orders, status)
VALUES
    ('Industrial Cordless Brushless Drill 18V', 'Bosch Heavy Duty', 6800.00, 3950.00, 25, 19, 'OPEN'),
    ('Laser Level & Digital Angle Measurer', 'DeWalt Precision', 4200.00, 2400.00, 20, 16, 'OPEN')
ON CONFLICT DO NOTHING;
