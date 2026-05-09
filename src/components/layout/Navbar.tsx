"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  FlaskConical,
  ArrowRight,
  Search,
  Package,
  Phone,
  Loader2,
  Grid3x3,
  ChevronRight,
} from "lucide-react";
import { NAV_LINKS, CATEGORY_ICONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useProductStore } from "@/lib/store/productStore";
import type { Product } from "@/types";
import { CATEGORY_NAMES, PRODUCT_CATEGORIES } from "@/lib/constants";
// ── Types & constants ─────────────────────────────────────────────────────────
interface SearchResult {
  id: string;
  name: string;
  slug: string;
  category: string;
  image_url: string;
  short_description: string;
}

const SERVICE_QUICK = [
  { label: "Turnkey Lab Projects", href: "/services#turnkey", icon: "🔬" },
  { label: "Multi-Vendor Support", href: "/services#multivendor", icon: "⚙️" },
  { label: "Service Contracts", href: "/services#contracts", icon: "📋" },
  { label: "Training & Workshop", href: "/services#training", icon: "🎓" },
];

const MENU_CATEGORIES = CATEGORY_NAMES;

// ── ProductsMegaMenu ──────────────────────────────────────────────────────────
interface MegaMenuProps {
  products: Product[];
  onClose: () => void;
}

