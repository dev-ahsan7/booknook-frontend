# BookNook

A small online library. Add a book, borrow a book, return a book.

Server repository: [booknook-backend](https://github.com/dev-ahsan7/booknook-backend)

## Features

- Browse every book on the shelf, with the 6 newest shown on the home page
- Log in with email and password or with Google, and return to the page you wanted after login
- Add books with a cover image uploaded to imgbb, and edit or delete the books you added
- Borrow a book for 7 days and return it from My Borrows
- Available copies go down and up with each borrow and return, and a book with no copies shows "Not Available"
- A user cannot borrow the same book twice at the same time
- Private pages and protected API routes checked with JWT
- Light and dark theme, and a layout that works on phone, tablet and desktop

## Tech stack

- **Client:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Swiper, Framer Motion
- **Authentication:** Better Auth with the MongoDB adapter and JWT
- **Server:** Express and MongoDB

## Run locally

```bash
npm install
npm run dev
```

The app runs on http://localhost:3090. Copy `.env.example` to `.env` and fill in the values first. The server has to be running too.

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_URI` | URL of the Express server |
| `NEXT_PUBLIC_IMGBB_API_KEY` | imgbb API key |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth client |
| `MONGODB_URI` | MongoDB connection string |
| `BETTER_AUTH_SECRET` | A long random string |
| `BETTER_AUTH_URL` | URL of this app |

## Credits

Home page photos are from [Unsplash](https://unsplash.com). Starter book covers are from [Open Library](https://openlibrary.org).
