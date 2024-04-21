import { createContext, useContext, useEffect, useState } from "react"; // Make sure to include useContext

export const stateContext = createContext();

const getFreshContext = () => {
    if(localStorage.getItem("context") === null) {
        localStorage.setItem("context", JSON.stringify({
            username: "",
            role: ""
        }));
    }

    return JSON.parse(localStorage.getItem("context"));
}

export default function useStateContext() {
    const {context, setContext} = useContext(stateContext);
    return {
        context, 
        setContext: obj => {
            setContext({...context, ...obj})
        },
        resetContext: () => {
            localStorage.removeItem("context");
            setContext(getFreshContext());
        }
    }
}

export function ContextProvider({children}) {
    const [context, setContext] = useState(getFreshContext());

    useEffect(() => {
        localStorage.setItem("context", JSON.stringify(context));
    }, [context]);

    return (
        <stateContext.Provider value={{context, setContext}}>
            {children}
        </stateContext.Provider>
    )
}