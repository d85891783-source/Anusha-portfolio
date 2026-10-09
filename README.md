# Anusha BA — Developer Portfolio & Workshop Implementation

An interactive, responsive portfolio website built with a **Retro Pixel Art Aesthetic** combined with **Modern Clean Typography and Accessibility**. Specially tailored to highlight Anusha BA's background as an aspiring Software Engineer and Data Science undergraduate.

---

## 🌟 Live Features & Implemented Architecture

This project fulfills all **15 sequential workshop prompts**:

1. **Base Structure & HTML Skeleton (`index.html`)**:
   - Semantic HTML5 layout (`<header>`, `<aside>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Placeholder comments and modular boundaries for every component.
   - Screen-reader skip links and ARIA attributes for accessibility.

2. **Hero Section with Pixel Art & Night Mode Toggle**:
   - Retro styling with Google Fonts (`Press Start 2P`, `Silkscreen`, `JetBrains Mono`).
   - Integrated custom aesthetic background (`background.jpg`).
   - Automatic OS night mode detection (`prefers-color-scheme: dark`) with manual light/dark switch.
   - Dynamic terminal typewriter tagline.

3. **Vertical Navigation Bar (Left Side)**:
   - Fixed vertical navbar featuring links: `Home`, `About Me`, `Skills`, `Timeline`, `Projects`, `Video Intro`, `Testimonials`, `AI Chat`, and `Contact`.
   - Scroll-Spy active indicator that tracks section scrolling in real time.
   - Collapses gracefully into a mobile header drawer on screens below 900px.

4. **About Me Section with Profile & Bio**:
   - Features Anusha's professional portrait (`profile.jpg`) in a pixelated frame.
   - Short bio covering her B.E. in Data Science and Engineering (2025–2029) at Adichunchanagiri Institute of Technology, Chikkamagaluru.
   - Highlights academic metrics, problem-solving interests, and a direct download button for `resume.pdf`.

5. **Skills Section**:
   - Showcases verified skills from resume:
     - **Programming**: Python (85%), C (80%)
     - **Backend**: Java (75%)
     - **Data Science & Engineering**: Analytics, OOP Architecture, DSA, Database/SQL, Git/GitHub.
   - Animated 8-bit retro segmented progress bars powered by `IntersectionObserver`.

6. **Interactive Timeline of Career Milestones**:
   - Chronological quest-log cards with smooth hover animations:
     - **2025–2029**: B.E. in Data Science and Engineering at AIT (CGPA: 6.05).
     - **2024–2026**: Technical Training & Career Capacity-Building Certification.
     - **Academic Project**: Multi-Language Academic Engine in Python, C, and Java.
     - **2022–2024**: Pre-University at BGS PU College, Balehonnuru (76%).
     - **Completed**: 10th Standard at Nirmala Convent School, Balehonnuru (88% Distinction).

7. **Projects Section with Clickable Thumbnails**:
   - High-contrast project cards with retro tags and hover scale.
   - Interactive pop-up modal showing in-depth architectural breakdown for each project.

8. **Embedded Video Section (Self-Introduction)**:
   - Dedicated retro-console frame playing Anusha's actual self-introduction video (`intro-video.mp4`).
   - Modern responsive container using CSS `aspect-ratio: 16 / 9`.
   - Explanatory caption highlighting her career goals.

9. **Testimonials Section**:
   - Card-style containers with drop shadows and rounded corners.
   - Quotes from academic mentors, project teammates, and workshop coordinators.

10. **Interactive AI Chat Interface ("AI Anusha")**:
    - Simulated chatbot acting as Anusha's digital twin.
    - Contextually answers inquiries about her programming languages, college, GPA, projects, and contact info.
    - Starter suggestion chips for instant questions.
    - Code comments demonstrating how to integrate OpenAI GPT-4o-mini or Google Gemini 1.5/2.0 API.

11. **Contact Form with Email API Integration**:
    - Complete form with fields for Name, Email, Subject, and Message.
    - Client-side validation with real-time error messages.
    - Code comments showing where to integrate transactional email providers (e.g., **Resend API**, **Formspree**, or **EmailJS**).
    - Animated confirmation alert on message transmission.

12. **Social Media Links & Footer**:
    - Social links to LinkedIn (`anusha-ba-237b46392`), Email (`anushasanil061@gmail.com`), Phone (`8094817628`), and GitHub.
    - Accessible ARIA labels and hover elevation.

13. **Responsive Design**:
    - Fully responsive breakpoints for Desktop (> 1100px), Tablet (900px - 1100px), and Mobile (< 600px).

14. **Visual Enhancements & 8-Bit Web Audio**:
    - Glassmorphic blur (`backdrop-filter: blur(8px)`), retro hard drop shadows (`box-shadow: 4px 4px 0px ...`).
    - Built-in lightweight 8-bit sound synthesizer using the Web Audio API with a toggle button (`SFX: ON / OFF`).

15. **Testing & Deployment Ready**:
    - Zero heavy external build tools needed—runs directly in any modern browser.

---

## 📁 File Structure

```text
Anusha portfolio/
├── index.html                           # Semantic HTML structure & all 15 sections
├── styles.css                           # Pixel-art design system, themes, and responsiveness
├── script.js                            # Interactive theme toggle, AI chat, modal, and audio synth
├── profile.jpg                          # Anusha's professional portrait
├── background.jpg                       # Aesthetic background image
├── intro-video.mp4                      # Anusha's self-introduction video
├── resume.pdf                           # Official downloadable resume PDF
└── README.md                            # Documentation and deployment guide
```

---

## 🚀 How to Run Locally

You can preview the website locally using any simple web server:

### Option 1: Python HTTP Server (Recommended)
Open PowerShell or Terminal in this folder and run:
```bash
python -m http.server 8000
```
Then visit:
```text
http://localhost:8000
```

### Option 2: VS Code Live Server
1. Open the folder in **VS Code**.
2. Right click `index.html` and click **"Open with Live Server"**.

---

## 🌐 Deployment Instructions

### Method 1: GitHub Pages (Free & Fastest)
1. Initialize a git repository and commit all files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Anusha BA Developer Portfolio"
   ```
2. Create a new repository on GitHub (e.g. `anusha-portfolio`).
3. Push to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/anusha-portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, navigate to **Settings** > **Pages**.
5. Under **Branch**, select `main` and click **Save**.
6. Your portfolio will be live at `https://<your-username>.github.io/anusha-portfolio/`.

### Method 2: Vercel or Netlify
1. Drag and drop the `Anusha portfolio` folder into the [Netlify Drop](https://app.netlify.com/drop) or [Vercel Dashboard](https://vercel.com).
2. It will deploy instantly with HTTPS and custom domain support.

---

## 🔌 API Integration Guide

### 1. Connecting OpenAI or Gemini to AI Chat
In `script.js`, locate `callExternalAiApi`:
```javascript
async function callExternalAiApi(userMessage) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + YOUR_API_KEY
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are AI Anusha, a portfolio assistant for Anusha BA...' },
        { role: 'user', content: userMessage }
      ]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}
```

### 2. Connecting Resend / Formspree to Contact Form
In `script.js`, replace the timeout inside `contactForm.addEventListener('submit', ...)` with:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: nameInput.value,
    email: emailInput.value,
    subject: subjectInput.value,
    message: messageInput.value
  })
});
```
