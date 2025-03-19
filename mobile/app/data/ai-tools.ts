import { AITool, AIToolCategory } from '../types/ai-tools';

// Helper functions for dynamic data generation
const generateUsageCount = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const generateRating = (min: number, max: number) => Number((Math.random() * (max - min) + min).toFixed(1));
const generateDailyUsers = (min: number, max: number) => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  return count >= 1000000 ? `${(count / 1000000).toFixed(1)}M+` : `${(count / 1000).toFixed(1)}K+`;
};

// Generate a random AI tool
const generateAITool = (
  id: string,
  name: string,
  description: string,
  category: AIToolCategory,
  iconName: string,
  features: string[],
  pricing: string,
  modelType: string,
  isPopular: boolean = false
): AITool => {
  const rating = generateRating(4.0, 5.0);
  const dailyUsers = generateDailyUsers(10000, 1000000);
  const usageCount = generateUsageCount(50000, 1000000);

  return {
    id,
    name,
    description,
    iconName,
    category,
    features,
    pricing,
    modelType,
    dailyUsers,
    isPopular,
    rating,
    usageCount,
  };
};

// Define tool categories and their tools
const chatTools = [
  generateAITool(
    'chatgpt',
    'ChatGPT',
    'Advanced AI chatbot for natural conversations and task assistance',
    AIToolCategory.CHAT,
    'chatbubble-outline',
    ['Natural language processing', 'Code generation', 'Text completion'],
    'Freemium',
    'GPT-4',
    true
  ),
  generateAITool(
    'gemini',
    'Gemini',
    'Google\'s AI model for text and image generation',
    AIToolCategory.CHAT,
    'logo-google',
    ['Advanced reasoning', 'Multimodal processing', 'Code generation'],
    'Free',
    'Gemini Pro',
    true
  ),
  generateAITool(
    'claude',
    'Claude',
    'Anthropic\'s AI assistant for complex tasks and analysis',
    AIToolCategory.CHAT,
    'analytics-outline',
    ['Text analysis', 'Research assistance', 'Writing help'],
    'Paid',
    'Claude 3',
    true
  ),
  generateAITool(
    'bard',
    'Bard',
    'Google\'s conversational AI for creative and informative responses',
    AIToolCategory.CHAT,
    'logo-google',
    ['Creative writing', 'Research', 'Code assistance'],
    'Free',
    'PaLM 2',
    true
  ),
  generateAITool(
    'character-ai',
    'Character.AI',
    'Create and chat with AI characters and personalities',
    AIToolCategory.CHAT,
    'people-outline',
    ['Character creation', 'Roleplay', 'Storytelling'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'perplexity',
    'Perplexity AI',
    'AI-powered search engine with real-time information',
    AIToolCategory.CHAT,
    'search-outline',
    ['Real-time search', 'Information synthesis', 'Source citation'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'you-com',
    'You.com',
    'AI-powered search and chat platform',
    AIToolCategory.CHAT,
    'globe-outline',
    ['Web search', 'Chat interface', 'Content generation'],
    'Free',
    'Custom',
    true
  ),
  generateAITool(
    'poe',
    'Poe',
    'Chat with multiple AI models in one place',
    AIToolCategory.CHAT,
    'chatbubbles-outline',
    ['Multiple models', 'Chat interface', 'Model comparison'],
    'Freemium',
    'Multiple',
    true
  ),
  generateAITool(
    'chatsonic',
    'ChatSonic',
    'AI writing assistant with real-time information',
    AIToolCategory.CHAT,
    'pencil-outline',
    ['Content writing', 'Real-time data', 'SEO optimization'],
    'Paid',
    'Custom',
    true
  ),
  generateAITool(
    'jasper',
    'Jasper',
    'AI content creation platform for marketing',
    AIToolCategory.CHAT,
    'megaphone-outline',
    ['Marketing copy', 'Content generation', 'SEO writing'],
    'Paid',
    'Custom',
    true
  ),
];

const imageTools = [
  generateAITool(
    'dall-e',
    'DALL-E',
    'AI system that creates realistic images and art from natural language descriptions',
    AIToolCategory.IMAGE,
    'image-outline',
    ['Image generation', 'Art creation', 'Style transfer'],
    'Paid',
    'DALL-E 3',
    true
  ),
  generateAITool(
    'midjourney',
    'Midjourney',
    'AI art generator for creating stunning visual artwork',
    AIToolCategory.IMAGE,
    'color-palette-outline',
    ['Art generation', 'Style customization', 'High resolution'],
    'Paid',
    'Custom',
    true
  ),
  generateAITool(
    'stable-diffusion',
    'Stable Diffusion',
    'Open-source image generation model for creating high-quality images',
    AIToolCategory.IMAGE,
    'images-outline',
    ['Image generation', 'Style transfer', 'Custom training'],
    'Free',
    'SDXL',
    true
  ),
  generateAITool(
    'leonardo-ai',
    'Leonardo.AI',
    'AI-powered creative suite for image generation and editing',
    AIToolCategory.IMAGE,
    'brush-outline',
    ['Image generation', 'Style transfer', 'Image editing'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'runway',
    'Runway',
    'AI-powered creative tools for video and image generation',
    AIToolCategory.IMAGE,
    'videocam-outline',
    ['Video generation', 'Image editing', 'Style transfer'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'canva-ai',
    'Canva AI',
    'AI-powered design platform with image generation',
    AIToolCategory.IMAGE,
    'color-palette-outline',
    ['Design creation', 'Image generation', 'Template design'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'adobe-firefly',
    'Adobe Firefly',
    'Adobe\'s AI creative suite for image generation',
    AIToolCategory.IMAGE,
    'logo-adobe',
    ['Image generation', 'Style transfer', 'Creative tools'],
    'Paid',
    'Custom',
    true
  ),
  generateAITool(
    'artbreeder',
    'Artbreeder',
    'AI-powered image mixing and generation platform',
    AIToolCategory.IMAGE,
    'layers-outline',
    ['Image mixing', 'Style transfer', 'Generation'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'dreamstudio',
    'DreamStudio',
    'Stability AI\'s image generation platform',
    AIToolCategory.IMAGE,
    'camera-outline',
    ['Image generation', 'Style customization', 'High resolution'],
    'Paid',
    'SDXL',
    true
  ),
  generateAITool(
    'nightcafe',
    'NightCafe',
    'AI art generation platform with multiple models',
    AIToolCategory.IMAGE,
    'moon-outline',
    ['Art generation', 'Multiple models', 'Style transfer'],
    'Freemium',
    'Multiple',
    true
  ),
];

const audioTools = [
  generateAITool(
    'whisper',
    'Whisper',
    'Speech recognition system that transcribes audio in multiple languages',
    AIToolCategory.AUDIO,
    'mic-outline',
    ['Speech recognition', 'Translation', 'Transcription'],
    'Free',
    'Whisper',
    true
  ),
  generateAITool(
    'elevenlabs',
    'ElevenLabs',
    'AI voice generation and text-to-speech platform',
    AIToolCategory.AUDIO,
    'volume-high-outline',
    ['Voice generation', 'Text-to-speech', 'Voice cloning'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'lalal-ai',
    'LALAL.AI',
    'AI-powered audio separation and stem extraction',
    AIToolCategory.AUDIO,
    'musical-notes-outline',
    ['Audio separation', 'Stem extraction', 'Voice isolation'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'audio-craft',
    'AudioCraft',
    'Meta\'s AI model for high-quality audio generation',
    AIToolCategory.AUDIO,
    'radio-outline',
    ['Audio generation', 'Music creation', 'Sound effects'],
    'Free',
    'Custom',
    true
  ),
  generateAITool(
    'mubert',
    'Mubert',
    'AI-powered music generation and licensing platform',
    AIToolCategory.AUDIO,
    'musical-note-outline',
    ['Music generation', 'Licensing', 'Customization'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'descript',
    'Descript',
    'AI-powered audio and video editing platform',
    AIToolCategory.AUDIO,
    'film-outline',
    ['Audio editing', 'Transcription', 'Voice cloning'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'otter-ai',
    'Otter.ai',
    'AI-powered meeting transcription and notes',
    AIToolCategory.AUDIO,
    'mic-outline',
    ['Transcription', 'Meeting notes', 'Speaker identification'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'rev-ai',
    'Rev.ai',
    'Professional audio transcription service',
    AIToolCategory.AUDIO,
    'document-text-outline',
    ['Transcription', 'Subtitles', 'Translation'],
    'Paid',
    'Custom',
    true
  ),
  generateAITool(
    'assemblyai',
    'AssemblyAI',
    'AI-powered audio processing and analysis',
    AIToolCategory.AUDIO,
    'analytics-outline',
    ['Speech recognition', 'Audio analysis', 'Content moderation'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'sonotic',
    'Sonotic',
    'AI-powered music creation and production',
    AIToolCategory.AUDIO,
    'musical-notes-outline',
    ['Music creation', 'Sound design', 'Production'],
    'Freemium',
    'Custom',
    true
  ),
];

const videoTools = [
  generateAITool(
    'synthesia',
    'Synthesia',
    'AI video generation platform for creating digital avatars',
    AIToolCategory.VIDEO,
    'videocam-outline',
    ['Avatar generation', 'Video creation', 'Multilingual support'],
    'Paid',
    'Custom',
    true
  ),
  generateAITool(
    'descript',
    'Descript',
    'AI-powered video and audio editing platform',
    AIToolCategory.VIDEO,
    'film-outline',
    ['Video editing', 'Audio editing', 'Transcription'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'd-id',
    'D-ID',
    'AI platform for creating talking avatars and digital humans',
    AIToolCategory.VIDEO,
    'person-outline',
    ['Avatar creation', 'Video generation', 'Multilingual support'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'heygen',
    'HeyGen',
    'AI video generation platform for creating digital presenters',
    AIToolCategory.VIDEO,
    'people-outline',
    ['Presenter creation', 'Video generation', 'Customization'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'hour-one',
    'Hour One',
    'AI platform for creating professional video content',
    AIToolCategory.VIDEO,
    'time-outline',
    ['Video creation', 'Avatar generation', 'Multilingual support'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'runway',
    'Runway',
    'AI-powered video generation and editing platform',
    AIToolCategory.VIDEO,
    'videocam-outline',
    ['Video generation', 'Editing', 'Effects'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'stable-video',
    'Stable Video',
    'AI-powered video generation from images',
    AIToolCategory.VIDEO,
    'images-outline',
    ['Video generation', 'Animation', 'Motion'],
    'Paid',
    'Custom',
    true
  ),
  generateAITool(
    'pictory',
    'Pictory',
    'AI-powered video summarization and editing',
    AIToolCategory.VIDEO,
    'film-outline',
    ['Video summarization', 'Editing', 'Captions'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'invideo',
    'InVideo',
    'AI-powered video creation platform',
    AIToolCategory.VIDEO,
    'videocam-outline',
    ['Video creation', 'Templates', 'Editing'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'lumen5',
    'Lumen5',
    'AI-powered video creation for social media',
    AIToolCategory.VIDEO,
    'share-social-outline',
    ['Social media', 'Video creation', 'Templates'],
    'Freemium',
    'Custom',
    true
  ),
];

const codeTools = [
  generateAITool(
    'github-copilot',
    'GitHub Copilot',
    'AI pair programmer that helps write better code faster',
    AIToolCategory.CODE,
    'code-slash-outline',
    ['Code completion', 'Function generation', 'Documentation'],
    'Paid',
    'Codex',
    true
  ),
  generateAITool(
    'amazon-codewhisperer',
    'Amazon CodeWhisperer',
    'AI-powered code suggestions and security scanning',
    AIToolCategory.CODE,
    'shield-checkmark-outline',
    ['Code suggestions', 'Security scanning', 'Best practices'],
    'Free',
    'Custom',
    true
  ),
  generateAITool(
    'tabnine',
    'Tabnine',
    'AI code completion tool supporting multiple languages',
    AIToolCategory.CODE,
    'terminal-outline',
    ['Code completion', 'Language support', 'Custom training'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'codeium',
    'Codeium',
    'AI-powered code completion and generation tool',
    AIToolCategory.CODE,
    'code-download-outline',
    ['Code completion', 'Function generation', 'Language support'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'kite',
    'Kite',
    'AI-powered code completion for Python and JavaScript',
    AIToolCategory.CODE,
    'logo-python',
    ['Code completion', 'Language support', 'Documentation'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'replit-ghost',
    'Replit Ghost',
    'AI-powered code completion in the browser',
    AIToolCategory.CODE,
    'browser-outline',
    ['Code completion', 'Browser-based', 'Collaboration'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'codeguru',
    'Amazon CodeGuru',
    'AI-powered code review and optimization',
    AIToolCategory.CODE,
    'analytics-outline',
    ['Code review', 'Performance optimization', 'Security'],
    'Paid',
    'Custom',
    true
  ),
  generateAITool(
    'codeassist',
    'CodeAssist',
    'AI-powered code completion and refactoring',
    AIToolCategory.CODE,
    'code-slash-outline',
    ['Code completion', 'Refactoring', 'Best practices'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'codecomplete',
    'CodeComplete',
    'AI-powered code completion and generation',
    AIToolCategory.CODE,
    'code-download-outline',
    ['Code completion', 'Generation', 'Language support'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'codesnippets',
    'CodeSnippets',
    'AI-powered code snippet generation and management',
    AIToolCategory.CODE,
    'document-text-outline',
    ['Snippet generation', 'Management', 'Sharing'],
    'Freemium',
    'Custom',
    true
  ),
];

const otherTools = [
  generateAITool(
    'autogpt',
    'AutoGPT',
    'AI-powered task automation and planning',
    AIToolCategory.OTHER,
    'apps-outline',
    ['Task automation', 'Planning', 'Execution'],
    'Free',
    'Custom',
    true
  ),
  generateAITool(
    'agentgpt',
    'AgentGPT',
    'AI-powered autonomous agent creation',
    AIToolCategory.OTHER,
    'construct-outline',
    ['Agent creation', 'Task planning', 'Execution'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'babyagi',
    'BabyAGI',
    'AI-powered task planning and execution',
    AIToolCategory.OTHER,
    'git-branch-outline',
    ['Task planning', 'Execution', 'Learning'],
    'Free',
    'Custom',
    true
  ),
  generateAITool(
    'superagi',
    'SuperAGI',
    'AI-powered agent development platform',
    AIToolCategory.OTHER,
    'construct-outline',
    ['Agent development', 'Task planning', 'Execution'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'langchain',
    'LangChain',
    'Framework for developing AI applications',
    AIToolCategory.OTHER,
    'layers-outline',
    ['Application development', 'Model integration', 'Chain creation'],
    'Free',
    'Custom',
    true
  ),
  generateAITool(
    'llamaindex',
    'LlamaIndex',
    'Framework for building AI applications with data',
    AIToolCategory.OTHER,
    'document-text-outline',
    ['Data integration', 'Application building', 'Querying'],
    'Free',
    'Custom',
    true
  ),
  generateAITool(
    'automl',
    'AutoML',
    'AI-powered machine learning automation',
    AIToolCategory.OTHER,
    'analytics-outline',
    ['ML automation', 'Model training', 'Optimization'],
    'Paid',
    'Custom',
    true
  ),
  generateAITool(
    'datarobot',
    'DataRobot',
    'AI-powered machine learning platform',
    AIToolCategory.OTHER,
    'analytics-outline',
    ['ML platform', 'Model development', 'Deployment'],
    'Paid',
    'Custom',
    true
  ),
  generateAITool(
    'h2o-ai',
    'H2O.ai',
    'AI and machine learning platform',
    AIToolCategory.OTHER,
    'water-outline',
    ['ML platform', 'Model development', 'Deployment'],
    'Freemium',
    'Custom',
    true
  ),
  generateAITool(
    'rapidminer',
    'RapidMiner',
    'AI-powered data science platform',
    AIToolCategory.OTHER,
    'analytics-outline',
    ['Data science', 'ML development', 'Deployment'],
    'Paid',
    'Custom',
    true
  ),
];

// Export all AI tools
export const aiTools: AITool[] = [
  ...chatTools,
  ...imageTools,
  ...audioTools,
  ...videoTools,
  ...codeTools,
  ...otherTools,
]; 