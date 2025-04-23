# import streamlit as st
# import pandas as pd
# import numpy as np
# import plotly.express as px
# import plotly.graph_objects as go

# from config import CATEGORICAL_LABELS, INTERVENTIONS, METRIC_DISPLAY_CONFIG, SIMPLIFIED_CALCULATORS

# # Setup page
# st.set_page_config(page_title="Interventions Tool", page_icon="🏙️", layout="wide")

# # Header
# st.title("LIC Consensus - Interactive Tool")
# st.markdown("Explore the impacts and trade-offs of different transformation")
# st.markdown("We value all kinds of feedbacks!")
# st.markdown("---")

# tab1, tab2, tab3 = st.tabs(["Analysis", "Consensus Dashboard", "Feedback"])

# with tab1:
#     left_col, right_col = st.columns([1, 2])

#     with left_col:
#         st.subheader("Intervention Controls")
        
#         # Add basic intervention selector
#         selected_intervention = st.selectbox(
#             "Select Intervention",
#             list(INTERVENTIONS.keys())
#         )
        
#         # Add parameter controls section
#         st.subheader("Adjust Parameters")

#         if selected_intervention == "Public Seating Management":
#             st.write('Seating Implementation Level Guide:')
#             st.write('0 - None, 1 - Minimal (1-2 benches), 2 - Extensive (>=5 benches)')
#             st.write('Plaza Implementation Level Guide:')
#             st.write('0 - None, 1 - Minimal (1 plaza), Extensive (>=2 plazas)')
#         elif selected_intervention == "Mobility Management":
#             st.write('Dedicated Bike Lane Implementation Level Guide:')
#             st.write('0 - None, 1 - Minimal, 2 - Extensive')
#             st.write('Bike Stations Implementation Level Guide:')
#             st.write('0 - None, 1 - Minimal, Extensive')

#         # Create parameters dict to store the values
#         params_values = {}

#         # Display sliders for the selected intervention
#         for param_key, param_info in INTERVENTIONS[selected_intervention]["parameters"].items():
#             # Create a slider with categorical values
#             param_value = st.slider(
#                 f"{param_info['label']}",
#                 param_info['min'],
#                 param_info['max'],
#                 param_info['default'],
#                 format="%d",
#                 help=param_info['description']
#             )
            
#             # Display the selected label
#             st.caption(f"Selected: {CATEGORICAL_LABELS[param_value]}")
            
#             # Store the parameter value
#             params_values[param_key] = param_value

#         # Display impact metrics based on intervention type
#         st.subheader("Impact Metrics")

#         # Call the appropriate simplified calculation function based on the selected intervention
#         metric_calculator = SIMPLIFIED_CALCULATORS[selected_intervention]
        
#         # Prepare the arguments for the calculation function (without implementation level)
#         if selected_intervention == "Public Seating Management":
#             results = metric_calculator(
#                 params_values.get("seating_level", 0),
#                 params_values.get("plaza_level", 0)
#             )
#         else:  # Mobility Management
#             results = metric_calculator(
#                 params_values.get("bike_lane_level", 0),
#                 params_values.get("bike_parking_level", 0),
#                 params_values.get("bike_share_level", 0)
#             )
        
#         # Get the display configuration for the selected intervention
#         display_config = METRIC_DISPLAY_CONFIG[selected_intervention]
#         metrics_to_show = display_config["metrics_to_show"]
        
#         # Create two columns for metrics display
#         col1, col2 = st.columns(2)
        
#         # Distribute metrics across the columns
#         half_metrics = len(metrics_to_show) // 2 + (len(metrics_to_show) % 2)
        
#         with col1:
#             for i in range(half_metrics):
#                 if i < len(metrics_to_show):
#                     metric_key, format_str, display_name = metrics_to_show[i]
                    
