/**
 * Map initialization and management for the Urban Design Demo
 */

// Set Mapbox access token
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// Map instances for each intervention
let maps = {
    street: null,
    publicSpace: null,
    campus: null
};

// Track active features for styling
let activeFeatures = {
    street: [],
    publicSpace: [],
    campus: []
};

/**
 * Initialize maps for all interventions
 */
function initMaps() {
    // Initialize Street Frontage map
    maps.street = new mapboxgl.Map({
        container: 'street-map',
        style: INTERVENTIONS.street.mapSettings.style,
        center: INTERVENTIONS.street.mapSettings.center,
        zoom: INTERVENTIONS.street.mapSettings.zoom,
        interactive: true
    });
    
    // Initialize Public Space map
    maps.publicSpace = new mapboxgl.Map({
        container: 'publicspace-map',
        style: INTERVENTIONS.publicSpace.mapSettings.style,
        center: INTERVENTIONS.publicSpace.mapSettings.center,
        zoom: INTERVENTIONS.publicSpace.mapSettings.zoom,
        interactive: true
    });
    
    // Initialize Campus Corridor map
    maps.campus = new mapboxgl.Map({
        container: 'campus-map',
        style: INTERVENTIONS.campus.mapSettings.style,
        center: INTERVENTIONS.campus.mapSettings.center,
        zoom: INTERVENTIONS.campus.mapSettings.zoom,
        interactive: true
    });
    
    // Add navigation controls to all maps
    Object.values(maps).forEach(map => {
        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
    });
    
    // Initialize map layers when styles are loaded
    setupMapEventHandlers();
}

/**
 * Set up event handlers for maps
 */
function setupMapEventHandlers() {
    // Street Frontage map events
    maps.street.on('load', () => {
        initStreetMapLayers();
        
        // Reset view button handler
        document.getElementById('street-map-reset').addEventListener('click', () => {
            maps.street.flyTo({
                center: INTERVENTIONS.street.mapSettings.center,
                zoom: INTERVENTIONS.street.mapSettings.zoom,
                essential: true
            });
        });
    });
    
    // Public Space map events
    maps.publicSpace.on('load', () => {
        initPublicSpaceMapLayers();
        
        // Reset view button handler
        document.getElementById('publicspace-map-reset').addEventListener('click', () => {
            maps.publicSpace.flyTo({
                center: INTERVENTIONS.publicSpace.mapSettings.center,
                zoom: INTERVENTIONS.publicSpace.mapSettings.zoom,
                essential: true
            });
        });
    });
    
    // Campus Corridor map events
    maps.campus.on('load', () => {
        initCampusMapLayers();
        
        // Reset view button handler
        document.getElementById('campus-map-reset').addEventListener('click', () => {
            maps.campus.flyTo({
                center: INTERVENTIONS.campus.mapSettings.center,
                zoom: INTERVENTIONS.campus.mapSettings.zoom,
                essential: true
            });
        });
    });
}

/**
 * Initialize map layers for Street Frontage intervention
 */
function initStreetMapLayers() {
    const map = maps.street;
    
    // Add source for street frontage data
    map.addSource('street-frontage-source', {
        type: 'geojson',
        data: INTERVENTIONS.street.geojson
    });
    
    // Add line layer for street frontages
    map.addLayer({
        id: 'street-frontage-lines',
        type: 'line',
        source: 'street-frontage-source',
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
            'visibility': 'visible'
        },
        paint: {
            'line-color': [
                'match',
                ['get', 'type'],
                'primary', '#FF6B6B',
                'secondary', '#FFB347',
                'industrial', '#4ECB71',
                '#888888'
            ],
            'line-width': 4,
            'line-opacity': 0.7
        },
        filter: ['==', ['geometry-type'], 'LineString']
    });
    
    // Add a thicker line layer for hover effect
    map.addLayer({
        id: 'street-frontage-hover',
        type: 'line',
        source: 'street-frontage-source',
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
            'visibility': 'visible'
        },
        paint: {
            'line-color': [
                'match',
                ['get', 'type'],
                'primary', '#FF6B6B',
                'secondary', '#FFB347',
                'industrial', '#4ECB71',
                '#888888'
            ],
            'line-width': 6,
            'line-opacity': 0
        },
        filter: ['==', ['get', 'id'], '']
    });
    
    // Setup hover effect
    map.on('mousemove', 'street-frontage-lines', (e) => {
        if (e.features.length > 0) {
            const feature = e.features[0];
            map.setFilter('street-frontage-hover', ['==', ['get', 'id'], feature.properties.id]);
            map.setPaintProperty('street-frontage-hover', 'line-opacity', 0.9);
            
            // Show popup
            showMapPopup('street', e.lngLat, feature);
        }
    });
    
    map.on('mouseleave', 'street-frontage-lines', () => {
        map.setFilter('street-frontage-hover', ['==', ['get', 'id'], '']);
        hideMapPopup('street');
    });
    
    // Setup click handler
    map.on('click', 'street-frontage-lines', (e) => {
        if (e.features.length > 0) {
            const feature = e.features[0];
            toggleActiveFeature('street', feature);
        }
    });
}

