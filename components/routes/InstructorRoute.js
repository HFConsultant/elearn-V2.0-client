import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import InstructorNav from "../nav/InstructorNav";

const InstructorRoute = ({ children }) => {
  // state
  const [ok, setOk] = useState(false);
  const [state] = useContext(UserContext);
  // router
  const router = useRouter();

  useEffect(() => {
    fetchInstructor();
  }, []);

  const fetchInstructor = async () => {
    try {
      const { data } = await axios.get(`/current-instructor`);
      // console.log("INSTRUCTOR ROUTE => ", data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/");
    }
  };

  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="p-4 d-flex justify-content-center display-1 text-primary"
        />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <InstructorNav />
            </div>
            <div className="col-md-10">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstructorRoute;
