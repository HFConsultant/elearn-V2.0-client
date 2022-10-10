import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import { Avatar, Menu } from "antd";
import {
  AppstoreOutlined,
  BookOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const Nav = () => {
  const [current, setCurrent] = useState("");
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  return (
    <nav
      className="navbar position-sticky fixed-top d-flex jumbotron justify-content-left "
      // style={
      //   {
      //     // backgroundColor: "blue",
      //   }
      // }
    >
      <div>
        <Link href="/">
          <a
            className={`nav-link text-light logo ${
              current === "/" && "active"
            }`}
          >
            <Avatar src="/images/thumbnail.jpg" size="large" />
            <h6>HFConsultants</h6>
          </a>
        </Link>
      </div>

      <h3>
        <AppstoreOutlined />
        <Link
          href="/courses"
          className={`nav-link text-light logo ${
            current === "/courses" && "active"
          }`}
        >
          Courses
        </Link>
      </h3>

      <h3>
        <TeamOutlined />
        <Link
          href="/consultants"
          className={`nav-link text-light logo ${
            current === "/courses" && "active"
          }`}
        >
          Consultants
        </Link>
      </h3>

      <h3>
        <BookOutlined />
        <Link
          href="/posts"
          className={`nav-link text-light logo ${
            current === "/posts" && "active"
          }`}
        >
          Posts
        </Link>
      </h3>

      <div>
        {state !== null ? (
          <>
            <div className="dropdown" style={{ paddingRight: "55px" }}>
              <a
                className="btn dropdown-toggle text-light"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h4>{state?.user?.name.split(" ")[0]}</h4>
              </a>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link href="/user/dashboard">
                    <a
                      className={`nav-link dropdown-item ${
                        current === "/user/dashboard" && "active"
                      }`}
                    >
                      Dashboard
                    </a>
                  </Link>
                </li>

                <li>
                  <Link href="/user/profile/update">
                    <a
                      className={`nav-link dropdown-item ${
                        current === "/user/profile/update" && "active"
                      }`}
                    >
                      Profile
                    </a>
                  </Link>
                </li>

                {state.user.role?.includes("Admin") && (
                  <li>
                    <Link href="/admin">
                      <a
                        className={`nav-link dropdown-item ${
                          current === "/admin" && "active"
                        }`}
                      >
                        Admin
                      </a>
                    </Link>
                  </li>
                )}

                {state.user.role?.includes("Instructor") && (
                  <li>
                    <Link href="/instructor">
                      <a
                        className={`nav-link dropdown-item ${
                          current === "/instructor" && "active"
                        }`}
                      >
                        Instructor
                      </a>
                    </Link>
                  </li>
                )}

                <li>
                  <a onClick={logout} className="nav-link">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div style={{ paddingRight: "50px" }}>
            <Link href="/login">
              <a
                className={`nav-link text-light ${
                  current === "/login" && "active"
                }`}
              >
                Login
              </a>
            </Link>

            <Link href="/register">
              <a
                className={`nav-link text-light ${
                  current === "/register" && "active"
                }`}
              >
                Register
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
