/*
 Using React, write a password entry library that meets the following requirements:
 Has two input fields to validate the entry from the user (both inputs must match)
 Password has a min length of 6 characters
 Password has at least 1 uppercase character
 Password has at least 1 lowercase character
 Password has at least 1 number
 Password has at least 1 special character (!@#$%^&*()_-+={[}]|:;"'<,>.)
 Has a submit button that will trigger validation and present success
 or why the password entry failed
 */

import React, { useEffect, useState, useRef } from "react";
import "./styles.css";
import { CreateNewPassword } from "./CreatePassword";

export default function App() {
	const [validPassword, setValidPassword] = useState("");

	return (
			<div className="App">
				<h1>Calling Application</h1>
				{validPassword !== "" ? (
						<>
							<h2>Hooray - new password accepted</h2>
							<h2>{validPassword}</h2>
						</>
				) : (
						<CreateNewPassword setValidPassword={setValidPassword} />
				)}
			</div>
	);
}
