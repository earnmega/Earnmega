"use client";

import Link from 'next/link';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { supabase } from '@/utils/supabase'; // Adjust this import path to match your Supabase config if needed
import { 
  ShieldCheck, Sparkles, TrendingUp, DollarSign, Copy, Check, ExternalLink, 
  Award, BookOpen, Send, Zap, ChevronRight, Lock, Unlock, ShoppingBag, 
  BarChart3, Users, Calculator, Share2, HelpCircle, ArrowUpRight, Clock, 
  CheckCircle2, AlertCircle, Menu, X, Bell, User, Search, Star, QrCode, 
  Code, LogOut, Settings, Key, Smartphone, FileText, Trophy, Video, 
  MessageSquare, Globe, Phone, Mail, Download, RefreshCcw, Eye, Layers, 
  Briefcase, CreditCard, ArrowRight, Folder, RefreshCw, Activity, Crown,
  LayoutDashboard
} from 'lucide-react';

// ============================================================================
// PLATFORM CONFIGURATION & CONSTANTS
// ============================================================================
const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";
const DIRECT_ENROLLMENT_GHS = 90.00;

const SUPPORT_EMAIL = "earnmegadesk@gmail.com";
const SUPPORT_WHATSAPP = "0596096071";

// ============================================================================
// WORLDWIDE CURRENCIES
// ============================================================================
const GLOBAL_CURRENCIES: Record<string, { code: string; symbol: string; rateToGHS: number; region: string }> = {
  GHS: { code: 'GHS', symbol: 'GH₵', rateToGHS: 1.0, region: 'Africa' },
  NGN: { code: 'NGN', symbol: '₦', rateToGHS: 0.010, region: 'Africa' },
  KES: { code: 'KES', symbol: 'KSh', rateToGHS: 0.124, region: 'Africa' },
  ZAR: { code: 'ZAR', symbol: 'R', rateToGHS: 0.88, region: 'Africa' },
  USD: { code: 'USD', symbol: '$', rateToGHS: 16.00, region: 'Global' },
  GBP: { code: 'GBP', symbol: '£', rateToGHS: 20.20, region: 'Global' },
  EUR: { code: 'EUR', symbol: '€', rateToGHS: 17.30, region: 'Global' },
};

// ============================================================================
// MARKETPLACE PRODUCTS (OWNED BY MOSES)
// ============================================================================
export interface MarketplaceProduct {
  id: string; shortCode: string; title: string; creator: string; category: string;
  badges: string[]; rating: number; epcUSD: number; avgConvRate: string; priceGHS: number;
  commissionPercent: number; deliveryUrl: string; headline: string; subheadline: string;
  bullets: string[]; swipeCopy: { tiktok: string[]; whatsapp: string[]; };
}

