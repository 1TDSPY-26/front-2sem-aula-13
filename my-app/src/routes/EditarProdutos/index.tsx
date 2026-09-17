import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import FormularioProduto from "../../components/FormularioProduto";
import { atualizarProduto, buscarProduto } from "../../services/produtos";
import type { DadosProduto, Produto } from "../../types/produtos";

export default function EditarProdutos() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setCarregando(true);
    setErro("");
    setProduto(null);
    async function carregar() {
      try {
        if (!id) throw new Error("Identificador ausente.");
        const encontrado = await buscarProduto(id, controller.signal);
        if (!controller.signal.aborted) setProduto(encontrado);
      } catch (error) {
        if (!controller.signal.aborted) {
          setErro(error instanceof Error ? error.message : "Falha ao consultar.");
        }
      } finally {
        if (!controller.signal.aborted) setCarregando(false);
      }
    }
    carregar();
    return () => controller.abort();
  }, [id]);

  async function salvar(dados: DadosProduto): Promise<void> {
    if (!id) throw new Error("Identificador ausente.");
    await atualizarProduto(id, dados);
    // Só voltar depois da confirmação de gravação.
    navigate("/produtos");
  }

  return (
    <main className="mx-auto max-w-2xl space-y-4 p-6">
      <h1 className="text-3xl font-bold">Editar produto</h1>
      {carregando && <p role="status">Carregando produto...</p>}
      {erro && <p role="alert" className="text-red-700">{erro}</p>}
      {!carregando && produto && (
        <FormularioProduto key={produto.id} inicial={produto} onSalvar={salvar} />
      )}
      <Link to="/produtos" className="inline-block underline">Voltar para produtos</Link>
    </main>
  );
}