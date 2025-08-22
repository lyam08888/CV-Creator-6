# CV Creator IA 🚀

An AI-powered CV Creator with drag & drop functionality, built as a Progressive Web App (PWA).

## 🌟 Features

- **AI-Powered Generation**: Automatically generate CV content using artificial intelligence
- **Drag & Drop Interface**: Intuitive drag and drop functionality for organizing CV sections
- **PDF Export**: Export your CV as a professional PDF document
- **PWA Support**: Install as a native app on any device
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Preview**: See your changes instantly
- **Multiple Templates**: Choose from various professional CV templates
- **Offline Support**: Works offline thanks to service worker caching

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)
1. Fork this repository
2. Go to Settings > Pages
3. Select "Deploy from a branch" and choose `main`
4. Your app will be available at `https://yourusername.github.io/CV-Creator-4/`

### Option 2: Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/CV-Creator-4.git
cd CV-Creator-4

# Start local server (Python)
python -m http.server 8000

# Or use Node.js if you have it installed
npm start

# Open in browser
open http://localhost:8000
```

## 🔧 Build & Optimization

### Validate the application
```bash
node validate.js
```

### Build optimized version
```bash
node optimize.js
```

### Deploy to GitHub Pages
The repository includes automated GitHub Actions workflow that:
- Validates HTML, CSS, and JavaScript
- Optimizes assets for production
- Deploys to GitHub Pages automatically

## 📁 Project Structure

```
CV-Creator-4/
├── index.html              # Main application file
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline support
├── css/
│   └── app.css            # Main stylesheet
├── js/
│   ├── app.js             # Main application logic
│   ├── ai.js              # AI integration
│   ├── drag.js            # Drag & drop functionality
│   ├── exporter.js        # PDF export functionality
│   └── ...                # Other modules
├── assets/
│   ├── favicon.svg        # App icon
│   ├── icon-192.png       # PWA icon (192x192)
│   └── icon-512.png       # PWA icon (512x512)
└── templates/
    └── templates.json     # CV templates
```

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Libraries**: 
  - html2canvas (PDF generation)
  - jsPDF (PDF export)
  - SortableJS (Drag & drop)
  - QRCode.js (QR code generation)
- **PWA**: Service Worker, Web App Manifest
- **AI Integration**: Custom AI module for content generation

## 🔧 Configuration

### Environment Variables
No environment variables required - the app runs entirely in the browser.

### AI Configuration
To enable AI features, you may need to configure API endpoints in `js/ai.js`.

## 📱 PWA Installation

Users can install the app on their devices:
1. Visit the app in a supported browser
2. Look for the "Install" prompt or "Add to Home Screen" option
3. Follow the installation prompts

## 🚀 Deployment

### GitHub Pages (Automated)
1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Check the Actions tab for deployment status

### Manual Deployment
1. Run `node optimize.js` to create optimized build
2. Upload the `dist/` folder to your web server
3. Ensure your server serves the files with proper MIME types

## 🐛 Troubleshooting

### Common Issues

**Deployment fails with "Runner not acquired"**
- Check GitHub Actions quota
- Ensure repository has Pages enabled
- Verify workflow permissions

**CSS not loading properly**
- Check for syntax errors with `node validate.js`
- Ensure all CSS files are properly linked
- Verify file paths are correct

**JavaScript modules not loading**
- Ensure all imports/exports are properly configured
- Check browser console for error messages
- Verify all referenced files exist

**PWA not installing**
- Check manifest.json is valid
- Ensure service worker is properly registered
- Verify HTTPS is enabled (required for PWA)

### Performance Issues
- Run `node optimize.js` to create optimized build
- Check browser DevTools for performance bottlenecks
- Ensure images are properly optimized

## 📊 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inter font family by Google Fonts
- Icons from various open source projects
- AI integration powered by modern language models

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Search existing GitHub issues
3. Create a new issue with detailed information

---

Made with ❤️ by T.LAMARA