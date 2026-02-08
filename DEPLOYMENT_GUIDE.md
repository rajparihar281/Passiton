# 🚀 PassItOn Deployment Guide

## Overview
- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Node.js + Express)
- **Database**: Supabase (PostgreSQL)

---

## 📦 Prerequisites

1. GitHub account
2. Vercel account (sign up at vercel.com)
3. Render account (sign up at render.com)
4. Supabase project (already set up)

---

## 🔧 Step 1: Prepare Repository

### Push to GitHub
```bash
cd c:\Users\Raj Parihar\Desktop\passiton

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "feat: prepare for deployment with motion system"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/passiton.git
git branch -M main
git push -u origin main
```

---

## 🎨 Step 2: Deploy Frontend to Vercel

### Option A: Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click "Add New" → "Project"

2. **Import Repository**
   - Select your GitHub repository: `passiton`
   - Click "Import"

3. **Configure Project**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   VITE_BACKEND_URL=https://your-backend-url.onrender.com
   VITE_SUPABASE_URL=https://bhqjkmnatcfbbcdktvuh.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your frontend will be live at: `https://passiton-xxx.vercel.app`

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: passiton-frontend
# - Directory: ./
# - Override settings? No

# Add environment variables
vercel env add VITE_BACKEND_URL
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Deploy to production
vercel --prod
```

---

## 🖥️ Step 3: Deploy Backend to Render

### Option A: Render Dashboard (Recommended)

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Click "New" → "Web Service"

2. **Connect Repository**
   - Connect your GitHub account
   - Select repository: `passiton`
   - Click "Connect"

3. **Configure Service**
   ```
   Name: passiton-backend
   Region: Choose closest to you
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Environment Variables**
   Add these in Render dashboard:
   ```
   NODE_ENV=production
   PORT=5000
   SUPABASE_URL=https://bhqjkmnatcfbbcdktvuh.supabase.co
   SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=https://passiton-xxx.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for first deploy
   - Your backend will be live at: `https://passiton-backend-xxx.onrender.com`

### Option B: Using render.yaml

1. **Push render.yaml to GitHub**
   ```bash
   git add backend/render.yaml
   git commit -m "Add Render configuration"
   git push
   ```

2. **Create Blueprint in Render**
   - Go to Render Dashboard
   - Click "New" → "Blueprint"
   - Select your repository
   - Render will auto-detect `render.yaml`
   - Add environment variables
   - Click "Apply"

---

## 🔗 Step 4: Connect Frontend to Backend

### Update Frontend Environment Variable

1. **In Vercel Dashboard**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Update `VITE_BACKEND_URL`:
     ```
     VITE_BACKEND_URL=https://passiton-backend-xxx.onrender.com
     ```
   - Click "Save"

2. **Redeploy Frontend**
   - Go to "Deployments" tab
   - Click "Redeploy" on latest deployment
   - Or push a new commit to trigger auto-deploy

---

## 🔒 Step 5: Update CORS in Backend

The backend is already configured for CORS, but verify:

**File**: `backend/src/server.js`
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173', 
    process.env.FRONTEND_URL || 'http://localhost:3000'
  ],
  credentials: true,
}));
```

Make sure `FRONTEND_URL` environment variable in Render matches your Vercel URL.

---

## ✅ Step 6: Verify Deployment

### Test Frontend
1. Visit your Vercel URL: `https://passiton-xxx.vercel.app`
2. Check if pages load
3. Open browser console (F12) - should see no errors

### Test Backend
1. Visit: `https://passiton-backend-xxx.onrender.com`
2. Should see: `{"success":true,"message":"🚀 PassItOn Backend API",...}`

### Test Integration
1. Try logging in on frontend
2. Try browsing items
3. Check if API calls work (Network tab in DevTools)

---

## 🐛 Troubleshooting

### Frontend Issues

**Issue**: "Failed to fetch" errors
**Fix**: 
- Check `VITE_BACKEND_URL` is correct
- Ensure backend is running
- Check CORS settings

