document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById("save");
    const boiKieuButton = document.getElementById("boiKieu");
    const statusDisplay = document.getElementById("status");
    const fortuneText = document.getElementById("fortuneText");
    const docIdInput = document.getElementById("docId");
    const radioWrappers = document.querySelectorAll('.radio-button-wrapper');
    
    // Add click sound effect simulation (visual feedback)
    function simulateClickEffect(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 100);
    }
    
    // Radio button interactions
    radioWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', function() {
            simulateClickEffect(this);
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Update status with selected interval
            const interval = radio.value;
            updateStatus(`⏰ ${interval} MINUTE INTERVAL SELECTED`);
        });
    });
    
    // Save button functionality
    saveButton.addEventListener("click", function() {
        simulateClickEffect(this);
        
        const interval = document.querySelector('input[name="interval"]:checked').value;
        const docId = docIdInput.value.trim();
        
        // Show saving status
        updateStatus("💾 SAVING SETTINGS...");
        saveButton.textContent = "⏳ SAVING...";
        saveButton.disabled = true;
        
        // Save to chrome storage
        const settings = { quoteInterval: parseInt(interval) };
        if (docId) {
            settings.docId = docId;
        }
        
        chrome.storage.local.set(settings, function() {
            // Success feedback
            setTimeout(() => {
                updateStatus(`✅ SETTINGS SAVED! ${interval} MIN INTERVAL ACTIVE`);
                saveButton.textContent = "💾 SAVE SETTINGS";
                saveButton.disabled = false;
                
                // Reset status after 3 seconds
                setTimeout(() => {
                    updateStatus("◆ READY TO SEND INSPIRATION ◆");
                }, 3000);
            }, 500);
        });
    });
    
    // Bói Kiều button functionality
    boiKieuButton.addEventListener("click", function() {
        simulateClickEffect(this);
        
        const docId = docIdInput.value.trim();
        
        if (!docId) {
            // Use default quotes if no doc ID provided
            showDefaultFortune();
            return;
        }
        
        // Show loading state
        fortuneText.textContent = "🔮 Consulting the oracle...";
        fortuneText.classList.add('loading');
        boiKieuButton.textContent = "🌟 DIVINING...";
        boiKieuButton.disabled = true;
        
        // Fetch quote from Google Doc
        getFortuneFromDoc(docId);
    });
    
    // Get fortune from Google Doc
    async function getFortuneFromDoc(docId) {
        try {
            const url = `https://docs.google.com/document/d/${docId}/export?format=txt`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Failed to fetch document');
            }
            
            const text = await response.text();
            const quotes = text.split(/\n+/).filter(q => q.trim().length > 0);
            
            if (quotes.length === 0) {
                throw new Error('No quotes found in document');
            }
            
            // Select random quote
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const fortune = quotes[randomIndex].trim();
            
            // Display fortune with mystical effect
            setTimeout(() => {
                displayFortune(fortune);
            }, 1500);
            
        } catch (error) {
            console.error('Error fetching fortune:', error);
            setTimeout(() => {
                showDefaultFortune();
            }, 1000);
        }
    }
    
    // Display fortune with animation
    function displayFortune(fortune) {
        fortuneText.classList.remove('loading');
        
        // Mystical reveal animation
        let displayText = '';
        const chars = fortune.split('');
        let index = 0;
        
        const revealInterval = setInterval(() => {
            if (index < chars.length) {
                displayText += chars[index];
                fortuneText.textContent = displayText;
                index++;
            } else {
                clearInterval(revealInterval);
                
                // Add mystical glow effect
                fortuneText.style.color = '#ff00ff';
                fortuneText.style.textShadow = '0 0 10px rgba(255,0,255,0.8), 0 0 20px rgba(0,255,255,0.6)';
                setTimeout(() => {
                    fortuneText.style.color = '#2a2a2a';
                    fortuneText.style.textShadow = '0 1px 3px rgba(255,255,255,0.9)';
                }, 2000);
            }
        }, 50);
        
        // Reset button
        boiKieuButton.textContent = "🔮 BÓI KIỀU";
        boiKieuButton.disabled = false;
        
        // Update status
        updateStatus("🌸 FORTUNE REVEALED 🌸");
    }
    
    // Show default fortune when no doc is available
    function showDefaultFortune() {
        const defaultFortunes = [
            "🌸 Trăm năm trong cõi người ta, Chữ tài chữ mệnh khéo là ghét nhau.",
            "🌸 Trời xanh quen thói má hồng, Ghen anh túc hạ ghen ta túc trung.",
            "🌸 Cỏ non xanh tận chân trời, Cành lá um tùm bóng rợp đường long.",
            "🌸 Bóng xế tà rọi ngả dâu, Chim nghiêng cánh nhỏ: bóng chiều sa trường.",
            "🌸 Lưng chừng núi đá tập tập, Mây quanh vách chơt vắt nát sương long."
        ];
        
        const randomFortune = defaultFortunes[Math.floor(Math.random() * defaultFortunes.length)];
        
        fortuneText.classList.remove('loading');
        fortuneText.textContent = "📜 Using ancient wisdom...";
        
        setTimeout(() => {
            displayFortune(randomFortune.replace('🌸 ', ''));
        }, 1000);
    }
    
    // Update status display with animation
    function updateStatus(message) {
        statusDisplay.style.opacity = '0';
        statusDisplay.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            statusDisplay.textContent = message;
            statusDisplay.style.opacity = '1';
            statusDisplay.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Load current settings on popup open
    chrome.storage.local.get(['quoteInterval', 'docId'], function(result) {
        if (result.quoteInterval) {
            const radio = document.querySelector(`input[name="interval"][value="${result.quoteInterval}"]`);
            if (radio) {
                radio.checked = true;
                updateStatus(`⚡ ${result.quoteInterval} MIN INTERVAL ACTIVE`);
            }
        }
        
        if (result.docId) {
            docIdInput.value = result.docId;
        }
        
        // Add some random visual effects on load
        setTimeout(() => {
            const bars = document.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.transform = 'scaleY(2)';
                    setTimeout(() => {
                        bar.style.transform = '';
                    }, 200);
                }, index * 50);
            });
        }, 300);
    });
    
    // Add hover effects to visualizer bars
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(to top, #00ff00, #ffff00)';
            this.style.boxShadow = '0 0 20px rgba(0,255,0,1)';
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.boxShadow = '';
        });
    });
    
    // Random status messages for extra Winamp flavor
    const randomMessages = [
        "◆ READY TO SEND INSPIRATION ◆",
        "🎵 QUOTES SYNCHRONIZED",
        "🌈 POSITIVITY MODE ACTIVE",
        "⚡ INSPIRATION STREAMING",
        "🎯 MOTIVATION LOCKED",
        "💫 WISDOM TRANSMISSION READY",
        "🔮 FORTUNE TELLER ONLINE",
        "🌸 KIỀU WISDOM AWAITING"
    ];
    
    // Change status randomly every 10 seconds
    setInterval(() => {
        if (statusDisplay.textContent.includes("READY") || 
            statusDisplay.textContent.includes("SYNCHRONIZED") || 
            statusDisplay.textContent.includes("ACTIVE") ||
            statusDisplay.textContent.includes("ONLINE") ||
            statusDisplay.textContent.includes("AWAITING")) {
            const randomMsg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
            updateStatus(randomMsg);
        }
    }, 10000);
});
