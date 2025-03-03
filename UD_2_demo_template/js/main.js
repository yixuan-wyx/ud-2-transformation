/**
 * Main application logic for the Urban Design Demo
 */

// Current active intervention
let activeIntervention = 'street';

/**
 * Initialize the application
 */
function initApp() {
    // Initialize maps
    initMaps();
    
    // Initialize intervention UIs
    initInterventions();
    
    // Set up global event listeners
    setupEventListeners();
    
    // Initial updates
    updateImplementationVisualization();
}

/**
 * Initialize all interventions
 */
function initInterventions() {
    // Initialize the Street Frontage intervention
    initStreetFrontage();
    
    // Initialize the Public Space intervention (but don't display yet)
    initPublicSpace();
    
    // Initialize the Campus Corridor intervention (but don't display yet)
    initCampusCorridor();
}

/**
 * Set up global event listeners
 */
function setupEventListeners() {
    // Implementation slider event
    const implementationSlider = document.getElementById('implementation-slider');
    implementationSlider.addEventListener('input', function() {
        // Update value display
        document.getElementById('implementation-value').textContent = `${this.value}%`;
        
        // Update visualization
        updateImplementationVisualization();
    });
    
    // Tab change events
    const tabElements = document.querySelectorAll('[data-bs-toggle="pill"]');
    tabElements.forEach(tabElement => {
        tabElement.addEventListener('shown.bs.tab', function(event) {
            // Get the new active intervention type from the tab ID
            const tabId = event.target.id;
            activeIntervention = tabId.replace('-tab', '');
            
            // Update parameters display for the new intervention
            updateParametersForIntervention(activeIntervention);
            
            // Update metrics for the new intervention
            updateMetricsForIntervention(activeIntervention);
        });
    });
}

/**
 * Update parameters display for an intervention
 * @param {string} interventionType - The intervention type
 */
function updateParametersForIntervention(interventionType) {
    // Call the appropriate function based on intervention type
    switch (interventionType) {
        case 'street':
            createStreetFrontageParameters();
            setupStreetFrontageEventListeners();
            break;
            
        case 'publicspace':
            createPublicSpaceParameters();
            setupPublicSpaceEventListeners();
            break;
            
        case 'campus':
            createCampusCorridorParameters();
            setupCampusCorridorEventListeners();
            break;
    }
}

/**
 * Update metrics for an intervention
 * @param {string} interventionType - The intervention type
 */
function updateMetricsForIntervention(interventionType) {
    const implementationLevel = parseInt(document.getElementById('implementation-slider').value);
    
    // Call the appropriate function based on intervention type
    switch (interventionType) {
        case 'street':
            updateStreetFrontageMetrics();
            break;
            
        case 'publicspace':
            updatePublicSpaceMetrics();
            break;
            
        case 'campus':
            updateCampusCorridorMetrics();
            break;
    }
}

/**
 * Update visualization based on implementation level
 */
function updateImplementationVisualization() {
    const implementationLevel = parseInt(document.getElementById('implementation-slider').value);
    
    // Update map visualization for the active intervention
    updateMapVisualization(activeIntervention === 'publicspace' ? 'publicSpace' : activeIntervention);
    
    // Update metrics and impact text for the active intervention
    switch (activeIntervention) {
        case 'street':
            updateStreetFrontageMetrics();
            break;
            
        case 'publicspace':
            updatePublicSpaceMetrics();
            break;
            
        case 'campus':
            updateCampusCorridorMetrics();
            break;
    }
    
    // Update all implementation level displays
    document.querySelectorAll('.implementation-level').forEach(el => {
        el.textContent = implementationLevel;
    });
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);