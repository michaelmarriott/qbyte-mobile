import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert
} from 'react-native';

const QByteScreen = ({ navigation }) => {
  const [mode, setMode] = useState('static');
  const [remarks, setRemarks] = useState('CustomRun');
  const [continuous, setContinuous] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartProcess = async () => {
    if (!remarks) {
      Alert.alert('Error', 'Please enter remarks for this run');
      return;
    }

    setIsLoading(true);
    
    try {
      // Navigate to visualization screen with the parameters
      navigation.navigate('QByteVisualization', {
        mode,
        remarks,
        continuous,
        apiUrl: 'qbyteapi.cloud',
        endpoint: `/api/run_qbyte_headless?mode=${mode}&remarks=${remarks}&continuous=${continuous}`
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to start QByte process');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>QByte Processing</Text>
        <Text style={styles.subtitle}>Configure and start a new QByte process</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Process Configuration</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mode</Text>
          <View style={styles.modeSelector}>
            <TouchableOpacity
              style={[styles.modeButton, mode === 'static' && styles.modeButtonActive]}
              onPress={() => setMode('static')}
            >
              <Text style={[styles.modeButtonText, mode === 'static' && styles.modeButtonTextActive]}>
                Static
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.modeButton, mode === 'dynamic' && styles.modeButtonActive]}
              onPress={() => setMode('dynamic')}
            >
              <Text style={[styles.modeButtonText, mode === 'dynamic' && styles.modeButtonTextActive]}>
                Dynamic
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Remarks</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter remarks for this run"
            placeholderTextColor="#888"
            value={remarks}
            onChangeText={setRemarks}
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Continuous Mode</Text>
            <Switch
              trackColor={{ false: '#444', true: '#7B68EE' }}
              thumbColor={continuous ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#444"
              onValueChange={setContinuous}
              value={continuous}
            />
          </View>
          <Text style={styles.helperText}>
            Continuous mode will stream data indefinitely until you stop the process
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.startButton, isLoading && styles.startButtonDisabled]}
          onPress={handleStartProcess}
          disabled={isLoading}
        >
          <Text style={styles.startButtonText}>
            {isLoading ? 'Starting...' : 'Start QByte Process'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>About QByte Processing</Text>
        <Text style={styles.infoText}>
          QByte processes generate quantum data that can be visualized in real-time.
          The data is streamed from the QByte API and displayed as a graph showing
          bit sums and cumulative deviation over time.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  header: {
    padding: 20,
    marginBottom: 10,
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
  formContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 20,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#ddd',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 15,
    color: '#fff',
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 5,
    overflow: 'hidden',
  },
  modeButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  modeButtonActive: {
    backgroundColor: '#7B68EE',
  },
  modeButtonText: {
    color: '#ddd',
    fontWeight: '500',
  },
  modeButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helperText: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
  },
  startButton: {
    backgroundColor: '#7B68EE',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  startButtonDisabled: {
    backgroundColor: '#555',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 20,
    margin: 15,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  infoText: {
    color: '#bbb',
    lineHeight: 20,
  },
});

export default QByteScreen;