#                     # Handle different result structures
#                     if selected_intervention == "Public Seating Management":
#                         value = results["metrics"][metric_key]
#                         delta = results["increases"][display_name]
#                     else:  # Mobility Management
#                         value = results[metric_key]
#                         delta = None  # No deltas for mobility metrics
                    
#                     st.metric(
#                         display_name,
#                         format_str.format(value),
#                         delta
#                     )
        
#         with col2:
#             for i in range(half_metrics, len(metrics_to_show)):
#                 metric_key, format_str, display_name = metrics_to_show[i]
                
#                 # Handle different result structures
#                 if selected_intervention == "Public Seating Management":
#                     value = results["metrics"][metric_key]
#                     delta = results["increases"][display_name]
#                 else:  # Mobility Management
#                     value = results[metric_key]
#                     delta = None  # No deltas for mobility metrics
                
#                 st.metric(
#                     display_name,
#                     format_str.format(value),
#                     delta
#                 )

#     with right_col:
#         st.header(selected_intervention)
#         st.markdown(INTERVENTIONS[selected_intervention]["description"])
        
#         # Add basic tabs
#         tab1, tab2 = st.tabs(["Impact Analysis", "Trade-offs"])
        
#         with tab1:
#             st.subheader("Impact Analysis")
            
#             # Create columns for before/after images
#             col1, col2 = st.columns(2)
            
#             with col1:
#                 st.subheader("Current State")
                
#                 if selected_intervention == "Mobility Management":
#                     st.image("./assets/b0.png", caption="Current State", use_column_width=True)
                
#                 else:  # Public Seating Management
#                     seating_level = params_values.get("seating_level", 0)
#                     plaza_level = params_values.get("plaza_level", 0)
#                     st.image("./assets/s0-p0.png", caption="Current State", use_column_width=True)
            
#             with col2:
#                 st.subheader(f"Transformation")
                
#                 # Display appropriate "after" image based on selected intervention and parameters
#                 if selected_intervention == "Mobility Management":
#                     bike_lane_level = params_values.get("bike_lane_level", 0)
#                     bike_share_level = params_values.get("bike_share_level", 0)

#                     if bike_lane_level == 0 and bike_share_level== 0:
#                         st.image("./assets/b0.png", caption="No dedicated Bike Lanes, Minimal Bike-sharing Capacity", use_column_width=True)
#                     elif bike_lane_level == 0 and bike_share_level== 1:
#                         st.image("./assets/b0.png", caption="No dedicated Bike Lanes, Minimal Bike-sharing Capacity", use_column_width=True)
#                     elif bike_lane_level == 0 and bike_share_level== 1:
#                         st.image("./assets/b1.png", caption="Transformed State with dedicated Bike Lanes, Minimal Bike-sharing Capacity", use_column_width=True)
#                     elif bike_lane_level == 2 and bike_share_level== 1:
#                         st.image("./assets/b2_s1.png", caption="Transformed State with dedicated Bike Lanes, Minimal Bike-sharing Capacity", use_column_width=True)
#                     elif bike_lane_level == 2 and bike_share_level== 2:
#                         st.image("./assets/b2_s2.png", caption="Transformed State with dedicated Bike Lanes, Minimal Bike-sharing Capacity", use_column_width=True)
#                     else:
#                         st.image("./assets/b1.png", caption="Transformed State with dedicated Bike Lanes, Minimal Bike-sharing Capacity", use_column_width=True)
                
#                 else:  # Public Seating Management
#                     seating_level = params_values.get("seating_level", 0)
#                     plaza_level = params_values.get("plaza_level", 0)

