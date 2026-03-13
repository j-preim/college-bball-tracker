import { useState } from "react";

const initialSignupData = {
  name: "",
  email: "",
  password: "",
};

const initialLoginData = {
  email: "",
  password: "",
};

export default function Auth() {
  const [signupData, setSignupData] = useState(initialSignupData);
  const [loginData, setLoginData] = useState(initialLoginData);
  const [formMessage, setFormMessage] = useState("");
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);
  const [isSubmittingSignup, setIsSubmittingSignup] = useState(false);

  async function parseResponse(response, fallbackMessage) {
    let payload = null;

    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      throw new Error(payload?.message || fallbackMessage);
    }

    return payload;
  }

  async function submitLogin(e) {
    e.preventDefault();
    setFormMessage("");
    setIsSubmittingLogin(true);

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await parseResponse(
        response,
        "We could not log you in with these credentials."
      );

      if (result?.status === "error") {
        setFormMessage("We could not log you in with these credentials.");
        return;
      }

      window.location.href = "/";
    } catch (error) {
      setFormMessage(
        error instanceof Error
          ? error.message
          : "We could not log you in with these credentials."
      );
    } finally {
      setIsSubmittingLogin(false);
    }
  }

  async function submitSignup(e) {
    e.preventDefault();
    setFormMessage("");
    setIsSubmittingSignup(true);

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(signupData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await parseResponse(
        response,
        "Sorry, we couldn't sign you up. Please try again."
      );

      if (result?.status === "error") {
        setFormMessage("Sorry, we couldn't sign you up. Please try again.");
        return;
      }

      window.location.href = "/";
    } catch (error) {
      setFormMessage(
        error instanceof Error
          ? error.message
          : "Sorry, we couldn't sign you up. Please try again."
      );
    } finally {
      setIsSubmittingSignup(false);
    }
  }

  function handleLoginChange(e) {
    const { name, value } = e.target;
    setFormMessage("");
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSignupChange(e) {
    const { name, value } = e.target;
    setFormMessage("");
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-3">Login</h4>

              <form onSubmit={submitLogin}>
                <div className="mb-3">
                  <label htmlFor="login-email" className="form-label">
                    Email
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    className="form-control"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="login-password" className="form-label">
                    Password
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    name="password"
                    className="form-control"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    autoComplete="current-password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmittingLogin}
                >
                  {isSubmittingLogin ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-3">Create user</h4>

              <form onSubmit={submitSignup}>
                <div className="mb-3">
                  <label htmlFor="signup-name" className="form-label">
                    Name
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    name="name"
                    className="form-control"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="signup-email" className="form-label">
                    Email
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    name="email"
                    className="form-control"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="signup-password" className="form-label">
                    Password
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    name="password"
                    className="form-control"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />
                  <div className="form-text">
                    Your password must be at least 8 characters long.
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={isSubmittingSignup}
                >
                  {isSubmittingSignup ? "Signing up..." : "Sign up"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {formMessage && (
        <div className="alert alert-warning mt-4" role="alert">
          {formMessage}
        </div>
      )}
    </div>
  );
}