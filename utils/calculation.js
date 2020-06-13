//https://www.latlong.net/place/london-the-uk-14153.html London coords.
//https://www.movable-type.co.uk/scripts/latlong.html Calculating distance between lat/long coords (Haversine formula).
        
function getDistanceBetweenTwoCoordinates(lat1,lon1,lat2,lon2){
    const radius = 6371;
  
    var dLat = ConvertToRadian(lat2-lat1); 
    var dLon = ConvertToRadian(lon2-lon1); 
  
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(ConvertToRadian(lat1)) * Math.cos(ConvertToRadian(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = radius * c;
    return d;
  }
  
  const ConvertToRadian = (degrees) => {
    return degrees * (Math.PI/180)
  }

  module.exports = { getDistanceBetweenTwoCoordinates };