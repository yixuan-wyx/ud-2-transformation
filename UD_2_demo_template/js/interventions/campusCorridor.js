/**
 * Campus-Industry Corridor intervention functions
 */

/**
 * Initialize the Campus-Industry Corridor intervention controls and handlers
 */
function initCampusCorridor() {
    // Create parameter controls
    createCampusCorridorParameters();
    
    // Set up event listeners for parameter changes
    setupCampusCorridorEventListeners();
    
    // Initial metrics update
    updateCampusCorridorMetrics();
}

/**
 * Create parameter controls for Campus-Industry Corridor
 */
function createCampusCorridorParameters() {
    const parametersContainer = document.getElementById('parameters-content');
    parametersContainer.innerHTML = '';
    
    // Get parameters for Campus Corridor
    const parameters = INTERVENTIONS.campus.parameters;
    
    // Create UI controls for each parameter
    parameters.forEach(param => {
        const paramDiv = document.createElement('div');
        paramDiv.className = 'parameter-control';
        
        const label = document.createElement('label');
        label.className = 'form-label';
        label.htmlFor = param.id;
        
        const labelText = document.createElement('span');
        labelText.textContent = param.label;
        
        const valueText = document.createElement('span');
        valueText.className = 'param-value';
        valueText.id = `${param.id}-value`;
        valueText.textContent = `${param.default}${param.unit}`;
        
        label.appendChild(labelText);
        label.appendChild(valueText);
        
        const input = document.createElement('input');
        input.type = 'range';
        input.className = 'form-range';
        input.id = param.id;
        input.min = param.min;
        input.max = param.max;
        input.step = param.step;
        input.value = param.default;
        
        const description = document.createElement('div');
        description.className = 'form-text';
        description.textContent = param.description;
        
        paramDiv.appendChild(label);
        paramDiv.appendChild(input);
        paramDiv.appendChild(description);
        parametersContainer.appendChild(paramDiv);
    });
}

/**
 * Set up event listeners for Campus-Industry Corridor parameters
 */
function setupCampusCorridorEventListeners() {
    // Get parameters for Campus Corridor
    const parameters = INTERVENTIONS.campus.parameters;
    
    // Add event listeners for each parameter
    parameters.forEach(param => {
        const slider = document.getElementById(param.id);
        if (slider) {
            slider.addEventListener('input', function() {
                // Update value display
                document.getElementById(`${param.id}-value`).textContent = `${this.value}${param.unit}`;
                
                // Update metrics
                updateCampusCorridorMetrics();
                
                // Update map visualization
                updateMapVisualization('campus');
            });
        }
    });
}

/**
 * Update metrics based on Campus-Industry Corridor parameters
 */
function updateCampusCorridorMetrics() {
    const implementationLevel = parseInt(document.getElementById('implementation-slider').value);
    
    // Update metrics display
    updateMetricsDisplay('campus', implementationLevel);
    
    // Update impact descriptions
    updateImpactDescriptions('campus', implementationLevel);
    
    // Update visualization elements - simulated opacity changes for before/after images
    updateCampusCorridorVisualization(implementationLevel);
}

/**
 * Update Campus-Industry Corridor visualization based on implementation level
 * @param {number} implementationLevel - The implementation level (0-100)
 */
function updateCampusCorridorVisualization(implementationLevel) {
    // Update implementation level display
    document.querySelectorAll('.implementation-level').forEach(el => {
        el.textContent = implementationLevel;
    });
    
    // Simulate visualization changes to before/after images
    const afterImage = document.getElementById('campus-after');
    if (afterImage) {
        // Adjust opacity based on implementation level
        afterImage.style.opacity = 0.3 + (implementationLevel / 100 * 0.7);
    }
    
    // Get parameter values
    const pathwayWidth = parseFloat(document.getElementById('pathway-width').value);
    const learningSpaces = parseInt(document.getElementById('learning-spaces').value);
    const amenityLevel = parseInt(document.getElementById('amenity-level').value);
    
    // Calculate collaboration potential for display
    const collaborationScore = (learningSpaces * 10) + (amenityLevel * 5);
    
    // Advanced visualization could be added here
    // For example, showing/hiding elements based on parameters
}