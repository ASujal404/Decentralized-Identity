// app.js — Enhanced DID System with New Features

const CONTRACT_ADDRESS = "PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "string", "name": "_email", "type": "string" },
      { "internalType": "string", "name": "_did", "type": "string" }
    ],
    "name": "registerDID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyDID",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "string", "name": "email", "type": "string" },
          { "internalType": "string", "name": "did", "type": "string" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
        ],
        "internalType": "struct DIDRegistry.DIDRecord",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

let provider;
let signer;
let contract;
let isConnected = false;
let userAddress = "";
let credentials = [];
let profileData = {};

// ✅ Connect MetaMask
async function connectMetaMask() {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return;
  }
  
  if (CONTRACT_ADDRESS === "PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE") {
    document.getElementById("connectStatus").innerText = "⚠️ Contract address not set (Demo Mode)";
    return;
  }
  
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    isConnected = true;
    
    userAddress = await signer.getAddress();
    document.getElementById("connectStatus").innerText = `✅ Connected: ${userAddress.slice(0,6)}...${userAddress.slice(-4)}`;
  } catch (err) {
    console.error(err);
    alert("Connection failed: " + err.message);
  }
}

// Auto-connect on page load
window.addEventListener('load', connectMetaMask);

// ========== TAB NAVIGATION ==========
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.dataset.tab;
    
    // Remove active class from all
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    // Add active to clicked
    btn.classList.add('active');
    document.getElementById(tabName).classList.add('active');
  });
});

// ========== PROFILE PICTURE PREVIEW ==========
document.getElementById('avatar').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const preview = document.getElementById('avatarPreview');
      preview.innerHTML = `<img src="${event.target.result}" alt="Avatar">`;
      preview.style.display = 'block';
      profileData.avatar = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// ========== GENERATE DID ==========
function generateDID(name, email) {
  const random = Math.floor(Math.random() * 1000000);
  const timestamp = Date.now();
  return `did:example:${name.toLowerCase().replace(/\s+/g, '')}-${random}-${timestamp}`;
}

// ✅ Register DID on blockchain
document.getElementById("generateDID").addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const location = document.getElementById("location").value.trim();

  if (!name || !email) {
    alert("Please fill name and email!");
    return;
  }

  const did = generateDID(name, email);
  
  // Store additional data locally
  profileData = {
    name,
    email,
    phone,
    location,
    did,
    avatar: profileData.avatar || null,
    credentials: credentials,
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem('didProfile', JSON.stringify(profileData));
  
  // If contract is connected, register on blockchain
  if (isConnected && contract) {
    try {
      document.getElementById("didOutput").innerHTML = "⏳ Processing transaction...";
      const tx = await contract.registerDID(name, email, did);
      document.getElementById("didOutput").innerHTML = "⏳ Waiting for confirmation...";
      await tx.wait();

      document.getElementById("didOutput").innerHTML = `
        ✅ <b>DID Registered Successfully!</b><br><br>
        <b>Your DID:</b> ${did}<br>
        <b>Name:</b> ${name}<br>
        <b>Email:</b> ${email}<br>
        ${phone ? `<b>Phone:</b> ${phone}<br>` : ''}
        ${location ? `<b>Location:</b> ${location}<br>` : ''}
        <br><small>✅ Stored on Blockchain & Locally</small>
      `;
    } catch (err) {
      console.error(err);
      document.getElementById("didOutput").innerHTML = "❌ Blockchain registration failed (saved locally)";
    }
  } else {
    document.getElementById("didOutput").innerHTML = `
      ✅ <b>DID Created Successfully!</b><br><br>
      <b>Your DID:</b> ${did}<br>
      <b>Name:</b> ${name}<br>
      <b>Email:</b> ${email}<br>
      ${phone ? `<b>Phone:</b> ${phone}<br>` : ''}
      ${location ? `<b>Location:</b> ${location}<br>` : ''}
      <br><small>💾 Saved Locally (Connect contract to save on blockchain)</small>
    `;
  }
});

