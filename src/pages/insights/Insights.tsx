import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import "./Insights.css";

export default function Insights() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [textInsight, setTextInsight] = useState("");
  const [imageInsight, setImageInsight] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setTextInsight("");
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files && event.target.files[0];
    setImage(selectedImage);
    setImageInsight("");
  };

  const getImageInsight = () => {
    const formData = new FormData();
    formData.append("image", image as Blob);
    fetch(
      "http://127.0.0.1:5001/social-insights-66e0d/us-central1/get_image_rating",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.text())
      .then((data) => {
        setImageInsight(data);
      })
      .catch((err) => console.log(err));
  };

  const getTextInsight = () => {
    fetch(
      `http://127.0.0.1:5001/social-insights-66e0d/us-central1/get_rating/?text=${text}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.text())
      .then((data) => {
        setTextInsight(data);
      })
      .catch((err) => console.log(err));
  };

  const getInsightColor = (input: number) => {
    // gradient from red to green based on input [-1, 1]
    // const r = Math.round(255 * (1 - input));
    // const g = Math.round(200 * (1 + input));
    // const b = 0;
    let r, g, b;
    if (input > 0) {
      r = Math.round(0);
      g = Math.round(255 * input);
      b = 0;
    } else if (input < 0) {
      r = Math.round(255 * (1 - input));
      g = Math.round(200 * (1 + input));
      b = 0;
    } else {
      r = 155;
      g = 155;
      b = 0;
    }

    return `rgb(${r}, ${g}, ${b})`;
  };

  const formatTextInsight = (input: number) => {
    if (input > 0) {
      return `${Math.round(input * 100)}% positive`;
    } else if (input < 0) {
      return `${-Math.round(input * 100)}% negative`;
    } else {
      return "Neutral";
    }
  };

  return (
    <Container>
      <Container
        className="h-10 d-flex justify-content-center align-items-center"
        style={{ marginTop: "35px" }}
      >
        <p style={{ fontFamily: "Quicksand", fontSize: "56px" }}>
          <b>Sentiment Insights{"\n"}</b>
        </p>
      </Container>
      <Container className="vh-100 d-flex justify-content-center align-items-start">
        <Container className="text-container foreground raised round-1 p-5">
          <h2>Caption Insight</h2>

          {/* Text Input */}
          <Container>
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Enter caption here:"
              style={{ width: "100%", height: "250px", alignItems: "top" }}
            ></textarea>
            <button
              style={{ width: "100%", marginTop: "4%" }}
              type="button"
              onClick={() => getTextInsight()}
            >
              Enter
            </button>
          </Container>
          <div>
            {textInsight && (
              <>
                <h3
                  className="mt-3"
                  style={{ color: getInsightColor(parseFloat(textInsight)) }}
                >
                  {formatTextInsight(parseFloat(textInsight))}
                </h3>
              </>
            )}
          </div>
        </Container>
        <Container className="text-container foreground raised round-1 p-5 align-items-center">
          {/* Image Input */}
          <h2>Image Insight</h2>

          <div>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button
            style={{ width: "100%", marginTop: "4%" }}
            type="button"
            onClick={() => getImageInsight()}
          >
            Enter
          </button>

          <div>
            {image && (
              <>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected Image"
                  className="mt-4"
                  style={{ width: "100%", maxHeight: "500px" }}
                />
              </>
            )}
          </div>
          <div>
            {imageInsight && (
              <>
                <h3 className="mt-3">{imageInsight}</h3>
              </>
            )}
          </div>
        </Container>
      </Container>
    </Container>
  );
}
