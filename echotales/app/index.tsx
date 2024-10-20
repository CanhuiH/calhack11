import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook

interface Story {
  id: string;
  title: string;
  image: any; // Use local images or external URLs
}

const stories: Story[] = [
  {
    id: '1',
    title: "Goldilocks and the Three Bears",
    image: require('../assets/images/bears.jpg'),
  },
  {
    id: '2',
    title: 'The Ugly Duckling',
    image: require('../assets/images/duck.jpg'),
  },
  {
    id: '3',
    title: 'The Three Little Pigs',
    image: require('../assets/images/pig.jpg'),
  },
  {
    id: '4',
    title: 'Little Red Riding Hood',
    image: require('../assets/images/red.jpg'),
  },
];

const LibraryPage: React.FC = () => {
  const navigation = useNavigation(); // Hook to navigate between screens

  const handleCardPress = () => {
    navigation.navigate('playing'); // Navigate to the PlayingPage without any specific story data
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Echo Tales</Text>
      <View style={styles.grid}>
        {stories.map((story) => (
          <TouchableOpacity
            key={story.id}
            style={styles.card}
            onPress={handleCardPress} // Navigate to PlayingPage when a card is pressed
          >
            <Image source={story.image} style={styles.storyImage} />
            <Text style={styles.storyTitle}>{story.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F4F3F9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A259FF',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Space between the cards
  },
  card: {
    width: '48%', // Adjust width to show two cards per row
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    height: 220, // Fixed height for consistent layout
  },
  storyImage: {
    width: '100%', // Make the image fill the card's width
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A259FF',
    textAlign: 'center',
  },
});

export default LibraryPage;