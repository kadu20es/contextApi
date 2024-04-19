import { createContext, useState } from "react";

export const CarrinhoContext = createContext(); // cria o contexto
                             // recebendo os dados que serão usados
export const CarrinhoProvider = ({ children }) => {

    const [carrinho, setCarrinho] = useState([]);
    // todos os componentes terão acesso ao carrinho e ao estado do carrinho
    return (
        <CarrinhoContext.Provider value={{ carrinho, setCarrinho }}>
            { children }
        </CarrinhoContext.Provider>
    )
}
