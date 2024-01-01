import React, { useEffect, useState, useRef } from "react";
import "./styles.css";

/**
 * Test if the password(s) meet the following criteria
 *    Has two input fields to validate the entry from the user (both inputs must match)
 *    Password has a min length of 6 characters
 *    Password has at least 1 uppercase character
 *    Password has at least 1 lowercase character
 *    Password has at least 1 number
 *    Password has at least 1 special character (!@#$%^&*()_-+={[}]|:;"'<,>.)
 *
 * Return "ok" if true, else return a string indicating the error
 */
const validatePassword = (params) => {
	// note: these could be combined into a single regex,
	// but this is probably more readable
	const validChars =
			/[A-Z]/.test(params.password) && // upper-case letter
			/[a-z]/.test(params.password) && // lower-case letter
			/[\d]/.test(params.password) && // single digit
			/[!@#$%\^&\*()_\-\+\={\[}\]\|\:;"'<,>.]/.test(params.password); // special character
	const match = params.password === params.rePassword;
	const lengthOk = params.password.length >= 6;

	if (validChars && match && lengthOk) {
		params.setPasswordValid(true);
		params.setPasswordError("empty");
	} else {
		params.setPasswordValid(false);
		if (!lengthOk) {
			params.setPasswordError("length");
		} else if (!match) {
			params.setPasswordError("match");
		} else if (!validChars) {
			params.setPasswordError("chars");
		} else {
			params.setPasswordError("ok");
		}
	}
};

/**
 * Set of error messages to display depending on error condition
 */
const passwordErrorMsg = {
	empty: "",
	ok: "Password if valid",
	chars: "Characters don't satisfy one of the conditions",
	length: "Password is too short",
	match: "Password and re-entered password do not match",
};

/**
 * Create html to display two (new) password input fields, one
 * for new password, second for password check.
 * OnBlur (exit) of either field, save value to a state variable.
 * When submit button is clicked, use the state values to test if
 * the to fields are equal and that they meet the criteria set for
 * a new password
 *
 * If the password(s) passes, call callback function and return to main,
 * calling application
 * Otherwise, display an error message and stay here
 */
export const CreateNewPassword = (params) => {
	const [passwordValid, setPasswordValid] = useState(false);
	const [passwordError, setPasswordError] = useState("empty");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [showText, setShowText] = useState(false);

	useEffect(() => {
		if (passwordValid) {
			// console.log("password valid");
			params.setValidPassword(password);
		}
	}, [passwordValid]);

	if (passwordValid) {
		return null;
	} else {
		const errorClassName =
				"error-message" +
				(passwordError === "empty" ? " invisible" : "") +
				(passwordError === "ok" ? " ok" : "");

		return (
				<div className="new-password">
					<h1>Create a New Password</h1>
					<div className="password-entry">
						<div className="password-block">
							<div className="password-input-show-hide">
								<div className="password-inputs-block">
									<div className="password-input">
										<label htmlFor="password">Password: </label>
										<input
												type={showText ? "text" : "password"}
												id="password1"
												className="password"
												onBlur={(evt) => {
													setPassword(evt.target.value);
												}}
										/>
									</div>
									<div className="password-input">
										<label htmlFor="password2">Re-enter Password: </label>
										<input
												type={showText ? "text" : "password"}
												id="password2"
												className="password"
												onBlur={(evt) => {
													setRePassword(evt.target.value);
												}}
										/>
									</div>
								</div>

								<div className="show-hide-password">
									<button
											id="show-hide"
											className="password-show-hide"
											onClick={(evt) => {
												setShowText(!showText);
											}}
									>
										{showText ? "hide" : "show"}
									</button>
								</div>
							</div>
							<button
									id="validatePassword"
									className="password-validate"
									onClick={(evt) => {
										validatePassword({
											password: password,
											rePassword: rePassword,
											setPasswordValid: setPasswordValid,
											setPasswordError: setPasswordError,
										});
									}}
							>
								Submit
							</button>
						</div>

						<div className="password-instructions">
							<ul className="instruction-list">
								<li className="instruction">6 characters or more in length</li>
								<li className="instruction">
									include at least one upercase letter
								</li>
								<li className="instruction">
									include at least one lowercase letter
								</li>
								<li className="instruction">include at least one number</li>
								<li className="instruction">
									include at least one special character
									<ul>
										<li>{"!@#$%^&*()_-+={[}]|:;\"'<,>."}</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
					<div className={errorClassName}>
						<p>{passwordErrorMsg[passwordError]}</p>
					</div>
				</div>
		);
	}
};
