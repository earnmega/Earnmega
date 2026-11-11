"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ShieldCheck,
  Sparkles,
  TrendingUp,
  DollarSign,
  Copy,
  ExternalLink,
  Award,
  Zap,
  Lock,
  ShoppingBag,
  BarChart3,
  Users,
  Calculator,
  Share2,
  HelpCircle,
  Clock,
  CheckCircle2,
  Menu,
  X,
  Bell,
  User,
  Search,
  QrCode,
  LogOut,
  Settings,
  Key,
  Smartphone,
  FileText,
  Trophy,
  Video,
  MessageSquare,
  Globe,
  Mail,
  Download,
  Eye,
  Briefcase,
  CreditCard,
  ArrowRight,
  Folder,
  RefreshCcw,
  CalendarDays,
  Upload,
  LifeBuoy,
  Rocket,
  Crown,
  Activity,
  LayoutDashboard
} from 'lucide-react';

// ============================================================================
// PLATFORM CONFIGURATION & CONSTANTS
// ============================================================================
const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";
const DIRECT_ENROLLMENT_GHS = 90.00;
const VIRAL_CONTEST_PRIZE_GHS = 10000.00;

const SUPPORT_EMAIL_PRIMARY = "earnmegadesk@gmail.com";
const SUPPORT_EMAIL_SECONDARY = "earnmegadesk@gmail.com";
const SUPPORT_WHATSAPP_DISPLAY = "0596096071";
const SUPPORT_WHATSAPP_INTL = "233596096071";

// ============================================================================
// WORLDWIDE CURRENCIES (AFRICA, ASIA, EUROPE, AMERICAS — SETTLES IN GHS)
// ============================================================================
interface CurrencyRate {
  code: string;
  symbol: string;
  rateToGHS: number;
  region: string;
  name: string;
}

const GLOBAL_CURRENCIES: Record<string, CurrencyRate> = {
  GHS: { code: 'GHS', symbol: 'GH₵', rateToGHS: 1.0, region: 'Africa', name: 'Ghana Cedi (Paystack Settlement)' },
  NGN: { code: 'NGN', symbol: '₦', rateToGHS: 0.010, region: 'Africa', name: 'Nigerian Naira' },
  KES: { code: 'KES', symbol: 'KSh', rateToGHS: 0.124, region: 'Africa', name: 'Kenyan Shilling' },
  ZAR: { code: 'ZAR', symbol: 'R', rateToGHS: 0.88, region: 'Africa', name: 'South African Rand' },
  XOF: { code: 'XOF', symbol: 'CFA', rateToGHS: 0.026, region: 'Africa', name: 'West African CFA Franc' },
  XAF: { code: 'XAF', symbol: 'FCFA', rateToGHS: 0.026, region: 'Africa', name: 'Central African CFA Franc' },
  UGX: { code: 'UGX', symbol: 'USh', rateToGHS: 0.0043, region: 'Africa', name: 'Ugandan Shilling' },
  TZS: { code: 'TZS', symbol: 'TSh', rateToGHS: 0.0061, region: 'Africa', name: 'Tanzanian Shilling' },
  RWF: { code: 'RWF', symbol: 'FRw', rateToGHS: 0.012, region: 'Africa', name: 'Rwandan Franc' },
  ZMW: { code: 'ZMW', symbol: 'ZK', rateToGHS: 0.60, region: 'Africa', name: 'Zambian Kwacha' },
  EGP: { code: 'EGP', symbol: 'E£', rateToGHS: 0.33, region: 'Africa', name: 'Egyptian Pound' },
  USD: { code: 'USD', symbol: '$', rateToGHS: 16.00, region: 'Americas', name: 'US Dollar' },
  CAD: { code: 'CAD', symbol: 'C$', rateToGHS: 11.60, region: 'Americas', name: 'Canadian Dollar' },
  GBP: { code: 'GBP', symbol: '£', rateToGHS: 20.20, region: 'Europe', name: 'British Pound' },
  EUR: { code: 'EUR', symbol: '€', rateToGHS: 17.30, region: 'Europe', name: 'Euro' },
  INR: { code: 'INR', symbol: '₹', rateToGHS: 0.19, region: 'Asia', name: 'Indian Rupee' },
  AED: { code: 'AED', symbol: 'AED', rateToGHS: 4.35, region: 'Asia', name: 'UAE Dirham' },
  CNY: { code: 'CNY', symbol: '¥', rateToGHS: 2.22, region: 'Asia', name: 'Chinese Yuan' },
  JPY: { code: 'JPY', symbol: '¥', rateToGHS: 0.105, region: 'Asia', name: 'Japanese Yen' },
  SGD: { code: 'SGD', symbol: 'S$', rateToGHS: 11.90, region: 'Asia', name: 'Singapore Dollar' },
  MYR: { code: 'MYR', symbol: 'RM', rateToGHS: 3.60, region: 'Asia', name: 'Malaysian Ringgit' },
  PHP: { code: 'PHP', symbol: '₱', rateToGHS: 0.28, region: 'Asia', name: 'Philippine Peso' },
};

// ============================================================================
// MARKETPLACE PRODUCTS (OWNED BY MOSES)
// ============================================================================
export interface MarketplaceProduct {
  id: string;
  shortCode: string;
  title: string;
  creator: string;
  category: string;
  badges: string[];
  rating: number;
  epc: string;
  conversionRate: string;
  epcUSD: number;
  avgConvRate: string;
  refundRate: string;
  priceUSD: number;
  priceGHS: number;
  commissionPercent: number;
  externalSalesPageUrl?: string;
  deliveryUrl: string;
  headline: string;
  subheadline: string;
  bullets: string[];
  swipeCopy: {
    tiktok: string[];
    whatsapp: string[];
  };
}

const INITIAL_PRODUCTS: MarketplaceProduct[] = [
  {
    id: 'prod_faceless_ai',
    shortCode: 'FACELESS-AI',
    title: 'The AI Faceless Video Engine',
    creator: 'Moses',
    category: 'AI & Tech',
    badges: ['TOP PICK', 'HIGH CONVERTING', 'SALE'],
    rating: 4.9,
    epc: '$1.45',
    conversionRate: '6.8%',
    epcUSD: 1.45,
    avgConvRate: '6.8%',
    refundRate: '0.2%',
    priceUSD: 15.00,
    priceGHS: 240.00,
    commissionPercent: 50,
    externalSalesPageUrl: 'https://ai-faceless-video-engine-access-por.vercel.app',
    deliveryUrl: 'https://drive.google.com/drive/folders/1IhgiK8DYCM8d-a82uImfds_gS4s06D8wvs7WypmFbjE',
    headline: 'Build, Automate & Monetize High-Retention Faceless Channels Using Free AI',
    subheadline: 'The exact workflow by Moses to generate viral scripts, realistic voiceovers, and dynamic edits in under 20 minutes per video.',
    bullets: [
      '100% Free AI Tool Stack — zero monthly software subscriptions required',
      'Copy-paste viral hook & script engineering prompts for TikTok, Reels & Shorts',
      'Step-by-step monetization blueprint for creators & affiliate marketers',
      'Includes instant access to EarnMega Affiliate Command Centre'
    ],
    swipeCopy: {
      tiktok: [
        'How creators are generating automated income with faceless AI videos in 90 seconds without filming themselves. Link in bio! #aivideo #earnmega',
        'Stop spending 6 hours editing videos. The AI Faceless Video Engine by Moses builds high-retention clips on autopilot!'
      ],
      whatsapp: [
        'Hey! I just got access to The AI Faceless Video Engine by Moses. It shows you how to run profitable faceless TikTok & YouTube channels with AI. Check out the official page here: {LINK}',
        'Want to monetize short-form video without showing your face on camera? Grab The AI Faceless Video Engine by Moses here: {LINK}'
      ]
    }
  },
  {
    id: 'prod_mmm_system',
    shortCode: 'MMM-ENGINE',
    title: 'The Mega Messaging Machine (MMM)',
    creator: 'Moses',
    category: 'Sales',
    badges: ['TOP PICK', 'HIGH CONVERTING'],
    rating: 4.9,
    epc: '$1.38',
    conversionRate: '6.4%',
    epcUSD: 1.38,
    avgConvRate: '6.4%',
    refundRate: '0.3%',
    priceUSD: 15.00,
    priceGHS: 240.00,
    commissionPercent: 50,
    externalSalesPageUrl: 'https://ai-faceless-video-engine-access-por.vercel.app',
    deliveryUrl: 'https://drive.google.com/drive/folders/1o7KrzMponCFxIHvCtvJtr1liyAfC-X3qKDkWrFzPWws',
    headline: 'Turn Every WhatsApp & Social DM Into Predictable Daily Cashflow',
    subheadline: 'High-converting WhatsApp, Instagram, and DM closing scripts engineered by Moses to turn cold prospects into instant buyers.',
    bullets: [
      '45+ copy-paste objection-crushing scripts for WhatsApp & Instagram DMs',
      '24-hour status storytelling sequences that trigger daily inbound enquiries',
      'Follow-up cadence templates that recover 80% of ghosted prospects',
      'Includes full EarnMega Affiliate Marketplace access'
    ],
    swipeCopy: {
      tiktok: [
        'Why prospects ghost you after asking "How much?" and the exact WhatsApp script that closes 8 out of 10 leads! #whatsappbusiness #earnmega',
        'Turn your WhatsApp DMs into an automated cash machine with The Mega Messaging Machine by Moses!'
      ],
      whatsapp: [
        'Tired of people asking for prices and disappearing? The Mega Messaging Machine (MMM) by Moses fixes your DM conversions immediately: {LINK}',
        'Copy-paste these exact WhatsApp closing scripts to double your daily sales: {LINK}'
      ]
    }
  },
  {
    id: 'prod_day_trading',
    shortCode: 'TRADING-ROADMAP',
    title: "Day Trading Beginner's Roadmap",
    creator: 'Moses',
    category: 'Trading & Finance',
    badges: ['HIGH CONVERTING', 'SALE'],
    rating: 4.8,
    epc: '$1.15',
    conversionRate: '5.9%',
    epcUSD: 1.15,
    avgConvRate: '5.9%',
    refundRate: '0.4%',
    priceUSD: 12.00,
    priceGHS: 192.00,
    commissionPercent: 50,
    deliveryUrl: 'https://drive.google.com/drive/folders/1zbDb8kAk-0Tf_SVX2vQUiUDm6NrW_LN33dOv7mLdqzA',
    headline: 'Master Institutional Chart Structure, Risk Management & Sniper Entries From Scratch',
    subheadline: 'Stop blowing trading accounts. Learn the exact technical checklist, lot-size math, and execution discipline taught by Moses.',
    bullets: [
      'Candlestick anatomy, liquidity sweeps, and market structure decoded',
      'Strict 1%–2% risk calculator & stop-loss placement rules',
      'High-probability London & New York session entry checklist',
      'Includes full EarnMega Affiliate Portal access'
    ],
    swipeCopy: {
      tiktok: [
        "Stop blowing trading accounts because of emotional entries. Here is the Day Trading Beginner's Roadmap every new trader needs! #daytrading #earnmega",
        'Master chart structure and sniper risk management from scratch. Link in bio!'
      ],
      whatsapp: [
        "If you want to learn day trading the right way without gambling your capital, study Moses's Day Trading Beginner's Roadmap: {LINK}",
        'Learn institutional chart reading, stop-loss discipline, and daily trade setups here: {LINK}'
      ]
    }
  },
  {
    id: 'prod_snapsell',
    shortCode: 'SNAPSELL-PRO',
    title: 'SnapSell: Rapid Digital Product Blueprint',
    creator: 'Moses',
    category: 'Sales',
    badges: ['TOP PICK', 'HIGH CONVERTING'],
    rating: 4.9,
    epc: '$1.62',
    conversionRate: '7.1%',
    epcUSD: 1.62,
    avgConvRate: '7.1%',
    refundRate: '0.2%',
    priceUSD: 18.00,
    priceGHS: 288.00,
    commissionPercent: 50,
    deliveryUrl: 'https://drive.google.com/drive/folders/1IhgiK8DYCM8d-a82uImfds_gS4s06D8wvs7WypmFbjE',
    headline: 'Package, Price & Launch High-Margin Digital Products In Under 48 Hours',
    subheadline: 'The complete creator blueprint by Moses for turning skills into digital courses, ebooks, and templates that sell 24/7.',
    bullets: [
      '48-hour product creation framework using AI research & design templates',
      'High-converting sales page wireframes and pricing psychology',
      'Automated delivery & affiliate army recruitment blueprint',
      'Includes full EarnMega Affiliate Portal access'
    ],
    swipeCopy: {
      tiktok: [
        'Create once, sell 1,000 times. How to package your knowledge into a digital product in 48 hours using SnapSell! #snapsell #earnmega',
        'The fastest way to launch a digital asset that pays you daily in Cedis and Dollars!'
      ],
      whatsapp: [
        'Want to launch your own digital product and keep 100% of the profit? Check out SnapSell by Moses here: {LINK}',
        'How to build and automate a digital product funnel this weekend: {LINK}'
      ]
    }
  },
  {
    id: 'prod_status_cash',
    shortCode: 'WA-STATUS-CASH',
    title: 'WhatsApp Status Cash Machine',
    creator: 'Moses',
    category: 'Sales',
    badges: ['HIGH CONVERTING', 'SALE'],
    rating: 4.7,
    epc: '$0.98',
    conversionRate: '8.2%',
    epcUSD: 0.98,
    avgConvRate: '8.2%',
    refundRate: '0.1%',
    priceUSD: 10.00,
    priceGHS: 160.00,
    commissionPercent: 50,
    deliveryUrl: 'https://drive.google.com/drive/folders/1o7KrzMponCFxIHvCtvJtr1liyAfC-X3qKDkWrFzPWws',
    headline: 'Convert Your Silent WhatsApp Status Viewers Into Paying Buyers Every Single Day',
    subheadline: 'Plug-and-play 3-slide status hooks, scarcity timers, and social proof triggers designed by Moses for mobile buyers.',
    bullets: [
      '30 days of done-for-you WhatsApp Status story sequences',
      'How to grow your WhatsApp contact list by 50–200 targeted leads/week',
      'Broadcast list segmentation without getting your number banned',
      'Includes full EarnMega Affiliate Portal access'
    ],
    swipeCopy: {
      tiktok: [
        'Your WhatsApp status views are worth real money if you post this 3-slide sequence! #whatsappstatus #earnmega',
        'Stop posting memes on your status. Post this 24-hour sequence instead and watch orders roll in!'
      ],
      whatsapp: [
        'Turn your WhatsApp status viewers into paying customers every day with the WhatsApp Status Cash Machine by Moses: {LINK}',
        'Here is how top affiliates turn 100 status views into daily commissions: {LINK}'
      ]
    }
  },
  {
    id: 'prod_ai_agency',
    shortCode: 'AI-DOLLAR-AGENCY',
    title: 'AI Freelancing & Remote Dollar Agency Blueprint',
    creator: 'Moses',
    category: 'AI & Tech',
    badges: ['TOP PICK', 'HIGH CONVERTING'],
    rating: 4.9,
    epc: '$1.85',
    conversionRate: '6.2%',
    epcUSD: 1.85,
    avgConvRate: '6.2%',
    refundRate: '0.3%',
    priceUSD: 20.00,
    priceGHS: 320.00,
    commissionPercent: 50,
    deliveryUrl: 'https://drive.google.com/drive/folders/1IhgiK8DYCM8d-a82uImfds_gS4s06D8wvs7WypmFbjE',
    headline: 'Land Foreign Retainer Clients Paying In USD Using Automated AI Fulfillment',
    subheadline: 'Acquire international clients in the US, UK & UAE and fulfill copywriting, funnel, and video deliverables in minutes with AI.',
    bullets: [
      'Cold outreach scripts for LinkedIn, Upwork, and Instagram that book calls',
      'AI service fulfillment workflows (deliver $500 projects in 45 minutes)',
      'International payment setup guide for receiving USD/EUR in Africa & Asia',
      'Includes full EarnMega Affiliate Portal access'
    ],
    swipeCopy: {
      tiktok: [
        'Live anywhere, earn in US Dollars using AI fulfillment systems. Full Remote Dollar Agency Blueprint in bio! #remotework #earnmega',
        'How to land $500/month foreign retainer clients without coding!'
      ],
      whatsapp: [
        'Ready to earn in USD from home using AI tools to fulfill client work? Check out the AI Remote Dollar Agency Blueprint by Moses: {LINK}',
        'Step-by-step client acquisition and AI service delivery system: {LINK}'
      ]
    }
  }
];

