import React from "react";

export default function Login() {


    const handleSubmit = (event) => {
        const handleSubmit = (event) => {
            //Prevent page reload
            event.preventDefault();

            var { uname, pass } = document.forms[0];

            // Find user login info
            const userData = database.find((user) => user.username === uname.value);

            // Compare user info
            if (userData) {
                if (userData.password !== pass.value) {
                    // Invalid password
                    setErrorMessages({ name: "pass", message: errors.pass });
                } else {
                    setIsSubmitted(true);
                }
            } else {
                // Username not found
                setErrorMessages({ name: "uname", message: errors.uname });
            }
        };

        // Generate JSX code for error message
        const renderErrorMessage = (name) =>
            name === errorMessages.name && (
                <div className="error">{errorMessages.message}</div>
            );

    };

    return (
        <>
            <div id="login">
                <div className="banner">banner</div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>用户名</label>
                        <input type="text" name="username" required />
                    </div>
                    <div className="input-container">
                        <label>密码</label>
                        <input type="password" name="password" required />
                    </div>
                    <div className="button-container">
                        <input type="submit" value="登陆" />
                    </div>
                </form>
            </div>
        </>
    );
}