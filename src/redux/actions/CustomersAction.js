import { CreateCustomersTypes, DeleteCustomersTypes, getAllCustomers, UpdateCustomersTypes,GetCustomerTypes } from "../Types/CustomersTypes";

export const fetchAllCustomers = () => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch("http://192.168.1.5:19001/api/Customers");
        const courses = await response.json();
        dispatch(getAllCustomers(courses));
      } catch (error) {
        console.log(error, "500");
      }
    };
    getData();
  };
};


export const CreateCustomerAction = (data) => {
  return (dispatch) => {
    const CreateData = async () => {
      try {
       await fetch("http://192.168.1.5:19001/createCustomer",{
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
    dispatch(CreateCustomersTypes(data))
    dispatch(fetchAllCustomers())
  };
};

export const DeleteCustomerAction = (id,data) => {
  return (dispatch) => {
    const DeleteData = async () => {
      try {
       await fetch(`http://192.168.1.5:19001/deleteCustomer/${id}`,{
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
    dispatch(DeleteCustomersTypes(data))
    dispatch(fetchAllCustomers())
  };
};

export const UpdateCustomerAction = (id,data) => {
  return (dispatch) => {
    const PUTData = async () => {
      try {
       await fetch(`http://192.168.1.5:19001/updateCustomer/${id}`,{
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
    dispatch(UpdateCustomersTypes(data))
    dispatch(fetchAllCustomers())
  };
};
