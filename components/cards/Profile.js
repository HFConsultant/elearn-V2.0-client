import { useContext } from "react";
import moment from "moment";
import { Card, Badge, Avatar } from "antd";
import PostImage from "../images/PostImage";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import { imageSource } from "../../functions";
import Link from "next/link";
import CourseCard from "./CourseCard";

const { Meta } = Card;

const Profile = (user) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <Link href={`/courses`}>
      <a>
        <Card
          className="mb-4"
          cover={
            <img
              src={imageSource(user)}
              alt={user.name}
              style={{
                height: "150px",
                width: "150px",
                objectFit: "contain",
                backgroundColor: "#03a9f4",
              }}
              className="p-1"
            />
          }
        >
          <h2 className="font-weight-bold text-center">{user.name}</h2>
          <h3 className="font-weight-bold text-center">
            {user.title ? user.title : "Instructor"}
          </h3>
          <Badge
            count={user.about ? user.about : "Ask me anything..."}
            style={{ backgroundColor: "#03a9f4" }}
            className="pb-2 mr-2 text-center"
          />
          <h4 className="pt-2">Number of courses: {user.courses?.length}</h4>
        </Card>
      </a>
    </Link>
  );
};

export default Profile;
