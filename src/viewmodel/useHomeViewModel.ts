import { useState, useEffect } from "react";
import { Categoria } from "../model/Categoria";
import { simularConsultaCategorias } from "../data/mockDatabase";

export function useHomeViewModel() {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        // O mock retorna dados puros, então fazemos um cast para nossa tipagem Categoria
        const resultado = await simularConsultaCategorias();
        setCategorias(resultado as Categoria[]);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  return {
    carregando,
    categorias,
  };
}
