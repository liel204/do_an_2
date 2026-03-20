import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../../../redux/slices/user/login";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const LoginModal = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [eye, setEye] = useState("password")
    const [tonggleIconPass, setTonggleIconPass] = useState("password")

    const navigate = useNavigate()

    const handleLogin = async (email, pass) => {
        const check = await dispatch(loginUser({ email, pass }))
        if (check.payload.message === "SUCCESS") {
            toast.success(check.payload.message)
        }
        else {
            toast.error(check.payload.message)
        }

        if (check.payload.message === "SUCCESS") {
            if (localStorage.getItem("token") !== null) {
                navigate('/')
            }
        }
    }
    const handleIconPass = () => {
        if (tonggleIconPass === 'password') {
            setTonggleIconPass("text");
            setEye("text")
        } else {
            setTonggleIconPass("password");
            setEye("password")
        }
    }
    return (
        <>
            <div className="login-form" style={{ boxShadow: "10px 10px 5px lightblue" }}>
                <div className="signup-form-body">
                    <div className="signup-form-category">
                        <label>
                            Email: <span>* </span>
                            {email === "" && (
                                <span className="warning-login-signup">Please enter email !</span>
                            )}
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            name="email"
                            type="email"
                            placeholder="Enter Email"
                            required
                        />
                    </div>

                    <div className="signup-form-category">
                        <label>
                            Password: <span>* </span>
                            {pass === "" && (
                                <span className="warning-login-signup">Please enter password !</span>
                            )}
                        </label>
                        <div className="input-password">
                            <input
                                onChange={(e) => setPass(e.target.value)}
                                value={pass}
                                type={eye}
                                placeholder="Enter Password"
                                required
                            />
                            <button className="pass-icon-btn" onClick={() => handleIconPass()}>
                                {tonggleIconPass === "password" ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn-reg"
                        onClick={() => { handleLogin(email, pass) }}
                    >
                        Login
                    </button>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <span
                            className="change-modal"
                            onClick={() => {
                                navigate("/forgotPassword")
                            }}
                        >
                            Forgot password ?
                        </span>
                    </div>
                    <hr />
                    <span>
                        You do not have an account? &nbsp;
                        <span
                            className="change-modal"
                            onClick={() => {
                                navigate("/signup")
                            }}
                        >
                            Register
                        </span>
                    </span>
                </div>
            </div>
        </>
    );
};

export default LoginModal;
