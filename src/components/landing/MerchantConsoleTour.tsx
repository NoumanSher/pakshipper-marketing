"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, LazyMotion, domAnimation, AnimatePresence, useInView } from "motion/react";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import {
  Palette,
  PackageCheck,
  FolderTree,
  Truck,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  X,
  Layers,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";

interface TourCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  headline: string;
  description: string;
  bullets: string[];
  mainImage: {
    src: string;
    alt: string;
    urlPath: string;
    title: string;
  };
  altImages?: {
    src: string;
    alt: string;
    urlPath: string;
    title: string;
  }[];
}

const TOUR_CATEGORIES: TourCategory[] = [
  {
    id: "branding",
    name: "Branding & Banners",
    icon: Palette,
    tag: "Visual Customizer",
    headline: "Configure Your Storefront in Minutes",
    description:
      "Full control over your brand assets. Upload your logo, mascot favicon, and customize multi-slide hero carousels with independent desktop and mobile banners without writing code.",
    bullets: [
      "Multi-slide banner carousel with custom CTA links",
      "Separate desktop (1920x600) and mobile (750x800) responsive uploads",
      "Live store contact info, WhatsApp integration & physical address",
    ],
    mainImage: {
      src: "/screenshots/merchant/02-store-settings-branding.png?v=2",
      alt: "PakShipper Store Settings - Branding and Hero Banner Carousel",
      urlPath: "admin.pakshipper.com/settings/branding",
      title: "Hero Banner Carousel & Brand Assets",
    },
    altImages: [
      {
        src: "/screenshots/merchant/01-store-settings-basic.png?v=2",
        alt: "PakShipper Store Settings - Basic Information",
        urlPath: "admin.pakshipper.com/settings/basic",
        title: "Basic Store Info & WhatsApp Configuration",
      },
    ],
  },
  {
    id: "catalog",
    name: "Catalog & HTML Editor",
    icon: PackageCheck,
    tag: "Rich Content Engine",
    headline: "Split-Screen Live Product Editing",
    description:
      "Craft compelling product listings with our split-screen HTML & Markdown editor. See real-time storefront previews, auto-calculate PKR profit margins, and manage high-resolution media galleries.",
    bullets: [
      "Split-screen live rendering: edit source HTML while previewing customer view",
      "Automatic PKR wholesale vs. retail margin and profit percentage calculator",
      "Bulk image gallery with SEO alt text tagging and instant SKU generator",
    ],
    mainImage: {
      src: "/screenshots/merchant/07-edit-product-rich-editor.png?v=2",
      alt: "PakShipper Product Editor with Split-Screen Live Preview",
      urlPath: "admin.pakshipper.com/catalog/products/edit",
      title: "Split-Mode Product Editor with Live Storefront Preview",
    },
    altImages: [
      {
        src: "/screenshots/merchant/05-products-catalog.png?v=2",
        alt: "PakShipper Full Products Catalog",
        urlPath: "admin.pakshipper.com/catalog/products",
        title: "38-Item Product Inventory & Status Tracking",
      },
      {
        src: "/screenshots/merchant/06-add-new-product.png?v=2",
        alt: "PakShipper Add New Product Interface",
        urlPath: "admin.pakshipper.com/catalog/products/new",
        title: "Quick-Add Product Flow with Pricing Matrix",
      },
    ],
  },
  {
    id: "categories",
    name: "Category Hierarchy",
    icon: FolderTree,
    tag: "Catalog Architecture",
    headline: "Deep Nesting & Cross-Sell Suggestions",
    description:
      "Organize complex inventories effortlessly. Build parent and subcategories, auto-generate SEO URL slugs, and configure cross-sell categories to boost average order value.",
    bullets: [
      "Intuitive drag-and-drop reordering with live active/draft status flags",
      "One-click URL slug regeneration and thumbnail upload",
      "Cross-sell category linking to recommend complementary items at checkout",
    ],
    mainImage: {
      src: "/screenshots/merchant/03-category-management.png?v=2",
      alt: "PakShipper Category Management Screen",
      urlPath: "admin.pakshipper.com/catalog/categories",
      title: "Parent & Subcategory Organization Hierarchy",
    },
    altImages: [
      {
        src: "/screenshots/merchant/04-create-category-modal.png?v=2",
        alt: "PakShipper Create Parent Category Modal",
        urlPath: "admin.pakshipper.com/catalog/categories/create",
        title: "Category Creation with Cross-Sell Suggestions",
      },
    ],
  },
  {
    id: "orders",
    name: "Order Fulfillment",
    icon: Truck,
    tag: "Dispatch & Ops",
    headline: "Full Lifecycle Dispatch & Timeline Tracking",
    description:
      "Track customer parcels from checkout to delivery. Review full customer details, Pakistani delivery addresses, financial breakdowns, and chronological status history.",
    bullets: [
      "Granular order status pipeline: Pending, In Transit, Delivered, and Cancelled",
      "Chronological status history timeline with cash collection timestamps",
      "Support for both Cash on Delivery (COD) and automated Stripe payments",
    ],
    mainImage: {
      src: "/screenshots/merchant/09-order-detail-modal.png?v=2",
      alt: "PakShipper Order Detail Modal with Status Timeline",
      urlPath: "admin.pakshipper.com/sales/orders/0052",
      title: "Order Detail View with Delivery Timeline",
    },
    altImages: [
      {
        src: "/screenshots/merchant/08-order-management.png?v=2",
        alt: "PakShipper Orders Management List",
        urlPath: "admin.pakshipper.com/sales/orders",
        title: "Filterable Order Board with Status Tabs",
      },
    ],
  },
  {
    id: "engagement",
    name: "FAQs & Marketing",
    icon: HelpCircle,
    tag: "Customer Retention",
    headline: "Build Trust with FAQs & Newsletters",
    description:
      "Empower your customers with an instant storefront knowledge base. Answer shipping, delivery, and authenticity questions with toggle switches and export newsletter leads to CSV.",
    bullets: [
      "Instant FAQ switches to show or hide questions on live storefronts",
      "Pre-configured shipping FAQs tailored for Pakistani e-commerce logistics",
      "Export opt-in newsletter subscribers directly to CSV for email campaigns",
    ],
    mainImage: {
      src: "/screenshots/merchant/11-faqs-knowledgebase.png?v=2",
      alt: "PakShipper FAQs and Knowledge Base Admin Screen",
      urlPath: "admin.pakshipper.com/content/faqs",
      title: "Storefront Knowledge Base & FAQ Management",
    },
    altImages: [
      {
        src: "/screenshots/merchant/12-newsletter-subscribers.png?v=2",
        alt: "PakShipper Newsletter Subscribers List",
        urlPath: "admin.pakshipper.com/marketing/newsletter",
        title: "Subscriber List & CSV Export",
      },
    ],
  },
  {
    id: "security",
    name: "Multi-Tenant Security",
    icon: ShieldCheck,
    tag: "Platform Architecture",
    headline: "Isolated Workspaces for Every Merchant",
    description:
      "Enterprise multi-tenancy ensures complete database and workspace isolation. Your store identifier slug guarantees that your products, customer records, and orders remain 100% private.",
    bullets: [
      "Unique store slug identification (e.g., pakshipper-store) per merchant",
      "Granular role-based access for store managers, staff, and admins",
      "Dedicated database connection isolation with zero cross-tenant contamination",
    ],
    mainImage: {
      src: "/screenshots/merchant/10-merchant-login.png?v=2",
      alt: "PakShipper Merchant Login Screen with Store Slug Identifier",
      urlPath: "admin.pakshipper.com/auth/login",
      title: "Tenant-Isolated Merchant Portal Login",
    },
  },
];

