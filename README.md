# 🔐 Decentralized Identity (DID) System

A blockchain-based digital identity platform that allows users to create, manage, and verify their decentralized identities with credentials, all stored on the Ethereum blockchain.

![DID System Banner](https://img.shields.io/badge/Blockchain-Ethereum-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![Version](https://img.shields.io/badge/Version-2.0-orange)

## 🌟 Features

### Core Identity Management
- **🆔 DID Generation**: Create unique decentralized identifiers
- **📸 Profile Pictures**: Upload and display avatar images
- **🔗 Blockchain Storage**: Immutable identity records on Ethereum
- **💾 Local Backup**: Works offline with localStorage fallback
- **🔍 Identity Verification**: Verify any DID from blockchain or local storage

### Advanced Credentials System
- **🎓 Education Credentials**: Degrees, certificates, courses
- **💼 Work Experience**: Employment history and achievements
- **⚡ Skills & Certifications**: Technical and professional skills
- **📜 Licenses**: Professional licenses and permits
- **📅 Date Tracking**: Issue dates and expiry management

### Sharing & Export
- **📱 QR Code Generation**: Instant sharing via QR codes
- **💾 JSON Export**: Portable identity files
- **🔗 Universal Verification**: Cross-platform compatibility
- **🌍 Global Access**: No geographic restrictions

### User Experience
- **🎨 Modern UI**: Responsive design with smooth animations
- **📱 Mobile Friendly**: Works on all devices
- **🔄 Real-time Updates**: Live blockchain synchronization
- **⚡ Fast Performance**: Optimized for speed

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- MetaMask wallet extension
- Sepolia testnet ETH (for blockchain features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/did-system.git
   cd did-system
   ```

2. **Open in VS Code**
   ```bash
   code .
   ```

3. **Launch the application**
   - Open `index.html` in your browser
   - Or use Live Server extension in VS Code

### Setup MetaMask

1. Install [MetaMask](https://metamask.io/download/)
2. Switch to Sepolia testnet
3. Get test ETH from [Sepolia Faucet](https://sepoliafaucet.com/)
4. Deploy the smart contract (optional - app works without it)

## 📁 Project Structure

```
did-system/
├── index.html          # Main HTML file with tab navigation
├── app.js             # Core JavaScript functionality
├── style.css          # Modern CSS styling with animations
├── README.md          # Project documentation
├── contract/          # Smart contract files (to be added)
│   └── DIDRegistry.sol
└── assets/            # Images and resources
    └── screenshots/
```

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Blockchain**: Ethereum, Solidity, Ethers.js
- **Storage**: LocalStorage, IPFS (for images)
- **Libraries**: 
  - Ethers.js v5.7.2 (Ethereum interaction)
  - QRCode.js (QR code generation)
- **Wallet**: MetaMask integration
- **Network**: Sepolia Testnet

## 📖 Usage Guide

### 1. Register Your DID

1. Navigate to the **Register** tab
2. Fill in your details:
   - Full Name (required)
   - Email Address (required)
   - Phone Number (optional)
   - Location (optional)
3. Upload a profile picture (optional)
4. Click "Generate & Register DID"
5. Confirm MetaMask transaction (if connected)

### 2. Add Credentials

1. Go to the **Credentials** tab
2. Select credential type:
   - 🎓 Education
   - 💼 Work Experience
   - ⚡ Skill Certificate
   - 📜 License
3. Fill in credential details
4. Click "Add Credential"

### 3. Verify Identity

1. Open the **Verify** tab
2. Leave address empty to verify your own DID
3. Or enter any wallet address to verify others
4. Click "Verify Identity"
5. View results and scan QR code

### 4. Manage Profile

1. Visit the **My Profile** tab
2. Click "Load My Profile"
3. View all your information and credentials
4. Export as JSON or generate QR code

## 🔧 Configuration

### Smart Contract Setup

1. **Deploy DIDRegistry Contract**
   ```solidity
   // Deploy to Sepolia testnet using Remix IDE
   // Copy the deployed contract address
   ```

2. **Update Contract Address**
   ```javascript
   // In app.js, replace:
   const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";
   ```

### Local Development

```bash
# Using Live Server (VS Code extension)
1. Install "Live Server" extension
2. Right-click index.html
3. Select "Open with Live Server"

# Or simple HTTP server
python -m http.server 8000
# Then open http://localhost:8000
```

## 🆚 Comparison with DigiLocker

| Feature | DigiLocker | Our DID System |
|---------|-----------|----------------|
| **Control** | Government | Self-sovereign |
| **Geography** | India only | Global |
| **Storage** | Centralized servers | Blockchain + Local |
| **Documents** | Government only | Any credential |
| **Privacy** | Limited | Full control |
| **Tampering** | Possible | Impossible |
| **Portability** | Limited | Universal |
| **Cost** | Free | Minimal gas fees |

## 🔒 Security Features

- **Blockchain Immutability**: Records cannot be altered once stored
- **Cryptographic Verification**: All identities are cryptographically signed
- **Self-Sovereign**: You control your own data
- **No Central Authority**: Decentralized by design
- **Privacy First**: Share only what you choose
- **Backup System**: Local storage prevents data loss

## 🌐 Use Cases

### Personal
- Digital resume with verified credentials
- Academic transcript verification
- Professional portfolio
- Identity verification for services

### Professional
- Employee background verification
- Freelancer credential showcase
- Cross-border employment verification
- Professional licensing

### Educational
- Degree verification
- Certificate authenticity
- Student record management
- Academic achievement tracking

## 🚧 Roadmap

### Phase 1 (Current)
- ✅ Basic DID creation and verification
- ✅ Credential management system
- ✅ QR code sharing
- ✅ Local storage backup

### Phase 2 (Planned)
- 📄 Document upload (PDF, images)
- 🔐 Encryption for sensitive data
- 🌐 IPFS integration for decentralized storage
- 📱 Mobile app (React Native)

### Phase 3 (Future)
- 🤝 Multi-signature verification
- 🔄 Credential revocation system
- 📊 Reputation scoring
- 🔌 API for third-party integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sujal Belkhode**
- GitHub: [@sujalbelkhode](https://github.com/sujalbelkhode)
- Email: sujal@example.com
- LinkedIn: [Sujal Belkhode](https://linkedin.com/in/sujalbelkhode)

## 🙏 Acknowledgments

- Ethereum Foundation for blockchain infrastructure
- MetaMask team for wallet integration
- OpenZeppelin for smart contract standards
- QRCode.js library for QR generation

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/yourusername/did-system/issues) page
2. Create a new issue with detailed description
3. Join our [Discord community](https://discord.gg/your-server)
4. Email: support@yourproject.com

## 🔗 Links

- [Live Demo](https://your-demo-link.com)
- [Smart Contract on Etherscan](https://sepolia.etherscan.io/address/your-contract)
- [Project Documentation](https://docs.yourproject.com)
- [Video Tutorial](https://youtube.com/your-tutorial)

---

**Made with ❤️ for the decentralized future**