import { CREATE_Dishes, DELETE_Dishes, GET_Dishes, UPDATE_Dishes } from "../Types/DishesTypes";


const StateDefaule = {
  Dishes: [],
};

export const DishesReducer = (state = StateDefaule, action) => {
  switch (action.type) {
    case GET_Dishes: {
      return { ...state, Dishes: [...action.payload] };
    }
    case CREATE_Dishes: {
      return { ...state, Dishes: [...state.Dishes, action.payload] };
    }
    case DELETE_Dishes: {
      return { ...state, Dishes: [...state.Dishes, action.payload.id] };
    }
    case UPDATE_Dishes: {
      return { ...state, Dishes: [...state.Dishes, action.payload.id] };
    }
    default:
      return state;
  }
};
