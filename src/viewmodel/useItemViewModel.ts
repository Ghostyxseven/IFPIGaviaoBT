import { useState, useEffect, useCallback } from "react";
import { Produto } from "../model/Produto";
import { simularConsultaProdutoPorId } from "../data/mockDatabase";

export function useItemViewModel(id?: string | string[]) {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [produto, setProduto] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);

  useEffect(() => {
    async function carregarDetalhes() {
      if (!id) return;
      try {
        setCarregando(true);
        const prodId = Array.isArray(id) ? id[0] : id;
        const resultado = await simularConsultaProdutoPorId(prodId);
        setProduto(resultado as Produto);
      } catch (erro) {
        console.error("Erro ao buscar detalhes do produto:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarDetalhes();
  }, [id]);

  const decrementarQuantidade = useCallback(() => {
    if (quantidade > 1) {
      setQuantidade((prev) => prev - 1);
    }
  }, [quantidade]);

  const incrementarQuantidade = useCallback(() => {
    setQuantidade((prev) => prev + 1);
  }, []);

  const formatarPreco = useCallback((valor: number): string => {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }, []);

  return {
    carregando,
    produto,
    quantidade,
    decrementarQuantidade,
    incrementarQuantidade,
    formatarPreco,
  };
}
