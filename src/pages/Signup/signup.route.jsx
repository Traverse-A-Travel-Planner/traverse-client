import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginArt from '../Login/artt.svg'
import "./signup.route.css"
import { Notification, Spin } from "@arco-design/web-react";

import { backendUrl } from "../../utils/config";
import Footer from "../../components/Footer/Footer";
import Header from ".././../components/Header/Header";

const Signup = () => {
    const navigate = useNavigate();

    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const signupHandle = async (e) => {
        e.preventDefault();

        setLoading(true)

        if(!email || !password) {
           setLoading(false);

           return Notification.error({ 
            title: "Error",
            content: "All fields are required."
           })
        }

        // Create a new AbortController instance
        const abortController = new AbortController();

        // Set a timeout to abort the fetch request after 10 seconds
        setTimeout(() => {
            abortController.abort();
        }, 10000);

        try {
            const res = await fetch(`${backendUrl}/auth/signup`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ email, password }),
              signal: abortController.signal, // Set the signal option to the AbortController's signal
            });
        
            const data = await res.json();
            setLoading(false);

            if (data.duplicate){
                return Notification.warning({
                    title: "Warning",
                    content: data.message,
                });
            }
        
            if (data.success === false && data.error) {
              return Notification.error({
                title: "Error",
                content: data.error,
              });
            }

            if (data.success === true){
                setTimeout(() => {
                    navigate("/login");
                }, 2000)
                
                return Notification.success({
                    title: "Success",
                    content: data.message,
                });
            }
        } catch (error) {
            if (error.name === "AbortError") {
                // Handle the abort error
                setLoading(false);
                return Notification.error({
                    title: "Error",
                    content: "The request took too long to complete.",
                });
            }
        }
    }

    return (
        <>
        <Header />
        <div className="login-form-main-wrapper">
        <div className="img-container">
            <img src={LoginArt} alt="login art" />
        </div>
        <div className="login-form-container">
            <div className="login-form">
                <h3 className="org-name">Traverse</h3>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="input-email" placeholder="Phone number, user or email" />
                <input type="password"value={password} onChange={(e) => setPassword(e.target.value)} className="input-password" placeholder="Password" />
            
                <Spin delay={500} loading={loading} style={{width: '100%', color: "white", marginRight: 5}}>
                <button
                style={{width: '100%'}}
                onClick={(e) => signupHandle(e)}
                type="submit"
                className="submit-btn mb-3">
                    Singup
                </button>
                </Spin>
            </div>
            <div className="signup-div">
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default Signup;