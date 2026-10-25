# Running Arcana University locally

Everything runs in the browser. There is no backend, no database, no API key, and no network
call at runtime — so it works offline once installed.

## Requirements

- **Node.js 20.19+ or 22.12+** (Vite 8 will refuse older versions)
- npm (ships with Node)
- Any modern browser

Check your version:

```bash
node -v
```

If it's older, install the current LTS from https://nodejs.org.

## Run it

```bash
git clone https://github.com/johngpdev/arcana-university.git
cd arcana-university
npm install
npm run dev
```

Open **http://localhost:5173**

`npm install` should take under a minute. If you want a production-style run instead:

```bash
npm run build
npm run preview
```

## Windows note

If PowerShell blocks npm with a message about `npm.ps1`, either use `npm.cmd` instead of `npm`,
or run once:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

## 5-minute walkthrough

You create your own account — accounts are stored in your browser, so nothing is shared.

**1. Create an account**
Click **CREATE ACCOUNT**. Use any email (`judge@osu.edu`) and any password with 6+ characters.
You land on **"Hello, Scholar."** with a generated name like *Strong Octopus*. Nothing is verified.

**2. Ask Arcana AI**
Click **Ask Arcana AI** and send:

> SN1 vs SN2 for a secondary alkyl halide

Expect: a class badge (`CHEM 2210`), a quoted answer with the author and heart count cited,
professor cards with match reasons, and related threads with relevance percentages.

**3. Test that it admits uncertainty**
Send: `hello`
Expect: it declines to guess, and offers example questions instead of a fake answer.

**4. Forums**
Go to **Browse Discussions**. Use the search box (`cache`, `photosynthesis`, `integral`) and the
class filter — it lists all 160+ courses when empty. Post a question: type it, pick a class, hit
**POST**. It appears at the top. Open it, reply, and heart a comment (one heart per person,
click again to remove).

**5. Find a professor**
Home → **Find a Professor** → filter to `MATH 1152` → **MESSAGE** → send a message → go back Home.
The conversation appears in your inbox with a preview. **Hover the row** and click **CLOSE** (red)
to end it — the conversation and its messages are deleted.

**6. Settings**
Click the gear icon. **SHUFFLE** changes your pseudonym; the field and the "Currently saved" line
update immediately. Open a thread you posted in — your posts now show the new name.

**7. Faculty view**
Sign out from the intro page, then create a second account and pick **FACULTY**.
You get **"Hello, Professor."**, a student inbox, and a students-helped count. Marking a professor
helpful from a student account raises that number.

## What is real vs. seeded

| Real | Seeded |
| --- | --- |
| Accounts, passwords, sessions | Forum questions and replies |
| Your posts, replies, hearts, timestamps | Professors and their helped counts |
| Conversations and closing them | Class catalog (curated, not the full bulletin) |
| Pseudonym changes | Demo inbox greeting |

Seeded content is fabricated for demonstration. Anything **you** submit uses real timestamps and
persists in your browser until you clear site data.

## Reset the demo

Open DevTools → **Application → Storage → Clear site data**, then reload. You get a fresh state
with a new account.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `npm` not recognized | Node isn't installed — get the LTS from nodejs.org |
| `npm.ps1 cannot be loaded` | `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`, or use `npm.cmd` |
| Vite complains about Node version | Upgrade Node to 20.19+ or 22.12+ |
| Port 5173 already in use | `npm run dev -- --port 5174` |
| Blank page after editing files | Hard refresh (Ctrl+Shift+R) |
| Want to test on your phone | `npm run dev -- --host`, then open the printed LAN URL |
