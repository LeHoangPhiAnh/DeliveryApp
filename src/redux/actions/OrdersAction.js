import { CreateOrdersTypes, DeleteOrdersTypes, getAllOrders, UpdateOrdersTypes,GetOrderTypes } from "../Types/OrdersTypes";


export const fetchAllOrders = () => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch("http://192.168.1.5:19001/api/Orders");
        const courses = await response.json();
        dispatch(getAllOrders(courses));
      } catch (error) {
        console.log(error, "500");
      }
    };
    getData();
  };
};


export const CreateOrderAction = (data) => {
  return (dispatch) => {
    const CreateData = async () => {
      try {
       await fetch("http://192.168.1.5:19001/createOrder",{
          method:"POST",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          body:JSON.stringify(data)
        });
      } catch (error) {
        console.log(error, "500");
      }
    };
    CreateData();
    dispatch(CreateOrdersTypes(data))
  };
};



export const DeleteOrderAction = (id,data) => {
  return (dispatch) => {
    const DeleteData = async () => {
      try {
       await fetch(`http://192.168.1.5:19001/deleteOrder/${id}`,{
          method:"DELETE",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          body:JSON.stringify(data)
        });
      } catch (error) {
        console.log(error, "500");
      }
    };
    DeleteData();
    dispatch(DeleteOrdersTypes(data))
  };
};


export const UpdateOrderAction = (id,data) => {
  return (dispatch) => {
    const PUTData = async () => {
      try {
       await fetch(`http://192.168.1.5:19001/updateOrder/${id}`,{
          method:"PUT",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          body:JSON.stringify(data)
        });

      } catch (error) {
        console.log(error, "500");
      }
    };
    PUTData();
    dispatch(UpdateOrdersTypes(data))
  };
};
