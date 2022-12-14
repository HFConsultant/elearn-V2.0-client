import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Tooltip, Button, Modal, List } from "antd";
import {
  EditOutlined,
  CheckOutlined,
  UploadOutlined,
  QuestionOutlined,
  CloseOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import AddLessonForm from "../../../../components/forms/AddLessonForm";
import { toast } from "react-toastify";
import Item from "antd/lib/list/Item";

const CourseView = () => {
  const [course, setCourse] = useState({});
  // for lessons
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: {},
  });
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [progress, setProgress] = useState(0);
  // student count
  const [students, setStudents] = useState(0);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);

  useEffect(() => {
    course && studentCount();
  }, [course]);

  const loadCourse = async () => {
    // console.log("loadCourse");
    const { data } = await axios.get(`/course/${slug}`);
    setCourse(data[0]);
    // console.log("course loaded with =>", data[0]);
  };

  const studentCount = async () => {
    const { data } = await axios.post(`/instructor/student-count`, {
      courseId: course._id,
    });
    // console.log("STUDENT COUNT => ", data);
    setStudents(data.length);
  };

  // Functions for AddLesson
  const handleAddLesson = async (e) => {
    e.preventDefault();
    // console.log("handleAddLesson triggered");
    try {
      const { data } = await axios.post(
        `/course/lesson/${slug}/${course.instructor._id}`,
        values
      );
      // console.log("ADD LESSON DATA ==>", data);
      setValues({ ...values, title: "", content: "", video: {} });
      setProgress(0);
      setUploadButtonText("Upload video");
      setVisible(false);
      setCourse(data[0]);
      toast("Lesson added successfully");
    } catch (err) {
      console.log(err);
      toast("Lesson add failed");
    }
  };

  const handleVideo = async (e) => {
    // console.log("handleVideo Event:", e.target);
    try {
      const file = e.target.files[0];
      setUploadButtonText(file.name);
      setUploading(true);
      // console.log("FILE =>", file);

      const videoData = new FormData();
      videoData.append("video", file);
      // save progress bar and send video as form data to backend
      const { data } = await axios.post(
        `/course/upload-video/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );
      // once response is received
      // console.log("handleVideo data =>", data);
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video upload failed");
    }
  };

  const handleVideoRemove = async () => {
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/course/remove-video/${course.instructor._id}`,
        values.video
      );
      // console.log(data);
      setValues({ ...values, video: {} });
      setUploading(false);
      setUploadButtonText("Upload another video");
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video remove failed");
    }
  };

  const handlePublish = async (e, courseId) => {
    try {
      let answer = window.confirm("Are you sure you want to publish?");
      if (!answer) return;
      const { data } = await axios.put(`/course/publish/${courseId}`);
      setCourse(data[0]);
      toast("Congrats! Your course is now live.");
    } catch (err) {
      toast("Course was not published. Try again later.");
    }
  };
  const handleUnpublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "Are you sure you want to unpublish your course?"
      );
      if (!answer) return;
      const { data } = await axios.put(`/course/unpublish/${courseId}`);
      setCourse(data[0]);
      toast(
        "Your course is unpublished and no longer available on marketplace"
      );
    } catch (err) {
      toast(
        "Course unpublish failed. Course is still available on marketplace"
      );
    }
  };

  return (
    <InstructorRoute>
      <div className="pt-3 container-fluid">
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
        {course && (
          <div className="pt-1 container-fluid">
            <div className="pt-2 media">
              <Avatar size={80} src={course.image?.Location || "/course.png"} />
              <div className="pl-2 media-body">
                <div className="row">
                  <div className="col">
                    <h5 className="mt-2 text-primary">{course.name}</h5>
                    <p style={{ marginTop: "-10px" }}>
                      {course.lessons?.length} Lessons
                    </p>
                    <p style={{ marginTop: "-15px", fontSize: "10px" }}>
                      {course.category}
                    </p>
                    <div className=" col-2 pt-1">
                      <Tooltip title={`${students} Enrolled`}>
                        <UserSwitchOutlined className="mr-4 h5 pointer text-info" />
                      </Tooltip>
                      <Tooltip title="Edit">
                        <EditOutlined
                          onClick={() =>
                            router.push(`/instructor/course/edit/${slug}`)
                          }
                          className="mr-4 h5 pointer text-warning"
                        />
                      </Tooltip>

                      {course.lessons && course.lessons.length < 1 ? (
                        <Tooltip title="Min of 1 lesson required to publish">
                          <QuestionOutlined className="h5 pointer text-danger" />
                        </Tooltip>
                      ) : course.published ? (
                        <Tooltip title="Unpublish">
                          <CloseOutlined
                            onClick={(e) => handleUnpublish(e, course._id)}
                            className="h5 pointer text-danger"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Publish">
                          <CheckOutlined
                            onClick={(e) => handlePublish(e, course._id)}
                            className="h5 pointer text-success"
                          />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <ReactMarkdown>children={course.description}</ReactMarkdown>
              </div>
            </div>
            <div className="row">
              <Button
                onClick={() => setVisible(true)}
                className="text-center col-md-6 offset-md-3"
                type="primary"
                shape="round"
                icon={<UploadOutlined />}
                size="large"
              >
                Add Lesson
              </Button>
            </div>

            <br />

            <Modal
              title="+ Add Lesson"
              centered
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <AddLessonForm
                values={values}
                setValues={setValues}
                handleAddLesson={handleAddLesson}
                uploading={uploading}
                uploadButtonText={uploadButtonText}
                handleVideo={handleVideo}
                progress={progress}
                handleVideoRemove={handleVideoRemove}
              />
            </Modal>
            <div className="pb-5 row">
              <div className="col lesson-list">
                <h4>
                  {course && course.lessons && course.lessons.length} Lessons
                </h4>
                <List
                  itemLayout="horizontal"
                  dataSource={course && course.lessons}
                  renderItem={(item, index) => (
                    <Item>
                      <Item.Meta
                        avatar={<Avatar>{index + 1}</Avatar>}
                        title={item.title}
                      ></Item.Meta>
                    </Item>
                  )}
                ></List>
              </div>
            </div>
            {/* <h1 className="text-center">Add Lesson</h1>
            <AddLessonForm
              values={values}
              setValues={setValues}
              handleAddLesson={handleAddLesson}
              uploading={uploading}
              uploadButtonText={uploadButtonText}
              handleVideo={handleVideo}
              progress={progress}
              handleVideoRemove={handleVideoRemove}
            /> */}
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
