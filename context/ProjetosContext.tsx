import React, { createContext, useContext, useState } from "react";

type Projeto = {
  id: number;
  name: string;
  image: any; // pode ser require() ou string
  info: string;
  descricao: string;
  fbx?: string;
  dae?: string;
};

type ProjetosContextType = {
  projetos: Projeto[];
  adicionarProjeto: (projeto: Projeto) => void;
  removerProjeto: (id: number) => void;
};

const ProjetosContext = createContext<ProjetosContextType>({
  projetos: [],
  adicionarProjeto: () => {},
  removerProjeto: () => {},
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

  const removerProjeto = (id: number) => {
    setProjetos((prev) => {
      const atualizados = prev.filter((p) => Number(p.id) !== Number(id));
      console.log(
        "Removendo projeto ID:",
        id,
        "→ total após remoção:",
        atualizados.length
      );
      return atualizados;
    });
  };

  return (
    <ProjetosContext.Provider
      value={{ projetos, adicionarProjeto, removerProjeto }}
    >
      {children}
    </ProjetosContext.Provider>
  );
}

export function useProjetos() {
  return useContext(ProjetosContext);
}
