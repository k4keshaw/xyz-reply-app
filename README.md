# Claude Reply Suggester — XYZ Corp

A Next.js web app prototype for Vercel deployment.

## Deploy to Vercel (3 steps)

### 1. Push to GitHub
```bash
git init && git add . && git commit -m "initial"
gh repo create xyz-reply-app --public --push
```

### 2. Import to Vercel
- Go to vercel.com/new → Import your repo → Deploy

### 3. Add Environment Variable
In Vercel → Settings → Environment Variables:
  ANTHROPIC_API_KEY = sk-ant-api03-your-key-here

Then redeploy. Done!

## Local Dev
```bash
cp .env.example .env.local  # add your API key
npm install && npm run dev
```
