# Sponge Tracker - Development Roadmap

**Version:** 1.0.0  
**Framework:** React Native + Expo SDK 54  
**Target:** iOS & Android (Frontend Only - Mock Data)

---

## Phase 1: Foundation & Core Structure (Week 1)

### Step 1.1: Navigation Setup ⏳
**Priority:** Critical  
**Effort:** 2-3 hours

**Tasks:**
- [ ] Create bottom tab navigator structure
- [ ] Set up 5 main screens (Home, My Sponges, Cemetery, Stats, Settings)
- [ ] Configure tab bar styling (dark theme)
- [ ] Add tab icons (placeholder or expo-symbols)
- [ ] Test navigation flow between tabs

**Files to Create:**
- `app/(app)/(tabs)/_layout.tsx` - Update tab structure
- `app/(app)/(tabs)/sponges.tsx` - My Sponges screen
- `app/(app)/(tabs)/cemetery.tsx` - Cemetery screen
- `app/(app)/(tabs)/stats.tsx` - Stats screen
- `app/(app)/(tabs)/settings.tsx` - Settings screen

**Deliverable:** Working tab navigation with skeleton screens

---

### Step 1.2: Design System & Theme
**Priority:** Critical  
**Effort:** 3-4 hours

**Tasks:**
- [ ] Create color palette constants (Oura-inspired)
- [ ] Define typography scale
- [ ] Create reusable components:
  - `Card` component
  - `Button` component
  - `CircularProgress` component
  - `StatCard` component
- [ ] Update ThemedText and ThemedView with new colors
- [ ] Create spacing constants

**Files to Create/Update:**
- `constants/Theme.ts` - Color palette and design tokens
- `components/ui/Card.tsx`
- `components/ui/Button.tsx`
- `components/ui/CircularProgress.tsx`
- `components/ui/StatCard.tsx`

**Deliverable:** Consistent design system ready to use

---

### Step 1.3: Data Models & Mock Storage
**Priority:** Critical  
**Effort:** 2-3 hours

**Tasks:**
- [ ] Define TypeScript interfaces (Sponge, UsageLog)
- [ ] Create mock data service/context
- [ ] Implement AsyncStorage wrapper (or use existing useStorageState)
- [ ] Create initial mock sponge data
- [ ] Build CRUD operations for sponges

**Files to Create:**
- `types/sponge.ts` - Sponge data models
- `services/spongeStorage.ts` - Storage service
- `providers/SpongeContext.tsx` - Global state management
- `hooks/useSponges.ts` - Custom hook for sponge operations

**Deliverable:** Working data layer with mock storage

---

## Phase 2: Home Screen - Core Feature (Week 1-2)

### Step 2.1: Circular Health Score Component
**Priority:** Critical  
**Effort:** 4-5 hours

**Tasks:**
- [ ] Build circular progress ring using SVG
- [ ] Implement health score calculation logic
- [ ] Add color transitions (green → yellow → red)
- [ ] Center score number and status text
- [ ] Add smooth animations
- [ ] Make it responsive to different screen sizes

**Files to Create:**
- `components/sponge/SpongeHealthScore.tsx`
- `utils/healthCalculation.ts`

**Deliverable:** Animated circular health score component

---

### Step 2.2: Home Screen Layout
**Priority:** Critical  
**Effort:** 3-4 hours

**Tasks:**
- [ ] Layout home screen with health score at top
- [ ] Add sponge animation placeholder (static image initially)
- [ ] Create stats cards below (usage count, days active, avg/day)
- [ ] Add "Log Usage" button
- [ ] Add alert banner component (conditional)
- [ ] Connect to mock sponge data

**Files to Update:**
- `app/(app)/(tabs)/(home)/index.tsx`
- `components/sponge/SpongeAnimation.tsx`
- `components/sponge/AlertBanner.tsx`

**Deliverable:** Functional home screen displaying active sponge

---

### Step 2.3: Usage Tracking Logic
**Priority:** Critical  
**Effort:** 2-3 hours

