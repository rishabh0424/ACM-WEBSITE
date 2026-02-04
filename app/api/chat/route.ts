import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();
    
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { response: 'API key not configured. Please add GEMINI_API_KEY to .env.local' },
        { status: 200 }
      );
    }

    const systemContext = `You are a helpful assistant for an ACM Student Chapter. Help students learn about ACM activities, events, technical domains (AI/ML, Web Dev, Cybersecurity), how to join, and membership benefits. Be friendly and concise.`;

    const contents = [
      { role: 'user', parts: [{ text: systemContext }] },
      { role: 'model', parts: [{ text: 'I understand. I\'ll help students learn about the ACM chapter.' }] },
      ...history.filter((msg: any) => msg.role && msg.content).slice(-6).map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      return NextResponse.json({ response: `API Error: ${errorData.error?.message || 'Unknown error'}` });
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I couldn\'t generate a response. Please try again.';

    return NextResponse.json({ response: aiResponse });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json({ response: `Error: ${error.message}` });
  }
}
