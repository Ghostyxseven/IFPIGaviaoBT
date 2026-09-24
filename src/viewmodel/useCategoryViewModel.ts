import { useState, useEffect, useCallback } from "react";
import { Produto } from "../model/Produto";
import { simularConsultaProdutosPorCategoria } from "../data/mockDatabase";

export function useCategoryViewModel(id?: string | string[]) {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const nomeCategoria =
    id === "bebidas" ? "Bebidas" : id === "comidas" ? "Comidas" : "Cardápio";

  useEffect(() => {
    async function carregarProdutos() {
      if (!id) return;
      try {
        setCarregando(true);
        const resultado = await simularConsultaProdutosPorCategoria(
          Array.isArray(id) ? id[0] : id
        );
        setProdutos(resultado as Produto[]);
      } catch (erro) {
        console.error("Erro ao buscar produtos da categoria:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos();
  }, [id]);

  const formatarPreco = useCallback((valor: number): string => {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }, []);

  return {
    carregando,
    produtos,
    nomeCategoria,
    formatarPreco,
  };
}
