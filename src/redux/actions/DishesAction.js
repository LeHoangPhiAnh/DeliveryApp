import { CreateDishesTypes,  DeleteDishesTypes, getAllDishes, UpdateDishesTypes } from "../Types/DishesTypes";


export const fetchAllDishes = () => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch("http://192.168.1.5:19001/api/Dishes");
        const data = await response.json();
        dispatch(getAllDishes(data));
      } catch (error) {
        console.log(error, "500");
      }
    };
    getData();
  };
};


export const CreateDishesAction = (data) => {
  return (dispatch) => {
    const CreateData = async () => {
      try {
       await fetch("http://192.168.1.5:19001/createDish",{
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
    dispatch(CreateDishesTypes(data))
    dispatch(fetchAllDishes())
  };
};



export const DeleteDishesAction = (id,data) => {
  return (dispatch) => {
    const DeleteData = async () => {
      try {
       await fetch(`http://192.168.1.5:19001/deleteDish/${id}`,{
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
    dispatch(DeleteDishesTypes(data))
    dispatch(fetchAllDishes())
  };
};


export const UpdateDishesAction = (id,data) => {
  return (dispatch) => {
    const PUTData = async () => {
      try {
       await fetch(`http://192.168.1.5:19001/updateDish/${id}`,{
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
    dispatch(UpdateDishesTypes(data))
    dispatch(fetchAllDishes())
  };
};