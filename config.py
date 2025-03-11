# from metrics import calculate_public_seating_metrics, calculate_mobility_metrics, calculate_curbside_metrics 

# Global definitions
CATEGORICAL_LABELS = {
    0: "None",
    1: "Minimal",
    2: "Extensive"
}

IMPLEMENTATION_LABELS = {
    0: "None",
    1: "Mid",
    2: "Full"
}

# Define the intervention data
INTERVENTIONS = {
    "Public Seating Management": {
        "description": "Increase bench and plaza numbers to create more vibrant public spaces",
        "parameters": {
            "seating_level": {
                "label": "Seating Implementation Level",
                "min": 0,
                "max": 2,
                "default": 0,
                "description": "Level of seating intervention: None, Minimal (1-2 benches), Extensive (>=5)"
            },
            "plaza_level": {
                "label": "Plaza Implementation Level",
                "min": 0,
                "max": 2,
                "default": 0,
                "description": "Level of plaza creation: None, Minimal (1 plaza), Extensive (>=2 plazas)"
            }
        },
        "conflicts": [
            "Maintenance costs for public seating and plazas need to be factored into long-term budgets",
            "Potential concerns about safety issues in seating areas",
            "Weather protection is critical for year-round usability"
        ]
    },
    "Mobility Management": {
        "description": "Improving bike infrastructure and connectivity throughout the district",
        "parameters": {
            "bike_lane_level": {
                "label": "Dedicated Bike Lane Implementation Level",
                "min": 0,
                "max": 2,
                "default": 0,
                "description": "Level of bike lane coverage: None, Minimal (30%), Extensive (75%)"
            },
            "bike_share_level": {
                "label": "Bike Share Stations Implementation Level",
                "min": 0,
                "max": 2,
                "default": 1,
                "description": "Level of bike share stations: None, Minimal (2 stations), Extensive (6 stations)"
            }
        },
        "conflicts": [
            "Reduction in vehicle lanes might increase congestion during peak hours",
            "Weather considerations may affect year-round bike usage",
            "Initial infrastructure costs are high but maintenance costs are lower than road maintenance"
        ]
    }
}


# Dictionary mapping intervention types to their respective display configurations
METRIC_DISPLAY_CONFIG = {
    "Public Seating Management": {
        "metrics_to_show": [
            ("Pedestrian Dwell Time (min)", "{:.1f} min", "Pedestrian Dwell Time"),
            # ("Business Foot Traffic (people/hr)", "{:,.0f}/hr", "Business Foot Traffic"),
            # ("Social Interactions (count/hr)", "{:.0f}/hr", "Social Interactions"),
            ("Public Space Utilization (%)", "{:.1f}%", "Public Space Utilization")
        ]
    },
    "Mobility Management": {
        "metrics_to_show": [
            ("space_text", "{}", "Space Utilization"),
            ("economic_text", "{}", "Economic Value"),  
            ("community_text", "{}", "Community Engagement")
        ]
    },
}




from metrics import calculate_public_seating_metrics_simplified, calculate_mobility_metrics_simplified

SIMPLIFIED_CALCULATORS = {
    "Public Seating Management": calculate_public_seating_metrics_simplified,
    "Mobility Management": calculate_mobility_metrics_simplified
}