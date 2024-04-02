import React, { createContext, useContext, useEffect, useState } from 'react';

const Crypto = createContext();

export const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState('USD');
    const [symbol, setSymbol] = useState('$')

    useEffect(() => {
        if (currency === 'VND') {
            setSymbol('₫');
        } else {
            setSymbol('$');
        }
    }, [currency]);

    return (
        <Crypto.Provider value={{ currency, setCurrency, symbol }}>
            {children}
        </Crypto.Provider>
    );
};
export const CryptoState = () => {
    return useContext(Crypto)
}

