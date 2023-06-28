import { CREATE_Customers, DELETE_Customers, GET_Customers, UPDATE_Customers,GETONLY_Customer } from "../Types/CustomersTypes";


const StateDefaule = {
  Customers: [
  ],
};

export const CustomersReducer = (state = StateDefaule, action) => {
  switch (action.type) {
    case GET_Customers: {
      return { ...state, Customers: [...action.payload] };
    }
    case CREATE_Customers: {
      return { ...state, Customers: [...state.Customers, action.payload] };
    }
    case DELETE_Customers: {
      return { ...state, Customers: [...state.Customers, action.payload.id] };
    }
    case UPDATE_Customers: {
      return { ...state, Customers: [...state.Customers, action.payload.id] };
    }
    default:
      return state;
  }
};
