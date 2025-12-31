// ============================================
// Krishi Mitra AI Chatbot
// Powered by Puter AI (Free Gemini) - Agriculture Assistant
// ============================================

// Chat state
let isChatOpen = false;
let chatHistory = [];
let isTyping = false;

// Chatbot Configuration
const CHATBOT_CONFIG = {
    systemPrompt: `You are "Krishi Mitra AI" (कृषि मित्र), a friendly and knowledgeable Indian agricultural assistant. You help farmers with:

1. **Crop Selection**: Recommend crops based on season, soil, climate, and market demand
2. **Farming Practices**: Sowing, irrigation, fertilizers, organic farming
3. **Pest & Disease Management**: Identify problems and suggest solutions
4. **Weather Advisory**: Farming tips based on weather conditions
5. **Market Information**: Mandi prices, MSP, selling strategies
6. **Government Schemes**: PM-KISAN, crop insurance, subsidies
7. **Soil Health**: Testing, nutrients, soil improvement

IMPORTANT GUIDELINES:
- Respond in the same language the farmer uses (Hindi or English)
- Use simple, easy-to-understand language
- Give practical, actionable advice
- Include specific measurements (kg/acre, liters, etc.)
- Mention approximate costs in Indian Rupees (₹)
- Be encouraging and supportive
- If unsure, recommend consulting local Krishi Vigyan Kendra (KVK)

Format responses with:
- Use bullet points for lists
- Bold important terms with **text**
- Include emojis for visual appeal 🌾🌱💧🌤️

Keep responses concise but helpful. Current context: Farmer is using Krishi Mitra dashboard in India.`
};

// Toggle chatbot visibility
function toggleChatbot() {
    const chatWindow = document.getElementById('chatWindow');
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    
    isChatOpen = !isChatOpen;
    
    if (isChatOpen) {
        chatWindow.classList.remove('hidden');
        chatToggleBtn.classList.add('active');
        document.getElementById('chatInput').focus();
    } else {
        chatWindow.classList.add('hidden');
        chatToggleBtn.classList.remove('active');
    }
}

// Send message on Enter key
function handleChatKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendChatMessage();
    }
}

// Send quick question
function sendQuickQuestion(question) {
    document.getElementById('chatInput').value = question;
    sendChatMessage();
}

// Send chat message
async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message || isTyping) return;
    
    // Clear input
    input.value = '';
    
    // Add user message to chat
    addMessageToChat('user', message);
    
    // Add to history
    chatHistory.push({ role: 'user', content: message });
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Get AI response
        const response = await getAIResponse(message);
        
        // Remove typing indicator
        hideTypingIndicator();
        
        // Add bot response
        addMessageToChat('bot', response);
        
        // Add to history
        chatHistory.push({ role: 'assistant', content: response });
        
    } catch (error) {
        hideTypingIndicator();
        addMessageToChat('bot', getErrorMessage(error));
    }
}

// Get AI response using Puter AI (Free Gemini)
async function getAIResponse(userMessage) {
    // Check if Puter is available
    if (typeof puter === 'undefined') {
        console.log('Puter not loaded, using fallback');
        return getFallbackResponse(userMessage);
    }
    
    // Build conversation context
    const conversationHistory = chatHistory.slice(-6).map(msg => 
        `${msg.role === 'user' ? 'Farmer' : 'Krishi Mitra'}: ${msg.content}`
    ).join('\n');
    
    const fullPrompt = `${CHATBOT_CONFIG.systemPrompt}

Previous conversation:
${conversationHistory}

Farmer's question: ${userMessage}

Please provide helpful advice:`;
    
    try {
        // Use Puter AI with Gemini
        const response = await puter.ai.chat(fullPrompt);
        return response || getFallbackResponse(userMessage);
        
    } catch (error) {
        console.error('Puter AI Error:', error);
        return getFallbackResponse(userMessage);
    }
}

