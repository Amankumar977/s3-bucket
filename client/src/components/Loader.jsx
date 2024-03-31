import React from "react";
import { Segment, Container } from "semantic-ui-react";

const Loader = () => {
  return (
    <div
      style={{
        padding: "240px",
      }}>
      <div style={{ borderRadius: "50px" }}>
        <Container>
          {/* Segment component to display the uploading message */}
          <Segment
            size="small"
            style={{
              borderRadius: "50px",
              padding: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F4F4F4",
            }}>
            Uploading Image
          </Segment>
        </Container>
      </div>
    </div>
  );
};

export default Loader;
