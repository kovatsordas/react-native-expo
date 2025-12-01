# Knowledge Base: React Native Swipe Gesture Implementation

## Technology Stack

**Current Environment:**
- React 19.1.0 with React Native 0.81.5
- react-native-gesture-handler 2.28.0 (mature, stable)
- react-native-reanimated 4.1.1 (latest, supports worklets)
- react-native-worklets 0.5.1 (required peer dependency)
- Expo SDK 54

**Feasibility Assessment:** HIGH - All libraries are compatible and well-maintained for React 19.

---

## Common Pitfalls to Avoid

1. **GestureHandlerRootView Missing**: 
   - Error: "GestureDetector must be used as a descendant of GestureHandlerRootView"
   - Solution: Wrap root app component in `<GestureHandlerRootView style={{ flex: 1 }}>`

2. **Worklet Context Issues**: 
   - State updates must use `runOnJS()` when called from gesture handlers
   - Gesture callbacks run in worklet (UI thread) context

3. **Gesture Conflicts**: 
   - Pan gesture may conflict with ScrollView or Pressable
   - Use `simultaneousWithExternalGesture` if needed

4. **Multiple Trigger Prevention**: 
   - Gesture firing repeatedly on single swipe
   - Use proper threshold checks and state management

5. **Animation Cleanup**: 
   - Ensure `translateX` resets properly to 0
   - Use spring callbacks for sequencing

6. **Performance**: 
   - Heavy operations in gesture handlers cause lag
   - Keep worklet functions lightweight

7. **Threshold Tuning**: 
   - Swipe threshold too sensitive or not sensitive enough
   - Test on actual devices, not just simulators

---

## Implementation Steps

### Completed Steps

#### Step 1: Add GestureHandlerRootView Wrapper
**File:** `app/_layout.tsx`
**Goal:** Fix the GestureDetector error
**Status:** ✅ Completed

```typescript
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Root() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Rest of app */}
    </GestureHandlerRootView>
  );
}
```

#### Step 2: Setup Basic Gesture Detection
**File:** `app/(app)/(tabs)/(home)/index.tsx`
**Goal:** Detect swipe-left and swipe-right, log to console
**Status:** ✅ Completed

```typescript
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const panGesture = Gesture.Pan()
  .onEnd((event) => {
    if (event.translationX < -50) {
      console.log('Swiped left!');
    }
    if (event.translationX > 50) {
      console.log('Swiped right!');
    }
  });

// Wrap component with GestureDetector
<GestureDetector gesture={panGesture}>
  <Pressable onPress={handleTap}>
    {/* Content */}
  </Pressable>
</GestureDetector>
```

#### Step 3: Add Decrease/Increase Logic
**File:** `app/(app)/(tabs)/(home)/index.tsx`
**Goal:** Update usage count on swipe
**Status:** ✅ Completed

```typescript
import { runOnJS } from 'react-native-reanimated';

const decreaseUsage = () => {
  setUsageCount(prev => Math.max(0, prev - 1));
};

const increaseUsage = () => {
  setUsageCount(prev => prev + 1);
};

const panGesture = Gesture.Pan()
  .onEnd((event) => {
    if (event.translationX < -50) {
      runOnJS(decreaseUsage)();
    }
    if (event.translationX > 50) {
      runOnJS(increaseUsage)();
    }
  });
```

---

### Step 4: Spring Animation - Detailed Breakdown

#### Step 4.1: Setup Reanimated Infrastructure
**Goal:** Add the basic reanimated hooks and shared values
**Test:** Code compiles without errors

**Changes:**
- Import `useSharedValue`, `useAnimatedStyle`, `withSpring` from `react-native-reanimated`
- Import `Animated` from `react-native-reanimated`
- Create `translateX` shared value initialized to 0
- Create `animatedStyle` using `useAnimatedStyle` that returns the transform

**Code Example:**
```typescript
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

// Inside component
const translateX = useSharedValue(0);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ translateX: translateX.value }]
}));
```

#### Step 4.2: Convert View to Animated.View
**Goal:** Make the circle container animatable
**Test:** App still works, no visual changes yet

**Changes:**
- Wrap the Pressable content in an `Animated.View`
- Apply the `animatedStyle` to the Animated.View
- Verify tap and swipe functionality still works

**Code Example:**
```typescript
<GestureDetector gesture={panGesture}>
  <Animated.View style={animatedStyle}>
    <Pressable onPress={handleTapCircle}>
      {/* SVG Circle content */}
    </Pressable>
  </Animated.View>
</GestureDetector>
```

