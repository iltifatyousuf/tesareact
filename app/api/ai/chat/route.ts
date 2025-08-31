import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "demo-key",
});

const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string(),
    })
  ),
  stream: z.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, stream } = chatSchema.parse(body);

    // Check if OpenAI is available
    if (
      !process.env.OPENAI_API_KEY ||
      process.env.OPENAI_API_KEY === "demo-key"
    ) {
      // Return mock response for demo
      const mockResponse = generateMockResponse(
        messages[messages.length - 1]?.content || ""
      );

      if (stream) {
        return new NextResponse(createMockStream(mockResponse), {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        });
      } else {
        return NextResponse.json({ message: mockResponse });
      }
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are TesaReact AI, an intelligent assistant specialized in document processing, analysis, translation, and business insights. Be helpful, concise, and professional.",
        },
        ...messages,
      ],
      stream,
      max_tokens: 1500,
      temperature: 0.7,
    });

    if (stream) {
      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of completion) {
              const content = chunk.choices[0]?.delta?.content || "";
              if (content) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                );
              }
            }
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          } catch (error) {
            controller.error(error);
          } finally {
            controller.close();
          }
        },
      });

      return new NextResponse(readable, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    } else {
      return NextResponse.json({
        message:
          completion.choices[0]?.message?.content || "No response generated",
      });
    }
  } catch (error) {
    console.error("Chat API error:", error);

    // Fallback to mock response
    const mockResponse =
      "I'm here to help you with document processing, translation, and analysis. How can I assist you today?";

    return NextResponse.json({ message: mockResponse }, { status: 200 });
  }
}

function generateMockResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes("translate")) {
    return "I can help you translate documents into over 100 languages with context-aware accuracy. Would you like me to translate a specific document or text for you? Just upload the file or paste the text you'd like translated.";
  }

  if (lowerMessage.includes("analyze") || lowerMessage.includes("analysis")) {
    return "I can provide comprehensive document analysis including:\n\n• Key insights extraction\n• Sentiment analysis\n• Topic modeling\n• Summary generation\n• Data visualization\n\nPlease upload your document or describe what type of analysis you need.";
  }

  if (lowerMessage.includes("summarize") || lowerMessage.includes("summary")) {
    return "I can create intelligent summaries of your documents, highlighting the most important points and key takeaways. Upload your document and I'll provide a concise, actionable summary tailored to your needs.";
  }

  if (lowerMessage.includes("document") || lowerMessage.includes("pdf")) {
    return "I can process various document formats including PDF, DOCX, TXT, and images. My capabilities include:\n\n• Text extraction and OCR\n• Content analysis and insights\n• Translation services\n• Data extraction\n• Format conversion\n\nWhat would you like to do with your document?";
  }

  return "I'm TesaReact AI, your intelligent document processing assistant. I can help you with:\n\n• Document analysis and insights\n• Multi-language translation\n• Content summarization\n• Data extraction and visualization\n• Business intelligence from documents\n\nHow can I assist you today?";
}

function createMockStream(response: string): ReadableStream {
  const encoder = new TextEncoder();
  const words = response.split(" ");
  let index = 0;

  return new ReadableStream({
    start(controller) {
      const interval = setInterval(() => {
        if (index < words.length) {
          const word = words[index] + (index < words.length - 1 ? " " : "");
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ content: word })}\n\n`)
          );
          index++;
        } else {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
          clearInterval(interval);
        }
      }, 50); // Simulate typing speed
    },
  });
}
