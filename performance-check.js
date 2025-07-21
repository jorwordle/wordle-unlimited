// Performance and SEO Optimization Check
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Optimize images and fonts
        this.optimizeAssets();
        
        // Add performance monitoring
        this.monitorPerformance();
        
        // SEO enhancements
        this.enhanceSEO();
    }

    preloadCriticalResources() {
        // Preload word lists for faster game start
        const preloadWordLists = () => {
            const link1 = document.createElement('link');
            link1.rel = 'preload';
            link1.href = '/wordle-answers-alphabetical.txt';
            link1.as = 'fetch';
            link1.crossOrigin = 'anonymous';
            document.head.appendChild(link1);

            const link2 = document.createElement('link');
            link2.rel = 'preload';
            link2.href = '/wordle-word-list.txt';
            link2.as = 'fetch';
            link2.crossOrigin = 'anonymous';
            document.head.appendChild(link2);
        };

        // Preload critical pages
        if ('requestIdleCallback' in window) {
            requestIdleCallback(preloadWordLists);
        } else {
            setTimeout(preloadWordLists, 2000);
        }
    }

    optimizeAssets() {
        // Add font-display: swap for better loading
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: 'Segoe UI';
                font-display: swap;
            }
        `;
        document.head.appendChild(style);
    }

    monitorPerformance() {
        // Core Web Vitals monitoring
        if ('web-vital' in window) {
            // This would integrate with actual web-vitals library if needed
            console.log('Core Web Vitals monitoring active');
        }

        // Page load performance
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page load time: ${Math.round(loadTime)}ms`);
            
            // Track to Fathom if available
            if (window.fathom) {
                fathom.trackGoal('PAGE_LOAD', Math.round(loadTime));
            }
        });
    }

    enhanceSEO() {
        // Add structured data for better search results
        const addBreadcrumbs = () => {
            const breadcrumbSchema = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://wordleunlimited.cool/"
                    }
                ]
            };

            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(breadcrumbSchema);
            document.head.appendChild(script);
        };

        // Add FAQ schema for tips page
        if (window.location.pathname.includes('daily-tips')) {
            const faqSchema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What are the best starting words for Wordle?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "ADIEU, AROSE, SLATE, and CRANE are among the best starting words as they contain common vowels and consonants."
                        }
                    },
                    {
                        "@type": "Question", 
                        "name": "How can I improve my Wordle success rate?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Use the 3-2-1 strategy: start with vowel-heavy words, then common consonants, then apply logic and elimination."
                        }
                    }
                ]
            };

            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(faqSchema);
            document.head.appendChild(script);
        }

        addBreadcrumbs();
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new PerformanceOptimizer());
} else {
    new PerformanceOptimizer();
}