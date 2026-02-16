--
-- PostgreSQL database dump
--


-- Dumped from database version 17.7 (Ubuntu 17.7-3.pgdg24.04+1)
-- Dumped by pg_dump version 17.8 (Debian 17.8-1.pgdg12+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public."PdfTheme" DROP CONSTRAINT IF EXISTS "PdfTheme_companyId_fkey";
ALTER TABLE IF EXISTS ONLY public."PdfCoverTemplate" DROP CONSTRAINT IF EXISTS "PdfCoverTemplate_companyId_fkey";
ALTER TABLE IF EXISTS ONLY public."Customer" DROP CONSTRAINT IF EXISTS "Customer_companyId_fkey";
ALTER TABLE IF EXISTS ONLY public."CouponRedemption" DROP CONSTRAINT IF EXISTS "CouponRedemption_companyBillingId_fkey";
ALTER TABLE IF EXISTS ONLY public."CompanyMembership" DROP CONSTRAINT IF EXISTS "CompanyMembership_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."CompanyMembership" DROP CONSTRAINT IF EXISTS "CompanyMembership_companyId_fkey";
ALTER TABLE IF EXISTS ONLY public."CompanyBilling" DROP CONSTRAINT IF EXISTS "CompanyBilling_companyId_fkey";
ALTER TABLE IF EXISTS ONLY public."CompanyAccessGrant" DROP CONSTRAINT IF EXISTS "CompanyAccessGrant_createdByAdminUserId_fkey";
ALTER TABLE IF EXISTS ONLY public."Boq" DROP CONSTRAINT IF EXISTS "Boq_pdfThemeId_fkey";
ALTER TABLE IF EXISTS ONLY public."Boq" DROP CONSTRAINT IF EXISTS "Boq_customerId_fkey";
ALTER TABLE IF EXISTS ONLY public."Boq" DROP CONSTRAINT IF EXISTS "Boq_coverTemplateId_fkey";
ALTER TABLE IF EXISTS ONLY public."Boq" DROP CONSTRAINT IF EXISTS "Boq_companyId_fkey";
ALTER TABLE IF EXISTS ONLY public."BoqItem" DROP CONSTRAINT IF EXISTS "BoqItem_categoryId_fkey";
ALTER TABLE IF EXISTS ONLY public."BoqCreationEvent" DROP CONSTRAINT IF EXISTS "BoqCreationEvent_companyId_fkey";
ALTER TABLE IF EXISTS ONLY public."BoqCategory" DROP CONSTRAINT IF EXISTS "BoqCategory_boqId_fkey";
ALTER TABLE IF EXISTS ONLY public."BillingPlanPriceHistory" DROP CONSTRAINT IF EXISTS "BillingPlanPriceHistory_billingPlanId_fkey";
ALTER TABLE IF EXISTS ONLY public."BillingInvoice" DROP CONSTRAINT IF EXISTS "BillingInvoice_companyBillingId_fkey";
DROP INDEX IF EXISTS public."User_phone_idx";
DROP INDEX IF EXISTS public."User_email_key";
DROP INDEX IF EXISTS public."User_email_idx";
DROP INDEX IF EXISTS public."User_deletedAt_idx";
DROP INDEX IF EXISTS public."User_country_idx";
DROP INDEX IF EXISTS public."StripeWebhookEvent_id_idx";
DROP INDEX IF EXISTS public."PlatformCoupon_stripePromoCodeId_key";
DROP INDEX IF EXISTS public."PlatformCoupon_code_key";
DROP INDEX IF EXISTS public."PlatformCoupon_code_active_archived_idx";
DROP INDEX IF EXISTS public."PdfTheme_companyId_isDefault_idx";
DROP INDEX IF EXISTS public."PdfTheme_companyId_idx";
DROP INDEX IF EXISTS public."PdfExportJob_status_idx";
DROP INDEX IF EXISTS public."PdfExportJob_companyId_createdAt_idx";
DROP INDEX IF EXISTS public."PdfExportJob_boqId_idx";
DROP INDEX IF EXISTS public."PdfCoverTemplate_companyId_isDefault_idx";
DROP INDEX IF EXISTS public."PdfCoverTemplate_companyId_idx";
DROP INDEX IF EXISTS public."Customer_companyId_name_idx";
DROP INDEX IF EXISTS public."Customer_companyId_idx";
DROP INDEX IF EXISTS public."CouponRedemption_couponCode_idx";
DROP INDEX IF EXISTS public."CouponRedemption_companyBillingId_idx";
DROP INDEX IF EXISTS public."Company_deletedAt_idx";
DROP INDEX IF EXISTS public."CompanyMembership_userId_idx";
DROP INDEX IF EXISTS public."CompanyMembership_userId_companyId_key";
DROP INDEX IF EXISTS public."CompanyMembership_companyId_isActive_idx";
DROP INDEX IF EXISTS public."CompanyMembership_companyId_idx";
DROP INDEX IF EXISTS public."CompanyBilling_stripeSubscriptionId_key";
DROP INDEX IF EXISTS public."CompanyBilling_stripeCustomerId_key";
DROP INDEX IF EXISTS public."CompanyBilling_companyId_key";
DROP INDEX IF EXISTS public."CompanyAccessGrant_createdByAdminUserId_idx";
DROP INDEX IF EXISTS public."CompanyAccessGrant_companyId_revokedAt_idx";
DROP INDEX IF EXISTS public."CompanyAccessGrant_companyId_endsAt_idx";
DROP INDEX IF EXISTS public."Boq_customerId_idx";
DROP INDEX IF EXISTS public."Boq_companyId_updatedAt_idx";
DROP INDEX IF EXISTS public."Boq_companyId_projectName_idx";
DROP INDEX IF EXISTS public."Boq_companyId_isPreset_idx";
DROP INDEX IF EXISTS public."Boq_companyId_idx";
DROP INDEX IF EXISTS public."BoqItem_categoryId_sortOrder_idx";
DROP INDEX IF EXISTS public."BoqItem_categoryId_idx";
DROP INDEX IF EXISTS public."BoqCreationEvent_companyId_createdAt_idx";
DROP INDEX IF EXISTS public."BoqCategory_boqId_sortOrder_idx";
DROP INDEX IF EXISTS public."BoqCategory_boqId_idx";
DROP INDEX IF EXISTS public."BillingPlan_planKey_key";
DROP INDEX IF EXISTS public."BillingPlan_active_sortOrder_idx";
DROP INDEX IF EXISTS public."BillingPlanPriceHistory_stripePriceId_idx";
DROP INDEX IF EXISTS public."BillingPlanPriceHistory_billingPlanId_idx";
DROP INDEX IF EXISTS public."BillingInvoice_stripeInvoiceId_key";
DROP INDEX IF EXISTS public."BillingInvoice_stripeInvoiceId_idx";
DROP INDEX IF EXISTS public."BillingInvoice_companyBillingId_idx";
ALTER TABLE IF EXISTS ONLY public."User" DROP CONSTRAINT IF EXISTS "User_pkey";
ALTER TABLE IF EXISTS ONLY public."StripeWebhookEvent" DROP CONSTRAINT IF EXISTS "StripeWebhookEvent_pkey";
ALTER TABLE IF EXISTS ONLY public."PlatformCoupon" DROP CONSTRAINT IF EXISTS "PlatformCoupon_pkey";
ALTER TABLE IF EXISTS ONLY public."PdfTheme" DROP CONSTRAINT IF EXISTS "PdfTheme_pkey";
ALTER TABLE IF EXISTS ONLY public."PdfExportJob" DROP CONSTRAINT IF EXISTS "PdfExportJob_pkey";
ALTER TABLE IF EXISTS ONLY public."PdfCoverTemplate" DROP CONSTRAINT IF EXISTS "PdfCoverTemplate_pkey";
ALTER TABLE IF EXISTS ONLY public."Customer" DROP CONSTRAINT IF EXISTS "Customer_pkey";
ALTER TABLE IF EXISTS ONLY public."CouponRedemption" DROP CONSTRAINT IF EXISTS "CouponRedemption_pkey";
ALTER TABLE IF EXISTS ONLY public."Company" DROP CONSTRAINT IF EXISTS "Company_pkey";
ALTER TABLE IF EXISTS ONLY public."CompanyMembership" DROP CONSTRAINT IF EXISTS "CompanyMembership_pkey";
ALTER TABLE IF EXISTS ONLY public."CompanyBilling" DROP CONSTRAINT IF EXISTS "CompanyBilling_pkey";
ALTER TABLE IF EXISTS ONLY public."CompanyAccessGrant" DROP CONSTRAINT IF EXISTS "CompanyAccessGrant_pkey";
ALTER TABLE IF EXISTS ONLY public."Boq" DROP CONSTRAINT IF EXISTS "Boq_pkey";
ALTER TABLE IF EXISTS ONLY public."BoqItem" DROP CONSTRAINT IF EXISTS "BoqItem_pkey";
ALTER TABLE IF EXISTS ONLY public."BoqCreationEvent" DROP CONSTRAINT IF EXISTS "BoqCreationEvent_pkey";
ALTER TABLE IF EXISTS ONLY public."BoqCategory" DROP CONSTRAINT IF EXISTS "BoqCategory_pkey";
ALTER TABLE IF EXISTS ONLY public."BillingPlan" DROP CONSTRAINT IF EXISTS "BillingPlan_pkey";
ALTER TABLE IF EXISTS ONLY public."BillingPlanPriceHistory" DROP CONSTRAINT IF EXISTS "BillingPlanPriceHistory_pkey";
ALTER TABLE IF EXISTS ONLY public."BillingInvoice" DROP CONSTRAINT IF EXISTS "BillingInvoice_pkey";
DROP TABLE IF EXISTS public."User";
DROP TABLE IF EXISTS public."StripeWebhookEvent";
DROP TABLE IF EXISTS public."PlatformCoupon";
DROP TABLE IF EXISTS public."PdfTheme";
DROP TABLE IF EXISTS public."PdfExportJob";
DROP TABLE IF EXISTS public."PdfCoverTemplate";
DROP TABLE IF EXISTS public."Customer";
DROP TABLE IF EXISTS public."CouponRedemption";
DROP TABLE IF EXISTS public."CompanyMembership";
DROP TABLE IF EXISTS public."CompanyBilling";
DROP TABLE IF EXISTS public."CompanyAccessGrant";
DROP TABLE IF EXISTS public."Company";
DROP TABLE IF EXISTS public."BoqItem";
DROP TABLE IF EXISTS public."BoqCreationEvent";
DROP TABLE IF EXISTS public."BoqCategory";
DROP TABLE IF EXISTS public."Boq";
DROP TABLE IF EXISTS public."BillingPlanPriceHistory";
DROP TABLE IF EXISTS public."BillingPlan";
DROP TABLE IF EXISTS public."BillingInvoice";
DROP TYPE IF EXISTS public."SubscriptionStatus";
DROP TYPE IF EXISTS public."SeatModel";
DROP TYPE IF EXISTS public."Role";
DROP TYPE IF EXISTS public."PlanKey";
DROP TYPE IF EXISTS public."PdfJobStatus";
DROP TYPE IF EXISTS public."GrantType";
DROP TYPE IF EXISTS public."DiscountType";
DROP TYPE IF EXISTS public."DateMode";
DROP TYPE IF EXISTS public."CouponType";
DROP TYPE IF EXISTS public."BillingInterval";
DROP TYPE IF EXISTS public."AccessOverride";
--
-- Name: AccessOverride; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."AccessOverride" AS ENUM (
    'free_forever',
    'admin_grant',
    'trial'
);


--
-- Name: BillingInterval; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."BillingInterval" AS ENUM (
    'month',
    'year'
);


--
-- Name: CouponType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."CouponType" AS ENUM (
    'trial_days',
    'free_forever'
);


--
-- Name: DateMode; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."DateMode" AS ENUM (
    'export_date',
    'preparation_date'
);


--
-- Name: DiscountType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."DiscountType" AS ENUM (
    'percent',
    'fixed'
);


--
-- Name: GrantType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."GrantType" AS ENUM (
    'trial',
    'free_forever',
    'admin_grant'
);


--
-- Name: PdfJobStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PdfJobStatus" AS ENUM (
    'pending',
    'processing',
    'completed',
    'failed'
);


