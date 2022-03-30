import { BrowserRouter } from "react-router-dom";

export const Contexts = ({children})=>{

    return(
        <BrowserRouter>
        {children}
        </BrowserRouter>

    );
}