**Issue**: Environment variables not working
**Fix**:
- Ensure variables start with `VITE_`
- Redeploy after adding variables
- Clear browser cache

**Issue**: Build fails
**Fix**:
- Check `npm run build` works locally
- Ensure all dependencies in package.json
- Check TypeScript errors

### Backend Issues

**Issue**: "Application failed to respond"
**Fix**:
- Check logs in Render dashboard
- Ensure PORT is set to 5000
- Verify all environment variables are set

**Issue**: Database connection fails
**Fix**:
- Verify Supabase credentials
- Check Supabase project is active
- Test connection locally first

**Issue**: CORS errors
**Fix**:
- Add Vercel URL to CORS origins
- Update FRONTEND_URL environment variable
- Redeploy backend

---

## 🔄 Continuous Deployment

### Auto-Deploy Setup

**Vercel** (Already enabled):
- Every push to `main` branch auto-deploys
- Pull requests get preview deployments

**Render** (Already enabled):
- Every push to `main` branch auto-deploys
- Takes 5-10 minutes per deploy

### Manual Deploy

**Vercel**:
```bash
cd frontend
vercel --prod
```

**Render**:
- Go to dashboard
- Click "Manual Deploy" → "Deploy latest commit"

---

## 📊 Monitoring

### Vercel Analytics
- Go to project → "Analytics"
- View page views, performance, etc.

### Render Logs
- Go to service → "Logs"
- View real-time server logs
- Check for errors

### Supabase Monitoring
- Go to Supabase dashboard
- Check "Database" → "Usage"
- Monitor API requests

---

## 💰 Pricing

### Vercel (Free Tier)
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains

### Render (Free Tier)
- ✅ 750 hours/month
- ⚠️ Spins down after 15 min inactivity
- ⚠️ Cold start: 30-60 seconds
- ✅ Automatic HTTPS

### Upgrade Options
- **Vercel Pro**: $20/month (better performance)
- **Render Starter**: $7/month (no spin down)

---

## 🎯 Post-Deployment Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] Environment variables configured
- [ ] CORS settings updated
- [ ] Database migrations run
- [ ] Test login functionality
- [ ] Test item creation
- [ ] Test booking flow
- [ ] Test bidding system
- [ ] Check mobile responsiveness
- [ ] Verify animations work
- [ ] Test all pages load
- [ ] Check browser console for errors
- [ ] Set up custom domain (optional)
- [ ] Enable analytics (optional)

---

## 🌐 Custom Domain (Optional)

### Add Custom Domain to Vercel
1. Go to project settings → "Domains"
2. Add your domain: `passiton.yourdomain.com`
3. Update DNS records as instructed
4. Wait for DNS propagation (5-60 minutes)

### Add Custom Domain to Render
1. Go to service settings → "Custom Domain"
2. Add your domain: `api.passiton.yourdomain.com`
3. Update DNS records as instructed
4. Update `VITE_BACKEND_URL` in Vercel

---

## 📝 Environment Variables Reference

### Frontend (.env)
```env
VITE_BACKEND_URL=https://passiton-backend-xxx.onrender.com
VITE_SUPABASE_URL=https://bhqjkmnatcfbbcdktvuh.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
SUPABASE_URL=https://bhqjkmnatcfbbcdktvuh.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://passiton-xxx.vercel.app
```

---

## 🚀 Quick Deploy Commands

```bash
# Deploy frontend
cd frontend
vercel --prod

# Check backend logs
# Go to Render dashboard → Logs

# Redeploy backend
git commit --allow-empty -m "Trigger deploy"
git push
```

---

## 📞 Support

**Vercel Issues**: https://vercel.com/support
**Render Issues**: https://render.com/docs
**Supabase Issues**: https://supabase.com/docs

---

**Deployment Time**: ~15-20 minutes
**Status**: Ready to Deploy! 🎉
