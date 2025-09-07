import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../../../context/LanguageContext';
import './OrderTrackingModal.scss';

const OrderTrackingModal = ({ order, onClose }) => {
    const { t } = useLanguage();
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [driverMarker, setDriverMarker] = useState(null);
    const [destinationMarker, setDestinationMarker] = useState(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [mapError, setMapError] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (false) {
            loadGoogleMapsScript();
        } else {
            initializeMockMap();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (map && map.updateInterval) {
                clearInterval(map.updateInterval);
            }
        };
    }, []);

    const loadGoogleMapsScript = () => {
        // Add your Google Maps API key here
        const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual API key

        if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY') {
            console.warn('No valid Google Maps API key provided, using mock map');
            setMapError(true);
            initializeMockMap();
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            if (window.google && window.google.maps) {
                setIsMapLoaded(true);
                initializeMap();
            } else {
                console.error('Google Maps failed to load properly');
                setMapError(true);
                initializeMockMap();
            }
        };
        script.onerror = () => {
            console.error('Failed to load Google Maps script');
            setMapError(true);
            initializeMockMap();
        };
        document.head.appendChild(script);
    };

    const initializeMap = () => {
        if (!mapRef.current || !window.google || !window.google.maps) {
            console.error('Google Maps not available, falling back to mock map');
            setMapError(true);
            initializeMockMap();
            return;
        }

        try {
            const { lat, lng } = order.driverLocation;

            // Create map centered on driver location
            const googleMap = new window.google.maps.Map(mapRef.current, {
                zoom: 13,
                center: { lat, lng },
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
            });

            setMap(googleMap);

            // Add driver marker
            const driverIcon = {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" fill="#4285F4" stroke="white" stroke-width="3"/>
                        <circle cx="20" cy="20" r="8" fill="white"/>
                        <path d="M20 12l3 6h-6z" fill="#4285F4"/>
                    </svg>
                `),
                scaledSize: new window.google.maps.Size(40, 40),
                anchor: new window.google.maps.Point(20, 20),
            };

            const driverMarkerInstance = new window.google.maps.Marker({
                position: { lat, lng },
                map: googleMap,
                title: `Driver: ${order.driverLocation.name}`,
                icon: driverIcon,
            });

            setDriverMarker(driverMarkerInstance);

            // Add destination marker (mock coordinates based on delivery address)
            const destinationLat = lat + 0.01; // Mock destination nearby
            const destinationLng = lng + 0.01;

            const destinationIcon = {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 15 25 15 25s15-16.716 15-25C30 6.716 23.284 0 15 0z" fill="#EA4335"/>
                        <circle cx="15" cy="15" r="8" fill="white"/>
                    </svg>
                `),
                scaledSize: new window.google.maps.Size(30, 40),
                anchor: new window.google.maps.Point(15, 40),
            };

            const destinationMarkerInstance = new window.google.maps.Marker({
                position: { lat: destinationLat, lng: destinationLng },
                map: googleMap,
                title: 'Delivery Address',
                icon: destinationIcon,
            });

            setDestinationMarker(destinationMarkerInstance);

            // Draw route between driver and destination
            const directionsService = new window.google.maps.DirectionsService();
            const directionsRenderer = new window.google.maps.DirectionsRenderer({
                suppressMarkers: true, // We're using custom markers
                polylineOptions: {
                    strokeColor: '#4285F4',
                    strokeWeight: 4,
                    strokeOpacity: 0.8,
                },
            });

            directionsRenderer.setMap(googleMap);

            directionsService.route({
                origin: { lat, lng },
                destination: { lat: destinationLat, lng: destinationLng },
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === 'OK') {
                    directionsRenderer.setDirections(result);
                }
            });

            // Simulate driver movement (update every 5 seconds)
            const interval = setInterval(() => {
                simulateDriverMovement(driverMarkerInstance, googleMap);
            }, 5000);

            // Store interval for cleanup
            intervalRef.current = interval;
            googleMap.updateInterval = interval;
        } catch (error) {
            console.error('Error initializing Google Maps:', error);
            setMapError(true);
            initializeMockMap();
        }
    };

    const initializeMockMap = () => {
        // Fallback mock map when Google Maps fails to load or for demo
        setIsMapLoaded(true);
        if (mapRef.current) {
            mapRef.current.innerHTML = `
                <div class="mock-map">
                    <div class="mock-driver-marker" style="top: 40%; left: 30%;">
                        <div class="driver-icon">🚗</div>
                        <div class="driver-name">${order.driverLocation.name}</div>
                    </div>
                    <div class="mock-destination-marker" style="top: 60%; left: 70%;">
                        <div class="destination-icon">📍</div>
                        <div class="destination-label">Your Address</div>
                    </div>
                    <div class="mock-route"></div>
                    <div class="mock-map-notice">Demo Map - Interactive tracking simulation</div>
                </div>
            `;

            // Simulate driver movement in mock map
            const driverElement = mapRef.current.querySelector('.mock-driver-marker');
            if (driverElement) {
                const interval = setInterval(() => {
                    const currentTop = parseInt(driverElement.style.top) || 40;
                    const currentLeft = parseInt(driverElement.style.left) || 30;

                    // Move driver slightly towards destination
                    const newTop = Math.min(58, Math.max(38, currentTop + (Math.random() - 0.4) * 3));
                    const newLeft = Math.min(68, Math.max(28, currentLeft + (Math.random() - 0.2) * 3));

                    driverElement.style.top = `${newTop}%`;
                    driverElement.style.left = `${newLeft}%`;
                }, 3000);

                intervalRef.current = interval;
            }
        }
    };

    const simulateDriverMovement = (marker, map) => {
        if (!marker || !map || !marker.getPosition) {
            console.warn('Unable to simulate driver movement: invalid marker or map');
            return;
        }

        try {
            const currentPosition = marker.getPosition();
            if (!currentPosition) {
                console.warn('Unable to get current position');
                return;
            }

            const lat = currentPosition.lat();
            const lng = currentPosition.lng();

            // Move driver slightly towards destination
            const newLat = lat + (Math.random() - 0.5) * 0.001;
            const newLng = lng + (Math.random() - 0.5) * 0.001;

            marker.setPosition({ lat: newLat, lng: newLng });

            // Center map on new position
            if (map.panTo) {
                map.panTo({ lat: newLat, lng: newLng });
            }
        } catch (error) {
            console.error('Error in driver movement simulation:', error);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    const formatAddress = (address) => {
        return `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="tracking-modal">
                <div className="modal-header">
                    <h4>{t('myAccount.orderTracking.modal.title')} - {order.id}</h4>
                    <button className="close-btn" onClick={onClose}>
                        <span>&times;</span>
                    </button>
                </div>

                <div className="modal-content">
                    <div className="tracking-info">
                        <div className="driver-info">
                            <h5>{t('myAccount.orderTracking.modal.driverInfo')}</h5>
                            <p><strong>{t('myAccount.orderTracking.modal.driverName')}:</strong> {order.driverLocation.name}</p>
                            <p><strong>{t('myAccount.orderTracking.modal.status')}:</strong> {t('myAccount.orderTracking.modal.enRoute')}</p>
                            <p><strong>{t('myAccount.orderTracking.modal.estimatedTime')}:</strong> 15-20 {t('myAccount.orderTracking.modal.minutes')}</p>
                        </div>

                        <div className="delivery-info">
                            <h5>{t('myAccount.orderTracking.modal.deliveryAddress')}</h5>
                            <p>{formatAddress(order.deliveryAddress)}</p>
                        </div>
                    </div>

                    <div className="map-container">
                        <div ref={mapRef} className="tracking-map">
                            {!isMapLoaded && !mapError && (
                                <div className="map-loading">
                                    <div className="loading-spinner"></div>
                                    <p>{t('myAccount.orderTracking.modal.loadingMap')}</p>
                                </div>
                            )}
                            {mapError && !isMapLoaded && (
                                <div className="map-error">
                                    <div className="error-icon">⚠️</div>
                                    <p>Unable to load Google Maps. Using demo map instead.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="tracking-actions">
                        <button className="contact-driver-btn">
                            {t('myAccount.orderTracking.modal.contactDriver')}
                        </button>
                        <button className="view-details-btn">
                            {t('myAccount.orderTracking.modal.viewOrderDetails')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTrackingModal;