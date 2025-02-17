# Agent News Web App

An AI-driven web application for displaying and managing AI-curated news content with an AI generated audio podcast summary.

## Driven by Agents

This entire application is driven by agents. The other part of this repo is the agent repo 
which you can find [here](https://github.com/agentuity/agentuity-news-swarm). These agents include:

- Editor in Chief: Oversees the entire content pipeline
- Editor: Handles content editing and refinement
- Approver: Reviews and approves content
- Filter: Filters our duplicative and non-related content
- Investigator: Researches and verifies news content
- Podcast Editor: Prepares content for podcast format
- Podcast Voice: Generates audio content

## Web Spp Features

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
- **SearchBar**: Provides in-memory search functionality
- **AgentSummary**: Displays AI-generated content summaries

## License

MIT License - see LICENSE file for details
