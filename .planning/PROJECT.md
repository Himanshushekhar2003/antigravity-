# Note-Taking Application

## 1. Project Context
**Goal**: Build an intelligent, versatile, and creative note-taking application for Android, iOS, Windows, and reMarkable tablets.
**Problem**: Users need a unified, multi-platform workspace that combines diverse paper templates, rich media attachments, multi-layered notes, and robust educational/professional tools (like GIFs, graphs, and AI integrations).
**Target Audience**: Students, Educators, Professionals, Content Creators.

## 2. Key Requirements
- **Dynamic Note Templates**: Multiple paper types, sizes, orientations, and themes.
- **Rich Media**: Attach PDFs, videos (up to 45s), GIFs, audio, and web links.
- **Note Interaction**: Layered swipeable notes, in-image/PDF annotation, drawing tools with pressure sensitivity.
- **Intelligence**: AI handwriting recognition, grammar/spelling correction, smart tagging.
- **Cross-Platform Delivery**: Android (Kotlin), iOS (Swift), Windows (Electron/.NET), reMarkable (optimized eInk).

## 3. Tech Stack Constraints
- Frontend/Platforms: Kotlin, Swift, Electron/.NET, eInk specific framework.
- Core logic should support rich text + media file system.
- Sync/Cloud integration (Google Drive, Dropbox, OneDrive).

## 4. Work Streams
- Frontend Platform Development
- Editor & Rendering Engine (Canvas, SVG, Text editing)
- AI & Media Integration
- Sync & Data Persistence

## 5. Architectural Drivers
- **Offline First**: Offline handwriting and basic note capabilities.
- **Performance**: High fidelity drawing tools require low latency rendering.
- **Security**: Folder-level locks, biometric auth, encrypted backups.