// Fallback responses when API is not available
function getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Crop recommendations
    if (lowerMessage.includes('crop') || lowerMessage.includes('grow') || lowerMessage.includes('फसल') || lowerMessage.includes('उगाना')) {
        return `🌾 **फसल चयन सुझाव / Crop Selection Tips:**

Based on current season, here are some profitable options:

**रबी सीजन (Nov-Apr):**
• गेहूं (Wheat) - MSP ₹2,275/क्विंटल
• सरसों (Mustard) - High demand, ₹5,500/क्विंटल
• चना (Chickpea) - Good profit margins
• आलू (Potato) - Quick returns

**खरीफ सीजन (Jun-Oct):**
• धान (Paddy) - Stable market
• सोयाबीन (Soybean) - Export demand
• मक्का (Maize) - Processing industry demand

💡 **Pro Tip:** Check your soil type and water availability before selecting crops.

🔗 Use our **Crop Recommendation** section for personalized suggestions based on your location!`;
    }
    
    // Weather related
    if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('मौसम') || lowerMessage.includes('बारिश')) {
        return `🌤️ **मौसम आधारित सलाह / Weather Advisory:**

**General Guidelines:**
• 🌧️ **Before Rain:** Complete spraying, harvesting of ripe crops
• ☀️ **Sunny Days:** Best for sowing, fertilizer application
• 🌡️ **High Temperature:** Increase irrigation frequency
• ❄️ **Frost Alert:** Cover sensitive crops with plastic sheets

📱 Check our **Weather Advisory** section for real-time forecasts for your area!

💡 **Tip:** Install weather apps like Meghdoot or Kisan Suvidha for alerts.`;
    }
    
    // Pest and disease
    if (lowerMessage.includes('pest') || lowerMessage.includes('disease') || lowerMessage.includes('कीट') || lowerMessage.includes('रोग') || lowerMessage.includes('bug') || lowerMessage.includes('insect')) {
        return `🐛 **कीट एवं रोग प्रबंधन / Pest & Disease Management:**

**सामान्य समाधान / Common Solutions:**

1. **Aphids (माहू):**
   • Neem oil spray (5ml/liter)
   • Imidacloprid 17.8 SL

2. **Stem Borer (तना छेदक):**
   • Carbofuran granules
   • Light traps installation

3. **Leaf Spot (पत्ती धब्बा):**
   • Mancozeb spray (2.5g/liter)
   • Remove infected leaves

🌿 **जैविक उपाय / Organic Methods:**
• नीम का तेल (Neem oil)
• लहसुन-मिर्च स्प्रे
• जैविक कीटनाशक

📞 Contact your nearest **Krishi Vigyan Kendra (KVK)** for specific diagnosis.`;
    }
    
    // Price related
    if (lowerMessage.includes('price') || lowerMessage.includes('mandi') || lowerMessage.includes('भाव') || lowerMessage.includes('मंडी') || lowerMessage.includes('msp')) {
        return `💰 **मंडी भाव जानकारी / Market Price Info:**

**Current MSP (2024-25):**
• गेहूं (Wheat): ₹2,275/क्विंटल
• धान (Paddy): ₹2,300/क्विंटल
• चना (Gram): ₹5,440/क्विंटल
• सरसों (Mustard): ₹5,650/क्विंटल
• मक्का (Maize): ₹2,090/क्विंटल

📈 **बेहतर दाम पाने के टिप्स:**
1. Sell through **e-NAM** portal
2. Check multiple mandis before selling
3. Grade your produce properly
4. Store if prices are low (warehouse receipt)

🔗 Visit **agmarknet.gov.in** for live mandi prices.`;
    }
    
    // Fertilizer
    if (lowerMessage.includes('fertilizer') || lowerMessage.includes('खाद') || lowerMessage.includes('urea') || lowerMessage.includes('यूरिया') || lowerMessage.includes('dap')) {
        return `🧪 **उर्वरक प्रबंधन / Fertilizer Management:**

**Recommended NPK for Common Crops:**

| Crop | N | P | K | (kg/hectare) |
|------|---|---|---|
| Wheat | 120 | 60 | 40 |
| Rice | 100 | 50 | 50 |
| Maize | 120 | 60 | 40 |

**Application Tips:**
• Apply Urea in 2-3 splits
• DAP at sowing time
• Potash at last irrigation

🌿 **जैविक खाद / Organic Options:**
• गोबर की खाद: 10-15 टन/हेक्टेयर
• वर्मीकम्पोस्ट: 5 टन/हेक्टेयर
• हरी खाद (Green Manure)

💡 Get soil tested at **Soil Testing Lab** for exact recommendations.`;
    }
    
    // Government schemes
    if (lowerMessage.includes('scheme') || lowerMessage.includes('yojana') || lowerMessage.includes('योजना') || lowerMessage.includes('subsidy') || lowerMessage.includes('pm kisan')) {
        return `🏛️ **सरकारी योजनाएं / Government Schemes:**

**प्रमुख योजनाएं:**

1. **PM-KISAN:**
   • ₹6,000/year in 3 installments
   • Register at pmkisan.gov.in

2. **PM Fasal Bima Yojana:**
   • Crop insurance at 2% premium
   • Apply through CSC or bank

3. **Kisan Credit Card:**
   • Loan up to ₹3 lakh @ 4% interest
   • Apply at any bank

4. **Soil Health Card:**
   • Free soil testing
   • Fertilizer recommendations

5. **PM Krishi Sinchai Yojana:**
   • Drip irrigation subsidy (55-75%)

📞 Helpline: **1800-180-1551** (Toll-free)`;
    }
    
    // Default response
    return `🙏 **नमस्ते किसान भाई!**

I understand you're asking about: "${message}"

Here's what I can help you with:

🌾 **Crop Selection** - Best crops for your area
🌤️ **Weather Advice** - Farming tips based on weather
🐛 **Pest Control** - Disease identification & treatment
💰 **Market Prices** - MSP & mandi rates
🧪 **Fertilizers** - Soil health & nutrients
🏛️ **Govt Schemes** - Subsidies & benefits

**Try asking:**
• "Which crop should I grow in Rabi season?"
• "How to control aphids in mustard?"
• "What is current wheat MSP?"

Or use the **quick question buttons** below! 👇`;
}

