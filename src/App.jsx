import React, { useEffect, useState } from 'react';

const App = () => {
  const data = ["Apple", "Mango", "Cherry", "Apples", "Mangoes"];
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (input === "") {
      setSuggestions([]);
    } else {
      const filteredData = data.filter((item) =>
        item.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggestions(filteredData);
    }
  }, [input]);

  function keyDown(e) {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        setInput(suggestions[selectedIndex]);
      }
      setSuggestions([]);
    }
  }

  return (
    <div style={{ width: "100vw", height: "50vh", display: "flex", flexDirection: "column" }}>
      <div style={{
        height: "auto", width: "100vw", boxShadow: '0 0 20px', textAlign: "center", paddingTop: "30px"
      }}>TypeAhead</div>
      <div style={{ width: "100vw", height: "10vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <p>Use up & Down Arrows to Navigate</p>
        <input
          type="text"
          style={{ width: "20vw" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={keyDown}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", marginTop: "10px" }}>
        {suggestions.map((item, index) => (
          <div
            key={index}
            style={{
              width: "20vw",
              height: "5vh",
              backgroundColor: selectedIndex === index ? "darkblue" : "blue"
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
