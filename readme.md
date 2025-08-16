# Wordle Unlimited

A free, unlimited version of the popular Wordle game optimized for AdSense revenue and SEO performance. Play as many word puzzles as you want without daily restrictions.

## Features

- **Unlimited Gameplay**: No daily limits - play as many times as you want
- **Mobile-First Design**: Responsive layout that works perfectly on all devices
- **SEO Optimized**: Comprehensive meta tags, structured data, and semantic HTML
- **AdSense Ready**: Strategically placed ad containers optimized for revenue
- **Statistics Tracking**: Local storage for game statistics and progress
- **Accessibility**: Full keyboard support and accessibility features
- **Fast Loading**: Lightweight, static files for quick deployment

## File Structure

```
wordle-unlimited/
├── index.html              # Main game page with SEO optimization
├── styles.css              # Mobile-first responsive CSS
├── game.js                 # Core game logic
├── adsense-config.js       # AdSense optimization and management
├── wordle-answers-alphabetical.txt  # Answer word list
├── wordle-word-list.txt    # Complete valid word list
├── robots.txt              # Search engine crawler instructions
├── sitemap.xml             # XML sitemap for SEO
├── netlify.toml            # Netlify configuration
├── _headers                # Netlify headers configuration
├── _redirects              # Netlify redirects configuration
├── ADSENSE_SETUP.md        # Complete AdSense setup guide
└── README.md               # This file
```

## Setup Instructions

### 1. AdSense Configuration

1. Open `adsense-config.js`
2. Replace the empty `publisher` field with your AdSense publisher ID:
   ```javascript
   publisher: 'ca-pub-XXXXXXXXXXXXXXXXX', // Your AdSense publisher ID
   ```
3. Add your ad slot IDs in the `createAdSlot` method
4. Update the `data-ad-slot` attributes with your actual slot IDs

### 2. Domain Configuration

1. Update `index.html` meta tags:
   - Set proper `og:url` and canonical URL
   - Update the domain in structured data
2. Update `sitemap.xml` with your actual domain
3. Configure `robots.txt` if needed

### 3. Netlify Deployment for wordleunlimited.cool

**Step-by-step deployment:**

1. **Prepare Repository**:
   ```bash
   # Initialize git repository
   git init
   git add .
   git commit -m "Initial Wordle Unlimited site"
   
   # Push to GitHub (create repo first)
   git remote add origin https://github.com/yourusername/wordle-unlimited.git
   git push -u origin main
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com) and sign up
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your wordle-unlimited repository
   - Build settings: Leave default (static site detection)
   - Click "Deploy site"

3. **Configure Custom Domain**:
   - In Netlify dashboard, go to "Domain settings"
   - Click "Add custom domain"
   - Enter `wordleunlimited.cool`
   - Add DNS records in Namecheap:
     - Type: CNAME, Name: www, Value: [your-netlify-subdomain].netlify.app
     - Type: ALIAS/ANAME, Name: @, Value: [your-netlify-subdomain].netlify.app
   - Enable HTTPS (automatic with Netlify)

4. **Optimize for Performance**:
   - Netlify will automatically use the `netlify.toml` configuration
   - CDN and caching are handled automatically
   - Core Web Vitals should be excellent out of the box

**Alternative deployment options:**
- **Vercel**: Similar process with GitHub integration
- **GitHub Pages**: Free but less features than Netlify
- **AWS S3 + CloudFront**: More complex but highly scalable

### 4. SEO Optimization

The site includes:
- Comprehensive meta tags for social sharing
- JSON-LD structured data for search engines
- Semantic HTML5 structure
- Optimized content in footer for keyword targeting
- Fast loading times and mobile optimization

## AdSense Optimization Features

- **Strategic Ad Placement**: Top banner, sidebar, and bottom placements
- **Responsive Ad Units**: Automatically adjust to screen size
- **Game Event Tracking**: Monitors user engagement for ad optimization
- **Ad Refresh Logic**: Refreshes ads after game completion
- **Viewability Tracking**: Monitors ad visibility for better performance
- **User Experience**: Prevents accidental clicks during gameplay

## Game Features

- 6 attempts to guess a 5-letter word
- Visual feedback with color-coded tiles
- Virtual keyboard with state tracking
- Statistics tracking (games played, win rate, streaks)
- Guess distribution charts
- How-to-play instructions
- Unlimited games with new words each time

## Performance Optimization

- Lightweight CSS and JavaScript
- Lazy loading for ad scripts
- Local storage for game data
- Minimal external dependencies
- Optimized image and font loading

## Revenue Optimization Tips

1. **Monitor Performance**: Use Google Analytics and AdSense reports
2. **A/B Testing**: Test different ad placements and sizes
3. **Content Updates**: Regularly update meta descriptions and content
4. **Speed Optimization**: Maintain fast loading times
5. **Mobile Experience**: Ensure excellent mobile performance
6. **User Engagement**: Monitor bounce rate and session duration

## License

This project is for educational and commercial use. Ensure compliance with:
- Google AdSense policies
- Original Wordle trademark considerations
- Word list licensing (if applicable)

## Support

For issues or questions:
1. Check browser console for JavaScript errors
2. Verify AdSense setup and approval status
3. Test on multiple devices and browsers
4. Monitor Core Web Vitals in Google Search Console

---

**Ready to deploy and start earning!** This implementation provides a solid foundation for a profitable Wordle clone with proper SEO and AdSense optimization.