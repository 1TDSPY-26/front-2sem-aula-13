import { useEffect, useState } from "react";
import type { TipoProduto } from "../../types/types";

export default function Produtos() {

    const [produtos, setProdutos] = useState<TipoProduto[]>([]);

    //realizando o GetAllProdutos(recebendo toda lista de produtos)
    useEffect(() => {

        async function carregarProdutos() {

            try {

                const response = await fetch("http://localhost:3001/produtos");

                //200 a 299 é True - diferente disso é False
                if (response.ok) {
                    throw new Error("Lista de produtos falhou!")
                }

                const data: TipoProduto[] = await response.json();

                // False = catch
            } catch (error) {
                console.error(error);
            }

        }

        carregarProdutos();

    }, []);

    return (
        <main>
            <h2>Produtos</h2>

            <div>
                <table border={1}>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOME</th>
                            <th>PREÇO</th>
                            <th>ESTOQUE</th>
                            <th>AÇÕES</th>
                        </tr>
                    </thead>

                    <tbody>
                        {produtos.map((produto, indice, array) => (
                            <tr key={indice}>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>{produto.preco}</td>
                                <td>{produto.estoque}</td>
                                <td>EDITAR/EXCLUIR</td>
                            </tr>

                        ))}
                    </tbody>

                    <tfoot>
                        <tr> 
                            <td colSpan={5}>Quantidade de produtos: {produtos?.length}</td>
                        </tr>
                    </tfoot>

                </table>
            </div>

        </main>
    );
}