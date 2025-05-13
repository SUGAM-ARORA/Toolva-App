-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tools table
CREATE TABLE IF NOT EXISTS tools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    category_id INTEGER REFERENCES categories(id),
    rating DECIMAL(3,2),
    pricing VARCHAR(100),
    users VARCHAR(50),
    model VARCHAR(100),
    image_url TEXT,
    website_url TEXT,
    api_docs_url TEXT,
    github_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tool_features table
CREATE TABLE IF NOT EXISTS tool_features (
    id SERIAL PRIMARY KEY,
    tool_id INTEGER REFERENCES tools(id),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tool_reviews table
CREATE TABLE IF NOT EXISTS tool_reviews (
    id SERIAL PRIMARY KEY,
    tool_id INTEGER REFERENCES tools(id),
    user_id INTEGER,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create user_favorites table
CREATE TABLE IF NOT EXISTS user_favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    tool_id INTEGER REFERENCES tools(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, tool_id)
);

-- Insert categories
INSERT INTO categories (name, slug, description) VALUES
('Chatbots', 'chatbots', 'AI-powered conversational agents'),
('Image Generation', 'image-generation', 'AI tools for creating and editing images'),
('Code', 'code', 'AI-powered coding and development tools'),
('Music', 'music', 'AI tools for music creation and processing'),
('Video', 'video', 'AI tools for video creation and editing'),
('Text Generation', 'text-generation', 'AI tools for generating and processing text'),
('Audio', 'audio', 'AI tools for audio processing and generation'),
('3D', '3d', 'AI tools for 3D modeling and generation'),
('Design', 'design', 'AI tools for design and creative work'),
('Productivity', 'productivity', 'AI tools for improving productivity');

-- Insert tools
INSERT INTO tools (name, slug, description, category_id, rating, pricing, users, model, image_url, is_featured) VALUES
('ChatGPT', 'chatgpt', 'Advanced language model for conversation and text generation', 1, 4.8, 'Free / $20 monthly', '100M+', 'GPT-4', 'https://images.unsplash.com/photo-1684163800569-e4e0f8b72408?w=800&auto=format&fit=crop', true),
('Google Gemini', 'google-gemini', 'Next-generation AI model with advanced reasoning capabilities', 1, 4.7, 'Free / $10 monthly', '50M+', 'Gemini Ultra', 'https://images.unsplash.com/photo-1685094488371-d12d6f0aeec0?w=800&auto=format&fit=crop', true),
('DeepSeek', 'deepseek', 'Advanced coding assistant with deep understanding of software development', 3, 4.6, 'Free Beta', '1M+', 'DeepSeek Coder', 'https://images.unsplash.com/photo-1686591092303-3b4e06b7c54e?w=800&auto=format&fit=crop', true),
('Midjourney', 'midjourney', 'State-of-the-art AI image generation tool', 2, 4.9, '$10-$60 monthly', '10M+', 'Midjourney V6', 'https://images.unsplash.com/photo-1684163800569-e4e0f8b72408?w=800&auto=format&fit=crop', true),
('Stable Diffusion', 'stable-diffusion', 'Open-source image generation model', 2, 4.5, 'Free / Self-hosted', '5M+', 'SDXL', 'https://images.unsplash.com/photo-1685094488371-d12d6f0aeec0?w=800&auto=format&fit=crop', true),
('GitHub Copilot', 'github-copilot', 'AI pair programmer for code completion', 3, 4.7, '$10 monthly', '2M+', 'Codex', 'https://images.unsplash.com/photo-1686591092303-3b4e06b7c54e?w=800&auto=format&fit=crop', true),
('Mubert', 'mubert', 'AI-powered music generation platform', 4, 4.4, 'Free / $15 monthly', '500K+', 'Mubert Render', 'https://images.unsplash.com/photo-1684163800569-e4e0f8b72408?w=800&auto=format&fit=crop', true),
('Runway', 'runway', 'AI-powered video creation and editing', 5, 4.6, '$15-$35 monthly', '1M+', 'Gen-2', 'https://images.unsplash.com/photo-1685094488371-d12d6f0aeec0?w=800&auto=format&fit=crop', true),
('Claude', 'claude', 'Advanced AI assistant with strong reasoning capabilities', 1, 4.8, 'Free / $20 monthly', '10M+', 'Claude 3', 'https://images.unsplash.com/photo-1686591092303-3b4e06b7c54e?w=800&auto=format&fit=crop', true),
('DALL-E', 'dall-e', 'OpenAI''s advanced image generation model', 2, 4.7, '$15 monthly', '5M+', 'DALL-E 3', 'https://images.unsplash.com/photo-1684163800569-e4e0f8b72408?w=800&auto=format&fit=crop', true);

-- Insert tool features
INSERT INTO tool_features (tool_id, name, description) VALUES
(1, 'Natural Language Processing', 'Advanced understanding and generation of human-like text'),
(1, 'Context Awareness', 'Maintains context across conversations'),
(1, 'Code Generation', 'Can write and explain code in multiple languages'),
(2, 'Multimodal Understanding', 'Processes text, images, and other data types'),
(2, 'Advanced Reasoning', 'Complex problem-solving capabilities'),
(2, 'Real-time Responses', 'Fast and accurate responses'),
(3, 'Code Completion', 'Intelligent code suggestions'),
(3, 'Bug Detection', 'Identifies potential issues in code'),
(3, 'Documentation Generation', 'Creates code documentation automatically');

-- Insert some sample reviews
INSERT INTO tool_reviews (tool_id, user_id, rating, comment) VALUES
(1, 1, 5, 'Best AI chatbot I''ve ever used!'),
(1, 2, 4, 'Great for coding assistance'),
(2, 1, 5, 'Incredible reasoning capabilities'),
(2, 3, 4, 'Very helpful for research'),
(3, 2, 5, 'Excellent coding companion'); 