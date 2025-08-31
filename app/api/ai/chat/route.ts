import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { z } from "zod";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "demo-key",
});

// Input schema validation
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

    // Fallback if no real API key
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "demo-key") {
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
      }

      return NextResponse.json({ message: mockResponse });
    }

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // ✅ lighter + faster model
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

    // Stream response
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
    }

    // Non-stream response
    return NextResponse.json({
      message:
        completion.choices[0]?.message?.content || "No response generated",
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        message:
          "I'm here to help you with document processing, translation, and analysis. How can I assist you today?",
      },
      { status: 200 }
    );
  }
}

// ---------- Helpers ----------

function generateMockResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes("translate")) {
    return "I can help you translate documents into over 100 languages. Upload your file or paste text to get started.";
  }

  if (lowerMessage.includes("analyze") || lowerMessage.includes("analysis")) {
    return "I can provide document analysis: insights, sentiment, topics, summaries, and visualizations. Upload your file to begin.";
  }

  if (lowerMessage.includes("summarize") || lowerMessage.includes("summary")) {
    return "I can summarize your documents, highlighting key points. Upload your file and I'll create a tailored summary.";
  }

  if (lowerMessage.includes("document") || lowerMessage.includes("pdf")) {
    return "I can process PDFs, DOCX, TXT, and images. Services include OCR, translation, content insights, and data extraction.";
  }

  return "I'm TesaReact AI. I can help with document analysis, translation, summarization, and insights. What would you like me to do?";
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
      }, 50);
    },
  });
}

