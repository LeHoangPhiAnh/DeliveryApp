export const GET_Restaurants = "GET_Restaurants"
export const CREATE_Restaurants = "CREATE_Restaurants"
export const DELETE_Restaurants = "DELETE_Restaurants"
export const UPDATE_Restaurants = "UPDATE_Restaurants"

export const getAllRestaurants = (dishes) =>{
    return {
        type: GET_Restaurants,
        payload:dishes,
    }
}

export const CreateRestaurantsTypes = (dishes) =>{
    return {
        type: CREATE_Restaurants,
        payload:dishes,
    }
}


export const DeleteRestaurantsTypes = (id) =>{
    return {
        type: DELETE_Restaurants,
        payload:id,
    }
}

export const UpdateRestaurantsTypes = (id) =>{
    return {
        type: UPDATE_Restaurants,
        payload:id,
    }
}