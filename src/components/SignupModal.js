import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { GrFormClose } from "react-icons/gr";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import logo from "../images/pie-chart.png";

import styles from "./SignupModal.module.css";

import {validatorSignup } from "../helper/validator";

const SignupModal = ({ collapseSignupModal }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    family: "",
    isValidate: false,
  });

  const [isSecret, setIsSecret] = useState({
    password: true,
    confirmPassword: true,
  });
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState({});

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const changeHandler = (event) => {
    // if (event.target.name === "username") {
    //   setData({ ...data, [event.target.name]: event.target.value });
    //   setShowError(false);
    // } else if (event.target.name === "password") {
    //   setData({ ...data, [event.target.name]: event.target.value });
    //   setShowError(false);
    // }
    setData({ ...data, [event.target.name]: event.target.value });
    setShowError(false);
  };

  const submitHandler = () => {
    setShowError(true);
  };

  const visiblePasswordclickHandler = () => {
    if (isSecret.password) passwordRef.current.type = "text";
    else passwordRef.current.type = "password";
    setIsSecret({ ...isSecret, password: !isSecret.password });
  };

  const visibleConfirmPasswordclickHandler = () => {
    if (isSecret.confirmPassword) confirmPasswordRef.current.type = "text";
    else confirmPasswordRef.current.type = "password";
    setIsSecret({ ...isSecret, confirmPassword: !isSecret.confirmPassword });
  };

  useEffect(() => {
    setErrors(validatorSignup(data));
  }, [data]);
  return (
    <div onClick={collapseSignupModal} className={styles.signupContainerModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.signupContainer}
      >
        <div className={styles.signupRightContainer}>
          <div className={styles.closeIconContainer}>
            <GrFormClose
              style={{ cursor: "pointer" }}
              onClick={collapseSignupModal}
            />
          </div>
          <div className={styles.signUpTitleContainer}>
            <div>
              <img
                alt="logo"
                src={logo}
                style={{ width: "40px", height: "40px" }}
              />
              <h2>Sign Up</h2>
            </div>
          </div>
          <div>
            <div className={styles.inputForm}>
              <input
                value={data.name}
                onChange={changeHandler}
                name="name"
                type="text"
                placeholder="Name"
              />
              {showError && errors.name && (
                <span className={showError && styles.animatedSpan}>
                  {errors.name}
                </span>
              )}
            </div>
            <div className={styles.inputForm}>
              <input
                value={data.family}
                onChange={changeHandler}
                name="family"
                type="text"
                placeholder="Family"
              />
              {showError && errors.family && (
                <span className={showError && styles.animatedSpan}>
                  {errors.family}
                </span>
              )}
            </div>
          </div>
          <div className={styles.inputForm}>
            <input
              value={data.username}
              onChange={changeHandler}
              name="username"
              type="text"
              placeholder="Username (hint : mail address)"
            />
            {showError && errors.username && (
              <span className={showError && styles.animatedSpan}>
                {errors.username}
              </span>
            )}
          </div>
          <div className={styles.inputForm}>
            {data.password && (
              <div className={styles.visibleIconContainer}>
                {isSecret.password ? (
                  <AiFillEye className={styles.animatedVisible}
                    cursor="pointer"
                    onClick={visiblePasswordclickHandler}
                  />
                ) : (
                  <AiFillEyeInvisible className={styles.animatedVisible}
                    cursor="pointer"
                    onClick={visiblePasswordclickHandler}
                  />
                )}
              </div>
            )}
            <input
              ref={passwordRef}
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
          <div className={styles.inputForm}>
            {data.confirmPassword && (
              <div className={styles.visibleIconContainer}>
                {isSecret.confirmPassword ? (
                  <AiFillEye className={styles.animatedVisible}
                    cursor="pointer"
                    onClick={visibleConfirmPasswordclickHandler}
                  />
                ) : (
                  <AiFillEyeInvisible className={styles.animatedVisible}
                    cursor="pointer"
                    onClick={visibleConfirmPasswordclickHandler}
                  />
                )}
              </div>
            )}
            <input
              ref={confirmPasswordRef}
              onChange={changeHandler}
              value={data.confirmPassword}
              name="confirmPassword"
              type="password"
              placeholder="confirmPassword"
            />
            {showError && errors.confirmPassword && (
              <span className={showError && styles.animatedSpan}>
                {errors.confirmPassword}
              </span>
            )}
          </div>
          <button onClick={submitHandler}>Submit</button>
          <div className={styles.titleContainer}>
            <span>have already Registered?</span>
            <Link onClick={collapseSignupModal} to="/login"> Login Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
