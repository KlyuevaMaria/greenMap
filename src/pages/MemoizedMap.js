import React, { useEffect, useState, useRef } from 'react';
import { load } from '@2gis/mapgl';
import AddTreeButton from '../components/AddTreeButton';
import AddTreeForm from '../components/AddTreeForm';

import { fetchTrees } from '../store/treeSlice';
import { useDispatch, useSelector } from 'react-redux';

const MapWrapper = React.memo(
    ({ mapWidth }) => {
        return <div id="map-container" style={{ width: mapWidth, height: '100%' }}></div>;
    },
    (prevProps, nextProps) => prevProps.mapWidth === nextProps.mapWidth
);

const Map = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [mapWidth, setMapWidth] = useState('100%');
    const [markerCoordinates, setMarkerCoordinates] = useState(null);
    const mapInstanceRef = useRef(null);
    const markerRef = useRef(null);
    const [mapCenter, setMapCenter] = useState([40.3949328, 56.1264340]);

    const { trees } = useSelector((state) => state.trees);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrees()); 
        let map;

        load().then(() => {
            const mapglAPI = window.mapgl;

            map = new mapglAPI.Map('map-container', {
                center: mapCenter,
                zoom: 15,
                key: '357d238a-a536-451a-a447-b2cec9e95b41',
            });

            mapInstanceRef.current = map;

            map.on('click', (event) => {
                const coordinates = event.lngLat;

                if (markerRef.current) {
                    markerRef.current.destroy();
                }
                markerRef.current = new mapglAPI.Marker(map, {
                    coordinates: [coordinates[0], coordinates[1]],
                });
                mapInstanceRef.current.setCenter(coordinates);
                setMapCenter(coordinates);
                setMarkerCoordinates(coordinates);
            });

            // Отрисовка маркеров для всех деревьев
            trees.forEach(tree => {
                new mapglAPI.Marker(map, {
                    coordinates: [tree.longitude, tree.latitude],
                    icon: 'https://docs.2gis.com/img/mapgl/marker.svg',
                });
            });
        });
        return () => {
              if (markerRef.current) {
                markerRef.current.remove();
              }
            if (map) {
                map.destroy();
            }
        };
    }, [dispatch]);

    // Отрисовка маркеров для всех деревьев
    useEffect(() => {
        if (mapInstanceRef.current && trees.length > 0) {
            // Удаление старых маркеров (если нужно)
            // Здесь можно добавить логику для удаления предыдущих маркеров

            trees.forEach(tree => {
                new window.mapgl.Marker(mapInstanceRef.current, {
                    coordinates: [tree.longitude, tree.latitude],
                    icon: 'https://docs.2gis.com/img/mapgl/marker.svg'
                });
            });
        }
    }, [trees]);

    const handleButtonClick = () => {
        let coordinatesToUse;
         if (markerRef.current) {
            coordinatesToUse = markerRef.current.getCoordinates();
         } else {
            coordinatesToUse = mapCenter;
         }

        setMarkerCoordinates(coordinatesToUse);

         setMapWidth('70%');

        if (mapInstanceRef.current) {
            const map = mapInstanceRef.current;
           requestAnimationFrame(() => {
                map.invalidateSize();
                 requestAnimationFrame(() => {
                    map.setCenter(coordinatesToUse);
                });
            });
        }

       setTimeout(() => {
           setIsFormVisible(true);
        }, 0);

    };

    const handleFormClose = () => {
        setIsFormVisible(false);
        setMapWidth('100%');

       if (mapInstanceRef.current) {
           const map = mapInstanceRef.current;
           requestAnimationFrame(() => {
                map.invalidateSize();
               requestAnimationFrame(() => {
                   map.setCenter(mapCenter);
               });
           });
        }
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative' }}>
            <div style={{ flex: 1 }}>
                <MapWrapper mapWidth={mapWidth} />
            </div>
            <AddTreeButton onClick={handleButtonClick} style={{ position: 'absolute', zIndex: 2, left: '10px', top: '10px' }} />
             {isFormVisible && (
                <div style={{ width: '30%', position: 'absolute', right: 0, top: 0, bottom: 0, background: 'white' }}>
                    <AddTreeForm
                        onClose={handleFormClose}
                        initialCoordinates={markerCoordinates}
                    />
                </div>
            )}
        </div>
    );
};

export default Map;
