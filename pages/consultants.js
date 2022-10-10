import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";
import { Card, List, Badge } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { imageSource } from "../functions";


const handleFollow = async (user) => {
  // console.log("add this user to following list ", user);
  try {
    const { data } = await axios.put("/user-follow", { _id: user._id });
    // console.log("handle follow response => ", data);
    // update local storage, update user, keep token
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = data;
    localStorage.setItem("auth", JSON.stringify(auth));
    // update context
    setState({ ...state, user: data });
    // update people state
    let filtered = result.filter((p) => p._id !== user._id);
    setResult(filtered);
    toast.success(`Following ${user.name}`);
  } catch (err) {
    console.log(err);
  }
};

const handleUnfollow = async (user) => {
  try {
    const { data } = await axios.put("/user-unfollow", { _id: user._id });
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = data;
    localStorage.setItem("auth", JSON.stringify(auth));
    // update context
    setState({ ...state, user: data });
    // update people state
    let filtered = result.filter((p) => p._id !== user._id);
    setResult(filtered);
    toast.error(`Unfollowed ${user.name}`);
  } catch (err) {
    console.log(err);
  }
};

const Consultants = ({ instructors }) => {
  const [state] = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [ok, setOk] = useState(false);
  const router = useRouter();
  const _id = router.query._id;

  // const [courses, setCourses] = useState([]);

  // // useEffect(() => {}, []);

  // const loadCourses = async () => {
  // 	if (courses.length < 1) {
  //   try {
  //     const { courses } = await axios.get("/courses");
  //     setCourses(courses[0]);
  //     console.log("Courses loaded =>", courses[0]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // };

  // //  loadCourses();

  // // const courseId = courses[course[id]]

  // console.log(courses);

  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <>
      <div className="container text-center">
        <h2 className="title showcase">Meet Your Team!</h2>
      </div>

      <List
        size="large"
        grid={{
          column: "flex",
          gutter: { xs: 8, sm: 16, md: 24, lg: 32 },
        }}
        orientation="center"
        dataSource={instructors}
        renderItem={(user) => (
          <List.Item>
            <Card
              // className="mb-2"
              cover={
                <img
                  src={imageSource(user)}
                  alt={user.name}
                  style={{
                    height: "150px",
                    // width: "150px",
                    objectFit: "contain",
                    backgroundColor: "#03a9f4",
                  }}
                  // className="p-1"
                />
              }
            >
              <h2 className="font-weight-bold text-center">
                {user.name.split(" ")[0]}
              </h2>
              <p className="text-center">
                {user.title ? user.title : "Ask me anything!"}
              </p>
              <h3 className="text-center">Courses: {user.courses.length}</h3>
              {/* <Badge
                count="Message"
                showZero="true"
                style={{ backgroundColor: "#03a9f4", alignment: "middle" }}
                alignment="middle"
                className="text-center"
              /> */}
              <h5 className="text-center">
                {state?.user && user?.followers.includes(state.user._id) ? (
                  <span
                    onClick={() => handleUnfollow(user)}
                    className="text-primary pointer"
                  >
                    Unfollow
                  </span>
                ) : (
                  <span
                    onClick={() => handleFollow(user)}
                    className="text-primary pointer"
                  >
                    Follow
                  </span>
                )}
              </h5>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/consultants`);
  // const { courses } = await axios.get(`${process.env.API}/courses`);
  // console.log(data);
  return {
    props: {
      instructors: data,
      // courses,
    },
  };
}

export default Consultants;
