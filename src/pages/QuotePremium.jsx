import { useState, useRef } from 'react';
import './QuotePremium.css';
import html2canvas from 'html2canvas';

const CheckboxGroup = ({ title, name, items, selectedItems, onToggle }) => (
  <div className="checkbox-section">
    <h4>{title}</h4>
    <div className="checkbox-grid">
      {items.map(item => (
        <label key={item} className="checkbox-label">
          <input
            type="checkbox"
            checked={selectedItems.includes(item)}
            onChange={() => onToggle(name, item)}
          />
          {item}
        </label>
      ))}
    </div>
  </div>
);

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
    salads: [],
    sideDish: [],
    breadItems: [],
    curries: [],
    desserts: [],
    vegItems: [],
    cateringTeams: [],
    message: '',
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCheckboxToggle = (category, value) => {
    setForm(prev => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter(i => i !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const downloadImage = async () => {
    const canvas = await html2canvas(posterRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff', // Forces white background for the export
      windowWidth: 1200,
    });
    const link = document.createElement('a');
    link.download = `ALMILAS-${form.customer || 'Order'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="app-container">
      {!showPoster ? (
        <div className="form-container">
          <h2 className="form-title">AL MILAS - Menu Selection</h2>
          <div className="mobile-form-grid">
            <div className="input-group">
              <label>Date</label>
              <input type="date" name="date" onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Customer Name</label>
              <input
                name="customer"
                placeholder="Enter name"
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Venue</label>
              <input
                name="venue"
                placeholder="Event location"
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Time</label>
              <input
                name="time"
                placeholder="e.g. 6 to 10"
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Guests (Nos)</label>
              <input
                name="nos"
                placeholder="Quantity"
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Advance</label>
              <input
                name="advance"
                placeholder="Amount paid"
                onChange={handleChange}
              />
            </div>
          </div>

          <CheckboxGroup
            title="1. Welcome Drink"
            name="welcomeDrink"
            items={[
              'Mango Purple',
              'Pista Juice',
              'Fresh Lime',
              'Orange',
              'Watermelon',
              'Pineapple',
              'Tender Coconut',
              'Papaya',
              'Grape',
              'Carrot',
              'Apple',
              'Guava',
            ]}
            selectedItems={form.welcomeDrink}
            onToggle={handleCheckboxToggle}
          />
          <CheckboxGroup
            title="2. Main Course"
            name="mainCourse"
            items={[
              'Beef Biryani',
              'Chicken Biryani',
              'Chicken Surbiyani',
              'Beef Surbiyani',
              'Beef manthi',
              'Chicken manthi',
              'Beef Majboos',
              'Chicken Majboos',
              'Beef Kabsa',
              'Chicken Kabsa',
              'Gee Rice + Chicken Curry',
              'Gee Rice + Beef Curry',
              'Thenga choru + Beef',
              'Thenga choru + Chicken',
            ]}
            selectedItems={form.mainCourse}
            onToggle={handleCheckboxToggle}
          />
          <CheckboxGroup
            title="3. Salads & Pickles"
            name="salads"
            items={[
              'Sweet Salad',
              'Normal Salad',
              'Normal Pickle',
              'Sweet Pickle',
              'Mayonnaise',
              'Sauce',
            ]}
            selectedItems={form.salads}
            onToggle={handleCheckboxToggle}
          />
          <CheckboxGroup
            title="4. Side Dishes"
            name="sideDish"
            items={[
              'Chicken Chilli',
              'Chicken Kondattam',
              'Beef Chilli',
              'Beef Varattiyathu',
              'Alfam',
              'Broast',
              'Shavaya',
              'Chilli Gobi',
              'Fish Fry',
            ]}
            selectedItems={form.sideDish}
            onToggle={handleCheckboxToggle}
          />
          <CheckboxGroup
            title="5. Bread & Dosa"
            name="breadItems"
            items={[
              'Porotta',
              'Pathiri',
              'Vellayappam',
              'Idiyappam',
              'Battura',
              'Ghee Pathal',
              'Rumali Roti',
              'Kuboos',
              'Dosa Items',
            ]}
            selectedItems={form.breadItems}
            onToggle={handleCheckboxToggle}
          />
          <CheckboxGroup
            title="6. Curries"
            name="curries"
            items={[
              'Chicken Curry',
              'Beef Curry',
              'Fish Curry',
              'Vegetable Curry',
              'Egg Curry',
            ]}
            selectedItems={form.curries}
            onToggle={handleCheckboxToggle}
          />
          <CheckboxGroup
            title="7. Desserts & Extras"
            name="desserts"
            items={[
              'Gothambu Payasam',
              'Semiya Payasam',
              'Parippu Payasam',
              'Palada Payasam',
              'Ada Pradhaman',
              'Elaneer Payasam',
              'Ice Cream',
              'Popcorn',
              'Cotton Candy',
              'Herbal Tea',
              'Jalebi',
              'Mysore Pak',
              'Fruit Salad',
              'Chocolate Parfait',
              'Tea Stall',
              'Carrot Halwa',
              'Puddings',
            ]}
            selectedItems={form.desserts}
            onToggle={handleCheckboxToggle}
          />
          <CheckboxGroup
            title="8. Veg Items"
            name="vegItems"
            items={['Nadan Choru', 'Sambar', 'Avial', 'Upari', 'Pappadam']}
            selectedItems={form.vegItems}
            onToggle={handleCheckboxToggle}
          />
          <CheckboxGroup
            title="Catering Teams"
            name="cateringTeams"
            items={[
              'Plates',
              'Bottle Water',
              'Counters',
              'Table Cloth',
              'Catering boys',
              'Supervisor',
              'Hosting girls',
              'Hosting boys',
              'Security',
            ]}
            selectedItems={form.cateringTeams}
            onToggle={handleCheckboxToggle}
          />

          <div className="input-group full-width hii">
            <label>Additional Message</label>
            <textarea
              name="message"
              placeholder="Special instructions..."
              rows="4"
              onChange={handleChange}
            ></textarea>
          </div>

          <button className="generate-btn" onClick={() => setShowPoster(true)}>
            View LetterPad
          </button>
        </div>
      ) : (
        <div className="preview-screen">
          <div className="sticky-actions">
            <button className="back-btn" onClick={() => setShowPoster(false)}>
              ← Edit
            </button>
            <button className="download-btn" onClick={downloadImage}>
              Download Image
            </button>
          </div>

          <div className="scrollable-paper-area">
            <div className="letterhead-paper" ref={posterRef}>
              <div className="top-accent-bar"></div>
              <header className="header">
                <div className="logo-area">
                  <img
                    src="/logo2.png"
                    alt="Al Milas Logo"
                    className="main-logo"
                  />
                </div>
                <div className="contact-info">
                  <div className="info-item">
                    <i className="fa-solid fa-phone icon-gold"></i>
                    <span>755994881 | 8111811281</span>
                  </div>
                  <div className="info-item">
                    <i className="fa-solid fa-envelope icon-gold"></i>
                    <span>Suhailsuhail8881@gmail.com</span>
                  </div>
                  <div className="info-item">
                    <i className="fa-solid fa-location-dot icon-gold"></i>
                    <span>Moloor, Cherpulassery, Palakkad</span>
                  </div>
                </div>
              </header>
              <div className="left-vertical-line"></div>

              <main className="content-body">
                <div className="info-table">
                  <div className="table-row">
                    <div className="table-cell">
                      <b>DATE :</b> {form.date}
                    </div>
                    <div className="table-cell">
                      <b>CUSTOMER :</b> {form.customer}
                    </div>
                  </div>
                  <div className="table-row">
                    <div className="table-cell">
                      <b>VENUE :</b> {form.venue}
                    </div>
                    <div className="table-cell">
                      <b>TIME :</b> {form.time}
                    </div>
                  </div>
                  <div className="table-row">
                    <div className="table-cell">
                      <b>NOS :</b> {form.nos}
                    </div>
                    <div className="table-cell">
                      <b>ADVANCE :</b> {form.advance}
                    </div>
                  </div>
                </div>

                <div className="menu-display">
                  <h2 className="menu-header">SELECTED MENU</h2>

                  <div className="menu-grid">
                    {form.welcomeDrink.length > 0 && (
                      <div className="menu-card">
                        <h3>WELCOME DRINK</h3>
                        <ul>
                          {form.welcomeDrink.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {form.mainCourse.length > 0 && (
                      <div className="menu-card">
                        <h3>MAIN COURSE</h3>
                        <ul>
                          {form.mainCourse.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {form.curries.length > 0 && (
                      <div className="menu-card">
                        <h3>CURRIES</h3>
                        <ul>
                          {form.curries.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {form.sideDish.length > 0 && (
                      <div className="menu-card">
                        <h3>SIDE DISHES</h3>
                        <ul>
                          {form.sideDish.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {form.breadItems.length > 0 && (
                      <div className="menu-card">
                        <h3>BREAD & DOSA</h3>
                        <ul>
                          {form.breadItems.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {form.desserts.length > 0 && (
                      <div className="menu-card">
                        <h3>DESSERTS & EXTRAS</h3>
                        <ul>
                          {form.desserts.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {form.salads.length > 0 && (
                      <div className="menu-card">
                        <h3>SALADS & PICKLES</h3>
                        <ul>
                          {form.salads.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {form.vegItems.length > 0 && (
                      <div className="menu-card">
                        <h3>VEG ITEMS</h3>
                        <ul>
                          {form.vegItems.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {form.cateringTeams.length > 0 && (
                      <div className="menu-card">
                        <h3>CATERING SERVICE</h3>
                        <ul>
                          {form.cateringTeams.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {form.message && (
                  <div className="letter-notes">
                    <p>{form.message}</p>
                  </div>
                )}
              </main>

              <footer className="footer-bar-container">
                <div className="footer-gold-shape"></div>
              </footer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
