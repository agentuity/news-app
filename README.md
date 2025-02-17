# Agent News Web App

An AI-driven web application for displaying and managing AI-curated news content with an AI generated audio podcast summary.

## Features

- 📰 Dynamic news feed with expandable articles
- 🎧 Audio digest of news content
- 🏷️ Tag-based filtering and organization
- 🔍 Real-time search functionality
- 🌐 Source-based filtering
- 📱 Responsive design for all devices
- 🎨 Modern UI with dark/light mode support

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Hooks
- **Data Storage**: Redis
- **Audio Processing**: Web Audio API
- **Animations**: Framer Motion

## Prerequisites

- Node.js 18+
- Upstash Redis
- npm or yarn package manager

## Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd agent-news-webapp
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Environment Setup**

Create a `.env.local` file in the root directory:

```bash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

4. **Run the development server**

```bash
pnpm run dev
```

5. **Open the application**
 
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```txt
agent-news-webapp/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # Base UI components
│   └── ...               # Feature components
├── lib/                  # Utility functions and hooks
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Helper functions
│   └── types.ts          # TypeScript types
└── public/               # Static assets
```

## Key Components

- **NewsFeed**: Main component for displaying news articles
- **AudioExperience**: Handles audio playback and visualization
- **TrendingSidebar**: Manages tags and source filtering
- **SearchBar**: Provides real-time search functionality
- **AgentSummary**: Displays AI-generated content summaries

## Features in Detail

### News Display

- Articles are displayed in cards with expandable descriptions
- Each card shows the title, description, date, source, and tags
- Sources are displayed in a clean format (domain only)
- Tags are interactive and can be used for filtering

### Filtering System
- Filter by tags: Click on tags to filter related content
- Filter by source: Select news sources to filter content
- Search: Real-time search across titles and descriptions
- Combined filtering: Use multiple filters simultaneously

### Audio Experience
- Listen to AI-narrated news digests
- Audio player with playback controls
- Visual indication of current article being narrated
- Background blur effect during playback

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile
- Optimized layouts for different screen sizes
- Touch-friendly interactions

## Development

### Adding New Features
1. Create new components in the `components` directory
2. Add types to `lib/types.ts`
3. Update existing components as needed
4. Add new utility functions to `lib/utils`

### Code Style
- Follow TypeScript best practices
- Use shadcn/ui components when possible
- Maintain responsive design principles
- Keep components modular and reusable

### Testing
```bash
npm run test
# or
yarn test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details
