/**
 * Configuration settings for the Urban Design Demo
 */

// Replace with your actual Mapbox access token
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoieXcyNTUzIiwiYSI6ImNsbHF3NXZscDA2anQzbmxuZzk1ZDRjMDUifQ.LSic9MOzAcOlcVy-_Q4Anw';

// Center coordinates for Long Island City
const LIC_COORDINATES = [-73.9400, 40.7450];

// Map styles
const MAP_STYLES = {
    base: 'mapbox://styles/mapbox/light-v11',
    satellite: 'mapbox://styles/mapbox/satellite-streets-v12'
};

// Intervention configurations
const INTERVENTIONS = {
    // Street Frontage Transformation
    street: {
        title: "Active Street Frontage Transformation",
        description: "Converting industrial facades to transparent, interactive street frontages",
        mapSettings: {
            center: [-73.9400, 40.7450],
            zoom: 16,
            style: MAP_STYLES.base
        },
        parameters: [
            {
                id: 'facade-transparency',
                label: 'Facade Transparency',
                type: 'range',
                min: 20,
                max: 80,
                default: 40,
                unit: '%',
                step: 5,
                description: 'Percentage of ground floor facades converted to transparent materials'
            },
            {
                id: 'entrance-count',
                label: 'New Entrances',
                type: 'range',
                min: 0,
                max: 10,
                default: 3,
                unit: '',
                step: 1,
                description: 'Number of new secondary entrances added along primary pedestrian routes'
            },
            {
                id: 'signage-lighting',
                label: 'Signage & Lighting',
                type: 'range',
                min: 0,
                max: 5,
                default: 2,
                unit: 'level',
                step: 1,
                description: 'Level of signage and lighting improvements for pedestrian experience'
            }
        ],
        metrics: [
            {
                id: 'pedestrian-activity',
                label: 'Pedestrian Activity',
                baseValue: 25,
                unit: '',
                color: '#4A90E2'
            },
            {
                id: 'economic-vitality',
                label: 'Economic Vitality',
                baseValue: 30,
                unit: '',
                color: '#50E3C2'
            },
            {
                id: 'visual-interest',
                label: 'Visual Interest',
                baseValue: 20,
                unit: '',
                color: '#F5A623'
            }
        ],
        // GeoJSON data for street frontage locations
        geojson: {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {
                        id: 'sf1',
                        name: 'Main Street Frontage',
                        description: 'Primary street with commercial potential',
                        length: 250,
                        type: 'primary'
                    },
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            [-73.9410, 40.7450],
                            [-73.9390, 40.7455]
                        ]
                    }
                },
                {
                    type: 'Feature',
                    properties: {
                        id: 'sf2',
                        name: 'Secondary Street Frontage',
                        description: 'Mixed-use connection to residential area',
                        length: 180,
                        type: 'secondary'
                    },
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            [-73.9405, 40.7440],
                            [-73.9390, 40.7445]
                        ]
                    }
                },
                {
                    type: 'Feature',
                    properties: {
                        id: 'sf3',
                        name: 'Industrial Corridor',
                        description: 'Opportunity for active manufacturing display',
                        length: 300,
                        type: 'industrial'
                    },
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            [-73.9395, 40.7430],
                            [-73.9375, 40.7435]
                        ]
                    }
                }
            ]
        }
    },
    
    // Public Space Network Development
    publicSpace: {
        title: "Public Space Network Development",
        description: "Creating interconnected public spaces for workers and visitors",
        mapSettings: {
            center: [-73.9390, 40.7445],
            zoom: 15.5,
            style: MAP_STYLES.base
        },
        parameters: [
            {
                id: 'plaza-count',
                label: 'Small Plazas',
                type: 'range',
                min: 0,
                max: 5,
                default: 2,
                unit: '',
                step: 1,
                description: 'Number of small plazas developed in underutilized spaces'
            },
            {
                id: 'parklet-length',
                label: 'Linear Parklets',
                type: 'range',
                min: 50,
                max: 300,
                default: 150,
                unit: 'm',
                step: 25,
                description: 'Total length of linear parklets along streets'
            },
            {
                id: 'seating-count',
                label: 'Seating Options',
                type: 'range',
                min: 0,
                max: 50,
                default: 20,
                unit: '',
                step: 5,
                description: 'Number of new seating options added throughout the district'
            }
        ],
        metrics: [
            {
                id: 'green-space',
                label: 'Green Space',
                baseValue: 15,
                unit: 'sqm',
                color: '#7ED321'
            },
            {
                id: 'social-interaction',
                label: 'Social Interaction',
                baseValue: 20,
                unit: '',
                color: '#BD10E0'
            },
            {
                id: 'public-accessibility',
                label: 'Public Accessibility',
                baseValue: 25,
                unit: '',
                color: '#4A90E2'
            }
        ],
        // GeoJSON data for public space locations
        geojson: {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {
                        id: 'ps1',
                        name: 'Central Plaza',
                        description: 'Main gathering space with seating and greenery',
                        area: 500,
                        type: 'plaza'
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [-73.9395, 40.7440]
                    }
                },
                {
                    type: 'Feature',
                    properties: {
                        id: 'ps2',
                        name: 'Secondary Plaza',
                        description: 'Smaller plaza with food vendor space',
                        area: 300,
                        type: 'plaza'
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [-73.9385, 40.7455]
                    }
                },
                {
                    type: 'Feature',
                    properties: {
                        id: 'ps3',
                        name: 'Main Street Parklet',
                        description: 'Linear park with seating and planters',
                        length: 150,
                        type: 'parklet'
                    },
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            [-73.9400, 40.7450],
                            [-73.9385, 40.7453]
                        ]
                    }
                },
                {
                    type: 'Feature',
                    properties: {
                        id: 'ps4',
                        name: 'Key Intersection Treatment',
                        description: 'Enhanced crosswalk with seating and planting',
                        area: 200,
                        type: 'intersection'
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [-73.9390, 40.7445]
                    }
                },
                {
                    type: 'Feature',
                    properties: {
                        id: 'ps5',
                        name: 'Secondary Parklet',
                        description: 'Narrow parklet with bike parking',
                        length: 100,
                        type: 'parklet'
                    },
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            [-73.9380, 40.7440],
                            [-73.9370, 40.7443]
                        ]
                    }
                }
            ]
        }
    },
    
    // Campus-Industry Corridor
    campus: {
        title: "Multi-Purpose Campus-Industry Corridor",
        description: "Creating connections between educational and industrial spaces",
        mapSettings: {
            center: [-73.9385, 40.7440],
            zoom: 15,
            style: MAP_STYLES.base
        },
        parameters: [
            {
                id: 'pathway-width',
                label: 'Pathway Width',
                type: 'range',
                min: 3,
                max: 8,
                default: 4,
                unit: 'm',
                step: 0.5,
                description: 'Width of pedestrian pathways connecting campus and industry'
            },
            {
                id: 'learning-spaces',
                label: 'Learning Spaces',
                type: 'range',
                min: 0,
                max: 5,
                default: 2,
                unit: '',
                step: 1,
                description: 'Number of flexible outdoor learning/gathering spaces'
            },
            {
                id: 'amenity-level',
                label: 'Amenity Level',
                type: 'range',
                min: 1,
                max: 5,
                default: 2,
                unit: '',
                step: 1,
                description: 'Level of amenities (food, seating, Wi-Fi, etc.)'
            }
        ],
        metrics: [
            {
                id: 'collaboration',
                label: 'Collaboration Potential',
                baseValue: 10,
                unit: '',
                color: '#4A90E2'
            },
            {
                id: 'education-industry',
                label: 'Education-Industry Integration',
                baseValue: 15,
                unit: '',
                color: '#F5A623'
            },
            {
                id: 'innovation-potential',
                label: 'Innovation Potential',
                baseValue: 20,
                unit: '',
                color: '#BD10E0'
            }
        ],
        // GeoJSON data for campus-industry corridor
        geojson: {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {
                        id: 'ci1',
                        name: 'Main Corridor Pathway',
                        description: 'Primary pedestrian connection between campus and industry',
                        length: 400,
                        type: 'pathway'
                    },
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            [-73.9400, 40.7460],
                            [-73.9385, 40.7450],
                            [-73.9370, 40.7440]
                        ]
                    }
                },
                {
                    type: 'Feature',
                    properties: {
                        id: 'ci2',
                        name: 'Learning Space A',
                        description: 'Outdoor classroom with demonstration area',
                        area: 300,
                        type: 'learning'
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [-73.9390, 40.7455]
                    }
                },
                {
                    type: 'Feature',
                    properties: {
                        id: 'ci3',
                        name: 'Learning Space B',
                        description: 'Flexible meeting area with presentation capabilities',
                        area: 250,
                        type: 'learning'
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [-73.9380, 40.7445]
                    }
                },
                {
                    type: 'Feature',
                    properties: {
                        id: 'ci4',
                        name: 'Industry Showcase Area',
                        description: 'Exhibition space for industrial processes and student projects',
                        area: 400,
                        type: 'showcase'
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [-73.9375, 40.7435]
                    }
                },
                {
                    type: 'Feature',
                    properties: {
                        id: 'ci5',
                        name: 'Secondary Pathway',
                        description: 'Connection to nearby amenities',
                        length: 250,
                        type: 'pathway'
                    },
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            [-73.9385, 40.7450],
                            [-73.9375, 40.7455]
                        ]
                    }
                }
            ]
        }
    }
};

