<template>
  <div class="landing-page">

    <div class="bg-pattern"></div>

    <!-- NAVBAR – Compact, includes Contact -->
    <nav class="navbar">
      <div class="container nav-container">
        <div class="logo">
          <img src="/images/logo4.png" width="250" alt="Telawa">
        </div>

        <div class="nav-links-desktop">
          <a href="#how-it-works" class="nav-link">How it works</a>
          <a href="#why-us" class="nav-link">Why us</a>
          <a href="#pricing" class="nav-link">Pricing</a>
          <a href="#faq" class="nav-link">FAQ</a>
          <a href="#contact" class="nav-link">Contact</a>
        </div>

        <button class="btn btn-primary desktop-cta" @click="startJourney">Start free trial →</button>

        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <span></span><span></span><span></span>
        </button>
      </div>

      <div class="nav-links-mobile" :class="{ 'active': mobileMenuOpen }">
        <a href="#how-it-works" class="nav-link" @click="closeMobileMenu">How it works</a>
        <a href="#why-us" class="nav-link" @click="closeMobileMenu">Why us</a>
        <a href="#pricing" class="nav-link" @click="closeMobileMenu">Pricing</a>
        <a href="#faq" class="nav-link" @click="closeMobileMenu">FAQ</a>
        <a href="#contact" class="nav-link" @click="closeMobileMenu">Contact</a>
        <button class="btn btn-primary mobile-cta" @click="startJourney">Start free trial →</button>
      </div>
    </nav>

    <!-- HERO – Pain point focused -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-left">
            <div class="hero-badge">
              <span class="badge-dot"></span>
              <span>🤲 بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ 🤲</span>
            </div>
            <h1 class="hero-title">
              You memorised. <span class="highlight">Then you forgot.</span>
            </h1>
            <p class="hero-description">
              We get it. You spent months maybe years memorising the Qur'an. Then life happened. Work. Kids. Exams.
              And slowly, those āyāt started slipping away.
            </p>
            <div class="pain-solution">
              <div class="pain">😔 The problem: No structured revision.</div>
              <div class="solution">✨ Our solution: A retention system that finds your weak spots before you forget
                them.</div>
            </div>
            <div class="hero-actions">
              <button @click="startJourney" class="btn btn-primary btn-lg">🎯 Fix my retention →</button>
              <button @click="showDemo" class="btn btn-outline btn-lg">👀 See how it works</button>
            </div>
            <p class="no-credit">14-day free trial • No credit card • Cancel anytime</p>
          </div>

          <div class="hero-right">
            <div class="dashboard-card">
              <div class="card-header">
                <div class="day-badge">📅 Day 127</div>
                <div class="retention-badge">📊 92% retained</div>
              </div>
              <div class="surah-info">
                <span class="surah-name">Surah Al-Baqarah</span>
                <span class="ayah-range">Verses 1–286</span>
              </div>
              <div class="progress-section">
                <div class="progress-label">
                  <span>🧠 Retention strength</span>
                  <strong>92%</strong>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: animatedWidth + '%' }"></div>
                </div>
              </div>
              <div class="revision-info">
                <div class="revision-item">
                  <span class="revision-label">⚠️ Weak verses detected</span>
                  <span class="revision-value">4 need attention</span>
                </div>
                <div class="revision-item">
                  <span class="revision-label">📖 Today's revision</span>
                  <span class="revision-value">12 verses</span>
                </div>
                <div class="revision-item">
                  <span class="revision-label">🔥 Current streak</span>
                  <span class="revision-value">37 days</span>
                </div>
              </div>
              <div class="dashboard-note">“The best among you are those who learn the Qur'an and teach it.” ﷺ</div>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-prompt">↓ Keep scrolling this gets real ↓</div>
    </section>

    <!-- SOCIAL PROOF – 3 testimonials (Hafiz, Parent, Female Student) -->
    <section class="testimonials-section">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-label">💬 Real huffadh. Real results.</div>
          <h2 class="section-title">What our community is saying</h2>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-quote">"</div>
            <p class="testimonial-text">After 8 years of Hifz, I was forgetting faster than I could revise. Telawa
              changed that. My retention went from 60% to 89% in 4 months. Alhamdulillah.</p>
            <div class="testimonial-author">— Abu Abdullah, Hafiz & Teacher</div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-quote">"</div>
            <p class="testimonial-text">As a working mother of three, I barely had time to revise. Telawa's 15-minute
              sessions fit perfectly into my day. I've finally stopped forgetting what I memorised years ago.</p>
            <div class="testimonial-author">— Fatima, Mother & Hafiza</div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-quote">"</div>
            <p class="testimonial-text">I started my Hifz journey at university. Other apps overwhelmed me. Telawa's
              gentle approach gave me confidence. I've now completed 5 juz and remember them all.</p>
            <div class="testimonial-author">— Aisha, University Student</div>
          </div>
        </div>
      </div>
    </section>

    <!-- WHAT MAKES US DIFFERENT -->
    <section class="difference-section">
      <div class="container">
        <div class="difference-header">
          <div class="section-label">🧐 Here's what makes us different</div>
          <h2 class="section-title">Other apps & websites VS Telawa</h2>
        </div>
        <div class="difference-grid">
          <div class="other-card">
            <h3>📱 Other apps & websites</h3>
            <ul>
              <li>❤️ Focus on how FAST you memorise</li>
              <li>🎮 Gamify the Qur'an with badges</li>
              <li>⏰ Fixed revision intervals (one size fits all)</li>
              <li>😰 You only realise you forgot AFTER the test</li>
              <li>📈 Show you how much you've "done"</li>
            </ul>
          </div>
          <div class="vs-divider">VS</div>
          <div class="telawa-card">
            <h3>✨ Telawa</h3>
            <ul>
              <li>🧠 Focus on what you KEEP forever</li>
              <li>🕌 No gamification just sincere progress</li>
              <li>🎯 Adaptive revision based on YOUR recall</li>
              <li>⚠️ Flags weak verses BEFORE they fade</li>
              <li>📉 Shows you what you're about to forget</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section id="how-it-works" class="how-it-works">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-label">⚙️ The Telawa method</div>
          <h2 class="section-title">Three steps. Zero forgetfulness. Insha'Allah.</h2>
          <p class="section-subtitle">No fluff. No gimmicks. Just a system that actually works.</p>
        </div>
        <div class="steps-grid">
          <div class="step-card animate-on-scroll">
            <div class="step-number">01</div>
            <div class="step-icon">📥</div>
            <h3>Tell us what you know <span class="step-quirk">(even if it's shaky)</span></h3>
            <p>Import your Hifz or start fresh. We don't judge weak spots we hunt them down so you can fix them.</p>
            <div class="step-result">🎯 Result: A personalised map of your forgetting risks</div>
          </div>
          <div class="step-card animate-on-scroll">
            <div class="step-number">02</div>
            <div class="step-icon">⚡</div>
            <h3>Revise 15 minutes daily <span class="step-quirk">(between salah works great)</span></h3>
            <p>Our algorithm serves you verses JUST before you'd forget them. Not too early. Not too late.</p>
            <div class="step-result">⏱️ Result: 89% retention after 6 months*</div>
          </div>
          <div class="step-card animate-on-scroll">
            <div class="step-number">03</div>
            <div class="step-icon">🛡️</div>
            <h3>Never lose an ayah again <span class="step-quirk">(seriously, never)</span></h3>
            <p>Weak verses are flagged in advance. You'll always know what needs attention no surprises.</p>
            <div class="step-result">🎉 Result: Peace of mind. Your Hifz is protected.</div>
          </div>
        </div>
        <div class="steps-note">*Based on beta user data (n=247). Your results may vary, but we guarantee improvement or
          your money back.</div>
      </div>
    </section>

    <!-- WHY TELAWA – Pain points -->
    <section id="why-us" class="why-us">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-label">🤔 Why Telawa?</div>
          <h2 class="section-title">Because forgetting the Qur'an hurts.</h2>
          <p class="section-subtitle">We've been there. Here's how we solve what others ignore.</p>
        </div>

        <div class="pain-points-grid">
          <div class="pain-point">
            <div class="pain-emoji">😰</div>
            <div class="pain-question">"I don't know what I'm forgetting"</div>
            <div class="our-solution">→ We flag weak verses BEFORE they fade. You'll see exactly what needs revision.
            </div>
          </div>
          <div class="pain-point">
            <div class="pain-emoji">⏰</div>
            <div class="pain-question">"I have no time for revision"</div>
            <div class="our-solution">→ 15 minutes a day. That's it. Our algorithm maximises every minute.</div>
          </div>
          <div class="pain-point">
            <div class="pain-emoji">🎮</div>
            <div class="pain-question">"Apps feel like games not serious"</div>
            <div class="our-solution">→ No badges. No leaderboards. Just clear metrics and honest feedback.</div>
          </div>
          <div class="pain-point">
            <div class="pain-emoji">📚</div>
            <div class="pain-question">"I memorised years ago now it's gone"</div>
            <div class="our-solution">→ Our system rebuilds weak foundations. You CAN get it back.</div>
          </div>
        </div>

        <div class="guarantee-card">
          <div class="guarantee-icon">🤲</div>
          <div class="guarantee-text">
            <h3>Our promise to you</h3>
            <p>If your retention doesn't improve within 30 days, we'll refund every penny. No forms. No runaround. Just
              your money back.</p>
            <span class="guarantee-small">Because we actually believe in what we built.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- WHAT'S AVAILABLE -->
    <section class="whats-available">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-label">📦 What's inside</div>
          <h2 class="section-title">Everything you need to protect your Hifz</h2>
        </div>
        <div class="features-showcase">
          <div class="feature-showcase">
            <div class="feature-icon">🧠</div>
            <div class="feature-info">
              <h4>Adaptive retention engine</h4>
              <p>Not fixed intervals. Our algorithm learns YOUR forgetting curve.</p>
            </div>
          </div>
          <div class="feature-showcase">
            <div class="feature-icon">⚠️</div>
            <div class="feature-info">
              <h4>Weakness forecast</h4>
              <p>We predict which verses you're about to forget and fix them first.</p>
            </div>
          </div>
          <div class="feature-showcase">
            <div class="feature-icon">📊</div>
            <div class="feature-info">
              <h4>Honest analytics</h4>
              <p>No vanity metrics. Just real data on what you actually remember.</p>
            </div>
          </div>
          <div class="feature-showcase">
            <div class="feature-icon">🕌</div>
            <div class="feature-info">
              <h4>Scholar-backed method</h4>
              <p>Built with certified huffadh. Traditional principles, modern tech.</p>
            </div>
          </div>
          <div class="feature-showcase">
            <div class="feature-icon">👨‍👩‍👧‍👦</div>
            <div class="feature-info">
              <h4>Family sharing</h4>
              <p>One subscription covers up to 5 family members. Track everyone's progress.</p>
            </div>
          </div>
          <div class="feature-showcase">
            <div class="feature-icon">🔒</div>
            <div class="feature-info">
              <h4>Privacy first</h4>
              <p>Your progress belongs to you. No selling. No tracking. No ads.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING SECTION – With international note -->
    <section id="pricing" class="pricing-section">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-label">💰 Fair pricing. No surprises.</div>
          <h2 class="section-title">Invest in what matters</h2>
          <p class="section-subtitle">14-day free trial • Cancel anytime • Full access during trial</p>
        </div>
        <div class="pricing-grid">
          <div class="pricing-card">
            <div class="plan-name">Monthly</div>
            <div class="plan-price">£9.99 <span>/ month</span></div>
            <div class="plan-price-gbp">£7.99 / month</div>
            <ul class="plan-features">
              <li>Full retention engine</li>
              <li>Unlimited verses & surahs</li>
              <li>Personalised revision</li>
              <li>Progress analytics</li>
              <li>Email support</li>
            </ul>
            <button @click="startMonthly" class="btn btn-outline full-width">Start free trial →</button>
          </div>
          <div class="pricing-card featured">
            <div class="popular-badge">✨ Best value ✨</div>
            <div class="plan-name">Annual</div>
            <div class="plan-price">£79.99 <span>/ year</span></div>
            <div class="plan-price-gbp">£63.99 / year</div>
            <div class="plan-savings">Save 33% • 2 months free</div>
            <ul class="plan-features">
              <li>Everything in Monthly</li>
              <li>Priority support</li>
              <li>Export progress reports</li>
              <li>Family sharing (up to 3)</li>
              <li>Early access to new features</li>
            </ul>
            <button @click="startAnnual" class="btn btn-primary full-width">Start free trial →</button>
          </div>
          <div class="pricing-card">
            <div class="plan-name">Lifetime</div>
            <div class="plan-price">£249 <span>one time</span></div>
            <div class="plan-price-gbp">£199 one time</div>
            <ul class="plan-features">
              <li>Everything in Annual</li>
              <li>Lifetime updates</li>
              <li>Priority support forever</li>
              <li>Family sharing (up to 5)</li>
              <li>Never pay again</li>
            </ul>
            <button @click="startLifetime" class="btn btn-outline full-width">Start free trial →</button>
          </div>
        </div>
        <div class="pricing-note">💳 All prices in GBP. Exact conversion at checkout.</div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="faq-section">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-label">❓ Got questions?</div>
          <h2 class="section-title">We've heard them all.</h2>
          <p class="section-subtitle">Here are the ones we get asked most.</p>
        </div>
        <div class="faq-grid">
          <div v-for="(faq, i) in faqs" :key="i" class="faq-item" @click="toggleFaq(i)">
            <div class="faq-question">
              <span>{{ faq.question }}</span>
              <svg :class="{ 'rotated': openFaq === i }" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <div class="faq-answer" :class="{ 'open': openFaq === i }">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
        <div class="faq-footer">
          <p>Still have questions? <a href="#" @click.prevent="openContact">Reach out to our team →</a> We respond
            within 24 hours, insha'Allah.</p>
        </div>
      </div>
    </section>

    <!-- CONTACT – Spiritual, warm tone -->
    <section id="contact" class="contact-section">
      <div class="container">
        <div class="contact-card">
          <div class="contact-left">
            <div class="contact-emoji">📬</div>
            <h3>We'd love to hear from you</h3>
            <p>Whether you have a question about Telawa, need help with your Hifz journey, or just want to share your
              story our team is here for you.</p>
            <div class="contact-detail">✉️ support@telawa.com</div>
            <div class="contact-detail">⏱️ Response within 24 hours</div>
            <div class="contact-dua">“And when My servants ask you concerning Me indeed I am near.” Qur'an 2:186
            </div>
          </div>
          <form class="contact-right" @submit.prevent="submitContact">
            <input type="text" placeholder="Your name" class="form-input" required>
            <input type="email" placeholder="Email address" class="form-input" required>
            <textarea placeholder="How can we help?" rows="3" class="form-textarea" required></textarea>
            <button type="submit" class="btn btn-primary">Send message ✉️</button>
          </form>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">Telawa نور على نور</div>
            <p class="footer-tagline">Preserving the Qur'an in hearts, one ayah at a time.</p>
          </div>
          <div class="footer-links-group">
            <h4>Product</h4>
            <a href="#how-it-works">How it works</a>
            <a href="#why-us">Why us</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>
          <div class="footer-links-group">
            <h4>Support</h4>
            <a href="#contact">Contact</a>
            <a href="#">Help center</a>
            <a href="#">Privacy policy</a>
          </div>
          <div class="footer-links-group">
            <h4>Connect</h4>
            <a href="#">support@telawa.com</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2025 Telawa. Made with رحمة for the Ummah.</p>
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
      mobileMenuOpen: false,
      animatedWidth: 0,
      openFaq: null,
      faqs: [
        {
          question: "I forget verses I memorised years ago. Can Telawa really help?",
          answer: "Yes and that's exactly what we built this for. Our system identifies weak verses based on your recall patterns and schedules revision to rebuild those foundations. Many users have recovered 'lost' juz within weeks."
        },
        {
          question: "How is this different from Anki or other flashcard apps?",
          answer: "Anki is generic spaced repetition. Telawa is built specifically for Qur'an memorisation with features like ayah-level tracking, proper Arabic script, tajweed markers, and revision schedules designed by huffadh, not generalists."
        },
        {
          question: "I only have 10 minutes a day. Is that enough?",
          answer: "Yes. Our algorithm is optimised for micro-sessions. 10-15 minutes daily is enough to maintain most people's Hifz. We prioritise efficiency over volume."
        },
        {
          question: "What if I skip a few days?",
          answer: "Life happens we get it. The algorithm adjusts when you return, prioritising the verses most at risk. No guilt, no punishments. Just a smart system that meets you where you are."
        },
        {
          question: "Do I need to be tech-savvy to use this?",
          answer: "Not at all. The interface is clean and simple. If you can send an email, you can use Telawa. We've tested it with users aged 12 to 75."
        }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.animatedWidth = 92;
    }, 300);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false;
      document.body.style.overflow = '';
    },
    toggleFaq(index) {
      this.openFaq = this.openFaq === index ? null : index;
    },
    openContact() {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    },
    startJourney() {
      alert("🎯 Start your 14-day free trial. No credit card required. Let's fix your retention together.");
    },
    showDemo() {
      alert("👀 Watch how Telawa finds your weak spots before you forget them. Request a demo: support@telawa.com");
    },
    startMonthly() {
      alert("Monthly plan: $9.99/month (≈ £7.99) • 14-day free trial • Cancel anytime");
    },
    startAnnual() {
      alert("Annual plan: $79.99/year (≈ £63.99) • Save 33% • 14-day free trial • Family sharing included");
    },
    startLifetime() {
      alert("Lifetime plan: $249 one-time (≈ £199) • 14-day free trial • Never pay again");
    },
    submitContact() {
      alert("Thank you for reaching out. We'll respond within 24 hours, insha'Allah.");
    }
  }
}
</script>