/**
 * Initialize map layers for Public Space intervention
 */
function initPublicSpaceMapLayers() {
    const map = maps.publicSpace;
    
    // Add source for public space data
    map.addSource('public-space-source', {
        type: 'geojson',
        data: INTERVENTIONS.publicSpace.geojson
    });
    
    // Add circle layer for plaza and intersection points
    map.addLayer({
        id: 'public-space-points',
        type: 'circle',
        source: 'public-space-source',
        paint: {
            'circle-radius': [
                'match',
                ['get', 'type'],
                'plaza', 12,
                'intersection', 8,
                6
            ],
            'circle-color': [
                'match',
                ['get', 'type'],
                'plaza', '#4ECB71',
                'intersection', '#F7C244',
                '#888888'
            ],
            'circle-opacity': 0.7,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#FFFFFF'
        },
        filter: ['==', ['geometry-type'], 'Point']
    });
    
    // Add line layer for parklets
    map.addLayer({
        id: 'public-space-lines',
        type: 'line',
        source: 'public-space-source',
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
            'visibility': 'visible'
        },
        paint: {
            'line-color': '#4ECB71',
            'line-width': 4,
            'line-opacity': 0.7
        },
        filter: ['==', ['geometry-type'], 'LineString']
    });
    
    // Add hover effect for points
    map.addLayer({
        id: 'public-space-points-hover',
        type: 'circle',
        source: 'public-space-source',
        paint: {
            'circle-radius': [
                'match',
                ['get', 'type'],
                'plaza', 14,
                'intersection', 10,
                8
            ],
            'circle-color': [
                'match',
                ['get', 'type'],
                'plaza', '#4ECB71',
                'intersection', '#F7C244',
                '#888888'
            ],
            'circle-opacity': 0,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#FFFFFF'
        },
        filter: ['==', ['get', 'id'], '']
    });
    
    // Add hover effect for lines
    map.addLayer({
        id: 'public-space-lines-hover',
        type: 'line',
        source: 'public-space-source',
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
            'visibility': 'visible'
        },
        paint: {
            'line-color': '#4ECB71',
            'line-width': 6,
            'line-opacity': 0
        },
        filter: ['==', ['get', 'id'], '']
    });
    
    // Setup hover effects
    map.on('mousemove', 'public-space-points', (e) => {
        if (e.features.length > 0) {
            const feature = e.features[0];
            map.setFilter('public-space-points-hover', ['==', ['get', 'id'], feature.properties.id]);
            map.setPaintProperty('public-space-points-hover', 'circle-opacity', 0.9);
            
            // Show popup
            showMapPopup('publicSpace', e.lngLat, feature);
        }
    });
    
    map.on('mouseleave', 'public-space-points', () => {
        map.setFilter('public-space-points-hover', ['==', ['get', 'id'], '']);
        hideMapPopup('publicSpace');
    });
    
    map.on('mousemove', 'public-space-lines', (e) => {
        if (e.features.length > 0) {
            const feature = e.features[0];
            map.setFilter('public-space-lines-hover', ['==', ['get', 'id'], feature.properties.id]);
            map.setPaintProperty('public-space-lines-hover', 'line-opacity', 0.9);
            
            // Show popup
            showMapPopup('publicSpace', e.lngLat, feature);
        }
    });
    
    map.on('mouseleave', 'public-space-lines', () => {
        map.setFilter('public-space-lines-hover', ['==', ['get', 'id'], '']);
        hideMapPopup('publicSpace');
    });
    
    // Setup click handlers
    map.on('click', 'public-space-points', (e) => {
        if (e.features.length > 0) {
            const feature = e.features[0];
            toggleActiveFeature('publicSpace', feature);
        }
    });
    
    map.on('click', 'public-space-lines', (e) => {
        if (e.features.length > 0) {
            const feature = e.features[0];
            toggleActiveFeature('publicSpace', feature);
        }
    });
}