const INITIAL_PRODUCTS: MarketplaceProduct[] = [
  {
    id: 'prod_faceless_ai',
    shortCode: 'FACELESS-AI',
    title: 'The AI Faceless Video Engine',
    creator: 'Moses',
    category: 'AI & Tech',
    badges: ['TOP PICK', 'HIGH CONVERTING'],
    rating: 4.9, epcUSD: 1.45, avgConvRate: '6.8%', priceGHS: 240.00, commissionPercent: 50,
    deliveryUrl: 'https://drive.google.com/drive/folders/1IhgiK8DYCM8d',
    headline: 'Build, Automate & Monetize High-Retention Faceless Channels',
    subheadline: 'The exact workflow to generate viral scripts and realistic voiceovers in under 20 minutes.',
    bullets: ['100% Free AI Tool Stack', 'Copy-paste viral hook scripts', 'Includes instant EarnMega Affiliate Portal Access'],
    swipeCopy: {
      tiktok: ['How creators generate automated income with faceless AI videos without filming themselves. Link in bio! #aivideo #earnmega'],
      whatsapp: ['Hey! I got access to The AI Faceless Video Engine by Moses. Run profitable TikTok channels with AI. Check it out: {LINK}']
    }
  },
  {
    id: 'prod_mmm_system',
    shortCode: 'MMM-ENGINE',
    title: 'The Mega Messaging Machine (MMM)',
    creator: 'Moses',
    category: 'Sales',
    badges: ['HOT', 'PREMIUM'],
    rating: 4.9, epcUSD: 1.38, avgConvRate: '6.4%', priceGHS: 240.00, commissionPercent: 50,
    deliveryUrl: 'https://drive.google.com/drive/folders/1o7KrzMponCFx',
    headline: 'Turn Every WhatsApp & DM Into Predictable Daily Cashflow',
    subheadline: 'High-converting closing scripts engineered to turn cold prospects into instant buyers.',
    bullets: ['45+ objection-crushing scripts', '24-hour status storytelling sequences', 'Full EarnMega Command Centre access'],
    swipeCopy: {
      tiktok: ['Why prospects ghost you after asking "How much?" and the script that closes 8 out of 10 leads! #sales #earnmega'],
      whatsapp: ['Tired of people asking for prices and disappearing? The Mega Messaging Machine by Moses fixes this immediately: {LINK}']
    }
  },
  {
    id: 'prod_day_trading',
    shortCode: 'TRADING-ROADMAP',
    title: "Day Trading Beginner's Roadmap",
    creator: 'Moses',
    category: 'Trading',
    badges: ['HIGH CONVERTING'],
    rating: 4.8, epcUSD: 1.15, avgConvRate: '5.9%', priceGHS: 192.00, commissionPercent: 50,
    deliveryUrl: 'https://drive.google.com/drive/folders/1zbDb8kAk',
    headline: 'Master Institutional Chart Structure & Sniper Entries',
    subheadline: 'Stop blowing trading accounts. Learn the exact technical checklist used by consistent traders.',
    bullets: ['Candlestick anatomy & liquidity sweeps', 'Strict 1% risk calculator rules', 'Full EarnMega Portal access'],
    swipeCopy: {
      tiktok: ["Stop blowing trading accounts. Here is the Day Trading Roadmap every new trader needs! #daytrading #earnmega"],
      whatsapp: ["Learn day trading the right way without gambling your capital. Study Moses' Day Trading Roadmap: {LINK}"]
    }
  }
];

