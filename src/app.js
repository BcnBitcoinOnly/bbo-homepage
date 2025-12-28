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
}

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

