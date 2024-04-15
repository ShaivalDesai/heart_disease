import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../Registration/Navbar";
import Prediction from "./Prediction";

interface PhotoDisplayProps {
  src: string; // URL of the image
  alt?: string; // Optional alt text for the image
  title: string; // Title of the image
}

const Page1: React.FC<PhotoDisplayProps> = ({ src, alt, title }) => {
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundColor: "#d4e8f3",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center", // Center align text inside container
          }}
        >
          <div>
            {title && (
              <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
                {title}
              </h1>
            )}
            <img
              src={src}
              alt={alt}
              style={{ width: "260px", height: "250px", borderRadius: "50%" }}
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Page1;
