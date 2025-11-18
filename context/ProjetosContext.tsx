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
      descricao: "Casa contemporânea miniatura traz um conceito arquitetônico simples e elegante, com estrutura leve, paredes bem definidas e aparência clean. Ideal para visualização rápida de volume, proporções e ambientação em AR, oferecendo uma base perfeita para estudos de layout e projeto.",
    },
    {
      id: 2,
      name: "Cozinha Minimalista",
      image: require("../assets/house2.jpg"),
      info: "1 cozinha | 15m²",
      descricao: "Esta cozinha minimalista apresenta um ambiente compacto e elegante, com armários embutidos, bancada funcional e superfícies de acabamento suave. O design prioriza organização, iluminação equilibrada e praticidade para espaços reduzidos, ideal para apartamentos modernos.",
    },
        {
      id: 3,
      name: "Quarto Infantil",
      image: require("../assets/house1.jpg"),
      info: "1 Quarto | 20m²",
      descricao: "Este quarto minimalista apresenta um espaço aconchegante e equilibrado, composto por cama de design simples, luminárias pendentes, poltronas e mesa lateral em uma paleta suave e moderna. O estilo low poly traz leveza ao ambiente, destacando proporções e volumes de forma clara. Ideal para visualização rápida de interiores, demonstração de layout e experiências de AR em espaços compactos.",
    },
            {
      id: 4,
      name: "Modelo Parede",
      image: require("../assets/house2.jpg"),
      info: "1 Parede de tijoles | 3m²",
      descricao: "Modelo de parede em tijolos com dimensões realistas, criado para testes de ambientação, texturas e proporções em realidade aumentada. Perfeito para simulações rápidas de espaço, composição de ambiente e estudos de layout..",
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