<style scoped>
/* ============================================
   UNIQUE ISLAMIC LANDING PAGE
   Professional • Spiritual • Pain-point focused
============================================ */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.landing-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #FEFCF8;
  color: #1E2F2A;
  line-height: 1.5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ========== NAVBAR ========== */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: #FEFCF8;
  border-bottom: 1px solid #EFEAE2;
  z-index: 1000;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-mark {
  font-size: 1.3rem;
  color: #A0784C;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.3px;
  color: #1E2F2A;
}

.nav-links-desktop {
  display: flex;
  gap: 28px;
}

.nav-link {
  text-decoration: none;
  color: #4A5B53;
  font-weight: 500;
  font-size: 0.85rem;
  transition: color 0.2s;
  cursor: pointer;
}

.nav-link:hover {
  color: #A0784C;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}

.mobile-menu-btn span {
  width: 20px;
  height: 2px;
  background: #1E2F2A;
}

.nav-links-mobile {
  position: fixed;
  top: 55px;
  left: -100%;
  width: 100%;
  height: calc(100vh - 55px);
  background: #FEFCF8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px 20px;
  transition: 0.3s ease;
  z-index: 999;
}

.nav-links-mobile.active {
  left: 0;
}

.nav-links-mobile .nav-link {
  font-size: 1rem;
  padding: 8px;
}

.desktop-cta,
.mobile-cta {
  display: block;
}

@media (max-width: 992px) {

  .nav-links-desktop,
  .desktop-cta {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }
}

/* ========== BUTTONS ========== */
.btn {
  padding: 8px 20px;
  border-radius: 100px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-family: inherit;
}

.btn-primary {
  background: #1E5A4A;
  color: white;
}

.btn-primary:hover {
  background: #16483B;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  border: 1.5px solid #C7B28B;
  color: #A0784C;
}

.btn-outline:hover {
  background: #F6F2EA;
}

.btn-lg {
  padding: 12px 28px;
  font-size: 0.95rem;
}

.full-width {
  width: 100%;
}

/* ========== HERO ========== */
.hero-section {
  padding: 110px 0 70px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #F0EBE2;
  padding: 5px 12px;
  border-radius: 100px;
  font-size: 0.75rem;
  color: #A0784C;
  margin-bottom: 28px;
}

.badge-dot {
  width: 5px;
  height: 5px;
  background: #A0784C;
  border-radius: 50%;
}

.hero-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.2;
  font-weight: 700;
  margin-bottom: 20px;
}

