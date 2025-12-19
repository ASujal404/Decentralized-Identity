# 🚀 Deployment Guide

This guide will help you deploy the DID System project to various platforms.

## 📋 Prerequisites

- Node.js (v14 or higher)
- Git
- MetaMask wallet
- Sepolia testnet ETH

## 🔧 Local Development Setup

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/did-system.git
cd did-system

# Install dependencies (optional, for live-server)
npm install

# Start development server
npm run dev
```

### 2. VS Code Setup

```bash
# Open in VS Code
code .

# Install recommended extensions
# VS Code will prompt you to install recommended extensions
```

## 📱 Smart Contract Deployment

### Using Remix IDE (Recommended)

1. **Open Remix IDE**
   - Go to [remix.ethereum.org](https://remix.ethereum.org)

2. **Create Contract File**
   - Create new file: `DIDRegistry.sol`
   - Copy content from `contract/DIDRegistry.sol`

3. **Compile Contract**
   - Go to Solidity Compiler tab
   - Select compiler version: `0.8.19`
   - Click "Compile DIDRegistry.sol"

4. **Deploy to Sepolia**
   - Go to Deploy & Run tab
   - Environment: "Injected Provider - MetaMask"
   - Make sure MetaMask is on Sepolia testnet
   - Click "Deploy"
   - Confirm transaction in MetaMask

5. **Copy Contract Address**
   - After deployment, copy the contract address
   - Update `app.js`:
   ```javascript
   const CONTRACT_ADDRESS = "0xYourContractAddressHere";
   ```

### Using Hardhat (Advanced)

```bash
# Install Hardhat
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers

# Initialize Hardhat project
npx hardhat

# Deploy script (create deploy.js)
npx hardhat run scripts/deploy.js --network sepolia
```

## 🌐 Web Hosting Deployment

### GitHub Pages (Free)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/did-system.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to Pages section
   - Source: Deploy from branch
   - Branch: main / (root)
   - Save

3. **Access Your Site**
   - URL: `https://yourusername.github.io/did-system`

### Netlify (Recommended)

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: (leave empty)
   - Publish directory: (leave empty or set to `/`)
   - Click "Deploy site"

3. **Custom Domain (Optional)**
   - Go to Site settings > Domain management
   - Add custom domain

### Vercel

1. **Deploy with Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Or use Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy automatically

## 📱 Mobile App (Future)

### React Native Setup

```bash
# Create React Native app
npx react-native init DIDSystemMobile
cd DIDSystemMobile

# Install Web3 dependencies
npm install ethers react-native-crypto
```

## 🔒 Security Considerations

### Environment Variables

Create `.env` file (never commit this):
```env
PRIVATE_KEY=your_private_key_here
INFURA_PROJECT_ID=your_infura_id
CONTRACT_ADDRESS=deployed_contract_address
```

### Production Checklist

- [ ] Contract address updated in `app.js`
- [ ] Remove console.log statements
- [ ] Enable HTTPS
- [ ] Add Content Security Policy headers
- [ ] Implement rate limiting
- [ ] Add error tracking (Sentry)
- [ ] Optimize images and assets
- [ ] Test on multiple browsers
- [ ] Test MetaMask integration
- [ ] Verify QR code functionality

## 📊 Analytics & Monitoring

### Google Analytics

Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking with Sentry

```html
<script src="https://browser.sentry-cdn.com/7.x.x/bundle.min.js"></script>
<script>
  Sentry.init({ dsn: 'YOUR_SENTRY_DSN' });
</script>
```

## 🚀 Performance Optimization

### Image Optimization
- Compress profile pictures
- Use WebP format when possible
- Implement lazy loading

### Code Optimization
```javascript
// Minify JavaScript
// Use CDN for libraries
// Enable gzip compression
```

### Caching Strategy
```html
<!-- Add cache headers -->
<meta http-equiv="Cache-Control" content="max-age=31536000">
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## 📞 Support

If you encounter issues during deployment:

1. Check the [Issues](https://github.com/yourusername/did-system/issues) page
2. Create a new issue with:
   - Deployment platform
   - Error messages
   - Steps to reproduce
3. Join our [Discord](https://discord.gg/your-server) for real-time help

## 🔗 Useful Links

- [Remix IDE](https://remix.ethereum.org)
- [Sepolia Faucet](https://sepoliafaucet.com)
- [MetaMask](https://metamask.io)
- [Etherscan Sepolia](https://sepolia.etherscan.io)
- [GitHub Pages](https://pages.github.com)
- [Netlify](https://netlify.com)
- [Vercel](https://vercel.com)

---

**Happy Deploying! 🚀**