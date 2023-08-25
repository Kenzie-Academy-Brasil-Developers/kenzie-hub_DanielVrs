import { createContext } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const RoutineUserContext = createContext({});

export const RoutineUserProvider = ({ children }) => {
  const navigate = useNavigate();
  const client = useQueryClient();

  const pathname = window.location.pathname;

  const revalidate = () => {
    client.invalidateQueries({ queryKey: "userCurrent" });
  };

  const { data: user, isLoading } = useQuery({
    queryKey: ["userCurrent"],
    queryFn: async () => {
      const token = localStorage.getItem("@token-KenzieHub");
      if (token) {
        const { data } = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data;
      } else return null;
    },
    onSuccess: () => {},
    onError: () => {
      localStorage.removeItem("@token-KenzieHub");
    },
  });

  const userLogin = useMutation({
    mutationFn: async (loginData) => {
      const res = await api.post("/sessions", loginData.formData);
      const token = res.data.token;
      localStorage.setItem("@token-KenzieHub", token);
      return res.data.user;
    },
    onSuccess: () => {
      revalidate();
      toast.success("Login realizado com sucesso!");
    },
    onError: () => {
      toast.error("O e-mail e a senha não correspondem.");
    },
  });

  const userRegister = async (formData, reset, setLoading) => {
    try {
      setLoading(true);
      await api.post("/users", formData);
      toast.success("Usuário criado com sucesso");
      reset();
      navigate("/");
    } catch (error) {
      if (error.response.data.message === "Email already exists") {
        toast.error("Usuário já cadastrado");
      }
    } finally {
      setLoading(false);
    }
  };

  const userLogout = useMutation({
    mutationFn: () => {
      user.mutate = null;
      localStorage.removeItem("@token-KenzieHub");
      revalidate();
      toast.success("Usuário deslogado");
    },
  });

  return (
    <RoutineUserContext.Provider
      value={{ userLogin, userRegister, user, userLogout, isLoading }}
    >
      {children}
    </RoutineUserContext.Provider>
  );
};