/**
 * Initialize map layers for Campus Corridor intervention
 */
function initCampusMapLayers() {
    const map = maps.campus;
    
    // Add source for campus corridor data
    map.addSource('campus-corridor-source', {
        type: 'geojson',
        data: INTERVENTIONS.campus.geojson
    });
    
    // Add circle layer for learning spaces and showcase areas
    map.addLayer({
        id: 'campus-corridor-points',
        type: 'circle',
        source: 'campus-corridor-source',
        paint: {
            'circle-radius': [
                'match',
                ['get', 'type'],
                'learning', 10,
                'showcase', 12,
                8
            ],
            'circle-color': [
                'match',
                ['get', 'type'],
                'learning', '#4A6DF2',
                'showcase', '#BD10E0',
                '#888888'
            ],
            'circle-opacity': 0.7,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#FFFFFF'
        },
        filter: ['==', ['geometry-type'], 'Point']
    });
    
    // Add line layer for pathways
    map.addLayer({
        id: 'campus-corridor-lines',
        type: 'line',
        source: 'campus-corridor-source',
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
            'visibility': 'visible'
        },
        paint: {
            'line-color': '#4A6DF2',
            'line-width': 4,
            'line-opacity': 0.7
        },
        filter: ['==', ['geometry-type'], 'LineString']
    });
    
    // Add hover effect for points
    map.addLayer({
        id: 'campus-corridor-points-hover',
        type: 'circle',
        source: 'campus-corridor-source',
        paint: {
            'circle-radius': [
                'match',
                ['get', 'type'],
                'learning', 12,
                'showcase', 14,
                10
            ],
            'circle-color': [
                'match',
                ['get', 'type'],
                'learning', '#4A6DF2',
                'showcase', '#BD10E0',
                '#888888'
            ],
            'circle-opacity': 0,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#FFFFFF'
        },
        filter: ['==', ['get', 'id'], '']
    });
    
    // Add hover effect for lines
    map.addLayer({
        id: 'campus-corridor-lines-hover',
        type: 'line',
        source: 'campus-corridor-source',
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
            'visibility': 'visible'
        },
        paint: {
            'line-color': '#4A6DF2',
            'line-width': 6,
            'line-opacity': 0
        },
        filter: ['==', ['get', 'id'], '']
    });
    
    // Setup hover effects
    map.on('mousemove', 'campus-corridor-points', (e) => {
        if (e.features.length > 0) {
            const feature = e.features[0];
            map.setFilter('campus-corridor-points-hover', ['==', ['get', 'id'], feature.properties.id]);
            map.setPaintProperty('campus-corridor-points-hover', 'circle-opacity', 0.9);
            
            // Show popup
            showMapPopup('campus', e.lngLat, feature);
        }
    });
    
    map.on('mouseleave', 'campus-corridor-points', () => {
        map.setFilter('campus-corridor-points-hover', ['==', ['get', 'id'], '']);
        hideMapPopup('campus');
    });
    
    map.on('mousemove', 'campus-corridor-lines', (e) => {
        if (e.features.length > 0) {
            const feature = e.features[0];
            map.setFilter('campus-corridor-lines-hover', ['==', ['get', 'id'], feature.properties.id]);
            map.setPaintProperty('campus-corridor-lines-hover', 'line-opacity', 0.9);
            
            // Show popup
            showMapPopup('campus', e.lngLat, feature);
        }
    });
    
    map.on('mouseleave', 'campus-corridor-lines', () => {
        map.setFilter('campus-corridor-lines-hover', ['==', ['get', 'id'], '']);
        hideMapPopup('campus');
    });
    
    // Setup click handlers
    map.on('click', 'campus-corridor-points', (e) => {
        if (e.features.length > 0) {
            const feature = e.features[0];
            toggleActiveFeature('campus', feature);
        }
    });
    
    map.on('click', 'campus-corridor-lines', (e) => {
        if (e.features.length > 0) {
            const feature = e.features[0];
            toggleActiveFeature('campus', feature);
        }
    });
}

