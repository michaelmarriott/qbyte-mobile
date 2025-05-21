import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { AuthContext } from '../App';

const HomeScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>QByte Dashboard</Text>
          <Text style={styles.subtitle}>Welcome to the QByte Mobile App</Text>
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('QByte')}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>QByte Processing</Text>
              <Text style={styles.cardDescription}>
                Start a new QByte process and visualize quantum data in real-time
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Recent Sessions</Text>
              <Text style={styles.cardDescription}>
                No recent sessions found. Start a new QByte process to begin.
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>System Status</Text>
              <Text style={styles.cardDescription}>
                QByte API: Online
              </Text>
              <Text style={styles.cardDescription}>
                Last Connection: N/A
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => signOut()}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 5,
  },
  logoutButton: {
    backgroundColor: '#444',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
