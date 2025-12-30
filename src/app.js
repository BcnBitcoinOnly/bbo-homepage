// Application logic - Populates the page with data from config.js

// Copy Lightning address to clipboard
function copyLightningAddress(event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    const address = document.getElementById('lightning-address-display').textContent;
    const container = document.getElementById('lightning-address-text');
    const iconContainer = document.getElementById('copy-icon-container');
    
    // Deselect any selected text
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }
    
    navigator.clipboard.writeText(address).then(() => {
        iconContainer.classList.add('copied');
        container.style.background = 'rgba(247, 147, 26, 0.1)';
        
        setTimeout(() => {
            iconContainer.classList.remove('copied');
            container.style.background = '';
        }, 2000);
    }).catch(err => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = address;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Deselect text after copying
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        } else if (document.selection) {
            document.selection.empty();
        }
        
        iconContainer.classList.add('copied');
        container.style.background = 'rgba(247, 147, 26, 0.1)';
        
        setTimeout(() => {
            iconContainer.classList.remove('copied');
            container.style.background = '';
        }, 2000);
    });
}

// Copy Bitcoin address to clipboard
function copyBitcoinAddress(event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    const address = document.getElementById('bitcoin-address-display').textContent;
    const container = document.getElementById('bitcoin-address-text');
    const iconContainer = document.getElementById('bitcoin-copy-icon-container');
    
    // Deselect any selected text
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }
    
    navigator.clipboard.writeText(address).then(() => {
        iconContainer.classList.add('copied');
        container.style.background = 'rgba(247, 147, 26, 0.1)';
        
        setTimeout(() => {
            iconContainer.classList.remove('copied');
            container.style.background = '';
        }, 2000);
    }).catch(err => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = address;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Deselect text after copying
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        } else if (document.selection) {
            document.selection.empty();
        }
        
        iconContainer.classList.add('copied');
        container.style.background = 'rgba(247, 147, 26, 0.1)';
        
        setTimeout(() => {
            iconContainer.classList.remove('copied');
            container.style.background = '';
        }, 2000);
    });
}

// Copy to clipboard function (for service addresses)
function copyToClipboard(inputId) {
    const input = document.getElementById(inputId);
    input.select();
    input.setSelectionRange(0, 99999); // For mobile devices
    
    navigator.clipboard.writeText(input.value).then(() => {
        const btn = input.nextElementSibling;
        const originalText = btn.textContent;
        btn.textContent = 'COPIED!';
        btn.style.background = 'var(--bitcoin-orange)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        // Fallback for older browsers
        document.execCommand('copy');
        const btn = input.nextElementSibling;
        const originalText = btn.textContent;
        btn.textContent = 'COPIED!';
        btn.style.background = 'var(--bitcoin-orange)';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    });
}

// Generate QR code
function generateQRCode(containerId, text) {
    if (typeof QRCode === 'undefined') {
        console.error('QRCode library not loaded');
        return;
    }
    
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Container element not found:', containerId);
        return;
    }
    
    // Clear any existing QR code
    container.innerHTML = '';
    
    // Use QRCode.js library API
    try {
        new QRCode(container, {
            text: text,
            width: 200,
            height: 200,
            colorDark: '#000000',
            colorLight: '#FFFFFF',
            correctLevel: QRCode.CorrectLevel.H
        });
        console.log('QR Code generated successfully');
    } catch (error) {
        console.error('QR Code generation error:', error);
    }
}

// Initialize the page
function init() {
    // Set Telegram link
    const telegramLink = document.getElementById('telegram-link');
    if (CONFIG.telegramLink) {
        telegramLink.href = CONFIG.telegramLink;
    } else {
        telegramLink.closest('.connection-card').style.display = 'none';
    }
    
    // Set Meetup.com link
    const meetupComLink = document.getElementById('meetup-com-link');
    if (CONFIG.meetupComLink) {
        meetupComLink.href = CONFIG.meetupComLink;
    } else {
        meetupComLink.closest('.connection-card').style.display = 'none';
    }
    
    // Set service addresses
    if (CONFIG.nodeUrl) {
        document.getElementById('node-address').value = CONFIG.nodeUrl;
    } else {
        document.getElementById('node-address').closest('.service-card').style.display = 'none';
    }
    
    if (CONFIG.electrumUrl) {
        document.getElementById('electrum-address').value = CONFIG.electrumUrl;
    } else {
        document.getElementById('electrum-address').closest('.service-card').style.display = 'none';
    }
    
    if (CONFIG.mempoolUrl) {
        const mempoolLink = document.getElementById('mempool-link');
        mempoolLink.href = CONFIG.mempoolUrl;
    } else {
        document.getElementById('mempool-link').closest('.service-card').style.display = 'none';
    }
    
    // Set status page link
    const statusPageLink = document.getElementById('status-page-link');
    if (CONFIG.statusPageUrl) {
        statusPageLink.href = CONFIG.statusPageUrl;
    } else {
        statusPageLink.closest('.status-section').style.display = 'none';
    }
    
    // Set Signet service addresses
    if (CONFIG.signetNodeUrl) {
        document.getElementById('signet-node-address').value = CONFIG.signetNodeUrl;
    } else {
        document.getElementById('signet-node-address').closest('.service-card').style.display = 'none';
    }
    
    if (CONFIG.signetElectrumUrl) {
        document.getElementById('signet-electrum-address').value = CONFIG.signetElectrumUrl;
    } else {
        document.getElementById('signet-electrum-address').closest('.service-card').style.display = 'none';
    }
    
    if (CONFIG.signetMempoolUrl) {
        const signetMempoolLink = document.getElementById('signet-mempool-link');
        signetMempoolLink.href = CONFIG.signetMempoolUrl;
    } else {
        document.getElementById('signet-mempool-link').closest('.service-card').style.display = 'none';
    }
    
    if (CONFIG.signetFaucetUrl) {
        const signetFaucetLink = document.getElementById('signet-faucet-link');
        signetFaucetLink.href = CONFIG.signetFaucetUrl;
    } else {
        document.getElementById('signet-faucet-link').closest('.service-card').style.display = 'none';
    }
    
    // Set Lightning address from config
    // Set Lightning address from config
    const lightningDisplay = document.getElementById('lightning-address-display');
    if (CONFIG.lightningAddress) {
        lightningDisplay.textContent = CONFIG.lightningAddress;
    }
    const lightningAddress = CONFIG.lightningAddress || '';
    
    // Generate QR code - ensure library is loaded first
    function tryGenerateQR() {
        if (typeof QRCode !== 'undefined' && lightningAddress) {
            generateQRCode('lightning-qr', `lightning:${lightningAddress}`);
        } else if (lightningAddress) {
            // Retry after a short delay if library isn't loaded yet
            setTimeout(tryGenerateQR, 100);
        }
    }
    
    // Try immediately, and also on window load
    tryGenerateQR();
    window.addEventListener('load', tryGenerateQR);
    
    // Set current year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Try to load Bitcoin address from address.txt
    loadBitcoinAddress();
}

