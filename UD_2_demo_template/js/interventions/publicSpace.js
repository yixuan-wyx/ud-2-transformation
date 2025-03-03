/**
 * Public Space Network Development intervention functions
 */

/**
 * Initialize the Public Space Network intervention controls and handlers
 */
function initPublicSpace() {
    // Create parameter controls
    createPublicSpaceParameters();
    
    // Set up event listeners for parameter changes
    setupPublicSpaceEventListeners();
    
    // Initial metrics update
    updatePublicSpaceMetrics();
}

/**
 * Create parameter controls for Public Space Network
 */
function createPublicSpaceParameters() {
    const parametersContainer = document.getElementById('parameters-content');
    parametersContainer.innerHTML = '';
    
    // Get parameters for Public Space
    const parameters = INTERVENTIONS.publicSpace.parameters;
    
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
 * Set up event listeners for Public Space Network parameters
 */
function setupPublicSpaceEventListeners() {
    // Get parameters for Public Space
    const parameters = INTERVENTIONS.publicSpace.parameters;
    
    // Add event listeners for each parameter
    parameters.forEach(param => {
        const slider = document.getElementById(param.id);
        if (slider) {
            slider.addEventListener('input', function() {
                // Update value display
                document.getElementById(`${param.id}-value`).textContent = `${this.value}${param.unit}`;
                
                // Update metrics
                updatePublicSpaceMetrics();
                
                // Update map visualization
                updateMapVisualization('publicSpace');
            });
        }
    });
}

/**
 * Update metrics based on Public Space Network parameters
 */
function updatePublicSpaceMetrics() {
    const implementationLevel = parseInt(document.getElementById('implementation-slider').value);
    
    // Update metrics display
    updateMetricsDisplay('publicSpace', implementationLevel);
    
    // Update impact descriptions
    updateImpactDescriptions('publicSpace', implementationLevel);
    
    // Update visualization elements - simulated opacity changes for before/after images
    updatePublicSpaceVisualization(implementationLevel);
}

/**
 * Update Public Space Network visualization based on implementation level
 * @param {number} implementationLevel - The implementation level (0-100)
 */
function updatePublicSpaceVisualization(implementationLevel) {
    // Update implementation level display
    document.querySelectorAll('.implementation-level').forEach(el => {
        el.textContent = implementationLevel;
    });
    
    // Simulate visualization changes to before/after images
    const afterImage = document.getElementById('publicspace-after');
    if (afterImage) {
        // Adjust opacity based on implementation level
        afterImage.style.opacity = 0.3 + (implementationLevel / 100 * 0.7);
    }
    
    // Get parameter values
    const plazaCount = parseInt(document.getElementById('plaza-count').value);
    const parkletLength = parseInt(document.getElementById('parklet-length').value);
    const seatingCount = parseInt(document.getElementById('seating-count').value);
    
    // Calculate green space metrics for display
    const greenSpaceArea = (plazaCount * 100) + (parkletLength * 0.5);
    
    // Advanced visualization could be added here
    // For example, you could show/hide different elements based on parameters
}