export function MerchantConsoleTour() {
  const [activeTab, setActiveTab] = useState(TOUR_CATEGORIES[0].id);
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [activeViewIdx, setActiveViewIdx] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const currentCategory =
    TOUR_CATEGORIES.find((cat) => cat.id === activeTab) || TOUR_CATEGORIES[0];

  const allCategoryImages = [
    currentCategory.mainImage,
    ...(currentCategory.altImages || []),
  ];

  const currentDisplayImage =
    allCategoryImages[activeViewIdx] || currentCategory.mainImage;

  // Reset zoom scale when lightbox closes or changes
  useEffect(() => {
    if (!selectedImage) setZoomScale(1);
  }, [selectedImage]);

  // Esc key to close lightbox
  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="merchant-console"
        ref={containerRef}
        className="relative bg-[#060810] pt-16 pb-24 px-4 sm:px-6 overflow-hidden"
      >
        {/* Ambient background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="h-[500px] w-[900px] rounded-full bg-cyan-600/10 blur-[140px]" />
        </div>

        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center">
          <m.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400"
          >
            <Sparkles className="h-3 w-3" />
            1080p Merchant Console Interactive Tour
          </m.div>

          <m.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            A powerful, clean back-office{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              built for real operators
            </span>
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-2 text-sm sm:text-base text-white/60 max-w-2xl mx-auto"
          >
            Select any module below to inspect the full 1080p console. Scroll down directly inside the window to view entire forms.
          </m.p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-2">
          {TOUR_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveTab(cat.id);
                  setActiveViewIdx(0);
                }}
                className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "border-cyan-500/60 bg-cyan-500/20 text-cyan-300 shadow-md shadow-cyan-500/20 scale-105"
                    : "border-white/10 bg-white/[0.04] text-white/60 hover:border-white/20 hover:text-white"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-cyan-400" : "text-white/40"}`} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Integrated Control Bar: Compact Description + Sub-Screens */}
        <div className="mx-auto mt-6 max-w-6xl rounded-2xl border border-white/10 bg-[#0a0f1e]/90 backdrop-blur-md p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Module Tag & Headline */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/15 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 uppercase tracking-wider">
                  <Layers className="h-3 w-3" />
                  {currentCategory.tag}
                </span>
                <span className="text-xs text-white/40">•</span>
                <span className="text-xs font-medium text-cyan-400">{currentCategory.name}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                {currentCategory.headline}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-white/60 line-clamp-2 max-w-3xl">
                {currentCategory.description}
              </p>
            </div>

            {/* Right: Sub-Screens Selector */}
            <div className="flex flex-col gap-2 shrink-0 lg:items-end">
              {allCategoryImages.length > 1 && (
                <div className="flex flex-wrap gap-1.5 lg:justify-end">
                  {allCategoryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveViewIdx(i)}
                      className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition-all ${
                        i === activeViewIdx
                          ? "border-cyan-500/80 bg-cyan-500/25 text-cyan-300 shadow-sm"
                          : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {img.title}
                    </button>
                  ))}
                </div>
              )}

              <Link
                href="/register?plan=trial"
                className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 px-3 py-1 text-xs font-bold text-cyan-300 transition-colors w-fit"
              >
                <span>30-Day Free Trial</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Large Screenshot Mockup Window (Immediately Visible) */}
        <div className="mx-auto mt-4 max-w-6xl">
          <AnimatePresence mode="wait">
            <m.div
              key={`${activeTab}-${activeViewIdx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <BrowserMockup
                src={currentDisplayImage.src}
                alt={currentDisplayImage.alt}
                urlPath={currentDisplayImage.urlPath}
                badge={currentDisplayImage.title}
                scrollable={true}
                heightPx={580}
                onExpand={() =>
                  setSelectedImage({
                    src: currentDisplayImage.src,
                    title: currentDisplayImage.title,
                  })
                }
              />
            </m.div>
          </AnimatePresence>
        </div>

        {/* Interactive Crystal Clear Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <>
              {/* Backdrop */}
              <m.div
                key="lightbox-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md"
              />

              {/* Lightbox Container */}
              <m.div
                key="lightbox-dialog"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-2 md:inset-6 z-50 flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#070b14] shadow-2xl shadow-black/90"
              >
                {/* Lightbox Toolbar */}
                <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 bg-[#0a0f1d] px-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                    <span className="ml-3 text-xs font-semibold text-white/90">
                      {selectedImage.title}
                    </span>
                    <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      1920p Full HD Lossless
                    </span>
                  </div>

                  {/* Zoom controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setZoomScale((s) => Math.max(0.5, s - 0.2))}
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                      title="Zoom Out"
                    >
                      <ZoomOut className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-12 text-center text-xs font-mono text-cyan-400 font-bold">
                      {Math.round(zoomScale * 100)}%
                    </span>
                    <button
                      onClick={() => setZoomScale((s) => Math.min(3, s + 0.2))}
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                      title="Zoom In"
                    >
                      <ZoomIn className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setZoomScale(1)}
                      className="hidden sm:flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-1 text-xs text-white/70 hover:bg-white/20 hover:text-white"
                      title="Reset to 100% Native Size"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>100% Size</span>
                    </button>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-red-500 hover:text-white transition-colors"
                      title="Close (Esc)"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Lightbox Scrollable Canvas with data-lenis-prevent */}
                <div
                  data-lenis-prevent="true"
                  style={{
                    scrollbarWidth: "auto",
                    scrollbarColor: "#06b6d4 rgba(255, 255, 255, 0.08)",
                  }}
                  className="relative flex-1 overflow-auto p-4 bg-[#050811] flex justify-center"
                >
                  <div
                    style={{
                      transform: `scale(${zoomScale})`,
                      transformOrigin: "top center",
                      transition: "transform 0.15s ease-out",
                      width: "100%",
                      maxWidth: "1920px",
                    }}
                  >
                    <Image
                      src={selectedImage.src}
                      alt={selectedImage.title}
                      width={1920}
                      height={1080}
                      unoptimized={true}
                      priority={true}
                      className="w-full h-auto rounded-lg shadow-2xl block select-none pointer-events-auto"
                    />
                  </div>
                </div>
              </m.div>
            </>
          )}
        </AnimatePresence>
      </section>
    </LazyMotion>
  );
}
