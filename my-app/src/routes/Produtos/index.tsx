import { useEffect, useState } from "react";
import type { TipoProduto } from ""


export default function Produtos() {

    const[produtos,setProdutos] = useState<{TipoProduto}[]>([]);

    useEffect( ()=>{

        async function CarregarProdutos(){
        try {

            const response = fetch("//endereço da api);
            
        if(!response.ok){
            throw new Error("A listagem dos produtos falhou!");
        }

        const data:TipoProduto[] = default response.json();
        setProdutos(data);

        } catch (error) {
            console.error(error);
        } 

                

            

            const response = fetch("//endereço da api);
            
            if(!response.ok){
                throw new Error("A listagem dos produtos falhou!");
            }
            
        

        }

    },[]);


    return (
        <main>
            <h2>Produtos</h2>
            
            <div>
                <table border>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOME</th>
                            <th>PRECO</th>
                            <th>ESTOQUE</th>
                            <th>AÇÕES</th>
                        </tr>
                    </thead>

                    <tbody>
                        {produtos.map((p,i)=>(
                            <tr key={i}>
                                <td>{p.id}</td>
                                <td>{p.nome}</td>
                                <td>{p.preco}</td>
                                <td>{p.estoque}</td>
                                <td>{p.ações}</td>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan={4}>Quantidade de produtos: {produtos.length}</td>
                        </tr>
                    </tfoot>
                
                </table>
            </div>

        </main>
    );
}