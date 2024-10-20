import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av'; // Import Audio from expo-av

const PlayingPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null); // Track sound object
  const [currentAudio, setCurrentAudio] = useState<string | null>(null); // Track current audio file

  // Function to play or pause the audio
  const togglePlay = async (audioFile: string) => {
    try {
      // If the same audio is clicked again, toggle play/pause
      if (isPlaying && sound && audioFile === currentAudio) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        if (sound) {
          await sound.unloadAsync(); // Unload the previous audio file
        }
        // Load the new sound from assets and play it
        const { sound: newSound } = await Audio.Sound.createAsync(audioFile);
        setSound(newSound);
        await newSound.playAsync();
        setIsPlaying(true);
        setCurrentAudio(audioFile); // Update current playing audio
      }
    } catch (error) {
      console.error("Error playing audio", error);
    }
  };

  // Clean up the audio when the component unmounts
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <ScrollView style={styles.container}>
      {/* Upper Part: Story Title and Cover */}
      <View style={styles.playerContainer}>
        <Text style={styles.storyTitle}>Goldilocks and the Three Bears</Text>
        <Image source={require('../assets/images/bears.jpg')} style={styles.storyImage} />

        {/* Playback Controls */}
        <View style={styles.controls}>
          <TouchableOpacity>
            <MaterialIcons name="fast-rewind" size={40} color="#A259FF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlay(require('../assets/audios/original.mp3'))}>
            <MaterialIcons name={isPlaying ? 'pause' : 'play-arrow'} size={40} color="#A259FF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="fast-forward" size={40} color="#A259FF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lower Part: AI Voice Cast */}
      <View style={styles.voiceCastContainer}>
        <Text style={styles.aiCastHeader}>Voice Cast</Text>

        <View style={styles.voiceCastGrid}>
          <View style={styles.voiceCard}>
            <Image source={require('../assets/images/dad.png')} style={styles.voiceImage} />
            <Text style={styles.voiceName}>Dad</Text>
            <TouchableOpacity
              style={styles.customizeButton}
              onPress={() => togglePlay(require('../assets/audios/dad.mp3'))} // Tinkerbell's voice
            >
              <Text style={styles.customizeText}>Play</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.voiceCard}>
            <Image source={require('../assets/images/sis.png')} style={styles.voiceImage} />
            <Text style={styles.voiceName}>Sister</Text>
            <TouchableOpacity
              style={styles.customizeButton}
              onPress={() => togglePlay(require('../assets/audios/sis.mp3'))} // Professor Hoot's voice
            >
              <Text style={styles.customizeText}>Play</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F3F9',
  },
  playerContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center', // Center the image and text
  },
  storyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A259FF',
    textAlign: 'center',
    marginBottom: 20,
  },
  storyImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '60%', // Adjust width for consistent spacing of controls
  },
  voiceCastContainer: {
    padding: 20,
    backgroundColor: '#F4F3F9',
  },
  aiCastHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A259FF',
    marginBottom: 20,
    textAlign: 'center',
  },
  voiceCastGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  voiceCard: {
    alignItems: 'center',
    width: 150,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  voiceImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  voiceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A259FF',
  },
  voiceRole: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  customizeButton: {
    backgroundColor: '#A259FF',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  customizeText: {
    color: '#FFF',
    fontSize: 14,
  },
});

export default PlayingPage;