// ========== VERIFY DID ==========
document.getElementById("verifyDID").addEventListener("click", async () => {
  const address = document.getElementById("verifyAddress").value.trim();
  
  console.log("Verify clicked, address:", address);
  
  // If no address provided, load from localStorage
  if (!address) {
    const stored = localStorage.getItem('didProfile');
    console.log("Stored data:", stored);
    
    if (stored) {
      try {
        const data = JSON.parse(stored);
        displayVerificationResult(data);
        generateQRCode(data.did);
      } catch (err) {
        console.error("Parse error:", err);
        document.getElementById("verifyOutput").innerHTML = "❌ Error loading profile data";
      }
    } else {
      document.getElementById("verifyOutput").innerHTML = `
        <div style="text-align: center; padding: 20px;">
          <h3 style="color: #ff9900;">❌ No DID Found</h3>
          <p>Please register your DID first in the Register tab.</p>
        </div>
      `;
    }
    return;
  }
  
  // If contract connected, fetch from blockchain
  if (isConnected && contract) {
    try {
      document.getElementById("verifyOutput").innerHTML = "⏳ Fetching from blockchain...";
      const record = await contract.getMyDID();
      if (!record.did) {
        document.getElementById("verifyOutput").innerHTML = "❌ No DID found on blockchain!";
        return;
      }

      const data = {
        name: record.name,
        email: record.email,
        did: record.did,
        timestamp: new Date(record.timestamp * 1000).toISOString()
      };
      
      displayVerificationResult(data);
      generateQRCode(data.did);
    } catch (err) {
      console.error(err);
      document.getElementById("verifyOutput").innerHTML = `
        <div style="text-align: center; padding: 20px;">
          <h3 style="color: #ff9900;">❌ Verification Failed</h3>
          <p>${err.message}</p>
        </div>
      `;
    }
  } else {
    document.getElementById("verifyOutput").innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h3 style="color: #ff9900;">⚠️ Blockchain Not Connected</h3>
        <p>Showing local data only. Connect MetaMask to verify from blockchain.</p>
      </div>
    `;
    
    // Still try to show local data
    const stored = localStorage.getItem('didProfile');
    if (stored) {
      const data = JSON.parse(stored);
      displayVerificationResult(data);
      generateQRCode(data.did);
    }
  }
});

function displayVerificationResult(data) {
  console.log("Displaying verification result:", data);
  
  const output = document.getElementById("verifyOutput");
  if (!output) {
    console.error("verifyOutput element not found");
    return;
  }
  
  output.innerHTML = `
    <div style="text-align: left; background: #2c3e50; padding: 20px; border-radius: 10px; margin-top: 20px;">
      ${data.avatar ? `
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="${data.avatar}" style="width: 120px; height: 120px; border-radius: 50%; border: 3px solid #ff9900; object-fit: cover;">
        </div>
      ` : ''}
      <h3 style="color: #ff9900; margin-bottom: 15px;">✅ Identity Verified</h3>
      <p style="margin: 8px 0;"><b>Name:</b> ${data.name}</p>
      <p style="margin: 8px 0;"><b>Email:</b> ${data.email}</p>
      <p style="margin: 8px 0; word-break: break-all;"><b>DID:</b> ${data.did}</p>
      ${data.phone ? `<p style="margin: 8px 0;"><b>Phone:</b> ${data.phone}</p>` : ''}
      ${data.location ? `<p style="margin: 8px 0;"><b>Location:</b> ${data.location}</p>` : ''}
      <p style="margin: 8px 0;"><b>Created:</b> ${new Date(data.timestamp).toLocaleString()}</p>
      ${data.credentials && data.credentials.length > 0 ? 
        `<p style="margin: 8px 0;"><b>Credentials:</b> ${data.credentials.length} verified</p>` : 
        '<p style="margin: 8px 0;"><b>Credentials:</b> None added</p>'}
    </div>
  `;
}

function generateQRCode(text) {
  const container = document.getElementById("qrCodeContainer");
  
  // Check if QRCode library is loaded
  if (typeof QRCode === 'undefined') {
    console.error("QRCode library not loaded");
    container.innerHTML = '<p style="color: #ff9900;">QR Code generation unavailable</p>';
    return;
  }
  
  container.innerHTML = '<h3 style="color: #000; margin-bottom: 10px;">📱 Scan to Share DID</h3>';
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  
  try {
    QRCode.toCanvas(canvas, text, { width: 200, margin: 2 }, (error) => {
      if (error) {
        console.error("QR generation error:", error);
        container.innerHTML = '<p style="color: #ff9900;">QR Code generation failed</p>';
      }
    });
  } catch (err) {
    console.error("QR error:", err);
    container.innerHTML = `<p style="color: #000;">DID: ${text}</p>`;
  }
}

// ========== CREDENTIALS MANAGEMENT ==========
document.getElementById("addCredential").addEventListener("click", () => {
  const type = document.getElementById("credentialType").value;
  const title = document.getElementById("credentialTitle").value.trim();
  const issuer = document.getElementById("credentialIssuer").value.trim();
  const date = document.getElementById("credentialDate").value;
  const description = document.getElementById("credentialDescription").value.trim();

  if (!type || !title || !issuer) {
    alert("Please fill all required fields!");
    return;
  }

  const credential = {
    id: Date.now(),
    type,
    title,
    issuer,
    date,
    description,
    addedAt: new Date().toISOString()
  };

  credentials.push(credential);
  
  // Update profile data
  const stored = localStorage.getItem('didProfile');
  if (stored) {
    profileData = JSON.parse(stored);
    profileData.credentials = credentials;
    localStorage.setItem('didProfile', JSON.stringify(profileData));
  }

  displayCredentials();
  
  // Clear form
  document.getElementById("credentialType").value = "";
  document.getElementById("credentialTitle").value = "";
  document.getElementById("credentialIssuer").value = "";
  document.getElementById("credentialDate").value = "";
  document.getElementById("credentialDescription").value = "";
});

function displayCredentials() {
  const container = document.getElementById("credentialsList");
  
  if (credentials.length === 0) {
    container.innerHTML = '<p style="color: #888;">No credentials added yet.</p>';
    return;
  }

  container.innerHTML = credentials.map(cred => {
    const icons = {
      education: '🎓',
      work: '💼',
      skill: '⚡',
      license: '📜'
    };
    
    return `
      <div class="credential-card">
        <h3>${icons[cred.type]} ${cred.title}</h3>
        <p><b>Issuer:</b> ${cred.issuer}</p>
        ${cred.date ? `<p><b>Date:</b> ${new Date(cred.date).toLocaleDateString()}</p>` : ''}
        ${cred.description ? `<p><b>Description:</b> ${cred.description}</p>` : ''}
        <p style="font-size: 0.9em; color: #888;">Added: ${new Date(cred.addedAt).toLocaleString()}</p>
      </div>
    `;
  }).join('');
}

// ========== MY PROFILE ==========
document.getElementById("loadProfile").addEventListener("click", () => {
  const stored = localStorage.getItem('didProfile');
  
  if (!stored) {
    document.getElementById("profileData").innerHTML = 
      '<p style="color: #ff9900;">❌ No profile found. Please register first.</p>';
    return;
  }

  const data = JSON.parse(stored);
  credentials = data.credentials || [];
  
  document.getElementById("profileData").innerHTML = `
    <div style="text-align: left;">
      ${data.avatar ? `<div style="text-align: center; margin-bottom: 20px;">
        <img src="${data.avatar}" style="width: 150px; height: 150px; border-radius: 50%; border: 3px solid #ff9900; object-fit: cover;">
      </div>` : ''}
      <h3 style="color: #ff9900;">📋 Profile Information</h3>
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Email:</b> ${data.email}</p>
      ${data.phone ? `<p><b>Phone:</b> ${data.phone}</p>` : ''}
      ${data.location ? `<p><b>Location:</b> ${data.location}</p>` : ''}
      <p><b>DID:</b> ${data.did}</p>
      <p><b>Created:</b> ${new Date(data.timestamp).toLocaleString()}</p>
      <p><b>Credentials:</b> ${credentials.length} verified</p>
      <p><b>Wallet:</b> ${userAddress || 'Not connected'}</p>
    </div>
  `;
  
  document.getElementById("exportDID").style.display = 'inline-block';
  document.getElementById("generateQR").style.display = 'inline-block';
});

// ========== EXPORT DID ==========
document.getElementById("exportDID").addEventListener("click", () => {
  const stored = localStorage.getItem('didProfile');
  if (!stored) {
    alert("No profile to export!");
    return;
  }

  const data = JSON.parse(stored);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `DID_${data.name.replace(/\s+/g, '_')}_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  
  alert("✅ DID Profile exported successfully!");
});

// ========== GENERATE QR FOR PROFILE ==========
document.getElementById("generateQR").addEventListener("click", () => {
  const stored = localStorage.getItem('didProfile');
  if (!stored) {
    alert("No profile to generate QR!");
    return;
  }

  const data = JSON.parse(stored);
  const container = document.getElementById("profileQR");
  container.innerHTML = '<h3 style="color: #000; margin: 10px;">Your DID QR Code</h3>';
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  
  QRCode.toCanvas(canvas, JSON.stringify({
    did: data.did,
    name: data.name,
    email: data.email
  }), { width: 250 }, (error) => {
    if (error) console.error(error);
  });
});

// Load credentials on page load
window.addEventListener('load', () => {
  const stored = localStorage.getItem('didProfile');
  if (stored) {
    const data = JSON.parse(stored);
    credentials = data.credentials || [];
    displayCredentials();
  }
});
