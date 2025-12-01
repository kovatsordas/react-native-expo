# Sponge Tracker - User Flows

## User Flow 1: First Time User - Onboarding
1. User opens app → Welcome/Login screen
2. User logs in with credentials (phone + password)
3. After login → Welcome screen: "Create Your First Sponge"
4. Tap "Create Your First Sponge" button
5. Select color (color picker with preset options)
6. Enter optional name (e.g., "Kitchen Sponge")
7. Tap "Create" button
8. Confirmation prompt: "Set as active sponge?" → Tap "Yes"
9. Navigate to Home screen showing:
   - Circular sponge health score (100%)
   - Fresh sponge animation
   - 0 uses logged

**Success Criteria:**
- User has created first sponge
- Sponge is set to active
- Home screen displays correctly

---

## User Flow 2: Track Sponge Usage (Manual)
1. User on Home screen
2. See circular health score with current status
   - Score number (e.g., 87%)
   - Status text (e.g., "Optimal")
   - Sponge animation showing condition
3. Tap large "Log Usage" button (+ icon)
4. Usage count increments by 1
5. Sponge health score recalculates and updates
6. Animation updates if threshold crossed:
   - 0-30 uses: Fresh/new sponge (green)
   - 31-50 uses: Middle-aged sponge (yellow)
   - 51+ uses: Worn sponge (red)
7. If replacement needed: Alert banner shows "Time to replace your sponge!"

**Success Criteria:**
- Usage count increments correctly
- Health score updates immediately
- Visual feedback is clear
- Alert appears when needed

---

## User Flow 3: Replace Sponge
1. User sees red health score + alert banner
2. Options:
   - Tap "Replace Sponge" button on banner, OR
   - Navigate to "My Sponges" tab → Tap active sponge → Tap "Replace"
3. Retirement screen appears:
   - Current sponge summary (uses, lifespan)
   - Select retirement reason dropdown:
     - Worn out
     - Smelly
     - Damaged/torn
     - Other
   - Optional notes field
4. Tap "Retire & Create New" button
5. Current sponge marked as retired
6. Automatic redirect to create new sponge flow (from User Flow 1)
7. New sponge becomes active
8. Old sponge moves to Cemetery

**Success Criteria:**
- Old sponge properly retired with data saved
- New sponge created and set to active
- Cemetery shows retired sponge
- Home screen shows fresh sponge

---

## User Flow 4: View Cemetery (Historical Sponges)
1. User taps "Cemetery" tab in bottom navigation
2. Cemetery screen displays:
   - Header: "Sponge Cemetery" with count
   - Grid/list of retired sponge cards
3. Each sponge card shows:
   - Color indicator
   - Name (or "Unnamed Sponge")
   - Date range (e.g., "Nov 1 - Nov 25, 2025")
   - Total uses (e.g., "62 uses")
   - Small health score indicator
4. Tap a sponge card
5. Detail modal/screen appears showing:
   - Full statistics
   - Usage graph over its lifespan
   - Retirement reason
   - Average uses per day
   - Notes (if any)
6. Swipe down or tap back to return to cemetery list

**Success Criteria:**
- All retired sponges displayed
- Correct statistics shown
- Detail view accessible
- Navigation smooth

---

## User Flow 5: View Stats & Insights
1. User taps "Stats" tab in bottom navigation
2. Stats screen displays:
   - **Active Sponge Summary Card:**
     - Current health score
     - Days active
     - Usage count
     - Average uses per day
   - **Usage Graph:**
     - Line chart showing usage over time
     - Time period selector: 7 days / 30 days / All time
   - **Insights Section:**
     - "You're averaging X uses per day"
     - "This sponge has lasted Y days"
     - Comparison with previous sponges
3. User can change time period
4. Graph updates smoothly
5. Scroll to see all insights

**Success Criteria:**
- Accurate data visualization
- Graph renders correctly
- Time period switching works
- Insights are helpful

---

## User Flow 6: Manage Sponges
1. User taps "My Sponges" tab in bottom navigation
2. My Sponges screen displays:
   - **Active Sponge Section:**
     - Card showing current active sponge
     - Quick stats
     - "Replace" button
   - **Create New Sponge Button**
   - **All Sponges List:**
     - Active sponge (marked with indicator)
     - Retired sponges (grayed out)
3. User can:
   - Create additional sponges (multi-sponge household)
   - Switch active sponge
   - View any sponge details
4. Tap on a sponge to view full details

**Success Criteria:**
- Clear distinction between active and retired
- Easy sponge creation
- Simple active sponge switching

---

## User Flow 7: Settings & Preferences
1. User taps "Settings" tab in bottom navigation
2. Settings screen displays:
   - **Notification Settings:**
     - Enable/disable usage reminders
     - Reminder time settings
   - **Tracking Method:**
     - Manual only
     - With notifications (future)
     - Scheduled check-ins (future)
   - **Theme:**
     - Dark mode (default)
     - Light mode toggle
   - **About:**
     - App version
     - Credits
3. User toggles settings
4. Changes save automatically
5. Visual feedback on changes

**Success Criteria:**
- Settings persist across sessions
- Theme changes apply immediately
- Clear labels and descriptions

---

## Edge Cases & Error Handling

### No Active Sponge
- **Scenario:** User retires sponge without creating new one
- **Handling:** Prompt to create new sponge or select from existing

### First Time Usage
- **Scenario:** User hasn't created any sponge
- **Handling:** Show empty state with "Create First Sponge" CTA

### Maximum Usage
- **Scenario:** Sponge exceeds 100 uses
- **Handling:** Health score stays at 0%, persistent alert to replace

### Delete Account
- **Scenario:** User logs out
- **Handling:** Data persists in local storage, reload on login

