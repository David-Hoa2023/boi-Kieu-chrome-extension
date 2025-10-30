const docId = "1-Ohm7sdMPAwsudbtz2TXVbo9Tr1yrE_9";

async function getQuotesFromGoogleDoc(docId) {
  const url = `https://docs.google.com/document/d/${docId}/export?format=txt`;
  try {
    const res = await fetch(url);
    const text = await res.text();
    const quotes = text.split(/\n+/).filter(q => q.trim().length > 0);
    return quotes;
  } catch (err) {
    console.error("Failed to fetch quotes:", err);
    return ["Stay strong. You're doing great!"];
  }
}

async function getRandomQuote() {
  const quotes = await getQuotesFromGoogleDoc(docId);
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

async function sendQuote() {
  const quote = await getRandomQuote();
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png", // optional, add icon.png to your folder
    title: "Quote of the Moment",
    message: quote
  });
}

function scheduleQuote() {
  chrome.storage.local.get("quoteInterval", (data) => {
    const interval = data.quoteInterval || 5;
    setInterval(sendQuote, interval * 60 * 1000);
  });
}

scheduleQuote();
