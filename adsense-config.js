// AdSense Configuration and Optimization
class AdSenseManager {
    constructor() {
        this.adConfig = {
            publisher: 'ca-pub-6011234789952502', // Your AdSense publisher ID
            slots: {
                top: {
                    id: 'div-gpt-ad-top',
                    slotId: '6783900119', // Top Banner Ad Slot ID
                    size: [[728, 90], [320, 50]], // Leaderboard and mobile banner
                    responsive: true
                },
                sidebar: {
                    id: 'div-gpt-ad-sidebar',
                    slotId: '5316789678', // Sidebar Ad Slot ID
                    size: [[300, 250], [300, 600]], // Medium rectangle and half page
                    responsive: true
                },
                bottom: {
                    id: 'div-gpt-ad-bottom',
                    slotId: '9431294501', // Bottom Banner Ad Slot ID
                    size: [[728, 90], [320, 50]], // Leaderboard and mobile banner
                    responsive: true
                }
            }
        };
        
        this.gameEvents = {
            gameStart: 0,
            gameEnd: 0,
            guessSubmitted: 0
        };
        
        this.init();
    }

    init() {
        this.loadAdSense();
        this.setupAdPlaceholders();
        this.setupGameEventTracking();
        this.optimizeAdRefresh();
    }

    loadAdSense() {
        // AdSense script is already loaded in HTML head
        // Initialize AdSense
        window.adsbygoogle = window.adsbygoogle || [];
    }

    setupAdPlaceholders() {
        // Replace placeholder divs with actual AdSense code
        this.createAdSlot('top');
        this.createAdSlot('sidebar');
        this.createAdSlot('bottom');
    }

    createAdSlot(position) {
        const placeholder = document.querySelector(`.ad-${position} .ad-placeholder`);
        if (!placeholder || !this.adConfig.publisher) return;

        const config = this.adConfig.slots[position];
        
        // Only create ad if slot ID is configured
        if (!config.slotId) {
            console.log(`Ad slot ID not configured for ${position}. Add your slot ID after AdSense approval.`);
            return;
        }
        
        // Create AdSense div
        const adDiv = document.createElement('ins');
        adDiv.className = 'adsbygoogle';
        adDiv.style.display = 'block';
        adDiv.setAttribute('data-ad-client', this.adConfig.publisher);
        adDiv.setAttribute('data-ad-slot', config.slotId);
        
        if (config.responsive) {
            adDiv.setAttribute('data-ad-format', 'auto');
            adDiv.setAttribute('data-full-width-responsive', 'true');
            // Ensure minimum width for responsive ads
            adDiv.style.minWidth = '300px';
            adDiv.style.width = '100%';
        } else {
            adDiv.style.width = config.size[0][0] + 'px';
            adDiv.style.height = config.size[0][1] + 'px';
        }

        // Ensure parent container has width
        const parentContainer = placeholder.parentNode;
        if (parentContainer) {
            parentContainer.style.width = '100%';
            parentContainer.style.display = 'block';
        }

        // Replace placeholder
        placeholder.parentNode.replaceChild(adDiv, placeholder);

        // Push to AdSense queue
        (adsbygoogle = window.adsbygoogle || []).push({});
    }

    setupGameEventTracking() {
        // Track game events for ad optimization
        document.addEventListener('gameStart', () => {
            this.gameEvents.gameStart++;
            this.trackAdEngagement('game_start');
        });

        document.addEventListener('gameEnd', () => {
            this.gameEvents.gameEnd++;
            this.trackAdEngagement('game_end');
            this.considerAdRefresh();
        });

        document.addEventListener('guessSubmitted', () => {
            this.gameEvents.guessSubmitted++;
            if (this.gameEvents.guessSubmitted % 3 === 0) {
                this.trackAdEngagement('multiple_guesses');
            }
        });
    }

    trackAdEngagement(event) {
        // Send event to Google Analytics (if implemented)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'ad_engagement', {
                event_category: 'advertising',
                event_label: event,
                value: 1
            });
        }
    }

    optimizeAdRefresh() {
        // Refresh ads after game completion to increase impressions
        setInterval(() => {
            if (this.gameEvents.gameEnd > 0 && this.gameEvents.gameEnd % 5 === 0) {
                this.refreshAds();
            }
        }, 30000); // Check every 30 seconds
    }

    refreshAds() {
        // Refresh ads for better revenue
        try {
            if (window.adsbygoogle && window.adsbygoogle.loaded) {
                window.adsbygoogle.push({ params: { google_ad_slot: 'refresh' } });
            }
        } catch (error) {
            console.log('Ad refresh failed:', error);
        }
    }

    considerAdRefresh() {
        // Refresh ads after every 3 games
        if (this.gameEvents.gameEnd % 3 === 0) {
            setTimeout(() => this.refreshAds(), 2000);
        }
    }

    // Ad viewability optimization
    setupViewabilityTracking() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.trackAdEngagement('ad_viewed');
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.ad-container').forEach(ad => {
            observer.observe(ad);
        });
    }
}

// Ad-friendly content spacing
class ContentOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeAdSpacing();
        this.setupResponsiveAds();
        this.enhanceUserExperience();
    }

    optimizeAdSpacing() {
        // Ensure minimum distance between ads and content
        const gameContainer = document.querySelector('.game-container');
        const adContainers = document.querySelectorAll('.ad-container');

        adContainers.forEach(ad => {
            ad.style.margin = '20px 0';
            ad.style.padding = '10px';
        });
    }

    setupResponsiveAds() {
        // Handle responsive ad behavior
        window.addEventListener('resize', () => {
            this.adjustAdLayout();
        });
    }

    adjustAdLayout() {
        const sidebar = document.querySelector('.sidebar');
        const sidebarAd = document.querySelector('.ad-sidebar');
        
        if (window.innerWidth < 768) {
            // Hide sidebar ads on mobile
            if (sidebarAd) sidebarAd.style.display = 'none';
        } else {
            // Show sidebar ads on desktop
            if (sidebarAd) sidebarAd.style.display = 'block';
        }
    }

    enhanceUserExperience() {
        // Ensure ads don't interfere with gameplay
        const gameArea = document.querySelector('.game-board');
        
        // Add padding to prevent accidental ad clicks during gameplay
        gameArea.style.padding = '20px 0';
        
        // Smooth scrolling when ads load
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 1000);
        });
    }
}

// Initialize ad management when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we have a publisher ID configured
    const adManager = new AdSenseManager();
    const contentOptimizer = new ContentOptimizer();
    
    // Setup viewability tracking after a delay
    setTimeout(() => {
        adManager.setupViewabilityTracking();
    }, 2000);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AdSenseManager, ContentOptimizer };
}