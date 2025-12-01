import { useEffect } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { useNavigation } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/providers/ctx";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { signOut } = useSession();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Hello Sponge
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Welcome to your sponge tracking app!
        </ThemedText>
        <Pressable onPress={signOut} style={styles.logoutButton}>
          <ThemedText style={styles.logoutText}>Log Out</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    gap: 20,
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    opacity: 0.7,
  },
  logoutButton: {
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#0a7ea4",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0a7ea4",
  },
});
