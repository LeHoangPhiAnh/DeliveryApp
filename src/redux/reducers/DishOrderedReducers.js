import { CREATE_DishOrdered, GET_DishOrdered} from "../Types/DishOrderedTypes";


const StateDefaule = {
  DishOrdered: [
  ],
};

export const DishOrderedReducer = (state = StateDefaule, action) => {
  switch (action.type) {
    case GET_DishOrdered: {
      return { ...state, DishOrdered: [...action.payload] };
    }
    case CREATE_DishOrdered: {
      return { ...state, DishOrdered: [...state.DishOrdered, action.payload] };
    }
    default:
      return state;
  }
};
