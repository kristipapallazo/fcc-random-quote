import { useEffect, useState } from "react";
import "./App.css";

const InfoLabel = ({ label }) => {
  return <span id="info-label">{label}</span>;
};
const generateCustomColor = () => {
  //rgb format rgb(a,b,c)
  let color;
  let arr = [];
  for (let i = 0; i < 3; i++) {
    const nr = Math.floor(Math.random() * 255);
    arr.push(nr);
  }
  if (arr.length === 3) {
    const [a, b, c] = arr;
    color = `rgb(${a}, ${b}, ${c})`;
  }
  if (color) {
    document.documentElement.style.setProperty("--primary", color);
  }
};

function App() {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(null);
  const [category, setCategory] = useState("happiness");

  const getQuote = async (category) => {
    setLoading(true);
    const header = {
      method: "GET",
      contentType: "application/json",
      headers: {
        "X-Api-Key": "rj6cC5svsBtgmwDsDCN3sQ==1idodAsbvbovfUwM",
      },
    };
    fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, header)
      .then((res) => res.json())
      .then((data) => {
        setQuote(data[0]);
      })
      .catch((e) => {
        console.log("e :>> ", e);
        throw new Error();
      })
      .finally(() => {
        setLoading(false);
      });

    generateCustomColor();
  };
  const handleQuoteReq = () => {
    getQuote(category);
  };

  const handleTweeter = () => {};
  const firstCharText = quote?.quote.substring(0, 1);
  const restText = quote?.quote.substring(1);
  useEffect(() => {
    getQuote("happiness");
  }, []);
  const infoLabel = loading ? "Loading.." : !quote ? "No quotes" : null;
  return (
    <div className="app">
      <div id="quote-box">
        {infoLabel ? (
          <InfoLabel label={infoLabel} />
        ) : (
          <>
            <div id="text">
              <span id="first-char">
                {firstCharText}
                <span id="cloned-first-char">{firstCharText}</span>
              </span>
              <span id="rest-chars">{restText}</span>
            </div>
            <div id="author">{`- ${quote.author}`}</div>
            {/* <div id="category">{quote.category}</div> */}
            <div id="btn-wrapper">
              <button onClick={handleTweeter} className="btn">
                <a
                  id="tweet-quote"
                  href="twitter.com/intent/tweet"
                  target="_blank"
                >
                  Tweet
                </a>
              </button>
              <button id="new-quote" onClick={handleQuoteReq} className="btn">
                New quote
              </button>
            </div>
          </>
        )}
      </div>
      <p id="web-author">
        by <span id="web-author-name">papallazo</span>
      </p>
    </div>
  );
}

export default App;
