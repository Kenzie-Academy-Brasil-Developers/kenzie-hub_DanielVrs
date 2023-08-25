import { createContext, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const RoutineTechContext = createContext({});

export const RoutineTechProvider = ({ children }) => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const pathname = window.location.pathname;

  const [editingTech, setEditingTech] = useState(null);

  const [isOpenModalCreateTech, setIsOpenModalCreateTech] = useState(false);

  const revalidate = () => {
    client.invalidateQueries({ queryKey: "techs" });
  };

  const { data: techList } = useQuery({
    queryKey: ["techs"],
    queryFn: async () => {
      const token = localStorage.getItem("@token-KenzieHub");
      if (token) {
        const { data } = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data.techs;
      } else return null;
    },
  });

  const createTech = useMutation({
    mutationFn: async (formData) => {
      const token = localStorage.getItem("@token-KenzieHub");
      return await api.post("/users/techs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      revalidate();
      toast.success("Tech criada com sucesso!");
      setIsOpenModalCreateTech(false);
    },
  });

  const deleteTech = useMutation({
    mutationFn: async (techId) => {
      const token = localStorage.getItem("@token-KenzieHub");

      return await api.delete(`/users/techs/${techId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      revalidate();
      toast.success("Tech deletada com sucesso!");
    },
  });

  const editTech = useMutation({
    mutationFn: async (data) => {
      const formData = data.formData;
      const techId = data.id;

      const token = localStorage.getItem("@token-KenzieHub");

      return await api.put(`/users/techs/${techId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      revalidate();
      toast.success("Tech editada com sucesso!");
      setEditingTech(null);
    },
  });

  return (
    <RoutineTechContext.Provider
      value={{
        techList,
        createTech,
        editTech,
        deleteTech,
        setEditingTech,
        isOpenModalCreateTech,
        setIsOpenModalCreateTech,
        editingTech,
      }}
    >
      {children}
    </RoutineTechContext.Provider>
  );
};