#### Step 4.3: Add Translation Animation (Left Swipe)
**Goal:** Make the circle move left on swipe-left gesture
**Test:** Circle moves left and stays there (doesn't bounce back yet)

**Changes:**
- In the pan gesture's onEnd, when swiping left:
  - Set `translateX.value = -80` to move it left
- Verify the circle slides left when you swipe left

**Code Example:**
```typescript
const panGesture = Gesture.Pan()
  .onEnd((event) => {
    if (event.translationX < -50) {
      translateX.value = -80; // Move left
      runOnJS(decreaseUsage)();
    }
  });
```

#### Step 4.4: Add Spring-Back Animation (Left Swipe)
**Goal:** Make the circle bounce back to center after moving left
**Test:** Circle moves left then springs back to center

**Changes:**
- Replace `translateX.value = -80` with spring animation sequence
- This creates a left-then-back animation sequence

**Code Example:**
```typescript
const panGesture = Gesture.Pan()
  .onEnd((event) => {
    if (event.translationX < -50) {
      translateX.value = withSpring(-80, {}, () => {
        translateX.value = withSpring(0);
      });
      runOnJS(decreaseUsage)();
    }
  });
```

#### Step 4.5: Add Translation Animation (Right Swipe)
**Goal:** Make the circle move right on swipe-right gesture
**Test:** Circle moves right and springs back

**Changes:**
- In the pan gesture's onEnd, when swiping right:
  - Use similar spring animation but with positive value (+80)
- Verify the circle slides right then bounces back

**Code Example:**
```typescript
const panGesture = Gesture.Pan()
  .onEnd((event) => {
    if (event.translationX < -50) {
      translateX.value = withSpring(-80, {}, () => {
        translateX.value = withSpring(0);
      });
      runOnJS(decreaseUsage)();
    }
    if (event.translationX > 50) {
      translateX.value = withSpring(80, {}, () => {
        translateX.value = withSpring(0);
      });
      runOnJS(increaseUsage)();
    }
  });
```

#### Step 4.6: Synchronize State Updates with Animation
**Goal:** Ensure usage count updates happen at the right time
**Test:** Count changes feel natural with the animation

**Changes:**
- Consider moving `runOnJS` calls to happen mid-animation or after
- May use the spring callback to trigger state update at peak of animation
- Options:
  - Call immediately (current)
  - Call at animation peak (in first spring callback)
  - Call after full animation completes (in final spring callback)

**Code Example (Update at Animation Peak):**
```typescript
const panGesture = Gesture.Pan()
  .onEnd((event) => {
    if (event.translationX < -50) {
      translateX.value = withSpring(-80, {}, () => {
        runOnJS(decreaseUsage)(); // Update here at peak
        translateX.value = withSpring(0);
      });
    }
  });
```

---

## Step 5: Fine-tuning

### Animation Parameters

**Spring Configuration:**
```typescript
const springConfig = {
  damping: 15,      // Controls oscillation (lower = more bouncy)
  stiffness: 150,   // Controls speed (higher = faster)
  mass: 1,          // Controls weight feel (higher = heavier)
  overshootClamping: false, // Allow overshoot for natural feel
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
};

translateX.value = withSpring(80, springConfig);
```

**Threshold Tuning:**
- Current: 50px horizontal movement
- Consider device size and user comfort
- Test on actual devices for feel
- May increase to 60-80px for more deliberate swipes

**Translation Distance:**
- Current: ±80px
- Adjust based on visual feedback needs
- Larger = more obvious, smaller = more subtle

---

## Technical Notes

### Gesture Structure Best Practices
```typescript
const panGesture = Gesture.Pan()
  .onEnd((event) => {
    // All logic here runs in worklet context
    // Use runOnJS() for React state updates
  });
```

### Animation Structure
```typescript
const translateX = useSharedValue(0);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ translateX: translateX.value }]
}));
```

### Gesture Detector Wrapping Pattern
```typescript
<GestureDetector gesture={panGesture}>
  <Animated.View style={animatedStyle}>
    <Pressable onPress={handleAction}>
      {/* Your content */}
    </Pressable>
  </Animated.View>
</GestureDetector>
```

---

## Status Logic

### Sponge Health Status Hierarchy
```typescript
const getStatusInfo = (count: number, score: number) => {
  if (count === 0) return { text: "Brand New", color: "#00FF88" };
  if (count >= 1 && count <= 5) return { text: "New", color: "#00FF88" };
  if (score >= 70) return { text: "Optimal", color: "#0ACF97" };
  if (score >= 50) return { text: "Good", color: "#00D9FF" };
  if (score >= 30) return { text: "Fair", color: "#FFC043" };
  if (score > 0) return { text: "Replace Soon", color: "#FF6B9D" };
  return { text: "Replace", color: "#FF6B9D" };
};
```

**Status Colors:**
- Brand New / New: `#00FF88` (bright green)
- Optimal: `#0ACF97` (green)
- Good: `#00D9FF` (cyan)
- Fair: `#FFC043` (yellow)
- Replace Soon / Replace: `#FF6B9D` (pink)

---

## Testing Checklist

### Gesture Testing
- [ ] Tap increases usage count
- [ ] Swipe left decreases usage count (min: 0)
- [ ] Swipe right increases usage count
- [ ] Console logs show correct translation values
- [ ] No gesture conflicts with ScrollView
- [ ] Works on both iOS and Android
- [ ] Works on web (if applicable)

### Animation Testing
- [ ] Circle translates left smoothly
- [ ] Circle springs back to center
- [ ] Circle translates right smoothly
- [ ] Animation feels natural and responsive
- [ ] No lag or jank during animation
- [ ] State updates synchronize well with animation

### Visual Testing
- [ ] Status text updates correctly
- [ ] Colors change appropriately
- [ ] Health score circle updates
- [ ] No layout shifts during animation
- [ ] Looks good on different screen sizes

---

## Performance Considerations

1. **Worklet Performance:**
   - Keep gesture handlers lightweight
   - Avoid heavy calculations in worklet context
   - Use `'worklet'` directive when needed

2. **Animation Performance:**
   - React Native Reanimated runs on UI thread
   - 60 FPS target for smooth animations
   - Monitor using React DevTools Performance

3. **State Management:**
   - Minimize state updates during animation
   - Batch updates when possible
   - Use `runOnJS` sparingly

---

## Future Enhancements

- Add haptic feedback using `expo-haptics`
- Add sound effects on swipe
- Add visual indicator (arrow/swipe hint) for first-time users
- Implement undo functionality
- Add swipe velocity detection for faster animations
- Persist usage count to storage
- Add history tracking and analytics

