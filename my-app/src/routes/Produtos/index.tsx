import { useEffect, useState } from "react";
import { Link } from "react-router";
import FormularioProduto from "../../components/FormularioProduto";
import { criarProduto, excluirProduto, listarProdutos } from "../../services/produtos";
import type { DadosProduto, Produto } from "../../types/produtos";

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function carregar() {
      try {
        const dados = await listarProdutos(controller.signal);
        if (!controller.signal.aborted) setProdutos(dados);
      } catch (error) {
        if (!controller.signal.aborted) {
          setErro(error instanceof Error ? error.message : "Falha ao carregar.");
        }
      } finally {
        if (!controller.signal.aborted) setCarregando(false);
      }
    }
    carregar();
    return () => controller.abort();
  }, []);

  async function cadastrar(dados: DadosProduto): Promise<void> {
    setOcupado(true);
    setMensagem("");
    try {
      const criado = await criarProduto(dados);
      // A API devolve o objeto com id. Não inventamos o id no React.
      setProdutos((atuais) => [...atuais, criado]);
      setMensagem("Produto cadastrado.");
    } finally {
      setOcupado(false);
    }
    // Uma falha sobe para o catch do formulário, que mantém os campos.
  }

  async function remover(produto: Produto) {
    if (ocupado || !window.confirm(`Excluir ${produto.nome}?`)) return;
    setOcupado(true);
    setErro("");
    setMensagem("");
    try {
      await excluirProduto(produto.id);
      // A tela muda somente depois da confirmação da API.
      setProdutos((atuais) => atuais.filter((p) => p.id !== produto.id));
      setMensagem("Produto excluído.");
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Falha ao excluir.");
    } finally {
      setOcupado(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">Produtos</h1>
      {carregando && <p role="status">Carregando...</p>}
      {erro && <p role="alert" className="text-red-700">{erro}</p>}
      <p role="status">{mensagem}</p>
      <ul className="space-y-3">
        {produtos.map((produto) => (
          <li key={produto.id} className="rounded-xl border p-4">
            <h2 className="font-semibold">{produto.nome}</h2>
            <p>{produto.preco.toLocaleString("pt-BR", {
              style: "currency", currency: "BRL",
            })} | Estoque: {produto.estoque}</p>
            <div className="mt-3 flex gap-4">
              {!ocupado && (
                <Link className="underline" to={`/editar-produtos/${produto.id}`}>
                  Editar
                </Link>
              )}
              <button disabled={ocupado} onClick={() => remover(produto)}
                className="text-red-700 disabled:opacity-50">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
      {!carregando && !erro && produtos.length === 0 && <p>Nenhum produto.</p>}
      <section aria-labelledby="novo-produto">
        <h2 id="novo-produto" className="mb-3 text-xl font-semibold">Novo produto</h2>
        <FormularioProduto ocupado={carregando || ocupado} onSalvar={cadastrar} />
      </section>
    </main>
  );
}