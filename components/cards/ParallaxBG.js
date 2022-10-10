const ParallaxBG = ({ url }) => {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: "url( " + url + " )",
        backgroundAttachment: "fixed",
        padding: "100px 0px 75px 0px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        display: "block",
        zIndex: -3,
      }}
    >
      <h1 className="display-1 showcase font-weight-bold text-center">
        Health and Fitness
      </h1>
      <h1 className="display-1 showcase font-weight-bold text-center">
        Consultants
      </h1>
    </div>
  );
};

export default ParallaxBG;
