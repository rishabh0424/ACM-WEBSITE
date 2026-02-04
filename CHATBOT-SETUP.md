# ACM Chatbot Setup Guide

## Overview
A Gemini AI-powered chatbot integrated into your ACM website. The chatbot appears as a floating button in the bottom-right corner and helps students learn about your ACM chapter.

## Features
- 🤖 Powered by Google Gemini AI
- 💬 Floating chat interface with smooth animations
- 🎨 Matches your website's futuristic design theme
- 📱 Fully responsive
- ⚡ Real-time responses

## Setup Instructions

### 1. Get Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Configure Environment Variables
1. Create a `.env.local` file in your project root:
   ```bash
   cp .env.local.example .env.local
   ```

2. Add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. Install Dependencies (if needed)
The required dependencies should already be installed:
- `motion` (already in package.json)
- `lucide-react` (already in package.json)
- `framer-motion` (already in package.json)

If not, run:
```bash
npm install motion lucide-react framer-motion
```

### 4. Start Development Server
```bash
npm run dev
```

The chatbot will appear in the bottom-right corner of your website!

## Files Created

### Components
- `components/AcmChatbot.tsx` - Main chatbot UI component
- `components/ui/chat-interface.tsx` - Reusable chat interface component

### API Routes
- `app/api/chat/route.ts` - Backend API endpoint for Gemini integration

### Configuration
- `.env.local.example` - Template for environment variables

## Customization

### Change Chatbot Position
Edit `components/AcmChatbot.tsx`:
```tsx
// Change from bottom-right to bottom-left
className="fixed bottom-6 left-6 z-50..."
```

### Modify AI Behavior
Edit `app/api/chat/route.ts` and update the `systemContext`:
```typescript
const systemContext = `Your custom instructions here...`;
```

### Adjust Colors
The chatbot uses your existing Tailwind theme colors:
- `accent-blue` - Primary button color
- `cyan-500` - Gradient accent
- `dark-elevated` - Chat window background
- `dark-card` - Message bubbles

### Change Chat Window Size
Edit `components/AcmChatbot.tsx`:
```tsx
className="... w-[380px] h-[600px] ..."
// Change to your preferred dimensions
```

## Usage Tips

### For Students
The chatbot can answer questions about:
- ACM chapter activities and events
- Technical domains (AI/ML, Web Dev, Cybersecurity, etc.)
- How to join the chapter
- Upcoming workshops and hackathons
- Benefits of membership
- Career development opportunities

### For Admins
You can customize the AI's knowledge by:
1. Editing the system context in `app/api/chat/route.ts`
2. Adding specific information about your chapter
3. Including links to resources
4. Updating event information

## Troubleshooting

### Chatbot not appearing
- Check that `AcmChatbot` is imported in `app/layout.tsx`
- Verify the component is rendered in the layout
- Check browser console for errors

### API errors
- Verify your Gemini API key is correct in `.env.local`
- Check that the file is named exactly `.env.local` (not `.env`)
- Restart the development server after adding the API key
- Check API quota limits at [Google AI Studio](https://makersuite.google.com/)

### Styling issues
- Ensure Tailwind CSS is properly configured
- Check that custom colors are defined in `tailwind.config.ts`
- Verify `framer-motion` and `motion` are installed

## API Rate Limits
- Gemini API has free tier limits
- Consider implementing rate limiting for production
- Monitor usage in Google AI Studio dashboard

## Production Deployment

### Vercel (Recommended)
1. Add `GEMINI_API_KEY` to Vercel environment variables
2. Deploy normally: `vercel --prod`

### Other Platforms
Add the `GEMINI_API_KEY` environment variable in your hosting platform's settings.

## Security Notes
- Never commit `.env.local` to version control
- Keep your API key secret
- Consider implementing rate limiting
- Add authentication for production use

## Future Enhancements
- Add conversation history persistence
- Implement user authentication
- Add file upload support
- Create admin dashboard for analytics
- Add multilingual support

## Support
For issues or questions:
- Check the [Gemini API documentation](https://ai.google.dev/docs)
- Review Next.js API routes documentation
- Check component props and types in the code