.highlight {
  color: #A0784C;
  border-bottom: 3px solid #E8DCC8;
  display: inline-block;
}

.hero-description {
  font-size: 0.95rem;
  color: #5A6B63;
  margin-bottom: 24px;
  line-height: 1.6;
}

.pain-solution {
  background: #F0EBE2;
  padding: 16px 20px;
  border-radius: 16px;
  margin: 24px 0;
}

.pain {
  color: #A0784C;
  font-weight: 500;
  margin-bottom: 8px;
}

.solution {
  color: #1E5A4A;
  font-weight: 500;
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.no-credit {
  font-size: 0.7rem;
  color: #8A9C93;
}

/* Dashboard */
.dashboard-card {
  background: white;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04);
  border: 1px solid #EFEAE2;
}

.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid #EFEAE2;
}

.day-badge,
.retention-badge {
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 20px;
}

.day-badge {
  background: #EEF4F1;
  color: #1E5A4A;
}

.retention-badge {
  background: #F6F2EA;
  color: #A0784C;
}

.surah-name {
  font-size: 1.2rem;
  font-weight: 600;
}

.ayah-range {
  font-size: 0.7rem;
  color: #8A9C93;
}

.progress-section {
  margin: 20px 0;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  margin-bottom: 6px;
}

.progress-bar {
  background: #EFEAE2;
  border-radius: 100px;
  height: 5px;
}

