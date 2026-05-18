const OpenAI = require('openai');

exports.recommend = async (req, res) => {
  try {
    const { employees } = req.body;

    if (!employees || employees.length === 0) {
      return res.status(400).json({ message: 'No employee data provided' });
    }

    if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
      return res.status(500).json({ message: 'OpenRouter API key is not configured.' });
    }

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const prompt = `
      You are an AI HR assistant. Given the following list of employees, provide a JSON response containing:
      1. Promotion recommendations for high-performing employees.
      2. Employee rankings based on performance and experience.
      3. Training suggestions for low-scoring employees or those with missing/limited skills.
      4. General feedback for each employee.
      
      Here is the employee data:
      ${JSON.stringify(employees, null, 2)}
      
      Respond STRICTLY with valid JSON matching this schema:
      {
        "rankings": [{ "name": "string", "score": "number", "rank": "number" }],
        "promotions": [{ "name": "string", "reason": "string" }],
        "training": [{ "name": "string", "suggestions": ["string"] }],
        "feedback": [{ "name": "string", "message": "string" }]
      }
    `;

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-120b:free", // Use a generic available model or a specific one like "google/gemini-2.5-pro"
      messages: [
        { role: "system", content: "You are a helpful HR AI assistant that outputs only valid JSON." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content);
    res.json(result);

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: 'Error generating AI recommendations', error: error.message });
  }
};