function ProductsMegaMenu({ products, onClose }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(
    null,
  );
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const cancelClose = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
  };
  const scheduleClose = () => {
    closeTimeout.current = setTimeout(onClose, 180);
  };

  // Subcategory names always from constants — never from product data
  const subcategoryKeys: readonly string[] =
    PRODUCT_CATEGORIES.find((c) => c.name === activeCategory)?.subcategories ??
    [];

  // Products grouped by subcategory (for Col 3 count + listing)
  const categoryProducts = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : [];

  const grouped = categoryProducts.reduce(
    (acc, product) => {
      const key = product.subcategory || "Other";
      if (!acc[key]) acc[key] = [];
      acc[key].push(product);
      return acc;
    },
    {} as Record<string, Product[]>,
  );

  const subcategoryProducts = activeSubcategory
    ? (grouped[activeSubcategory] ?? [])
    : [];

  return (
    <motion.div
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full pt-2 z-50"
      style={{ left: "50%", transform: "translateX(-50%)" }}
    >
      <div className="flex bg-white rounded-2xl shadow-[0_24px_64px_rgba(18,81,163,0.16)] overflow-hidden">
        {/* ── Col 1: Categories ── */}
        <div className="w-88 flex flex-col border-r border-[rgba(18,81,163,0.07)]">
          <div className="h-0.5 bg-gradient-to-r from-[#1251A3] to-[#0891B2]" />
          <div
            className="overflow-y-auto py-1.5 flex-1 scrollbar-thin"
            style={{ maxHeight: 420 }}
          >
            <p className="px-3.5 pt-2 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-[#A0B0C8]">
              Categories
            </p>
            {MENU_CATEGORIES.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onMouseEnter={() => {
                    setActiveCategory(cat);
                    setActiveSubcategory(null);
                  }}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-[14px] font-medium transition-all duration-150",
                    isActive
                      ? "bg-[#1251A3] text-white"
                      : "text-[#3D5276] hover:bg-[rgba(18,81,163,0.06)] hover:text-[#1251A3]",
                  )}
                >
                  {/* <span className="text-[13px] shrink-0">
                    {CATEGORY_ICONS[cat] ?? "🔬"}
                  </span> */}
                  <span className="truncate flex-1 leading-tight">{cat}</span>
                  <ChevronRight
                    size={11}
                    className={cn(
                      "shrink-0 transition-opacity",
                      isActive ? "opacity-70 text-white" : "opacity-20",
                    )}
                  />
                </button>
              );
            })}
          </div>
          <div className="px-3.5 py-2.5 border-t border-[rgba(18,81,163,0.07)]">
            <Link
              href="/products"
              onClick={onClose}
              className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#1251A3] hover:underline"
            >
              <Grid3x3 size={12} /> All Products
            </Link>
          </div>
        </div>

        {/* ── Col 2: Subcategories — always from constants ── */}
        <div
          className={cn(
            "border-r border-[rgba(18,81,163,0.07)] flex flex-col transition-all duration-200 overflow-hidden",
            activeCategory ? "w-58 opacity-100" : "w-0 opacity-0",
          )}
        >
          <div className="h-0.5 bg-gradient-to-r from-[#0891B2] to-[#22D3EE]" />
          <div
            className="overflow-y-auto py-1.5 flex-1"
            style={{ maxHeight: 420, minWidth: 192 }}
          >
            <p className="px-3.5 pt-2 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-[#A0B0C8]">
              Subcategories
            </p>
            {subcategoryKeys.map((sub) => {
              const isActive = sub === activeSubcategory;
              const count = grouped[sub]?.length ?? 0;
              return (
                <button
                  key={sub}
                  onMouseEnter={() => setActiveSubcategory(sub)}
                  className={cn(
                    "w-full flex items-center justify-between gap-2 px-3.5 py-2 text-[14px] transition-all duration-150",
                    isActive
                      ? "bg-[rgba(18,81,163,0.08)] text-[#1251A3] font-semibold"
                      : "text-[#3D5276] hover:bg-[rgba(18,81,163,0.05)] hover:text-[#1251A3]",
                  )}
                >
                  <span className="truncate flex-1 leading-tight text-left">
                    {sub}
                  </span>
                  <span className="flex items-center gap-1 shrink-0">
                    {count > 0 && (
                      <span className="text-[10px] text-[#A0B0C8] font-semibold">
                        {count}
                      </span>
                    )}
                    <ChevronRight
                      size={11}
                      className={cn(
                        "opacity-20 transition-opacity",
                        isActive && "opacity-60",
                      )}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

       
        {/* ── Col 3: Products ── */}
        <div
          className={cn(
            "flex flex-col transition-all duration-200 overflow-hidden",
            activeSubcategory // ← removed `&& subcategoryProducts.length > 0`
              ? "w-64 opacity-100"
              : "w-0 opacity-0",
          )}
        >
          <div className="h-0.5 bg-gradient-to-r from-[#22D3EE] to-[#6EE7B7]" />
          <div
            className="overflow-y-auto flex-1"
            style={{ maxHeight: 420, minWidth: 256 }}
          >
            <div className="flex items-center justify-between px-3.5 pt-3 pb-1.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#A0B0C8] truncate flex-1 mr-2">
                {activeSubcategory}
              </p>
              <Link
                href={`/products?category=${encodeURIComponent(activeCategory ?? "")}&subcategory=${encodeURIComponent(activeSubcategory ?? "")}`}
                onClick={onClose}
                className="text-[11px] text-[#1251A3] font-bold hover:underline shrink-0"
              >
                View all →
              </Link>
            </div>

            {subcategoryProducts.length === 0 ? (
              <div className="px-3.5 py-8 flex flex-col items-center gap-2 text-center">
                <span className="text-2xl">🚧</span>
                <p className="text-[11.5px] font-semibold text-[#A0B0C8]">
                  Coming Soon
                </p>
                <p className="text-[10.5px] text-[#C0CDD8] leading-snug">
                  Products are being added to this subcategory
                </p>
              </div>
            ) : (
              <div className="p-2 pt-1 space-y-0.5">
                {subcategoryProducts.slice(0, 8).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-[rgba(18,81,163,0.05)] transition-colors group/prod"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center shrink-0 overflow-hidden">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          className="w-full h-full object-contain p-0.5"
                          alt=""
                        />
                      ) : (
                        <Package
                          size={13}
                          className="text-[#1251A3] opacity-40"
                        />
                      )}
                    </div>
                    <span className="text-[12px] font-medium text-[#3D5276] group-hover/prod:text-[#1251A3] transition-colors leading-tight line-clamp-2 flex-1">
                      {product.name}
                    </span>
                    <ArrowRight
                      size={11}
                      className="shrink-0 text-[#1251A3] opacity-0 group-hover/prod:opacity-40 transition-opacity"
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(
    null,
  );
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { products, fetchProducts } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? (y / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setSearching(true);
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("products")
        .select("id,name,slug,category,image_url,short_description")
        .or(
          `name.ilike.%${q}%,category.ilike.%${q}%,short_description.ilike.%${q}%`,
        )
        .limit(6);
      setResults(data || []);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(query), 280);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, doSearch]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleResult = (slug: string) => {
    setSearchOpen(false);
    setQuery("");
    router.push(`/products/${slug}`);
  };

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 py-2 transition-all duration-500",
          scrolled
            ? "bg-white/95 backdrop-blur-2xl shadow-[0_2px_30px_rgba(18,81,163,0.1)] border-b border-[rgba(18,81,163,0.07)]"
            : "bg-white border-b border-[rgba(18,81,163,0.05)]",
        )}
      >
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#1251A3] via-[#0891B2] to-[#22D3EE] transition-[width] duration-150 pointer-events-none"
          style={{ width: `${scrollPct}%` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-17.5 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <img
                src="/logo.png"
                alt="Aerosol Scientific"
                className="w-24 h-24 relative"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              {NAV_LINKS.map((link) => {
                const isProducts = link.label === "Products";
                const hasDropdown = isProducts || Boolean(link.children);

                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => hasDropdown && setDropdown(link.label)}
                    onMouseLeave={() => setDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-1 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200",
                        isActive(link.href)
                          ? "text-[#1251A3] bg-[rgba(18,81,163,0.07)]"
                          : "text-[#3D5276] hover:text-[#1251A3] hover:bg-[rgba(18,81,163,0.05)]",
                      )}
                    >
                      {link.label}
                      {hasDropdown && (
                        <ChevronDown
                          size={12}
                          className={cn(
                            "transition-transform duration-200 opacity-60",
                            dropdown === link.label ? "rotate-180" : "",
                          )}
                        />
                      )}
                    </Link>

                    <AnimatePresence>
                      {dropdown === link.label &&
                        (isProducts ? (
                          <ProductsMegaMenu
                            products={products}
                            onClose={() => setDropdown(null)}
                          />
                        ) : link.children ? (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 pt-3"
                          >
                            <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(18,81,163,0.15)] border border-[rgba(18,81,163,0.08)] py-2 min-w-[220px] overflow-hidden">
                              <div className="h-0.5 w-full bg-gradient-to-r from-[#1251A3] to-[#0891B2] mb-2" />
                              {link.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setDropdown(null)}
                                  className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#3D5276] hover:text-[#1251A3] hover:bg-[rgba(18,81,163,0.04)] transition-colors group/item"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2] opacity-50 group-hover/item:opacity-100 transition-opacity shrink-0" />
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        ) : null)}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Right: Search + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Live Search */}
              <div ref={searchRef} className="relative">
                <div
                  className={cn(
                    "flex items-center gap-2 border rounded-xl transition-all duration-300 overflow-hidden",
                    searchOpen
                      ? "bg-white border-[#1251A3] shadow-[0_0_0_3px_rgba(18,81,163,0.1)] w-64"
                      : "bg-[rgba(18,81,163,0.04)] border-[rgba(18,81,163,0.1)] w-44 hover:w-52",
                  )}
                >
                  <Search size={14} className="ml-3 text-[#7B90B2] shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    placeholder="Search products…"
                    className="py-2.5 pr-3 text-[13px] bg-transparent outline-none text-[#0A1628] placeholder-[#7B90B2] w-full font-medium"
                    onFocus={() => setSearchOpen(true)}
                    onChange={(e) => setQuery(e.target.value)}
                    autoComplete="off"
                    suppressHydrationWarning
                  />
                  {searching && (
                    <Loader2
                      size={13}
                      className="mr-3 text-[#1251A3] animate-spin shrink-0"
                    />
                  )}
                  {query && !searching && (
                    <button
                      onClick={() => {
                        setQuery("");
                        setResults([]);
                      }}
                      className="mr-2 text-[#7B90B2] hover:text-[#1251A3] transition-colors"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-[420px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(18,81,163,0.18)] border border-[rgba(18,81,163,0.08)] overflow-hidden z-50"
                    >
                      <div className="h-0.5 bg-gradient-to-r from-[#1251A3] to-[#0891B2]" />

                      {results.length > 0 && (
                        <>
                          <div className="px-4 pt-3 pb-2 flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7B90B2]">
                              Products
                            </span>
                            <Link
                              href={`/products?search=${encodeURIComponent(query)}`}
                              onClick={() => setSearchOpen(false)}
                              className="text-[11px] text-[#1251A3] hover:underline font-semibold"
                            >
                              View all →
                            </Link>
                          </div>
                          {results.map((product) => (
                            <button
                              key={product.id}
                              onMouseDown={() => handleResult(product.slug)}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[rgba(18,81,163,0.04)] border-t border-[rgba(18,81,163,0.04)] text-left transition-colors"
                            >
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center overflow-hidden shrink-0">
                                {product.image_url ? (
                                  <img
                                    src={product.image_url}
                                    alt=""
                                    className="w-full h-full object-contain p-1"
                                  />
                                ) : (
                                  <Package
                                    size={16}
                                    className="text-[#1251A3]"
                                  />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-semibold text-[#0A1628] truncate">
                                  {product.name}
                                </p>
                                <p className="text-[11px] text-[#7B90B2]">
                                  {product.category}
                                </p>
                              </div>
                              <ArrowRight
                                size={12}
                                className="text-[#1251A3] opacity-40 shrink-0"
                              />
                            </button>
                          ))}
                        </>
                      )}

                      {query.trim() && !searching && results.length === 0 && (
                        <p className="text-[12px] text-[#7B90B2] text-center py-5">
                          No results for "{query}"
                        </p>
                      )}

                      <div className="px-4 pt-3 pb-1 border-t border-[rgba(18,81,163,0.05)]">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7B90B2]">
                          Quick Links
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 p-2 pb-3">
                        {SERVICE_QUICK.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-[rgba(18,81,163,0.04)] transition-colors"
                          >
                            <span>{s.icon}</span>
                            <span className="text-[12px] font-medium text-[#3D5276]">
                              {s.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                      {!query && (
                        <p className="text-[11px] text-[#7B90B2] text-center pb-4">
                          Try "vial", "septa", "crimper"…
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/contact"
                className="group flex items-center gap-2 bg-sci-blue text-white px-5 py-2.5 rounded-xl text-[13px] font-bold shadow-[0_4px_20px_rgba(18,81,163,0.3)] hover:shadow-[0_8px_30px_rgba(18,81,163,0.4)] transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Phone size={13} />
                Get a Quote
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-[rgba(18,81,163,0.06)] transition-colors"
              suppressHydrationWarning
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-5 border-b border-[rgba(18,81,163,0.08)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1251A3] to-[#0891B2] flex items-center justify-center">
                      <FlaskConical size={16} className="text-white" />
                    </div>
                    <span className="font-bold text-[#050E1D]">
                      Aerosol Scientific
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    suppressHydrationWarning
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <nav className="p-4 space-y-1">
                {NAV_LINKS.map((link) => {
                  const isProducts = link.label === "Products";
                  return (
                    <div key={link.href}>
                      {isProducts ? (
                        /* Products → categories → products (two-level accordion) */
                        <div>
                          <button
                            onClick={() => setMobileProductsOpen((v) => !v)}
                            className={cn(
                              "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                              isActive(link.href)
                                ? "bg-[rgba(18,81,163,0.07)] text-[#1251A3]"
                                : "text-[#3D5276] hover:bg-gray-50 hover:text-[#1251A3]",
                            )}
                          >
                            <span>Products</span>
                            <ChevronDown
                              size={14}
                              className={cn(
                                "transition-transform opacity-60",
                                mobileProductsOpen && "rotate-180",
                              )}
                            />
                          </button>

                          <AnimatePresence>
                            {mobileProductsOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                {/* All products */}
                                <Link
                                  href="/products"
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-2 pl-5 pr-3 py-2.5 mx-1 text-[12.5px] font-bold text-[#1251A3] hover:bg-[rgba(18,81,163,0.04)] rounded-lg transition-colors"
                                >
                                  <Grid3x3 size={13} /> All Products
                                </Link>

                                {/* Category rows with nested product list */}
                                {MENU_CATEGORIES.map((cat) => {
                                  const catProducts = products.filter(
                                    (p) => p.category === cat,
                                  );
                                  const isExpanded = mobileExpandedCat === cat;
                                  return (
                                    <div key={cat}>
                                      <button
                                        onClick={() =>
                                          setMobileExpandedCat(
                                            isExpanded ? null : cat,
                                          )
                                        }
                                        className="w-full flex items-center gap-2.5 pl-5 pr-3 py-2 mx-1 rounded-lg hover:bg-[rgba(18,81,163,0.04)] transition-colors"
                                      >
                                        <span className="text-sm">
                                          {CATEGORY_ICONS[cat] ?? "🔬"}
                                        </span>
                                        <span className="flex-1 text-[12.5px] font-semibold text-[#3D5276] text-left">
                                          {cat}
                                        </span>
                                        {catProducts.length > 0 && (
                                          <span className="text-[10px] text-[#B0BDD0] font-bold mr-1">
                                            {catProducts.length}
                                          </span>
                                        )}
                                        {/* Always show chevron so all categories are expandable */}
                                        <ChevronDown
                                          size={12}
                                          className={cn(
                                            "opacity-40 transition-transform shrink-0",
                                            isExpanded && "rotate-180",
                                          )}
                                        />
                                      </button>

                                      <AnimatePresence>
                                        {isExpanded && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                              height: "auto",
                                              opacity: 1,
                                            }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                            className="overflow-hidden"
                                          >
                                            {(() => {
                                              const subcategories =
                                                PRODUCT_CATEGORIES.find(
                                                  (c) => c.name === cat,
                                                )?.subcategories ?? [];

                                              if (subcategories.length === 0)
                                                return (
                                                  <div className="flex items-center gap-2 pl-10 pr-3 py-2.5 mx-1">
                                                    <span className="text-base">
                                                      🚧
                                                    </span>
                                                    <span className="text-[11.5px] text-[#A0B0C8] italic font-medium">
                                                      Coming soon
                                                    </span>
                                                  </div>
                                                );

                                              return (
                                                <>
                                                  <Link
                                                    href={`/products?category=${encodeURIComponent(cat)}`}
                                                    onClick={() =>
                                                      setMobileOpen(false)
                                                    }
                                                    className="flex items-center gap-2 pl-10 pr-3 py-2 mx-1 rounded-lg hover:bg-[rgba(18,81,163,0.04)] transition-colors"
                                                  >
                                                    <span className="text-[11.5px] font-bold text-[#1251A3]">
                                                      All {cat}
                                                    </span>
                                                  </Link>

                                                  {subcategories.map((sub) => (
                                                    <Link
                                                      key={sub}
                                                      href={`/products?category=${encodeURIComponent(cat)}&subcategory=${encodeURIComponent(sub)}`}
                                                      onClick={() =>
                                                        setMobileOpen(false)
                                                      }
                                                      className="flex items-center gap-2 pl-10 pr-3 py-2 mx-1 rounded-lg hover:bg-[rgba(18,81,163,0.04)] transition-colors group/msub"
                                                    >
                                                      <span className="w-1 h-1 rounded-full bg-[#0891B2] opacity-40 group-hover/msub:opacity-100 shrink-0" />
                                                      <span className="text-[11.5px] text-[#7B90B2] group-hover/msub:text-[#1251A3] transition-colors truncate">
                                                        {sub}
                                                      </span>
                                                    </Link>
                                                  ))}
                                                </>
                                              );
                                            })()}
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <>
                          <Link
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "block px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                              isActive(link.href)
                                ? "bg-[rgba(18,81,163,0.07)] text-[#1251A3]"
                                : "text-[#3D5276] hover:bg-gray-50 hover:text-[#1251A3]",
                            )}
                          >
                            {link.label}
                          </Link>
                          {link.children?.map((c) => (
                            <Link
                              key={c.href}
                              href={c.href}
                              onClick={() => setMobileOpen(false)}
                              className="block pl-8 py-2 text-[13px] text-[#7B90B2] hover:text-[#1251A3]"
                            >
                              {c.label}
                            </Link>
                          ))}
                        </>
                      )}
                    </div>
                  );
                })}

                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#1251A3] to-[#0891B2] text-white px-4 py-3 rounded-xl text-sm font-bold mt-3"
                >
                  <Phone size={14} /> Get a Quote
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
