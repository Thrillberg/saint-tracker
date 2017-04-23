module.exports = {
  rijksmuseumUrl: `https://www.rijksmuseum.nl/api/en/collection?title=saint&imgonly=True&ps=50&key=${process.env.RIJKSMUSEUM_KEY}&format=json`,
  googleGeocoder: (city) => { return `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GOOGLE_GEOCODER_KEY}` }
}
