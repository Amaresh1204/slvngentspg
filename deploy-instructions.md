# Vercel Deployment Instructions

## Step 1: Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit - CoLive website"
```

## Step 2: Deploy to Vercel
```bash
# Login to Vercel (run this once)
vercel login

# Deploy the project
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name: colive-website (or your preferred name)
# - Directory: ./
# - Override settings? N
```

## Step 3: Set Environment Variables
After deployment, go to your Vercel dashboard:

1. Go to https://vercel.com/dashboard
2. Click on your project (colive-website)
3. Go to Settings → Environment Variables
4. Add these variables:

```
EMAILJS_PUBLIC_KEY=UNnqxu_EZHqwitT74
EMAILJS_SERVICE_ID=service_0cb8qp5
EMAILJS_TEMPLATE_ID=template_c5il8ap
EMAILJS_VISIT_TEMPLATE_ID=template_aen3xxf
EMAILJS_GENERAL_PUBLIC_KEY=D-m27tghDHX_6q87O
EMAILJS_GENERAL_SERVICE_ID=service_kl8k04z
EMAILJS_BOOKING_TEMPLATE_ID=template_lr3x7ea
EMAILJS_CONTACT_TEMPLATE_ID=template_fq070h8
RECIPIENT_EMAIL=amareshkambhampati@gmail.com
```

## Step 4: Redeploy
```bash
vercel --prod
```

## Your website will be live at:
- Production: https://your-project-name.vercel.app
- You'll get the exact URL after deployment

## Future Updates:
```bash
git add .
git commit -m "Update description"
git push origin main
# Vercel will auto-deploy on git push
```