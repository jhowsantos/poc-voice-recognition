import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import Voice from '@react-native-community/voice';

const Home = () => {
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');

  useEffect(() => {
    function onSpeechStart(e) {
      console.log('onSpeechStart: ', e);
      setStarted('recording');
    }
    function onSpeechResults(e) {
      console.log('onSpeechResults: ', e);
      setResults(e.value);
    }

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecognizing = async () => {
    setPitch('');
    setError('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
    setEnd('');

    try {
      await Voice.start('pt-BR');
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInfosCEP}>
        <Text style={styles.title}>
          {started === ''
            ? 'Toque no botão para falar e pesquisar pelo seu CEP'
            : 'Informações do CEP informado'}
        </Text>

        <ScrollView>
          {partialResults.map((result, index) => {
            return (
              <Text
                key={`partial-result-${index}`}
                style={styles.partialResult}>
                {result}
              </Text>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={startRecognizing}
          onPressOut={stopRecognizing}>
          <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
            }}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingTop: 35,
  },
  containerInfosCEP: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#FFF',
  },
  containerButton: {
    flex: 1.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 170,
    height: 170,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#aa00aa',
    borderWidth: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 22,
    color: '#aa00aa',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default Home;
