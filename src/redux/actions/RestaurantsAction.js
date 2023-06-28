import { CreateRestaurantsTypes, DeleteRestaurantsTypes, getAllRestaurants, UpdateRestaurantsTypes } from "../Types/RestaurantsTypes";


export const fetchAllRestaurants = () => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch("http://192.168.1.5:19001/api/Restaurants");
        const data = await response.json();
        dispatch(getAllRestaurants(data));
      } catch (error) {
        console.log(error, "500");
      }
    };
    getData();
  };
};


export const CreateRestaurantAction = (data) => {
  return (dispatch) => {
    const CreateData = async () => {
      try {
       await fetch("http://192.168.1.5:19001/createRestaurant",{
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
    dispatch(CreateRestaurantsTypes(data))
    dispatch(fetchAllRestaurants())
  };
};


export const DeleteRestaurantsAction = (id,data) => {
  return (dispatch) => {
    const DeleteData = async () => {
      try {
       await fetch(`http://192.168.1.5:19001/deleteRestaurant/${id}`,{
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
    dispatch(DeleteRestaurantsTypes(data))
    dispatch(fetchAllRestaurants())
  };
};


export const UpdateRestaurantsAction = (id,data) => {
  return (dispatch) => {
    const PUTData = async () => {
      try {
       await fetch(`http://192.168.1.5:19001/updateRestaurant/${id}`,{
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
    dispatch(UpdateRestaurantsTypes(data))
    dispatch(fetchAllRestaurants())
  };
};