// Load Bitcoin address from address.txt file
async function loadBitcoinAddress() {
    try {
        const response = await fetch('address.txt');
        if (!response.ok) {
            // File doesn't exist or can't be read, don't add Bitcoin section
            return;
        }
        
        const text = await response.text();
        const address = text.trim();
        
        // Only add section if address has a value
        if (!address) {
            return;
        }
        
        // Get the donation display container
        const donationDisplay = document.querySelector('.donation-display');
        if (!donationDisplay) {
            return;
        }
        
        // Create Bitcoin address display section
        const bitcoinAddressDisplay = document.createElement('div');
        bitcoinAddressDisplay.className = 'address-display';
        bitcoinAddressDisplay.id = 'bitcoin-address-text';
        
        const addressLabel = document.createElement('div');
        addressLabel.className = 'address-label';
        addressLabel.textContent = 'BITCOIN ADDRESS';
        
        const addressValueWrapper = document.createElement('div');
        addressValueWrapper.className = 'address-value-wrapper';
        
        const addressValue = document.createElement('div');
        addressValue.className = 'address-value';
        addressValue.id = 'bitcoin-address-display';
        
        // Split address into first 6, middle, and last 6 characters
        const first6 = address.substring(0, 6);
        const middle = address.substring(6, address.length - 6);
        const last6 = address.substring(address.length - 6);
        
        // Create spans for each part with different colors
        const firstSpan = document.createElement('span');
        firstSpan.className = 'bitcoin-address-start';
        firstSpan.textContent = first6;
        
        const middleSpan = document.createElement('span');
        middleSpan.className = 'bitcoin-address-middle';
        middleSpan.textContent = middle;
        
        const lastSpan = document.createElement('span');
        lastSpan.className = 'bitcoin-address-end';
        lastSpan.textContent = last6;
        
        addressValue.appendChild(firstSpan);
        addressValue.appendChild(middleSpan);
        addressValue.appendChild(lastSpan);
        
        const copyIconContainer = document.createElement('div');
        copyIconContainer.className = 'copy-icon-container';
        copyIconContainer.id = 'bitcoin-copy-icon-container';
        copyIconContainer.onclick = copyBitcoinAddress;
        copyIconContainer.innerHTML = `
            <svg class="copy-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor"/>
            </svg>
        `;
        
        addressValueWrapper.appendChild(addressValue);
        addressValueWrapper.appendChild(copyIconContainer);
        bitcoinAddressDisplay.appendChild(addressLabel);
        bitcoinAddressDisplay.appendChild(addressValueWrapper);
        
        // Create QR code display section
        const bitcoinQrDisplay = document.createElement('div');
        bitcoinQrDisplay.className = 'qr-display';
        bitcoinQrDisplay.innerHTML = `
            <div id="bitcoin-qr"></div>
            <div class="qr-label">Escanea con tu wallet Onchain</div>
        `;
        
        // Create a wrapper to group Bitcoin address and QR code together
        // This ensures they stay together when the flex container wraps
        const bitcoinGroup = document.createElement('div');
        bitcoinGroup.className = 'bitcoin-donation-group';
        bitcoinGroup.style.display = 'flex';
        bitcoinGroup.style.gap = '40px';
        bitcoinGroup.style.alignItems = 'flex-start';
        bitcoinGroup.style.flexWrap = 'wrap';
        bitcoinGroup.style.width = '100%';
        bitcoinGroup.style.flexBasis = '100%';
        
        bitcoinGroup.appendChild(bitcoinAddressDisplay);
        bitcoinGroup.appendChild(bitcoinQrDisplay);
        
        // Insert Bitcoin group after Lightning sections
        donationDisplay.appendChild(bitcoinGroup);
        
        // Generate QR code for Bitcoin address
        function tryGenerateBitcoinQR() {
            if (typeof QRCode !== 'undefined' && address) {
                generateQRCode('bitcoin-qr', address);
            } else if (address) {
                // Retry after a short delay if library isn't loaded yet
                setTimeout(tryGenerateBitcoinQR, 100);
            }
        }
        
        // Try immediately, and also on window load
        tryGenerateBitcoinQR();
        window.addEventListener('load', tryGenerateBitcoinQR);
        
    } catch (error) {
        // File doesn't exist or error reading it, don't add Bitcoin section
        console.log('Bitcoin address file not found or error reading it:', error);
    }
}

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

