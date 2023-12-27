import { useState } from "react"
import { createContext } from "react"

export const cartContext = createContext()

export default function ContextProvider(props) {

    const [CartLength, setCartLength] = useState(0)
    return (
        <>
            <cartContext.Provider value={{ CartLength, setCartLength }}>
                {props.children}
            </cartContext.Provider>
        </>
    )
}
