export function initializeChatbot() {
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");
    const chatBox = document.getElementById("chat-box");

    if (!userInput || !sendButton || !chatBox) {
        console.warn("Chatbot elements not found. Skipping initialization.");
        return;
    }

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent accidental form submission
            sendMessage();
        }
    });

    async function fetchIntroduction() {
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
            });

            const data = await response.json();
            appendMessage("bot", "Dominguez Tech Solutions AI Assistant 🤖", formatMessage(data.reply), true);
        } catch (error) {
            console.error("Error fetching AI introduction:", error);
        }
    }

    function appendMessage(type, sender, message, isTypingEffect = false) {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add(`${type}-message`);

        const senderLabel = document.createElement("span");
        senderLabel.classList.add(`${type}-label`);
        senderLabel.innerHTML = `${sender}:`;

        const messageText = document.createElement("div");
        messageText.classList.add(`${type}-text`);

        messageContainer.appendChild(senderLabel);
        messageContainer.appendChild(messageText);
        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;

        if (isTypingEffect) {
            simulateTypingEffect(message, messageText);
        } else {
            messageText.innerHTML = formatMessage(message);
        }
    }

    function simulateTypingEffect(message, element) {
        let index = 0;
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = message;
        const textContent = tempDiv.textContent || tempDiv.innerText; // Extract pure text

        function typeCharacter() {
            if (index < textContent.length) {
                element.innerHTML = formatMessage(textContent.substring(0, index + 1));
                index++;
                setTimeout(typeCharacter, 30);
            }
        }
        typeCharacter();
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        appendMessage("user", "You", message);
        userInput.value = "";

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();
            appendMessage("bot", "Dominguez Tech Solutions AI Assistant 🤖", formatMessage(data.reply), true);
        } catch (error) {
            appendMessage("error", "Error", "AI service is currently unavailable.");
        }
    }

    function formatMessage(message) {
        return message
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")  // Convert **bold** to <b>bold</b>
            .replace(/\n/g, "<br>")  // Convert new lines to <br>
            .replace(/\* (.*?)/g, "• $1")  // Convert bullet points
            .replace(/(.*?)(https?:\/\/[^\s]+)/g, '<a href="$2" target="_blank" style="color: #FFD700; text-decoration: underline;">$1</a>'); // Convert [text](url) to clickable link
    }

    fetchIntroduction();
}