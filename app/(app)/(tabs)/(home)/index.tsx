import { useState, useEffect } from "react";
import { StyleSheet, Pressable, View, ScrollView } from "react-native";
import { useNavigation } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/providers/ctx";
import Svg, { Circle } from "react-native-svg";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { signOut } = useSession();
  
  // State declarations
  const [usageCount, setUsageCount] = useState(23);
  const [daysActive, setDaysActive] = useState(12);
  const [showSettings, setShowSettings] = useState(false);
  
  // Calculate health score (100% at 0 uses, decreases by 1.5% per use)
  const healthScore = Math.max(0, Math.min(100, 100 - (usageCount * 1.5)));
  
  // Determine status and color based on usage count and score
  const getStatusInfo = (count: number, score: number) => {
    if (count === 0) return { text: "Brand New", color: "#00FF88" };
    if (count >= 1 && count <= 5) return { text: "New", color: "#00FF88" };
    if (score >= 70) return { text: "Optimal", color: "#0ACF97" };
    if (score >= 50) return { text: "Good", color: "#00D9FF" };
    if (score >= 30) return { text: "Fair", color: "#FFC043" };
    if (score > 0) return { text: "Replace Soon", color: "#FF6B9D" };
    return { text: "Replace", color: "#FF6B9D" };
  };
  
  const status = getStatusInfo(usageCount, healthScore);
  
  // Calculate circle parameters for SVG
  const size = 200;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (healthScore / 100) * circumference;

  // Animation setup
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  useEffect(() => {
    navigation.setOptions({ 
      headerShown: true,
      headerTitle: "SPONGE TRACKER",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#0B0E1A",
      },
      headerTintColor: "#FFFFFF",
      headerRight: () => null,
      headerLeft: () => (
        <Pressable 
          onPress={() => setShowSettings(!showSettings)}
          style={{ paddingLeft: 16, paddingTop: 4 }}
        >
          <View style={{ gap: 4 }}>
            <View style={{ width: 24, height: 2, backgroundColor: "#FFFFFF" }} />
            <View style={{ width: 24, height: 2, backgroundColor: "#FFFFFF" }} />
            <View style={{ width: 24, height: 2, backgroundColor: "#FFFFFF" }} />
          </View>
        </Pressable>
      ),
    });
  }, [navigation, showSettings]);

  const handleTapCircle = () => {
    setUsageCount(prev => prev + 1);
    // Add haptic feedback here later
  };

  const decreaseUsage = () => {
    setUsageCount(prev => Math.max(0, prev - 1));
    console.log('Usage decreased');
  };

  const increaseUsage = () => {
    setUsageCount(prev => prev + 1);
    console.log('Usage increased');
  };

  // Pan gesture for swipe detection
  const panGesture = Gesture.Pan()
    .onEnd((event) => {
      // Check if user swiped left (negative X translation)
      if (event.translationX < -50 && usageCount > 0) {
        console.log('Swiped left! Translation:', event.translationX);
        // Animate left then spring back to center with faster config
        const outwardConfig = {
          damping: 200,
          stiffness: 2000,
        };
        const returnConfig = {
          damping: 200,
          stiffness: 2000,
        };
        translateX.value = withSpring(-80, outwardConfig, () => {
          translateX.value = withSpring(0, returnConfig);
        });
        runOnJS(decreaseUsage)();
      }
      // Check if user swiped right (positive X translation)
      if (event.translationX > 50) {
        console.log('Swiped right! Translation:', event.translationX);
        runOnJS(increaseUsage)();
      }
    });

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <ThemedView style={styles.content}>

          {/* Stats Badges */}
          <View style={styles.statsBadges}>
            <View style={styles.badge}>
              <View style={styles.badgeContent}>
                <ThemedText style={styles.badgeNumber}>{usageCount}</ThemedText>
                <ThemedText style={styles.badgeLabel}>usage</ThemedText>
              </View>
            </View>
            <View style={styles.badge}>
              <View style={styles.badgeContent}>
                <ThemedText style={styles.badgeNumber}>{daysActive}</ThemedText>
                <ThemedText style={styles.badgeLabel}>days</ThemedText>
              </View>
            </View>
          </View>

          {/* Main Health Score Card */}
          <View style={styles.healthCard}>
          <ThemedText style={styles.cardTitle}>CURRENT SPONGE HEALTH</ThemedText>
          
          {/* Circular Progress with SVG - Tappable & Swipeable */}
          <GestureDetector gesture={panGesture}>
            <Animated.View style={animatedStyle}>
              <Pressable 
                onPress={handleTapCircle}
                style={styles.circleContainer}
              >
                <Svg width={size} height={size}>
                  {/* Background circle */}
                  <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#1A1F3A"
                    strokeWidth={strokeWidth}
                    fill="none"
                  />
                  {/* Progress circle */}
                  <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={status.color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={`${progress} ${circumference}`}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${size / 2}, ${size / 2}`}
                  />
                </Svg>
                
                {/* Status text only in center */}
                <View style={styles.scoreTextContainer}>
                  <ThemedText style={[styles.statusTextLarge, { color: status.color }]}>
                    {status.text}
                  </ThemedText>
                </View>
              </Pressable>
            </Animated.View>
          </GestureDetector>

          {/* Instruction Text */}
          <ThemedText style={styles.instructionText}>
            Tap or swipe right to increase • Swipe left to decrease
          </ThemedText>
        </View>

      </ThemedView>
    </ScrollView>

    {/* Settings Sidebar */}
    {showSettings && (
      <>
        {/* Overlay background */}
        <Pressable 
          style={styles.sidebarOverlay}
          onPress={() => setShowSettings(false)}
        />
        
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {/* Menu Items - empty for now, future items go here */}
          <View style={styles.menuItems}>
            {/* Future menu items */}
          </View>
          
          {/* Log Out at bottom */}
          <Pressable 
            onPress={() => {
              setShowSettings(false);
              signOut();
            }}
            style={styles.menuItem}
          >
            <ThemedText style={styles.menuItemText}>Log Out</ThemedText>
          </Pressable>
        </View>
      </>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#0B0E1A",
  },
  container: {
    flex: 1,
    backgroundColor: "#0B0E1A",
  },
  content: {
    flex: 1,
    backgroundColor: "#0B0E1A",
    padding: 16,
  },
  healthCard: {
    backgroundColor: "#151B2E",
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 12,
    letterSpacing: 1,
    color: "#8B92B0",
    marginBottom: 24,
  },
  circleContainer: {
    position: "relative",
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  scoreTextContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 160,
  },
  statusTextLarge: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 32,
  },
  statsBadges: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
    marginBottom: 24,
  },
  badge: {
    backgroundColor: "#1A2332",
    borderRadius: 50,
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A3442",
  },
  badgeContent: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  badgeNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    lineHeight: 28,
    marginTop: -5,
  },
  badgeLabel: {
    fontSize: 11,
    color: "#8B92B0",
    marginTop: -3,
  },
  instructionText: {
    fontSize: 12,
    color: "#8B92B0",
    textAlign: "center",
    marginTop: 16,
  },
  sidebarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 80,
    width: 280,
    backgroundColor: "#151B2E",
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 40,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    justifyContent: "space-between",
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 32,
  },
  menuItems: {
    width: "100%",
    flex: 1,
  },
  menuItem: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#2A3442",
  },
  menuItemText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});
