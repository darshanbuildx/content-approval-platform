import OpenAI from 'openai';
import { Platform, AssistantResponse } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const ASSISTANT_IDS = {
  Twitter: 'asst_twitter',
  Instagram: 'asst_instagram',
  LinkedIn: 'asst_linkedin',
  Reddit: 'asst_reddit',
  YouTube: 'asst_youtube',
  Skool: 'asst_skool'
};

export async function analyzeContent(content: string, platform: Platform): Promise<AssistantResponse> {
  try {
    const thread = await openai.beta.threads.create();
    
    const prompt = platform === 'Skool' 
      ? `Please analyze this educational content for Skool.com: ${content}`
      : `Please analyze this ${platform} content: ${content}`;
    
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: prompt
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_IDS[platform]
    });

    // Poll for completion
    let response = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    while (response.status === 'in_progress' || response.status === 'queued') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      response = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    const messages = await openai.beta.threads.messages.list(thread.id);
    const assistantMessage = messages.data[0].content[0];

    if (assistantMessage.type !== 'text') {
      throw new Error('Unexpected response format');
    }

    // Parse the assistant's response
    const analysis = JSON.parse(assistantMessage.text.value);
    
    return {
      suggestions: analysis.suggestions,
      improvedContent: analysis.improvedContent,
      analysis: {
        tone: analysis.tone,
        engagement: analysis.engagement,
        compliance: analysis.compliance
      }
    };
  } catch (error) {
    console.error('Error analyzing content:', error);
    throw error;
  }
}
