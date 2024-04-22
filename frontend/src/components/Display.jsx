import React, { useEffect, useState } from 'react';
import { LoadScript, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import InfoWindow from './InfoWindow';
import Navbar from './Navbar';
import { jwtDecode } from 'jwt-decode';

const Display = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isFilled, setIsFilled] = useState(false); // State variable to track if the form is filled
  const [isAdmin, setIsAdmin] = useState(false); // State variable to track if the user is an admin
  const [directions, setDirections] = useState(null); // State variable to hold the directions

  useEffect(() => {
    // Check if the form is filled
    const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
    if (token) {
      const decodedToken = jwtDecode(token.split('=')[1]);
      setIsFilled(decodedToken.isFilled); // Set isFilled based on the token
      setIsAdmin(decodedToken.isAuthor); // Set isAdmin based on the token
    }
  }, []);

  useEffect(() => {
    if (isFilled || isAdmin) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCurrentPosition({ lat: lat, lng: lng });

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
    }
  }, [isFilled || isAdmin]);

  useEffect(() => {
    if (selectedHospital && currentPosition) {
      const origin = currentPosition;
      const destination = selectedHospital;

      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: 'DRIVING',
        },
        (result, status) => {
          if (status === 'OK') {
            setDirections(result);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [selectedHospital, currentPosition]);

  const fetchNearbyHospitals = async (lat, lng) => {
    // Fetch nearby hospitals
    try {
      const response = await fetch(`/api/hospitals/nearbyhospitals?lat=${lat}&lng=${lng}`);
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
    // Calculate distance between two coordinates
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

  const deg2rad = (deg) => {
    // Convert degrees to radians
    return deg * (Math.PI / 180);
  };

  return (
    <div>
      <Navbar />
      {isFilled || isAdmin ? (
        <div style={{ height: '700px', width: '100%' }}>
          <LoadScript
            googleMapsApiKey='AIzaSyAY9Gd3Ta9LSN4fROtwzBDe4dHjB3Yn0Qk'
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

                {/* Render directions if available */}
                {directions && (
                  <DirectionsRenderer
                    directions={directions}
                    options={{ suppressMarkers: true }}
                  />
                )}
              </GoogleMap>
            )}
          </LoadScript>
        </div>
      ) : (
        <div>
          <h2>Please fill the form first</h2>
          {/* You can add a link to the form here if needed */}
        </div>
      )}
    </div>
  );
};

export default Display;
