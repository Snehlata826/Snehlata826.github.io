# Snehlata Kumari - Data Science Portfolio

A modern, professional portfolio website showcasing data science projects, skills, and experience.

## 🚀 Features

- **Animated Background**: Dynamic particle network with color transitions every 5 seconds
- **Typing Animation**: Eye-catching hero section with typing effect
- **Timeline Experience**: Professional timeline layout for work experience
- **Responsive Design**: Mobile-first, works on all devices
- **Smooth Animations**: Hover effects, scroll animations, and transitions
- **Project Showcase**: Detailed case studies with metrics and insights
- **Coding Profiles**: Links to GeeksforGeeks and LeetCode

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## 🛠️ Setup Instructions

### Method 1: Direct Open (Simplest)

1. Download all files to a folder
2. Double-click `index.html`
3. Portfolio opens in your default browser

### Method 2: VS Code Live Server (Recommended)

1. **Download Files**:
   - Save `index.html`, `styles.css`, and `script.js` in the same folder

2. **Open in VS Code**:
   ```bash
   code /path/to/your/folder
   ```

3. **Install Live Server Extension**:
   - Open VS Code Extensions (Ctrl+Shift+X)
   - Search for "Live Server"
   - Install it

4. **Run**:
   - Right-click `index.html`
   - Select "Open with Live Server"
   - Portfolio opens at `http://localhost:5500`

### Method 3: Python HTTP Server

```bash
# Navigate to your folder
cd /path/to/portfolio

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Open browser to http://localhost:8000
```

### Method 4: Node.js HTTP Server

```bash
# Install http-server globally
npm install -g http-server

# Navigate to folder and run
cd /path/to/portfolio
http-server

# Open browser to http://localhost:8080
```

## 🎨 Customization Guide

### Update Personal Information

**In `index.html`**, find and update:

1. **Email**:
   ```html
   kumarisnehlata2005@gmail.com
   ```

2. **Social Links**:
   ```html
   <a href="https://github.com/Snehlata826" ...>
   <a href="https://www.linkedin.com/in/snehlata-kumari-b68285299" ...>
   ```

3. **Coding Profiles**:
   ```html
   <a href="https://www.geeksforgeeks.org/profile/kumarisneh1ryw" ...>
   <a href="https://leetcode.com/u/23bced40/" ...>
   ```

### Update Project GitHub Links

**In `script.js`**, find the `projectsData` array and update `github` URLs:

```javascript
{
    title: "Legal AI Analyzer",
    // ... other fields
    github: "https://github.com/Snehlata826/legal-ai-analyzer", // Update this
}
```

### Change Colors

**In `styles.css`**, find `:root` variables:

```css
:root {
    --cyan: #22d3ee;      /* Change primary accent */
    --purple: #a855f7;    /* Change secondary accent */
    --pink: #ec4899;      /* Change tertiary accent */
}
```

### Adjust Background Transition Speed

**In `script.js`**, find:

```javascript
setInterval(() => {
    // ...
}, 5000); // Change 5000 to desired milliseconds
```

### Modify Typing Text

**In `script.js`**, find:

```javascript
const fullText = "I turn messy data into clear decisions";
// Change to your preferred tagline
```

## 📱 Mobile Responsiveness

The portfolio automatically adapts to:
- 📱 **Mobile phones** (< 640px)
- 📱 **Tablets** (640px - 768px)
- 💻 **Laptops** (768px - 1024px)
- 🖥️ **Desktops** (> 1024px)

## 🎯 Browser Support

Works on all modern browsers:
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 🚀 Deployment Options

### GitHub Pages (Free)

1. Create a new repository named `<your-username>.github.io`
2. Upload all files
3. Go to Settings → Pages
4. Select main branch
5. Your site will be live at `https://<your-username>.github.io`

### Netlify (Free)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your folder
3. Site deploys instantly
4. Get a free `https://your-name.netlify.app` URL

### Vercel (Free)

1. Go to [vercel.com](https://vercel.com)
2. Import project from GitHub
3. Deploy with one click
4. Get a free `https://your-name.vercel.app` URL

## 📝 Adding New Projects

1. Open `script.js`
2. Find the `projectsData` array
3. Add a new object:

```javascript
{
    title: "Your Project Name",
    tagline: "One-line description",
    emoji: "🎯",
    problem: "What problem does it solve?",
    approach: [
        "Step 1",
        "Step 2",
        "Step 3"
    ],
    results: [
        { metric: "95%", label: "Accuracy" },
        { metric: "2x", label: "Speed improvement" }
    ],
    insight: "Key learning or finding",
    tech: ["Python", "TensorFlow", "React"],
    github: "https://github.com/your-repo",
    status: "ongoing" // Optional, remove if completed
}
```

## 🐛 Troubleshooting

### Icons not showing?
- Check internet connection (Lucide icons load from CDN)
- Clear browser cache

### Animations not working?
- Ensure all three files are in the same folder
- Check browser console (F12) for errors

### Mobile menu not opening?
- Verify `script.js` is loaded
- Check for JavaScript errors

### Styling looks broken?
- Confirm `styles.css` is linked in `index.html`
- Clear browser cache

## 📧 Contact

- **Email**: kumarisnehlata2005@gmail.com
- **LinkedIn**: [Snehlata Kumari](https://www.linkedin.com/in/snehlata-kumari-b68285299)
- **GitHub**: [@Snehlata826](https://github.com/Snehlata826)

## 📄 License

Free to use and modify for personal portfolios.

---

**Built with HTML, CSS, JavaScript** • **No frameworks required** • **100% customizable**