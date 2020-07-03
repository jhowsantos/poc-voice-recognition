import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 35,
  },
  containerInfosCEP: {
    flex: 1,
    width: width,
    backgroundColor: '#FFF',
  },
  containerButton: {
    flex: 1.5,
    width: width,
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
    marginBottom: 25,
  },
  containerDataAddress: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  containerLabel: {
    flex: 1,
    marginLeft: 35,
  },
  label: {
    fontSize: 16,
    textAlign: 'auto',
  },
  containerTextDataAddress: {
    flex: 1,
    paddingLeft: 25,
  },
  textDataAddress: {
    fontSize: 16,
    textAlign: 'auto',
    color: '#aa00aa',
    fontWeight: 'bold',
  },
});

export default styles;
