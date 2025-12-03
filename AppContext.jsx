import { createContext } from "react";
import { Venues } from "../../assets/assets";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext()

const AppContextProvider = (props) => {
    console.log('Venues data:', Venues); // Add this to check data
    const value = {
        venues: Venues
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;