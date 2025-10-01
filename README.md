# 🚀 Enhanced Portfolio - Harsh Pandey

A modern, responsive portfolio website with advanced animations, interactive components, and professional design.

## ✨ Features

- **🎬 Professional Loading Screen** - Animated progress bar with dynamic text
- **🎨 Theme Switcher** - Dark/Light mode with smooth transitions  
- **📊 Animated Skill Bars** - Visual progress indicators for skills
- **📱 Mobile Responsive** - Optimized for all devices
- **🎯 Interactive Timeline** - Education and experience showcase
- **🔍 Project Modals** - Detailed project information with tech stacks
- **📬 Contact Form** - Real-time validation and submission
- **⚡ Smooth Animations** - Professional transitions and effects
- **🎮 Custom Cursor** - Gaming-themed car cursor
- **🌟 Particle Effects** - Interactive background elements

## 📁 File Structure

```
Portfolio/
├── index.html              # Main HTML file
├── style.css              # Main CSS styles  
├── script.js             # Main JavaScript
├── test.html            # Test page for debugging
├── index-backup.html    # Backup of original
├── README.md           # This file
└── components/
    ├── loading.css     # Loading screen styles
    ├── loading.js      # Loading functionality
    ├── modal.css       # Modal styles
    ├── modal.js        # Project modals
    ├── timeline.css    # Timeline styles
    ├── form.js         # Contact form functionality
    └── theme.js        # Theme switcher
```

## 🚀 Getting Started

### 1. Open the Portfolio
Simply double-click `index.html` or open it in your browser:

**Windows:**
```bash
# Open in default browser
start index.html

# Or open in specific browser
"C:\Program Files\Google\Chrome\Application\chrome.exe" index.html
```

### 2. Test Components
Open `test.html` first to verify all components work:
```bash
start test.html
```

## 🔧 Troubleshooting

### ❌ **Problem: Loading screen doesn't disappear**
**Solution:**
1. Check browser console (F12) for JavaScript errors
2. Ensure all component files are in the `components/` folder
3. Try the test page first: `test.html`

### ❌ **Problem: Fonts not loading**
**Solution:**
1. Check internet connection (Google Fonts CDN required)
2. Fonts will fallback to system fonts if offline

### ❌ **Problem: Skill bars not animating**
**Solution:**
1. Scroll down to the Skills section to trigger animation
2. Check that `data-skill` attributes exist on `.skill-fill` elements

### ❌ **Problem: Navigation not working**
**Solution:**
1. Use the navigation menu at the top
2. Sections use smooth scrolling (not the old showSection method)
3. Try scrolling manually to see sections

### ❌ **Problem: Project modals not opening**
**Solution:**
1. Click the "View Details" button on project cards
2. Ensure `modal.js` is loaded
3. Check browser console for errors

### ❌ **Problem: Contact form not working**
**Solution:**
1. Form validation works client-side only
2. Actual submission is simulated (shows success message)
3. For real submission, integrate with a backend service

### ❌ **Problem: Theme toggle not working**
**Solution:**
1. Click the 🌙/☀️ button in top-right corner
2. Theme persists in localStorage
3. Check `theme.js` is loaded

## 🎮 Interactive Elements

### Navigation
- **Desktop:** Click navigation links or scroll
- **Mobile:** Use hamburger menu (☰)
- **Keyboard:** Tab navigation supported

### Project Cards
- **Hover Effects:** 3D tilt and shine effects
- **Modal Details:** Click "View Details" for full information
- **External Links:** GitHub and demo links

### Contact Form
- **Real-time Validation:** Input validation as you type
- **Professional Feedback:** Success/error notifications
- **Accessibility:** Full keyboard navigation

### Theme Switching
- **Auto Detection:** Respects system dark/light preference
- **Manual Toggle:** Click theme button to override
- **Persistence:** Remembers your choice

## 🎨 Customization

### Colors (CSS Variables)
Edit `style.css` to change the color scheme:

```css
:root {
    --color-primary: #00ff41;    /* Main green */
    --color-secondary: #ff4757;  /* Accent red */
    --color-accent: #5352ed;     /* Purple accent */
}
```

### Content Updates
1. **Personal Info:** Edit text in `index.html`
2. **Skills:** Update skill percentages in the skills section
3. **Projects:** Modify project data in `components/modal.js`
4. **Timeline:** Update education/experience in timeline section

### Adding New Projects
Edit `components/modal.js` and add new project data:

```javascript
this.projectData = {
    'new-project': {
        title: 'New Project Title',
        tags: ['Tech1', 'Tech2'],
        description: 'Project description...',
        // ... more details
    }
};
```

## 🌐 Browser Compatibility

- ✅ **Chrome** 90+
- ✅ **Firefox** 88+  
- ✅ **Safari** 14+
- ✅ **Edge** 90+
- ⚠️ **Internet Explorer** Not supported

## 📱 Mobile Features

- **Touch Navigation:** Swipe-friendly interface
- **Responsive Design:** Adapts to all screen sizes
- **Mobile Menu:** Hamburger navigation
- **Touch Optimized:** Large tap targets

## 🔍 Debug Mode

Open browser console (F12) to see debug messages:
- `🚀 Portfolio Test Page Loaded`
- `✅ Loading screen completed` 
- `✅ Theme switched to: Dark/Light`
- `✅ Skills animated`
- `✅ Modal opened/closed`
- `✅ Form tested`

## 📞 Support

If you encounter issues:

1. **Check Console:** Press F12 → Console tab for errors
2. **Try Test Page:** Open `test.html` first
3. **Clear Cache:** Ctrl+F5 to force refresh
4. **Check Files:** Ensure all files are in correct folders

## 🎯 Performance Tips

- **Loading Time:** ~2-3 seconds initial load
- **Smooth Scrolling:** Uses `scroll-behavior: smooth`
- **Animations:** Respect `prefers-reduced-motion`
- **Images:** Uses emoji icons for fast loading

## 🚀 Deployment

For production deployment:

1. **Local Testing:** Test thoroughly on `index.html`
2. **Upload Files:** Upload all files maintaining folder structure
3. **Check Paths:** Ensure relative paths work on your server
4. **HTTPS:** Use HTTPS for Google Fonts
5. **CDN:** Consider CDN for faster loading

---

## 📝 Version History

- **v2.0** - Enhanced portfolio with all modern features
- **v1.0** - Original basic portfolio

**Created with ❤️ for Harsh Pandey's Portfolio**