.progress-fill {
  background: #A0784C;
  width: 0%;
  height: 100%;
  border-radius: 100px;
  transition: width 1s ease;
}

.revision-info {
  display: flex;
  gap: 16px;
  margin: 20px 0 12px;
  padding-top: 14px;
  border-top: 1px solid #EFEAE2;
}

.revision-item {
  flex: 1;
}

.revision-label {
  font-size: 0.65rem;
  color: #8A9C93;
}

.revision-value {
  font-weight: 600;
  font-size: 0.8rem;
}

.dashboard-note {
  font-size: 0.65rem;
  color: #A0784C;
  text-align: center;
  margin-top: 14px;
}

.scroll-prompt {
  text-align: center;
  margin-top: 50px;
  font-size: 0.7rem;
  color: #A8B5AA;
}

/* ========== TESTIMONIALS ========== */
.testimonials-section {
  padding: 60px 0;
  background: #FAF8F4;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 40px;
}

.testimonial-card {
  background: white;
  padding: 28px;
  border-radius: 20px;
  border: 1px solid #EFEAE2;
}

.testimonial-quote {
  font-size: 2rem;
  color: #A0784C;
  font-family: Georgia, serif;
  margin-bottom: 12px;
}

.testimonial-text {
  font-size: 0.85rem;
  color: #3D524A;
  line-height: 1.5;
  margin-bottom: 16px;
  font-style: italic;
}

