E — Full Product Specification Document for Vassago.live
1. Product Vision
Vassago.live is an AI‑augmented search engine designed to uncover information beyond the surface. It blends:
	• A fast, modern search index
	• An intelligent AI analysis layer
	• A media discovery system (Usenet, NZB, torrents)
	• A personalized user experience
	• A mysterious, tech‑forward identity
Vassago’s core philosophy:
	“Search deeper. Understand more.”
It is not just a search engine — it is a hybrid intelligence system that analyzes, summarizes, contextualizes, and expands on user queries.
2. Core Features Overview
Search Engine
	• Web search via SearchXNG or Meilisearch
	• News search
	• Media search (movies, TV, releases)
	• Usenet + torrent index integration
	• Filters (Web, News, Media, Usenet, Torrents, AI Only)
AI Layer
	• Summary of search results
	• Key points
	• Contextual analysis
	• Follow‑up questions
	• “Dig deeper” expansions
	• Media reviews + quality explanations
	• Chat continuation tied to the search topic
Homepage
	• Search bar with suggestions
	• News cards (AI, tech, politics, security)
	• Trending searches
	• Featured topics
	• Support section
	• System status
	• Footer links
User Accounts
	• Email/password login
	• Profile page
	• Settings (language, timezone, theme, safe search)
	• Location + weather
	• Media client configuration (NZBGet, SABnzbd, torrent clients)
Media Tools
	• Movie/TV cards
	• Quality indicators
	• Screenshots
	• AI reviews
	• Send to NZBGet/SABnzbd/torrent client
	• Membership gating
Admin/Ops Dashboard
	• System health
	• Indexer status
	• AI model status
	• Logs
	• User management
	• Payment management
3. UX Flows
3.1 Search Flow
	1. User enters query
	2. Frontend sends query → backend
	3. Backend queries search index
	4. Backend sends results → AI
	5. AI generates summary + follow‑ups
	6. Frontend displays:
		○ Left: classic search
		○ Right: AI panel
	7. User can ask follow‑up questions
	8. AI responds using:
		○ Query
		○ Search results
		○ Conversation context
3.2 Media Download Flow
	1. User searches for a movie
	2. Media index returns:
		○ Title
		○ Quality
		○ Size
		○ Screenshots
		○ Category
	3. User clicks “Send to NZBGet”
	4. Backend sends NZB file to user’s configured client
	5. Client begins download
	6. User sees confirmation
3.3 Login + Profile Flow
	1. User clicks “Sign In”
	2. Enters email + password
	3. Auth system verifies credentials
	4. User lands on profile page
	5. User configures:
		○ Theme
		○ Timezone
		○ Language
		○ Media clients
		○ Safe search
		○ Location/weather
3.4 Admin/Ops Flow
	1. Admin navigates to hidden route
	2. Logs in with admin credentials
	3. Dashboard shows:
		○ System health
		○ Indexer status
		○ AI model status
		○ Logs
		○ User list
		○ Payment info
4. Wireframes (from Phase A)
Included in full spec:
	• Homepage
	• Search results
	• Profile
	• Media page
	• Login/signup
	• Admin dashboard
(Already completed in Phase A.)
5. Technical Architecture (from Phase B)
Included in full spec:
	• Frontend stack
	• Backend stack
	• API structure
	• Database schema
	• Search engine integration
	• AI integration
	• Media indexer integration
	• Auth system
	• Deployment strategy
	• Security considerations
(Already completed in Phase B.)
6. Homepage Copy (from Phase C)
Included in full spec:
	• Hero text
	• Search bar placeholder
	• Suggestions
	• News cards
	• Featured topics
	• Support section
	• System status
	• Footer
(Already completed in Phase C.)
7. Search Results Copy (from Phase D)
Included in full spec:
	• AI summary
	• Follow‑up questions
	• Dig deeper phrasing
	• Classic search result text
	• Media result text
	• Filters
	• System status
	• Error states
(Already completed in Phase D.)
8. Feature Definitions
8.1 Search Suggestions
	• Popular searches
	• Trending topics
	• Smart suggestions
	• Recent searches (logged‑in users)
	• AI‑generated “explore” topics
8.2 News Cards
	• Pulled from news index
	• Categorized into:
		○ AI
		○ Tech
		○ Politics
		○ Security
8.3 Media Cards
	• Poster
	• Title
	• Year
	• Quality
	• Size
	• Screenshots
	• AI review
	• Rating
	• Download/send buttons
8.4 System Status
	• Model version
	• Speed
	• Token usage
	• Search engine status
8.5 Membership
	• Unlocks media tools
	• Unlocks client integration
	• Unlocks advanced AI features
9. System Behavior
AI Behavior
	• Always grounded in search results
	• No hallucinations
	• Context‑aware
	• Summaries must be concise
	• Follow‑ups must be relevant
	• “Dig deeper” must expand meaningfully
Search Engine Behavior
	• Fast indexing
	• Relevance‑based ranking
	• Category tagging
	• Media index normalization
Media Behavior
	• Hide indexer identity
	• Normalize quality labels
	• Provide screenshots
	• Provide metadata
10. Security Requirements
	• HTTPS everywhere
	• Rate limiting
	• Abuse detection
	• API key encryption
	• Secure session handling
	• Hidden admin routes
	• No indexer exposure
	• User data isolation
11. Roadmap
Phase 1 (MVP)
	• Search engine
	• AI summaries
	• Basic homepage
	• Basic login
Phase 2
	• Suggestions
	• News cards
	• Trending topics
	• AI follow‑ups
Phase 3
	• Media search
	• NZB/torrent integration
	• Membership system
Phase 4
	• Full profile system
	• Settings
	• Weather/location
Phase 5
	• Advanced UI polish
	• Animations
	• System status
Phase 6
	• Admin dashboard
Phase 7
	• Topic pages
	• Collections
	• Developer API
