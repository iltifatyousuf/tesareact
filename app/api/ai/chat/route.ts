// app/api/ai/chat/route.ts - FIXED VERSION (No Build Errors)
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string()
  })),
  stream: z.boolean().optional().default(false)
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, stream } = chatSchema.parse(body)

    // Check if OpenAI is available
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'demo-key') {
      // Return mock response for demo
      const mockResponse = generateMockResponse(messages[messages.length - 1]?.content || '')
      
      if (stream) {
        return new NextResponse(
          createMockStream(mockResponse),
          {
            headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
            }
          }
        )
      } else {
        return NextResponse.json({ 
          message: mockResponse,
          timestamp: new Date().toISOString(),
          model: 'tesareact-demo',
          usage: { prompt_tokens: 10, completion_tokens: 50, total_tokens: 60 }
        })
      }
    }

    // If OpenAI key exists, use real OpenAI API
    try {
      const { OpenAI } = await import('openai')
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      })

      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are TesaReact AI, an intelligent assistant specialized in document processing, analysis, translation, and business insights. Be helpful, concise, and professional.'
          },
          ...messages
        ],
        stream: false, // Simplified - no streaming for now
        max_tokens: 1500,
        temperature: 0.7
      })

      return NextResponse.json({
        message: completion.choices[0]?.message?.content || 'No response generated',
        timestamp: new Date().toISOString(),
        model: completion.model,
        usage: completion.usage
      })
    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError)
      // Fallback to mock response
      return NextResponse.json({
        message: generateMockResponse(messages[messages.length - 1]?.content || ''),
        timestamp: new Date().toISOString(),
        model: 'tesareact-fallback',
        usage: { prompt_tokens: 10, completion_tokens: 50, total_tokens: 60 }
      })
    }
  } catch (error) {
    console.error('Chat API error:', error)
    
    // Fallback to mock response
    const mockResponse = "I'm here to help you with document processing, translation, and analysis. How can I assist you today?"
    
    return NextResponse.json(
      { 
        message: mockResponse,
        timestamp: new Date().toISOString(),
        model: 'tesareact-error-fallback',
        error: 'API temporarily unavailable'
      },
      { status: 200 }
    )
  }
}

function generateMockResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()
  
  if (lowerMessage.includes('translate')) {
    return "🌍 I can help you translate documents into over 100 languages with context-aware accuracy! Upload your file or paste the text you'd like translated. I support:\n\n• PDF, DOCX, TXT files\n• Real-time translation\n• Professional quality\n• Bulk processing\n\nWhat language would you like to translate to?"
  }
  
  if (lowerMessage.includes('analyze') || lowerMessage.includes('analysis')) {
    return "📊 I can provide comprehensive document analysis including:\n\n• **Key insights extraction** - Find the most important points\n• **Sentiment analysis** - Understand emotional tone\n• **Topic modeling** - Identify main themes\n• **Summary generation** - Create concise overviews\n• **Data visualization** - Charts and graphs\n\nPlease upload your document or describe what type of analysis you need!"
  }
  
  if (lowerMessage.includes('summarize') || lowerMessage.includes('summary')) {
    return "📝 I excel at creating intelligent summaries! I can:\n\n• **Extract key points** from long documents\n• **Create executive summaries** for business reports\n• **Generate abstracts** for research papers\n• **Highlight action items** from meeting notes\n• **Condense information** while preserving meaning\n\nUpload your document and I'll provide a concise, actionable summary!"
  }
  
  if (lowerMessage.includes('document') || lowerMessage.includes('pdf')) {
    return "📄 I'm your document processing expert! I can handle:\n\n• **PDF files** - Extract text and analyze content\n• **Word documents** - Process DOCX files seamlessly\n• **Images** - OCR text extraction from photos\n• **Spreadsheets** - Analyze data and create insights\n• **Text files** - Process any plain text content\n\n**My superpowers:**\n✨ Multi-language support\n⚡ Lightning-fast processing\n🎯 Accurate analysis\n🔒 Secure handling\n\nWhat would you like to do with your document?"
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
    return "🚀 **Welcome to TesaReact AI!** I'm your intelligent document processing assistant. Here's what I can do:\n\n**🔥 Core Features:**\n• **Document Analysis** - Deep insights from any file\n• **Multi-language Translation** - 100+ languages supported\n• **Smart Summarization** - Key points extraction\n• **Data Visualization** - Charts and graphs\n• **OCR Processing** - Text from images\n\n**💼 Business Solutions:**\n• Contract analysis\n• Report generation\n• Meeting transcription\n• Research assistance\n• Content creation\n\n**🎯 Just ask me to:**\n\"Analyze this document\", \"Translate to Spanish\", \"Summarize key points\", or \"Create a chart from this data\"\n\nHow can I help you today?"
  }
  
  return "🦄 **Hello! I'm TesaReact AI** - your premium document intelligence assistant!\n\n**🌟 I'm here to help you with:**\n• 📊 Document analysis and insights\n• 🌍 Multi-language translation (100+ languages)\n• 📝 Content summarization and extraction\n• 📈 Data visualization and reporting\n• 🔍 Business intelligence from documents\n\n**💡 Pro tip:** Try saying something like:\n• \"Analyze this financial report\"\n• \"Translate this to French\"\n• \"Summarize the key points\"\n• \"Create insights from this data\"\n\nWhat would you like to accomplish today? I'm ready to make your documents work smarter! ⚡"
}

function createMockStream(response: string): ReadableStream {
  const encoder = new TextEncoder()
  const words = response.split(' ')
  let index = 0
  
  return new ReadableStream({
    start(controller) {
      const interval = setInterval(() => {
        if (index < words.length) {
          const word = words[index] + (index < words.length - 1 ? ' ' : '')
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ content: word })}\n\n`)
          )
          index++
        } else {
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
          clearInterval(interval)
        }
      }, 50) // Simulate typing speed
    }
  })
}
