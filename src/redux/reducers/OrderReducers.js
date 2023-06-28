import { CREATE_Orders, DELETE_Orders, GET_Orders, UPDATE_Orders,GETONLY_Order } from "../Types/OrdersTypes";


const StateDefaule = {
  Orders: [
  ],
};

export const OrdersReducer = (state = StateDefaule, action) => {
  switch (action.type) {
    case GET_Orders: {
      return { ...state, Orders: [...action.payload] };
    }
    case CREATE_Orders: {
      return { ...state, Orders: [...state.Orders, action.payload] };
    }
    case DELETE_Orders: {
      return { ...state, Orders: [...state.Orders, action.payload.id] };
    }
    case UPDATE_Orders: {
      return { ...state, Orders: [...state.Orders, action.payload.id] };
    }
    default:
      return state;
  }
};