#                     if seating_level == 0 and plaza_level== 0:
#                         st.image("./assets/s0-p0.png", caption="No Seating Added, No Plaza Added", use_column_width=True)
#                     elif seating_level == 0 and plaza_level== 1:
#                         st.image("./assets/s0-p1.png", caption="No Seating Added, Minimal Plaza Added", use_column_width=True)
#                     elif seating_level == 0 and plaza_level== 2:
#                         st.image("./assets/s0-p2.png", caption="No Seating Added, Extensive Plaza Added", use_column_width=True)
#                     elif seating_level == 1 and plaza_level== 0:
#                         st.image("./assets/s1-p0.png", caption="Minimal Seating Added, No Plaza Added", use_column_width=True)
#                     elif seating_level == 1 and plaza_level== 1:
#                         st.image("./assets/s1-p1.png", caption="Minimal Seating Added, Minimal Plaza Added", use_column_width=True)
#                     elif seating_level == 1 and plaza_level== 2:
#                         st.image("./assets/s1-p2.png", caption="Minimal Seating Added, Extensive Plaza Added", use_column_width=True)
#                     elif seating_level == 2 and plaza_level== 0:
#                         st.image("./assets/s2-p0.png", caption="Extensive Seating Added, No Plaza Added", use_column_width=True)
#                     elif seating_level == 2 and plaza_level== 1:
#                         st.image("./assets/s2-p1.png", caption="Extensive Seating Added, Minimal Plaza Added", use_column_width=True)
#                     elif seating_level == 2 and plaza_level== 2:
#                         st.image("./assets/s2-p2.png", caption="Extensive Seating Added, Extensive Plaza Added", use_column_width=True)
        
#         with tab2:
#             st.subheader("Trade-offs")
#             st.subheader("Conflicts & Considerations")

#             if selected_intervention == "Public Seating Management":
#                 considerations = [
#                     "Maintenance costs for public seating and plazas need to be factored into long-term budgets",
#                     "Potential concerns about safety issues in seating areas",
#                     "Weather protection is critical for year-round usability",
#                 ]
#             else:  # Mobility Management
#                 considerations = [
#                     "Covert curbside parking to bike lanes might increase congestion",
#                     "Weather considerations may affect year-round bike usage",
#                     "Initial infrastructure costs are high but maintenance costs are lower than road maintenance",
#                 ]
#             for consideration in considerations:
#                 st.markdown(f"* {consideration}")
            
#             st.subheader("Recommendations")

#             if selected_intervention == "Public Seating Management":
#                 recommendations = [
#                     "Position seating to maintain adequate walking paths",
#                     "Incorporate weather protection for year-round usability",
#                     "Include a variety of seating types to accommodate different user needs",
#                     "Establish a maintenance plan and budget for long-term sustainability"
#                 ]
#             else:  # Mobility Management
#                 recommendations = [
#                     "Implement protected bike lanes where possible to maximize safety benefits",
#                     "Position bike share stations near transit nodes and major employment centers",
#                     "Balance bike lane implementation with delivery zone preservation for businesses"
#                 ]
            
#             for recommendation in recommendations:
#                 st.markdown(f"🔹 {recommendation}")

#             st.subheader('Combined Implementation Approach')
#             st.write('Synergies & Opportunities:')
#             st.write('Community Hubs: Placing bike share stations near plazas creates natural gathering points.')
#             st.write('Rest Points: Strategically placed seating along bike routes provides needed rest areas.')
#             st.write('Shared Maintenance: Combined implementations can share maintenance resources and costs.')
#             st.write('Complete Streets: Integrating both interventions supports "complete streets" principles.')
#             st.write('Funding Opportunities: Combined projects may qualify for more diverse funding sources.')
            
#             if selected_intervention == "Public Seating Management":
#                 # Get trade-offs data from results
#                 tradeoffs = results["tradeoffs"]
                
#                 # # Create a DataFrame from the trade-offs dictionary
#                 # df_tradeoffs = pd.DataFrame({
#                 #     'Category': list(tradeoffs.keys()),
#                 #     'Score': list(tradeoffs.values())
#                 # })
                
