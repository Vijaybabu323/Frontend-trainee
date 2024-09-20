import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { PieChart, Pie, Sector, Cell } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [newWidgetName, setNewWidgetName] = useState("");
  const [newWidgetText, setNewWidgetText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddWidget = () => {
    if (newWidgetName && selectedCategory) {
      dispatch({
        type: "ADD_WIDGET",
        payload: {
          categoryName: selectedCategory,
          widget: {
            id: Math.random(),
            name: newWidgetName,
            description: newWidgetText,
          },
        },
      });
      setNewWidgetName("");
      setNewWidgetText("");
    }
  };

  const handleRemoveWidget = (categoryName, widgetId) => {
    dispatch({
      type: "REMOVE_WIDGET",
      payload: { categoryName, widgetId },
    });
  };

  return (
    <>
      <h1>CNAPP Dashboard</h1>
      <div className="dashboard-container">
        {categories.map((category) => (
          <div key={category.name} className="category">
            <h2>{category.name}</h2>
            <div className="widgets">
              {category.widgets.map((widget) => (
                <div key={widget.id} className="widget">
                  <span>
                    {widget.name}: {widget.description}
                  </span>
                  {widget.data?.length > 0 ? (
                    <>
                      <PieChart width={300} height={180}>
                        <Pie
                          data={widget.data}
                          cx={120}
                          cy={80}
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                      <button
                        onClick={() =>
                          handleRemoveWidget(category.name, widget.id)
                        }
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <p>no Graph</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="add-widget">
          <h3>Add Widget</h3>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Widget Name"
            value={newWidgetName}
            onChange={(e) => setNewWidgetName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Widget Description"
            value={newWidgetText}
            onChange={(e) => setNewWidgetText(e.target.value)}
          />
          <button onClick={handleAddWidget} className="add-widget-btn">
            Add Widget
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
