# Product Vision

## Overview
Very simple app which can track a kitchen sponge lifecycle.

## Target Audience
Cleanliness-oriented individuals who want to optimize their sponge usage.

## User Goals
- Track how many times a sponge is used before collecting too much bacteria
- Log each time they use their sponge
- Receive alerts when the sponge starts to be unsafe

## Core Features
- Usage logging
- Safety alerts based on usage count
- Sponge lifecycle tracking

## Detailed Feature Breakdown

### Sponge Management
- **Add Sponge**: Users can create a new sponge entry
  - Set color
  - Add optional name
- **Active Sponge**: System prompts to set as active sponge after creation

### Usage Tracking Options
Three methods for tracking sponge usage:

1. **Manual Logging**: User manually taps to increment usage count
2. **Push Notification Prompt**: App sends notification asking "Did you use your sponge?" - user taps to confirm and increment
3. **Scheduled Check-ins**: App prompts at specific times (e.g., after meals) to log usage

### Visual Feedback
- **Lottie Animations**: Sponge visual changes as usage increases
  - Young/new sponge animation
  - Middle-aged sponge animation
  - Old/worn sponge animation
  - Critical/unsafe sponge animation

### Cemetery Feature
- View all retired sponges
- Historical stats for each sponge:
  - Total uses
  - Lifespan duration
  - Retirement reason
  - Usage patterns

## Future Enhancements (Later Functions)

### Advanced Sponge Types
- Template-based sponge types
- Brand selection/tagging
- Custom categories

### Usage Context Tracking
- Ask if sponge was dried after use
- Track if used on oily or very dirty items
- Context affects bacteria risk calculation

### AI-Powered Photo Analysis (Best Option)
- Take photo of sponge condition
- AI analyzes wear and bacteria risk
- Ask contextual questions:
  - What was cleaned?
  - What meal was prepared? (lunch, dinner, etc.)
- Potential integration with meal/lunch tracker apps
- More accurate safety assessments based on visual condition

