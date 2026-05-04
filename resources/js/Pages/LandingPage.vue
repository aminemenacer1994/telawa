<template>
  <div class="landing-page">

    <!-- Islamic subtle pattern overlay -->
    <div class="bg-pattern"></div>

    <!-- NAVBAR – warm, glassy, with soft entrance -->
    <nav class="navbar">
      <div class="container">
        <div class="nav-content">
          <div class="logo">
            <span class="logo-icon">ﷺ</span>
            <span class="logo-text">Telawa</span>
            <span class="logo-dot">⦿</span>
          </div>
          <div class="nav-links">
            <a href="#about" class="nav-link">Our Mission</a>
            <a href="#features" class="nav-link">Features</a>
          </div>
          <button @click="startJourney" class="btn btn-primary">🌙 Start Free</button>
        </div>
      </div>
    </nav>

    <!-- HERO – with floating subtle animation & Islamic geometry vibe -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-left">
            <div class="hero-badge">
              <span class="badge-dot"></span>
              <span> 🤲 بِسْمِ اللَّهِ 🤲 </span>
            </div>
            <h1 class="hero-title">
              Memorise the Qur’ān.<br>
              <span class="warm-accent">Keep it forever.</span>
            </h1>
            <p class="hero-description">
              Most apps help you memorise.<br>
              <strong>Telawa ensures you never lose it.</strong>
            </p>
            <div class="hero-benefits">
              <div v-for="(benefit, i) in benefits" :key="i" class="benefit-item">
                <span class="check">𓂀</span> {{ benefit }}
              </div>
            </div>
            <div class="hero-actions">
              <button @click="startJourney" class="btn btn-primary btn-lg">🌸 Begin Your Journey</button>
              <button @click="showDemo" class="btn btn-outline btn-lg">🎥 Watch Demo</button>
            </div>
          </div>

          <!-- dashboard – warm & cozy with subtle shine -->
          <div class="hero-right">
            <div class="dashboard-card">
              <div class="card-header">
                <div class="day-badge">🌸 Day <span class="fw-bold">127</span></div>
                <div class="salah-icon">🕌</div>
              </div>
              <div class="progress-main">
                <div class="surah-name">Sūrat Al-Baqarah</div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: animatedWidth + '%' }"></div>
                </div>
                <div class="progress-text">
                  <span>{{ animatedWidth }}% Strong</span>
                  <strong>✨ 4 āyāt need love ✨</strong>
                </div>
              </div>
              <div class="metrics">
                <div class="metric">
                  <span class="metric-label">Weak Verses</span>
                  <span class="metric-value accent">4</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Today's Murāja‘ah</span>
                  <span class="metric-value success">Ready 📖</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Streak</span>
                  <span class="metric-value">37 days 🔥</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-prompt">✨ keep scrolling ✨ ↓</div>
    </section>

    <!-- ABOUT – with a gentle arabesque divider -->
    <section id="about" class="section-padding bg-warm">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <div class="section-label">🕊️ OUR MISSION 🕊️</div>
            <h2 class="section-title">Built to protect what matters most</h2>
            <div class="arabesque">﷽</div>
            <p class="section-text">
              Telawa was born from a simple frustration: so many of us memorise the Qur’ān, only to watch it slowly slip away.
              <br>We created a gentle companion  not just a tool.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES – slightly quirky but elegant cards -->
    <section id="features" class="section-padding">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-label">🧠 RETENTION SYSTEM 🧠</div>
          <h2 class="section-title">A true Hifz guardian.</h2>
          <p class="sub-quirky">like a caring friend who never forgets</p>
        </div>
        <div class="features-grid">
          <div v-for="(feature, i) in features" :key="i" class="feature-card">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h5>{{ feature.title }}</h5>
            <p>{{ feature.description }}</p>
            <div class="card-footnote">{{ feature.footnote }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA – warm, calming, with calligraphy feel -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <h2>Start your journey of <span class="warm-accent">lifelong memorisation</span></h2>
          <p>No pressure. Just barakah & consistency.</p>
          <button @click="startJourney" class="btn btn-cta">✨ Start for Free ✨</button>
          <div class="tiny-dua">“Rabbi zidnī ‘ilma”  My Lord, increase me in knowledge.</div>
        </div>
      </div>
    </section>

    <!-- footer – minimal, warm, islamic sign-off -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <span>Telawa • نور على نور</span>
          <span class="footer-animation">۞</span>
          <span>made with رحمة for huffādh</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      animatedWidth: 0,
      benefits: [
        'Long-term retention focus',
        'Smart personalised murāja‘ah',
        'Early weakness detection',
        'Made for real life  students, parents & huffādh'
      ],
      features: [
        { 
          icon: '🧠✨', 
          title: 'Smart Retention Engine', 
          description: 'Spaced repetition that respects the sacred rhythm of your Hifz.',
          footnote: 'barakah-backed algorithm'
        },
        { 
          icon: '🔍🌙', 
          title: 'Gentle Weakness Detection', 
          description: 'Finds āyāt that need extra love before they fade.',
          footnote: 'no judgment, just care'
        },
        { 
          icon: '📅🍃', 
          title: 'Daily Murāja‘ah', 
          description: 'Clear, manageable revision  never overwhelming.',
          footnote: 'like a daily dhikr'
        },
        { 
          icon: '📈🕊️', 
          title: 'Hifz Intelligence', 
          description: 'Beautiful insights into your consistency and strength.',
          footnote: 'insightful & gentle'
        }
      ]
    }
  },
  mounted() {
    // subtle entrance animation for progress bar
    setTimeout(() => {
      this.animatedWidth = 92;
    }, 300);
  },
  methods: {
    startJourney() {
      alert("🌙 Bismillah  your journey begins with a gentle step.");
    },
    showDemo() {
      alert("🎥 Demo would show you how Telawa feels like a warm study circle.");
    }
  }
}
</script>

