import { CREATE_Restaurants, DELETE_Restaurants, GET_Restaurants, UPDATE_Restaurants } from "../Types/RestaurantsTypes";


const StateDefaule = {
  Restaurants: [],
};

export const RestaurantsReducer = (state = StateDefaule, action) => {
  switch (action.type) {
    case GET_Restaurants: {
      return { ...state, Restaurants: [...action.payload] };
    }
    case CREATE_Restaurants: {
      return { ...state, Restaurants: [...state.Restaurants, action.payload] };
    }
    case DELETE_Restaurants: {
      return { ...state, Restaurants: [...state.Restaurants, action.payload.id] };
    }
    case UPDATE_Restaurants: {
      return { ...state, Restaurants: [...state.Restaurants, action.payload.id] };
    }
    default:
      return state;
  }
};
