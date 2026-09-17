// export interface TipoProduto {
//     id: number;          // O número de identificação único
//     nome: string;        // O nome do produto em texto
//     preco: number;       // O valor em número (sem R$, usamos só números decimais)
//     descricao: string;   // Uma explicação curta do item
//     avatar: string;      // O link (URL) da imagem que está na internet
// }

export type TipoProduto = {
    id: string;
    nome: string;
    preco: number;
    estoque: number;
}