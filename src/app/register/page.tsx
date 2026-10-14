"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { m, LazyMotion, domAnimation } from "motion/react";
import { ShimmerButton } from "@/components/ui/MagicUI";
import { GridBackground } from "@/components/ui/GridBackground";
import { BACKEND_URL } from "@/lib/seo-config";
import { Zap, CheckCircle, AlertCircle, Loader2, RefreshCw } from "lucide-react";

interface FormData {
  storeName: string;
  slug: string;
  ownerName: string;
  email: string;
  password: string;
  phone: string;
}

type Status = "idle" | "loading" | "success" | "error";

const PLAN_LABELS: Record<string, string> = {
  trial: "30-Day Free Trial",
  starter: "Starter Plan",
  growth: "Growth Plan (Most Popular)",
  pro: "Pro Plan",
  enterprise: "Enterprise Plan",
  lifetime: "Lifetime Plan",
};

function RegisterForm() {
  const searchParams = useSearchParams();
  const selectedPlanKey = searchParams.get("plan") || "trial";
  const selectedPlanLabel = PLAN_LABELS[selectedPlanKey] || "30-Day Free Trial";

  const [form, setForm] = useState<FormData>({
    storeName: "",
    slug: "",
    ownerName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // When searchParams change (e.g., user clicked a new plan or navigated back),
  // always reset to fresh form view
  useEffect(() => {
    setStatus("idle");
    setErrorMsg("");
  }, [searchParams]);

  const resetForm = () => {
    setForm({
      storeName: "",
      slug: "",
      ownerName: "",
      email: "",
      password: "",
      phone: "",
    });
    setStatus("idle");
    setErrorMsg("");
  };

  // Auto-generate slug from store name
  const handleStoreName = (val: string) => {
    setForm((f) => ({
      ...f,
      storeName: val,
      slug: val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${BACKEND_URL}/api/public/tenants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.storeName,
          slug: form.slug,
          ownerName: form.ownerName,
          email: form.email,
          password: form.password,
          phone: form.phone,
          plan: selectedPlanKey,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message ?? data.error ?? "Registration failed");
      }
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  if (status === "success") {
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923176872900";
    const waText = encodeURIComponent(
      `Hi PakShipper! I just registered my store "${form.storeName}" (${selectedPlanLabel}) and would like to complete my store setup.`
    );

    return (
      <LazyMotion features={domAnimation}>
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#060810] px-6 py-12">
          <GridBackground />

          {/* Ambient Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[120px]"
          />

          {/* Logo */}
          <Link
            href="/"
            onClick={resetForm}
            className="mb-8 flex items-center gap-2 group z-10"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/25 transition-transform group-hover:scale-105">
              <Zap className="h-4 w-4 text-white" />
            </span>
            <span className="text-xl font-bold tracking-tight text-white">
              Pak<span className="text-cyan-400">Shipper</span>
            </span>
          </Link>

          <m.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 max-w-lg w-full text-center rounded-3xl border border-white/[0.08] bg-[#0c1220]/90 p-8 md:p-10 backdrop-blur-xl shadow-2xl shadow-cyan-500/5"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 shadow-inner">
              <CheckCircle className="h-9 w-9 text-emerald-400" />
            </div>

            <h2 className="mt-5 text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Registration Received! 🎉
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Welcome aboard! Your store profile for{" "}
              <span className="font-semibold text-cyan-400">
                {form.storeName || "your store"}
              </span>{" "}
              has been successfully recorded.
            </p>

            <div className="mt-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.08] p-4 text-xs leading-relaxed text-cyan-200 text-left">
              💡 <strong className="text-white">What happens next?</strong>
              <p className="mt-1 text-white/70">
                Our team will reach out to you via WhatsApp or Email within 24 hours to guide you through payment setup, custom domain connection, and catalog configuration.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`https://wa.me/${waNumber}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#20ba59]"
              >
                💬 Connect on WhatsApp Now
              </a>

              {/* Action to register another store immediately */}
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-semibold text-white/80 transition-all hover:bg-white/10 hover:text-white"
              >
                <RefreshCw className="h-3.5 w-3.5 text-cyan-400" />
                Register Another Store
              </button>

              <Link
                href="/"
                onClick={resetForm}
                className="text-xs text-white/50 transition hover:text-white underline underline-offset-4 py-1"
              >
                Return to Homepage
              </Link>
            </div>
          </m.div>
        </div>
      </LazyMotion>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#060810] px-6 py-20">
        <GridBackground />

        {/* Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-96 w-96 rounded-full bg-cyan-500/8 blur-3xl"
        />

        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/25 transition-transform group-hover:scale-105">
            <Zap className="h-4 w-4 text-white" />
          </span>
          <span className="text-xl font-bold tracking-tight text-white">
            Pak<span className="text-cyan-400">Shipper</span>
          </span>
        </Link>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#0c1220]/80 p-8 md:p-10 backdrop-blur-xl shadow-2xl"
        >
          {/* Plan Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {selectedPlanLabel}
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Create your store
          </h1>
          <p className="mt-1 text-sm text-white/50">
            30-day free trial included. No credit card required.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Store Name */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-white/60">
                Store Name
              </label>
              <input
                type="text"
                required
                placeholder="My Awesome Store"
                value={form.storeName}
                onChange={(e) => handleStoreName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

            {/* Slug preview */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-white/60">
                Store URL (auto-generated)
              </label>
              <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-xs text-white/40">pakshipper.com/</span>
                <input
                  type="text"
                  required
                  placeholder="my-store"
                  value={form.slug}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, slug: e.target.value }))
                  }
                  className="ml-1 flex-1 bg-transparent text-sm text-white outline-none placeholder-white/20"
                />
              </div>
            </div>

            {/* Owner Name */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-white/60">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Ahmed Ali"
                value={form.ownerName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, ownerName: e.target.value }))
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-white/60">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-white/60">
                Phone (WhatsApp preferred)
              </label>
              <input
                type="tel"
                placeholder="0300 1234567"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-white/60">
                Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

            {/* Error */}
            {status === "error" && (
              <m.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                {errorMsg}
              </m.div>
            )}

            <ShimmerButton
              type="submit"
              className="w-full justify-center gap-2 py-3.5"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Creating your store...
                </>
              ) : (
                "Create Free Store"
              )}
            </ShimmerButton>
          </form>

          <p className="mt-6 text-center text-xs text-white/30">
            By continuing, you agree to our{" "}
            <Link href="#" className="text-cyan-400 hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-cyan-400 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </m.div>
      </div>
    </LazyMotion>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#060810] text-white/40">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
