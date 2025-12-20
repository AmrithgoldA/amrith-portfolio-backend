const { crawlSite } = require("../../crawler/crawlService");
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.DEEPSEEK_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "Amrith Portfolio",
  },
});

async function chatBot(req, res) {
  try {
    console.log("🟡 chatBot API hit");

    const userMessage = req.body.message?.trim();
    console.log("📩 User message received:", userMessage);

    if (!userMessage) {
      return res.status(400).json({ reply: "Please enter a question." });
    }

    const baseUrl = "http://localhost:5173";
    console.log("🌐 Starting crawl...");
    await crawlSite(baseUrl);
    console.log("✅ Crawling completed");

    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "crawler",
      "crawled",
      "http___localhost_5173.txt"
    );
    const crawledText = fs.readFileSync(filePath, "utf-8");

    console.log("📄 Crawled text loaded. Size:", crawledText.length, "chars");

    const prompt = `
You are a helpful assistant that only answers based on the website content below.

Website Content:
"""
${crawledText}
"""

Now answer this question:
"${userMessage}"

- Only respond if the answer is found in the content.
- If the content is irrelevant or doesn't include an answer, say: "Sorry, I couldn't find an answer based on the website information."
`;

    console.log("🤖 Calling DeepSeek API...");

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [{ role: "system", content: prompt }],
    });

    const reply = completion.choices[0].message.content.trim();
    console.log("✅ DeepSeek replied:", reply);

    res.json({ reply });
  } catch (error) {
    console.error("❌ Error in chatBot:", error);
    res.status(500).json({ reply: "Something went wrong. Try again later." });
  }
}

module.exports = { chatBot };
