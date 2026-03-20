import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { sendEmail, checkEmail, forgotPass } from "../../../../../redux/slices/user/sendEmail";

const ForgotPass = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [configPass, setConfigPass] = useState("");
    const [eye, setEye] = useState("password");
    const [toggleIconPass, setToggleIconPass] = useState("password");

    const navigate = useNavigate();

    const [verify, setVerify] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState("");
    const [disconfirmationCode, setDisConfirmationCode] = useState("");

    const handleForgotPass = async (email) => {
        if (verify) {
            if (disconfirmationCode !== "" && confirmationCode != disconfirmationCode.payload.data.datatest) {
                toast.error("Incorrect confirmation code");
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
            const temp = await dispatch(forgotPass({ User_Email: email, User_Password: pass }));
            if (temp.payload.status === "ERR") {
                toast.error(temp.payload.message);
                return;
            } else {
                toast.success(temp.payload.message);
                navigate("/login");
            }
        } else {
            const check = await dispatch(checkEmail(email));
            if (check.payload.data.status === "OK") {
                toast.error("Email is not registered");
                return;
            } else {
                toast.warning("Please wait a moment");
                const tmp = await dispatch(sendEmail(email));
                setDisConfirmationCode(tmp);
                if (tmp.payload.data.message === "OK") {
                    setVerify(true);
                }
                toast.success("Enter the confirmation code sent to your email!");
            }
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
                            Email: <span>* </span>
                            {email === "" && (
                                <span className="warning-login-signup">Please enter your email!</span>
                            )}
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Enter Email"
                            required
                        />
                    </div>
                    {verify && (
                        <>
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
                                        {toggleIconPass === "password" ? (
                                            <FontAwesomeIcon icon={faEye} />
                                        ) : (
                                            <FontAwesomeIcon icon={faEyeSlash} />
                                        )}
                                    </button>
                                </div>
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
                                        placeholder="Enter password"
                                        required
                                    />
                                    <button className="pass-icon-btn" onClick={() => handleIconPass()}>
                                        {toggleIconPass === "password" ? (
                                            <FontAwesomeIcon icon={faEye} />
                                        ) : (
                                            <FontAwesomeIcon icon={faEyeSlash} />
                                        )}
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
                                        placeholder="Re-enter password"
                                        required
                                    />
                                    <button className="pass-icon-btn" onClick={() => handleIconPass()}>
                                        {toggleIconPass === "password" ? (
                                            <FontAwesomeIcon icon={faEye} />
                                        ) : (
                                            <FontAwesomeIcon icon={faEyeSlash} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                    <button
                        type="submit"
                        className="btn-reg"
                        onClick={() => {
                            handleForgotPass(email);
                        }}
                    >
                        {!verify ? "Send confirmation code" : "Change password"}
                    </button>
                    <hr />
                    <span>
                        Don’t have an account? &nbsp;
                        <span
                            className="change-modal"
                            onClick={() => {
                                navigate("/signup");
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

export default ForgotPass;
