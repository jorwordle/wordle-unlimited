# AdSense Setup Guide for wordleunlimited.cool

## Step 1: AdSense Application

1. **Visit Google AdSense**: Go to [adsense.google.com](https://adsense.google.com)
2. **Sign up/Login**: Use your Google account
3. **Add your site**: Enter `wordleunlimited.cool` as your website
4. **Select your country**: Choose your country for payment
5. **Review and accept**: Accept AdSense Terms & Conditions

## Step 2: Site Verification

1. **Add AdSense code**: Copy the AdSense code provided
2. **Add AdSense script**: Add this to your `<head>` section:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5375266680607919" crossorigin="anonymous"></script>
   ```
   
   **Note**: Your publisher ID `ca-pub-5375266680607919` is already configured in the meta tag!

## Step 3: Configure Ad Units

### After AdSense Approval:

1. **Create Ad Units** in your AdSense dashboard:
   - **Top Banner**: 728x90 (Leaderboard) / 320x50 (Mobile Banner)
   - **Sidebar**: 300x250 (Medium Rectangle) / 300x600 (Half Page)
   - **Bottom Banner**: 728x90 (Leaderboard) / 320x50 (Mobile Banner)

2. **Get Ad Slot IDs from AdSense Dashboard**:
   - Go to [AdSense.google.com](https://adsense.google.com)
   - Navigate to "Ads" → "By ad unit"
   - Click "Create New Ad Unit" for each placement:
     
     **Top Banner Ad Unit:**
     - Name: "Wordle Top Banner"
     - Size: Responsive
     - Copy the generated slot ID (looks like: 1234567890)
     
     **Sidebar Ad Unit:**
     - Name: "Wordle Sidebar"  
     - Size: Responsive
     - Copy the generated slot ID
     
     **Bottom Banner Ad Unit:**
     - Name: "Wordle Bottom Banner"
     - Size: Responsive
     - Copy the generated slot ID

3. **Update adsense-config.js with your slot IDs**:
   ```javascript
   slots: {
       top: {
           id: 'div-gpt-ad-top',
           slotId: '1234567890', // Replace with your actual top ad slot ID
           size: [[728, 90], [320, 50]],
           responsive: true
       },
       sidebar: {
           id: 'div-gpt-ad-sidebar',
           slotId: '0987654321', // Replace with your actual sidebar ad slot ID
           size: [[300, 250], [300, 600]],
           responsive: true
       },
       bottom: {
           id: 'div-gpt-ad-bottom',
           slotId: '5566778899', // Replace with your actual bottom ad slot ID
           size: [[728, 90], [320, 50]],
           responsive: true
       }
   }
   ```

   **Important**: Your publisher ID `ca-pub-5375266680607919` is already configured!

## Step 4: Content Policy Compliance

### Ensure your site meets AdSense policies:

✅ **Original Content**: Wordle Unlimited with unique features
✅ **User Value**: Free unlimited gameplay
✅ **Navigation**: Clear site structure and navigation
✅ **Privacy Policy**: Create and link a privacy policy
✅ **Terms of Service**: Create and link terms of service

### Required Pages (Create these):

1. **Privacy Policy** (`privacy.html`):
   - Data collection practices
   - Cookie usage
   - Google AdSense data usage
   - User rights

2. **Terms of Service** (`terms.html`):
   - Website usage terms
   - Intellectual property
   - Limitation of liability

## Step 5: Optimization Tips for wordleunlimited.cool

### Content Strategy:
- Add daily Wordle tips blog section
- Create "How to improve at Wordle" guides
- Add word definition features
- Include Wordle statistics and analytics

### Technical Optimization:
- Ensure Core Web Vitals are optimal
- Minimize ad layout shift
- Optimize for mobile performance
- Monitor ad viewability rates

### Revenue Optimization:
- Test different ad placements
- Monitor RPM and CTR in AdSense
- A/B test ad sizes and formats
- Consider adding more content pages

## Step 6: Monetization Timeline

### Week 1-2: Setup
- Deploy site to Netlify
- Submit AdSense application
- Ensure site meets quality guidelines

### Week 3-4: Content Building
- Add more content pages
- Build organic traffic
- Share on social media
- Submit to search engines

### Month 2+: Optimization
- Analyze AdSense performance
- Optimize ad placements
- Add more engaging content
- Scale traffic acquisition

## Expected Revenue Potential

### Conservative Estimates:
- **1,000 daily visitors**: $1-5/day
- **5,000 daily visitors**: $5-25/day  
- **10,000 daily visitors**: $10-50/day

### Factors affecting revenue:
- Traffic quality and geography
- User engagement and session length
- Ad placement optimization
- Seasonal trends (word games peak in winter)

## Compliance Checklist

Before going live:
- [ ] AdSense code properly implemented
- [ ] Privacy policy linked in footer
- [ ] Terms of service linked in footer
- [ ] Site loads fast (< 3 seconds)
- [ ] Mobile-friendly design
- [ ] Original, valuable content
- [ ] No prohibited content
- [ ] Proper ad-to-content ratio

## Monitoring and Analytics

### Set up tracking:
1. **Google Analytics**: Monitor traffic and user behavior
2. **Google Search Console**: Track search performance
3. **AdSense Reports**: Monitor revenue and performance
4. **PageSpeed Insights**: Monitor site speed

### Key metrics to watch:
- RPM (Revenue per thousand impressions)
- CTR (Click-through rate)  
- Viewability rate
- Core Web Vitals scores
- Organic search traffic growth

## Support Resources

- [Google AdSense Help Center](https://support.google.com/adsense)
- [AdSense Policies](https://support.google.com/adsense/answer/48182)
- [Web Vitals](https://web.dev/vitals/)
- [Netlify Docs](https://docs.netlify.com/)

---

**Ready to monetize wordleunlimited.cool!** Follow this guide step-by-step for optimal AdSense setup and revenue generation.