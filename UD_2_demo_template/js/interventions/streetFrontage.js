/**
 * Street Frontage Transformation intervention functions
 */

/**
 * Initialize the Street Frontage intervention controls and handlers
 */
function initStreetFrontage() {
    // Create parameter controls
    createStreetFrontageParameters();
    
    // Set up event listeners for parameter changes
    setupStreetFrontageEventListeners();
    
    // Initial metrics update
    updateStreetFrontageMetrics();
}

/**
 * Create parameter controls for Street Frontage
 */
function createStreetFrontageParameters() {
    const parametersContainer = document.getElementById('parameters-content');
    parametersContainer.innerHTML = '';
    
    // Get parameters for Street Frontage
    const parameters = INTERVENTIONS.street.parameters;
    
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
 * Set up event listeners for Street Frontage parameters
 */
function setupStreetFrontageEventListeners() {
    // Get parameters for Street Frontage
    const parameters = INTERVENTIONS.street.parameters;
    
    // Add event listeners for each parameter
    parameters.forEach(param => {
        const slider = document.getElementById(param.id);
        if (slider) {
            slider.addEventListener('input', function() {
                // Update value display
                document.getElementById(`${param.id}-value`).textContent = `${this.value}${param.unit}`;
                
                // Update metrics
                updateStreetFrontageMetrics();
                
                // Update map visualization
                updateMapVisualization('street');
            });
        }
    });
}

/**
 * Update metrics based on Street Frontage parameters
 */
function updateStreetFrontageMetrics() {
    const implementationLevel = parseInt(document.getElementById('implementation-slider').value);
    
    // Update metrics display
    updateMetricsDisplay('street', implementationLevel);
    
    // Update impact descriptions
    updateImpactDescriptions('street', implementationLevel);
    
    // Update visualization elements - simulated opacity changes for before/after images
    updateStreetFrontageVisualization(implementationLevel);
}

/**
 * Update Street Frontage visualization based on implementation level
 * @param {number} implementationLevel - The implementation level (0-100)
 */
function updateStreetFrontageVisualization(implementationLevel) {
    // Update implementation level display
    document.querySelectorAll('.implementation-level').forEach(el => {
        el.textContent = implementationLevel;
    });
    
    // Simulate visualization changes to before/after images
    const afterImage = document.getElementById('street-after');
    if (afterImage) {
        // Adjust opacity based on implementation level
        afterImage.style.opacity = 0.3 + (implementationLevel / 100 * 0.7);
    }
    
    // Get parameter values
    const transparencyValue = parseInt(document.getElementById('facade-transparency').value);
    const entranceCount = parseInt(document.getElementById('entrance-count').value);
    const signageLighting = parseInt(document.getElementById('signage-lighting').value);
    
    // Here you could add more advanced visualization updates
    // For example, showing/hiding elements in the visualization based on parameters
}