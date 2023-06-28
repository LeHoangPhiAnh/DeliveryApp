import { combineReducers, createStore,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { CustomersReducer } from "../reducers/CustomerReducers";
import { DishesReducer } from "../reducers/DishesReducers";
import { RestaurantsReducer } from "../reducers/RestaurantReducers";
import {OrdersReducer} from "../reducers/OrderReducers"
import {DishOrderedReducer} from "../reducers/DishOrderedReducers"
const RootReducer = combineReducers({
    CustomersReducer,
    DishesReducer,
    RestaurantsReducer,
    OrdersReducer,
    DishOrderedReducer,
});

export const store = createStore(RootReducer,applyMiddleware(thunk))