import { createStore } from 'redux';

const initialState = {
  categories: [
    {
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 1, name: 'Cloud Accounts', description: 'Cloud accounts info', data: [
            { name: "Connected", value: 500 },
            { name: "Not Connected", value: 500 },
          ]
        },
        {
          id: 2, name: 'Cloud Account Risk Assessment', description: 'Risk Assessment', data: [
            { name: "Failed", value: 400 },
            { name: "Warning", value: 300 },
            { name: "Not allowed", value: 300 },
            { name: "Passed", value: 200 }
          ]
        },
      ],
    },
    {
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 1, name: 'Top 5 Companies Specific', description: '', data: []
        },
        {
          id: 2, name: 'Work Load Alerts', description: '', data: []
        },
      ],
    },
  ],
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_WIDGET':
      return {
        ...state,
        categories: state.categories.map(category =>
          category.name === action.payload.categoryName
            ? {
              ...category,
              widgets: [...category.widgets, action.payload.widget],
            }
            : category
        ),
      };
    case 'REMOVE_WIDGET':
      return {
        ...state,
        categories: state.categories.map(category =>
          category.name === action.payload.categoryName
            ? {
              ...category,
              widgets: category.widgets.filter(widget => widget.id !== action.payload.widgetId),
            }
            : category
        ),
      };
    default:
      return state;
  }
};

const store = createStore(dashboardReducer);

export default store;