// Add message to chat UI
function addMessageToChat(sender, content) {
    const messagesContainer = document.getElementById('chatMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const avatar = sender === 'bot' ? '🌾' : '👤';
    
    // Convert markdown-like formatting to HTML
    const formattedContent = formatMessage(content);
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">${formattedContent}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Format message with basic markdown support
function formatMessage(text) {
    return text
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Bullet points
        .replace(/^• /gm, '<li>')
        .replace(/^- /gm, '<li>')
        // Line breaks
        .replace(/\n/g, '<br>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
}

// Show typing indicator
function showTypingIndicator() {
    isTyping = true;
    const messagesContainer = document.getElementById('chatMessages');
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">🌾</div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    isTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Get error message
function getErrorMessage(error) {
    return `⚠️ **Connection Issue**

Sorry, I couldn't connect to the AI service. Please try again.

Meanwhile, here are some helpful resources:
• 📞 Kisan Call Center: **1800-180-1551**
• 🌐 agmarknet.gov.in for mandi prices
• 📱 Download Kisan Suvidha app

Error: ${error.message || 'Unknown error'}`;
}

// Initialize chatbot
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌾 Krishi Mitra AI Chatbot initialized');
    
    // Check if Puter is available
    if (typeof puter !== 'undefined') {
        console.log('✅ Puter AI (Free Gemini) loaded successfully!');
    } else {
        console.log('⚠️ Puter not loaded yet. Using fallback responses until loaded.');
    }
});

// Export functions for global access
if (typeof window !== 'undefined') {
    window.toggleChatbot = toggleChatbot;
    window.sendChatMessage = sendChatMessage;
    window.sendQuickQuestion = sendQuickQuestion;
    window.handleChatKeyPress = handleChatKeyPress;
}
