import { useState, useEffect } from 'react';
import { listaProdutos } from '../../data/listaProdutos';
import type { TipoProduto } from '../../types/types';


export default function Produtos() {

    const[produtos, setProdutos] = useState<TipoProduto[]>([]);

    useEffect( () => {

        async function carregarProdutos(){
         
            try{

                const response = await fetch("http://localhost:3001/produtos");

                if(!response.ok){

                }
            }

        }

    }, []);

    return (
        <main>
            <h1>Página de Produtos</h1>
        </main>
    );
}