import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import { Avatar, Menu } from "antd";
import {
  AppstoreOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  CoffeeOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const Footer = () => {
  const [current, setCurrent] = useState("");
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const router = useRouter();

  return (
    <nav
      className="navbar position-sticky d-flex jumbotron justify-content-left fixed-bottom"
      // style={
      //   {
      //     // backgroundColor: "blue",
      //   }
      // }
    >
      <Link href="/about">
        <a
          className={`nav-link text-light logo ${
            current === "/about" && "active"
          }`}
        >
          <h6>About</h6>
        </a>
      </Link>

      <Link href="/privacy">
        <a
          className={`nav-link text-light logo ${
            current === "/privacy" && "active"
          }`}
        >
          <h6>Privacy</h6>
        </a>
      </Link>

      <Link href="/terms">
        <a
          className={`nav-link text-light logo ${
            current === "/terms" && "active"
          }`}
        >
          <h6>Terms</h6>
        </a>
      </Link>
    </nav>
  );
};

export default Footer;
