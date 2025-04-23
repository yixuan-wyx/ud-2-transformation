# # from metrics import calculate_public_seating_metrics, calculate_mobility_metrics, calculate_curbside_metrics 

# # Global definitions
# CATEGORICAL_LABELS = {
#     0: "None",
#     1: "Minimal",
#     2: "Extensive"
# }

# IMPLEMENTATION_LABELS = {
#     0: "None",
#     1: "Mid",
#     2: "Full"
# }

# # Define the intervention data
# INTERVENTIONS = {
#     "Pop-up Market": {
#         "description": "Increase bench and plaza numbers to create more vibrant public spaces",
#         "parameters": {
#             "seating_level": {
#                 "label": "Seating Implementation Level",
#                 "min": 0,
#                 "max": 2,
#                 "default": 0,
#                 "description": "Level of seating intervention: None, Minimal (1-2 benches), Extensive (>=5)"
#             },
#             "plaza_level": {
#                 "label": "Plaza Implementation Level",
#                 "min": 0,
#                 "max": 2,
#                 "default": 0,
#                 "description": "Level of plaza creation: None, Minimal (1 plaza), Extensive (>=2 plazas)"
#             }
#         },
#         "conflicts": [
#             "Maintenance costs for public seating and plazas need to be factored into long-term budgets",
#             "Potential concerns about safety issues in seating areas",
#             "Weather protection is critical for year-round usability"
#         ]
#     },
#     "Pop-up Art Installation": {
#         "description": "Improving bike infrastructure and connectivity throughout the district",
#         "parameters": {
#             "bike_lane_level": {
#                 "label": "Dedicated Bike Lane Implementation Level",
#                 "min": 0,
#                 "max": 2,
#                 "default": 0,
#                 "description": "Level of bike lane coverage: None, Minimal (30%), Extensive (75%)"
#             },
#             "bike_share_level": {
#                 "label": "Bike Share Stations Implementation Level",
#                 "min": 0,
#                 "max": 2,
#                 "default": 1,
#                 "description": "Level of bike share stations: None, Minimal (2 stations), Extensive (6 stations)"
#             }
#         },
#         "conflicts": [
#             "Reduction in vehicle lanes might increase congestion during peak hours",
#             "Weather considerations may affect year-round bike usage",
#             "Initial infrastructure costs are high but maintenance costs are lower than road maintenance"
#         ]
#     }
# }


# # Dictionary mapping intervention types to their respective display configurations
# METRIC_DISPLAY_CONFIG = {
#     "Pop-up Market": {
#         "metrics_to_show": [
#             ("Pedestrian Dwell Time (min)", "{:.1f} min", "Pedestrian Dwell Time"),
#             # ("Business Foot Traffic (people/hr)", "{:,.0f}/hr", "Business Foot Traffic"),
#             # ("Social Interactions (count/hr)", "{:.0f}/hr", "Social Interactions"),
#             ("Public Space Utilization (%)", "{:.1f}%", "Public Space Utilization")
#         ]
#     },
#     "Pop-up Art Installation": {
#         "metrics_to_show": [
#             ("space_text", "{}", "Space Utilization"),
#             ("economic_text", "{}", "Economic Value"),  
#             ("community_text", "{}", "Community Engagement")
#         ]
#     },
# }




# from metrics import calculate_public_seating_metrics_simplified, calculate_mobility_metrics_simplified

# SIMPLIFIED_CALCULATORS = {
#     "Pop-up Market": calculate_public_seating_metrics_simplified,
#     "Pop-up Art Installation": calculate_mobility_metrics_simplified
# }


from metrics import calculate_public_seating_metrics_simplified, calculate_mobility_metrics_simplified

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
    "Pop-up Market": {
        "description": "Create vibrant market spaces with vendors and plazas to increase community engagement",
        "parameters": {
            "seating_level": {
                "label": "Market Stalls Implementation Level",
                "min": 0,
                "max": 2,
                "default": 0,
                "description": "Level of market stalls: None, Minimal (1-2 stalls), Extensive (>=5 stalls)"
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
            "Maintenance costs for market stalls and plazas need to be factored into long-term budgets",
            "Potential concerns about crowd management during peak market hours",
            "Weather protection is critical for year-round usability"
        ]
    },
    "Pop-up Art Installation": {
        "description": "Enhance the urban environment with interactive art installations throughout the district",
        "parameters": {
            "bike_lane_level": {
                "label": "Art Lane Implementation Level",
                "min": 0,
                "max": 2,
                "default": 0,
                "description": "Level of art lane coverage: None, Minimal (30%), Extensive (75%)"
            },
            "bike_parking_level": {
                "label": "Art Display Implementation Level",
                "min": 0,
                "max": 2,
                "default": 0,
                "description": "Level of art displays: None, Minimal (15 spots), Extensive (40 spots)"
            },
            "bike_share_level": {
                "label": "Interactive Art Implementation Level",
                "min": 0,
                "max": 2,
                "default": 1,
                "description": "Level of interactive art: None, Minimal (2 installations), Extensive (6 installations)"
            }
        },
        "conflicts": [
            "Art installations may temporarily reduce available space for pedestrians",
            "Weather considerations may affect durability of outdoor installations",
            "Initial installation costs are high but can attract significant foot traffic"
        ]
    }
}

# Dictionary mapping intervention types to their respective display configurations
METRIC_DISPLAY_CONFIG = {
    "Pop-up Market": {
        "metrics_to_show": [
            ("Pedestrian Dwell Time (min)", "{:.1f} min", "Pedestrian Dwell Time"),
            ("Business Foot Traffic (people/hr)", "{:,.0f}/hr", "Business Foot Traffic"),
            ("Public Space Utilization (%)", "{:.1f}%", "Public Space Utilization")
        ]
    },
    "Pop-up Art Installation": {
        "metrics_to_show": [
            ("space_text", "{}", "Space Utilization"),
            ("economic_text", "{}", "Economic Value"),  
            ("community_text", "{}", "Community Engagement")
        ]
    },
}

# Simplified calculators mapping
SIMPLIFIED_CALCULATORS = {
    "Pop-up Market": calculate_public_seating_metrics_simplified,
    "Pop-up Art Installation": calculate_mobility_metrics_simplified
}