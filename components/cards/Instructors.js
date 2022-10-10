import { useContext } from "react";
import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import { imageSource } from "../../functions";
import Link from "next/link";

const InstructorProfile = ({ instructors, handleFollow, handleUnfollow }) => {
  const [state] = useContext(UserContext);

  const router = useRouter();

  return (
    <>
      {/* <pre>{JSON.stringify(instructors)}</pre> */}
      <List
        itemLayout="horizontal"
        dataSource={instructors}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imageSource(user)} />}
              title={
                <div className="d-flex justify-content-between">
                  <Link href={`/user/${user.username}`}>
                    <a>{user.username}</a>
                  </Link>
                  {state &&
                  state.user &&
                  user.followers &&
                  user.followers.includes(state.user._id) ? (
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
                </div>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default InstructorProfile;

{
  /* <Link href={`/course/${slug}`}>
  <a>
    <Card
      className="mb-4"
      cover={
        <img
          src={image?.Location}
          alt={name}
          style={{ height: "200px", objectFit: "cover" }}
          className="p-1"
        />
      }
    >
      <h2 className="font-weight-bold">{name}</h2>
      <p>{instructor.name}</p>
      <Badge
        count={category}
        style={{ backgroundColor: "#03a9f4" }}
        className="pb-2 mr-2"
      />
      <h4 className="pt-2">
        {paid
          ? currencyFormatter({
              amount: price,
              currency: "usd",
            })
          : "Free"}
      </h4>
    </Card>
  </a>
</Link>; */
}
