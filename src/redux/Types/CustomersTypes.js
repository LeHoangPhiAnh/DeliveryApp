export const GET_Customers = "GET_Customers"
export const CREATE_Customers = "CREATE_Customers"
export const DELETE_Customers = "DELETE_Customers"
export const UPDATE_Customers = "UPDATE_Customers"
export const GETONLY_Customer = "GETONLY_Customer"

export const getAllCustomers = (customers) =>{
    return {
        type: GET_Customers,
        payload:customers,
    }
}

export const CreateCustomersTypes = (customers) =>{
    return {
        type: CREATE_Customers,
        payload:customers,
    }
}

export const DeleteCustomersTypes = (id) =>{
    return {
        type: DELETE_Customers,
        payload:id,
    }
}

export const UpdateCustomersTypes = (id) =>{
    return {
        type: UPDATE_Customers,
        payload:id,
    }
}