<style scoped>
/* ---------------------------------------------
   WARM ISLAMIC DESIGN SYSTEM – subtle, quirky but elegant, fully animated
--------------------------------------------- */
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Inter:opsz,wght@14..32,300;400;500;600;700&display=swap');

.landing-page {
  font-family: 'Inter', system-ui, sans-serif;
  background: #FFFCF7;
  position: relative;
  overflow-x: hidden;
}

/* Subtle geometric background pattern (islamic geometric nod, not overdone) */
.bg-pattern {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(#EBD9B4 0.8px, transparent 0.8px);
  background-size: 32px 32px;
  opacity: 0.2;
  pointer-events: none;
  z-index: 0;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 2;
}

/* ========== NAVBAR ========== */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 252, 245, 0.92);
  backdrop-filter: blur(12px);
  z-index: 1000;
  border-bottom: 1px solid rgba(199, 168, 107, 0.25);
  transition: all 0.3s ease;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
}

.logo {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-family: 'Amiri', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #2C4A3E;
}

.logo-icon {
  font-size: 2rem;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.05));
}

.logo-text {
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #2C5F4A, #BF8F3F);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.logo-dot {
  font-size: 1.2rem;
  color: #CDA45E;
  animation: pulseSoft 2s infinite;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-link {
  text-decoration: none;
  color: #4A3B2C;
  font-weight: 500;
  transition: all 0.2s;
  position: relative;
  font-size: 1rem;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 0;
  height: 2px;
  background: #CDA45E;
  transition: width 0.25s ease;
  border-radius: 4px;
}

.nav-link:hover::after {
  width: 100%;
}

.btn-sm-nav {
  padding: 8px 24px;
}

/* ========== HERO ========== */
.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 120px 0 60px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  align-items: center;
}

.hero-left {
  animation: fadeSlideUp 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #F6EFE2;
  padding: 8px 20px;
  border-radius: 60px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #9B7A47;
  margin-bottom: 28px;
  border: 1px solid #E7DBC8;
  backdrop-filter: blur(4px);
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #CDA45E;
  border-radius: 50%;
  display: inline-block;
  animation: pulse 1.8s infinite;
}

.hero-title {
  font-family: 'Amiri', serif;
  font-size: clamp(2.6rem, 6vw, 4.3rem);
  line-height: 1.15;
  font-weight: 700;
  color: #2C3E2B;
  margin-bottom: 20px;
}

