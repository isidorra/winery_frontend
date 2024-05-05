import { Navigate } from "react-router-dom";
import useStateContext, { stateContext } from "../../hooks/useStateContext";
import ProfilePage from "./ProfilePage";
import LoginPage from "./LoginPage";

export default function Authenticate() {
    const {context} = useStateContext(stateContext);

    return (
        context.username == "" && <Navigate to={"/login"}/>
    )
}