#                 # # Display a horizontal bar chart for better visualization
#                 # st.write("Trade-offs Visualization:")
#                 # fig = px.bar(df_tradeoffs, 
#                 #             x='Score', 
#                 #             y='Category',
#                 #             orientation='h',
#                 #             labels={'Score': 'Impact (0-100)', 'Category': ''},
#                 #             color='Score',
#                 #             color_continuous_scale=['red', 'yellow', 'green'],
#                 #             range_x=[0, 100])
                            
#                 # # Update layout for better readability
#                 # fig.update_layout(
#                 #     height=400,
#                 #     margin=dict(l=20, r=20, t=30, b=20),
#                 #     yaxis=dict(autorange="reversed")  # Reverse y-axis for better readability
#                 # )
                
#                 # st.plotly_chart(fig, use_container_width=True)
                
#                 # Add a radar chart as an alternative visualization
#                 categories = list(tradeoffs.keys())
#                 values = list(tradeoffs.values())
                
#                 # Add a radar chart
#                 fig_radar = go.Figure()
                
#                 # Add trace for current values
#                 fig_radar.add_trace(go.Scatterpolar(
#                     r=values,
#                     theta=categories,
#                     fill='toself',
#                     name='Current Selection',
#                     line=dict(color='rgba(31, 119, 180, 0.8)'),
#                     fillcolor='rgba(31, 119, 180, 0.3)'
#                 ))
                
#                 # Add trace for baseline (50% on all metrics)
#                 fig_radar.add_trace(go.Scatterpolar(
#                     r=[50, 50, 50, 50, 50],
#                     theta=categories,
#                     fill='toself',
#                     name='Baseline',
#                     line=dict(color='rgba(100, 100, 100, 0.3)'),
#                     fillcolor='rgba(100, 100, 100, 0.1)'
#                 ))
                
#                 # Update radar layout
#                 fig_radar.update_layout(
#                     polar=dict(
#                         radialaxis=dict(
#                             visible=True,
#                             range=[0, 100]
#                         )
#                     ),
#                     showlegend=True,
#                     height=450,
#                     margin=dict(l=80, r=80, t=40, b=40)
#                 )
                
#                 st.plotly_chart(fig_radar, use_container_width=True)
                
#             else:  # Mobility Management
#                 # For Mobility Management, create a simple visualization of key metrics
#                 categories = ['pedestrian_safety', 'traffic_flow', 'business_access', 'cost_efficiency', 'community_support']
#                 values = [results[category] for category in categories]
                
#                 # Format category names for display
#                 display_categories = [cat.replace('_', ' ').title() for cat in categories]
                
#                 # Create a DataFrame for the metrics
#                 df_metrics = pd.DataFrame({
#                     'Category': display_categories,
#                     'Score': values
#                 })
                
                
#                 # Display a horizontal bar chart
#                 # st.write("Trade-offs Visualization:")
#                 # fig = px.bar(df_metrics, 
#                 #             x='Score', 
#                 #             y='Category',
#                 #             orientation='h',
#                 #             labels={'Score': 'Impact (0-100)', 'Category': ''},
#                 #             color='Score',
#                 #             color_continuous_scale=['red', 'yellow', 'green'],
#                 #             range_x=[0, 100])
                            
#                 # # Update layout for better readability
#                 # fig.update_layout(
#                 #     height=400,
#                 #     margin=dict(l=20, r=20, t=30, b=20),
#                 #     yaxis=dict(autorange="reversed")  # Reverse y-axis for better readability
#                 # )
                
#                 # st.plotly_chart(fig, use_container_width=True)

# # Footer
# st.markdown("---")
# st.caption("Urban Interventions Interactive Tool - Created with Streamlit")


import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go

from config import CATEGORICAL_LABELS, INTERVENTIONS, METRIC_DISPLAY_CONFIG, SIMPLIFIED_CALCULATORS

# Setup page
st.set_page_config(page_title="Pop-up Interventions Tool", page_icon="🏙️", layout="wide")

# Add custom CSS to increase tab font size
st.markdown("""
<style>
    button[data-baseweb="tab"] {
        font-size: 16px;
    }
</style>
""", unsafe_allow_html=True)

