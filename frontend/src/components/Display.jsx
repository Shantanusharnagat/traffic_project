import React, { useEffect, useState } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import InfoWindow from './InfoWindow';
import Navbar from './Navbar';

const Display = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const center = {
          lat,
          lng
        };

        setMap(center);
        
        fetchNearbyHospitals(lat, lng);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchNearbyHospitals = async (lat, lng) => {
    try {
      const response = await fetch(`http://localhost:5000/api/hospitals/nearbyhospitals?lat=${lat}&lng=${lng}`);
      const data = await response.json();

      if (data.length > 0) {
        const sortedHospitals = data
          .map(hospital => {
            const hospitalLat = hospital.geometry.location.lat;
            const hospitalLng = hospital.geometry.location.lng;
            const distance = calculateDistance(lat, lng, hospitalLat, hospitalLng);
            return { ...hospital, distance };
          })
          .sort((a, b) => a.distance - b.distance);

        const closestHospitals = sortedHospitals.slice(0, 10);

        const hospitalLocations = closestHospitals.map(hospital => ({
          lat: hospital.geometry.location.lat,
          lng: hospital.geometry.location.lng,
          name: hospital.name, // Add hospital name to the marker data
          address: hospital.vicinity, // Add hospital address to the marker data
        }));

        setMarkers(hospitalLocations);
      } else {
        console.error('Failed to fetch nearby hospitals:', data.status);
      }
    } catch (error) {
      console.error('Error fetching nearby hospitals:', error);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };
  
  // Function to convert degrees to radians
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  

  return (
    <div>
      <Navbar />
    <div style={{ height: '700px', width: '100%' }}>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      >
        {map && (
          <GoogleMap
            mapContainerStyle={{
              height: '100%',
              width: '100%'
            }}
            zoom={14}
            center={map}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker}
                onClick={() => setSelectedHospital(marker)}
              />
            ))}

            {/* InfoWindow to display hospital information */}
            {selectedHospital && (
              <InfoWindow hospital={selectedHospital} />
            )}
          </GoogleMap>
        )}
      </LoadScript>
    </div>
    </div>
  );
};
export default Display;