**Tasks:**
- [ ] Implement increment usage function
- [ ] Update health score on increment
- [ ] Save usage log with timestamp
- [ ] Add haptic feedback on tap
- [ ] Show brief success animation/toast
- [ ] Update all stats in real-time

**Files to Update:**
- `providers/SpongeContext.tsx`
- `hooks/useSponges.ts`

**Deliverable:** Working usage increment with data persistence

---

## Phase 3: Sponge Management (Week 2)

### Step 3.1: Create Sponge Flow
**Priority:** High  
**Effort:** 4-5 hours

**Tasks:**
- [ ] Build sponge creation form screen
- [ ] Add color picker component
- [ ] Add name input field
- [ ] Implement form validation
- [ ] Create sponge and save to storage
- [ ] Navigate back to home after creation
- [ ] Add success feedback

**Files to Create:**
- `app/(app)/create-sponge.tsx` - Modal or screen
- `components/sponge/ColorPicker.tsx`

**Deliverable:** Complete sponge creation flow

---

### Step 3.2: My Sponges Screen
**Priority:** High  
**Effort:** 3-4 hours

**Tasks:**
- [ ] Display active sponge card
- [ ] Show list of all sponges (active + retired)
- [ ] Add "Create New" button
- [ ] Add "Replace" button for active sponge
- [ ] Implement sponge detail view
- [ ] Add ability to switch active sponge

**Files to Update:**
- `app/(app)/(tabs)/sponges.tsx`
- `components/sponge/SpongeCard.tsx`

**Deliverable:** Sponge management screen

---

### Step 3.3: Replace/Retire Sponge Flow
**Priority:** High  
**Effort:** 3-4 hours

**Tasks:**
- [ ] Build retirement screen/modal
- [ ] Add retirement reason selector
- [ ] Add optional notes field
- [ ] Implement retire function
- [ ] Trigger create new sponge flow
- [ ] Update active sponge
- [ ] Move old sponge to cemetery

**Files to Create:**
- `app/(app)/retire-sponge.tsx`
- `components/sponge/RetirementForm.tsx`

**Deliverable:** Complete sponge replacement flow

---

## Phase 4: Cemetery & History (Week 2-3)

### Step 4.1: Cemetery Screen
**Priority:** Medium  
**Effort:** 3-4 hours

**Tasks:**
- [ ] Create grid/list layout for retired sponges
- [ ] Build retired sponge card component
- [ ] Display key stats on each card
- [ ] Add empty state for no retired sponges
- [ ] Implement tap to view detail
- [ ] Add sorting options (most recent, longest lasting, etc.)

**Files to Update:**
- `app/(app)/(tabs)/cemetery.tsx`
- `components/sponge/RetiredSpongeCard.tsx`

**Deliverable:** Cemetery screen with retired sponges

---

### Step 4.2: Sponge Detail View
**Priority:** Medium  
**Effort:** 3-4 hours

**Tasks:**
- [ ] Create detail modal/screen
- [ ] Show full sponge statistics
- [ ] Display usage graph over lifespan
- [ ] Show retirement info
- [ ] Add notes section
- [ ] Implement close/back navigation

**Files to Create:**
- `app/(app)/sponge-detail.tsx`
- `components/sponge/SpongeDetailStats.tsx`

**Deliverable:** Detailed sponge view

---

## Phase 5: Stats & Visualization (Week 3)

### Step 5.1: Stats Screen Layout
**Priority:** Medium  
**Effort:** 2-3 hours

**Tasks:**
- [ ] Create stats screen layout
- [ ] Add active sponge summary card
- [ ] Create time period selector
- [ ] Calculate and display insights
- [ ] Add comparison metrics

**Files to Update:**
- `app/(app)/(tabs)/stats.tsx`
- `components/stats/InsightCard.tsx`

**Deliverable:** Stats screen structure

---

### Step 5.2: Usage Graph Component
**Priority:** Medium  
**Effort:** 4-5 hours

