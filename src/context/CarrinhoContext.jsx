import { createContext, useReducer, useState, useMemo, useEffect } from "react";
import { carrinhoReducer } from "../reducers/carrinhoReducer";

export const CarrinhoContext = createContext(); // cria o contexto

CarrinhoContext.displayName = "Carrinho";

const estadoInicial = [];

// recebendo os dados que serão usados
export const CarrinhoProvider = ({ children }) => {

    const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoInicial)
    const [quantidade, setQuantidade] = useState(0); // usando o contexto criado
    const [valorTotal, setValorTotal] = useState(0); // usando o contexto criado

    const { totalTemp, quantidadeTemp } = useMemo(() => {
        return carrinho.reduce((acumulador, produto) => ({
            quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
            totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade
            }),
            {
                quantidadeTemp: 0,
                totalTemp: 0,
            }
        ); // transforma elementos de um array num único valor
    }, [carrinho]);

    useEffect(() => {
        setQuantidade(quantidadeTemp);
        setValorTotal(totalTemp);
    });

    // todos os componentes terão acesso ao carrinho e ao estado do carrinho
    return (
        <CarrinhoContext.Provider value={{
            carrinho,
            dispatch,
            quantidade,
            valorTotal,
            }}
        >
            {children}
        </CarrinhoContext.Provider>
    )
}
