// src/context/ProjetosContext.tsx
import React, { createContext, useContext, useState } from "react";

type Projeto = {
  id: number;
  name: string;
  image: string | null;
  info: string;
  descricao: string;
};

type ProjetosContextType = {
  projetos: Projeto[];
  adicionarProjeto: (projeto: Projeto) => void;
};

const ProjetosContext = createContext<ProjetosContextType>({
  projetos: [],
  adicionarProjeto: () => {},
});

export function ProjetosProvider({ children }: { children: React.ReactNode }) {
  const [projetos, setProjetos] = useState<Projeto[]>([
    {
      id: 1,
      name: "Casa Moderna",
      image: require("../assets/house1.jpg"),
      info: "3 Quartos | 120m²",
      descricao: "Casa contemporânea com fachada moderna e áreas integradas.",
    },
    {
      id: 2,
      name: "Apartamento Compacto",
      image: require("../assets/house2.jpg"),
      info: "2 Quartos | 80m²",
      descricao: "Apartamento funcional e elegante para espaços reduzidos.",
    },
  ]);

  const adicionarProjeto = (projeto: Projeto) => {
    setProjetos((prev) => [...prev, { ...projeto, id: Date.now() }]);
  };

  return (
    <ProjetosContext.Provider value={{ projetos, adicionarProjeto }}>
      {children}
    </ProjetosContext.Provider>
  );
}

export function useProjetos() {
  return useContext(ProjetosContext);
}
