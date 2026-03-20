import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { createUser } from "../../../../../redux/slices/user/createUser";
import { toast } from "react-toastify";
import { sendEmail, checkEmail } from "../../../../../redux/slices/user/sendEmail";

const Signup = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [configPass, setConfigPass] = useState("");
    const [eye, setEye] = useState("password");
    const [toggleIconPass, setToggleIconPass] = useState("password");

    const navigate = useNavigate();

    const [verify, setVerify] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState("");
    const [disconfirmationCode, setDisConfirmationCode] = useState("");

    const handleSignup = async (name, email, pass, configPass) => {
        const check = await dispatch(checkEmail(email));
        if (check.payload.data.status === "ERR") {
            toast.error("Email already exists");
            return;
        }
        if (pass.length < 8) {
            toast.error("Weak password");
            return;
        }
        if (pass !== configPass) {
            toast.error("Passwords do not match");
            return;
        }
        if (verify) {
            if (disconfirmationCode !== "" && confirmationCode != disconfirmationCode.payload.data.datatest) {
                toast.error("Incorrect confirmation code");
                return;
            }

            const temp = await dispatch(createUser({ name, email, pass }));
            if (temp.payload.status === "ERR") {
                toast.error(temp.payload.message);
                return;
            } else {
                toast.success(temp.payload.message);
                navigate("/login");
            }
        } else {
            toast.warning("Please wait a moment");
            const tmp = await dispatch(sendEmail(email));
            setDisConfirmationCode(tmp);
            if (tmp.payload.data.message === "OK") {
                setVerify(true);
            }
            toast.success("Enter the confirmation code sent to your email!");
        }
    };

    const handleIconPass = () => {
        if (toggleIconPass === "password") {
            setToggleIconPass("text");
            setEye("text");
        } else {
            setToggleIconPass("password");
            setEye("password");
        }
    };
    return (
        <>
            <div className="login-form" style={{ boxShadow: "10px 10px 5px lightblue" }}>
                <div className="signup-form-body">
                    <div className="signup-form-category">
                        <label>
                            Full Name: <span>* </span>
                            {name === "" && (
                                <span className="warning-login-signup">Please enter your name!</span>
                            )}
                        </label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="signup-form-category">
                        <label>
                            Email: <span>* </span>
                            {email === "" && (
                                <span className="warning-login-signup">Please enter your email!</span>
                            )}
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="signup-form-category">
                        <label>
                            Password: <span>* </span>
                            {pass === "" && (
                                <span className="warning-login-signup">Please enter your password!</span>
                            )}
                        </label>
                        <div className="input-password">
                            <input
                                onChange={(e) => setPass(e.target.value)}
                                value={pass}
                                type={eye}
                                placeholder="Enter your password"
                                required
                            />
                            <button className="pass-icon-btn" onClick={() => handleIconPass()}>
                                {toggleIconPass === "password" ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                            </button>
                        </div>
                    </div>
                    <div className="signup-form-category">
                        <label>
                            Confirm Password: <span>* </span>
                            {pass === "" && (
                                <span className="warning-login-signup">Please confirm your password!</span>
                            )}
                        </label>
                        <div className="input-password">
                            <input
                                onChange={(e) => setConfigPass(e.target.value)}
                                value={configPass}
                                type={eye}
                                placeholder="Re-enter your password"
                                required
                            />
                            <button className="pass-icon-btn" onClick={() => handleIconPass()}>
                                {toggleIconPass === "password" ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                            </button>
                        </div>
                    </div>

                    {verify && (
                        <div className="signup-form-category">
                            <label>
                                Confirmation Code: <span>* </span>
                                {pass === "" && (
                                    <span className="warning-login-signup">Please enter the confirmation code!</span>
                                )}
                            </label>
                            <div className="input-password">
                                <input
                                    onChange={(e) => setConfirmationCode(e.target.value)}
                                    value={confirmationCode}
                                    type={eye}
                                    placeholder="Enter confirmation code"
                                    required
                                />
                                <button className="pass-icon-btn" onClick={() => handleIconPass()}>
                                    {toggleIconPass === "password" ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                                </button>
                            </div>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="btn-reg"
                        onClick={() => {
                            handleSignup(name, email, pass, configPass);
                        }}
                    >
                        Sign Up
                    </button>
                    <hr />
                    <span>
                        Already have an account? &nbsp;
                        <span
                            className="change-modal"
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            Login
                        </span>
                    </span>
                </div>
            </div>
        </>
    );
};

export default Signup;