.testimonial-author {
  font-size: 0.75rem;
  color: #8A9C93;
}

/* ========== DIFFERENCE SECTION ========== */
.difference-section {
  padding: 60px 0;
}

.difference-header {
  text-align: center;
  margin-bottom: 48px;
}

.difference-grid {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 40px;
  flex-wrap: wrap;
}

.other-card,
.telawa-card {
  flex: 1;
  min-width: 280px;
  background: white;
  padding: 32px;
  border-radius: 24px;
  border: 1px solid #EFEAE2;
}

.other-card h3,
.telawa-card h3 {
  font-size: 1.3rem;
  margin-bottom: 20px;
}

.other-card ul,
.telawa-card ul {
  list-style: none;
}

.other-card li,
.telawa-card li {
  padding: 10px 0;
  font-size: 0.9rem;
  border-bottom: 1px solid #EFEAE2;
}

.vs-divider {
  font-size: 1.5rem;
  font-weight: 700;
  color: #A0784C;
  align-self: center;
}

.telawa-card {
  border: 2px solid #A0784C;
}

/* ========== HOW IT WORKS ========== */
.how-it-works {
  padding: 70px 0;
  background: #FAF8F4;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-top: 40px;
}

.step-card {
  background: white;
  border-radius: 24px;
  padding: 32px 24px;
  border: 1px solid #EFEAE2;
  transition: transform 0.3s, box-shadow 0.3s;
  opacity: 0;
  transform: translateY(20px);
}

