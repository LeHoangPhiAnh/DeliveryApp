export const GET_Dishes = "GET_Dishes"
export const CREATE_Dishes = "CREATE_Dishes"
export const DELETE_Dishes = "DELETE_Dishes"
export const UPDATE_Dishes = "UPDATE_Dishes"

export const getAllDishes = (dishes) =>{
    return {
        type: GET_Dishes,
        payload:dishes,
    }
}

export const CreateDishesTypes = (dishes) =>{
    return {
        type: CREATE_Dishes,
        payload:dishes,
    }
}


export const DeleteDishesTypes = (id) =>{
    return {
        type: DELETE_Dishes,
        payload:id,
    }
}

export const UpdateDishesTypes = (id) =>{
    return {
        type: UPDATE_Dishes,
        payload:id,
    }
}