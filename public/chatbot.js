(function () {
  const scriptTag = document.currentScript;
  const ownerId = scriptTag.getAttribute("data-owner-id");
  const api_URL = "https://ai-customer-support-seven-alpha.vercel.app/api/chat";

  if (!ownerId) {
    console.error(
      "Owner ID is required. Please add data-owner-id attribute to the script tag.",
    );
    return;
  }

  const button = document.createElement("div");
  button.innerHTML = "🗨️";
  Object.assign(button.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "56px",
    height: "56px",
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: "999999",
    fontSize: "22px",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.35)",
  });
  document.body.appendChild(button);

  const box = document.createElement("div");
  Object.assign(box.style, {
    position: "fixed",
    bottom: "90px",
    right: "24px",
    width: "320px",
    height: "420px",
    backgroundColor: "#fff",
    borderRadius: "14px",
    boxShadow: "0 25px 60px rgba(0, 0, 0, 0.35)",
    zIndex: "999999",
    display: "none",
    flexDirection: "column",
    fontFamily: "Inter, system-ui, sans-serif",
  });
  box.innerHTML = `
    <div style="
        background: #000;
        color: #fff;
        padding: 12px 14px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    ">
        <span>Support Agent</span>
        <span id="chat-close" style="cursor: pointer; font-size: 16px;">✕</span>
    </div>
    <div
        id="chat-messages"
        style="flex: 1; padding: 12px; overflow-y: auto; background:#f9fafb; display: flex; flex-direction: column;">
    </div>
    <div
        style="padding: 12px; display: flex; gap: 8px; border-top: 1px solid #e5e7eb;"
    >
    <input
        id="chat-input"
        placeholder="Type a message..."
        type="text"
        style="flex: 1; padding: 8px 10px; border: 1px solid #d1d5db; outline: none; border-radius: 8px; font-size: 14px;"
    />
    <button
        id="chat-send"
        style="padding: 8px 13px; background: #000; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 14px;"
    >
    Send
    </button>
    </div>
  `;
  document.body.appendChild(box);

  button.onclick = () => {
    box.style.display = box.style.display === "none" ? "flex" : "none";
  };

  document.querySelector("#chat-close").onclick = () => {
    box.style.display = "none";
  };

  const input = document.querySelector("#chat-input");
  const messages = document.querySelector("#chat-messages");
  const sendButton = document.querySelector("#chat-send");

  function addMsg(text, isUser = false) {
    const msg = document.createElement("div");
    msg.textContent = text;
    Object.assign(msg.style, {
      backgroundColor: isUser ? "#000" : "#e5e7eb",
      color: isUser ? "#fff" : "#111",
      padding: "8px 12px",
      borderRadius: "14px",
      borderTopRightRadius: isUser ? "4px" : "14px",
      borderTopLeftRadius: isUser ? "14px" : "4px",
      fontSize: "14px",
      lineHeight: "1.4",
      maxWidth: "80%",
      alignSelf: isUser ? "flex-end" : "flex-start",
      marginBottom: "8px",
    });
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMsg(text, true);
    input.value = "";
    input.disabled = true;

    const typing = document.createElement("div");
    typing.innerHTML = "Typing...";
    Object.assign(typing.style, {
      fontSize: "12px",
      color: "#6b7280",
      marginBottom: "8px",
      alignSelf: "flex-start",
    });
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    try {
      const res = await fetch(api_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerId,
          message: text,
        }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      messages.removeChild(typing);
      addMsg(data.response);
    } catch (error) {
      messages.removeChild(typing);
      addMsg("Sorry, I'm having trouble connecting to the server.");
      console.log("Error", error);
    } finally {
      input.disabled = false;
      input.focus();
    }
  }

  sendButton.onclick = sendMessage;
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
})();