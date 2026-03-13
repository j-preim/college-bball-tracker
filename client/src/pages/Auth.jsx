import { useEffect, useState } from "react";

export default function Auth() {
  const [signupData, setSignupData] = useState({});
  const [loginData, setLoginData] = useState({});

  const [formMessage, setFormMessage] = useState("");

  async function submitLogin(e) {
    e.preventDefault();
    try {
      const query = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await query.json();
      if (result.status === "error") {
        setFormMessage("We could not log you in with these credentials.");
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setFormMessage("We could not log you in with these credentials.");
    }
  }

  async function submitSignup(e) {
    e.preventDefault();
    try {
      const query = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(signupData),
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((err) => {
        setFormMessage("Sorry, we couldn't sign you up. Get a life.");
      });

      const result = await query.json();
      if (result.status === "error") {
        setFormMessage("Sorry, we couldn't sign you up. Get a life.");
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setFormMessage("Sorry, we couldn't sign you up. Get a life.");
    }
  }

  function handleLoginChange(e) {
    setFormMessage();
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  function handleSignupChange(e) {
    setFormMessage();
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className="container-fluid d-flex">
        <div className="row justify-content-center">
          <div className="col-10 col-sm p-3 login-box m-3 m-sm-4 bg-dark rounded border border-2">
            <div className="mb-2 headline">
              <h4 className="lato-regular">Login:</h4>
            </div>
            <form className="form" onSubmit={submitLogin}>
              <div className="my-3">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control text-black"
                  name="email"
                  placeholder="Email"
                  value={loginData?.email || ""}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control text-black"
                  name="password"
                  placeholder="Password"
                  value={loginData?.password || ""}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary my-2">
                Login
              </button>
            </form>
          </div>

          {/* <div className="col-10 col-sm p-3 signup-box m-3 m-sm-4 bg-dark rounded border border-2">
            <div>
              <div className="mb-2 headline">
                <h4 className="lato-regular">Create user:</h4>
              </div>
              <form className="form" onSubmit={submitSignup}>
                <div className="form-group my-3">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control text-black"
                    name="name"
                    placeholder="Name"
                    value={signupData?.name || ""}
                    onChange={handleSignupChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control text-black"
                    name="email"
                    placeholder="Email"
                    value={signupData?.email || ""}
                    onChange={handleSignupChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control text-black"
                    name="password"
                    placeholder="Password"
                    value={signupData?.password || ""}
                    aria-describedby="passwordHelpBlock"
                    onChange={handleSignupChange}
                    required
                  />
                  <div id="passwordHelpBlock" className="form-text p-1">
                    Your password must be at least 8 characters long
                  </div>
                </div>
                <button type="submit" className="btn btn-primary my-2">
                  Sign up
                </button>
              </form>
            </div>
          </div> */}

          {formMessage && formMessage.length > 0 && (
            <div className="row">
              <div className="col-12">{formMessage}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