.step-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.step-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.1);
}

.step-number {
  font-size: 0.7rem;
  font-weight: 600;
  color: #A0784C;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.step-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.step-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.step-quirk {
  font-size: 0.75rem;
  font-weight: 400;
  color: #A0784C;
}

.step-card p {
  font-size: 0.85rem;
  color: #5A6B63;
  line-height: 1.5;
  margin-bottom: 16px;
}

.step-result {
  font-size: 0.8rem;
  font-weight: 500;
  color: #1E5A4A;
  background: #EEF4F1;
  padding: 8px 12px;
  border-radius: 12px;
  margin-top: 16px;
}

.steps-note {
  text-align: center;
  margin-top: 40px;
  font-size: 0.7rem;
  color: #8A9C93;
}

/* ========== WHY US ========== */
.why-us {
  padding: 70px 0;
}

.pain-points-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin: 48px 0;
}

.pain-point {
  background: white;
  padding: 24px;
  border-radius: 20px;
  border-left: 4px solid #A0784C;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.pain-emoji {
  font-size: 2rem;
  margin-bottom: 12px;
}

.pain-question {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 8px;
  color: #1E2F2A;
}

.our-solution {
  font-size: 0.85rem;
  color: #5A6B63;
  line-height: 1.5;
}

.guarantee-card {
  background: #1E5A4A;
  border-radius: 24px;
  padding: 32px;
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
  color: white;
}