--
-- Name: PlanKey; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PlanKey" AS ENUM (
    'starter',
    'business',
    'advance',
    'free'
);


--
-- Name: Role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'MEMBER'
);


--
-- Name: SeatModel; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."SeatModel" AS ENUM (
    'single',
    'per_seat'
);


--
-- Name: SubscriptionStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."SubscriptionStatus" AS ENUM (
    'active',
    'trialing',
    'past_due',
    'canceled',
    'incomplete',
    'incomplete_expired',
    'unpaid'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: BillingInvoice; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."BillingInvoice" (
    id text NOT NULL,
    "companyBillingId" text NOT NULL,
    "stripeInvoiceId" text NOT NULL,
    "amountPaid" integer NOT NULL,
    "amountDue" integer NOT NULL,
    currency text DEFAULT 'usd'::text NOT NULL,
    status text NOT NULL,
    "hostedInvoiceUrl" text,
    "pdfUrl" text,
    "periodStart" timestamp(3) without time zone,
    "periodEnd" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: BillingPlan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."BillingPlan" (
    id text NOT NULL,
    "planKey" text NOT NULL,
    name text NOT NULL,
    "priceMonthlyUsdCents" integer NOT NULL,
    "boqLimitPerPeriod" integer,
    features jsonb DEFAULT '[]'::jsonb NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "stripeProductId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "boqTemplatesLimit" integer,
    "coverTemplatesLimit" integer,
    "isMostPopular" boolean DEFAULT false NOT NULL,
    "logoUploadAllowed" boolean DEFAULT false NOT NULL,
    "maxActiveMembers" integer DEFAULT 1 NOT NULL,
    "priceAnnualUsdCents" integer,
    "seatModel" public."SeatModel" DEFAULT 'single'::public."SeatModel" NOT NULL,
    "sharingAllowed" boolean DEFAULT false NOT NULL,
    "stripePriceIdAnnual" text,
    "stripePriceIdMonthly" text,
    "boqItemsLimit" integer,
    "watermarkEnabled" boolean DEFAULT false NOT NULL,
    "watermarkText" text,
    "boqPresetsLimit" integer
);


--
-- Name: BillingPlanPriceHistory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."BillingPlanPriceHistory" (
    id text NOT NULL,
    "billingPlanId" text NOT NULL,
    "stripePriceId" text NOT NULL,
    "amountCents" integer NOT NULL,
    "isCurrent" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "interval" public."BillingInterval" DEFAULT 'month'::public."BillingInterval" NOT NULL
);


--
-- Name: Boq; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Boq" (
    id text NOT NULL,
    "companyId" text NOT NULL,
    "customerId" text,
    "projectName" text NOT NULL,
    "discountType" public."DiscountType" DEFAULT 'percent'::public."DiscountType" NOT NULL,
    "discountValue" double precision DEFAULT 0 NOT NULL,
    "vatEnabled" boolean DEFAULT false NOT NULL,
    "vatPercent" double precision DEFAULT 18 NOT NULL,
    status text DEFAULT 'draft'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "discountEnabled" boolean DEFAULT false NOT NULL,
    "coverTemplateId" text,
    "pdfThemeId" text,
    "dateMode" public."DateMode" DEFAULT 'export_date'::public."DateMode" NOT NULL,
    "preparationDate" timestamp(3) without time zone,
    "isPreset" boolean DEFAULT false NOT NULL,
    "presetName" text
);


--
-- Name: BoqCategory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."BoqCategory" (
    id text NOT NULL,
    "boqId" text NOT NULL,
    name text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: BoqCreationEvent; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."BoqCreationEvent" (
    id text NOT NULL,
    "companyId" text NOT NULL,
    "boqId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: BoqItem; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."BoqItem" (
    id text NOT NULL,
    "categoryId" text NOT NULL,
    description text NOT NULL,
    unit text DEFAULT ''::text NOT NULL,
    "unitCost" double precision DEFAULT 0 NOT NULL,
    "markupPct" double precision DEFAULT 0 NOT NULL,
    quantity double precision DEFAULT 0 NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "includeInPdf" boolean DEFAULT true NOT NULL,
    "isNote" boolean DEFAULT false NOT NULL,
    "noteContent" text
);


--
-- Name: Company; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Company" (
    id text NOT NULL,
    name text NOT NULL,
    "currencySymbol" text DEFAULT 'Rs.'::text NOT NULL,
    "currencyPosition" text DEFAULT 'left'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "defaultVatPercent" double precision DEFAULT 18 NOT NULL,
    "blockReason" text,
    "isBlocked" boolean DEFAULT false NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


--
-- Name: CompanyAccessGrant; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CompanyAccessGrant" (
    id text NOT NULL,
    "companyId" text NOT NULL,
    "grantType" public."GrantType" NOT NULL,
    "planKey" text,
    "couponId" text,
    "startsAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "endsAt" timestamp(3) without time zone,
    "revokedAt" timestamp(3) without time zone,
    "revokedById" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdByAdminUserId" text,
    notes text
);


--
-- Name: CompanyBilling; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CompanyBilling" (
    id text NOT NULL,
    "companyId" text NOT NULL,
    "stripeCustomerId" text,
    "stripeSubscriptionId" text,
    "planKey" public."PlanKey",
    status public."SubscriptionStatus",
    "currentPeriodStart" timestamp(3) without time zone,
    "currentPeriodEnd" timestamp(3) without time zone,
    "cancelAtPeriodEnd" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "accessOverride" public."AccessOverride",
    "currentCouponCode" text,
    "overridePlan" public."PlanKey",
    "billingInterval" public."BillingInterval" DEFAULT 'month'::public."BillingInterval" NOT NULL,
    "seatQuantity" integer DEFAULT 1 NOT NULL
);