// Popups for each map
const mapPopups = {
    street: new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        maxWidth: '300px'
    }),
    publicSpace: new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        maxWidth: '300px'
    }),
    campus: new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        maxWidth: '300px'
    })
};

/**
 * Show a popup on the map
 * @param {string} interventionType - The intervention type (street, publicSpace, campus)
 * @param {LngLat} lngLat - The coordinates for the popup
 * @param {Object} feature - The GeoJSON feature
 */
function showMapPopup(interventionType, lngLat, feature) {
    const props = feature.properties;
    const implementationLevel = parseInt(document.getElementById('implementation-slider').value);
    
    const html = `
        <div class="popup-content">
            <div class="popup-title">${props.name}</div>
            <div class="popup-implementation">Implementation: ${implementationLevel}%</div>
            <div class="popup-description">${props.description}</div>
        </div>
    `;
    
    mapPopups[interventionType]
        .setLngLat(lngLat)
        .setHTML(html)
        .addTo(maps[interventionType]);
}

/**
 * Hide the popup for a specific intervention
 * @param {string} interventionType - The intervention type (street, publicSpace, campus)
 */
function hideMapPopup(interventionType) {
    mapPopups[interventionType].remove();
}

/**
 * Toggle a feature as active or inactive
 * @param {string} interventionType - The intervention type (street, publicSpace, campus)
 * @param {Object} feature - The GeoJSON feature
 */
function toggleActiveFeature(interventionType, feature) {
    const featureId = feature.properties.id;
    const index = activeFeatures[interventionType].indexOf(featureId);
    
    if (index === -1) {
        // Add to active features
        activeFeatures[interventionType].push(featureId);
    } else {
        // Remove from active features
        activeFeatures[interventionType].splice(index, 1);
    }
    
    // Update visualization based on active features
    updateMapVisualization(interventionType);
}

/**
 * Update map visualization based on parameters and implementation level
 * @param {string} interventionType - The intervention type (street, publicSpace, campus)
 */
function updateMapVisualization(interventionType) {
    const map = maps[interventionType];
    const implementationLevel = parseInt(document.getElementById('implementation-slider').value);
    
    // Update based on intervention type
    switch (interventionType) {
        case 'street':
            updateStreetMapVisualization(implementationLevel);
            break;
            
        case 'publicSpace':
            updatePublicSpaceMapVisualization(implementationLevel);
            break;
            
        case 'campus':
            updateCampusMapVisualization(implementationLevel);
            break;
    }
}

/**
 * Update Street Frontage map visualization
 * @param {number} implementationLevel - The implementation level (0-100)
 */
function updateStreetMapVisualization(implementationLevel) {
    const map = maps.street;
    if (!map.isStyleLoaded()) return;
    
    // Scale line width based on implementation level
    const baseLineWidth = 3;
    const scaledLineWidth = baseLineWidth + (implementationLevel / 20);
    
    // Update line opacity based on implementation level
    const baseOpacity = 0.4;
    const scaledOpacity = baseOpacity + (implementationLevel / 200);
    
    // Apply updates to map layers
    map.setPaintProperty('street-frontage-lines', 'line-width', scaledLineWidth);
    map.setPaintProperty('street-frontage-lines', 'line-opacity', scaledOpacity);
    
    // Get parameter values
    const transparencyValue = parseInt(document.getElementById('facade-transparency').value);
    
    // Could add more visual updates based on specific parameters here
}

/**
 * Update Public Space map visualization
 * @param {number} implementationLevel - The implementation level (0-100)
 */
