// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initializePortfolio();
});

function initializePortfolio() {
    // Navigation
    initializeNavigation();
    
    // Typing animation
    initializeTypingAnimation();
    
    // Particle animation
    initializeParticles();
    
    // Background transitions
    initializeBackgroundTransition();
    
    // Projects rendering
    renderProjects();
    
    // Smooth scrolling
    initializeSmoothScroll();
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active section highlighting
        updateActiveSection();
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

function updateActiveSection() {
    const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        const link = document.querySelector(`a[href="#${sectionId}"]`);
        
        if (element && link) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

// Typing animation
function initializeTypingAnimation() {
    const fullText = "Turning Data into Decisions";
    const typedTextElement = document.getElementById('typedText');
    const cursor = document.getElementById('cursor');
    let index = 0;
    
    function type() {
        if (index <= fullText.length) {
            typedTextElement.textContent = fullText.slice(0, index);
            index++;
            setTimeout(type, 80);
        }
    }
    
    type();
    
    // Cursor blink
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 500);
}

// Particle animation
function initializeParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(34, 211, 238, 0.5)';
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(34, 211, 238, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Background transition
function initializeBackgroundTransition() {
    const backgrounds = ['bg-purple', 'bg-blue', 'bg-indigo', 'bg-violet', 'bg-fuchsia'];
    let currentBg = 0;
    
    setInterval(() => {
        document.body.classList.remove(...backgrounds);
        currentBg = (currentBg + 1) % backgrounds.length;
        document.body.classList.add(backgrounds[currentBg]);
    }, 5000);
}

// Projects data and rendering
const projectsData = [
    {
        title: "Legal AI Analyzer",
        tagline: "Democratizing Justice Through AI",
        emoji: "⚖️",
        problem: "Court documents are written for lawyers, not people. A single judgment can run 50+ pages with archaic language, creating barriers to justice.",
        approach: [
            "Document validation using pattern recognition & computer vision",
            "NLP-based entity extraction for legal components",
            "Transformer-based language simplification preserving legal accuracy",
            "End-to-end FastAPI pipeline with real-time processing"
        ],
        results: [
            { metric: "95%+", label: "Legal accuracy maintained" },
            { metric: "8+", label: "Key components extracted" },
            { metric: "<10s", label: "Per 20-page document" }
        ],
        insight: "AI's job isn't to replace lawyers—it's to democratize legal understanding. The challenge wasn't technical; it was ethical: simplifying without distorting.",
        tech: ["Python", "NLP", "Transformers", "FastAPI", "Streamlit", "Computer Vision"],
        github: "#",
        status: "ongoing"
    },
    {
        title: "RAG-Based PDF Chatbot",
        tagline: "Semantic Search at Scale",
        emoji: "🤖",
        problem: "Research teams waste hours searching through 100+ page PDFs. Traditional search misses semantic meaning.",
        approach: [
            "Semantic chunking of 1,000+ pages preserving context",
            "FAISS vector database for lightning-fast similarity search",
            "Sentence-Transformers for high-quality embeddings",
            "Production FastAPI + Streamlit with <1s latency"
        ],
        results: [
            { metric: "0.8s", label: "Average response time" },
            { metric: "92%", label: "Answer relevance" },
            { metric: "5x", label: "Faster than manual search" }
        ],
        insight: "Chunk size matters more than model size. Semantic chunking beat fixed-size by 18% in relevance.",
        tech: ["FAISS", "Sentence-Transformers", "FastAPI", "Streamlit", "Python"],
        github: "#"
    },
    {
        title: "Stock Trend Forecasting + Sentiment",
        tagline: "Where Finance Meets NLP",
        emoji: "📈",
        problem: "Can we predict stock trends by combining technical indicators with real-time news sentiment?",
        approach: [
            "Feature engineering: 12 technical indicators + sentiment scores",
            "Comparative analysis: LSTM vs Random Forest vs XGBoost",
            "Evaluation on RMSE, directional accuracy, Sharpe ratio",
            "6-month backtest on unseen data"
        ],
        results: [
            { metric: "12%", label: "Accuracy improvement" },
            { metric: "71%", label: "Directional accuracy" },
            { metric: "8%", label: "Sentiment impact" }
        ],
        insight: "Feature engineering beats model complexity. Spent 60% of time on features—that ratio worked.",
        tech: ["Python", "Scikit-learn", "XGBoost", "VADER", "Matplotlib", "Pandas"],
        github: "#"
    }
];

function renderProjects() {
    const container = document.getElementById('projectsContainer');
    
    projectsData.forEach(project => {
        const projectCard = createProjectCard(project);
        container.appendChild(projectCard);
    });
    
    // Reinitialize icons after adding new content
    lucide.createIcons();
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <div class="project-header">
            <div class="project-title-section">
                <span class="project-emoji">${project.emoji}</span>
                <div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-tagline">${project.tagline}</p>
                </div>
            </div>
            ${project.status === 'ongoing' ? `
                <span class="status-badge">
                    <span class="status-dot">
                        <span class="status-dot-inner"></span>
                        <span class="status-dot-core"></span>
                    </span>
                    In Progress
                </span>
            ` : ''}
        </div>

        <div class="project-section challenge">
            <h4 class="project-section-title">
                <i data-lucide="zap"></i>
                Challenge
            </h4>
            <p>${project.problem}</p>
        </div>

        <div class="project-section approach">
            <h4 class="project-section-title">
                <i data-lucide="terminal"></i>
                Approach
            </h4>
            <ul>
                ${project.approach.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="project-section results">
            <h4 class="project-section-title">
                <i data-lucide="trending-up"></i>
                Results
            </h4>
            <div class="results-grid">
                ${project.results.map(result => `
                    <div>
                        <div class="result-item">
                            <span class="result-metric">${result.metric}</span>
                            <span class="result-label">${result.label}</span>
                        </div>
                        <div class="result-bar">
                            <div class="result-bar-fill"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="insight-box">
            <p>
                <span class="insight-label">💡 Insight: </span>
                <em>${project.insight}</em>
            </p>
        </div>

        <div class="tech-tags">
            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>

        <a href="${project.github}" class="project-link">
            <i data-lucide="github"></i>
            View Code
            <i data-lucide="external-link"></i>
        </a>
    `;
    
    return card;
}

// Smooth scroll
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Update GitHub links (you can modify these)
function updateProjectLinks() {
    // When you have real GitHub repos, update the projectsData array above
    // with actual URLs instead of "#"
}