# Header
st.title("LIC Consensus - Interactive Tool")
st.markdown("Explore the impacts and trade-offs of different transformations")
st.markdown("We value all kinds of feedbacks!")
st.markdown("---")

tab1, tab2, tab3 = st.tabs(["Analysis", "Feedback", "Consensus Dashboard"])

with tab1:
    left_col, right_col = st.columns([1, 2])

    with left_col:
        st.subheader("Intervention Controls")
        
        # Add basic intervention selector
        selected_intervention = st.selectbox(
            "Select Intervention",
            list(INTERVENTIONS.keys())
        )
        
        # Add parameter controls section
        st.subheader("Adjust Parameters")

        if selected_intervention == "Pop-up Market":
            st.write('Pop-up Market Implementation Level Guide:')
            st.write('0 - None, 1 - Minimal (1-2), 2 - Extensive (>=5)')
            st.write('Pop-up Art Installation Level Guide:')
            st.write('0 - None, 1 - Minimal, 2 - Extensive')
        elif selected_intervention == "Pop-up Art Installation":
            st.write('Pop-up Art Installation Level Guide:')
            st.write('0 - None, 1 - Minimal, 2 - Extensive')
            st.write('Pop-up Market Implementation Level Guide:')
            st.write('0 - None, 1 - Minimal (1-2), 2 - Extensive (>=5)')

        # Create parameters dict to store the values
        params_values = {}

        # Display sliders for the selected intervention
        for param_key, param_info in INTERVENTIONS[selected_intervention]["parameters"].items():
            # Create a slider with categorical values
            param_value = st.slider(
                f"{param_info['label']}",
                param_info['min'],
                param_info['max'],
                param_info['default'],
                format="%d",
                help=param_info['description']
            )
            
            # Display the selected label
            st.caption(f"Selected: {CATEGORICAL_LABELS[param_value]}")
            
            # Store the parameter value
            params_values[param_key] = param_value

        # Display impact metrics based on intervention type
        st.subheader("Impact Metrics")

        # Call the appropriate simplified calculation function based on the selected intervention
        metric_calculator = SIMPLIFIED_CALCULATORS[selected_intervention]
        
        # Prepare the arguments for the calculation function
        if selected_intervention == "Pop-up Market":
            results = metric_calculator(
                params_values.get("seating_level", 0),
                params_values.get("plaza_level", 0)
            )
        else:  # Pop-up Art Installation
            results = metric_calculator(
                params_values.get("bike_lane_level", 0),
                params_values.get("bike_parking_level", 0),
                params_values.get("bike_share_level", 0)
            )
        
        # Get the display configuration for the selected intervention
        display_config = METRIC_DISPLAY_CONFIG[selected_intervention]
        metrics_to_show = display_config["metrics_to_show"]
        
        # Create two columns for metrics display
        col1, col2 = st.columns(2)
        
        # Distribute metrics across the columns
        half_metrics = len(metrics_to_show) // 2 + (len(metrics_to_show) % 2)
        
        with col1:
            for i in range(half_metrics):
                if i < len(metrics_to_show):
                    metric_key, format_str, display_name = metrics_to_show[i]
                    
                    # Handle different result structures
                    if selected_intervention == "Pop-up Market":
                        value = results["metrics"][metric_key]
                        delta = results["increases"][display_name]
                    else:  # Pop-up Art Installation
                        value = results[metric_key]
                        delta = None  # No deltas for mobility metrics
                    
                    st.metric(
                        display_name,
                        format_str.format(value),
                        delta
                    )
        
        with col2:
            for i in range(half_metrics, len(metrics_to_show)):
                if i < len(metrics_to_show):
                    metric_key, format_str, display_name = metrics_to_show[i]
                    
                    # Handle different result structures
                    if selected_intervention == "Pop-up Market":
                        value = results["metrics"][metric_key]
                        delta = results["increases"][display_name]
                    else:  # Pop-up Art Installation
                        value = results[metric_key]
                        delta = None  # No deltas for mobility metrics
                    
                    st.metric(
                        display_name,
                        format_str.format(value),
                        delta
                    )

    with right_col:
        st.header(selected_intervention)
        st.markdown(INTERVENTIONS[selected_intervention]["description"])
        
        # Add basic tabs
        viz_tab1, viz_tab2 = st.tabs(["Impact Analysis", "Trade-offs"])
        
        with viz_tab1:
            st.subheader("Impact Analysis")
            
            # Create columns for before/after images
            col1, col2 = st.columns(2)
            
            with col1:
                st.subheader("Current State")
                
                if selected_intervention == "Pop-up Art Installation":
                    st.image("./assets/b0.png", caption="Current State", use_column_width=True)
                
                else:  # Pop-up Market
                    seating_level = params_values.get("seating_level", 0)
                    plaza_level = params_values.get("plaza_level", 0)
                    st.image("./assets/s0-p0.png", caption="Current State", use_column_width=True)
            
            with col2:
                st.subheader(f"Transformation")
                
                # Display appropriate "after" image based on selected intervention and parameters
                if selected_intervention == "Pop-up Art Installation":
                    bike_lane_level = params_values.get("bike_lane_level", 0)
                    bike_share_level = params_values.get("bike_share_level", 0)

                    if bike_lane_level == 0 and bike_share_level == 0:
                        st.image("./assets/b0.png", caption="No Art Installation Added", use_column_width=True)
                    elif bike_lane_level == 0 and bike_share_level == 1:
                        st.image("./assets/b0.png", caption="No Art Installation, Minimal Bike-sharing", use_column_width=True)
                    elif bike_lane_level == 1 and bike_share_level == 1:
                        st.image("./assets/b1.png", caption="Minimal Art Installation with Bike-sharing Features", use_column_width=True)
                    elif bike_lane_level == 2 and bike_share_level == 1:
                        st.image("./assets/b2_s1.png", caption="Extensive Art Installation, Minimal Bike-sharing Features", use_column_width=True)
                    elif bike_lane_level == 2 and bike_share_level == 2:
                        st.image("./assets/b2_s2.png", caption="Extensive Art Installation with Full Bike-sharing Features", use_column_width=True)
                    else:
                        st.image("./assets/b1.png", caption="Minimal Art Installation", use_column_width=True)
                
                else:  # Pop-up Market
                    seating_level = params_values.get("seating_level", 0)
                    plaza_level = params_values.get("plaza_level", 0)

                    if seating_level == 0 and plaza_level == 0:
                        st.image("./assets/s0-p0.png", caption="No Market Setup, No Plaza Added", use_column_width=True)
                    elif seating_level == 0 and plaza_level == 1:
                        st.image("./assets/s0-p1.png", caption="No Market Setup, Minimal Plaza Added", use_column_width=True)
                    elif seating_level == 0 and plaza_level == 2:
                        st.image("./assets/s0-p2.png", caption="No Market Setup, Extensive Plaza Added", use_column_width=True)
                    elif seating_level == 1 and plaza_level == 0:
                        st.image("./assets/s1-p0.png", caption="Minimal Market Setup, No Plaza Added", use_column_width=True)
                    elif seating_level == 1 and plaza_level == 1:
                        st.image("./assets/s1-p1.png", caption="Minimal Market Setup, Minimal Plaza Added", use_column_width=True)
                    elif seating_level == 1 and plaza_level == 2:
                        st.image("./assets/s1-p2.png", caption="Minimal Market Setup, Extensive Plaza Added", use_column_width=True)
                    elif seating_level == 2 and plaza_level == 0:
                        st.image("./assets/s2-p0.png", caption="Extensive Market Setup, No Plaza Added", use_column_width=True)
                    elif seating_level == 2 and plaza_level == 1:
                        st.image("./assets/s2-p1.png", caption="Extensive Market Setup, Minimal Plaza Added", use_column_width=True)
                    elif seating_level == 2 and plaza_level == 2:
                        st.image("./assets/s2-p2.png", caption="Extensive Market Setup, Extensive Plaza Added", use_column_width=True)
        
        with viz_tab2:
            st.subheader("Trade-offs")
            st.subheader("Conflicts & Considerations")

            if selected_intervention == "Pop-up Market":
                considerations = [
                    "Maintenance costs for market facilities and plazas need to be factored into long-term budgets",
                    "Potential concerns about crowd management during peak market hours",
                    "Weather protection is critical for year-round market operation",
                ]
            else:  # Pop-up Art Installation
                considerations = [
                    "Art installations may temporarily reduce available space for pedestrians",
                    "Weather considerations may affect durability of outdoor installations",
                    "Initial installation costs are high but can attract significant foot traffic",
                ]
            for consideration in considerations:
                st.markdown(f"* {consideration}")
            
            st.subheader("Recommendations")

            if selected_intervention == "Pop-up Market":
                recommendations = [
                    "Position market stalls to maintain adequate walking paths",
                    "Incorporate weather protection for year-round usability",
                    "Include a variety of market sections to accommodate different vendors",
                    "Establish a maintenance plan and budget for long-term sustainability"
                ]
            else:  # Pop-up Art Installation
                recommendations = [
                    "Implement interactive art pieces where possible to maximize engagement",
                    "Position installations near transit nodes and major gathering points",
                    "Balance art placement with business visibility for mutual benefits"
                ]
            
            for recommendation in recommendations:
                st.markdown(f"🔹 {recommendation}")

            st.subheader('Combined Implementation Approach')
            st.write('Synergies & Opportunities:')
            st.write('Community Hubs: Placing art installations near markets creates natural gathering points.')
            st.write('Experience Points: Strategically placed art along market routes provides cultural touchpoints.')
            st.write('Shared Maintenance: Combined implementations can share maintenance resources and costs.')
            st.write('Complete Streets: Integrating both interventions supports "complete streets" principles.')
            st.write('Funding Opportunities: Combined projects may qualify for more diverse funding sources.')
            
            if selected_intervention == "Pop-up Market":
                # Get trade-offs data from results
                tradeoffs = results["tradeoffs"]
                
                # Add a radar chart
                categories = list(tradeoffs.keys())
                values = list(tradeoffs.values())
                
                fig_radar = go.Figure()
                
                # Add trace for current values
                fig_radar.add_trace(go.Scatterpolar(
                    r=values,
                    theta=categories,
                    fill='toself',
                    name='Current Selection',
                    line=dict(color='rgba(31, 119, 180, 0.8)'),
                    fillcolor='rgba(31, 119, 180, 0.3)'
                ))
                
                # Add trace for baseline (50% on all metrics)
                fig_radar.add_trace(go.Scatterpolar(
                    r=[50, 50, 50, 50, 50],
                    theta=categories,
                    fill='toself',
                    name='Baseline',
                    line=dict(color='rgba(100, 100, 100, 0.3)'),
                    fillcolor='rgba(100, 100, 100, 0.1)'
                ))
                
                # Update radar layout
                fig_radar.update_layout(
                    polar=dict(
                        radialaxis=dict(
                            visible=True,
                            range=[0, 100]
                        )
                    ),
                    showlegend=True,
                    height=450,
                    margin=dict(l=80, r=80, t=40, b=40)
                )
                
                st.plotly_chart(fig_radar, use_container_width=True)
                
            else:  # Pop-up Art Installation
                # For Art Installation, create a visualization of key metrics
                categories = ['pedestrian_safety', 'traffic_flow', 'business_access', 'cost_efficiency', 'community_support']
                values = [results[category] for category in categories]
                
                # Format category names for display
                display_categories = [cat.replace('_', ' ').title() for cat in categories]
                
                # Create radar chart for Art Installation metrics
                fig_radar = go.Figure()
                
                # Add trace for current values
                fig_radar.add_trace(go.Scatterpolar(
                    r=values,
                    theta=display_categories,
                    fill='toself',
                    name='Current Selection',
                    line=dict(color='rgba(31, 119, 180, 0.8)'),
                    fillcolor='rgba(31, 119, 180, 0.3)'
                ))
                
                # Add trace for baseline (50% on all metrics)
                fig_radar.add_trace(go.Scatterpolar(
                    r=[50, 50, 50, 50, 50],
                    theta=display_categories,
                    fill='toself',
                    name='Baseline',
                    line=dict(color='rgba(100, 100, 100, 0.3)'),
                    fillcolor='rgba(100, 100, 100, 0.1)'
                ))
                
                # Update radar layout
                fig_radar.update_layout(
                    polar=dict(
                        radialaxis=dict(
                            visible=True,
                            range=[0, 100]
                        )
                    ),
                    showlegend=True,
                    height=450,
                    margin=dict(l=80, r=80, t=40, b=40)
                )
                
                st.plotly_chart(fig_radar, use_container_width=True)