function updatePublicSpaceMapVisualization(implementationLevel) {
    const map = maps.publicSpace;
    if (!map.isStyleLoaded()) return;
    
    // Scale circle radius based on implementation level
    const baseRadius = 6;
    const scaledRadius = baseRadius + (implementationLevel / 10);
    
    const baseLineWidth = 3;
    const scaledLineWidth = baseLineWidth + (implementationLevel / 20);
    
    // Update opacity based on implementation level
    const baseOpacity = 0.4;
    const scaledOpacity = baseOpacity + (implementationLevel / 200);
    
    // Apply updates to map layers
    map.setPaintProperty('public-space-points', 'circle-radius', [
        'match',
        ['get', 'type'],
        'plaza', scaledRadius * 1.5,
        'intersection', scaledRadius,
        scaledRadius
    ]);
    map.setPaintProperty('public-space-points', 'circle-opacity', scaledOpacity);
    map.setPaintProperty('public-space-lines', 'line-width', scaledLineWidth);
    map.setPaintProperty('public-space-lines', 'line-opacity', scaledOpacity);
    
    // Get parameter values
    // Get parameter values
    const plazaCount = parseInt(document.getElementById('plaza-count').value);
    const parkletLength = parseInt(document.getElementById('parklet-length').value);
    
    // Show/hide features based on plaza count
    const publicSpaceSource = map.getSource('public-space-source');
    if (publicSpaceSource) {
        const data = JSON.parse(JSON.stringify(INTERVENTIONS.publicSpace.geojson));
        
        // Filter plaza features based on plaza count parameter
        const plazaFeatures = data.features.filter(f => f.properties.type === 'plaza');
        if (plazaFeatures.length > plazaCount) {
            // Remove excess plazas
            data.features = data.features.filter(f => {
                if (f.properties.type !== 'plaza') return true;
                const plazaIndex = plazaFeatures.indexOf(f);
                return plazaIndex < plazaCount;
            });
        }
        
        // Update source data
        publicSpaceSource.setData(data);
    }
}

/**
 * Update Campus Corridor map visualization
 * @param {number} implementationLevel - The implementation level (0-100)
 */
function updateCampusMapVisualization(implementationLevel) {
    const map = maps.campus;
    if (!map.isStyleLoaded()) return;
    
    // Scale circle radius based on implementation level
    const baseRadius = 6;
    const scaledRadius = baseRadius + (implementationLevel / 10);
    
    const baseLineWidth = 3;
    const scaledLineWidth = baseLineWidth + (implementationLevel / 20);
    
    // Update opacity based on implementation level
    const baseOpacity = 0.4;
    const scaledOpacity = baseOpacity + (implementationLevel / 200);
    
    // Apply updates to map layers
    map.setPaintProperty('campus-corridor-points', 'circle-radius', [
        'match',
        ['get', 'type'],
        'learning', scaledRadius,
        'showcase', scaledRadius * 1.2,
        scaledRadius
    ]);
    map.setPaintProperty('campus-corridor-points', 'circle-opacity', scaledOpacity);
    map.setPaintProperty('campus-corridor-lines', 'line-width', scaledLineWidth);
    map.setPaintProperty('campus-corridor-lines', 'line-opacity', scaledOpacity);
    
    // Get parameter values
    const pathwayWidth = parseFloat(document.getElementById('pathway-width').value);
    const learningSpaces = parseInt(document.getElementById('learning-spaces').value);
    
    // Show/hide features based on learning spaces parameter
    const campusSource = map.getSource('campus-corridor-source');
    if (campusSource) {
        const data = JSON.parse(JSON.stringify(INTERVENTIONS.campus.geojson));
        
        // Filter learning space features based on parameter
        const learningFeatures = data.features.filter(f => f.properties.type === 'learning');
        if (learningFeatures.length > learningSpaces) {
            // Remove excess learning spaces
            data.features = data.features.filter(f => {
                if (f.properties.type !== 'learning') return true;
                const learningIndex = learningFeatures.indexOf(f);
                return learningIndex < learningSpaces;
            });
        }
        
        // Update source data
        campusSource.setData(data);
    }
}