.warm-accent {
  color: #BF8F3F;
  position: relative;
  display: inline-block;
  background: linear-gradient(120deg, #E8D5B5, #F7EDDC);
  background-repeat: no-repeat;
  background-size: 100% 30%;
  background-position: bottom;
}

.hero-description {
  font-size: 1.2rem;
  color: #5A4A34;
  margin: 24px 0 30px;
  line-height: 1.5;
}

.hero-benefits {
  margin: 28px 0 36px;
}

.benefit-item {
  margin: 12px 0;
  font-size: 1rem;
  color: #3D5142;
  display: flex;
  align-items: center;
  gap: 12px;
}

.check {
  font-size: 1.3rem;
  color: #C29B4A;
}

.hero-actions {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 28px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  border: none;
}

.btn-primary {
  background: #1F604B;
  color: white;
  box-shadow: 0 6px 14px rgba(31, 96, 75, 0.2);
}

.btn-primary:hover {
  background: #154e3d;
  transform: translateY(-2px);
  box-shadow: 0 12px 22px rgba(31, 96, 75, 0.25);
}

.btn-outline {
  border: 2px solid #C7A86B;
  background: transparent;
  color: #B2883C;
}

.btn-outline:hover {
  background: #FAF3E6;
  transform: translateY(-2px);
}

.btn-lg {
  padding: 14px 36px;
  font-size: 1rem;
}

/* Dashboard Card */
.hero-right {
  animation: fadeSlideUp 0.9s 0.1s backwards;
}

.dashboard-card {
  background: rgba(255, 253, 245, 0.95);
  backdrop-filter: blur(2px);
  border-radius: 48px;
  padding: 40px 35px;
  box-shadow: 0 35px 65px -18px rgba(82, 57, 24, 0.2);
  border: 1px solid #F0E4D0;
  transition: all 0.4s;
}

.dashboard-card:hover {
  transform: scale(1.01);
  box-shadow: 0 40px 70px -15px rgba(158, 115, 42, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}

.day-badge {
  background: #F2E8DA;
  padding: 6px 18px;
  border-radius: 40px;
  font-weight: 600;
  color: #986f32;
}

.salah-icon {
  font-size: 2rem;
}

.progress-main {
  margin: 24px 0;
}

.surah-name {
  font-family: 'Amiri', serif;
  font-size: 1.9rem;
  font-weight: 700;
  margin-bottom: 18px;
  color: #3A2E22;
}

.progress-bar {
  background: #E8DDCE;
  border-radius: 100px;
  height: 12px;
  overflow: hidden;
}

.progress-fill {
  background: linear-gradient(90deg, #C9A864, #DCB570);
  width: 0%;
  height: 100%;
  border-radius: 100px;
  transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.progress-text {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 0.9rem;
  color: #7C6442;
}

.metrics {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 35px;
  flex-wrap: wrap;
}

.metric {
  background: #FCF7EF;
  padding: 12px 14px;
  border-radius: 28px;
  flex: 1;
  text-align: center;
  transition: all 0.2s;
}

.metric-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #A88646;
  display: block;
}

.metric-value {
  font-weight: 800;
  font-size: 1.35rem;
  color: #2F4D3C;
}

.accent { color: #C39048; }
.success { color: #56803B; }

.scroll-prompt {
  text-align: center;
  margin-top: 70px;
  font-size: 0.85rem;
  letter-spacing: 2px;
  color: #B59462;
  animation: bounceSoft 2s infinite;
}

/* About section */
.section-padding {
  padding: 100px 0;
}

.bg-warm {
  background: #FBF5EA;
  position: relative;
}

.section-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #BE954D;
  margin-bottom: 12px;
}

.section-title {
  font-size: 2.4rem;
  font-family: 'Amiri', serif;
  font-weight: 700;
  color: #2D4538;
}

.arabesque {
  font-size: 2rem;
  color: #CCB17A;
  margin: 18px 0;
  opacity: 0.7;
}

.section-text {
  max-width: 720px;
  margin: 0 auto;
  font-size: 1.2rem;
  line-height: 1.6;
  color: #4F5D4A;
}

/* features grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  margin-top: 60px;
}

.feature-card {
  background: white;
  padding: 38px 28px;
  border-radius: 36px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.04);
  text-align: center;
  transition: all 0.35s ease;
  border: 1px solid #F0E2D0;
}

.feature-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 28px 38px -12px rgba(87, 62, 24, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.feature-card h5 {
  font-size: 1.45rem;
  font-family: 'Amiri', serif;
  margin-bottom: 14px;
  color: #35523F;
}

.feature-card p {
  color: #6F5E47;
  line-height: 1.5;
  font-size: 0.95rem;
}

.card-footnote {
  margin-top: 18px;
  font-size: 0.7rem;
  color: #BD9A60;
  letter-spacing: 0.3px;
  border-top: 1px dashed #EADABC;
  padding-top: 14px;
  font-style: italic;
}

.sub-quirky {
  font-size: 0.9rem;
  color: #B48846;
  margin-top: -8px;
  margin-bottom: 20px;
}

/* CTA section */
.cta-section {
  padding: 80px 0 100px;
}

.cta-card {
  background: linear-gradient(135deg, #FCF5E8, #FFFBF2);
  padding: 70px 40px;
  border-radius: 70px;
  text-align: center;
  border: 1px solid #E9DBC8;
  box-shadow: 0 25px 45px -20px rgba(86, 60, 23, 0.2);
}

.cta-card h2 {
  font-size: 2.2rem;
  font-family: 'Amiri', serif;
  color: #254336;
}

.btn-cta {
  background: #C89D4A;
  color: white;
  margin: 28px 0 20px;
  padding: 14px 40px;
  font-size: 1.1rem;
  box-shadow: 0 6px 14px rgba(200, 157, 74, 0.3);
}

.btn-cta:hover {
  background: #B08734;
  transform: scale(1.02);
}

.tiny-dua {
  font-size: 0.85rem;
  color: #AA874C;
  font-family: 'Amiri', serif;
}

/* footer */
.footer {
  background: #1E2F28;
  color: #DDD0BA;
  padding: 32px 0;
  margin-top: 40px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  font-weight: 300;
}

.footer-animation {
  animation: spinSlow 10s infinite linear;
  display: inline-block;
}

/* Animations */
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); background: #E7B551; }
  100% { opacity: 0.5; transform: scale(1); }
}

@keyframes pulseSoft {
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
}

@keyframes bounceSoft {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(5px); }
}

@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 992px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 50px;
  }
  .hero-right {
    order: 2;
  }
  .nav-links {
    display: none;
  }
  .footer-content {
    flex-direction: column;
    gap: 12px;
  }
  .cta-card {
    padding: 40px 20px;
  }
}

@media (max-width: 640px) {
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .btn {
    text-align: center;
  }
}
</style>