.guarantee-icon {
  font-size: 3rem;
}

.guarantee-text h3 {
  font-size: 1.3rem;
  margin-bottom: 8px;
}

.guarantee-text p {
  opacity: 0.9;
  line-height: 1.5;
}

.guarantee-small {
  font-size: 0.7rem;
  opacity: 0.7;
  display: block;
  margin-top: 8px;
}

/* ========== WHAT'S AVAILABLE ========== */
.whats-available {
  padding: 70px 0;
  background: #FAF8F4;
}

.features-showcase {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 40px;
}

.feature-showcase {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: white;
  border-radius: 20px;
  border: 1px solid #EFEAE2;
  transition: all 0.2s;
}

.feature-showcase:hover {
  transform: translateX(4px);
  border-color: #A0784C;
}

.feature-icon {
  font-size: 1.8rem;
}

.feature-info h4 {
  font-size: 1rem;
  margin-bottom: 4px;
}

.feature-info p {
  font-size: 0.8rem;
  color: #5A6B63;
}

/* ========== PRICING ========== */
.pricing-section {
  padding: 70px 0;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-top: 40px;
}

.pricing-card {
  background: white;
  border-radius: 24px;
  padding: 32px;
  border: 1px solid #EFEAE2;
  position: relative;
}

.pricing-card.featured {
  border: 2px solid #A0784C;
  transform: scale(1.02);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #A0784C;
  color: white;
  padding: 4px 16px;
  border-radius: 100px;
  font-size: 0.7rem;
  white-space: nowrap;
}

.plan-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.plan-price {
  font-size: 2rem;
  font-weight: 700;
}

.plan-price span {
  font-size: 0.8rem;
  font-weight: 400;
  color: #8A9C93;
}

.plan-price-gbp {
  font-size: 0.7rem;
  color: #A0784C;
  margin-bottom: 12px;
}

