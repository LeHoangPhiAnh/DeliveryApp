import { CreateDishOrderedTypes, getAllDishOrdered} from "../Types/DishOrderedTypes";


export const fetchAllDishOrdered = () => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch("http://192.168.1.5:19001/api/DishOrdered");
        const courses = await response.json();
        dispatch(getAllDishOrdered(courses));
      } catch (error) {
        console.log(error, "500");
      }
    };
    getData();
  };
};


export const CreateDishOrderedAction = (data) => {
  return (dispatch) => {
    const CreateData = async () => {
      try {
       await fetch("http://192.168.1.5:19001/createDishOrdered",{
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
    dispatch(CreateDishOrderedTypes(data))
    dispatch(fetchAllDishOrdered())
  };
};



