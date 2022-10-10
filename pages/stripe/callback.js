import { useContext, useEffect } from "react";
import { UserContext } from "../../context";
import { SyncOutlined } from "@ant-design/icons";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";

const StripeCallback = () => {
  const {
    state: { user },
  } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      axios.post("/get-account-status").then((res) => {
        // console.log(res);
        dispatch({
          type: "LOGIN",
          payload: res.data,
        });
        window.localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "/instructor";
      });
    }
  }, [user]);

  return (
    <SyncOutlined
      spin
      className="p-5 d-flex justify-content-center display-1 text-danger"
    />
  );
};

export default StripeCallback;
