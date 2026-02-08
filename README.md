# 🎓 PassItOn - Campus Micro-Economy Platform

> A modern, Gen-Z focused platform for college students to share resources, offer skills, and build a sustainable campus economy.

[![React](https://img.shields.io/badge/React-19.2.4-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-orange.svg)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

---

## 🌟 Features

### 🎒 Resource Sharing
- **List Items**: Share textbooks, lab equipment, electronics, tools, and more
- **Browse & Search**: Find items by category with smart filtering
- **Booking System**: Request to borrow items with date selection
- **Availability Tracking**: Real-time item availability status

### 💼 Skill Marketplace
- **Offer Services**: Photography, tutoring, design, development, and more
- **Book Services**: Schedule and pay for peer services
- **Service Management**: Track bookings and manage your offerings

### 💰 Bidding System
- **Dynamic Bidding**: Create timed bidding sessions for items
- **Quick Bid Buttons**: ₹50-₹300 preset amounts with auto-calculation
- **Real-time Updates**: Live bid tracking with 3-second polling
- **Auto-Close**: Sessions automatically close at deadline
- **Accept/Reject**: Owners can manage bids and create bookings

### 🎮 Gamification
- **Trust Badges**: Verified, Trusted, Streak, Trending indicators
- **Reputation System**: Circular progress rings with gradient animations
- **Lending Streaks**: Track consecutive days of sharing
- **Achievement Celebrations**: Confetti animations for milestones

### ✨ Motion Experience
- **Animated Components**: Ripple effects, hover lifts, perspective tilts
- **Staggered Reveals**: Sequential content loading with spring physics
- **Shimmer Loading**: Engaging skeleton states
- **Success Celebrations**: Confetti particles and bouncing icons
- **Smooth Transitions**: 60fps animations with GPU acceleration

### 🔐 Security & Trust
- **JWT Authentication**: Secure user sessions
- **Row Level Security**: Supabase RLS policies
- **Email Verification**: Verified student badges
- **Profile System**: User reputation and activity tracking

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 19.2.4 + Vite 7.2.4
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 3.4.1
- **Animations**: Framer Motion 12.33.0
- **Routing**: React Router DOM 7.13.0
- **HTTP Client**: Axios 1.13.4
- **Icons**: Lucide React 0.563.0
- **Notifications**: React Hot Toast 2.6.0

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express 4.18.2
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT + bcryptjs
- **Validation**: Express Validator 7.3.1
- **File Upload**: Multer 2.0.2
- **CORS**: Enabled for cross-origin requests

### Database
- **Provider**: Supabase
- **Type**: PostgreSQL
- **Features**: Real-time subscriptions, RLS, Functions, Triggers

---

## 📁 Project Structure

```
passiton/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── AnimatedButton.tsx
│   │   │   ├── AnimatedCard.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── TrustBadge.tsx
│   │   │   └── SuccessCelebration.tsx
│   │   ├── pages/           # Page components
│   │   │   ├── MyItemsPage.tsx
│   │   │   ├── BrowsePage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   └── ...
│   │   ├── layouts/         # Layout components
│   │   ├── services/        # API services
│   │   ├── utils/           # Utilities & animations
│   │   ├── context/         # React context
│   │   └── types/           # TypeScript types
│   ├── public/              # Static assets
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── vercel.json          # Vercel deployment config
│
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── config/          # Supabase config
│   │   └── server.js        # Entry point
│   ├── sql/                 # Database migrations
│   │   ├── items.sql
│   │   ├── bidding_setup.sql
│   │   └── add_bidding_ends_at.sql
│   ├── uploads/             # File uploads
│   ├── package.json
│   └── render.yaml          # Render deployment config
│
├── DEPLOYMENT_GUIDE.md      # Deployment instructions
├── MOTION_SYSTEM_DOCS.md    # Animation system docs
├── IMPLEMENTATION_SUMMARY.md # Implementation details
├── README.md                # This file
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/passiton.git
cd passiton
```

2. **Setup Backend**
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Add your credentials to .env:
# SUPABASE_URL=your_supabase_url
# SUPABASE_ANON_KEY=your_anon_key
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
# JWT_SECRET=your_jwt_secret
# PORT=5000
# FRONTEND_URL=http://localhost:5173
```

3. **Setup Database**
```bash
# Run migrations in Supabase SQL Editor
# Execute files in backend/sql/ in order:
# 1. setup_enums.sql
# 2. profiles.sql
# 3. colleges.sql
# 4. items.sql
# 5. lending.sql
# 6. bidding_setup.sql
# 7. add_bidding_ends_at.sql
```

4. **Setup Frontend**
```bash
cd ../frontend
npm install

# Create .env file
cp .env.example .env

# Add your credentials to .env:
# VITE_BACKEND_URL=http://localhost:5000
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_anon_key
```

5. **Start Development Servers**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

6. **Open Browser**
```
Frontend: http://localhost:5173
Backend: http://localhost:5000
```

---

## 🎨 Key Features Showcase

### Enhanced Bidding System
- **Quick Bid Buttons**: 6 preset amounts (₹50-₹300) with dynamic calculation
- **Timed Sessions**: Owner sets bidding deadline
- **Auto-Close**: Automatic session closure at end time
- **Real-time Updates**: Live bid tracking
- **Accept/Reject**: Owner controls with booking creation

### Motion Experience System
- **AnimatedButton**: Ripple effects, press depth, spring animations
- **AnimatedCard**: Hover lift (8px), perspective tilt, glassmorphism
- **Skeleton Loaders**: Shimmer loading states
- **Empty States**: Floating animations with motivational copy
- **Trust Badges**: Gamification indicators (verified, streak, trending)
- **Success Celebrations**: Confetti particles for achievements

### Item Categories (Engineering Focus)
- Textbooks & Reference Books
- Lab Equipment & Instruments
- Electronics & Circuit Components
- Microcontrollers & Development Boards
- Mechanical Tools & Instruments
- Software & Licenses
- Calculators & Computing Devices
- Drawing & Drafting Tools
- Safety Equipment
- Project Components

---

## 📱 Pages

### Public Pages
- **Login/Signup**: Authentication with email verification
- **Dashboard**: Overview of platform activity
- **Browse Items**: Search and filter items
- **Browse Skills**: Discover peer services
- **Item Detail**: View item details and book

### Protected Pages
- **My Items**: Manage your listed items
- **My Listings**: All your listings (items + services)
- **My Bookings**: Track your bookings
- **Create Item**: List new items
- **Offer Skill**: Create service offerings
- **Profile**: View reputation and activity
- **Wallet**: Transaction history
- **Settings**: Account preferences
- **Notifications**: Activity updates

---

## 🎯 API Endpoints

### Authentication
```
POST   /api/auth/signup          # Register new user
POST   /api/auth/login           # Login user
POST   /api/auth/logout          # Logout user
GET    /api/auth/me              # Get current user
```

### Items
```
GET    /api/items                # Get all items
GET    /api/items/:id            # Get item by ID
POST   /api/items                # Create item
PUT    /api/items/:id            # Update item
DELETE /api/items/:id            # Delete item
GET    /api/items/my-items       # Get user's items
```

### Bidding
```
POST   /api/bidding/sessions                    # Create bidding session
GET    /api/bidding/sessions/:type/:id          # Get session
POST   /api/bidding/sessions/:id/bids           # Place bid
PATCH  /api/bidding/sessions/:id/bids/:bid/accept  # Accept bid
PATCH  /api/bidding/sessions/:id/bids/:bid/reject  # Reject bid
PATCH  /api/bidding/sessions/:id/close          # Close session
```

### Services
```
GET    /api/services             # Get all services
POST   /api/services             # Create service
GET    /api/services/:id         # Get service by ID
PUT    /api/services/:id         # Update service
DELETE /api/services/:id         # Delete service
```

### Bookings
```
POST   /api/bookings             # Create booking
GET    /api/bookings/my-bookings # Get user's bookings
PATCH  /api/bookings/:id         # Update booking status
```

---

## 🎨 Design System

### Colors
- **Primary**: Sky Blue (#0EA5E9)
- **Secondary**: Purple (#A855F7)
- **Accent**: Orange (#F97316)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Animations
- **Durations**: instant (0.1s), fast (0.2s), normal (0.3s), slow (0.5s)
- **Easing**: smooth, bounce, elastic, spring, springBouncy
- **Effects**: fadeIn, slideUp, scaleIn, cardHover, buttonPress

### Shadows
- **card**: Subtle elevation
- **card-hover**: Lifted state
- **card-lift**: Maximum elevation
- **glow-primary**: Blue glow
- **glow-secondary**: Purple glow
- **glow-accent**: Orange glow

---

## 🚀 Deployment

### Quick Deploy (20 minutes)

**Frontend (Vercel)**
1. Push to GitHub
2. Import repo in Vercel
3. Set root directory: `frontend`
4. Add environment variables
5. Deploy

**Backend (Render)**
1. Connect GitHub repo
2. Set root directory: `backend`
3. Add environment variables
4. Deploy

**Detailed Instructions**: See `DEPLOYMENT_GUIDE.md`

---

## 🧪 Testing

### Run Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Item creation and listing
- [ ] Item browsing and search
- [ ] Booking flow
- [ ] Bidding system
- [ ] Profile management
- [ ] Notifications
- [ ] Mobile responsiveness
- [ ] Animations performance

---

## 📊 Database Schema

### Key Tables
- **profiles**: User profiles with reputation
- **items**: Listed items for sharing
- **services**: Skill offerings
- **borrow_requests**: Item booking requests
- **bookings**: Service bookings
- **bidding_sessions**: Bidding sessions with end time
- **bids**: Individual bids with status
- **bidding_messages**: Chat messages in bidding
- **transactions**: Payment records
- **notifications**: User notifications

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👥 Authors

**Raj Parihar**
- Email: mrrajparihar281@gmail.com
- GitHub: [@rajparihar](https://github.com/YOUR_USERNAME)

---

## 🙏 Acknowledgments

- **Supabase** - Backend infrastructure
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **Framer Motion** - Animation library
- **Tailwind CSS** - Styling framework
- **Lucide** - Icon library

---

## 📞 Support

For support, email mrrajparihar281@gmail.com or open an issue on GitHub.

---

## 🗺️ Roadmap

### Phase 1 ✅ (Completed)
- [x] Basic item sharing
- [x] User authentication
- [x] Booking system
- [x] Bidding system with timed sessions
- [x] Motion experience system
- [x] Trust badges and gamification

### Phase 2 🚧 (In Progress)
- [ ] Real-time chat
- [ ] Payment integration
- [ ] Push notifications
- [ ] Advanced search filters
- [ ] User ratings and reviews

### Phase 3 📋 (Planned)
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Campus verification system
- [ ] Analytics dashboard
- [ ] Multi-language support

---

## 📈 Stats

- **Total Components**: 50+
- **API Endpoints**: 40+
- **Database Tables**: 15+
- **Animations**: 40+ custom keyframes
- **Pages**: 20+
- **Lines of Code**: 15,000+

---

## 🎯 Project Goals

1. **Sustainability**: Reduce waste through resource sharing
2. **Community**: Build trust and connections on campus
3. **Economy**: Create micro-economy for students
4. **Skills**: Enable peer-to-peer skill sharing
5. **Experience**: Provide delightful, engaging UX

---

**Made with ❤️ for college students by college students**

---

## 🔗 Quick Links

- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Motion System Docs](MOTION_SYSTEM_DOCS.md)
- [Implementation Summary](IMPLEMENTATION_SUMMARY.md)
- [Quick Deploy Checklist](QUICK_DEPLOY.md)
- [Bidding System Guide](BIDDING_SYSTEM_GUIDE.md)

---

**⭐ Star this repo if you find it helpful!**
