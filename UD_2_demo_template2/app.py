import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

def main():
    st.title("LIC Street Transformation Analysis Tool")
    
    # Sidebar for intervention controls
    st.sidebar.header("Transformation Parameters")
    
    # Street Configuration
    st.sidebar.subheader("Street Layout")
    sidewalk_width = st.sidebar.slider("Sidewalk Width (ft)", 5, 20, 10)
    bike_lanes = st.sidebar.checkbox("Add Protected Bike Lanes")
    parking_spaces = st.sidebar.slider("Parking Spaces per Block", 0, 20, 10)
    
    # Public Space
    st.sidebar.subheader("Public Space Features")
    seating_areas = st.sidebar.slider("Public Seating Areas per Block", 0, 5, 2)
    trees = st.sidebar.slider("Trees per Block", 0, 10, 4)
    
    # Land Use Mix
    st.sidebar.subheader("Land Use Distribution")
    retail_percent = st.sidebar.slider("Retail Space %", 0, 100, 30)
    office_percent = st.sidebar.slider("Office Space %", 0, 100, 40)
    industrial_percent = st.sidebar.slider("Industrial Space %", 0, 100, 30)
    
    # Main content area
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Impact Analysis")
        
        # Calculate metrics based on inputs
        walkability_score = calculate_walkability(sidewalk_width, trees, seating_areas)
        economic_vitality = calculate_economic_impact(retail_percent, office_percent)
        sustainability_score = calculate_sustainability(trees, bike_lanes)
        
        # Display metrics
        metrics = {
            "Walkability Score": walkability_score,
            "Economic Vitality": economic_vitality,
            "Sustainability Score": sustainability_score
        }
        
        # Create radar chart
        fig = create_radar_chart(metrics)
        st.plotly_chart(fig)
        
    with col2:
        st.subheader("Cost-Benefit Analysis")
        
        # Calculate costs
        implementation_cost = calculate_costs(sidewalk_width, bike_lanes, 
                                           seating_areas, trees)
        
        # Display cost breakdown
        st.write(f"Estimated Implementation Cost: ${implementation_cost:,.2f}")
        
        # Create cost breakdown pie chart
        cost_breakdown = create_cost_breakdown(sidewalk_width, bike_lanes, 
                                             seating_areas, trees)
        fig2 = px.pie(values=list(cost_breakdown.values()), 
                     names=list(cost_breakdown.keys()),
                     title="Cost Breakdown")
        st.plotly_chart(fig2)
    
    # Timeline and Phasing
    st.subheader("Implementation Timeline")
    create_timeline_chart()

def calculate_walkability(sidewalk_width, trees, seating):
    # Simple weighted calculation
    return min(100, (sidewalk_width * 3 + trees * 5 + seating * 8))

def calculate_economic_impact(retail, office):
    # Simple weighted calculation
    return min(100, (retail * 0.6 + office * 0.4))

def calculate_sustainability(trees, bike_lanes):
    # Simple weighted calculation
    base_score = trees * 8
    if bike_lanes:
        base_score += 30
    return min(100, base_score)

def calculate_costs(sidewalk_width, bike_lanes, seating, trees):
    # Simple cost calculation (placeholder values)
    sidewalk_cost = sidewalk_width * 1000
    bike_lane_cost = 50000 if bike_lanes else 0
    seating_cost = seating * 5000
    tree_cost = trees * 3000
    return sidewalk_cost + bike_lane_cost + seating_cost + tree_cost

def create_cost_breakdown(sidewalk_width, bike_lanes, seating, trees):
    return {
        "Sidewalk Improvements": sidewalk_width * 1000,
        "Bike Infrastructure": 50000 if bike_lanes else 0,
        "Public Seating": seating * 5000,
        "Tree Planting": trees * 3000
    }

def create_radar_chart(metrics):
    categories = list(metrics.keys())
    values = list(metrics.values())
    
    fig = go.Figure(data=go.Scatterpolar(
        r=values,
        theta=categories,
        fill='toself'
    ))
    
    fig.update_layout(
        polar=dict(
            radialaxis=dict(
                visible=True,
                range=[0, 100]
            )),
        showlegend=False
    )
    
    return fig

def create_timeline_chart():
    # Create sample timeline data
    timeline_data = pd.DataFrame({
        'Task': ['Planning & Design', 'Sidewalk Construction', 
                 'Tree Planting', 'Seating Installation'],
        'Start': ['2024-06', '2024-09', '2025-03', '2025-04'],
        'End': ['2024-09', '2025-03', '2025-05', '2025-06']
    })
    
    fig = px.timeline(timeline_data, x_start="Start", x_end="End", y="Task",
                     title="Project Timeline")
    st.plotly_chart(fig)

if __name__ == "__main__":
    main()