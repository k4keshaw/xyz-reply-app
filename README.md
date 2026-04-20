# Claude Reply Suggester — XYZ Corp

A Next.js web app prototype for Vercel deployment.

## Demo Preview

**Claude Reply Suggester** is an AI-powered tool that helps you craft better responses across social platforms:

- 🤖 **AI-Powered Suggestions** - Uses Claude to generate smart reply suggestions
- 🔗 **LinkedIn Integration** - View and suggest replies to LinkedIn posts
- 𝕏 **Twitter Integration** - Generate thoughtful responses to tweets
- ⚡ **Real-time Generation** - Get suggestions instantly with streaming responses
- 🎨 **Clean Interface** - Modern popup-based UI for seamless interaction

### Features

✨ **Smart Reply Suggestions** - Let Claude analyze context and suggest professional, engaging responses

📝 **Multi-Platform Support** - Works with both LinkedIn and Twitter content

🔐 **API-Driven** - Secure backend API integration with Anthropic's Claude model

⚙️ **Easy Deployment** - Deploy to Vercel with just 3 steps

## Interactive Demo

👉 **[View the interactive prototype](./public/demo.html)** — See how the slash command flow works across Twitter and LinkedIn. Step through the demo to understand the user experience.

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
