<div align="center">

# 🐾 Kindred Tails

**Turning memories into a global living garden. 🌸✨**

Built solo in 7 days for the Figma Config 2026 × Contra Independent Makeathon — $0/month, zero user accounts, privacy by design.

[**Live App**](https://kindredtails.vercel.app) · [Figma Community File](https://www.figma.com/community/file/1648805486303692731/kindred-tails)

</div>

---

## What it is

How do you build a dedicated space where pet owners can celebrate the happy memories of their best friends — without it feeling like a noisy social media timeline or a clinical online directory?

Nearly everyone who's ever had a pet has had to say goodbye to one, but there's never been a dedicated public space online to celebrate them with joy. Kindred Tails is that space — a quiet, permanent, full-of-light place to remember a pet, built around the idea of planting a memory rather than posting one.

It was inspired by the passing of my own dog, right at the start of June. The first pin on the map is hers.

## A map, not a feed

Instead of a standard scrolling feed, memorials are placed as glowing pins on a global map. Seeing pins span across different countries instantly shows a beautiful, connected network of pet lovers worldwide — not a timeline competing for attention, but a living garden anyone can walk through.

## Why it's built this way

Every product decision here was made by asking what someone grieving actually needs — and just as importantly, what they don't.

- 🌱 **Planting Memories, not posting them.** The entire app adopts the language of a garden. Visitors leave cheerful, finite daily tributes — flowers, treats, or toys — to celebrate a life, not to "like" a post.
- 🛡️ **Built-in Privacy Guard.** Exact coordinates are never stored. Pins use city-level locations mixed with a small amount of random scattering, so a user's exact home address is completely protected.
- ❌ **Zero friction, no accounts.** Forcing someone to sign up just to share a memory is a poor experience at exactly the wrong moment. Ownership is handled securely on the user's own device — zero emails collected, zero sign-up walls.
- 🗣️ **Cross-border by design.** Love for a pet doesn't have a language barrier. Memorials translate automatically across 9 languages, so these stories can be read and shared across borders seamlessly.

What got left out mattered as much as what got built.

## Features

- Interactive world map with clustering, search, and category filters
- A 3-step memorial creation flow with photo upload and automatic image compression
- Fuzzy geolocation with city/country autofill (privacy-preserving by default)
- A tribute system — flowers, treats, and toys — with a daily seed allowance
- Inline translation across 9 languages, powered by MyMemory
- A personal "Your Memorial" view and tribute log, tied to a local owner token instead of an account
- Fully responsive, with a dedicated mobile bottom-sheet experience
- A Remotion-rendered walkthrough video built entirely in code

## Tools used

Figma, Figma Agents (for explorations and the design system), Figma Make, Supabase, Leaflet.js, and Vercel — all chosen to keep the project running at **$0/month**. That constraint shaped the product more than a blank check ever would have.

## Privacy and security

- Row Level Security enabled on every table, no exceptions
- No exact coordinates ever stored — only fuzzed, approximate locations
- No personal data collected beyond what's voluntarily entered in a memorial
- Memorial ownership handled via a private token on-device, never an account or email
- Full security review completed — no exposed secrets, no XSS vectors, sensitive fields redacted from all server logs

## Running it locally

```bash
git clone https://github.com/KateRemedio/Kindredtails.git
cd Kindredtails
npm install
npm run dev
```

The frontend connects to a public Supabase project — no environment setup needed to run it as-is. If you want to point it at your own Supabase project instead, update `projectId` and `publicAnonKey` in `src/app/utils/supabase/info.tsx`.

The backend (Supabase Edge Functions in `/supabase/functions/server`) requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to be set in your Supabase project's environment settings — these are never stored in this repo.

---

<div align="center">

Built by [Kate Remedio](https://naiconik.com) · Product Designer

A massive thank you to the team behind the Makeathon for providing beta access to Figma Agents and the credits that took this from an emotional concept to a fully functional, living application in just 7 days.

</div>
