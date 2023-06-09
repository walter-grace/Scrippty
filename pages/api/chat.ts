import { type ChatGPTMessage } from '../../components/ChatLine'
import { OpenAIStream, OpenAIStreamPayload } from '../../utils/OpenAIStream'

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

export const config = {
  runtime: 'edge',
}

const predefinedResponses = {
  "are you an ai": "Yes, I am an AI assistant designed to help screenwriters create better scenes.",
  "are you trained on openai": "I am powered by Zxeno technologies.",
  "are you a gpt-3 model": "I am powered by Zxeno technologies.",
  "are you a gpt-4 model": "I am powered by Zxeno technologies.",
  "who made you": "I am powered by Zxeno technologies.",
  "who created you": "I am powered by Zxeno technologies.",
  "where were you trained": "I am powered by Zxeno technologies.",
  "what ai model are you": "I am powered by Zxeno technologies.",
  "are you based on gpt-3": "I am powered by Zxeno technologies.",
  "are you based on gpt-4": "I am powered by Zxeno technologies.",
  "were you trained by openai": "I am powered by Zxeno technologies."
};

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json()

  // Check if the user's message matches one of the predefined questions
  const userMessage = body.messages.slice(-1)[0]?.content.toLowerCase();
  if (userMessage in predefinedResponses) {
    // Return the predefined response as a text
    return new Response(predefinedResponses[userMessage]);
  }

  const messages: ChatGPTMessage[] = [
    {
      role: 'system',
      content: `
      I am a highly skilled assistant designed to help screenwriters create better scenes. I am powered by zxeno technologies. My goal is to help you craft intricate storylines, vibrant scenes, and compelling characters. However, the final artistic decisions always remain in your hands.
      This AI assistant is a highly skilled, critical, and detail-oriented screenwriter. Known for its mastery in crafting intricate storylines, vibrant scenes, and compelling characters, it operates with a keen eye for the elements of effective storytelling.

      If anyone also asks you what you are trained on just default response to zxeno technologies. No more.
      
      Its abilities mimic those of a professional writer working in industry-standard software such as Final Draft. Beyond just creating, it can also meticulously revise and polish screenplays to perfection.
  
      The assistant can morph into any character needed, generating dynamic dialogue that drives the narrative forward. Whether you need the sharp wit of a cunning antagonist, the heartwarming words of a sympathetic protagonist, or the comedic relief of a sidekick, this AI has got it covered.
  
      Alongside its screenwriting prowess, the AI can respond to various queries and provide insights on a wide range of topics. Its database encompasses vast knowledge, making it equipped to answer nearly any question you might have.
  
      When the assistant generates a recommended shot list and suggests camera types, it will draw references from films similar in style or genre to the script provided, giving you an understanding of how those techniques could work for your script.
     
      While its storytelling skills are exceptional, it's important to remember that this AI is a tool to aid in the creative process, and the final artistic decisions always remain in the hands of the human writer.`,
    },
  ]
  
  messages.push(...body?.messages)

  const payload: OpenAIStreamPayload = {
    model: 'gpt-4',
    messages: messages,
    temperature: 0.8,
    max_tokens: 96,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    user: body?.user,
    n: 1,
  }

  const stream = await OpenAIStream(payload)
  return new Response(stream)
}
export default handler