**Tasks:**
- [ ] Install charting library (Victory Native or react-native-chart-kit)
- [ ] Build line chart component
- [ ] Format usage data for chart
- [ ] Implement time period filtering
- [ ] Add smooth transitions
- [ ] Make responsive

**Files to Create:**
- `components/stats/UsageChart.tsx`
- `utils/chartData.ts`

**Deliverable:** Interactive usage graph

---

## Phase 6: Animations & Polish (Week 3-4)

### Step 6.1: Sponge Animations
**Priority:** Low-Medium  
**Effort:** 3-5 hours

**Tasks:**
- [ ] Create or find sponge illustrations (4 states)
- [ ] Integrate Lottie animations (optional) OR
- [ ] Build simple animated components with Reanimated
- [ ] Implement state transitions
- [ ] Add micro-interactions on tap

**Files to Update:**
- `components/sponge/SpongeAnimation.tsx`
- Add animation assets to `/assets`

**Deliverable:** Animated sponge visuals

---

### Step 6.2: Transitions & Micro-interactions
**Priority:** Low  
**Effort:** 2-3 hours

**Tasks:**
- [ ] Add screen transition animations
- [ ] Implement button press animations
- [ ] Add loading states
- [ ] Polish empty states
- [ ] Add haptic feedback throughout

**Deliverable:** Polished app feel

---

## Phase 7: Settings & Final Features (Week 4)

### Step 7.1: Settings Screen
**Priority:** Low  
**Effort:** 2-3 hours

**Tasks:**
- [ ] Build settings screen
- [ ] Add theme toggle (dark/light)
- [ ] Add notification preference toggles (UI only)
- [ ] Add about section
- [ ] Save settings to storage

**Files to Update:**
- `app/(app)/(tabs)/settings.tsx`
- `providers/SettingsContext.tsx`

**Deliverable:** Working settings screen

---

### Step 7.2: Onboarding Flow
**Priority:** Low  
**Effort:** 2-3 hours

**Tasks:**
- [ ] Create welcome screen (first launch)
- [ ] Add app intro slides
- [ ] Guide user to create first sponge
- [ ] Add skip option

**Files to Create:**
- `app/(app)/onboarding.tsx`

**Deliverable:** First-time user experience

---

## Phase 8: Testing & Refinement (Week 4)

### Step 8.1: Testing
**Priority:** High  
**Effort:** 3-4 hours

**Tasks:**
- [ ] Test all user flows
- [ ] Test on iOS (Expo Go)
- [ ] Test on Android (Expo Go)
- [ ] Test edge cases
- [ ] Fix bugs
- [ ] Performance optimization

**Deliverable:** Stable, tested app

---

### Step 8.2: Documentation
**Priority:** Medium  
**Effort:** 2-3 hours

**Tasks:**
- [ ] Update README with setup instructions
- [ ] Document component API
- [ ] Add inline code comments
- [ ] Create usage guide

**Deliverable:** Complete documentation

---

## Timeline Summary

**Week 1:**
- Phase 1 (Foundation) - Complete
- Phase 2 (Home Screen) - 80%

**Week 2:**
- Phase 2 (Home Screen) - Complete
- Phase 3 (Sponge Management) - Complete
- Phase 4 (Cemetery) - 50%

**Week 3:**
- Phase 4 (Cemetery) - Complete
- Phase 5 (Stats) - Complete
- Phase 6 (Animations) - 50%

**Week 4:**
- Phase 6 (Animations) - Complete
- Phase 7 (Settings) - Complete
- Phase 8 (Testing) - Complete

**Total Estimated Time:** 60-80 hours over 4 weeks

---

## Success Metrics

- [ ] All 7 user flows functional
- [ ] No critical bugs
- [ ] Smooth animations (60fps)
- [ ] Dark theme fully implemented
- [ ] Data persists correctly
- [ ] Works on iOS and Android
- [ ] Clean, maintainable code

