import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Image,
} from 'react-native';
import Voice from '@react-native-community/voice';

import styles from './styles';

const Home = () => {
  const [cepVoice, setCepVoice] = useState('');
  const [dataAddress, setDataAddress] = useState({});
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    function onSpeechStart(e) {
      console.log('onSpeechStart: ', e);
      setAnimate(true);
    }

    function onSpeechResults(e) {
      console.log('onSpeechResults: ', e);
      setCepVoice(e.value[0]);
    }

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecognizing = async () => {
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

  const getAddressData = async () => {
    const cep = cepVoice.trim();

    await fetch(`https://api.pagar.me/1/zipcodes/${cep}`, {method: 'get'})
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }

        if (!res.ok && cep.length > 0) {
          alert('CEP inválido');
          stopRecognizing();
          setAnimate(false);
        }

        if (!res.ok && cep.length === 0) {
          setDataAddress({});
          stopRecognizing();
          setAnimate(false);
        }
      })
      .then((res) => {
        if (res !== undefined) {
          console.log(res);
          setDataAddress(res);
          stopRecognizing();
          setAnimate(false);
        }
      });
  };

  return (
    <View style={styles.container}>
      {cepVoice === '' && (
        <View style={styles.containerInfosCEP}>
          <Text style={styles.title}>
            Toque no botão para falar e pesquisar pelo seu CEP
          </Text>
        </View>
      )}

      {cepVoice === '' ? (
        <View style={styles.containerInfosCEP}>
          <ActivityIndicator animating={animate} size="large" color="#aa00aa" />
        </View>
      ) : (
        <View style={styles.containerInfosCEP}>
          <Text style={styles.title}>Informações do CEP informado</Text>

          <View style={styles.containerDataAddress}>
            <View style={styles.containerLabel}>
              <Text style={styles.label}>CEP informado:</Text>
            </View>
            <View style={styles.containerTextDataAddress}>
              <Text style={styles.textDataAddress}>{dataAddress.zipcode}</Text>
            </View>
          </View>

          <View style={styles.containerDataAddress}>
            <View style={styles.containerLabel}>
              <Text style={styles.label}>Estado:</Text>
            </View>
            <View style={styles.containerTextDataAddress}>
              <Text style={styles.textDataAddress}>{dataAddress.state}</Text>
            </View>
          </View>

          <View style={styles.containerDataAddress}>
            <View style={styles.containerLabel}>
              <Text style={styles.label}>Cidade:</Text>
            </View>
            <View style={styles.containerTextDataAddress}>
              <Text style={styles.textDataAddress}>{dataAddress.city}</Text>
            </View>
          </View>

          <View style={styles.containerDataAddress}>
            <View style={styles.containerLabel}>
              <Text style={styles.label}>Bairro:</Text>
            </View>
            <View style={styles.containerTextDataAddress}>
              <Text style={styles.textDataAddress}>
                {dataAddress.neighborhood}
              </Text>
            </View>
          </View>

          <View style={styles.containerDataAddress}>
            <View style={styles.containerLabel}>
              <Text style={styles.label}>Rua:</Text>
            </View>
            <View style={styles.containerTextDataAddress}>
              <Text style={styles.textDataAddress}>{dataAddress.street}</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={startRecognizing}
          onPressOut={getAddressData}>
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

export default Home;
