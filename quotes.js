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

async function getRandomQuote(docId) {
  const quotes = await getQuotesFromGoogleDoc(docId);
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}