// ============================================================================
// MAIN PREMIUM COMPONENT (app/page.tsx)
// ============================================================================
export default function EarnMegaExecutiveHub({ currentProfile }: { currentProfile?: any }) {
  type ActiveSection = 'dashboard' | 'marketplace' | 'links' | 'vault' | 'exam' | 'contests' | 'payouts' | 'ledger' | 'crm' | 'calculator' | 'support';
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const [selectedCurrency, setSelectedCurrency] = useState('GHS');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Real or Simulated State (Replace with Supabase fetch logic as needed)
  const [firstName] = useState('Executive');
  const [userCode] = useState('EM-77X9Q');
  const [availableBalanceGHS] = useState(1450.00);
  const [totalEarningsGHS] = useState(3250.00);
  const [salesCount] = useState(14);
  const [unreadNotifCount] = useState(3);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const formatMoney = (amountGHS: number) => {
    const rate = GLOBAL_CURRENCIES[selectedCurrency].rateToGHS;
    return `${GLOBAL_CURRENCIES[selectedCurrency].symbol}${(amountGHS / rate).toFixed(2)}`;
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // --------------------------------------------------------------------------
  // UI: SIDEBAR (DESKTOP)
  // --------------------------------------------------------------------------
  const Sidebar = () => (
    <div className={`fixed lg:static inset-y-0 left-0 w-72 bg-[#090e17] border-r border-white/5 z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col h-full`}>
      <div className="p-6 border-b border-white/5 flex items-center justify-between lg:justify-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-black text-[#090e17] text-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            EM
          </div>
          <div>
            <h1 className="font-black text-xl text-white tracking-wide leading-tight">EARNMEGA</h1>
            <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">Affiliate Hub</span>
          </div>
        </div>
        <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 no-scrollbar">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-3 mb-3 block">Main Console</span>
          <div className="space-y-1">
            {[
              { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
              { id: 'marketplace', label: 'Premium Marketplace', icon: ShoppingBag },
              { id: 'links', label: 'Link Manager & QR', icon: Share2 },
              { id: 'vault', label: 'Promotion Vault', icon: MessageSquare },
            ].map(item => (
              <button key={item.id} onClick={() => { setActiveSection(item.id as any); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${activeSection === item.id ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner' : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'}`}>
                <item.icon className="w-4 h-4" /> {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-3 mb-3 block">Growth & Scale</span>
          <div className="space-y-1">
            {[
              { id: 'crm', label: 'Abandoned Leads CRM', icon: Users },
              { id: 'contests', label: 'Rewards & Contests', icon: Trophy },
              { id: 'calculator', label: 'Profit Simulator', icon: Calculator },
              { id: 'exam', label: 'Certification Academy', icon: Award },
            ].map(item => (
              <button key={item.id} onClick={() => { setActiveSection(item.id as any); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${activeSection === item.id ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner' : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'}`}>
                <item.icon className="w-4 h-4" /> {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-3 mb-3 block">Finance & Support</span>
          <div className="space-y-1">
            {[
              { id: 'payouts', label: 'Friday Withdrawals', icon: DollarSign },
              { id: 'ledger', label: 'Sales Ledger', icon: FileText },
              { id: 'support', label: 'Agent Support', icon: HelpCircle },
            ].map(item => (
              <button key={item.id} onClick={() => { setActiveSection(item.id as any); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${activeSection === item.id ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-inner' : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'}`}>
                <item.icon className="w-4 h-4" /> {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-white/5 bg-[#0b121c]">
        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/30">
            {firstName.charAt(0)}
          </div>
          <div className="flex-1 overflow-hidden">
            <span className="text-sm font-bold text-white block truncate">{firstName} (Pro)</span>
            <span className="text-[10px] text-emerald-400 font-mono block">ID: {userCode}</span>
          </div>
          <LogOut className="w-4 h-4 text-slate-500 hover:text-rose-400 transition-colors" />
        </div>
      </div>
    </div>
  );

  // --------------------------------------------------------------------------
  // UI: TOP HEADER
  // --------------------------------------------------------------------------
  const Header = () => (
    <header className="h-20 bg-[#090e17]/80 backdrop-blur-xl border-b border-white/5 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3 lg:hidden">
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-slate-300 hover:text-white">
          <Menu className="w-6 h-6" />
        </button>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-black text-[#090e17]">EM</div>
      </div>
      
      <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 w-96 max-w-md focus-within:border-emerald-500/50 focus-within:bg-white/10 transition-all">
        <Search className="w-4 h-4 text-slate-400 mr-2" />
        <input type="text" placeholder="Search EarnMega ecosystem..." className="bg-transparent border-none text-sm text-white focus:outline-none w-full placeholder-slate-500" />
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 hover:bg-white/10 transition-colors">
          <Globe className="w-4 h-4 text-emerald-400" />
          <select value={selectedCurrency} onChange={e => setSelectedCurrency(e.target.value)} className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer">
            {Object.keys(GLOBAL_CURRENCIES).map(c => <option key={c} value={c} className="bg-[#090e17]">{c} ({GLOBAL_CURRENCIES[c].symbol})</option>)}
          </select>
        </div>
        
        <button className="relative p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-all hover:bg-white/10">
          <Bell className="w-4 h-4" />
          {unreadNotifCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-black text-white border-2 border-[#090e17]">
              {unreadNotifCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );

  // --------------------------------------------------------------------------
  // RENDER MAIN WORKSPACE
  // --------------------------------------------------------------------------
  return (
    <div className="flex h-screen bg-[#070b12] text-slate-200 font-sans overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
      
      <Sidebar />
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>}

      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Dynamic Background Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none"></div>

        <Header />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 pb-24 lg:pb-8 relative z-10 custom-scrollbar">
          
          {/* ========================================================= */}
          {/* DASHBOARD VIEW */}
          {/* ========================================================= */}
          {activeSection === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">Executive Dashboard</h2>
                  <p className="text-slate-400 mt-1">Welcome back. The EarnMega engine is running flawlessly.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                   <span className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-inner">
                     <Crown className="w-3.5 h-3.5" /> Gold Partner
                   </span>
                   <button onClick={() => setActiveSection('payouts')} className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#090e17] text-sm font-black rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2">
                     <DollarSign className="w-4 h-4" /> Withdraw Funds
                   </button>
                </div>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Available Balance', val: formatMoney(availableBalanceGHS), sub: 'Ready for Friday Payout', icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
                  { label: 'Lifetime Earnings', val: formatMoney(totalEarningsGHS), sub: '50% Instant Commissions', icon: TrendingUp, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
                  { label: 'Verified Conversions', val: salesCount, sub: 'Paystack Settled', icon: CheckCircle2, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
                  { label: 'Link Clicks', val: '1,284', sub: '9.4% Conv. Rate', icon: Activity, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-md border border-white/5 rounded-3xl p-6 hover:bg-white/10 transition-colors group relative overflow-hidden">
                    <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} blur-[40px] rounded-full`}></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div className={`w-10 h-10 rounded-2xl ${stat.bg} border ${stat.border} flex items-center justify-center`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-1 group-hover:translate-x-1 transition-transform relative z-10">{stat.val}</h3>
                    <p className="text-xs text-slate-400 font-medium relative z-10">{stat.label}</p>
                    <div className="mt-4 pt-4 border-t border-white/5 relative z-10 flex items-center gap-1.5">
                       <CheckCircle2 className={`w-3 h-3 ${stat.color}`} />
                       <p className="text-[10px] text-slate-500 font-mono uppercase">{stat.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Analytics & Leaderboard Row */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white/5 backdrop-blur-md border border-white/5 rounded-3xl p-6 lg:p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2"><BarChart3 className="w-5 h-5 text-emerald-400"/> Revenue Analytics</h3>
                    <select className="bg-[#090e17] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300 outline-none focus:border-emerald-500/50">
                      <option>Last 7 Days</option>
                      <option>This Month</option>
                    </select>
                  </div>
                  
                  {/* Simulated Chart */}
                  <div className="h-56 flex items-end gap-3 justify-between px-2">
                    {[40, 70, 45, 90, 60, 100, 80].map((h, i) => (
                      <div key={i} className="w-full bg-[#090e17] rounded-t-xl relative group border border-white/5 border-b-0 overflow-hidden">
                         <div className="absolute bottom-0 w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-xl transition-all duration-1000 opacity-80 group-hover:opacity-100" style={{ height: `${h}%` }}></div>
                         <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white text-[#090e17] text-[10px] font-bold px-2 py-1 rounded shadow-lg z-20 whitespace-nowrap">GH₵{h*10}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-[10px] text-slate-500 font-mono uppercase font-bold px-2">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 blur-[50px] pointer-events-none"></div>
                  <h3 className="text-lg font-bold text-white mb-1 relative z-10 flex items-center gap-2"><Trophy className="w-5 h-5 text-amber-400"/> Top Affiliates</h3>
                  <p className="text-xs text-slate-400 mb-6 relative z-10">Global EarnMega Leaderboard (Weekly)</p>
                  
                  <div className="space-y-3 relative z-10 flex-1">
                    {[
                      { name: 'Kweku A.', rev: 'GH₵ 8,450', rank: 1, color: 'text-amber-400', bg: 'bg-amber-400/10' },
                      { name: 'Sarah J.', rev: 'GH₵ 6,120', rank: 2, color: 'text-slate-300', bg: 'bg-slate-300/10' },
                      { name: 'Moses (You)', rev: 'GH₵ 3,250', rank: 3, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                      { name: 'David M.', rev: 'GH₵ 2,900', rank: 4, color: 'text-orange-400', bg: 'bg-orange-400/10' },
                    ].map((user, i) => (
                      <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${user.name.includes('You') ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-[#090e17]/50 border-white/5 hover:border-white/10'} transition-colors`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black ${user.bg} ${user.color} border border-current/20`}>{user.rank}</div>
                          <span className={`text-sm font-bold ${user.name.includes('You') ? 'text-emerald-400' : 'text-slate-200'}`}>{user.name}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-300">{user.rev}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MARKETPLACE VIEW */}
          {/* ========================================================= */}
          {activeSection === 'marketplace' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">Premium Marketplace</h2>
                  <p className="text-slate-400 mt-1">High-converting digital assets created by <strong className="text-emerald-400">Moses</strong>.</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 {INITIAL_PRODUCTS.map(p => (
                   <div key={p.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:border-emerald-500/40 hover:bg-white/10 transition-all flex flex-col group relative overflow-hidden">
                     <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-all pointer-events-none"></div>
                     
                     <div className="flex flex-wrap gap-2 mb-5 relative z-10">
                       {p.badges.map(b => (
                         <span key={b} className={`text-[10px] font-black px-2.5 py-1 rounded-lg border ${b.includes('TOP PICK') || b.includes('PREMIUM') ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                           {b}
                         </span>
                       ))}
                     </div>
                     
                     <h3 className="text-xl font-bold text-white mb-2 relative z-10 leading-snug">{p.title}</h3>
                     <p className="text-xs text-slate-400 mb-6 relative z-10">Creator: <span className="text-emerald-400 font-medium">Moses</span></p>
                     
                     <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                        <div className="bg-[#090e17] p-3 rounded-2xl border border-white/5">
                          <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Selling Price</span>
                          <span className="text-sm font-black text-white">{formatMoney(p.priceGHS)}</span>
                        </div>
                        <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20">
                          <span className="text-[10px] text-emerald-500 uppercase font-bold block mb-1">Your Split ({p.commissionPercent}%)</span>
                          <span className="text-sm font-black text-emerald-400">{formatMoney(p.priceGHS * (p.commissionPercent/100))}</span>
                        </div>
                     </div>
                     
                     <div className="mt-auto pt-4 relative z-10 grid grid-cols-2 gap-3">
                        <button className="col-span-2 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all">
                          Promote Product
                        </button>
                        <button className="py-2.5 bg-[#090e17] hover:bg-white/5 border border-white/10 text-white text-xs font-bold rounded-xl transition-all">
                          View Sales Page
                        </button>
                        <button className="py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all">
                          Get Link
                        </button>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SUPPORT / HELP DESK VIEW */}
          {/* ========================================================= */}
          {activeSection === 'support' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
               <div className="text-center mb-10">
                  <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                    <LifeBuoy className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h2 className="text-3xl font-black text-white tracking-tight">EarnMega Support Desk</h2>
                  <p className="text-slate-400 mt-2">Available 24/7 for affiliate inquiries, payouts, and platform assistance.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <a href={`mailto:${SUPPORT_EMAIL}`} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-indigo-500/30 transition-all text-center group">
                   <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                     <Mail className="w-8 h-8 text-indigo-400" />
                   </div>
                   <h3 className="font-bold text-white mb-2">Email Support</h3>
                   <p className="text-sm font-mono text-slate-400">{SUPPORT_EMAIL}</p>
                 </a>

                 <a href={`https://wa.me/${SUPPORT_WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-[#25D366]/30 transition-all text-center group">
                   <div className="w-16 h-16 bg-[#25D366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                     <MessageSquare className="w-8 h-8 text-[#25D366]" />
                   </div>
                   <h3 className="font-bold text-white mb-2">WhatsApp Direct</h3>
                   <p className="text-sm font-mono text-slate-400">{SUPPORT_WHATSAPP}</p>
                 </a>
               </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* FALLBACK FOR OTHER PREMIUM SECTIONS */}
          {/* ========================================================= */}
          {['links', 'vault', 'exam', 'contests', 'payouts', 'ledger', 'crm', 'calculator'].includes(activeSection) && (
            <div className="h-[70vh] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 px-4">
               <div className="relative">
                 <div className="absolute inset-0 bg-emerald-500/20 blur-[50px] rounded-full"></div>
                 <div className="w-24 h-24 bg-[#090e17] border border-white/10 rounded-3xl flex items-center justify-center mb-6 shadow-2xl relative z-10 rotate-3">
                   <Rocket className="w-10 h-10 text-emerald-400 -rotate-3" />
                 </div>
               </div>
               <h2 className="text-3xl md:text-4xl font-black text-white mb-3 capitalize tracking-tight">{activeSection} Module</h2>
               <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
                 This premium module is active within the EarnMega ecosystem. To view the fully populated data, navigate to the <strong className="text-white">Dashboard</strong> or <strong className="text-white">Marketplace</strong>.
               </p>
               <button onClick={() => setActiveSection('dashboard')} className="mt-8 px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold transition-all flex items-center gap-2">
                 <LayoutDashboard className="w-4 h-4" /> Return to Dashboard
               </button>
            </div>
          )}

        </main>
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/* UI: MOBILE BOTTOM NAV (Hidden on desktop) */}
      {/* -------------------------------------------------------------------------- */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#090e17]/90 backdrop-blur-xl border-t border-white/10 h-[72px] px-2 flex items-center justify-around pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
         {[
            { id: "dashboard", icon: LayoutDashboard, label: "Home" },
            { id: "marketplace", icon: ShoppingBag, label: "Market" },
            { id: "links", icon: Share2, label: "Links" },
            { id: "contests", icon: Trophy, label: "Rewards" },
            { id: "support", icon: HelpCircle, label: "Support" },
         ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as ActiveSection)}
              className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-all ${activeSection === tab.id ? "text-emerald-400" : "text-slate-500 hover:text-slate-300"}`}
            >
              <tab.icon className={`w-5 h-5 ${activeSection === tab.id ? "scale-110 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" : ""}`} />
              <span className={`text-[9px] font-bold tracking-wide ${activeSection === tab.id ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>{tab.label}</span>
              {activeSection !== tab.id && <div className="h-1"></div> /* Spacer */}
            </button>
         ))}
      </nav>
    </div>
  );
}
