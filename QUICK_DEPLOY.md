# 🚀 Quick Deployment Checklist

## Before You Start
- [ ] Code is committed to Git
- [ ] All features tested locally
- [ ] Environment variables documented
- [ ] Database migrations completed

---

## Frontend (Vercel) - 5 minutes

### 1. Push to GitHub
```bash
git add .
git commit -m "feat: ready for deployment"
git push origin main
```

### 2. Deploy to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Set Root Directory: `frontend`
4. Add environment variables:
   - `VITE_BACKEND_URL` (will update after backend deploy)
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click "Deploy"

### 3. Note Your URL
```
Frontend URL: https://passiton-xxx.vercel.app
```

---

## Backend (Render) - 10 minutes

### 1. Deploy to Render
1. Go to https://dashboard.render.com/select-repo
2. Connect GitHub and select repo
3. Configure:
   - Name: `passiton-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

### 2. Add Environment Variables
```
NODE_ENV=production
PORT=5000
SUPABASE_URL=https://bhqjkmnatcfbbcdktvuh.supabase.co
SUPABASE_ANON_KEY=<your_key>
SUPABASE_SERVICE_ROLE_KEY=<your_key>
JWT_SECRET=<your_secret>
FRONTEND_URL=https://passiton-xxx.vercel.app
```

### 3. Note Your URL
```
Backend URL: https://passiton-backend-xxx.onrender.com
```

---

## Connect Frontend to Backend - 2 minutes

### 1. Update Vercel Environment Variable
1. Go to Vercel project → Settings → Environment Variables
2. Update `VITE_BACKEND_URL`:
   ```
   https://passiton-backend-xxx.onrender.com
   ```
3. Redeploy frontend

---

## Test Deployment - 5 minutes

### Frontend Tests
- [ ] Visit frontend URL
- [ ] Pages load without errors
- [ ] No console errors (F12)
- [ ] Images load correctly

### Backend Tests
- [ ] Visit backend URL
- [ ] See API welcome message
- [ ] No 500 errors

### Integration Tests
- [ ] Login works
- [ ] Browse items works
- [ ] Create item works
- [ ] Animations work
- [ ] Mobile responsive

---

## ✅ Done!

Your app is live:
- **Frontend**: https://passiton-xxx.vercel.app
- **Backend**: https://passiton-backend-xxx.onrender.com

---

## 🐛 Quick Fixes

**Frontend not loading?**
→ Check VITE_BACKEND_URL is correct

**Backend not responding?**
→ Check Render logs for errors

**CORS errors?**
→ Update FRONTEND_URL in Render

**Database errors?**
→ Verify Supabase credentials

---

**Total Time**: ~20 minutes
**Difficulty**: Easy
**Cost**: Free (with limitations)
