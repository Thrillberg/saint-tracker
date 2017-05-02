module.exports = {
  rijksmuseumUrl: (page) => { return `https://www.rijksmuseum.nl/api/en/collection?title=saint&type=painting&imgonly=True&p=${page}&ps=100&key=${process.env.RIJKSMUSEUM_KEY}&format=json` },
  rijksmuseumDetailUrl: (objectNumber) => { return `https://www.rijksmuseum.nl/api/en/collection/${objectNumber}?key=${process.env.RIJKSMUSEUM_KEY}&format=json` },
  harvardUrl: (page) => { return `http://api.harvardartmuseums.org/object?apikey=${process.env.HARVARD_KEY}&title=saint&hasimage=1&classification=Paintings&fields=people,century,primaryimageurl,title&size=100&page=${page}` },
  googleGeocoder: (city) => { return `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GOOGLE_GEOCODER_KEY}` }
}
