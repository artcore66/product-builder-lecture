/**
 * LottoBall Web Component
 * Encapsulates the styling and logic for a single lotto ball.
 */
class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const number = parseInt(this.getAttribute('number')) || 0;
        const size = this.getAttribute('size') || 'large';
        this.render(number, size);
    }

    static get observedAttributes() {
        return ['number'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'number' && oldValue !== newValue) {
            this.render(parseInt(newValue), this.getAttribute('size') || 'large');
        }
    }

    render(number, size) {
        const colorVar = this.getBallColor(number);
        const dimension = size === 'small' ? '32px' : '54px';
        const fontSize = size === 'small' ? '0.9rem' : '1.3rem';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    animation: ballPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
                }
                .ball {
                    width: ${dimension};
                    height: ${dimension};
                    border-radius: 50%;
                    background: var(${colorVar});
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: oklch(0.1 0.02 240);
                    font-weight: 800;
                    font-size: ${fontSize};
                    box-shadow: 
                        inset -4px -4px 8px oklch(0 0 0 / 0.2),
                        inset 4px 4px 8px oklch(1 0 0 / 0.3),
                        0 4px 10px oklch(0 0 0 / 0.3);
                    text-shadow: 0 1px 1px oklch(1 0 0 / 0.2);
                    user-select: none;
                }
                @keyframes ballPop {
                    0% { transform: scale(0); opacity: 0; }
                    70% { transform: scale(1.1); }
                    100% { transform: scale(1); opacity: 1; }
                }
            </style>
            <div class="ball">${number}</div>
        `;
    }

    getBallColor(num) {
        if (num <= 10) return '--ball-1-10';
        if (num <= 20) return '--ball-11-20';
        if (num <= 30) return '--ball-21-30';
        if (num <= 40) return '--ball-31-40';
        return '--ball-41-45';
    }
}

customElements.define('lotto-ball', LottoBall);

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const modeIcon = themeToggle.querySelector('.mode-icon');
const htmlElement = document.documentElement;

// Check for saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeUI(savedTheme);

function updateThemeUI(theme) {
    modeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeUI(newTheme);
});

// Application Logic
const ballDisplay = document.getElementById('ball-display');
const historyList = document.getElementById('history-list');
const generateBtn = document.getElementById('generate-btn');
const clearBtn = document.getElementById('clear-btn');

/**
 * Generates 6 unique random numbers between 1 and 45.
 */
function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

/**
 * Updates the UI with new numbers and adds to history.
 */
function handleGenerate() {
    const numbers = generateLottoNumbers();
    
    // Clear display
    ballDisplay.innerHTML = '';
    
    // Add new balls with staggered animation
    numbers.forEach((num, index) => {
        const ball = document.createElement('lotto-ball');
        ball.setAttribute('number', num);
        ball.style.animationDelay = `${index * 0.1}s`;
        ballDisplay.appendChild(ball);
    });

    addToHistory(numbers);
}

/**
 * Adds a result entry to the history section.
 */
function addToHistory(numbers) {
    const item = document.createElement('div');
    item.className = 'history-item';
    
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    item.innerHTML = `
        <div class="history-balls">
            ${numbers.map(n => `<lotto-ball number="${n}" size="small"></lotto-ball>`).join('')}
        </div>
        <span class="timestamp">${timestamp}</span>
    `;

    historyList.prepend(item);
    
    // Keep only last 10 entries
    if (historyList.children.length > 10) {
        historyList.lastElementChild.remove();
    }
}

// Event Listeners
generateBtn.addEventListener('click', handleGenerate);
clearBtn.addEventListener('click', () => {
    historyList.innerHTML = '';
    ballDisplay.innerHTML = '<div class="placeholder-text">행운의 번호를 생성해주세요</div>';
});
