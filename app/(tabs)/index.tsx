import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Admin Dashboard</ThemedText>
        {/* Open the upload page for creating a new hairstyle */}
        <Link href="/hairstyles-upload">
            <ThemedText type="link">Go to hairstyle upload form</ThemedText>
        </Link>
        {/* Open the edit page for updating an existing hairstyle */}
        <Link href="/hairstyles-edit">
            <ThemedText type="link">Go to hairstyle edit form</ThemedText>
        </Link>
        {/* Open the delete page for removing a hairstyle */}
        <Link href="/hairstyles-delete">
            <ThemedText type="link">Go to hairstyle delete form</ThemedText>
        </Link>
      </ThemedView>

      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
