import { SafeAreaView, StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator, Dimensions, } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import getBackgroundImage from './src/background';



const API_KEY = 'd209ab3f9b17e7342af357341572832d';

const { width, height } = Dimensions.get('window');

const scaleFont = (Size) => (width / 375) * Size;
const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city) {
      Alert.alert('Enter a city name');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) {
        Alert.alert('City not found');
        setLoading(false);
        return;
      }
      setWeather(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('./assets/default.jpg')}
        style={styles.background}
        imageStyle={{ opacity:0.7}}
      >

        <View style={styles.contentWrapper}>
          <Text style={[styles.logoText, { transform: [{ translateY: -15 }] }]}>
            Weather <Text style={{ fontSize: scaleFont(15), color: 'lightgray', fontStyle: 'italic' }}>Forecast</Text>
          </Text>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search city"
              placeholderTextColor="#ddd"
              style={styles.input}
              value={city}
              onChangeText={setCity}
            />
            <TouchableOpacity style={styles.searchButton} onPress={getWeather}>
              <Ionicons name="search" size={scaleFont(20)} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Loading indicator */}
          {loading && <ActivityIndicator size="large" color="#fff" />}

          {/* Weather Display */}
          {!loading && weather && (
            <View style={styles.weatherContainer}>
              <Text style={styles.cityText}>
                <Text style={{ fontWeight: 'bold' }}>{weather?.name}</Text>, {weather?.sys?.country}
              </Text>

              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@4x.png`,
                }}
                style={styles.weatherIcon}
              />

              <Text style={styles.tempText}>{Math.round(weather?.main?.temp)}°</Text>
              <Text style={styles.descriptionText}>{weather?.weather?.[0]?.description}</Text>

              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <FontAwesome5 name="wind" size={18} color="#fff" />
                  <Text style={styles.infoText}>{weather?.wind?.speed} m/s</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="water-outline" size={scaleFont(18)} color="#fff" />
                  <Text style={styles.infoText}>{weather?.main?.humidity}%</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="sunny-outline" size={scaleFont(18)} color="#fff" />
                  <Text style={styles.infoText}>
                    {weather?.sys?.sunrise
                      ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5) : '--:--'}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: height * 0.1, // responsive padding top
    paddingHorizontal: width * 0.05, // responsive horizontal padding
  },
  logoText: {
    fontSize: scaleFont(32),
    color: 'white',
    fontWeight: 'condensed',
    textShadowColor: '#000',
    textShadowOffset: { width: 3, height: 1 },
    textShadowRadius: 5,
    marginBottom: scaleFont(20),
    opacity: 0.8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 60,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
    marginBottom: height * 0.06, // responsive margin bottom
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: scaleFont(19),
  },
  searchButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 25,
    marginLeft: 10,
  },
  weatherContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginRight: 4,
  },
  cityText: {
    fontSize: scaleFont(22),
    color: '#fff',
    marginBottom: 10,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
    marginBottom: 10,
    marginLeft: 5,
  },
  tempText: {
    fontSize: scaleFont(30),
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
    marginTop: -3,
  },
  descriptionText: {
    fontSize: scaleFont(18),
    color: '#ccc',
    marginBottom: 30,
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
    padding: 3,
  },
  infoItem: {
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    color: '#fff',
    fontSize: scaleFont(14),
    marginLeft: 7,
  },
});