// ============================================================================
// 5-STEP RIGOROUS EXAMINATION BANK (50 QUESTIONS — UPDATED FOR EARNMEGA & MOSES)
// ============================================================================
interface ExamQuestion {
  q: string;
  options: string[];
  correctIndex: number;
}

const FIVE_STEP_EXAM_BANK: Record<number, { title: string; subtitle: string; questions: ExamQuestion[] }> = {
  1: {
    title: 'Step 1: Affiliate Tracking & Attribution Mastery',
    subtitle: 'Score 90% or higher (at least 9/10) to unlock Step 2.',
    questions: [
      { q: 'How does EarnMega identify which affiliate referred a paying customer?', options: ['By guessing from social media', 'Via the affiliate’s unique product tracking link (?prod=...&ref=EM-XXXX)', 'By asking the customer a week later', 'Everyone shares the same link'], correctIndex: 1 },
      { q: 'When is an affiliate commission officially credited to your EarnMega Available Balance?', options: ['When someone clicks the link only', 'When someone views a WhatsApp status', 'Immediately upon verified Paystack purchase completion', 'Before the customer pays'], correctIndex: 2 },
      { q: 'What is the standard affiliate commission rate across EarnMega core digital products?', options: ['10%', '25%', '50%', '5%'], correctIndex: 2 },
      { q: 'Who is the official creator of the 6 core launch products in the EarnMega Marketplace?', options: ['Moses', 'Anonymous Vendor', 'External Broker', 'Random User'], correctIndex: 0 },
      { q: 'If a buyer purchases a product through your unique affiliate link, what do they receive?', options: ['Only the affiliate dashboard', 'Both the Digital Product access AND unlocked EarnMega Affiliate access', 'Nothing until next month', 'Only a receipt'], correctIndex: 1 },
      { q: 'If a user pays the GH₵ 90 direct registration fee without buying a product through an affiliate product link, what do they unlock?', options: ['All 6 products for free', 'The EarnMega Affiliate Portal only (no product included)', 'Only social chat', 'A physical book'], correctIndex: 1 },
      { q: 'Why must every product have a unique affiliate link per promoter?', options: ['So the system attributes the exact product price, 50% commission, and buyer ID to the right affiliate', 'Just for decoration', 'To slow down checkout', 'It is not needed'], correctIndex: 0 },
      { q: 'What buyer details are recorded in your EarnMega Sales Ledger when a sale completes?', options: ['Nothing at all', 'Unique Order/Paystack Ref, Buyer Name, Buyer Gmail, Product Title, and 50% Commission', 'Only the country', 'Only the time of day'], correctIndex: 1 },
      { q: 'How long is an initial EarnMega Affiliate annual license valid before the GH₵ 45 renewal?', options: ['7 days', '365 days (1 full year)', '1 hour', '30 minutes'], correctIndex: 1 },
      { q: 'In what settlement currency does EarnMega process Paystack checkouts and Friday payouts?', options: ['Japanese Yen', 'Ghana Cedis (GH₵)', 'Bitcoin only', 'Peso'], correctIndex: 1 },
    ]
  },
  2: {
    title: 'Step 2: Short-Form Viral Traffic & Hook Engineering',
    subtitle: 'Score 90% or higher (at least 9/10) to unlock Step 3.',
    questions: [
      { q: 'What is the primary goal of the first 3 seconds of a TikTok or Reels promotional video?', options: ['Show a long logo intro', 'Stop the scroll with a pattern-interrupt hook addressing a specific pain point or desire', 'Ask people to log off', 'Play silent black screens'], correctIndex: 1 },
      { q: 'Where should you direct viewers at the end of a high-retention short-form video?', options: ['To your bio link / WhatsApp funnel containing your unique EarnMega tracking link', 'Nowhere', 'To a random search engine', 'Tell them not to buy'], correctIndex: 0 },
      { q: 'In The AI Faceless Video Engine workflow by Moses, what replaces filming yourself on camera?', options: ['Nothing', 'AI script generation, realistic AI voiceovers, and dynamic visual b-roll', 'Static text only', 'Radio broadcasts'], correctIndex: 1 },
      { q: 'Which metric most strongly signals the TikTok/Reels algorithm to push your video to 100k+ views?', options: ['Font color', 'High average watch time / completion rate and shares', 'Posting at 3:14 AM only', 'Using 100 hashtags'], correctIndex: 1 },
      { q: 'For the EarnMega 100K Views Video Contest, what is the cash prize for hitting 100,000+ verified views on TikTok or Instagram?', options: ['GH₵ 100', 'GH₵ 10,000 (convertible to your local currency)', 'GH₵ 500', 'No prize'], correctIndex: 1 },
      { q: 'Why should you add Sub-IDs (like ?sub=tiktok_bio) to your affiliate links?', options: ['To track which specific video or traffic channel is generating your sales', 'To break the link', 'To hide your code', 'To change the product price'], correctIndex: 0 },
      { q: 'What is the ideal structure of a 15-second faceless conversion reel?', options: ['Hook (0-3s) -> Agitate Problem & Show Proof (3-11s) -> Clear Call-To-Action (11-15s)', 'Credits first -> Silence -> End', 'Only hashtags', '15 seconds of intro music'], correctIndex: 0 },
      { q: 'How often should an active affiliate test new short-form hooks for their chosen product?', options: ['Once a year', 'Consistent daily testing (1–3 short videos per day)', 'Never', 'Once every 6 months'], correctIndex: 1 },
      { q: 'What tool inside EarnMega gives you ready-made TikTok and WhatsApp promotional copy?', options: ['The Swipe Vault & AI Funnel Tools', 'The Logout button', 'The Password tab', 'None'], correctIndex: 0 },
      { q: 'When promoting on TikTok, why is routing traffic to a WhatsApp Auto-Closer link or Bio-Link effective?', options: ['It warms up cold viewers and lets you answer objections on WhatsApp before they pay on Paystack', 'It blocks buyers', 'It deletes cookies', 'It hides the checkout'], correctIndex: 0 },
    ]
  },
  3: {
    title: 'Step 3: WhatsApp Status & DM Conversion Funnel (MMM)',
    subtitle: 'Score 90% or higher (at least 9/10) to unlock Step 4.',
    questions: [
      { q: 'What is the 3-step WhatsApp Status conversion sequence taught in EarnMega?', options: ['Slide 1: Pain/Hook -> Slide 2: Value/Social Proof -> Slide 3: Scarcity + Unique Affiliate Link', 'Post 50 random memes', 'Post only good morning images', 'Never post links'], correctIndex: 0 },
      { q: 'When a prospect asks "How much is it?" in your DM, what mistake causes them to ghost?', options: ['Replying with just a bare price number without framing the value and transformation first', 'Being polite', 'Sending your affiliate link when they are ready', 'Using voice notes'], correctIndex: 0 },
      { q: 'How does the EarnMega Abandoned Checkout Lead CRM help you close more sales?', options: ['It shows you buyers who filled Step 1 of checkout so you can message them on WhatsApp to complete payment', 'It deletes their email', 'It blocks their phone number', 'It hides their name'], correctIndex: 0 },
      { q: 'What is a "1-Click Order Bump" recommendation from the EarnMega AI Business Brain?', options: ['Pairing your core offer with a complementary add-on at checkout + WhatsApp sync to boost order value', 'Closing the store', 'Removing the buy button', 'Lowering commission to 0%'], correctIndex: 0 },
      { q: 'When following up with a warm WhatsApp lead after 24 hours, what works best?', options: ['Sending angry messages', 'Sharing a fresh student result/testimonial and asking if they had any questions about getting started', 'Blocking them immediately', 'Spamming 30 links in 1 minute'], correctIndex: 1 },
      { q: 'Why should you save every new WhatsApp lead’s contact and have them save yours?', options: ['So they can view your daily 24-hour WhatsApp Status sequences where 80% of conversions happen', 'No reason', 'To fill phone storage', 'To stop them from buying'], correctIndex: 0 },
      { q: 'What does EPC stand for on the EarnMega Marketplace product cards?', options: ['Earnings Per Click (average commission earned per link click)', 'Extra Product Cost', 'Email Password Check', 'End Page Code'], correctIndex: 0 },
      { q: 'If a buyer in Nigeria, Kenya, or India opens your EarnMega checkout link, how do they see the price?', options: ['They can preview the price in their local currency using the Worldwide Converter while Paystack settles in GH₵', 'They cannot see any price', 'Only in Japanese Yen', 'The page crashes'], correctIndex: 0 },
      { q: 'What should a buyer ensure when typing their Email Address on Step 1 of checkout?', options: ['Use a fake email', 'Ensure their Email Address is CORRECT, ACTIVE, and ACCESSIBLE to receive instant access', 'Leave it blank', 'Type a phone number instead'], correctIndex: 1 },
      { q: 'How can you use the EarnMega Social Proof Flyer Generator to boost WhatsApp sales?', options: ['Generate a verified commission status card and post it on your status to build credibility', 'Keep it hidden', 'Delete it', 'Send it to competitors only'], correctIndex: 0 },
    ]
  },
  4: {
    title: 'Step 4: Financial Risk, Pricing & Payout Governance',
    subtitle: 'Score 90% or higher (at least 9/10) to unlock Step 5.',
    questions: [
      { q: 'On which day of the week does the EarnMega Affiliate Payout window open for withdrawals?', options: ['Every Monday', 'Strictly on Fridays (GMT)', 'Only on New Year’s Day', 'Every Tuesday'], correctIndex: 1 },
      { q: 'What payout channels are supported for Friday withdrawals in EarnMega?', options: ['Mobile Money (MTN, Telecel, AT), Bank Transfer, and USDT (TRC20)', 'Cash in envelope only', 'Gift cards only', 'Checks by mail'], correctIndex: 0 },
      { q: 'When you submit a Friday payout request, where is the payout ticket dispatched for OTP-verified Paystack Transfer?', options: ['Nowhere', 'Directly to earnmegadesk@gmail.com and the Admin Command Centre', 'To random users', 'To social media'], correctIndex: 1 },
      { q: 'In the Day Trading Beginner’s Roadmap by Moses, what is the golden rule of capital preservation per trade?', options: ['Risk 100% of your account on one trade', 'Risk only a small fixed percentage (1%–2%) with a hard stop-loss', 'Never use a stop-loss', 'Revenge trade after a loss'], correctIndex: 1 },
      { q: 'Why must your Account Holder Name in the Payout Center match your registered Mobile Money or Bank name?', options: ['To pass Paystack Transfer verification and prevent failed/rejected payouts', 'It does not matter', 'So the font looks nice', 'To delay payment'], correctIndex: 0 },
      { q: 'If a product sells for GH₵ 240 with a 50% commission rate, how much is credited to your balance per sale?', options: ['GH₵ 24.00', 'GH₵ 120.00', 'GH₵ 240.00', 'GH₵ 50.00'], correctIndex: 1 },
      { q: 'How many sales of a GH₵ 240 product (GH₵ 120 commission) do you need to earn GH₵ 1,200 in commissions?', options: ['100 sales', '10 sales', '2 sales', '50 sales'], correctIndex: 1 },
      { q: 'Can two different affiliates receive commission from the exact same single transaction?', options: ['Yes, everyone gets paid', 'No, the sale is attributed strictly to the referring affiliate code locked at checkout', 'Up to 10 affiliates', 'Only if they ask'], correctIndex: 1 },
      { q: 'What happens if someone clicks your affiliate link 50 times but never completes payment?', options: ['You earn GH₵ 500', 'Your commission is GH₵ 0.00 because only completed purchases generate commission', 'You get a bonus', 'The product becomes free'], correctIndex: 1 },
      { q: 'What happens if a transaction is fraudulent or refunded under platform compliance rules?', options: ['Refunds and chargebacks can void or claw back unverified commissions', 'Nothing', 'Commission doubles', 'Account gets 10x bonus'], correctIndex: 0 },
    ]
  },
  5: {
    title: 'Step 5: Creator Whitelist, Compliance & Scaling Certification',
    subtitle: 'Score 90% or higher (at least 9/10) to unlock your Official Certificate!',
    questions: [
      { q: 'How does a digital product creator apply to list their own course on the EarnMega Vendor Marketplace?', options: ['Anyone can upload spam without review', 'Via the Creator Whitelist Portal by sending product details, sales page & commission split to earnmegadesk@gmail.com for QA approval', 'By posting in comments', 'Not allowed'], correctIndex: 1 },
      { q: 'What happens after your Creator/Vendor product application is reviewed and approved by EarnMega QA?', options: ['You receive a congratulations message and vendor listing fee instructions to unlock your Creator Desk', 'Nothing happens', 'Your account closes', 'It is deleted'], correctIndex: 0 },
      { q: 'What are the official EarnMega Affiliate Support channels if you need help with a sale or payout?', options: ['earnmegadesk@gmail.com and WhatsApp 0596096071', 'No support exists', 'Only physical mail', 'Fax machine'], correctIndex: 0 },
      { q: 'When your sales counter reaches a Contest Milestone (e.g. 50/50 sales), what unlocks on your Contest card?', options: ['An instant "Alert Admin Command Centre & Claim Reward" button', 'The screen turns off', 'Your sales reset to zero', 'Nothing'], correctIndex: 0 },
      { q: 'What is strictly prohibited under EarnMega Official Rules & Regulations?', options: ['Promoting with honest swipe copy', 'False income guarantees, spam links, or sharing account passwords', 'Using the Profit Calculator', 'Sharing QR codes'], correctIndex: 1 },
      { q: 'How does the EarnMega Bio-Link / LinkHub help you promote multiple products at once?', options: ['It creates a single personal storefront URL displaying all 6 products with your affiliate code attached', 'It deletes your links', 'It only works offline', 'It blocks mobile users'], correctIndex: 0 },
      { q: 'Where can you update your First Name, Last Name, Phone Number, Address, and KYC ID?', options: ['Inside the Profile & Details / Account Information (KYC) modal from the top-right Profile button', 'You can never change it', 'Only by creating a new Gmail', 'Nowhere'], correctIndex: 0 },
      { q: 'Before claiming the GH₵ 10,000 TikTok/Instagram 100K Views Prize, what details must you submit in the Contest Portal?', options: ['Only your first name', 'Your TikTok/IG handle, public video link showing 100k+ views, full name, phone, and Bank/MoMo payout details', 'A screenshot of someone else’s account', 'Nothing'], correctIndex: 1 },
      { q: 'Why is combining Short-Form Video (TikTok/Reels) + WhatsApp Closing the highest-converting affiliate strategy?', options: ['Short-form video brings free daily traffic while WhatsApp Status & DMs build trust and close the sale', 'Because it requires $10,000 in ad spend', 'It is not effective', 'Only works in one city'], correctIndex: 0 },
      { q: 'Upon passing all 5 steps of this examination with 90%+ accuracy, what do you earn?', options: ['An Official Personalized EarnMega Certificate of Completion signed by Moses with a unique verification ID', 'Nothing', 'A penalty', 'Account suspension'], correctIndex: 0 },
    ]
  }
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function EarnMegaExecutiveHub() {
  type ActiveSection =
    | 'dashboard'
    | 'marketplace'
    | 'links'
    | 'vault'
    | 'exam'
    | 'contests'
    | 'payouts'
    | 'ledger'
    | 'leads_crm'
    | 'calculator'
    | 'ai_tools'
    | 'my_courses'
    | 'creator'
    | 'rules'
    | 'support';

  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('GHS');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState<boolean>(false);
  const [activeSettingsModal, setActiveSettingsModal] = useState<
    null | 'profile' | 'kyc' | 'security' | '2fa' | 'support'
  >(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isAiBotOpen, setIsAiBotOpen] = useState<boolean>(false);

  // User Profile State
  const [userAffiliateCode, setUserAffiliateCode] = useState<string>('EM-77X9Q');
  const [firstName, setFirstName] = useState<string>('Moses');
  const [lastName, setLastName] = useState<string>('Executive');
  const [userEmail, setUserEmail] = useState<string>('earnmegadesk@gmail.com');
  const [userPhone, setUserPhone] = useState<string>('0596096071');
  const [userCountry, setUserCountry] = useState<string>('Ghana');
  const [userCity, setUserCity] = useState<string>('Accra');
  const [userAddress, setUserAddress] = useState<string>('East Legon');
  const [kycIdType, setKycIdType] = useState<string>('Ghana Card / National ID');
  const [kycIdNumber, setKycIdNumber] = useState<string>('GHA-728194821-9');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(true);
  const [settingsSavedBanner, setSettingsSavedBanner] = useState<string | null>(null);
  const [downloadSuccessBanner, setDownloadSuccessBanner] = useState<string | null>(null);

  // Financial & Sales State
  const [availableBalanceGHS, setAvailableBalanceGHS] = useState<number>(1440.00);
  const [totalEarningsGHS, setTotalEarningsGHS] = useState<number>(3600.00);
  const [withdrawnBalanceGHS, setWithdrawnBalanceGHS] = useState<number>(2160.00);
  const [totalSalesCount, setTotalSalesCount] = useState<number>(30);
  const [unlockedProductIds, setUnlockedProductIds] = useState<string[]>(['prod_faceless_ai']);
  const [totalClicksCount, setTotalClicksCount] = useState<number>(412);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Deposit Modal State
  const [isDepositModalOpen, setIsDepositModalOpen] = useState<boolean>(false);
  const [depositAmountGHS, setDepositAmountGHS] = useState<string>('');
  const [depositMethod, setDepositMethod] = useState<string>('MOBILE_MONEY');
  const [depositVerifyCode, setDepositVerifyCode] = useState<string>('');
  const [depositStep, setDepositStep] = useState<number>(1);
  const [isGeneratingCode, setIsGeneratingCode] = useState<boolean>(false);

  // 1-Year License Timer State
  const [licenseActivatedAt, setLicenseActivatedAt] = useState<number>(Date.now());
  const [licenseExpiresAt, setLicenseExpiresAt] = useState<number>(Date.now() + 365 * 24 * 60 * 60 * 1000);
  const [timeRemaining, setTimeRemaining] = useState({ days: 365, hours: 0, minutes: 0, seconds: 0, expired: false });
  const [isRenewalModalOpen, setIsRenewalModalOpen] = useState<boolean>(false);

  // Marketplace Search, Filter & Modals
  const [products] = useState<MarketplaceProduct[]>(INITIAL_PRODUCTS);
  const [linkTags, setLinkTags] = useState<Record<string, string>>({});
  const [marketSearch, setMarketSearch] = useState<string>('');
  const [marketFilter, setMarketFilter] = useState<string>('All Offers');
  const [promoteModalProduct, setPromoteModalProduct] = useState<MarketplaceProduct | null>(null);

  // Buyer Sales Page & 2-Step Checkout State
  const [activeSalesPageProduct, setActiveSalesPageProduct] = useState<MarketplaceProduct | null>(null);
  const [isDirectEnrollmentCheckout, setIsDirectEnrollmentCheckout] = useState<boolean>(false);
  const [referredByCode, setReferredByCode] = useState<string>('EM-77X9Q');
  const [checkoutStep, setCheckoutStep] = useState<null | 1 | 2>(null);
  const [buyerFullName, setBuyerFullName] = useState<string>('');
  const [buyerCountry, setBuyerCountry] = useState<string>('Ghana');
  const [buyerDialCode, setBuyerDialCode] = useState<string>('+233');
  const [buyerPhone, setBuyerPhone] = useState<string>('');
  const [buyerEmail, setBuyerEmail] = useState<string>('');
  const [includeOrderBump, setIncludeOrderBump] = useState<boolean>(false);

  // Transactions, Notifications & Abandoned Leads CRM
  const [transactions, setTransactions] = useState<
    Array<{
      id: string;
      orderUid: string;
      reference: string;
      productTitle: string;
      amountGHS: number;
      commissionGHS: number;
      buyerName: string;
      buyerEmail: string;
      buyerPhone: string;
      date: string;
      status: string;
    }>
  >([
    {
      id: 'tx-101',
      orderUid: 'ORD-984120',
      reference: 'EM_REF_984120',
      productTitle: 'The AI Faceless Video Engine',
      amountGHS: 240,
      commissionGHS: 120,
      buyerName: 'Kofi Mensah',
      buyerEmail: 'kofimensah@gmail.com',
      buyerPhone: '+233540001122',
      date: '2026-11-11 14:22',
      status: 'COMPLETED'
    },
    {
      id: 'tx-102',
      orderUid: 'ORD-882319',
      reference: 'EM_REF_882319',
      productTitle: 'The Mega Messaging Machine (MMM)',
      amountGHS: 240,
      commissionGHS: 120,
      buyerName: 'Ama Osei',
      buyerEmail: 'amaosei@gmail.com',
      buyerPhone: '+233249998877',
      date: '2026-11-10 19:05',
      status: 'COMPLETED'
    }
  ]);

  const [notificationsList, setNotificationsList] = useState<
    Array<{
      id: string;
      title: string;
      subtitle: string;
      amountGHS: number;
      timeAgo: string;
      read: boolean;
    }>
  >([
    {
      id: 'notif-1',
      title: 'Welcome to EarnMega Executive Hub',
      subtitle: 'Your unique affiliate links & 50% instant commission tracking by Moses are active.',
      amountGHS: 120,
      timeAgo: 'Just now',
      read: false
    }
  ]);

  const [abandonedLeads, setAbandonedLeads] = useState<
    Array<{
      id: string;
      fullName: string;
      email: string;
      phone: string;
      country: string;
      productTitle: string;
      amountGHS: number;
      createdAt: string;
    }>
  >([
    {
      id: 'lead-1',
      fullName: 'Daniel Owusu',
      email: 'danielowusu@gmail.com',
      phone: '+233553219876',
      country: 'Ghana',
      productTitle: 'The AI Faceless Video Engine',
      amountGHS: 240,
      createdAt: '2026-11-11 16:40'
    }
  ]);

  // 5-Step Examination & Certificate State
  const [examProductId, setExamProductId] = useState<string>(INITIAL_PRODUCTS[0].id);
  const [currentExamStep, setCurrentExamStep] = useState<number>(1);
  const [unlockedExamStep, setUnlockedExamStep] = useState<number>(1);
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [examStepResult, setExamStepResult] = useState<{
    scorePercent: number;
    passed: boolean;
    correctCount: number;
    total: number;
  } | null>(null);
  const [certificateUnlocked, setCertificateUnlocked] = useState<boolean>(false);
  const [certificateStudentName, setCertificateStudentName] = useState<string>('Moses Executive');
  const [certificateCode, setCertificateCode] = useState<string>('EM-CERT-908421');

  // Contests State
  const [registeredContests, setRegisteredContests] = useState<string[]>([]);
  const [contestModalOpen, setContestModalOpen] = useState<null | 'viral_100k' | 'sales_50' | 'sales_100'>(null);
  const [contestFullName, setContestFullName] = useState<string>('');
  const [contestPhone, setContestPhone] = useState<string>('');
  const [contestSocialHandle, setContestSocialHandle] = useState<string>('');
  const [contestVideoUrl, setContestVideoUrl] = useState<string>('');
  const [contestBankMomoDetails, setContestBankMomoDetails] = useState<string>('');
  const [contestStatusBanner, setContestStatusBanner] = useState<string | null>(null);
  const [adminMilestoneAlertSent, setAdminMilestoneAlertSent] = useState<boolean>(false);

  // Friday Payout State
  const [payoutChannel, setPayoutChannel] = useState<'MOBILE_MONEY' | 'BANK_TRANSFER' | 'CRYPTO_USDT'>('MOBILE_MONEY');
  const [accountHolderName, setAccountHolderName] = useState<string>('');
  const [momoNetwork, setMomoNetwork] = useState<string>('MTN MoMo');
  const [momoNumber, setMomoNumber] = useState<string>('');
  const [bankName, setBankName] = useState<string>('GCB Bank');
  const [bankAccount, setBankAccount] = useState<string>('');
  const [usdtAddress, setUsdtAddress] = useState<string>('');
  const [payoutAmountGHS, setPayoutAmountGHS] = useState<string>('');
  const [payoutFeedback, setPayoutFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmittingPayout, setIsSubmittingPayout] = useState<boolean>(false);

  // Creator Whitelist State
  const [vendorTitle, setVendorTitle] = useState<string>('');
  const [vendorPrice, setVendorPrice] = useState<string>('240');
  const [vendorSalesUrl, setVendorSalesUrl] = useState<string>('');
  const [vendorDesc, setVendorDesc] = useState<string>('');
  const [vendorFeedback, setVendorFeedback] = useState<string | null>(null);

  // Profit Calculator State
  const [calcProductId, setCalcProductId] = useState<string>(INITIAL_PRODUCTS[0].id);
  const [calcDailySales, setCalcDailySales] = useState<number>(3);

  // AI Bot & Funnel Generators State
  const [aiInput, setAiInput] = useState<string>('');
  const [aiMessages, setAiMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: "Hello! 👋 I'm your EarnMega AI Business Brain. I understand Moses's 6 digital products, your 50% commission engine, and WhatsApp closing funnels. Ask me anything!"
    }
  ]);
  const [waCloserNumber, setWaCloserNumber] = useState<string>(SUPPORT_WHATSAPP_INTL);
  const [waCloserProduct, setWaCloserProduct] = useState<string>(INITIAL_PRODUCTS[0].id);
  const [showBioLinkPreview, setShowBioLinkPreview] = useState<boolean>(false);

  // ============================================================================
  // URL PARAMS & LOCALSTORAGE INITIALIZATION
  // ============================================================================
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const prodParam = params.get('prod');
      const refParam = params.get('ref');
      const storeParam = params.get('store');

      if (refParam) {
        localStorage.setItem('earnmega_affiliate_ref', refParam);
        setReferredByCode(refParam);
      } else {
        const savedRef = localStorage.getItem('earnmega_affiliate_ref');
        if (savedRef) setReferredByCode(savedRef);
      }

      if (prodParam) {
        const matched = INITIAL_PRODUCTS.find(
          (p) => p.id === prodParam || p.shortCode.toLowerCase() === prodParam.toLowerCase()
        );
        if (matched) setActiveSalesPageProduct(matched);
      }

      if (storeParam) {
        setShowBioLinkPreview(true);
      }

      try {
        const saved = localStorage.getItem('earnmega_exec_state_v1');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.availableBalanceGHS !== undefined) setAvailableBalanceGHS(parsed.availableBalanceGHS);
          if (parsed.totalEarningsGHS !== undefined) setTotalEarningsGHS(parsed.totalEarningsGHS);
          if (parsed.withdrawnBalanceGHS !== undefined) setWithdrawnBalanceGHS(parsed.withdrawnBalanceGHS);
          if (parsed.totalSalesCount !== undefined) setTotalSalesCount(parsed.totalSalesCount);
          if (parsed.transactions) setTransactions(parsed.transactions);
          if (parsed.abandonedLeads) setAbandonedLeads(parsed.abandonedLeads);
        }
      } catch (_) {}
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        'earnmega_exec_state_v1',
        JSON.stringify({
          availableBalanceGHS,
          totalEarningsGHS,
          withdrawnBalanceGHS,
          totalSalesCount,
          transactions,
          abandonedLeads
        })
      );
    } catch (_) {}
  }, [availableBalanceGHS, totalEarningsGHS, withdrawnBalanceGHS, totalSalesCount, transactions, abandonedLeads]);

  // 1-Year License Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      const remainingMs = licenseExpiresAt - Date.now();
      if (remainingMs <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
      } else {
        const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
        setTimeRemaining({ days, hours, minutes, seconds, expired: false });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [licenseExpiresAt]);

  // ============================================================================
  // HELPERS
  // ============================================================================
  const formatAmount = (amountGHS: number, currencyOverride?: string): string => {
    const code = currencyOverride || selectedCurrency;
    const rateObj = GLOBAL_CURRENCIES[code] || GLOBAL_CURRENCIES.GHS;
    const converted = amountGHS / rateObj.rateToGHS;
    return `${rateObj.symbol} ${converted.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const appOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://earnmega.vercel.app';

  const getUniqueProductAffiliateLink = (product: MarketplaceProduct, customSub?: string) => {
    const cleanCode = userAffiliateCode || 'EM-77X9Q';
    const uniqueToken = `${cleanCode}-${product.shortCode}`;
    const subParam = customSub ? `&sub=${encodeURIComponent(customSub)}` : '';
    return `${appOrigin}/?prod=${product.id}&ref=${cleanCode}&token=${uniqueToken}${subParam}`;
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  // ============================================================================
  // CHECKOUT & PAYSTACK HANDLERS
  // ============================================================================
  const openDigitstemCheckoutForProduct = (product: MarketplaceProduct) => {
    setIsDirectEnrollmentCheckout(false);
    setActiveSalesPageProduct(product);
    setCheckoutStep(1);
  };

  const handleCheckoutStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerFullName.trim() || !buyerPhone.trim() || !buyerEmail.trim()) {
      alert('Please complete your Full Name, Phone Number, and active Email Address.');
      return;
    }

    const targetTitle = isDirectEnrollmentCheckout
      ? 'EarnMega Direct Affiliate Access (No Product)'
      : activeSalesPageProduct?.title || 'EarnMega Digital Product';
    const targetAmountGHS = isDirectEnrollmentCheckout
      ? DIRECT_ENROLLMENT_GHS
      : (activeSalesPageProduct?.priceGHS || 240) + (includeOrderBump ? 80 : 0);

    const newLead = {
      id: `lead-${Date.now()}`,
      fullName: buyerFullName,
      email: buyerEmail,
      phone: `${buyerDialCode}${buyerPhone.replace(/^0+/, '')}`,
      country: buyerCountry,
      productTitle: targetTitle,
      amountGHS: targetAmountGHS,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setAbandonedLeads((prev) => [newLead, ...prev]);
    setCheckoutStep(2);
  };

  const completeVerifiedPurchaseRecord = (reference: string) => {
    const isDirect = isDirectEnrollmentCheckout;
    const prod = activeSalesPageProduct || INITIAL_PRODUCTS[0];
    const baseGHS = isDirect ? DIRECT_ENROLLMENT_GHS : prod.priceGHS + (includeOrderBump ? 80 : 0);
    const commGHS = isDirect ? 0 : Number((baseGHS * (prod.commissionPercent / 100)).toFixed(2));
    const uniqueOrderUid = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const fullPhone = `${buyerDialCode}${buyerPhone.replace(/^0+/, '')}`;

    if (!isDirect) {
      const txItem = {
        id: `tx-${Date.now()}`,
        orderUid: uniqueOrderUid,
        reference,
        productTitle: prod.title,
        amountGHS: baseGHS,
        commissionGHS: commGHS,
        buyerName: buyerFullName,
        buyerEmail: buyerEmail,
        buyerPhone: fullPhone,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'COMPLETED'
      };
      setTransactions((prev) => [txItem, ...prev]);
      setAvailableBalanceGHS((prev) => prev + commGHS);
      setTotalEarningsGHS((prev) => prev + commGHS);
      setTotalSalesCount((prev) => prev + 1);
      if (!unlockedProductIds.includes(prod.id)) {
        setUnlockedProductIds((prev) => [...prev, prod.id]);
      }
      setNotificationsList((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: `50% Commission Credited: ${prod.title}`,
          subtitle: `Buyer: ${buyerFullName} (${buyerEmail}) • Order ID: ${uniqueOrderUid}`,
          amountGHS: commGHS,
          timeAgo: 'Just now',
          read: false
        },
        ...prev
      ]);
    }

    setCheckoutStep(null);
    setActiveSalesPageProduct(null);

    if (isDirect) {
      alert(`✅ Direct Enrollment Confirmed!\n\nWelcome to the EarnMega Affiliate Hub, ${buyerFullName}!`);
    } else {
      alert(
        `✅ Payment Confirmed!\n\nOrder ID: ${uniqueOrderUid}\nBuyer: ${buyerFullName}\nProduct by Moses Unlocked: ${prod.title}\nAffiliate (${referredByCode}) Credited: GH₵ ${commGHS.toFixed(2)}`
      );
      window.open(prod.deliveryUrl, '_blank');
    }
  };

  const launchPaystackFromStep2 = () => {
    const isDirect = isDirectEnrollmentCheckout;
    const prod = activeSalesPageProduct || INITIAL_PRODUCTS[0];
    const payableGHS = isDirect ? DIRECT_ENROLLMENT_GHS : prod.priceGHS + (includeOrderBump ? 80 : 0);
    const ref = `EM_P2_${Date.now()}`;

    const openPopup = () => {
      const PaystackPop = (window as any).PaystackPop;
      if (!PaystackPop || !PAYSTACK_PUBLIC_KEY) {
        completeVerifiedPurchaseRecord(ref);
        return;
      }
      const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: buyerEmail || userEmail,
        amount: Math.round(payableGHS * 100),
        currency: 'GHS',
        ref,
        callback: (response: any) => completeVerifiedPurchaseRecord(response?.reference || ref)
      });
      handler.openIframe();
    };

    if (typeof window !== 'undefined' && !(window as any).PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = openPopup;
      script.onerror = () => completeVerifiedPurchaseRecord(ref);
      document.body.appendChild(script);
    } else {
      openPopup();
    }
  };

  // ============================================================================
  // HIGH-RES CERTIFICATE & FLYER DOWNLOADERS
  // ============================================================================
  const handleDownloadCertificate = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 2000;
    canvas.height = 1414;

    ctx.fillStyle = '#060A14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 12;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 4;
    ctx.strokeRect(65, 65, canvas.width - 130, canvas.height - 130);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#34D399';
    ctx.font = 'bold 64px serif';
    ctx.fillText('EARNMEGA EXECUTIVE ACADEMY', canvas.width / 2, 210);

    ctx.fillStyle = '#9CA3AF';
    ctx.font = '30px sans-serif';
    ctx.fillText('OFFICIAL CHARTER OF DIGITAL & AFFILIATE MASTERY', canvas.width / 2, 275);

    ctx.fillStyle = '#9CA3AF';
    ctx.font = '38px serif';
    ctx.fillText('THIS PROUDLY CERTIFIES THAT', canvas.width / 2, 430);

    ctx.fillStyle = '#FDE68A';
    ctx.font = 'bold italic 96px serif';
    ctx.fillText(certificateStudentName, canvas.width / 2, 555);

    ctx.fillStyle = '#D1D5DB';
    ctx.font = '36px sans-serif';
    ctx.fillText('has passed all 5 rigorous examination modules with Distinction (90%+ Standard) in', canvas.width / 2, 690);

    const courseTitle = INITIAL_PRODUCTS.find((p) => p.id === examProductId)?.title || 'Digital Marketing Academy';
    ctx.fillStyle = '#34D399';
    ctx.font = 'bold 52px sans-serif';
    ctx.fillText(courseTitle, canvas.width / 2, 780);

    ctx.fillStyle = '#FDE68A';
    ctx.font = 'italic 54px serif';
    ctx.fillText('Moses', 450, 1180);
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '22px sans-serif';
    ctx.fillText('MOSES • FOUNDER & CREATOR, EARNMEGA', 450, 1230);

    ctx.fillStyle = '#9CA3AF';
    ctx.font = '24px monospace';
    ctx.fillText(`ISSUED: ${new Date().toLocaleDateString()} • ID: ${certificateCode}`, canvas.width - 520, 1210);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `EarnMega-Certificate-${certificateCode}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadSuccessBanner('✓ Official EarnMega Certificate signed by Moses downloaded!');
      setTimeout(() => setDownloadSuccessBanner(null), 4000);
    }, 'image/png');
  };

  const handleDownloadStatusFlyer = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1920;

    ctx.fillStyle = '#070b14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 10;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#34D399';
    ctx.font = 'bold 52px sans-serif';
    ctx.fillText('EARNMEGA VERIFIED PAYOUT', canvas.width / 2, 320);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 110px sans-serif';
    ctx.fillText(formatAmount(totalEarningsGHS), canvas.width / 2, 680);

    ctx.fillStyle = '#9CA3AF';
    ctx.font = '40px sans-serif';
    ctx.fillText(`Affiliate Partner: ${firstName} ${lastName} (${userAffiliateCode})`, canvas.width / 2, 820);
    ctx.fillText(`Total Verified Sales: ${totalSalesCount} • Creator: Moses`, canvas.width / 2, 900);
    ctx.fillStyle = '#FDE68A';
    ctx.fillText(`Support: ${SUPPORT_EMAIL_PRIMARY} • ${SUPPORT_WHATSAPP_DISPLAY}`, canvas.width / 2, 1600);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `EarnMega-Status-Flyer-${userAffiliateCode}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadSuccessBanner('✓ WhatsApp Status Earnings Flyer downloaded!');
      setTimeout(() => setDownloadSuccessBanner(null), 4000);
    }, 'image/png');
  };

  // ============================================================================
  // EXAM, CONTESTS, DEPOSIT & PAYOUT HANDLERS
  // ============================================================================
  const handleGradeExamStep = (e: React.FormEvent) => {
    e.preventDefault();
    const stepData = FIVE_STEP_EXAM_BANK[currentExamStep];
    if (!stepData) return;

    let correct = 0;
    stepData.questions.forEach((qItem, idx) => {
      if (examAnswers[idx] === qItem.correctIndex) correct += 1;
    });

    const total = stepData.questions.length;
    const scorePercent = Math.round((correct / total) * 100);
    const passed = scorePercent >= 90;

    setExamStepResult({ scorePercent, passed, correctCount: correct, total });

    if (passed) {
      if (currentExamStep < 5) {
        const nextStep = currentExamStep + 1;
        if (unlockedExamStep < nextStep) setUnlockedExamStep(nextStep);
      } else {
        setCertificateCode(`EM-CERT-${Math.floor(100000 + Math.random() * 900000)}`);
        setCertificateUnlocked(true);
      }
    }
  };

  const handleContestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isViral = contestModalOpen === 'viral_100k';
    if (!isViral) setRegisteredContests((prev) => [...prev, 'sales_50']);
    setContestModalOpen(null);
    setContestStatusBanner(
      isViral
        ? `🎉 Your 100K Views Video application (${formatAmount(VIRAL_CONTEST_PRIZE_GHS)}) has been sent to ${SUPPORT_EMAIL_PRIMARY}!`
        : `✅ You are officially registered for the EarnMega Sales Sprint! Details logged with ${SUPPORT_EMAIL_PRIMARY}.`
    );
  };

  const handleConfirmDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const addedGHS = Number(depositAmountGHS);
    if (addedGHS <= 0) return;

    setAvailableBalanceGHS((prev) => Number((prev + addedGHS).toFixed(2)));
    const txItem = {
      id: `dep-${Date.now()}`,
      orderUid: `DEP-${Math.floor(100000 + Math.random() * 900000)}`,
      reference: `EM_DEP_${Date.now()}`,
      productTitle: 'Wallet Deposit (Instant Top-Up)',
      amountGHS: addedGHS,
      commissionGHS: addedGHS,
      buyerName: `${firstName} ${lastName}`,
      buyerEmail: userEmail,
      buyerPhone: userPhone,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'VERIFIED'
    };
    setTransactions((prev) => [txItem, ...prev]);
    setIsDepositModalOpen(false);
    setDepositStep(1);
    setDepositVerifyCode('');
    setDepositAmountGHS('');
    setDownloadSuccessBanner(`✓ Deposit of GH₵ ${addedGHS.toFixed(2)} credited to your Available Balance!`);
    setTimeout(() => setDownloadSuccessBanner(null), 4000);
  };

  const handleFridayPayoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutFeedback(null);
    const amount = parseFloat(payoutAmountGHS);
    if (isNaN(amount) || amount < 90) {
      setPayoutFeedback({ type: 'error', text: 'Minimum Friday withdrawal threshold is GH₵ 90.00.' });
      return;
    }
    if (amount > availableBalanceGHS) {
      setPayoutFeedback({ type: 'error', text: `Insufficient available balance (${formatAmount(availableBalanceGHS)}).` });
      return;
    }

    setIsSubmittingPayout(true);
    setTimeout(() => {
      setAvailableBalanceGHS((prev) => prev - amount);
      setWithdrawnBalanceGHS((prev) => prev + amount);
      setPayoutAmountGHS('');
      setIsSubmittingPayout(false);
      setPayoutFeedback({
        type: 'success',
        text: `✅ Payout request of GH₵ ${amount.toFixed(2)} dispatched to ${SUPPORT_EMAIL_PRIMARY} (${SUPPORT_WHATSAPP_DISPLAY}) for Friday Paystack Transfer!`
      });
    }, 600);
  };

  const handleAiBotSend = (customPrompt?: string) => {
    const query = (customPrompt || aiInput).trim();
    if (!query) return;
    const lower = query.toLowerCase();
    let reply = '';

    if (lower.includes('commission') || lower.includes('payout') || lower.includes('friday')) {
      reply = `On EarnMega, every digital product created by Moses pays an instant 50% commission into your Available Balance. Friday payouts are dispatched via ${SUPPORT_EMAIL_PRIMARY} or WhatsApp ${SUPPORT_WHATSAPP_DISPLAY}!`;
    } else {
      reply = `RECOMMENDATION:\nTo maximize conversions on "${query}", pair Moses's offer with the 1-Click Order Bump (+GH₵ 80) at checkout and follow up with leads inside your Abandoned Checkout CRM!`;
    }
    setAiMessages((prev) => [...prev, { sender: 'user', text: query }, { sender: 'bot', text: reply }]);
    if (!customPrompt) setAiInput('');
  };

  const filteredMarketplaceProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(marketSearch.toLowerCase()) ||
        p.creator.toLowerCase().includes(marketSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(marketSearch.toLowerCase());
      if (!matchesSearch) return false;
      if (marketFilter === 'All Offers') return true;
      if (marketFilter === 'Top Pick') return p.badges.includes('TOP PICK');
      if (marketFilter === 'High Converting') return p.badges.includes('HIGH CONVERTING');
      return p.category === marketFilter;
    });
  }, [products, marketSearch, marketFilter]);

  const unreadNotifCount = notificationsList.filter((n) => !n.read).length;
  const userInitials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'ME';
  const isFridayGMT = useMemo(() => new Date().getUTCDay() === 5, []);

  // Milestone Progress
  const milestoneTiers = [
    { name: 'Starter', min: 0, max: 999, label: 'Starter Partner' },
    { name: 'Bronze', min: 1000, max: 4999, label: 'Bronze Excellence' },
    { name: 'Silver', min: 5000, max: 9999, label: 'Silver Executive' },
    { name: 'Gold', min: 10000, max: 24999, label: 'Gold Partner' },
    { name: 'Diamond', min: 25000, max: Infinity, label: 'Diamond Ambassador' }
  ];
  const currentTier = [...milestoneTiers].reverse().find((t) => totalEarningsGHS >= t.min) || milestoneTiers[0];
  const nextTier = milestoneTiers[milestoneTiers.indexOf(currentTier) + 1] || currentTier;
  const milestoneGoalGHS = nextTier.min || currentTier.max;
  const milestonePercent = Math.min(100, Math.round((totalEarningsGHS / milestoneGoalGHS) * 100));

  // ============================================================================
  // BIO-LINK STOREFRONT PREVIEW (?store=1)
  // ============================================================================
  if (showBioLinkPreview) {
    return (
      <div className="min-h-screen bg-[#060911] text-white py-10 px-4">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              Official EarnMega Partner Storefront • {userAffiliateCode}
            </span>
            <button
              onClick={() => setShowBioLinkPreview(false)}
              className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl font-bold"
            >
              ← Back to Hub
            </button>
          </div>
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 text-black font-black text-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/20">
              {userInitials}
            </div>
            <h1 className="text-2xl font-black">{firstName} {lastName}’s Digital Store</h1>
            <p className="text-xs text-gray-400 mt-1">Verified Courses & Blueprints by Moses • Instant Access</p>
          </div>
          <div className="space-y-4">
            {INITIAL_PRODUCTS.map((p) => (
              <div key={p.id} className="bg-[#0d1424] border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">{p.category} • By Moses</span>
                  <h3 className="text-base font-black text-white">{p.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{p.subheadline}</p>
                </div>
                <button
                  onClick={() => {
                    setShowBioLinkPreview(false);
                    openDigitstemCheckoutForProduct(p);
                  }}
                  className="shrink-0 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs"
                >
                  Get Instant Access ({formatAmount(p.priceGHS)})
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // AFFILIATE PRODUCT SALES PAGE LANDING (?prod=...)
  // ============================================================================
  if (activeSalesPageProduct && !checkoutStep) {
    const p = activeSalesPageProduct;
    return (
      <div className="min-h-screen bg-[#060911] text-white pb-24">
        <div className="bg-emerald-950/90 border-b border-emerald-500/30 px-4 py-3 flex flex-wrap items-center justify-between gap-2 sticky top-0 z-50 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-emerald-500 text-black font-black px-2.5 py-0.5 rounded text-[10px]">
              EARNMEGA VERIFIED OFFER
            </span>
            <span className="text-emerald-200 font-mono">
              Referred by: <strong>{referredByCode}</strong> • Creator: <strong>Moses</strong>
            </span>
          </div>
          <button
            onClick={() => setActiveSalesPageProduct(null)}
            className="text-xs bg-amber-500 hover:bg-amber-400 text-black font-black px-3.5 py-1.5 rounded-xl"
          >
            ← Return to EarnMega Hub
          </button>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="bg-[#0d1322] border border-emerald-500/30 rounded-3xl p-6 md:p-10 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                {p.category} • Official Access Portal
              </span>
              <span className="text-xs text-gray-400">
                Created by <strong className="text-amber-400">Moses</strong>
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-4">{p.headline}</h1>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6">{p.subheadline}</p>

            <div className="bg-[#131b2e] border border-white/10 rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-gray-400 uppercase block">
                  Complete Package Price (Course + EarnMega Affiliate Account)
                </span>
                <div className="text-2xl font-black text-emerald-400 mt-0.5">
                  {formatAmount(p.priceGHS)}{' '}
                  <span className="text-xs text-gray-400 font-mono">(Settles: GH₵ {p.priceGHS.toFixed(2)})</span>
                </div>
              </div>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
              >
                {Object.values(GLOBAL_CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol}) - {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3 mb-8">
              {p.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-3 bg-black/30 border border-white/5 rounded-xl p-3.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-gray-200">{b}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => openDigitstemCheckoutForProduct(p)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-black font-black text-base shadow-lg shadow-emerald-500/25 transition-all"
            >
              BUY NOW — PROCEED TO 2-STEP CHECKOUT ({formatAmount(p.priceGHS)}) →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // MAIN WORKSPACE LAYOUT (DESKTOP SIDEBAR + TOP HEADER + MOBILE BAR)
  // ============================================================================
  const navGroups = [
    {
      title: 'MAIN CONSOLE',
      items: [
        { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
        { id: 'marketplace', label: 'Moses Marketplace (6)', icon: ShoppingBag },
        { id: 'links', label: 'Link Manager & QR', icon: Share2 },
        { id: 'vault', label: 'TikTok & WA Swipe Vault', icon: MessageSquare },
      ]
    },
    {
      title: 'GROWTH & ACADEMY',
      items: [
        { id: 'exam', label: '5-Step Exam & Certificate', icon: Award },
        { id: 'contests', label: '100K Views & Sales Contests', icon: Trophy },
        { id: 'ai_tools', label: 'WA Closer & Status Flyer', icon: Zap },
        { id: 'leads_crm', label: 'Abandoned Leads CRM', icon: Users },
        { id: 'calculator', label: 'Income Simulator', icon: Calculator },
        { id: 'my_courses', label: 'My Unlocked Courses', icon: Folder },
      ]
    },
    {
      title: 'FINANCE & GOVERNANCE',
      items: [
        { id: 'payouts', label: 'Friday Payout Desk', icon: DollarSign },
        { id: 'ledger', label: 'Financial Sales Ledger', icon: FileText },
        { id: 'creator', label: 'Creator Whitelist Portal', icon: Briefcase },
        { id: 'rules', label: 'Official Rules & Policy', icon: ShieldCheck },
        { id: 'support', label: '24/7 Support Desk', icon: HelpCircle },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#060911] text-white flex flex-col lg:flex-row">
      {/* ==================================================================== */}
      {/* DESKTOP FIXED SIDEBAR */}
      {/* ==================================================================== */}
      <aside className="hidden lg:flex w-72 shrink-0 flex-col bg-[#090e1a] border-r border-white/10 min-h-screen sticky top-0 h-screen">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-black text-black text-lg shadow-lg shadow-emerald-500/20">
            EM
          </div>
          <div>
            <span className="font-black text-lg tracking-wide text-white block leading-none">EARNMEGA</span>
            <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest">By Moses • Affiliate Hub</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
          {navGroups.map((group) => (
            <div key={group.title}>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-3 mb-2 block">
                {group.title}
              </span>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id as ActiveSection)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        active
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-inner'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-emerald-400' : ''}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10 bg-[#070b14]">
          <div
            onClick={() => setActiveSettingsModal('profile')}
            className="flex items-center gap-3 p-3 rounded-2xl bg-[#11192c] border border-white/10 cursor-pointer hover:border-emerald-500/40 transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-black text-xs flex items-center justify-center">
              {userInitials}
            </div>
            <div className="flex-1 overflow-hidden">
              <span className="text-xs font-black text-white block truncate">{firstName} {lastName}</span>
              <span className="text-[10px] text-emerald-400 font-mono block">ID: {userAffiliateCode}</span>
            </div>
            <Settings className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </aside>

      {/* ==================================================================== */}
      {/* MAIN CONTENT COLUMN */}
      {/* ==================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 pb-24 lg:pb-12">
        {/* TOP BAR */}
        <header className="sticky top-0 z-40 bg-[#090e1a]/95 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="lg:hidden p-2.5 rounded-xl bg-[#141d30] hover:bg-[#1c2842] border border-white/10 text-white"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div onClick={() => setActiveSection('dashboard')} className="cursor-pointer flex items-center gap-2 lg:hidden">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-black text-black text-xs">
                  EM
                </div>
                <span className="font-black text-sm tracking-wide text-white">EARNMEGA</span>
              </div>
              <div className="hidden lg:flex items-center gap-2 text-xs text-gray-400">
                <span>Support:</span>
                <a href={`mailto:${SUPPORT_EMAIL_PRIMARY}`} className="text-emerald-400 font-mono font-bold hover:underline">
                  {SUPPORT_EMAIL_PRIMARY}
                </a>
                <span>•</span>
                <a href={`https://wa.me/${SUPPORT_WHATSAPP_INTL}`} target="_blank" rel="noreferrer" className="text-amber-400 font-mono font-bold hover:underline">
                  WhatsApp: {SUPPORT_WHATSAPP_DISPLAY}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Worldwide Currency Selector */}
              <div className="flex items-center gap-1.5 bg-[#141d30] border border-white/10 rounded-full px-3 py-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer max-w-[120px] sm:max-w-[170px]"
                >
                  {Object.values(GLOBAL_CURRENCIES).map((curr) => (
                    <option key={curr.code} value={curr.code} className="bg-[#0d1322] text-white">
                      {curr.code} ({curr.symbol}) • {curr.region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notifications Button */}
              <button
                onClick={() => setIsNotificationsOpen(true)}
                className="relative p-2.5 rounded-full bg-[#141d30] hover:bg-[#1c2842] border border-white/10 text-white"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black px-1.5 rounded-full">
                    {unreadNotifCount}
                  </span>
                )}
              </button>

              {/* Profile Avatar */}
              <button
                onClick={() => setIsProfileSheetOpen(true)}
                className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-black text-xs flex items-center justify-center"
              >
                {userInitials}
              </button>
            </div>
          </div>
        </header>

        {/* MOBILE DRAWER */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex lg:hidden">
            <div className="w-80 max-w-[85vw] bg-[#090e1a] border-r border-white/10 h-full overflow-y-auto p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 text-black font-black flex items-center justify-center">
                      EM
                    </div>
                    <div>
                      <span className="font-black text-sm text-white block">EarnMega Ecosystem</span>
                      <span className="text-[10px] text-emerald-400 font-mono">ID: {userAffiliateCode}</span>
                    </div>
                  </div>
                  <button onClick={() => setIsDrawerOpen(false)} className="p-2 rounded-lg bg-white/5 text-gray-300">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-5 mt-4">
                  {navGroups.map((group) => (
                    <div key={group.title}>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 px-2 block mb-1.5">
                        {group.title}
                      </span>
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setActiveSection(item.id as ActiveSection);
                              setIsDrawerOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold mb-1 ${
                              activeSection === item.id
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'text-gray-300 hover:bg-white/5'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1" onClick={() => setIsDrawerOpen(false)} />
          </div>
        )}

        {/* MAIN BODY */}
        <main className="max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
          {settingsSavedBanner && (
            <div className="mb-4 bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between">
              <span>{settingsSavedBanner}</span>
              <button onClick={() => setSettingsSavedBanner(null)}>✕</button>
            </div>
          )}
          {downloadSuccessBanner && (
            <div className="mb-4 bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between">
              <span>{downloadSuccessBanner}</span>
              <button onClick={() => setDownloadSuccessBanner(null)}>✕</button>
            </div>
          )}

          {/* ================================================================ */}
          {/* 1. DASHBOARD / PERFORMANCE HUB */}
          {/* ================================================================ */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-white">
                    Welcome back, {firstName} 👋
                  </h1>
                  <p className="text-xs text-gray-400 mt-1">
                    EarnMega Executive Affiliate Command Centre • Creator: <strong className="text-emerald-400">Moses</strong> • ID:{' '}
                    <span className="text-emerald-400 font-mono font-bold">{userAffiliateCode}</span>
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setShowBioLinkPreview(true)}
                    className="px-4 py-2.5 rounded-xl bg-[#141d30] hover:bg-[#1b263f] border border-white/10 text-xs font-bold flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>Preview My Bio-Link Store</span>
                  </button>
                  <button
                    onClick={() => setActiveSettingsModal('profile')}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold"
                  >
                    Edit Profile & KYC
                  </button>
                </div>
              </div>

              {/* Available Balance Hero Card */}
              <div className="bg-gradient-to-br from-emerald-900/70 via-[#0f172a] to-indigo-950 border border-emerald-500/30 rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-300">
                    AVAILABLE WALLET BALANCE
                  </span>
                  <span className="text-xs font-bold bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5" /> {currentTier.label}
                  </span>
                </div>
                <div className="text-3xl md:text-5xl font-black text-white mt-1 mb-2">
                  {formatAmount(availableBalanceGHS)}
                </div>
                <p className="text-xs text-gray-300 mb-6 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Instant 50% Commission Split • Settles in GH₵ ({availableBalanceGHS.toFixed(2)} GHS)</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setIsDepositModalOpen(true)}
                    className="py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-black font-black text-xs transition-all shadow-lg shadow-amber-500/20"
                  >
                    + Deposit Funds 💳
                  </button>
                  <button
                    onClick={() => setActiveSection('marketplace')}
                    className="py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs transition-all"
                  >
                    Promote Moses’s Offers 🚀
                  </button>
                  <button
                    onClick={() => setActiveSection('payouts')}
                    className="py-3.5 rounded-xl bg-white hover:bg-gray-100 text-slate-950 font-black text-xs transition-all"
                  >
                    Withdraw Funds (Friday)
                  </button>
                </div>
              </div>

              {/* 4 Key Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div onClick={() => setActiveSection('ledger')} className="bg-[#0f172a] border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-emerald-500/50 transition-all">
                  <span className="text-xs text-gray-400 block">Total Earnings</span>
                  <span className="text-2xl font-black text-white mt-1 block">{formatAmount(totalEarningsGHS)}</span>
                  <span className="text-[11px] text-emerald-400 mt-1 block">↑ 50% Instant Split</span>
                </div>
                <div onClick={() => setActiveSection('ledger')} className="bg-[#0f172a] border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-emerald-500/50 transition-all">
                  <span className="text-xs text-gray-400 block">Verified Sales</span>
                  <span className="text-2xl font-black text-white mt-1 block">{totalSalesCount}</span>
                  <span className="text-[11px] text-indigo-400 mt-1 block">Paystack Settled</span>
                </div>
                <div onClick={() => setActiveSection('payouts')} className="bg-[#0f172a] border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-emerald-500/50 transition-all">
                  <span className="text-xs text-gray-400 block">Withdrawn Total</span>
                  <span className="text-2xl font-black text-white mt-1 block">{formatAmount(withdrawnBalanceGHS)}</span>
                  <span className="text-[11px] text-amber-400 mt-1 block">↓ Friday Transfers</span>
                </div>
                <div onClick={() => setActiveSection('links')} className="bg-[#0f172a] border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-emerald-500/50 transition-all">
                  <span className="text-xs text-gray-400 block">Link Clicks</span>
                  <span className="text-2xl font-black text-white mt-1 block">{totalClicksCount}</span>
                  <span className="text-[11px] text-rose-400 mt-1 block">7.3% Conv. Rate</span>
                </div>
              </div>

              {/* Milestone Progress + 1-Year License Countdown Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Milestone Card */}
                <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-wider text-gray-400">
                        AFFILIATE MILESTONE PROGRESS
                      </span>
                      <span className="text-xs font-bold bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                        🚀 {currentTier.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">
                      Next Tier Target: <strong className="text-white">{nextTier.label}</strong> ({formatAmount(milestoneGoalGHS)})
                    </p>
                    <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all"
                        style={{ width: `${Math.max(8, milestonePercent)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 font-mono pt-2 border-t border-white/5">
                    <span>Earned: {formatAmount(totalEarningsGHS)}</span>
                    <span className="text-emerald-400 font-bold">{milestonePercent}% Complete</span>
                  </div>
                </div>

                {/* 1-Year License Countdown Card */}
                <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-gray-400">
                      ANNUAL LICENSE TIMER
                    </span>
                    <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                      🟢 ACTIVE 1-YEAR LICENSE
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[
                      { label: 'DAYS', val: timeRemaining.days },
                      { label: 'HOURS', val: timeRemaining.hours.toString().padStart(2, '0') },
                      { label: 'MINS', val: timeRemaining.minutes.toString().padStart(2, '0') },
                      { label: 'SECS', val: timeRemaining.seconds.toString().padStart(2, '0') }
                    ].map((t, idx) => (
                      <div key={idx} className="bg-[#141d30] border border-emerald-500/20 rounded-xl p-2.5 text-center">
                        <span className="text-xl font-black text-emerald-400 font-mono block">{t.val}</span>
                        <span className="text-[9px] font-bold text-gray-500 uppercase">{t.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsRenewalModalOpen(true)}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs"
                    >
                      Extend +1 Year (GH₵ 45.00)
                    </button>
                    <button
                      onClick={() => setLicenseExpiresAt(Date.now() - 1000)}
                      className="px-3 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold text-xs"
                    >
                      Test Expiry Lock
                    </button>
                  </div>
                </div>
              </div>

              {/* Revenue Analytics & Top Affiliates Leaderboard */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#0f172a] border border-white/10 rounded-3xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-black text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400" />
                      <span>7-Day Commission Velocity</span>
                    </h3>
                    <span className="text-xs text-emerald-400 font-mono font-bold">+24.8% vs last week</span>
                  </div>
                  <div className="h-44 flex items-end gap-3 justify-between px-2">
                    {[45, 65, 50, 85, 70, 100, 90].map((h, i) => (
                      <div key={i} className="w-full bg-[#141d30] rounded-t-xl relative group h-full flex items-end overflow-hidden">
                        <div
                          className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-xl transition-all duration-500 group-hover:brightness-110"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 text-[10px] text-gray-500 font-mono uppercase px-2">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>

                <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-6">
                  <h3 className="text-sm font-black text-white mb-1 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>Top EarnMega Affiliates</span>
                  </h3>
                  <p className="text-xs text-gray-400 mb-4">Weekly Verified Leaderboard</p>
                  <div className="space-y-2.5">
                    {[
                      { rank: 1, name: 'Kwame O.', amount: 6480 },
                      { rank: 2, name: 'Blessing A.', amount: 5040 },
                      { rank: 3, name: `${firstName} (You)`, amount: totalEarningsGHS },
                      { rank: 4, name: 'Samuel T.', amount: 2880 },
                    ].map((row) => (
                      <div key={row.rank} className="flex items-center justify-between p-3 rounded-xl bg-[#141d30] border border-white/5">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-xs flex items-center justify-center">
                            {row.rank}
                          </span>
                          <span className="text-xs font-bold text-white">{row.name}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400">{formatAmount(row.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 2. MARKETPLACE (OWNED BY MOSES) */}
          {/* ================================================================ */}
          {activeSection === 'marketplace' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">EarnMega Affiliate Marketplace</h2>
                  <p className="text-xs text-gray-400">6 High-Converting Digital Products Created by <strong className="text-emerald-400">Moses</strong> • 50% Instant Commission</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search Moses's products..."
                    value={marketSearch}
                    onChange={(e) => setMarketSearch(e.target.value)}
                    className="px-4 py-2 bg-[#141d30] border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                  />
                  <select
                    value={marketFilter}
                    onChange={(e) => setMarketFilter(e.target.value)}
                    className="px-4 py-2 bg-[#141d30] border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                  >
                    {['All Offers', 'Top Pick', 'High Converting', 'AI & Tech', 'Sales', 'Trading & Finance'].map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMarketplaceProducts.map((p) => (
                  <div key={p.id} className="bg-[#0f172a] border border-white/10 rounded-3xl p-5 hover:border-emerald-500/50 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {p.badges.map((badge, idx) => (
                          <span key={idx} className="text-[10px] font-black px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            {badge}
                          </span>
                        ))}
                        <span className="text-[10px] font-black px-2 py-1 rounded-md bg-amber-500/20 text-amber-300">
                          {p.rating} ★
                        </span>
                      </div>

                      <h3 className="text-lg font-black text-white mb-1">{p.title}</h3>
                      <p className="text-xs text-gray-400 mb-4">
                        Creator: <span className="text-emerald-400 font-bold">{p.creator}</span> • Category: {p.category}
                      </p>

                      <div className="grid grid-cols-2 gap-2.5 mb-4">
                        <div className="bg-[#141d30] rounded-xl p-3 border border-white/5">
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">Price</span>
                          <span className="text-sm font-black text-white">{formatAmount(p.priceGHS)}</span>
                        </div>
                        <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/20">
                          <span className="text-[10px] text-emerald-400 uppercase font-bold block">50% Commission</span>
                          <span className="text-sm font-black text-emerald-300">{formatAmount(p.priceGHS * 0.5)}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Your Unique Tracking Link</label>
                        <div className="flex bg-[#141d30] border border-white/10 rounded-xl overflow-hidden">
                          <input
                            type="text"
                            readOnly
                            value={getUniqueProductAffiliateLink(p)}
                            className="flex-1 bg-transparent px-3 py-2 text-xs text-gray-300 font-mono outline-none"
                          />
                          <button
                            onClick={() => handleCopy(getUniqueProductAffiliateLink(p), p.id)}
                            className="px-3.5 bg-emerald-500 text-black font-black text-xs"
                          >
                            {copiedKey === p.id ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <button
                        onClick={() => setPromoteModalProduct(p)}
                        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs"
                      >
                        Promote Studio & QR Code 🚀
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setActiveSalesPageProduct(p)}
                          className="py-2.5 rounded-xl bg-[#141d30] hover:bg-[#1b263f] border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Sales Page
                        </button>
                        <button
                          onClick={() => openDigitstemCheckoutForProduct(p)}
                          className="py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs flex items-center justify-center gap-1"
                        >
                          <CreditCard className="w-3.5 h-3.5" /> Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 3. LINK MANAGER & QR */}
          {/* ================================================================ */}
          {activeSection === 'links' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">Link Manager & Sub-ID Traffic Tagging</h2>
                <p className="text-xs text-gray-400">Attach custom traffic tags (e.g. tiktok_bio, wa_status) to track where your sales originate.</p>
              </div>
              <div className="space-y-4">
                {INITIAL_PRODUCTS.map((p) => {
                  const tagKey = `tag-${p.id}`;
                  const tagVal = linkTags[tagKey] || '';
                  const finalLink = getUniqueProductAffiliateLink(p, tagVal || undefined);
                  return (
                    <div key={p.id} className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-base font-black text-white">{p.title}</h3>
                          <span className="text-xs text-emerald-400 font-mono">Creator: Moses • 50% Commission ({formatAmount(p.priceGHS * 0.5)})</span>
                        </div>
                        <button
                          onClick={() => setPromoteModalProduct(p)}
                          className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1.5 rounded-xl font-bold"
                        >
                          Get QR Code
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="md:col-span-2 flex bg-[#141d30] border border-white/10 rounded-xl overflow-hidden">
                          <input type="text" readOnly value={finalLink} className="flex-1 bg-transparent px-3 py-2.5 text-xs text-gray-200 font-mono outline-none" />
                          <button
                            onClick={() => handleCopy(finalLink, `link-${p.id}`)}
                            className="px-4 bg-emerald-500 text-black font-black text-xs"
                          >
                            {copiedKey === `link-${p.id}` ? 'Copied!' : 'Copy Link'}
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Add Sub-ID (e.g. tiktok_bio)"
                          value={tagVal}
                          onChange={(e) => setLinkTags((prev) => ({ ...prev, [tagKey]: e.target.value }))}
                          className="bg-[#141d30] border border-white/10 px-3 py-2.5 rounded-xl text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 4. PROMOTIONAL SWIPE VAULT */}
          {/* ================================================================ */}
          {activeSection === 'vault' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">Promotional Swipe Vault</h2>
                <p className="text-xs text-gray-400">Done-for-you TikTok hooks & WhatsApp closing scripts written by Moses with your tracking link pre-attached.</p>
              </div>
              <div className="space-y-6">
                {INITIAL_PRODUCTS.map((p) => (
                  <div key={p.id} className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 space-y-4">
                    <h3 className="text-lg font-black text-emerald-400">{p.title} — Done-For-You Scripts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#141d30] border border-white/5 rounded-2xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-rose-400 uppercase">TikTok / Reels Viral Hook</span>
                          <button
                            onClick={() => handleCopy(p.swipeCopy.tiktok[0], `tk-${p.id}`)}
                            className="text-xs bg-white/10 px-2.5 py-1 rounded-lg font-bold"
                          >
                            {copiedKey === `tk-${p.id}` ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">{p.swipeCopy.tiktok[0]}</p>
                      </div>
                      <div className="bg-[#141d30] border border-white/5 rounded-2xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-emerald-400 uppercase">WhatsApp Status / DM Script</span>
                          <button
                            onClick={() =>
                              handleCopy(p.swipeCopy.whatsapp[0].replace('{LINK}', getUniqueProductAffiliateLink(p)), `wa-${p.id}`)
                            }
                            className="text-xs bg-white/10 px-2.5 py-1 rounded-lg font-bold"
                          >
                            {copiedKey === `wa-${p.id}` ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {p.swipeCopy.whatsapp[0].replace('{LINK}', getUniqueProductAffiliateLink(p))}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 5. 5-STEP CERTIFICATION EXAM & CERTIFICATE */}
          {/* ================================================================ */}
          {activeSection === 'exam' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0f172a] border border-white/10 rounded-2xl p-5">
                <div>
                  <h2 className="text-xl font-black text-white">EarnMega 5-Step Certification Academy</h2>
                  <p className="text-xs text-gray-400">Pass all 5 steps (90%+ accuracy) to unlock your Official Certificate signed by Moses.</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={examProductId}
                    onChange={(e) => setExamProductId(e.target.value)}
                    className="bg-[#141d30] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    {INITIAL_PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setCertificateUnlocked(!certificateUnlocked)}
                    className="px-3.5 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold"
                  >
                    {certificateUnlocked ? 'Back to Exam' : 'Preview Certificate'}
                  </button>
                </div>
              </div>

              {certificateUnlocked ? (
                <div className="bg-[#060A14] border-2 border-amber-400 rounded-3xl p-8 md:p-14 text-center shadow-2xl space-y-6">
                  <Award className="w-14 h-14 text-amber-400 mx-auto" />
                  <h1 className="text-2xl md:text-4xl font-serif font-black text-amber-300 uppercase tracking-widest">
                    EarnMega Executive Academy
                  </h1>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Official Charter of Digital & Affiliate Mastery</p>
                  <p className="text-sm text-gray-300">This proudly certifies that</p>
                  <input
                    type="text"
                    value={certificateStudentName}
                    onChange={(e) => setCertificateStudentName(e.target.value)}
                    className="text-3xl md:text-5xl font-serif italic font-black text-amber-200 bg-transparent border-b-2 border-amber-500/50 text-center focus:outline-none max-w-xl w-full pb-2"
                  />
                  <p className="text-sm text-gray-300">
                    has mastered all 5 examination modules with Distinction (90%+ Standard) in{' '}
                    <strong className="text-emerald-400">
                      {INITIAL_PRODUCTS.find((p) => p.id === examProductId)?.title}
                    </strong>
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-6 border-t border-white/10">
                    <div>
                      <span className="font-serif italic text-3xl text-amber-300 block">Moses</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest">MOSES • FOUNDER & CREATOR, EARNMEGA</span>
                    </div>
                    <div className="text-xs font-mono text-gray-400">
                      <div>Credential ID: {certificateCode}</div>
                      <div>Issued: {new Date().toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={handleDownloadCertificate}
                      className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm inline-flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Download Official High-Res Certificate (PNG)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <button
                        key={step}
                        disabled={step > unlockedExamStep}
                        onClick={() => {
                          setCurrentExamStep(step);
                          setExamAnswers({});
                          setExamStepResult(null);
                        }}
                        className={`w-10 h-10 rounded-full font-black text-xs flex items-center justify-center ${
                          step === currentExamStep
                            ? 'bg-emerald-500 text-black'
                            : step <= unlockedExamStep
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-white/5 text-gray-600'
                        }`}
                      >
                        {step}
                      </button>
                    ))}
                  </div>

                  <h3 className="text-xl font-black text-emerald-400 mb-1">{FIVE_STEP_EXAM_BANK[currentExamStep].title}</h3>
                  <p className="text-xs text-gray-400 mb-6">{FIVE_STEP_EXAM_BANK[currentExamStep].subtitle}</p>

                  {examStepResult && (
                    <div className={`p-4 rounded-2xl border mb-6 ${examStepResult.passed ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-rose-500/10 border-rose-500/40 text-rose-300'}`}>
                      <div className="font-black text-sm">
                        {examStepResult.passed ? '🎉 Step Passed!' : '❌ Score Below 90% — Please Review & Retake'} ({examStepResult.correctCount}/{examStepResult.total} — {examStepResult.scorePercent}%)
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleGradeExamStep} className="space-y-5">
                    {FIVE_STEP_EXAM_BANK[currentExamStep].questions.map((q, idx) => (
                      <div key={idx} className="bg-[#141d30] p-4 rounded-2xl border border-white/5">
                        <p className="text-sm font-bold text-white mb-3">{idx + 1}. {q.q}</p>
                        <div className="space-y-2">
                          {q.options.map((opt, oIdx) => (
                            <label
                              key={oIdx}
                              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer text-xs border ${
                                examAnswers[idx] === oIdx
                                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 font-bold'
                                  : 'bg-[#0b111e] border-white/5 text-gray-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`q-${idx}`}
                                checked={examAnswers[idx] === oIdx}
                                onChange={() => setExamAnswers((prev) => ({ ...prev, [idx]: oIdx }))}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm"
                      >
                        Grade Step {currentExamStep} Answers
                      </button>
                      {examStepResult?.passed && currentExamStep < 5 && (
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentExamStep(currentExamStep + 1);
                            setExamAnswers({});
                            setExamStepResult(null);
                          }}
                          className="flex-1 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm"
                        >
                          Proceed to Step {currentExamStep + 1} →
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ================================================================ */}
          {/* 6. CONTESTS ARENA */}
          {/* ================================================================ */}
          {activeSection === 'contests' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">EarnMega Contests & Milestone Bounties</h2>
                <p className="text-xs text-gray-400">Hit viral view milestones or sales targets to claim cash & executive rewards.</p>
              </div>
              {contestStatusBanner && (
                <div className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 p-4 rounded-2xl text-xs font-bold">
                  {contestStatusBanner}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0f172a] border border-cyan-500/30 rounded-3xl p-6">
                  <span className="text-[10px] font-black bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">VIRAL VIDEO BOUNTY</span>
                  <h3 className="text-xl font-black text-white mt-3 mb-2">TikTok & IG 100K Views Challenge</h3>
                  <p className="text-xs text-gray-400 mb-4">Post a promotional video for any of Moses’s products. Hit 100,000+ verified views to claim:</p>
                  <div className="text-3xl font-black text-cyan-400 mb-6">{formatAmount(VIRAL_CONTEST_PRIZE_GHS)}</div>
                  <button
                    onClick={() => setContestModalOpen('viral_100k')}
                    className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs"
                  >
                    Submit 100K Views Video Proof
                  </button>
                </div>

                <div className="bg-[#0f172a] border border-amber-500/30 rounded-3xl p-6">
                  <span className="text-[10px] font-black bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full">50-SALES SPRINT</span>
                  <h3 className="text-xl font-black text-white mt-3 mb-2">50-Sales Executive Velocity Bonus</h3>
                  <p className="text-xs text-gray-400 mb-4">Hit 50 verified sales to unlock an extra {formatAmount(3500)} cash bonus on top of your 50% commissions.</p>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-amber-400">Progress: {totalSalesCount} / 50 Sales</span>
                    <span>{Math.min(100, Math.round((totalSalesCount / 50) * 100))}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden mb-6">
                    <div className="h-full bg-amber-400" style={{ width: `${Math.min(100, (totalSalesCount / 50) * 100)}%` }} />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        totalSalesCount >= 50
                          ? (setAdminMilestoneAlertSent(true), alert(`🚨 Milestone Alert Sent to ${SUPPORT_EMAIL_PRIMARY}!`))
                          : setContestModalOpen('sales_50')
                      }
                      className="flex-1 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs"
                    >
                      {totalSalesCount >= 50 ? '🚨 Alert Admin & Claim Bonus' : 'Register for 50-Sales Sprint'}
                    </button>
                    <button
                      onClick={() => setTotalSalesCount((prev) => prev + 5)}
                      className="px-3 py-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-300"
                    >
                      +5 Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 7. FRIDAY PAYOUT DESK */}
          {/* ================================================================ */}
          {activeSection === 'payouts' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-black text-white">Friday Payout & Withdrawal Desk</h2>
                  <p className="text-xs text-gray-400">Withdrawals settle via Paystack Transfer every Friday (Min: GH₵ 90.00) • Desk: {SUPPORT_EMAIL_PRIMARY}</p>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${isFridayGMT ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' : 'bg-amber-500/15 border-amber-500/30 text-amber-300'}`}>
                  {isFridayGMT ? '🟢 Friday Payout Window Open' : '🕒 Next Automated Batch: Friday GMT'}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 space-y-4">
                  <span className="text-xs text-gray-400 uppercase font-bold">Available for Withdrawal</span>
                  <div className="text-4xl font-black text-emerald-400">{formatAmount(availableBalanceGHS)}</div>
                  <p className="text-xs text-gray-400">Total Withdrawn to Date: {formatAmount(withdrawnBalanceGHS)}</p>
                  <button
                    onClick={() => setIsDepositModalOpen(true)}
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs"
                  >
                    + Top Up / Deposit Funds to Wallet
                  </button>
                </div>

                <form onSubmit={handleFridayPayoutSubmit} className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 space-y-4">
                  {payoutFeedback && (
                    <div className={`p-3.5 rounded-xl text-xs font-bold ${payoutFeedback.type === 'success' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'}`}>
                      {payoutFeedback.text}
                    </div>
                  )}
                  <div>
                    <label className="text-xs text-gray-400 font-bold block mb-1">Amount to Withdraw (GH₵)</label>
                    <input
                      type="number"
                      min="90"
                      step="0.01"
                      required
                      value={payoutAmountGHS}
                      onChange={(e) => setPayoutAmountGHS(e.target.value)}
                      placeholder="Min: 90.00"
                      className="w-full bg-[#141d30] border border-white/10 px-4 py-3 rounded-xl text-sm text-white"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'MOBILE_MONEY', label: 'Mobile Money' },
                      { id: 'BANK_TRANSFER', label: 'Bank Account' },
                      { id: 'CRYPTO_USDT', label: 'USDT TRC20' }
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setPayoutChannel(c.id as any)}
                        className={`py-2.5 rounded-xl text-xs font-bold border ${payoutChannel === c.id ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-[#141d30] border-white/10 text-gray-400'}`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 font-bold block mb-1">Registered Account Holder Name</label>
                    <input
                      type="text"
                      required
                      value={accountHolderName}
                      onChange={(e) => setAccountHolderName(e.target.value)}
                      placeholder="Exact name on MoMo / Bank"
                      className="w-full bg-[#141d30] border border-white/10 px-4 py-2.5 rounded-xl text-xs text-white"
                    />
                  </div>
                  {payoutChannel === 'MOBILE_MONEY' && (
                    <div className="grid grid-cols-2 gap-3">
                      <select value={momoNetwork} onChange={(e) => setMomoNetwork(e.target.value)} className="bg-[#141d30] border border-white/10 px-3 py-2.5 rounded-xl text-xs text-white">
                        <option>MTN MoMo</option>
                        <option>Telecel Cash</option>
                        <option>AT Money</option>
                        <option>MPesa</option>
                      </select>
                      <input
                        type="text"
                        required
                        value={momoNumber}
                        onChange={(e) => setMomoNumber(e.target.value)}
                        placeholder="0596096071"
                        className="bg-[#141d30] border border-white/10 px-3 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>
                  )}
                  {payoutChannel === 'BANK_TRANSFER' && (
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" required value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="Bank Name" className="bg-[#141d30] border border-white/10 px-3 py-2.5 rounded-xl text-xs text-white" />
                      <input type="text" required value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} placeholder="Account Number" className="bg-[#141d30] border border-white/10 px-3 py-2.5 rounded-xl text-xs text-white" />
                    </div>
                  )}
                  {payoutChannel === 'CRYPTO_USDT' && (
                    <input type="text" required value={usdtAddress} onChange={(e) => setUsdtAddress(e.target.value)} placeholder="USDT TRC20 Wallet Address (T...)" className="w-full bg-[#141d30] border border-white/10 px-3 py-2.5 rounded-xl text-xs text-white font-mono" />
                  )}
                  <button type="submit" disabled={isSubmittingPayout} className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs">
                    {isSubmittingPayout ? 'Dispatching...' : 'Submit Friday Payout Request'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 8. PROFIT SIMULATOR */}
          {/* ================================================================ */}
          {activeSection === 'calculator' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white">Affiliate Income Simulator</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 space-y-5">
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-2">Select Product by Moses</label>
                    <select value={calcProductId} onChange={(e) => setCalcProductId(e.target.value)} className="w-full bg-[#141d30] border border-white/10 px-4 py-3 rounded-xl text-xs text-white">
                      {INITIAL_PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>{p.title} ({formatAmount(p.priceGHS)})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span>Daily Referred Sales</span>
                      <span className="text-emerald-400 text-base font-black">{calcDailySales} sales/day</span>
                    </div>
                    <input type="range" min="1" max="50" value={calcDailySales} onChange={(e) => setCalcDailySales(Number(e.target.value))} className="w-full accent-emerald-500" />
                  </div>
                </div>

                {(() => {
                  const prod = INITIAL_PRODUCTS.find((p) => p.id === calcProductId) || INITIAL_PRODUCTS[0];
                  const commPerSale = prod.priceGHS * (prod.commissionPercent / 100);
                  return (
                    <div className="bg-[#0f172a] border border-emerald-500/30 rounded-3xl p-6 space-y-4">
                      <div className="flex justify-between items-center p-3.5 bg-[#141d30] rounded-2xl">
                        <span className="text-xs text-gray-400">Daily Commission</span>
                        <span className="text-lg font-black text-white">{formatAmount(commPerSale * calcDailySales)}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl">
                        <span className="text-xs text-emerald-300 font-bold">Monthly Income (30 Days)</span>
                        <span className="text-2xl font-black text-emerald-400">{formatAmount(commPerSale * calcDailySales * 30)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3.5 bg-[#141d30] rounded-2xl">
                        <span className="text-xs text-gray-400">Annual Projection</span>
                        <span className="text-lg font-black text-amber-400">{formatAmount(commPerSale * calcDailySales * 365)}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 9. AI TOOLS (WA AUTO-CLOSER, BIO-LINK, STATUS FLYER) */}
          {/* ================================================================ */}
          {activeSection === 'ai_tools' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white">AI Funnel Builders & Status Flyer Generator</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* WA Auto-Closer */}
                <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 space-y-4">
                  <h3 className="text-base font-black text-white">1. WhatsApp Auto-Closer Link</h3>
                  <p className="text-xs text-gray-400">Generates a custom wa.me link so prospects message you with a pre-filled buying request.</p>
                  <input
                    type="text"
                    value={waCloserNumber}
                    onChange={(e) => setWaCloserNumber(e.target.value)}
                    placeholder="Your WhatsApp (e.g. 233596096071)"
                    className="w-full bg-[#141d30] border border-white/10 px-3 py-2.5 rounded-xl text-xs text-white"
                  />
                  <select
                    value={waCloserProduct}
                    onChange={(e) => setWaCloserProduct(e.target.value)}
                    className="w-full bg-[#141d30] border border-white/10 px-3 py-2.5 rounded-xl text-xs text-white"
                  >
                    {INITIAL_PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                  {(() => {
                    const prod = INITIAL_PRODUCTS.find((p) => p.id === waCloserProduct) || INITIAL_PRODUCTS[0];
                    const waUrl = `https://wa.me/${waCloserNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hi ${firstName}! I want to get access to "${prod.title}" by Moses (${userAffiliateCode}). Please send me the checkout link!`
                    )}`;
                    return (
                      <button
                        onClick={() => handleCopy(waUrl, 'wa-closer')}
                        className="w-full py-3 rounded-xl bg-emerald-500 text-black font-black text-xs"
                      >
                        {copiedKey === 'wa-closer' ? '✓ Auto-Closer Link Copied!' : 'Copy WhatsApp Auto-Closer Link'}
                      </button>
                    );
                  })()}
                </div>

                {/* Bio-Link Storefront */}
                <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 space-y-4">
                  <h3 className="text-base font-black text-white">2. Personal Bio-Link Storefront</h3>
                  <p className="text-xs text-gray-400">One link for your TikTok/IG bio displaying all 6 of Moses’s courses coded to {userAffiliateCode}.</p>
                  <input
                    type="text"
                    readOnly
                    value={`${appOrigin}/?store=1&ref=${userAffiliateCode}`}
                    className="w-full bg-[#141d30] border border-white/10 px-3 py-2.5 rounded-xl text-xs text-emerald-300 font-mono"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(`${appOrigin}/?store=1&ref=${userAffiliateCode}`, 'bio-store')}
                      className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-black text-xs"
                    >
                      {copiedKey === 'bio-store' ? 'Copied!' : 'Copy Store URL'}
                    </button>
                    <button
                      onClick={() => setShowBioLinkPreview(true)}
                      className="px-4 py-3 rounded-xl bg-white/10 text-white font-bold text-xs"
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {/* Social Proof Flyer */}
                <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 space-y-4">
                  <h3 className="text-base font-black text-white">3. WhatsApp Status Proof Flyer</h3>
                  <p className="text-xs text-gray-400">Download a verified EarnMega commission flyer with your live earnings ({formatAmount(totalEarningsGHS)}) for your status.</p>
                  <button
                    onClick={handleDownloadStatusFlyer}
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download Status Proof Flyer (PNG)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 10. ABANDONED CHECKOUT LEADS CRM */}
          {/* ================================================================ */}
          {activeSection === 'leads_crm' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">Abandoned Checkout Leads CRM</h2>
                <p className="text-xs text-gray-400">Follow up on WhatsApp with prospects who completed Step 1 of checkout.</p>
              </div>
              <div className="bg-[#0f172a] border border-white/10 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#141d30] text-gray-400 uppercase">
                      <tr>
                        <th className="px-5 py-3.5">Date</th>
                        <th className="px-5 py-3.5">Buyer Lead</th>
                        <th className="px-5 py-3.5">Product</th>
                        <th className="px-5 py-3.5">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {abandonedLeads.map((lead) => (
                        <tr key={lead.id}>
                          <td className="px-5 py-4 font-mono text-gray-400">{lead.createdAt}</td>
                          <td className="px-5 py-4">
                            <div className="font-bold text-white">{lead.fullName}</div>
                            <div className="text-gray-400">{lead.email} • {lead.phone}</div>
                          </td>
                          <td className="px-5 py-4 font-bold text-emerald-400">{lead.productTitle}</td>
                          <td className="px-5 py-4">
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Hi ${lead.fullName}, I noticed you started checking out "${lead.productTitle}" by Moses on EarnMega. Let me know if you need any help completing your access!`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold inline-block"
                            >
                              Recover on WhatsApp
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 11. FINANCIAL SALES LEDGER */}
          {/* ================================================================ */}
          {activeSection === 'ledger' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">Financial Sales & Commission Ledger</h2>
                <p className="text-xs text-gray-400">Every verified Paystack purchase and wallet deposit recorded under {userAffiliateCode}.</p>
              </div>
              <div className="bg-[#0f172a] border border-white/10 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#141d30] text-gray-400 uppercase">
                      <tr>
                        <th className="px-5 py-3.5">Order ID / Date</th>
                        <th className="px-5 py-3.5">Customer</th>
                        <th className="px-5 py-3.5">Product (Creator: Moses)</th>
                        <th className="px-5 py-3.5 text-right">Your Commission</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {transactions.map((tx) => (
                        <tr key={tx.id}>
                          <td className="px-5 py-4 font-mono">
                            <div className="text-white font-bold">{tx.orderUid}</div>
                            <div className="text-gray-500">{tx.date}</div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-bold text-white">{tx.buyerName}</div>
                            <div className="text-gray-400">{tx.buyerEmail}</div>
                          </td>
                          <td className="px-5 py-4 text-gray-200 font-semibold">{tx.productTitle}</td>
                          <td className="px-5 py-4 text-right font-black text-emerald-400">
                            +{formatAmount(tx.commissionGHS)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 12. MY UNLOCKED COURSES */}
          {/* ================================================================ */}
          {activeSection === 'my_courses' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white">My Unlocked Courses & Google Drive Vault</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {INITIAL_PRODUCTS.map((p) => {
                  const unlocked = unlockedProductIds.includes(p.id);
                  return (
                    <div key={p.id} className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-300">
                          Created by Moses
                        </span>
                        <h3 className="text-lg font-black text-white mt-3 mb-1">{p.title}</h3>
                        <p className="text-xs text-gray-400 mb-4">{p.subheadline}</p>
                      </div>
                      <div className="flex gap-2">
                        {unlocked ? (
                          <a
                            href={p.deliveryUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 py-3 rounded-xl bg-emerald-500 text-black font-black text-xs text-center"
                          >
                            Open Course Google Drive ↗
                          </a>
                        ) : (
                          <button
                            onClick={() => openDigitstemCheckoutForProduct(p)}
                            className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-black text-xs"
                          >
                            Unlock Course ({formatAmount(p.priceGHS)})
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setExamProductId(p.id);
                            setActiveSection('exam');
                          }}
                          className="px-4 py-3 rounded-xl bg-white/10 text-white font-bold text-xs"
                        >
                          Take Exam
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 13. CREATOR WHITELIST PORTAL */}
          {/* ================================================================ */}
          {activeSection === 'creator' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h2 className="text-2xl font-black text-white">EarnMega Creator Whitelist Portal</h2>
                <p className="text-xs text-gray-400">Apply to list your own digital course or blueprint alongside Moses’s flagship offers on the EarnMega Marketplace.</p>
              </div>
              {vendorFeedback && (
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                  {vendorFeedback}
                </div>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setVendorFeedback(
                    `✅ Application for "${vendorTitle}" submitted to ${SUPPORT_EMAIL_PRIMARY}! Our QA team will contact you via email or WhatsApp (${SUPPORT_WHATSAPP_DISPLAY}).`
                  );
                  setVendorTitle('');
                  setVendorSalesUrl('');
                  setVendorDesc('');
                }}
                className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 space-y-4"
              >
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Digital Product Title</label>
                  <input type="text" required value={vendorTitle} onChange={(e) => setVendorTitle(e.target.value)} placeholder="e.g. E-Commerce Mastery Blueprint" className="w-full bg-[#141d30] border border-white/10 px-4 py-3 rounded-xl text-xs text-white" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">Proposed Price (GH₵)</label>
                    <input type="number" required value={vendorPrice} onChange={(e) => setVendorPrice(e.target.value)} className="w-full bg-[#141d30] border border-white/10 px-4 py-3 rounded-xl text-xs text-white" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">Sales Page / Delivery Drive URL</label>
                    <input type="url" required value={vendorSalesUrl} onChange={(e) => setVendorSalesUrl(e.target.value)} placeholder="https://..." className="w-full bg-[#141d30] border border-white/10 px-4 py-3 rounded-xl text-xs text-white" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Course Summary & Value Proposition</label>
                  <textarea rows={3} required value={vendorDesc} onChange={(e) => setVendorDesc(e.target.value)} className="w-full bg-[#141d30] border border-white/10 px-4 py-3 rounded-xl text-xs text-white" />
                </div>
                <button type="submit" className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs">
                  Submit Creator Application to {SUPPORT_EMAIL_PRIMARY}
                </button>
              </form>
            </div>
          )}

          {/* ================================================================ */}
          {/* 14. OFFICIAL RULES & REGULATIONS */}
          {/* ================================================================ */}
          {activeSection === 'rules' && (
            <div className="space-y-6 max-w-4xl">
              <h2 className="text-2xl font-black text-white">EarnMega Official Rules, Governance & Payout Charter</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: '1. 50% Instant Commission Attribution',
                    body: 'Every core product created by Moses credits an instant 50% commission to the referring affiliate whose unique code (?ref=EM-XXXX) is locked at checkout.'
                  },
                  {
                    title: '2. Strict Friday Payout Window (GMT)',
                    body: 'All withdrawal requests (minimum GH₵ 90.00) are processed on Fridays via Paystack Transfer to verified Mobile Money, Bank, or USDT TRC20 accounts.'
                  },
                  {
                    title: '3. Annual License & 50% Renewal Discount',
                    body: 'Standard direct enrollment is GH₵ 90.00/year. Active affiliates enjoy a 50% discounted annual renewal rate of GH₵ 45.00/year.'
                  },
                  {
                    title: '4. Anti-Spam & Ethical Marketing Code',
                    body: 'Affiliates must use truthful promotional claims. Fraudulent chargebacks or spam links result in immediate commission clawback.'
                  }
                ].map((r, i) => (
                  <div key={i} className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
                    <h3 className="text-sm font-black text-emerald-400 mb-2">{r.title}</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">{r.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 15. OFFICIAL SUPPORT DESK (earnmegadesk@gmail.com / 0596096071) */}
          {/* ================================================================ */}
          {activeSection === 'support' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h2 className="text-2xl font-black text-white">EarnMega 24/7 Executive Support Desk</h2>
                <p className="text-xs text-gray-400">Direct assistance for payouts, affiliate links, and course access.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <a
                  href={`mailto:${SUPPORT_EMAIL_PRIMARY}`}
                  className="bg-[#0f172a] border border-white/10 hover:border-emerald-500/40 rounded-3xl p-8 text-center transition-all"
                >
                  <Mail className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                  <h3 className="text-base font-black text-white mb-1">Official Support Email</h3>
                  <p className="text-xs font-mono text-emerald-300">{SUPPORT_EMAIL_PRIMARY}</p>
                </a>
                <a
                  href={`https://wa.me/${SUPPORT_WHATSAPP_INTL}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#0f172a] border border-white/10 hover:border-emerald-500/40 rounded-3xl p-8 text-center transition-all"
                >
                  <MessageSquare className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                  <h3 className="text-base font-black text-white mb-1">Official WhatsApp Support</h3>
                  <p className="text-xs font-mono text-amber-300">{SUPPORT_WHATSAPP_DISPLAY}</p>
                </a>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ==================================================================== */}
      {/* MODALS (CHECKOUT, PROMOTE STUDIO, DEPOSIT, RENEWAL, SETTINGS, NOTIFS) */}
      {/* ==================================================================== */}

      {/* 2-Step Checkout Modal */}
      {checkoutStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f172a] w-full max-w-md rounded-3xl overflow-hidden border border-white/10">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#141d30]">
              <h3 className="text-sm font-black text-white">
                {checkoutStep === 1 ? 'Step 1 of 2: Buyer Access Details' : 'Step 2 of 2: Instant Paystack Checkout'}
              </h3>
              <button onClick={() => setCheckoutStep(null)} className="p-1.5 rounded-lg bg-white/5 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            {checkoutStep === 1 ? (
              <form onSubmit={handleCheckoutStep1Next} className="p-6 space-y-4">
                <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-[11px] text-amber-200">
                  Ensure your Email Address is CORRECT and ACTIVE to receive instant course & EarnMega portal access.
                </div>
                <input type="text" required placeholder="Full Name" value={buyerFullName} onChange={(e) => setBuyerFullName(e.target.value)} className="w-full bg-[#141d30] border border-white/10 px-4 py-3 rounded-xl text-xs text-white" />
                <input type="email" required placeholder="Active Email Address" value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)} className="w-full bg-[#141d30] border border-white/10 px-4 py-3 rounded-xl text-xs text-white" />
                <div className="grid grid-cols-3 gap-2">
                  <select value={buyerDialCode} onChange={(e) => setBuyerDialCode(e.target.value)} className="bg-[#141d30] border border-white/10 px-2 py-3 rounded-xl text-xs text-white">
                    <option value="+233">+233 (GH)</option>
                    <option value="+234">+234 (NG)</option>
                    <option value="+254">+254 (KE)</option>
                    <option value="+27">+27 (ZA)</option>
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                  </select>
                  <input type="text" required placeholder="Phone Number" value={buyerPhone} onChange={(e) => setBuyerPhone(e.target.value)} className="col-span-2 bg-[#141d30] border border-white/10 px-4 py-3 rounded-xl text-xs text-white" />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl bg-emerald-500 text-black font-black text-xs">
                  Continue to Step 2 →
                </button>
              </form>
            ) : (
              <div className="p-6 space-y-4">
                <div className="bg-[#141d30] p-4 rounded-2xl border border-white/5">
                  <div className="text-xs font-bold text-white mb-1">{activeSalesPageProduct?.title || 'EarnMega Direct Access'}</div>
                  <div className="text-[11px] text-gray-400 mb-3">Created by Moses • Instant Delivery</div>
                  {!isDirectEnrollmentCheckout && (
                    <label className="flex items-start gap-2.5 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl cursor-pointer mb-3">
                      <input type="checkbox" checked={includeOrderBump} onChange={(e) => setIncludeOrderBump(e.target.checked)} className="mt-0.5" />
                      <span className="text-[11px] text-amber-200 font-bold">
                        Add 1-Click Order Bump: Viral Hook & Closing Script Pack (+GH₵ 80)
                      </span>
                    </label>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <span className="text-xs text-gray-400">Total Payable</span>
                    <span className="text-lg font-black text-emerald-400">
                      {formatAmount((isDirectEnrollmentCheckout ? DIRECT_ENROLLMENT_GHS : (activeSalesPageProduct?.priceGHS || 240)) + (includeOrderBump ? 80 : 0))}
                    </span>
                  </div>
                </div>
                <button onClick={launchPaystackFromStep2} className="w-full py-3.5 rounded-xl bg-emerald-500 text-black font-black text-xs">
                  Pay Now via Paystack
                </button>
                <button onClick={() => completeVerifiedPurchaseRecord(`EM_TEST_${Date.now()}`)} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs">
                  Instant Verify / Test Purchase
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Promote Studio Modal */}
      {promoteModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f172a] w-full max-w-lg rounded-3xl overflow-hidden border border-indigo-500/30 p-6 space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-white">Promote Studio: {promoteModalProduct.title}</h3>
                <span className="text-xs text-emerald-400">Creator: Moses • 50% Commission</span>
              </div>
              <button onClick={() => setPromoteModalProduct(null)} className="p-1.5 rounded-lg bg-white/5 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex bg-[#141d30] border border-white/10 rounded-xl overflow-hidden">
              <input type="text" readOnly value={getUniqueProductAffiliateLink(promoteModalProduct)} className="flex-1 bg-transparent px-3 py-3 text-xs text-emerald-300 font-mono outline-none" />
              <button onClick={() => handleCopy(getUniqueProductAffiliateLink(promoteModalProduct), 'promo-modal')} className="px-4 bg-indigo-600 text-white font-bold text-xs">
                {copiedKey === 'promo-modal' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="flex items-center gap-4 bg-[#141d30] p-4 rounded-2xl">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(getUniqueProductAffiliateLink(promoteModalProduct))}`}
                alt="QR Code"
                className="w-24 h-24 rounded-xl bg-white p-1.5"
              />
              <div className="space-y-2 flex-1">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Check out ${promoteModalProduct.title} by Moses on EarnMega: ${getUniqueProductAffiliateLink(promoteModalProduct)}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-2.5 rounded-xl bg-emerald-500 text-black font-black text-xs text-center"
                >
                  Share to WhatsApp
                </a>
                <button
                  onClick={() => setPromoteModalProduct(null)}
                  className="w-full py-2 rounded-xl bg-white/10 text-white text-xs font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {isDepositModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f172a] w-full max-w-md rounded-3xl overflow-hidden border border-amber-500/30 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-black text-white">Instant Wallet Deposit (GH₵)</h3>
              <button onClick={() => { setIsDepositModalOpen(false); setDepositStep(1); }} className="p-1.5 rounded-lg bg-white/5 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            {depositStep === 1 ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsGeneratingCode(true);
                  setTimeout(() => {
                    setIsGeneratingCode(false);
                    setDepositStep(2);
                  }, 600);
                }}
                className="space-y-4"
              >
                <input
                  type="number"
                  min="1"
                  required
                  placeholder="Amount in GH₵ (e.g. 100)"
                  value={depositAmountGHS}
                  onChange={(e) => setDepositAmountGHS(e.target.value)}
                  className="w-full bg-[#141d30] border border-white/10 px-4 py-3 rounded-xl text-sm text-white"
                />
                <select value={depositMethod} onChange={(e) => setDepositMethod(e.target.value)} className="w-full bg-[#141d30] border border-white/10 px-4 py-3 rounded-xl text-xs text-white">
                  <option value="MOBILE_MONEY">Mobile Money (MTN / Telecel / AT)</option>
                  <option value="PAYSTACK">Paystack Instant Checkout</option>
                </select>
                <button type="submit" className="w-full py-3.5 rounded-xl bg-amber-500 text-black font-black text-xs">
                  {isGeneratingCode ? 'Generating Verification Code...' : 'Continue to Verification'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleConfirmDeposit} className="space-y-4">
                <p className="text-xs text-gray-300">Enter any 6-digit verification code to confirm your GH₵ {Number(depositAmountGHS).toFixed(2)} deposit:</p>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="123456"
                  value={depositVerifyCode}
                  onChange={(e) => setDepositVerifyCode(e.target.value)}
                  className="w-full bg-[#141d30] border border-white/10 px-4 py-3 rounded-xl text-center text-lg font-mono text-white"
                />
                <button type="submit" className="w-full py-3.5 rounded-xl bg-emerald-500 text-black font-black text-xs">
                  Confirm & Credit Wallet
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Contest Entry Modal */}
      {contestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <form onSubmit={handleContestSubmit} className="bg-[#0f172a] w-full max-w-md rounded-3xl border border-white/10 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-black text-white">
                {contestModalOpen === 'viral_100k' ? '100K Views Video Claim' : 'Sales Sprint Registration'}
              </h3>
              <button type="button" onClick={() => setContestModalOpen(null)} className="p-1.5 rounded-lg bg-white/5 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <input type="text" required placeholder="Full Name" value={contestFullName} onChange={(e) => setContestFullName(e.target.value)} className="w-full bg-[#141d30] border border-white/10 px-4 py-3 rounded-xl text-xs text-white" />
            <input type="text" required placeholder="WhatsApp Phone Number" value={contestPhone} onChange={(e) => setContestPhone(e.target.value)} className="w-full bg-[#141d30] border border-white/10 px-4 py-3 rounded-xl text-xs text-white" />
            {contestModalOpen === 'viral_100k' && (
              <>
                <input type="text" required placeholder="TikTok / IG Handle (@...)" value={contestSocialHandle} onChange={(e) => setContestSocialHandle(e.target.value)} className="w-full bg-[#141d30] border border-white/10 px-4 py-3 rounded-xl text-xs text-white" />
                <input type="url" required placeholder="Public Video URL" value={contestVideoUrl} onChange={(e) => setContestVideoUrl(e.target.value)} className="w-full bg-[#141d30] border border-white/10 px-4 py-3 rounded-xl text-xs text-white" />
              </>
            )}
            <input type="text" required placeholder="MoMo / Bank Payout Details" value={contestBankMomoDetails} onChange={(e) => setContestBankMomoDetails(e.target.value)} className="w-full bg-[#141d30] border border-white/10 px-4 py-3 rounded-xl text-xs text-white" />
            <button type="submit" className="w-full py-3.5 rounded-xl bg-emerald-500 text-black font-black text-xs">
              Submit to {SUPPORT_EMAIL_PRIMARY}
            </button>
          </form>
        </div>
      )}

      {/* 1-Year License Renewal Gate Modal */}
      {(timeRemaining.expired || isRenewalModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="bg-[#0f172a] w-full max-w-md rounded-3xl border border-rose-500/40 p-6 text-center space-y-4">
            <Lock className="w-12 h-12 text-rose-400 mx-auto" />
            <h3 className="text-xl font-black text-white">
              {timeRemaining.expired ? 'Annual Affiliate License Expired' : 'Extend Annual Affiliate License'}
            </h3>
            <p className="text-xs text-gray-400">
              First-time registration is GH₵ 90.00/yr. Renew for another 365 days at the 50% discounted partner rate of <strong>GH₵ 45.00</strong>.
            </p>
            <button
              onClick={() => {
                setLicenseActivatedAt(Date.now());
                setLicenseExpiresAt(Date.now() + 365 * 24 * 60 * 60 * 1000);
                setIsRenewalModalOpen(false);
                alert('✅ License renewed for 365 days!');
              }}
              className="w-full py-3.5 rounded-xl bg-emerald-500 text-black font-black text-xs"
            >
              Renew +1 Year Now (GH₵ 45.00)
            </button>
            {!timeRemaining.expired && (
              <button onClick={() => setIsRenewalModalOpen(false)} className="w-full py-2.5 text-xs text-gray-400">
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

      {/* Profile Sheet Modal */}
      {isProfileSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0f172a] w-full max-w-sm rounded-3xl border border-white/10 p-4 space-y-1">
            <div className="flex justify-between items-center px-3 py-2 border-b border-white/10 mb-2">
              <span className="font-black text-sm text-white">Account Settings</span>
              <button onClick={() => setIsProfileSheetOpen(false)}>
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            {[
              { id: 'profile', label: 'Profile & Contact Details', icon: User },
              { id: 'kyc', label: 'KYC & Address Verification', icon: FileText },
              { id: 'security', label: 'Password & Security', icon: Key },
              { id: '2fa', label: '2FA Payout Protection', icon: Smartphone },
              { id: 'support', label: 'Support Desk (0596096071)', icon: HelpCircle }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setIsProfileSheetOpen(false);
                    setActiveSettingsModal(item.id as any);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-xs font-bold text-gray-200"
                >
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Settings Modal */}
      {activeSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f172a] w-full max-w-md rounded-3xl border border-white/10 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-black text-white uppercase">{activeSettingsModal} Settings</h3>
              <button onClick={() => setActiveSettingsModal(null)}>
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            {activeSettingsModal === 'support' ? (
              <div className="space-y-3 text-center py-4">
                <p className="text-xs text-gray-300">Official EarnMega Support Channels:</p>
                <a href={`mailto:${SUPPORT_EMAIL_PRIMARY}`} className="block py-3 rounded-xl bg-[#141d30] text-emerald-400 font-mono text-xs font-bold">
                  {SUPPORT_EMAIL_PRIMARY}
                </a>
                <a href={`https://wa.me/${SUPPORT_WHATSAPP_INTL}`} target="_blank" rel="noreferrer" className="block py-3 rounded-xl bg-emerald-500 text-black font-black text-xs">
                  WhatsApp: {SUPPORT_WHATSAPP_DISPLAY}
                </a>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setCertificateStudentName(`${firstName} ${lastName}`.trim());
                  setActiveSettingsModal(null);
                  setSettingsSavedBanner('✅ EarnMega Profile & KYC settings saved!');
                  setTimeout(() => setSettingsSavedBanner(null), 3000);
                }}
                className="space-y-3"
              >
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="bg-[#141d30] border border-white/10 px-3 py-2.5 rounded-xl text-xs text-white" />
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="bg-[#141d30] border border-white/10 px-3 py-2.5 rounded-xl text-xs text-white" />
                </div>
                <input type="email" value={userEmail} readOnly className="w-full bg-black/40 border border-amber-500/30 px-3 py-2.5 rounded-xl text-xs text-gray-400" />
                <input type="text" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} placeholder="Phone" className="w-full bg-[#141d30] border border-white/10 px-3 py-2.5 rounded-xl text-xs text-white" />
                <input type="text" value={kycIdNumber} onChange={(e) => setKycIdNumber(e.target.value)} placeholder="National ID / Ghana Card" className="w-full bg-[#141d30] border border-white/10 px-3 py-2.5 rounded-xl text-xs text-white" />
                <button type="submit" className="w-full py-3.5 rounded-xl bg-emerald-500 text-black font-black text-xs">
                  Save Settings
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Notifications Drawer */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#0f172a] h-full border-l border-white/10 p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h3 className="font-black text-sm text-white">Notifications</h3>
                <button onClick={() => setIsNotificationsOpen(false)}>
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="space-y-3 mt-4">
                {notificationsList.map((n) => (
                  <div key={n.id} className="p-3.5 rounded-2xl bg-[#141d30] border border-white/5">
                    <div className="text-xs font-bold text-white">{n.title}</div>
                    <p className="text-[11px] text-gray-400 mt-1">{n.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })))}
              className="w-full py-3 rounded-xl bg-white/10 text-xs font-bold text-white"
            >
              Mark All Read
            </button>
          </div>
        </div>
      )}

      {/* Floating AI Business Brain Bot */}
      {isAiBotOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 bg-[#0f172a] border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-3.5 bg-[#141d30] border-b border-white/10 flex justify-between items-center">
            <span className="text-xs font-black text-emerald-400">🤖 EarnMega AI Business Brain</span>
            <button onClick={() => setIsAiBotOpen(false)}>
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="h-56 overflow-y-auto p-3.5 space-y-2.5 text-xs">
            {aiMessages.map((m, i) => (
              <div key={i} className={`p-2.5 rounded-xl ${m.sender === 'bot' ? 'bg-[#141d30] text-gray-200' : 'bg-emerald-500 text-black font-bold ml-6'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAiBotSend();
            }}
            className="p-2.5 border-t border-white/10 flex gap-2"
          >
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ask EarnMega AI..."
              className="flex-1 bg-[#141d30] px-3 py-2 rounded-xl text-xs text-white focus:outline-none"
            />
            <button type="submit" className="px-3 py-2 rounded-xl bg-emerald-500 text-black font-black text-xs">
              Send
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsAiBotOpen(!isAiBotOpen)}
        className="fixed bottom-20 lg:bottom-6 right-4 z-40 w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-black shadow-lg shadow-emerald-500/30 flex items-center justify-center text-lg"
      >
        🤖
      </button>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090e1a]/95 backdrop-blur-md border-t border-white/10 h-16 px-2 flex items-center justify-around">
        {[
          { id: 'dashboard', label: 'Home', icon: BarChart3 },
          { id: 'marketplace', label: 'Market', icon: ShoppingBag },
          { id: 'links', label: 'Links', icon: Share2 },
          { id: 'exam', label: 'Exam', icon: Award },
          { id: 'payouts', label: 'Payouts', icon: DollarSign },
          { id: 'support', label: 'Support', icon: HelpCircle }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as ActiveSection)}
              className={`flex flex-col items-center justify-center gap-1 ${active ? 'text-emerald-400 font-bold' : 'text-gray-400'}`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
