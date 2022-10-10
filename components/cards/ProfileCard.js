import React from "react";
import {
  CDBCard,
  CDBPaneImage,
  CDBCardImage,
  CDBBtn,
  CDBCardBody,
  CDBCardTitle,
  CDBCardText,
  CDBIcon,
  CDBContainer,
} from "cdbreact";

export const Card = (user) => {
  return (
    <CDBContainer>
      <CDBCard style={{ width: "25rem" }}>
        <CDBCardImage
          className="img-fluid"
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
        />
        <CDBPaneImage
          style={{ marginTop: "-5rem" }}
          className="mx-auto border"
          width="130px"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ7ntUU7AzmOxa5HB8zS83sa-JFHEfZJAoI2A&usqp=CAU"
        />
        <CDBCardBody className="d-flex flex-column align-items-center mb-4">
          <CDBCardTitle>Sam Russo</CDBCardTitle>
          <CDBCardText>Senior Software Developer</CDBCardText>
          <CDBCardText className="text-muted">Detroit, USA</CDBCardText>
          <div>
            <CDBBtn size="small" color="dark">
              <CDBIcon fas icon="user-plus" /> Connect
            </CDBBtn>
            <CDBBtn className="ml-3" size="small" color="warning">
              {" "}
              Send Message{" "}
            </CDBBtn>
          </div>
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  );
};

export default ProfileCard;
