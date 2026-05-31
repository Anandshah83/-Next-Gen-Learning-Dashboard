# Next-Gen Student Dashboard

A high-fidelity, futuristic education dashboard featuring Bento Grid layouts, custom hardware-accelerated Framer Motion animations, zero layout shifts, and server-rendered data with robust database error handling.

## 🚀 Tech Stack

- **Framework:** Next.js (App Router, React Server Components)
- **Database:** Supabase PostgreSQL
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion
- **Icons:** Lucide React

---

## 🛠️ Architecture & Design Decisions

### 1. Server/Client Component Split
To maximize page performance and SEO, this project implements a clear Server-Client boundary:
- **`src/app/dashboard/page.tsx` (Server Component):** Executes on the server to establish connection and fetch course tables from Supabase securely. Disables client-side data leaks of private API configurations.
- **`src/app/dashboard/loading.tsx` (Server Component):** Mirrors the layout of the Bento Grid precisely using pulsing gradient skeletons. Prevents cumulative layout shifts (CLS) when data loading finishes.
- **`src/app/dashboard/DashboardClient.tsx` (Client Component):** Manages interactive client-side concerns: sidebar expand/collapse, active navigation highlighting, search input filtering, and viewport tab switching.

### 2. Zero Layout Shift Animations
All entrance loads and interactive states utilize **hardware-accelerated properties** (`transform` and `opacity`) to avoid triggering expensive browser repaints or layout recalculations:
- **Spring-physics Elevate:** Bento cards expand by ~2% on hover with customizable spring values (`stiffness: 300, damping: 20`) for responsive, non-linear tactile feedback.
- **`layoutId` Nav Highlighter:** When active items change, the selection background block slides smoothly into its new slot using shared layout transitions.
- **Staggered Grid Load:** Tiles slide up (`y: 24` to `0`) and fade in (`opacity: 0` to `1`) progressively using staggered children orchestrations.

### 3. Graceful Database Fallbacks
The data client includes automatic fallback logic. If Supabase keys are missing or a server query fails, the application switches to **local seed data** while displaying a subtle warning indicator in the header. This ensures the app is testable out-of-the-box before database credentials are configured.

---

## 💻 Local Setup & Execution

### 1. Unzip and Install Dependencies
Ensure you have Node.js (v18+) installed. Run:
```bash
npm install
```

### 2. Configure Database (Optional)
1. Set up a free project on [Supabase](https://supabase.com).
2. Copy the SQL script inside `schema.sql` and run it in the **Supabase SQL Editor**.
3. Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

---

## 📂 Project Structure

- `src/app/` - Layouts, redirection logic, dashboard routes, and skeleton load files.
- `src/components/` - Sidebar navigator and interactive Bento cards (Hero, Course, Analytics, Activity).
- `src/lib/` - Supabase data connector and graceful fallback service.
- `src/types/` - Custom TypeScript type definitions.
- `schema.sql` - Database schema blueprints.
- `globals.css` - Custom mesh colors, scrollbars, and noise grain shaders.
