import { useState, useRef } from 'react';
import './QuotePremium.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '/logo.png';

export default function QuotePremium() {
  const posterRef = useRef(null);
  const [showPoster, setShowPoster] = useState(false);

  const [form, setForm] = useState({
    date: '',
    customer: '',
    venue: '',
    time: '',
    nos: '',
    advance: '',
    welcomeDrink: [],
    mainCourse: [],
    dessert: [],
    dosaCounter: [],
    herbalTea: [],
    saladBar: [],
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCheckbox = (group, value) => {
    setForm(prev => {
      const exists = prev[group].includes(value);
      return {
        ...prev,
        [group]: exists
          ? prev[group].filter(i => i !== value)
          : [...prev[group], value],
      };
    });
  };

  const generatePoster = () => setShowPoster(true);

  const capturePoster = async () => {
    const poster = posterRef.current;
    const oldTransform = poster.style.transform;
    poster.style.transform = 'scale(1)';
    const canvas = await html2canvas(poster, {
      scale: 2,
      backgroundColor: '#fff',
    });
    poster.style.transform = oldTransform;
    return canvas;
  };

  const downloadImage = async () => {
    const canvas = await capturePoster();
    const link = document.createElement('a');
    link.download = 'premium-quotation.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const CheckboxGroup = ({ title, name, items }) => (
    <div className="check-group">
      <h4>{title}</h4>
      {items.map((i, k) => (
        <label key={k}>
          <input
            type="checkbox"
            checked={form[name].includes(i)}
            onChange={() => handleCheckbox(name, i)}
          />
          {i}
        </label>
      ))}
    </div>
  );

  return (
    <div className="wrapper">
      {!showPoster && (
        <div className="simple-form">
          <h2>Catering Form</h2>
          <input type="date" name="date" onChange={handleChange} />
          <input
            name="customer"
            placeholder="Customer Name"
            onChange={handleChange}
          />
          <input name="venue" placeholder="Venue" onChange={handleChange} />
          <input name="time" placeholder="Time" onChange={handleChange} />
          <input name="nos" placeholder="Nos" onChange={handleChange} />
          <input name="advance" placeholder="Advance" onChange={handleChange} />

          <CheckboxGroup
            title="Welcome Drink"
            name="welcomeDrink"
            items={[
              'Fresh Lime Juice',
              'Orange Juice',
              'Watermelon Juice',
              'Pineapple Juice',
              'Grape Juice',
              'Apple Juice',
              'Mango Juice',
              'Mixed Fruit Juice',
              'Tender Coconut Water',
              'Mint Lemon Juice',
              'Carrot Juice',
              'Beetroot Juice',
            ]}
          />

          <CheckboxGroup
            title="Main Course"
            name="mainCourse"
            items={[
              'Palappam',
              'Vegetable Stew',
              'Coin Parotta',
              'Nadan Chicken Curry',
              'Veg Kurma',
              'Biriyani Rice',
              'Salad, Pickle',
              'Chilly Gobi',
            ]}
          />

          <CheckboxGroup
            title="Dessert"
            name="dessert"
            items={['Ice Cream - Vanilla', 'Fruits Salad']}
          />

          <CheckboxGroup
            title="Dosa Counter"
            name="dosaCounter"
            items={[
              'Masala',
              'Plain',
              'Onion',
              'Podi',
              'Ghee',
              'Chutney',
              'Sambar',
            ]}
          />

          <CheckboxGroup
            title="Herbal Tea"
            name="herbalTea"
            items={['Ginger', 'Mint', 'Hibiscus', 'Lavender']}
          />

          <CheckboxGroup
            title="Salad Bar"
            name="saladBar"
            items={['Cut Fruits', 'Green Salads']}
          />

          <button onClick={generatePoster}>Generate Premium Poster</button>
        </div>
      )}

      {showPoster && (
        <>
          <button className="download-btn" onClick={downloadImage}>
            Download Image
          </button>

          <div className="poster-container">
            <div className="poster" ref={posterRef}>
              <div className="gold-frame">
                <div className="top">
                  <img src={logo} className="logo" />
                  <div className="contact">
                    <p>+91 7559948881</p>
                    <p>+91 7559948881</p>
                    <p>almilascatering@gmail.com</p>
                    <p>Cherpulassery, Palakkad</p>
                  </div>
                </div>

                <h1 className="title">CATERING QUOTATION</h1>

                <div className="info">
                  <div>DATE : {form.date}</div>
                  <div>CUSTOMER : {form.customer}</div>
                  <div>VENUE : {form.venue}</div>
                  <div>TIME : {form.time}</div>
                  <div>NOS : {form.nos}</div>
                  <div>ADVANCE : {form.advance}</div>
                </div>

                <h2 className="menu-title">MENU</h2>

                <div className="menu">
                  <div>
                    <h3>WELCOME DRINK</h3>
                    {form.welcomeDrink.map((i, k) => (
                      <p key={k}>{i}</p>
                    ))}

                    <h3>MAIN COURSE</h3>
                    {form.mainCourse.map((i, k) => (
                      <p key={k}>{i}</p>
                    ))}

                    <h3>DOSA COUNTER</h3>
                    {form.dosaCounter.map((i, k) => (
                      <p key={k}>{i}</p>
                    ))}
                  </div>

                  <div>
                    <h3>DESSERT</h3>
                    {form.dessert.map((i, k) => (
                      <p key={k}>{i}</p>
                    ))}

                    <h3>HERBAL TEA</h3>
                    {form.herbalTea.map((i, k) => (
                      <p key={k}>{i}</p>
                    ))}

                    <h3>SALAD BAR</h3>
                    {form.saladBar.map((i, k) => (
                      <p key={k}>{i}</p>
                    ))}
                  </div>
                </div>

                <div className="rate">
                  RATE : 250/- (SERVICE AND TRANSPORTATION INCLUDED)
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