with tab3:
    st.subheader("Consensus Dashboard")
    st.markdown("See where different stakeholders align on intervention options")
    
    # Create dummy consensus data
    consensus_data = {
        "Pop-up Art Installation - Minimal": {
            "Residents": 78,
            "Business Owners": 65,
            "LICP Officials": 82,
            "Municipal Departments": 70,
            "Investors": 55,
            "Arts Organizations": 90
        },
        "Pop-up Art Installation - Extensive": {
            "Residents": 85,
            "Business Owners": 60,
            "LICP Officials": 75,
            "Municipal Departments": 65,
            "Investors": 50,
            "Arts Organizations": 95
        },
        "Pop-up Market - Minimal": {
            "Residents": 72,
            "Business Owners": 80,
            "LICP Officials": 78,
            "Municipal Departments": 75,
            "Investors": 70,
            "Arts Organizations": 85
        },
        "Pop-up Market - Extensive": {
            "Residents": 80,
            "Business Owners": 75,
            "LICP Officials": 70,
            "Municipal Departments": 60,
            "Investors": 65,
            "Arts Organizations": 90
        }
    }
    
    # Visualize consensus with a heatmap
    interventions = list(consensus_data.keys())
    stakeholders = list(consensus_data[interventions[0]].keys())
    
    data = []
    for intervention in interventions:
        for stakeholder in stakeholders:
            data.append({
                "Intervention": intervention,
                "Stakeholder": stakeholder,
                "Support Level": consensus_data[intervention][stakeholder]
            })
    
    df_consensus = pd.DataFrame(data)
    
    # Create heatmap
    fig = px.imshow(
        df_consensus.pivot(index="Intervention", columns="Stakeholder", values="Support Level"),
        labels=dict(x="Stakeholder", y="Intervention", color="Support Level"),
        x=stakeholders,
        y=interventions,
        color_continuous_scale="RdYlGn",
        zmin=0, zmax=100
    )
    
    fig.update_layout(
        margin=dict(l=50, r=50, t=30, b=50),
        height=400
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    # Add consensus analysis text
    st.subheader("Consensus Analysis")
    st.markdown("**Areas of Strong Agreement:**")
    st.markdown("• All stakeholders show support for minimal public plaza/market implementation")
    st.markdown("• Residents and Arts Organizations strongly favor extensive Pop-up Art Installation")
    
    st.markdown("**Areas of Divergence:**")
    st.markdown("• Investors show lower support for extensive Pop-up Art Installation")
    st.markdown("• Municipal Departments have concerns about extensive plaza/market implementations")



# Footer
st.markdown("---")
st.caption("Urban Interventions Interactive Tool - Created with Streamlit")