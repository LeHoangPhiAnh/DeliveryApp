export const GET_DishOrdered = "GET_DishOrdered"
export const CREATE_DishOrdered = "CREATE_DishOrdered"
export const DELETE_DishOrdered = "DELETE_DishOrdered"
export const UPDATE_DishOrdered = "UPDATE_DishOrdered"


export const getAllDishOrdered = (DishOrdered) =>{
    return {
        type: GET_DishOrdered,
        payload:DishOrdered,
    }
}

export const CreateDishOrderedTypes = (DishOrdered) =>{
    return {
        type: CREATE_DishOrdered,
        payload:DishOrdered,
    }
}

export const DeleteDishOrderedTypes = (id) =>{
    return {
        type: DELETE_DishOrdered,
        payload:id,
    }
}

export const UpdateDishOrderedTypes = (id) =>{
    return {
        type: UPDATE_DishOrdered,
        payload:id,
    }
}
