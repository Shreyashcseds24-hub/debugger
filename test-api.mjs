// Test script for Gemini API model health check
const key = process.env.GEMINI_API_KEY || 'YOUR_API_KEY';
const models = ['gemini-3.8-flash', 'gemini-1.5-flash'];

for (const model of models) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Return JSON: {"status": "ok"}' }] }]
      })
    });
    console.log(`Model: ${model} -> Status: ${res.status}`);
    const body = await res.text();
    console.log(`Response: ${body.slice(0, 200)}`);
  } catch (err) {
    console.error(`Error with ${model}:`, err.message);
  }
}
