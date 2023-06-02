import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/")
        }, 2000)

        return () => {
            clearTimeout(timer)
        }
    }, [navigate])

    useEffect(() => {
        if (window.localStorage.getItem("cookieFallback")){
            return
        } else {
            navigate("/login")
        }
    }, [navigate]);

    return(
        <h1>
            Page not found. 
            Redirecting to Home Page
        </h1>
    )
}

export default PageNotFound;