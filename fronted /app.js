
// Property Data
const properties = [
    {
        id: 1,
        name: "Luxury Downtown Apartment Complex",
        location: "Manhattan, New York",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
        totalValue: 5000000,
        tokenPrice: 100,
        tokensAvailable: 15000,
        totalTokens: 50000,
        expectedReturn: 8.5,
        rentYield: 6.2,
        appreciationRate: 2.3,
        type: "Residential",
        status: "funding"
    },
    {
        id: 2,
        name: "Tech Hub Office Building",
        location: "San Francisco, CA",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
        totalValue: 8500000,
        tokenPrice: 250,
        tokensAvailable: 8000,
        totalTokens: 34000,
        expectedReturn: 10.2,
        rentYield: 7.5,
        appreciationRate: 2.7,
        type: "Commercial",
        status: "active"
    },
    {
        id: 3,
        name: "Beachfront Resort Property",
        location: "Miami Beach, FL",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop",
        totalValue: 12000000,
        tokenPrice: 500,
        tokensAvailable: 3500,
        totalTokens: 24000,
        expectedReturn: 12.8,
        rentYield: 9.1,
        appreciationRate: 3.7,
        type: "Hospitality",
        status: "active"
    },
    {
        id: 4,
        name: "Suburban Shopping Center",
        location: "Austin, TX",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop",
        totalValue: 6200000,
        tokenPrice: 150,
        tokensAvailable: 12000,
        totalTokens: 41333,
        expectedReturn: 9.3,
        rentYield: 6.8,
        appreciationRate: 2.5,
        type: "Retail",
        status: "funding"
    }
];

let selectedProperty = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderProperties();
    setupEventListeners();
});

// Render properties to the grid
function renderProperties() {
    const grid = document.getElementById('propertiesGrid');
    grid.innerHTML = '';

    properties.forEach(property => {
        const fundingProgress = ((property.totalTokens - property.tokensAvailable) / property.totalTokens * 100).toFixed(1);
        
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `
            <img src="${property.image}" alt="${property.name}" class="property-image">
            <div class="property-content">
                <div class="property-header">
                    <div class="property-title">
                        <h3>${property.name}</h3>
                        <div class="property-location">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            ${property.location}
                        </div>
                    </div>
                    <span class="property-status ${property.status}">
                        ${property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                    </span>
                </div>

                <div class="property-metrics">
                    <div class="metric">
                        <p class="metric-label">Expected Return</p>
                        <p class="metric-value green">${property.expectedReturn}%</p>
                    </div>
                    <div class="metric">
                        <p class="metric-label">Rent Yield</p>
                        <p class="metric-value blue">${property.rentYield}%</p>
                    </div>
                    <div class="metric">
                        <p class="metric-label">Token Price</p>
                        <p class="metric-value">$${property.tokenPrice}</p>
                    </div>
                </div>

                <div class="property-progress">
                    <div class="progress-header">
                        <span class="label">Funding Progress</span>
                        <span class="value">${fundingProgress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${fundingProgress}%"></div>
                    </div>
                    <p class="progress-footer">${property.tokensAvailable.toLocaleString()} tokens available</p>
                </div>

                <button class="invest-btn" data-property-id="${property.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    Invest Now
                </button>
            </div>
        `;
        
        grid.appendChild(card);
    });

    // Add click listeners to invest buttons
    document.querySelectorAll('.invest-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const propertyId = parseInt(this.getAttribute('data-property-id'));
            openInvestmentModal(propertyId);
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    // Connect wallet button
    document.getElementById('connectWallet').addEventListener('click', function() {
        alert('Wallet connection feature coming soon!');
    });

    // Modal close
    document.getElementById('closeModal').addEventListener('click', closeInvestmentModal);
    
    // Close modal on backdrop click
    document.getElementById('investmentModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeInvestmentModal();
        }
    });

    // Investment amount input
    document.getElementById('investmentAmount').addEventListener('input', function() {
        updateTokenCount();
    });

    // Confirm investment
    document.getElementById('confirmInvestment').addEventListener('click', confirmInvestment);
}

// Switch between tabs
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    if (tabName === 'marketplace') {
        document.getElementById('marketplaceView').classList.add('active');
    } else if (tabName === 'portfolio') {
        document.getElementById('portfolioView').classList.add('active');
    }
}

// Open investment modal
function openInvestmentModal(propertyId) {
    selectedProperty = properties.find(p => p.id === propertyId);
    if (!selectedProperty) return;

    document.getElementById('modalPropertyName').textContent = selectedProperty.name;
    document.getElementById('modalPropertyLocation').textContent = selectedProperty.location;
    document.getElementById('modalTokenPrice').textContent = `$${selectedProperty.tokenPrice}`;
    document.getElementById('modalExpectedReturn').textContent = `${selectedProperty.expectedReturn}%`;
    
    document.getElementById('investmentAmount').value = '';
    document.getElementById('tokenCount').textContent = '';
    
    document.getElementById('investmentModal').classList.add('active');
}

// Close investment modal
function closeInvestmentModal() {
    document.getElementById('investmentModal').classList.remove('active');
    selectedProperty = null;
}

// Update token count based on investment amount
function updateTokenCount() {
    if (!selectedProperty) return;
    
    const amount = parseFloat(document.getElementById('investmentAmount').value);
    const tokenCountEl = document.getElementById('tokenCount');
    
    if (amount && amount > 0) {
        const tokens = Math.floor(amount / selectedProperty.tokenPrice);
        tokenCountEl.textContent = `≈ ${tokens} tokens`;
    } else {
        tokenCountEl.textContent = '';
    }
}

// Confirm investment
function confirmInvestment() {
    const amount = parseFloat(document.getElementById('investmentAmount').value);
    
    if (!amount || amount <= 0) {
        alert('Please enter a valid investment amount');
        return;
    }
    
    if (!selectedProperty) {
        alert('Property not selected');
        return;
    }
    
    const tokens = Math.floor(amount / selectedProperty.tokenPrice);
    
    if (tokens > selectedProperty.tokensAvailable) {
        alert(`Only ${selectedProperty.tokensAvailable} tokens available`);
        return;
    }
    
    // Simulate investment
    alert(`Investment Successful!\n\nProperty: ${selectedProperty.name}\nAmount: $${amount.toLocaleString()}\nTokens: ${tokens}\n\nYour tokens will appear in your portfolio shortly.`);
    
    // Update available tokens
    selectedProperty.tokensAvailable -= tokens;
    
    // Re-render properties
    renderProperties();
    
    // Close modal
    closeInvestmentModal();
}

// Add some animation on scroll
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.property-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Initialize card animations
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.property-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
    });
});