.plan-savings {
  font-size: 0.7rem;
  color: #A0784C;
  margin: 8px 0 16px;
}

.plan-features {
  list-style: none;
  margin: 24px 0 32px;
}

.plan-features li {
  padding: 8px 0;
  font-size: 0.85rem;
  padding-left: 24px;
  position: relative;
}

.plan-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #A0784C;
}

.pricing-note {
  text-align: center;
  font-size: 0.7rem;
  color: #8A9C93;
  margin-top: 32px;
}

/* ========== FAQ ========== */
.faq-section {
  padding: 70px 0;
  background: #FAF8F4;
}

.faq-grid {
  max-width: 800px;
  margin: 40px auto 0;
}

.faq-item {
  background: white;
  border-radius: 16px;
  margin-bottom: 12px;
  border: 1px solid #EFEAE2;
  cursor: pointer;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  font-weight: 600;
}

.faq-question svg {
  width: 18px;
  height: 18px;
  transition: transform 0.2s;
}

.faq-question svg.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: 0 24px;
}

.faq-answer.open {
  max-height: 250px;
  padding: 0 24px 20px 24px;
}

.faq-answer p {
  color: #5A6B63;
  font-size: 0.85rem;
  line-height: 1.5;
}

.faq-footer {
  text-align: center;
  margin-top: 32px;
  font-size: 0.85rem;
}

.faq-footer a {
  color: #A0784C;
  text-decoration: none;
}

/* ========== CONTACT ========== */
.contact-section {
  padding: 70px 0;
}

.contact-card {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 48px;
  background: white;
  border-radius: 32px;
  padding: 48px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid #EFEAE2;
}

.contact-emoji {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.contact-left h3 {
  font-size: 1.3rem;
  margin-bottom: 12px;
  color: #1E2F2A;
}

.contact-left p {
  color: #5A6B63;
  margin-bottom: 20px;
  line-height: 1.6;
}

.contact-detail {
  margin: 12px 0;
  font-size: 0.9rem;
  color: #1E2F2A;
}

.contact-dua {
  margin-top: 20px;
  font-size: 0.75rem;
  color: #A0784C;
  font-style: italic;
  padding-top: 16px;
  border-top: 1px solid #EFEAE2;
}

.contact-right {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-input,
.form-textarea {
  padding: 12px 16px;
  border: 1px solid #E0D8CE;
  border-radius: 12px;
  font-family: inherit;
  font-size: 0.85rem;
}

/* ========== FOOTER ========== */
.footer {
  background: #1E2F2A;
  color: #C2D3CB;
  padding: 48px 0 32px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-logo {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
}

.footer-tagline {
  font-size: 0.75rem;
}

.footer-links-group h4 {
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
}

.footer-links-group a {
  display: block;
  color: #C2D3CB;
  text-decoration: none;
  font-size: 0.75rem;
  margin-bottom: 10px;
}

.footer-bottom {
  text-align: center;
  padding-top: 32px;
  border-top: 1px solid #3A544A;
  font-size: 0.65rem;
}

/* ========== SECTION HEADERS ========== */
.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #A0784C;
  margin-bottom: 12px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
}

.section-subtitle {
  color: #6B7F76;
  margin-top: 12px;
  font-size: 0.85rem;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 992px) {

  .hero-grid,
  .difference-grid,
  .pricing-grid,
  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .steps-grid {
    grid-template-columns: 1fr;
    max-width: 450px;
    margin: 40px auto 0;
  }

  .pain-points-grid {
    grid-template-columns: 1fr;
  }

  .features-showcase {
    grid-template-columns: 1fr;
  }

  .contact-card {
    grid-template-columns: 1fr;
    padding: 32px;
  }

  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .vs-divider {
    display: none;
  }

  .testimonials-grid {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .btn-lg {
    width: 100%;
    text-align: center;
  }

  .pricing-card.featured {
    transform: none;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.6rem;
  }

  .section-title {
    font-size: 1.4rem;
  }

  .dashboard-card {
    padding: 20px;
  }

  .revision-info {
    flex-direction: column;
    gap: 12px;
  }
}
</style>