--
-- Name: CompanyMembership; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CompanyMembership" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "companyId" text NOT NULL,
    role public."Role" DEFAULT 'MEMBER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: CouponRedemption; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CouponRedemption" (
    id text NOT NULL,
    "companyBillingId" text NOT NULL,
    "couponCode" text NOT NULL,
    "couponType" public."CouponType" NOT NULL,
    "stripePromotionCodeId" text,
    "redeemedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "revokedAt" timestamp(3) without time zone,
    "revokedByAdminId" text,
    source text DEFAULT 'checkout'::text NOT NULL
);


--
-- Name: Customer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Customer" (
    id text NOT NULL,
    "companyId" text NOT NULL,
    name text NOT NULL,
    email text,
    phone text,
    address text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: PdfCoverTemplate; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PdfCoverTemplate" (
    id text NOT NULL,
    "companyId" text NOT NULL,
    name text NOT NULL,
    "configJson" jsonb NOT NULL,
    "isDefault" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: PdfExportJob; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PdfExportJob" (
    id text NOT NULL,
    "boqId" text NOT NULL,
    "companyId" text NOT NULL,
    "userId" text NOT NULL,
    status public."PdfJobStatus" DEFAULT 'pending'::public."PdfJobStatus" NOT NULL,
    "pdfUrl" text,
    "errorMessage" text,
    "startedAt" timestamp(3) without time zone,
    "completedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: PdfTheme; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PdfTheme" (
    id text NOT NULL,
    "companyId" text NOT NULL,
    name text NOT NULL,
    "configJson" jsonb NOT NULL,
    "isDefault" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: PlatformCoupon; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PlatformCoupon" (
    id text NOT NULL,
    code text NOT NULL,
    type public."CouponType" NOT NULL,
    "trialDays" integer,
    "allowedPlans" public."PlanKey"[],
    "stripePromoCodeId" text,
    "stripeCouponId" text,
    "maxRedemptions" integer,
    "currentRedemptions" integer DEFAULT 0 NOT NULL,
    "expiresAt" timestamp(3) without time zone,
    active boolean DEFAULT true NOT NULL,
    archived boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: StripeWebhookEvent; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."StripeWebhookEvent" (
    id text NOT NULL,
    type text NOT NULL,
    "processedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "blockReason" text,
    "isBlocked" boolean DEFAULT false NOT NULL,
    "firstName" text,
    "forcePasswordReset" boolean DEFAULT false NOT NULL,
    "lastLoginAt" timestamp(3) without time zone,
    "lastName" text,
    phone text,
    country text,
    "phoneDigits" text,
    "deletedAt" timestamp(3) without time zone
);


--
-- Data for Name: BillingInvoice; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."BillingInvoice" (id, "companyBillingId", "stripeInvoiceId", "amountPaid", "amountDue", currency, status, "hostedInvoiceUrl", "pdfUrl", "periodStart", "periodEnd", "createdAt") FROM stdin;
\.


--
-- Data for Name: BillingPlan; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."BillingPlan" (id, "planKey", name, "priceMonthlyUsdCents", "boqLimitPerPeriod", features, "sortOrder", active, "stripeProductId", "createdAt", "updatedAt", "boqTemplatesLimit", "coverTemplatesLimit", "isMostPopular", "logoUploadAllowed", "maxActiveMembers", "priceAnnualUsdCents", "seatModel", "sharingAllowed", "stripePriceIdAnnual", "stripePriceIdMonthly", "boqItemsLimit", "watermarkEnabled", "watermarkText", "boqPresetsLimit") FROM stdin;
cmlffb5940000n96325ma4ptx	starter	Starter	1900	10	["10 BOQ creations per month", "Single user", "2 BOQ themes", "2 cover page templates", "Unlimited BOQ presets", "Upload own logo", "PDF exports", "Customer management"]	1	t	\N	2026-02-09 17:05:46.072	2026-02-15 14:20:56.263	2	2	f	t	1	19900	single	f	\N	price_1T16BPAYEuDHpMaBRCgRhmLE	\N	f	\N	\N
cmlfhvihd0001n9plsrofrzz8	advance	Advance	3900	\N	["Unlimited BOQ creations", "Single user", "10 BOQ themes", "10 cover page templates", "Unlimited BOQ presets", "Upload own logo", "PDF exports", "Customer management", "Priority support"]	2	t	\N	2026-02-09 18:17:35.57	2026-02-15 14:20:56.268	10	10	t	t	1	41900	single	f	\N	price_1T16BPAYEuDHpMaBcKvX8ioJ	\N	f	\N	\N
cmlffb5980001n96351ozns0i	business	Business	4900	\N	["Unlimited BOQ creations", "Unlimited team members", "Unlimited BOQ themes", "Unlimited cover templates", "Unlimited BOQ presets", "Upload own logo", "Team collaboration & sharing", "PDF exports", "Customer management", "Priority support"]	3	t	\N	2026-02-09 17:05:46.077	2026-02-15 14:20:56.27	\N	\N	f	t	999	51900	per_seat	t	\N	price_1T16BPAYEuDHpMaBjgkWCbxQ	\N	f	\N	\N
cmlfm4q6x0000uotxvizgsdxz	free	Free Forever	0	\N	["Unlimited BOQ creations", "15 items per BOQ", "Single user", "1 BOQ theme", "1 cover page template", "1 BOQ preset", "PDF exports with watermark", "Customer management"]	0	t	\N	2026-02-09 20:16:43.93	2026-02-14 16:52:56.54	1	1	f	f	1	0	single	f	\N	\N	15	t	BOQ generated with MakeEstimate.com	1
\.


--
-- Data for Name: BillingPlanPriceHistory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."BillingPlanPriceHistory" (id, "billingPlanId", "stripePriceId", "amountCents", "isCurrent", "createdAt", "interval") FROM stdin;
\.


--
-- Data for Name: Boq; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Boq" (id, "companyId", "customerId", "projectName", "discountType", "discountValue", "vatEnabled", "vatPercent", status, "createdAt", "updatedAt", "discountEnabled", "coverTemplateId", "pdfThemeId", "dateMode", "preparationDate", "isPreset", "presetName") FROM stdin;
cmlp5yq9i0007nx08w3g1mokf	cmlp5y19x0001nx08hh95bprm	\N	lakshan	percent	0	f	18	draft	2026-02-16 12:41:51.99	2026-02-16 12:41:51.99	f	\N	\N	export_date	\N	f	\N
cmlpa8ihb000tnx08jm0yzjc8	cmlpa2yoi000enx08dpfowgxq	\N	gfggf	percent	0	f	18	preset	2026-02-16 14:41:26.928	2026-02-16 14:46:01.716	f	\N	\N	export_date	\N	t	gfggf
cmlpawojj001knx089zxf2ysi	cmlpatqvy001enx083nu7w6kb	\N	icc	percent	0	t	18	preset	2026-02-16 15:00:14.527	2026-02-16 15:00:42.902	f	\N	\N	export_date	\N	t	icc
\.


--
-- Data for Name: BoqCategory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."BoqCategory" (id, "boqId", name, "sortOrder", "createdAt") FROM stdin;
cmlp5yq9i0008nx089rs14zo0	cmlp5yq9i0007nx08w3g1mokf	General Works	0	2026-02-16 12:41:51.99
cmlpa8ihe000vnx0863exd4w4	cmlpa8ihb000tnx08jm0yzjc8	General Works	0	2026-02-16 14:41:26.93
cmlpa8nwa000xnx08ckw99h4x	cmlpa8ihb000tnx08jm0yzjc8	New Category	1	2026-02-16 14:41:33.947
cmlpaftcz0018nx08dc88c26k	cmlpa8ihb000tnx08jm0yzjc8	New Category	2	2026-02-16 14:47:07.62
cmlpafxel001anx085unkiee3	cmlpa8ihb000tnx08jm0yzjc8	Nfdgfgfg	3	2026-02-16 14:47:12.861
cmlpawojl001mnx08duhz1pus	cmlpawojj001knx089zxf2ysi	General Works	0	2026-02-16 15:00:14.53
\.


--
-- Data for Name: BoqCreationEvent; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."BoqCreationEvent" (id, "companyId", "boqId", "createdAt") FROM stdin;
cmlp5yq9t000anx08m7dkypgw	cmlp5y19x0001nx08hh95bprm	cmlp5yq9i0007nx08w3g1mokf	2026-02-16 12:41:52.002
cmlpa4nn9000nnx08ztk5sdne	cmlpa2yoi000enx08dpfowgxq	cmlpa4nn5000knx08kbh6ddb4	2026-02-16 14:38:26.997
\.


--
-- Data for Name: BoqItem; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."BoqItem" (id, "categoryId", description, unit, "unitCost", "markupPct", quantity, "sortOrder", "createdAt", "includeInPdf", "isNote", "noteContent") FROM stdin;
cmlpaddgl0011nx08h6p2u0of	cmlpa8ihe000vnx0863exd4w4			0	0	0	1	2026-02-16 14:45:13.701	t	t	edhsdjsajdgsjgjygfdfhdfed<br>sddsddfdf<br>fdfd
cmlpads9g0015nx08wua4iokh	cmlpa8ihe000vnx0863exd4w4			0	0	0	3	2026-02-16 14:45:32.885	t	t	fdffadfdfdfdf
cmlpadpjr0013nx08fhz8a8wl	cmlpa8ihe000vnx0863exd4w4	fdfdfdfd	m	20	40	4	2	2026-02-16 14:45:29.368	t	f	\N
cmlpag9xi001cnx08x7x121s9	cmlpafxel001anx085unkiee3	gfgfgfg		0	0	0	0	2026-02-16 14:47:29.094	t	f	\N
cmlpawv4z001onx08jrlr9v1q	cmlpawojl001mnx08duhz1pus	 		0	0	0	0	2026-02-16 15:00:23.075	t	f	\N
cmlpb3uu6001qnx08wn3v8og4	cmlpawojl001mnx08duhz1pus			0	0	0	1	2026-02-16 15:05:49.279	t	f	\N
cmlpacssl000znx08wq43ejvi	cmlpa8ihe000vnx0863exd4w4	dsdsdsdsd	m2	1000	30	10	0	2026-02-16 14:44:46.917	t	f	\N
\.


--
-- Data for Name: Company; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Company" (id, name, "currencySymbol", "currencyPosition", "createdAt", "updatedAt", "defaultVatPercent", "blockReason", "isBlocked", "deletedAt") FROM stdin;
cmle2rp580001my089yddwnvk	Glorand	Rs.	left	2026-02-08 18:26:57.165	2026-02-08 18:26:57.165	18	\N	f	\N
cmlnu5qmo0001qp5cmyf3mnbv	Demo Construction Ltd	Rs.	left	2026-02-15 14:23:37.488	2026-02-15 14:23:37.488	18	\N	f	\N
cmlp5y19x0001nx08hh95bprm	arthadesignpvt	Rs.	left	2026-02-16 12:41:19.606	2026-02-16 12:41:19.606	18	\N	f	\N
cmlpa2yoi000enx08dpfowgxq	lakosa	Rs.	left	2026-02-16 14:37:07.986	2026-02-16 14:37:07.986	18	\N	f	\N
cmlpatqvy001enx083nu7w6kb	ICC	Rs.	left	2026-02-16 14:57:57.599	2026-02-16 14:57:57.599	18	\N	f	\N
cmlpba7h8001unx08fuslt574	Dream Zone Construction & Engineering 	Rs.	left	2026-02-16 15:10:45.597	2026-02-16 15:10:45.597	18	\N	f	\N
\.


--
-- Data for Name: CompanyAccessGrant; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."CompanyAccessGrant" (id, "companyId", "grantType", "planKey", "couponId", "startsAt", "endsAt", "revokedAt", "revokedById", "createdAt", "updatedAt", "createdByAdminUserId", notes) FROM stdin;
cmlp6s65z000cnx08e0kc2viu	cmlp5y19x0001nx08hh95bprm	admin_grant	starter	\N	2026-02-16 13:04:45.623	2026-02-28 13:04:00	\N	\N	2026-02-16 13:04:45.624	2026-02-16 13:04:45.624	cmle2rp560000my086vcfufpk	\N
cmlpb55ae001snx08innrtujz	cmlpatqvy001enx083nu7w6kb	admin_grant	starter	\N	2026-02-16 15:06:49.478	2026-03-31 15:06:00	\N	\N	2026-02-16 15:06:49.478	2026-02-16 15:06:49.478	cmle2rp560000my086vcfufpk	\N
\.


--
-- Data for Name: CompanyBilling; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."CompanyBilling" (id, "companyId", "stripeCustomerId", "stripeSubscriptionId", "planKey", status, "currentPeriodStart", "currentPeriodEnd", "cancelAtPeriodEnd", "createdAt", "updatedAt", "accessOverride", "currentCouponCode", "overridePlan", "billingInterval", "seatQuantity") FROM stdin;
cmle2s29i0005my088r08yvui	cmle2rp580001my089yddwnvk	cus_TwViJRI0ZCZVwj	sub_1Syci4PDJOCqZJzMrAHeEXoK	free	active	2026-02-09 22:32:00.751	\N	f	2026-02-08 18:27:14.166	2026-02-09 22:32:00.752	\N	\N	\N	month	1
cmlp5y7pk0005nx084wg3yjdd	cmlp5y19x0001nx08hh95bprm	\N	\N	free	active	2026-02-16 12:41:27.946	\N	f	2026-02-16 12:41:27.945	2026-02-16 13:04:45.626	admin_grant	\N	starter	month	1
cmlpa395r000inx08msezhawq	cmlpa2yoi000enx08dpfowgxq	\N	\N	free	active	2026-02-16 14:44:38.727	\N	f	2026-02-16 14:37:21.567	2026-02-16 14:44:38.727	\N	\N	\N	month	1
cmlpatz0g001inx08j44un2vg	cmlpatqvy001enx083nu7w6kb	\N	\N	free	active	2026-02-16 14:58:08.13	\N	f	2026-02-16 14:58:08.128	2026-02-16 15:06:49.48	admin_grant	\N	starter	month	1
cmlpbbp60001ynx08fvm3t5g3	cmlpba7h8001unx08fuslt574	\N	\N	free	active	2026-02-16 15:11:55.178	\N	f	2026-02-16 15:11:55.177	2026-02-16 15:11:55.179	\N	\N	\N	month	1
\.


--
-- Data for Name: CompanyMembership; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."CompanyMembership" (id, "userId", "companyId", role, "createdAt", "isActive", "updatedAt") FROM stdin;
cmle2rp5a0003my08xdeo85b1	cmle2rp560000my086vcfufpk	cmle2rp580001my089yddwnvk	ADMIN	2026-02-08 18:26:57.166	t	2026-02-09 18:17:02.636
cmlnu5qmq0003qp5csg6te9ft	cmlnu5qml0000qp5cifsbbtxn	cmlnu5qmo0001qp5cmyf3mnbv	ADMIN	2026-02-15 14:23:37.491	t	2026-02-15 14:23:37.491
cmlp5y1a10003nx08r3gtaxya	cmlp5y19r0000nx08br1uyo6e	cmlp5y19x0001nx08hh95bprm	ADMIN	2026-02-16 12:41:19.609	t	2026-02-16 12:41:19.609
cmlpa2yok000gnx082rcxdhqc	cmlpa2yof000dnx08m92tnpls	cmlpa2yoi000enx08dpfowgxq	ADMIN	2026-02-16 14:37:07.988	t	2026-02-16 14:37:07.988
cmlpatqw0001gnx08mxtrbsez	cmlpatqvw001dnx08gycjf82q	cmlpatqvy001enx083nu7w6kb	ADMIN	2026-02-16 14:57:57.6	t	2026-02-16 14:57:57.6
cmlpba7ha001wnx08qgjl8y8o	cmlpba7h6001tnx08cgy8wex6	cmlpba7h8001unx08fuslt574	ADMIN	2026-02-16 15:10:45.598	t	2026-02-16 15:10:45.598
\.


--
-- Data for Name: CouponRedemption; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."CouponRedemption" (id, "companyBillingId", "couponCode", "couponType", "stripePromotionCodeId", "redeemedAt", "revokedAt", "revokedByAdminId", source) FROM stdin;
\.


--
-- Data for Name: Customer; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Customer" (id, "companyId", name, email, phone, address, "createdAt") FROM stdin;
\.


--
-- Data for Name: PdfCoverTemplate; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."PdfCoverTemplate" (id, "companyId", name, "configJson", "isDefault", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: PdfExportJob; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."PdfExportJob" (id, "boqId", "companyId", "userId", status, "pdfUrl", "errorMessage", "startedAt", "completedAt", "createdAt", "updatedAt") FROM stdin;
cmlpaeeub0016nx088sgpzgcj	cmlpa8ihb000tnx08jm0yzjc8	cmlpa2yoi000enx08dpfowgxq	cmlpa2yof000dnx08m92tnpls	completed	data:application/pdf;base64,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YmoKMiAwIG9iago8PC9UeXBlIC9QYWdlCi9SZXNvdXJjZXMgPDwvUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0KL0V4dEdTdGF0ZSA8PC9HMyAzIDAgUj4+Ci9QYXR0ZXJuIDw8L1A3IDcgMCBSPj4KL0ZvbnQgPDwvRjQgNCAwIFIKL0Y1IDUgMCBSCi9GOCA4IDAgUj4+Pj4KL01lZGlhQm94IFswIDAgNTk1LjkxOTk4IDg0Mi44OF0KL0Fubm90cyBbOSAwIFIgMTAgMCBSXQovQ29udGVudHMgMTEgMCBSCi9TdHJ1Y3RQYXJlbnRzIDAKL1RhYnMgL1MKL1BhcmVudCAxOSAwIFI+PgplbmRvYmoKMTIgMCBvYmoKPDwvVHlwZSAvUGFnZQovUmVzb3VyY2VzIDw8L1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUldCi9FeHRHU3RhdGUgPDwvRzMgMyAwIFI+PgovUGF0dGVybiA8PC9QMTMgMTMgMCBSCi9QMTUgMTUgMCBSPj4KL0ZvbnQgPDwvRjQgNCAwIFIKL0Y1IDUgMCBSCi9GOCA4IDAgUj4+Pj4KL01lZGlhQm94IFswIDAgNTk1LjkxOTk4IDg0Mi44OF0KL0Fubm90cyBbMTYgMCBSIDE3IDAgUl0KL0NvbnRlbnRzIDE4IDAgUgovU3RydWN0UGFyZW50cyAxCi9UYWJzIC9TCi9QYXJlbnQgMTkgMCBSPj4KZW5kb2JqCjE5IDAgb2JqCjw8L1R5cGUgL1BhZ2VzCi9Db3VudCAyCi9LaWRzIFsyIDAgUiAxMiAwIFJdPj4KZW5kb2JqCjIwIDAgb2JqCjw8L1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDE5IDAgUj4+CmVuZG9iagoyMSAwIG9iago8PC9MZW5ndGgxIDE1MTgwCi9GaWx0ZXIgL0ZsYXRlRGVjb2RlCi9MZW5ndGggMTAwODQ+PiBzdHJlYW0KeJydewl8FFXycFWfM5O5eo6eTAaYnkwmh0lIyCRguNJAEoJRc5BIBoSZSMCgYAIJIgqSuB4QxOCKrrsosC5/18WDBlGCJ977/YEV1gMRXVjBa8WF3QXXBdL59r2ZhCC6+/2+10N3v3r16tWrV1Wv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5en8gj9Hv8G+c2v2bwKER/RifIzGTkVqgHxzA4gHTvk8Kpd8eBtgD/JosDQin/zvqkdQ0IvFB75fQP/2kRa7EP8LzP8LqiD1tAplbmRzdHJlYW0KZW5kb2JqCjIyIDAgb2JqCjw8L1R5cGUgL0ZvbnREZXNjcmlwdG9yCi9Gb250TmFtZSAvQUFBQUFBK0xpYmVyYXRpb25TYW5zLUJvbGQKL0ZsYWdzIDQKL0FzY2VudCA5MDUuMjczNDQKL0Rlc2NlbnQgLTIxMS45MTQwNgovU3RlbVYgNzYuMTcxODc1Ci9DYXBIZWlnaHQgLTY4Ny45ODgyOAovSXRhbGljQW5nbGUgMAovRm9udEJCb3ggWy00ODEuOTMzNTkgLTM3Ni40NjQ4NCAxMzA0LjE5OTIyIDEwMzMuMjAzMTNdCi9Gb250RmlsZTIgMjEgMCBSPj4KZW5kb2JqCjIzIDAgb2JqCjw8L1R5cGUgL0ZvbnQKL0ZvbnREZXNjcmlwdG9yIDIyIDAgUgovQmFzZUZvbnQgL0FBQUFBQStMaWJlcmF0aW9uU2Fucy1Cb2xkCi9TdWJ0eXBlIC9DSURGb250VHlwZTIKL0NJRFRvR0lETWFwIC9JZGVudGl0eQovQ0lEU3lzdGVtSW5mbyA8PC9SZWdpc3RyeSAoQWRvYmUpCi9PcmRlcmluZyAoSWRlbnRpdHkpCi9TdXBwbGVtZW50IDA+PgovVyBbMyBbMjc3LjgzMjAzXSAxMSAxMiAzMzMuMDA3ODEgMTUgMTcgMjc3LjgzMjAzIDE5IDIyIDU1Ni4xNTIzNCAzNiAzOSA3MjIuMTY3OTcgNDAgWzY2Ni45OTIxOSAwIDc3Ny44MzIwMyAwIDI3Ny44MzIwMyAwIDAgMCA4MzMuMDA3ODEgNzIyLjE2Nzk3IDc3Ny44MzIwMyA2NjYuOTkyMTkgNzc3LjgzMjAzIDcyMi4xNjc5NyA2NjYuOTkyMTkgNjEwLjgzOTg0IDcyMi4xNjc5NyAwIDk0My44NDc2NiAwIDY2Ni45OTIxOV0gNjggWzU1Ni4xNTIzNCA2MTAuODM5ODQgNTU2LjE1MjM0IDYxMC44Mzk4NCA1NTYuMTUyMzQgMzMzLjAwNzgxIDYxMC44Mzk4NCA2MTAuODM5ODQgMjc3LjgzMjAzIDAgNTU2LjE1MjM0IDI3Ny44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L0xhc3RDaGFyIDE3OAovRm9udEJCb3ggWzAgNTA4IDI1NTYgLTE4OThdCi9DSURUb0dJRE1hcCAvSWRlbnRpdHkKL1RvVW5pY29kZSAzMyAwIFIKL0ZvbnREZXNjcmlwdG9yIDM0IDAgUgovV2lkdGhzIFsyNTUwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDI1NTUuMzAyN10KL0VuY29kaW5nIDw8L1R5cGUgL0VuY29kaW5nCi9EaWZmZXJlbmNlcyBbMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cwIC9nMCAvZzAgL2cyQjBdPj4KL0NoYXJQcm9jcyA8PC9nMCAyOSAwIFIKL2cyQjAgMzIgMCBSPj4+PgplbmRvYmoKeHJlZgowIDM1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDQwNTAzIDAwMDAwIG4gCjAwMDAwMDAxNTUgMDAwMDAgbiAKMDAwMDA1Mjc2MyAwMDAwMCBuIAowMDAwMDYxNzY2IDAwMDAwIG4gCjAwMDAwMDAxOTIgMDAwMDAgbiAKMDAwMDAxODMyMyAwMDAwMCBuIAowMDAwMDYzNzU4IDAwMDAwIG4gCjAwMDAwMTg2NzIgMDAwMDAgbiAKMDAwMDAxODg0NCAwMDAwMCBuIAowMDAwMDE5MDE3IDAwMDAwIG4gCjAwMDAwNDA3OTcgMDAwMDAgbiAKMDAwMDAxOTY2MyAwMDAwMCBuIAowMDAwMDE5OTQ0IDAwMDAwIG4gCjAwMDAwMzgwNzYgMDAwMDAgbiAKMDAwMDAzODQyOSAwMDAwMCBuIAowMDAwMDM4NjAyIDAwMDAwIG4gCjAwMDAwMzg3NzUgMDAwMDAgbiAKMDAwMDA0MTEwNyAwMDAwMCBuIAowMDAwMDQxMTcwIDAwMDAwIG4gCjAwMDAwNDEyMTkgMDAwMDAgbiAKMDAwMDA1MTM5MSAwMDAwMCBuIAowMDAwMDUxNjQ2IDAwMDAwIG4gCjAwMDAwNTIzNTAgMDAwMDAgbiAKMDAwMDA1MjkxNCAwMDAwMCBuIAowMDAwMDYwNjY1IDAwMDAwIG4gCjAwMDAwNjA5MTQgMDAwMDAgbiAKMDAwMDA2MTM4MSAwMDAwMCBuIAowMDAwMDYxOTEyIDAwMDAwIG4gCjAwMDAwNjE5NzkgMDAwMDAgbiAKMDAwMDA2MjgzMyAwMDAwMCBuIAowMDAwMDYzMTYwIDAwMDAwIG4gCjAwMDAwNjMyNTggMDAwMDAgbiAKMDAwMDA2MzU2MCAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgMzUKL1Jvb3QgMjAgMCBSCi9JbmZvIDEgMCBSPj4Kc3RhcnR4cmVmCjY1MTk5CiUlRU9GCg==	\N	2026-02-16 14:46:02.15	2026-02-16 14:46:03.373	2026-02-16 14:46:02.148	2026-02-16 14:46:03.374
\.


--
-- Data for Name: PdfTheme; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."PdfTheme" (id, "companyId", name, "configJson", "isDefault", "createdAt", "updatedAt") FROM stdin;
cmlpbc1590020nx08enikq94k	cmlpba7h8001unx08fuslt574	Theme 1	{"table": {"borderColor": "#e5e7eb", "bodyTextColor": "#333333", "headerTextColor": "#6b7280", "headerBackground": "#f9fafb"}, "header": {"titleColor": "#0891b2", "borderColor": "#0891b2", "subtitleColor": "#666666"}, "totals": {"finalTotalTextColor": "#ffffff", "finalTotalBackground": "#0891b2"}, "noteRow": {"textColor": "#92400e", "background": "#fffbeb"}, "subtotalRow": {"textColor": "#333333", "background": "#f0fdfa", "borderColor": "#14b8a6"}, "categoryHeader": {"textColor": "#ffffff", "backgroundPrimary": "#0891b2", "backgroundSecondary": "#14b8a6"}}	t	2026-02-16 15:12:10.702	2026-02-16 15:12:10.702
\.


--
-- Data for Name: PlatformCoupon; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."PlatformCoupon" (id, code, type, "trialDays", "allowedPlans", "stripePromoCodeId", "stripeCouponId", "maxRedemptions", "currentRedemptions", "expiresAt", active, archived, "createdAt", "updatedAt") FROM stdin;
cmle34sv5000omy08xkall144	SS22	trial_days	14	{starter}	\N	\N	1	0	2026-02-12 00:00:00	t	f	2026-02-08 18:37:08.514	2026-02-08 18:37:26.956
cmlf77ih10000ywoiscdec9kc	TRIAL14	trial_days	14	{starter}	\N	\N	1	0	\N	t	f	2026-02-09 13:18:59.654	2026-02-09 13:18:59.654
cmlpbd1p60021nx08ahequ9ro	QTEST3M	trial_days	90	{advance}	\N	\N	1	0	2026-05-31 00:00:00	t	f	2026-02-16 15:12:58.074	2026-02-16 15:12:58.074
\.


--
-- Data for Name: StripeWebhookEvent; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."StripeWebhookEvent" (id, type, "processedAt") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, email, password, name, "createdAt", "updatedAt", "blockReason", "isBlocked", "firstName", "forcePasswordReset", "lastLoginAt", "lastName", phone, country, "phoneDigits", "deletedAt") FROM stdin;
cmle2rp560000my086vcfufpk	glorandlk@gmail.com	$2a$10$7hCg4fo6kD9.AZ0Klt4zl.1TCdFbHBle9s3LcfxsnKkJFi4gGMTQC	Glorand Labs	2026-02-08 18:26:57.162	2026-02-16 04:37:26.701	\N	f	\N	f	2026-02-16 04:37:26.701	\N	\N	\N	\N	\N
cmlp5y19r0000nx08br1uyo6e	sandarekafernando3@gmail.com	$2a$10$elImlJiGExt796ZjJKfXsOxuwgBucpPk27XRz3U3HufW8ZHFdEZpW	lakshan karunathilaka.	2026-02-16 12:41:19.599	2026-02-16 12:41:20.594	\N	f	lakshan	f	2026-02-16 12:41:20.593	karunathilaka.	+94717064869	LK	94717064869	\N
cmlpa2yof000dnx08m92tnpls	lakosadesign@gmail.com	$2a$10$YKsLz3siwIh/KUn0Kz9.4e5aFdSRVXEXB2VVQa3QF5r9dKW2bQKXK	SHAKILA jay	2026-02-16 14:37:07.984	2026-02-16 14:37:09.585	\N	f	SHAKILA	f	2026-02-16 14:37:09.584	jay	+94777680668	LK	94777680668	\N
cmlpatqvw001dnx08gycjf82q	nazeerstsgsbsa@gmail.com	$2a$10$e07vrhFtG5be.nGcvmPdNeqg8BOg6u.ECDscynlvIw9yZTlUrhn1K	Nazeer Mohommad	2026-02-16 14:57:57.596	2026-02-16 14:58:00.433	\N	f	Nazeer	f	2026-02-16 14:58:00.432	Mohommad	+15875275257555	CA	15875275257555	\N
cmlpba7h6001tnx08cgy8wex6	thilinaprabhath321@gmail.com	$2a$10$wSbnIoFjLaYT5P3uubYE0eaGFI2FsvILf/RPWRwxdygruf/027JRO	Thilina Prabhath	2026-02-16 15:10:45.594	2026-02-16 15:10:46.718	\N	f	Thilina	f	2026-02-16 15:10:46.717	Prabhath	+94769134505	LK	94769134505	\N
cmlnu5qml0000qp5cifsbbtxn	testuserxqstr0vh@example.com	$2a$10$Y0IPXJJBGan8JYRe1RC1JuaESZ9z923NV/3pKrPVxprgoWcpc3zFC	Test User	2026-02-15 14:23:37.486	2026-02-15 14:23:37.486	\N	f	Test	f	\N	User	+1234567890	USA	1234567890	\N
\.


--
-- Name: BillingInvoice BillingInvoice_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BillingInvoice"
    ADD CONSTRAINT "BillingInvoice_pkey" PRIMARY KEY (id);


--
-- Name: BillingPlanPriceHistory BillingPlanPriceHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BillingPlanPriceHistory"
    ADD CONSTRAINT "BillingPlanPriceHistory_pkey" PRIMARY KEY (id);


--
-- Name: BillingPlan BillingPlan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BillingPlan"
    ADD CONSTRAINT "BillingPlan_pkey" PRIMARY KEY (id);


--
-- Name: BoqCategory BoqCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BoqCategory"
    ADD CONSTRAINT "BoqCategory_pkey" PRIMARY KEY (id);


--
-- Name: BoqCreationEvent BoqCreationEvent_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BoqCreationEvent"
    ADD CONSTRAINT "BoqCreationEvent_pkey" PRIMARY KEY (id);


--
-- Name: BoqItem BoqItem_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BoqItem"
    ADD CONSTRAINT "BoqItem_pkey" PRIMARY KEY (id);


--
-- Name: Boq Boq_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Boq"
    ADD CONSTRAINT "Boq_pkey" PRIMARY KEY (id);


--
-- Name: CompanyAccessGrant CompanyAccessGrant_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CompanyAccessGrant"
    ADD CONSTRAINT "CompanyAccessGrant_pkey" PRIMARY KEY (id);


--
-- Name: CompanyBilling CompanyBilling_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CompanyBilling"
    ADD CONSTRAINT "CompanyBilling_pkey" PRIMARY KEY (id);


--
-- Name: CompanyMembership CompanyMembership_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CompanyMembership"
    ADD CONSTRAINT "CompanyMembership_pkey" PRIMARY KEY (id);


--
-- Name: Company Company_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT "Company_pkey" PRIMARY KEY (id);


--
-- Name: CouponRedemption CouponRedemption_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CouponRedemption"
    ADD CONSTRAINT "CouponRedemption_pkey" PRIMARY KEY (id);


--
-- Name: Customer Customer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY (id);


--
-- Name: PdfCoverTemplate PdfCoverTemplate_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PdfCoverTemplate"
    ADD CONSTRAINT "PdfCoverTemplate_pkey" PRIMARY KEY (id);


--
-- Name: PdfExportJob PdfExportJob_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PdfExportJob"
    ADD CONSTRAINT "PdfExportJob_pkey" PRIMARY KEY (id);


--
-- Name: PdfTheme PdfTheme_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PdfTheme"
    ADD CONSTRAINT "PdfTheme_pkey" PRIMARY KEY (id);


--
-- Name: PlatformCoupon PlatformCoupon_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PlatformCoupon"
    ADD CONSTRAINT "PlatformCoupon_pkey" PRIMARY KEY (id);


--
-- Name: StripeWebhookEvent StripeWebhookEvent_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StripeWebhookEvent"
    ADD CONSTRAINT "StripeWebhookEvent_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: BillingInvoice_companyBillingId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "BillingInvoice_companyBillingId_idx" ON public."BillingInvoice" USING btree ("companyBillingId");


--
-- Name: BillingInvoice_stripeInvoiceId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "BillingInvoice_stripeInvoiceId_idx" ON public."BillingInvoice" USING btree ("stripeInvoiceId");


--
-- Name: BillingInvoice_stripeInvoiceId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "BillingInvoice_stripeInvoiceId_key" ON public."BillingInvoice" USING btree ("stripeInvoiceId");


--
-- Name: BillingPlanPriceHistory_billingPlanId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "BillingPlanPriceHistory_billingPlanId_idx" ON public."BillingPlanPriceHistory" USING btree ("billingPlanId");


--
-- Name: BillingPlanPriceHistory_stripePriceId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "BillingPlanPriceHistory_stripePriceId_idx" ON public."BillingPlanPriceHistory" USING btree ("stripePriceId");


--
-- Name: BillingPlan_active_sortOrder_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "BillingPlan_active_sortOrder_idx" ON public."BillingPlan" USING btree (active, "sortOrder");


--
-- Name: BillingPlan_planKey_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "BillingPlan_planKey_key" ON public."BillingPlan" USING btree ("planKey");


--
-- Name: BoqCategory_boqId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "BoqCategory_boqId_idx" ON public."BoqCategory" USING btree ("boqId");


--
-- Name: BoqCategory_boqId_sortOrder_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "BoqCategory_boqId_sortOrder_idx" ON public."BoqCategory" USING btree ("boqId", "sortOrder");


--
-- Name: BoqCreationEvent_companyId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "BoqCreationEvent_companyId_createdAt_idx" ON public."BoqCreationEvent" USING btree ("companyId", "createdAt");


--
-- Name: BoqItem_categoryId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "BoqItem_categoryId_idx" ON public."BoqItem" USING btree ("categoryId");


--
-- Name: BoqItem_categoryId_sortOrder_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "BoqItem_categoryId_sortOrder_idx" ON public."BoqItem" USING btree ("categoryId", "sortOrder");


--
-- Name: Boq_companyId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Boq_companyId_idx" ON public."Boq" USING btree ("companyId");


--
-- Name: Boq_companyId_isPreset_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Boq_companyId_isPreset_idx" ON public."Boq" USING btree ("companyId", "isPreset");


--
-- Name: Boq_companyId_projectName_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Boq_companyId_projectName_idx" ON public."Boq" USING btree ("companyId", "projectName");


--
-- Name: Boq_companyId_updatedAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Boq_companyId_updatedAt_idx" ON public."Boq" USING btree ("companyId", "updatedAt" DESC);


--
-- Name: Boq_customerId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Boq_customerId_idx" ON public."Boq" USING btree ("customerId");


--
-- Name: CompanyAccessGrant_companyId_endsAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "CompanyAccessGrant_companyId_endsAt_idx" ON public."CompanyAccessGrant" USING btree ("companyId", "endsAt");


--
-- Name: CompanyAccessGrant_companyId_revokedAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "CompanyAccessGrant_companyId_revokedAt_idx" ON public."CompanyAccessGrant" USING btree ("companyId", "revokedAt");


--
-- Name: CompanyAccessGrant_createdByAdminUserId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "CompanyAccessGrant_createdByAdminUserId_idx" ON public."CompanyAccessGrant" USING btree ("createdByAdminUserId");


--
-- Name: CompanyBilling_companyId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "CompanyBilling_companyId_key" ON public."CompanyBilling" USING btree ("companyId");


--
-- Name: CompanyBilling_stripeCustomerId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "CompanyBilling_stripeCustomerId_key" ON public."CompanyBilling" USING btree ("stripeCustomerId");


--
-- Name: CompanyBilling_stripeSubscriptionId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "CompanyBilling_stripeSubscriptionId_key" ON public."CompanyBilling" USING btree ("stripeSubscriptionId");


--
-- Name: CompanyMembership_companyId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "CompanyMembership_companyId_idx" ON public."CompanyMembership" USING btree ("companyId");


--
-- Name: CompanyMembership_companyId_isActive_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "CompanyMembership_companyId_isActive_idx" ON public."CompanyMembership" USING btree ("companyId", "isActive");


--
-- Name: CompanyMembership_userId_companyId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "CompanyMembership_userId_companyId_key" ON public."CompanyMembership" USING btree ("userId", "companyId");


--
-- Name: CompanyMembership_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "CompanyMembership_userId_idx" ON public."CompanyMembership" USING btree ("userId");


--
-- Name: Company_deletedAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Company_deletedAt_idx" ON public."Company" USING btree ("deletedAt");


--
-- Name: CouponRedemption_companyBillingId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "CouponRedemption_companyBillingId_idx" ON public."CouponRedemption" USING btree ("companyBillingId");


--
-- Name: CouponRedemption_couponCode_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "CouponRedemption_couponCode_idx" ON public."CouponRedemption" USING btree ("couponCode");


--
-- Name: Customer_companyId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Customer_companyId_idx" ON public."Customer" USING btree ("companyId");


--
-- Name: Customer_companyId_name_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Customer_companyId_name_idx" ON public."Customer" USING btree ("companyId", name);


--
-- Name: PdfCoverTemplate_companyId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "PdfCoverTemplate_companyId_idx" ON public."PdfCoverTemplate" USING btree ("companyId");


--
-- Name: PdfCoverTemplate_companyId_isDefault_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "PdfCoverTemplate_companyId_isDefault_idx" ON public."PdfCoverTemplate" USING btree ("companyId", "isDefault");


--
-- Name: PdfExportJob_boqId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "PdfExportJob_boqId_idx" ON public."PdfExportJob" USING btree ("boqId");


--
-- Name: PdfExportJob_companyId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "PdfExportJob_companyId_createdAt_idx" ON public."PdfExportJob" USING btree ("companyId", "createdAt" DESC);


--
-- Name: PdfExportJob_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "PdfExportJob_status_idx" ON public."PdfExportJob" USING btree (status);


--
-- Name: PdfTheme_companyId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "PdfTheme_companyId_idx" ON public."PdfTheme" USING btree ("companyId");


--
-- Name: PdfTheme_companyId_isDefault_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "PdfTheme_companyId_isDefault_idx" ON public."PdfTheme" USING btree ("companyId", "isDefault");


--
-- Name: PlatformCoupon_code_active_archived_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "PlatformCoupon_code_active_archived_idx" ON public."PlatformCoupon" USING btree (code, active, archived);


--
-- Name: PlatformCoupon_code_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "PlatformCoupon_code_key" ON public."PlatformCoupon" USING btree (code);


--
-- Name: PlatformCoupon_stripePromoCodeId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "PlatformCoupon_stripePromoCodeId_key" ON public."PlatformCoupon" USING btree ("stripePromoCodeId");


--
-- Name: StripeWebhookEvent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "StripeWebhookEvent_id_idx" ON public."StripeWebhookEvent" USING btree (id);


--
-- Name: User_country_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_country_idx" ON public."User" USING btree (country);


--
-- Name: User_deletedAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_deletedAt_idx" ON public."User" USING btree ("deletedAt");


--
-- Name: User_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_email_idx" ON public."User" USING btree (email);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_phone_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_phone_idx" ON public."User" USING btree (phone);


--
-- Name: BillingInvoice BillingInvoice_companyBillingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BillingInvoice"
    ADD CONSTRAINT "BillingInvoice_companyBillingId_fkey" FOREIGN KEY ("companyBillingId") REFERENCES public."CompanyBilling"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BillingPlanPriceHistory BillingPlanPriceHistory_billingPlanId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BillingPlanPriceHistory"
    ADD CONSTRAINT "BillingPlanPriceHistory_billingPlanId_fkey" FOREIGN KEY ("billingPlanId") REFERENCES public."BillingPlan"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BoqCategory BoqCategory_boqId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BoqCategory"
    ADD CONSTRAINT "BoqCategory_boqId_fkey" FOREIGN KEY ("boqId") REFERENCES public."Boq"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BoqCreationEvent BoqCreationEvent_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BoqCreationEvent"
    ADD CONSTRAINT "BoqCreationEvent_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BoqItem BoqItem_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BoqItem"
    ADD CONSTRAINT "BoqItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."BoqCategory"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Boq Boq_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Boq"
    ADD CONSTRAINT "Boq_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Boq Boq_coverTemplateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Boq"
    ADD CONSTRAINT "Boq_coverTemplateId_fkey" FOREIGN KEY ("coverTemplateId") REFERENCES public."PdfCoverTemplate"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Boq Boq_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Boq"
    ADD CONSTRAINT "Boq_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Boq Boq_pdfThemeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Boq"
    ADD CONSTRAINT "Boq_pdfThemeId_fkey" FOREIGN KEY ("pdfThemeId") REFERENCES public."PdfTheme"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CompanyAccessGrant CompanyAccessGrant_createdByAdminUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CompanyAccessGrant"
    ADD CONSTRAINT "CompanyAccessGrant_createdByAdminUserId_fkey" FOREIGN KEY ("createdByAdminUserId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CompanyBilling CompanyBilling_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CompanyBilling"
    ADD CONSTRAINT "CompanyBilling_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CompanyMembership CompanyMembership_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CompanyMembership"
    ADD CONSTRAINT "CompanyMembership_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CompanyMembership CompanyMembership_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CompanyMembership"
    ADD CONSTRAINT "CompanyMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CouponRedemption CouponRedemption_companyBillingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CouponRedemption"
    ADD CONSTRAINT "CouponRedemption_companyBillingId_fkey" FOREIGN KEY ("companyBillingId") REFERENCES public."CompanyBilling"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Customer Customer_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PdfCoverTemplate PdfCoverTemplate_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PdfCoverTemplate"
    ADD CONSTRAINT "PdfCoverTemplate_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PdfTheme PdfTheme_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PdfTheme"
    ADD CONSTRAINT "PdfTheme_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


