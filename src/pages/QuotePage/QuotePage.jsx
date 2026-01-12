import { useState, useRef } from "react";
import "./QuotePage.css";
import logo from "/logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const QuotePage = () => {
  const posterRef = useRef();
  const [showPoster, setShowPoster] = useState(false);

  const [form, setForm] = useState({
    date: "",
    customer: "",
    venue: "",
    time: "",
    nos: "",
    advance: "",
    welcomeDrink: [],
    mainCourse: [],
    dessert: [],
    dosaCounter: [],
    saladBar: [],
    herbalTea: []
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (category, value) => {
    setForm((prev) => {
      const exists = prev[category].includes(value);
      return {
        ...prev,
        [category]: exists
          ? prev[category].filter((i) => i !== value)
          : [...prev[category], value]
      };
    });
  };

  const generatePoster = () => setShowPoster(true);

  const downloadImage = async () => {
    const canvas = await html2canvas(posterRef.current);
    const link = document.createElement("a");
    link.download = "quotation.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(posterRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("quotation.pdf");
  };

  const printPoster = () => window.print();

  const CheckboxGroup = ({ title, items, name }) => (
    <div className="checkbox-group">
      <h4>{title}</h4>
      {items.map((item, i) => (
        <label key={i}>
          <input
            type="checkbox"
            checked={form[name].includes(item)}
            onChange={() => handleCheckbox(name, item)}
          />
          {item}
        </label>
      ))}
    </div>
  );

  return (
    <div className="main-wrapper">

      {!showPoster && (
        <div className="form-box">
          <h2>Quotation Form</h2>

          <input type="date" name="date" onChange={handleChange} />
          <input placeholder="Customer Name" name="customer" onChange={handleChange} />
          <input placeholder="Venue" name="venue" onChange={handleChange} />
          <input placeholder="Time" name="time" onChange={handleChange} />
          <input placeholder="Nos" name="nos" onChange={handleChange} />
          <input placeholder="Advance" name="advance" onChange={handleChange} />

          <CheckboxGroup
            title="Welcome Drink"
            name="welcomeDrink"
            items={["Fresh Lime", "Orange Juice", "Watermelon", "Pineapple"]}
          />

          <CheckboxGroup
            title="Main Course"
            name="mainCourse"
            items={[
              "Palappam",
              "Vegetable Stew",
              "Coin Parotta",
              "Biriyani Rice",
              "Chilly Chicken",
              "Veg Kurma",
            ]}
          />

          <CheckboxGroup
            title="Dessert"
            name="dessert"
            items={["Ice Cream", "Fruit Salad", "Gulab Jamun"]}
          />

          <CheckboxGroup
            title="Dosa Counter"
            name="dosaCounter"
            items={["Masala", "Plain", "Onion", "Ghee", "Podi"]}
          />

          <CheckboxGroup
            title="Salad Bar"
            name="saladBar"
            items={["Cut Fruits", "Green Salad", "Sprouts Salad"]}
          />

          <CheckboxGroup
            title="Herbal Tea"
            name="herbalTea"
            items={["Ginger", "Mint", "Hibiscus", "Lavender", "Lemongrass"]}
          />

          <button onClick={generatePoster}>Generate Poster</button>
        </div>
      )}

      {showPoster && (
        <>
          <div className="download-buttons">
            <button onClick={downloadImage}>Download Image</button>
            <button onClick={downloadPDF}>Download PDF</button>
            <button onClick={printPoster}>Print</button>
          </div>

          <div className="quote-page" ref={posterRef}>
            <div className="quote-header">
              <img src={logo} className="logo" />
              <div>
                <p>96 56 96 5553</p>
                <p>naturaleventspkd@gmail.com</p>
              </div>
            </div>

            <div className="info-table">
              <div>DATE : {form.date}</div>
              <div>CUSTOMER : {form.customer}</div>
              <div>VENUE : {form.venue}</div>
              <div>TIME : {form.time}</div>
              <div>NOS : {form.nos}</div>
              <div>ADVANCE : {form.advance}</div>
            </div>

            <h2 className="menu-title">MENU - 1</h2>

            <div className="menu-body">
              <div>
                <h3>WELCOME DRINK</h3>
                {form.welcomeDrink.map((i, k) => <p key={k}>{i}</p>)}

                <h3>MAIN COURSE</h3>
                {form.mainCourse.map((i, k) => <p key={k}>{i}</p>)}

                <h3>DOSA COUNTER</h3>
                {form.dosaCounter.map((i, k) => <p key={k}>{i}</p>)}
              </div>

              <div>
                <h3>DESSERT</h3>
                {form.dessert.map((i, k) => <p key={k}>{i}</p>)}

                <h3>HERBAL TEA</h3>
                {form.herbalTea.map((i, k) => <p key={k}>{i}</p>)}

                <h3>SALAD BAR</h3>
                {form.saladBar.map((i, k) => <p key={k}>{i}</p>)}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QuotePage;
