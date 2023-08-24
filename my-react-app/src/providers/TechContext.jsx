import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

export const RoutineTechContext = createContext({});

export const RoutineTechProvider = ({ children }) => {

  // const [ techList, setTechList ] = useState([]);
  
  const [ editingTech, setEditingTech ] = useState(null);
 
  const [ isOpenModalCreateTech, setIsOpenModalCreateTech]= useState(false)

  const { data: techList} = useQuery({ queryKey: ["techs"], queryFn: async () => {
    const token = localStorage.getItem("@token-KenzieHub");
    const { data } = await api.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.techs;
  }})

 

  // useEffect(() => {
  //   const getTechList = async () =>{
  //     const token = localStorage.getItem("@token-KenzieHub");

  //     if (token) {
  //       try {
  //         const { data } = await api.get("/profile", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         setTechList(data.techs)
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }
  //   getTechList()
  // },[]);

  const createTech = async (formData , reset ) => {
    const token = localStorage.getItem("@token-KenzieHub");
    try {
      const { data } = await api.post("/users/techs",formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        setTechList([...techList,{id: data.id, title: data.title, status: data.status}]);
        toast.success("Tech criada com sucesso!");
        reset();
      } catch (error) {
        console.log(error)
      }finally {
        
        setIsOpenModalCreateTech(false)
      }

  }

  const editTech= async (techId, formData) => {
    const token = localStorage.getItem("@token-KenzieHub");
   
    try {
        const { data } = await api.put(`/users/techs/${techId}`,formData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newTechList = techList.map(tech => {
        if (tech.id === editingTech.id) {
            return data
        } else {
          return tech
        }
      } )
     
      setTechList(newTechList);
      setEditingTech(null);
      toast.success("Tech editada com sucesso!");
    } catch (error) {
      console.log(error)
    }
    
  }

  const deleteTech = async (techId) => {
    const token = localStorage.getItem("@token-KenzieHub");
    try {
        await api.delete(`/users/techs/${techId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newTechList = techList.filter(tech => tech.id !== techId);
      setTechList(newTechList)
      toast.success("Tech deletada com sucesso!");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <RoutineTechContext.Provider value={{ techList, createTech, editTech, deleteTech, setEditingTech, isOpenModalCreateTech, setIsOpenModalCreateTech, editingTech }}>
      {children}
    </RoutineTechContext.Provider>
  );
};