// Impact text descriptions based on implementation level
const IMPACT_DESCRIPTIONS = {
    economic: {
        low: {
            street: "Minimal economic impact with current implementation level.",
            publicSpace: "Limited economic benefit from public space improvements.",
            campus: "Basic economic connections between campus and industry."
        },
        medium: {
            street: "Moderate increase in business activity and foot traffic.",
            publicSpace: "Growing economic value from enhanced public spaces.",
            campus: "Developing ecosystem for innovation and collaboration."
        },
        high: {
            street: "Significant economic revitalization and commercial activity.",
            publicSpace: "Substantial economic benefits including increased property values and business formation.",
            campus: "Thriving innovation corridor with strong economic indicators."
        }
    },
    social: {
        low: {
            street: "Limited improvement in street life and social interaction.",
            publicSpace: "Basic gathering spaces with minimal programming.",
            campus: "Initial connections between campus and industry communities."
        },
        medium: {
            street: "Enhanced street life and pedestrian activity.",
            publicSpace: "Active community spaces with regular use.",
            campus: "Regular interaction between students and industry professionals."
        },
        high: {
            street: "Vibrant street life with diverse activities throughout the day.",
            publicSpace: "Thriving public realm with strong community ownership.",
            campus: "Strong collaborative culture between educational and industrial users."
        }
    },
    environmental: {
        low: {
            street: "Basic street-level environmental improvements.",
            publicSpace: "Small pockets of green space with limited impact.",
            campus: "Minimal green infrastructure along pathways."
        },
        medium: {
            street: "Improved microclimate through street-level amenities.",
            publicSpace: "Growing network of green spaces reducing heat island effect.",
            campus: "Green corridor connecting educational and industrial spaces."
        },
        high: {
            street: "Substantial environmental benefits through comprehensive greening.",
            publicSpace: "Significant environmental improvement district-wide.",
            campus: "Exemplary green infrastructure network with educational components."
        }
    },
    accessibility: {
        low: {
            street: "Basic improvements to street accessibility.",
            publicSpace: "Limited access to new public spaces.",
            campus: "Minimal pathway connections established."
        },
        medium: {
            street: "Enhanced wayfinding and street-level accessibility.",
            publicSpace: "Improved access to quality outdoor spaces.",
            campus: "Improved pedestrian and bicycle connections."
        },
        high: {
            street: "Universal accessibility with inclusive design throughout.",
            publicSpace: "Comprehensive network of accessible public spaces.",
            campus: "Seamless connectivity between all areas with universal design."
        }
    }
};