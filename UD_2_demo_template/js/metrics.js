/**
 * Metrics calculations and impact analysis for the Urban Design Demo
 */

/**
 * Update metrics display for the current intervention
 * @param {string} interventionType - The intervention type (street, publicSpace, campus)
 * @param {number} implementationLevel - The implementation level (0-100)
 */
function updateMetricsDisplay(interventionType, implementationLevel) {
    const metricsContainer = document.getElementById('metrics-content');
    const metrics = INTERVENTIONS[interventionType].metrics;
    
    // Clear existing metrics
    metricsContainer.innerHTML = '';
    
    // Get parameter values for this intervention
    const parameterValues = getParameterValues(interventionType);
    
    // Calculate and display each metric
    metrics.forEach(metric => {
        // Apply implementation level to base value
        let calculatedValue = calculateMetricValue(
            metric,
            implementationLevel,
            parameterValues,
            interventionType
        );
        
        // Create metric display element
        const metricItem = document.createElement('div');
        metricItem.className = 'metric-item';
        
        const metricLabel = document.createElement('div');
        metricLabel.className = 'metric-label';
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = metric.label;
        
        const valueSpan = document.createElement('span');
        valueSpan.textContent = metric.unit ? 
            `${calculatedValue.toFixed(1)} ${metric.unit}` : 
            calculatedValue.toFixed(1);
        
        metricLabel.appendChild(nameSpan);
        metricLabel.appendChild(valueSpan);
        
        const metricBar = document.createElement('div');
        metricBar.className = 'metric-bar';
        
        const metricFill = document.createElement('div');
        metricFill.className = 'metric-fill';
        metricFill.style.width = `${Math.min(100, calculatedValue)}%`;
        metricFill.style.backgroundColor = metric.color;
        
        metricBar.appendChild(metricFill);
        
        metricItem.appendChild(metricLabel);
        metricItem.appendChild(metricBar);
        metricsContainer.appendChild(metricItem);
    });
}

/**
 * Calculate metric value based on implementation level and parameters
 * @param {Object} metric - The metric configuration
 * @param {number} implementationLevel - The implementation level (0-100)
 * @param {Object} parameterValues - The current parameter values
 * @param {string} interventionType - The intervention type
 * @returns {number} - The calculated metric value
 */
function calculateMetricValue(metric, implementationLevel, parameterValues, interventionType) {
    let value = metric.baseValue;
    
    // Apply implementation level scaling
    value = value + (value * (implementationLevel / 100));
    
    // Apply additional calculations based on parameters
    switch (interventionType) {
        case 'street':
            switch (metric.id) {
                case 'pedestrian-activity':
                    // Affected by facade transparency and entrance count
                    value += parameterValues.facadeTransparency * 0.3;
                    value += parameterValues.entranceCount * 2;
                    break;
                    
                case 'economic-vitality':
                    // Affected by facade transparency and signage/lighting
                    value += parameterValues.facadeTransparency * 0.25;
                    value += parameterValues.signageLighting * 4;
                    break;
                    
                case 'visual-interest':
                    // Affected by all parameters
                    value += parameterValues.facadeTransparency * 0.4;
                    value += parameterValues.entranceCount * 1.5;
                    value += parameterValues.signageLighting * 5;
                    break;
            }
            break;
            
        case 'publicSpace':
            switch (metric.id) {
                case 'green-space':
                    // Affected by plaza count and parklet length
                    value += parameterValues.plazaCount * 10;
                    value += parameterValues.parkletLength * 0.05;
                    break;
                    
                case 'social-interaction':
                    // Affected by all parameters
                    value += parameterValues.plazaCount * 8;
                    value += parameterValues.parkletLength * 0.03;
                    value += parameterValues.seatingCount * 0.5;
                    break;
                    
                case 'public-accessibility':
                    // Affected primarily by plaza count and seating
                    value += parameterValues.plazaCount * 5;
                    value += parameterValues.seatingCount * 0.7;
                    break;
            }
            break;
            
        case 'campus':
            switch (metric.id) {
                case 'collaboration':
                    // Affected by learning spaces and amenity level
                    value += parameterValues.learningSpaces * 10;
                    value += parameterValues.amenityLevel * 5;
                    break;
                    
                case 'education-industry':
                    // Affected by all parameters
                    value += parameterValues.pathwayWidth * 3;
                    value += parameterValues.learningSpaces * 7;
                    value += parameterValues.amenityLevel * 4;
                    break;
                    
                case 'innovation-potential':
                    // Affected primarily by learning spaces and amenity level
                    value += parameterValues.learningSpaces * 12;
                    value += parameterValues.amenityLevel * 6;
                    break;
            }
            break;
    }
    
    // Cap the value at a reasonable maximum to prevent unrealistic values
    return Math.min(100, value);
}

/**
 * Update impact descriptions based on implementation level
 * @param {string} interventionType - The intervention type
 * @param {number} implementationLevel - The implementation level (0-100)
 */
function updateImpactDescriptions(interventionType, implementationLevel) {
    const impactLevel = implementationLevel < 30 ? 'low' : 
                        implementationLevel < 70 ? 'medium' : 'high';
    
    // Update economic impact
    document.getElementById(`${interventionType}-economic-impact`).textContent = 
        IMPACT_DESCRIPTIONS.economic[impactLevel][interventionType];
    
    // Update social impact
    document.getElementById(`${interventionType}-social-impact`).textContent = 
        IMPACT_DESCRIPTIONS.social[impactLevel][interventionType];
    
    // Update environmental impact
    document.getElementById(`${interventionType}-environmental-impact`).textContent = 
        IMPACT_DESCRIPTIONS.environmental[impactLevel][interventionType];
    
    // Update accessibility impact
    document.getElementById(`${interventionType}-accessibility-impact`).textContent = 
        IMPACT_DESCRIPTIONS.accessibility[impactLevel][interventionType];
}

/**
 * Get current parameter values for an intervention
 * @param {string} interventionType - The intervention type
 * @returns {Object} - Object containing parameter values
 */
function getParameterValues(interventionType) {
    const values = {};
    
    // Get values based on intervention type
    switch (interventionType) {
        case 'street':
            values.facadeTransparency = parseInt(document.getElementById('facade-transparency').value);
            values.entranceCount = parseInt(document.getElementById('entrance-count').value);
            values.signageLighting = parseInt(document.getElementById('signage-lighting').value);
            break;
            
        case 'publicSpace':
            values.plazaCount = parseInt(document.getElementById('plaza-count').value);
            values.parkletLength = parseInt(document.getElementById('parklet-length').value);
            values.seatingCount = parseInt(document.getElementById('seating-count').value);
            break;
            
        case 'campus':
            values.pathwayWidth = parseFloat(document.getElementById('pathway-width').value);
            values.learningSpaces = parseInt(document.getElementById('learning-spaces').value);
            values.amenityLevel = parseInt(document.getElementById('amenity-level').value);
            break;
    }
    
    return values;
}