import React, { useState, useEffect, useRef } from "react";
import alan from "./images/alan.jpg";
import wordsToNumbers from "words-to-numbers";
import { Typography } from "@mui/material";
import alanBtn from "@alan-ai/alan-sdk-web";
import { NewsCards } from "./components/";

const alanKey = `${process.env.REACT_APP_ALAN_KEY}`;

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const alanBtnRef = useRef({}).current;

  useEffect(() => {
    alanBtnRef.btnInstance = alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          console.log(articles);
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "instructions") {
          setIsOpen(true);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtnRef.btnInstance.playText("Please try that again...");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtnRef.btnInstance.playText("Opening...");
          } else {
            alanBtnRef.btnInstance.playText("Please try that again...");
          }
        }
      },
    });
  }, []);

  return (
    <div style={{margin: 'auto', width: '100%', padding: 0,}}>
      <div
        style={{
          padding: "0 5%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: '5%',
        }}
      >
        {newsArticles.length ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
                padding: "3%",
                borderRadius: 10,
                color: "white",
                backgroundColor: "rgba(21, 101, 192)",
                margin: "0 12px",
                textAlign: "center",
                height: "20vmin",
              }}
            >
              <Typography variant="h6" component="h2">
                Try saying: <br />
                <br />
                Open article number [4]
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
                padding: "3%",
                borderRadius: 10,
                color: "white",
                backgroundColor: "rgba(21, 101, 192)",
                margin: "0 12px",
                textAlign: "center",
                height: "20vmin",
              }}
            >
              <Typography variant="h6" component="h2">
                Try saying: <br />
                <br />
                Go back
              </Typography>
            </div>
          </div>
        ) : null}
        <img
          src={alan}
          style={{
            height: "20vmin",
            borderRadius: "10px",
            padding: "0",
          }}
          alt="logo"
        />
        <h2 style={{ margin: "3%", textAlign: "center" }}>
          Voice Controlled News App with Alan AI
        </h2>
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      {/* <Modal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
      {!newsArticles.length ? (
        <div
          style={{
            textAlign: "center",
            position: 'static',
            left: 0,
            bottom: 0,
            color: "black",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "120px",
          }}
        >
          <Typography variant="body1" component="h2">
            Created by
            <a
              style={{ textDecoration: "none", color: "rgba(21, 101, 192)" }}
              href="https://www.linkedin.com/in/urielgr/"
            >
              {" "}
              Uriel González
            </a>{" "}
          </Typography>
        </div>
      ) : null}
    </div>
  );
};

export default App;
