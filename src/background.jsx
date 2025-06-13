const getBackgroundImage = (weatherType) => {
  switch (weatherType?.toLowerCase()) {
    case 'clear':
      return require('../assets/clear.jpg');
    case 'clouds':
      return require('../assets/cloud.jpg');
    case 'rain':
      return require('../assets/rain.jpg');
    case 'thunderstorm':
      return require('../assets/Thunder.jpg');
    case 'snow':
      return require('../assets/snow.jpg');
    default:
      return require('../assets/default.jpg'); // fallback image
  }
};

export default getBackgroundImage;
