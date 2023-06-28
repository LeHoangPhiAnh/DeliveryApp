export const GET_Orders = "GET_Orders"
export const CREATE_Orders = "CREATE_Orders"
export const DELETE_Orders = "DELETE_Orders"
export const UPDATE_Orders = "UPDATE_Orders"
export const GETONLY_Order = "GETONLY_Order"

export const getAllOrders = (Orders) =>{
    return {
        type: GET_Orders,
        payload:Orders,
    }
}

export const CreateOrdersTypes = (Orders) =>{
    return {
        type: CREATE_Orders,
        payload:Orders,
    }
}

export const DeleteOrdersTypes = (id) =>{
    return {
        type: DELETE_Orders,
        payload:id,
    }
}

export const UpdateOrdersTypes = (id) =>{
    return {
        type: UPDATE_Orders,
        payload:id,
    }
}
