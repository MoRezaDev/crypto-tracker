import React, { useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";


import logo from "../../images/pie-chart.png";

import styles from "./LoginBigPage.module.css";

import { validator } from "../../helper/validator";

import { themeContext } from "../../context/ThemeContextProvider";


const LoginBigPage = () => {
  const {theme} = useContext(themeContext);

  const [data, setData] = useState({
    username: "",
    password: "",
    isValidate: false,
  });


  const [showError, setShowError] = useState(false);

  const [errors, setErrors] = useState({});

  const changeHandler = (event) => {
    if (event.target.name === "username") {
      setData({ ...data, [event.target.name]: event.target.value });
      setShowError(false);
    } else if (event.target.name === "password") {
      setData({ ...data, [event.target.name]: event.target.value });
      setShowError(false);
    }
  };

  const submitHandler = () => {
    setShowError(true);
  };

  useEffect(() => {
    setErrors(validator(data));
  }, [data]);
  return (
    <div className={theme === "light" ? styles.loginContainerModal : `${styles.loginContainerModal} ${styles.darkContainer}`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.loginContainer}
      >
        <div className={styles.loginLeftContainer}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.loginRightContainer}>
          <h2>Log In</h2>
          <div className={styles.inputForm}>
            <input
              value={data.username}
              onChange={changeHandler}
              name="username"
              type="text"
              placeholder="Username"
            />
            {showError && errors.username && (
              <span className={showError && styles.animatedSpan}>
                {errors.username}
              </span>
            )}
          </div>
          <div className={styles.inputForm}>
            <input
              onChange={changeHandler}
              value={data.password}
              name="password"
              type="password"
              placeholder="Password"
            />
            {showError && errors.password && (
              <span className={showError && styles.animatedSpan}>
                {errors.password}
              </span>
            )}
          </div>
          <button onClick={submitHandler}>Submit</button>
          <div className={styles.titleContainer}>
            <span>dont have an account?</span>
            <Link to="/signup"> Register Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBigPage;
