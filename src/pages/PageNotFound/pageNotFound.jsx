import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import pageNotFound from "../../assets/404 Page Not Found.svg"

import "./pageNotFound.css"
import { Spin, Typography } from "@arco-design/web-react"

const PageNotFound = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/")
        }, 3000)

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
        <div className="page-not-found">
            <img src={pageNotFound} alt="page not found" />
            <Typography.Title heading={5}>
                <Spin /> Redirecting...
            </Typography.Title>
        </div>
    )
}

export default PageNotFound;