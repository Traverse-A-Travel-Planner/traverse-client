import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (window.localStorage.getItem("token")){
            navigate("/")
        } else {
            navigate("/login")
        }
    }, [navigate]);

    return(
        <h1>
            Page not found.
        </h1>
    )
}

export default PageNotFound;