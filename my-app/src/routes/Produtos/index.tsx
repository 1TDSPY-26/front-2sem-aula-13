import { useEffect, useState } from "react";
import type { TipoProduto } from "../../types/types";


export default function Produtos() {


    const[produtos,setProdutos] = useState<TipoProduto[]>([]);

    useEffect(() => {

        //area de execução
        // precisa ser assincrona porque ela pode demorar para carregar os dados da API
        //Quando os dados terminarem de carregar ele apresenta na tela,
        // mas enquanto isso ele não trava a aplicação, ele continua funcionando normalmente
        async function carregarProdutos(){

            // aqui ele vai buscar os dados da API, que é o json-server
            // fazer o getAll
            
            try{
            const response = await fetch("http://localhost:3001/produtos")

            if(!response.ok){
                throw new Error("O carregamento da lista de produtos falhou!");
            }

            const data: TipoProduto[] = await response.json();
            console.log(data);
            setProdutos(data);

        }catch(error){
            console.error(error);
        }

    }
    carregarProdutos();


    }, []); // o que ele depende para executar novamente, se for vazio, executa apenas uma vez 
            // aqui depende do array, da API   


    return (
        <main>
            <h2>Produtos</h2>
            <p>Lista de produtos.</p>

            <div>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Estoque</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {produtos.map( (p,i)=>(
                            <tr key={i}>
                                <td>{p.id}</td>
                                <td>{p.nome}</td>
                                <td>{p.preco}</td>
                                <td>{p.estoque}</td>
                                <td> editar | excluir</td>
                            </tr>
                            ))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan={5}>Quantidade de Produtos: {produtos?.length}</td>
                        </tr>
                    </tfoot>
                    
                </table>
            </div>

        </main>
    );
}