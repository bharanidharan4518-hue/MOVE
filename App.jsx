import React, { useMemo, useState } from "react";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, CheckCircle2, ChevronDown,
  Clock3, Facebook, Instagram, MapPin, Menu, Package, Phone, ShieldCheck,
  Truck, X, Zap, Navigation, CircleHelp, Mail, MoveRight
} from "lucide-react";

const LOCATIONS = [
  "Tiruppur Old Bus Stand",
  "Tiruppur New Bus Stand",
  "Kangeyam",
  "Rayapuram",
  "Karuvampalayam",
  "Mannarai",
  "Dharapuram",
  "Coimbatore"
];

const PRICE_BY_DISTANCE = {
  "Tiruppur Old Bus Stand": 100,
  "Tiruppur New Bus Stand": 120,
  "Kangeyam": 450,
  "Rayapuram": 150,
  "Karuvampalayam": 180,
  "Mannarai": 220,
  "Dharapuram": 650,
  "Coimbatore": 950
};

function Logo({ light = false }) {
  return <a className={`brand ${light ? "brand-light" : ""}`} href="#home" aria-label="Move Logistics home">
    <span className="brand-mark"><MoveRight size={23} strokeWidth={2.8}/></span>
    <span className="brand-name">move<span>.</span><small>LOGISTICS</small></span>
  </a>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [from, setFrom] = useState("Tiruppur Old Bus Stand");
  const [to, setTo] = useState("Coimbatore");
  const [weight, setWeight] = useState("5");
  const [trackingId, setTrackingId] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [showQuote, setShowQuote] = useState(false);
  const [order, setOrder] = useState({ name: "", phone: "", item: "Parcel", notes: "" });
  const [orderMessage, setOrderMessage] = useState("");
  const [faqOpen, setFaqOpen] = useState(0);

  const estimate = useMemo(() => {
    if (from === to) return null;
    const routeBase = Math.max(100, (PRICE_BY_DISTANCE[from] + PRICE_BY_DISTANCE[to]) / 2);
    return Math.round((routeBase + Math.max(0, Number(weight || 0) - 1) * 20) / 10) * 10;
  }, [from, to, weight]);

  function handleQuote(event) {
    event.preventDefault();
    setShowQuote(true);
    document.getElementById("quote-result")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleTrack(event) {
    event.preventDefault();
    const id = trackingId.trim().toUpperCase();
    if (!id) {
      setTrackingResult({ error: "Enter a tracking ID to continue." });
      return;
    }
    const saved = JSON.parse(localStorage.getItem("moveOrders") || "[]");
    const found = saved.find((item) => item.id.toUpperCase() === id);
    if (found) setTrackingResult({ order: found });
    else if (id === "MOVE12345") {
      setTrackingResult({ demo: true, id });
    } else {
      setTrackingResult({ error: "We couldn't find that ID in this browser. Try your order ID or demo ID MOVE12345." });
    }
  }

  function handleOrder(event) {
    event.preventDefault();
    if (!/^[6-9]\d{9}$/.test(order.phone.trim())) {
      setOrderMessage("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    const saved = JSON.parse(localStorage.getItem("moveOrders") || "[]");
    const id = "MOV" + Date.now().toString().slice(-7);
    const newOrder = {
      ...order, id, from, to, weight, estimate,
      status: "Order received",
      createdAt: new Date().toLocaleString("en-IN")
    };
    localStorage.setItem("moveOrders", JSON.stringify([newOrder, ...saved]));
    setOrderMessage(`Order saved in this browser! Your demo tracking ID is ${id}. Save it to check the status below.`);
    setTrackingId(id);
    setTrackingResult({ order: newOrder });
    setOrder({ name: "", phone: "", item: "Parcel", notes: "" });
  }

  const closeMenu = () => setMenuOpen(false);

  return <div className="site-shell">
    <div className="announcement"><span className="announcement-dot"></span> Local deliveries. Dependable service. <a href="#quote">Get a quick estimate <ArrowRight size={13}/></a></div>
    <header className="site-header">
      <div className="container nav-wrap">
        <Logo />
        <button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#how-it-works" onClick={closeMenu}>How it works</a>
          <a href="#tracking" onClick={closeMenu}>Track shipment</a>
          <a href="#about" onClick={closeMenu}>About us</a>
          <a className="nav-cta" href="#quote" onClick={closeMenu}>Book a delivery <ArrowUpRight size={16}/></a>
        </nav>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-grid"></div>
        <div className="container hero-content">
          <div className="hero-copy">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-line"></span> YOUR LOCAL LOGISTICS PARTNER</div>
            <h1>Good things<br/>are <em>on the move.</em></h1>
            <p className="hero-lead">From your doorstep to their next destination, we help your parcels move with care, clarity and confidence.</p>
            <div className="hero-actions">
              <a href="#quote" className="button button-lime">Plan a delivery <ArrowRight size={17}/></a>
              <a href="#tracking" className="button button-outline">Track a parcel <Navigation size={16}/></a>
            </div>
            <div className="hero-trust">
              <div className="trust-avatars"><span>B</span><span>M</span><span>K</span><span>+</span></div>
              <div><strong>Moving local business forward</strong><small>Thoughtful service, one shipment at a time.</small></div>
            </div>
          </div>
          <div className="hero-visual" aria-label="Illustration of a delivery truck on the road">
            <div className="visual-orbit orbit-one"></div><div className="visual-orbit orbit-two"></div>
            <div className="visual-label label-top"><span className="label-icon"><Zap size={16}/></span><div><strong>Ready when you are</strong><small>Simple booking experience</small></div></div>
            <div className="visual-sun"></div>
            <div className="road road-back"></div><div className="road road-front"></div>
            <div className="truck-art">
              <div className="truck-speed speed-one"></div><div className="truck-speed speed-two"></div>
              <div className="truck-box"><div className="truck-logo">move<span>.</span></div><div className="truck-box-line"></div><div className="truck-box-line short"></div></div>
              <div className="truck-cab"><div className="truck-window"></div><div className="truck-headlight"></div></div>
              <div className="truck-wheel wheel-one"><i></i></div><div className="truck-wheel wheel-two"><i></i></div>
              <div className="truck-wheel wheel-three"><i></i></div>
            </div>
            <div className="visual-label label-bottom"><span className="label-icon label-icon-dark"><MapPin size={17}/></span><div><strong>Across your route</strong><small>Tiruppur · Kangeyam · beyond</small></div></div>
            <div className="route-dash dash-one"></div><div className="route-dash dash-two"></div>
          </div>
        </div>
        <div className="hero-bottom container"><span>BUILT AROUND YOUR ROUTE</span><div className="hero-bottom-line"></div><span>LOCAL KNOW-HOW. BIG CARE.</span></div>
      </section>

      <section className="stats-strip">
        <div className="container stats-grid">
          <div className="stat-item"><span className="stat-icon"><Package size={19}/></span><div><strong>Care in every parcel</strong><small>From pickup to handover</small></div></div>
          <div className="stat-item"><span className="stat-icon"><Navigation size={19}/></span><div><strong>Routes that make sense</strong><small>Local coverage, made simple</small></div></div>
          <div className="stat-item"><span className="stat-icon"><ShieldCheck size={19}/></span><div><strong>Clear communication</strong><small>Know what happens next</small></div></div>
          <div className="stat-item"><span className="stat-icon"><Clock3 size={19}/></span><div><strong>Time well respected</strong><small>Service built around you</small></div></div>
        </div>
      </section>

      <section className="section section-services" id="services">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="eyebrow-line"></span> WHAT WE MOVE</div><h2>Logistics that fits<br/>the way <em>you work.</em></h2></div>
            <p>Whether it’s one parcel or a regular business run, we make the next step feel easier.</p>
          </div>
          <div className="service-grid">
            <article className="service-card service-card-featured"><div className="service-top"><span className="service-number">01 / EVERYDAY</span><span className="service-icon"><Package size={22}/></span></div><div className="service-illustration parcel-illustration"><div className="parcel-box"><span></span><i></i></div><div className="parcel-shadow"></div></div><h3>Parcel delivery</h3><p>For the packages, documents and little things that matter a lot.</p><a href="#quote" className="text-link">Send a parcel <ArrowUpRight size={16}/></a></article>
            <article className="service-card"><div className="service-top"><span className="service-number">02 / BUSINESS</span><span className="service-icon"><Truck size={22}/></span></div><div className="service-illustration business-illustration"><div className="mini-warehouse"><span></span><span></span><span></span><i></i></div><div className="mini-truck"><b></b><i></i></div></div><h3>Business logistics</h3><p>Dependable local movement for shops, sellers and growing teams.</p><a href="#contact" className="text-link">Talk business with us <ArrowUpRight size={16}/></a></article>
            <article className="service-card"><div className="service-top"><span className="service-number">03 / YOUR ROUTE</span><span className="service-icon"><MapPin size={22}/></span></div><div className="service-illustration route-illustration"><div className="route-map"><span className="map-point point-a"></span><span className="map-point point-b"></span><span className="map-point point-c"></span><svg viewBox="0 0 220 100" aria-hidden="true"><path d="M20 70 C 50 5, 95 95, 125 45 S 180 20, 200 35" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="5 7"/></svg></div></div><h3>Local route delivery</h3><p>Connecting familiar places across Tiruppur and nearby towns.</p><a href="#quote" className="text-link">Check your route <ArrowUpRight size={16}/></a></article>
          </div>
        </div>
      </section>

      <section className="quote-section" id="quote">
        <div className="container quote-layout">
          <div className="quote-copy"><div className="eyebrow eyebrow-light"><span className="eyebrow-line"></span> LET'S GET IT MOVING</div><h2>A clearer route<br/>starts <em>right here.</em></h2><p>Choose your pickup and destination to get an indicative estimate. Final charges may vary by parcel size, exact distance and service requirements.</p><div className="quote-note"><ShieldCheck size={18}/><span>No commitment. Just a useful starting point.</span></div></div>
          <div className="quote-card">
            <div className="quote-card-head"><div><span className="card-kicker">QUICK ESTIMATE</span><h3>Plan your shipment</h3></div><span className="quote-card-icon"><ArrowDownRight size={23}/></span></div>
            <form onSubmit={handleQuote} className="quote-form">
              <label>Pickup location <span className="label-required">*</span><span className="select-wrap"><MapPin size={17}/><select value={from} onChange={e => {setFrom(e.target.value);setShowQuote(false)}}>{LOCATIONS.map(l=><option key={l}>{l}</option>)}</select><ChevronDown size={15}/></span></label>
              <div className="route-connector"><span></span><i></i><span></span></div>
              <label>Delivery destination <span className="label-required">*</span><span className="select-wrap"><Navigation size={17}/><select value={to} onChange={e => {setTo(e.target.value);setShowQuote(false)}}>{LOCATIONS.map(l=><option key={l}>{l}</option>)}</select><ChevronDown size={15}/></span></label>
              <label>Approximate parcel weight <span className="optional">(kg)</span><span className="input-wrap"><Package size={17}/><input type="number" min="0.5" max="1000" step="0.5" value={weight} onChange={e=>{setWeight(e.target.value);setShowQuote(false)}} required/><span className="input-suffix">kg</span></span></label>
              {from === to && <p className="form-hint form-error">Choose two different locations for an estimate.</p>}
              <button className="button button-lime button-full" type="submit">Calculate estimate <ArrowRight size={17}/></button>
              {showQuote && estimate !== null && <div className="estimate-result" id="quote-result"><div><small>INDICATIVE ESTIMATE</small><strong>₹{estimate.toLocaleString("en-IN")}</strong><span>{from} → {to}</span></div><span className="estimate-badge"><Check size={16}/> Calculated</span><p>This demo estimate is illustrative, not a confirmed quote.</p><a href="#book" className="text-link" onClick={()=>setOrderMessage("")}>Continue to booking <ArrowRight size={15}/></a></div>}
              <p className="form-footnote"><ShieldCheck size={14}/> Your details stay in this demo on your device.</p>
            </form>
          </div>
        </div>
      </section>

      <section className="section tracking-section" id="tracking">
        <div className="container tracking-layout">
          <div className="tracking-copy"><div className="eyebrow"><span className="eyebrow-line"></span> FOLLOW THE JOURNEY</div><h2>Your parcel's next step,<br/><em>without the guesswork.</em></h2><p>Enter the tracking ID from an order created on this demo site. You can also try the sample ID shown below.</p><div className="sample-id"><span>TRY SAMPLE TRACKING ID</span><button type="button" onClick={()=>{setTrackingId("MOVE12345");setTrackingResult(null)}}>MOVE12345 <ArrowUpRight size={14}/></button></div></div>
          <div className="tracking-card"><div className="tracking-card-top"><div className="tracking-symbol"><Package size={23}/></div><div><h3>Track a shipment</h3><p>Enter your unique shipment ID below.</p></div></div><form className="tracking-form" onSubmit={handleTrack}><label className="sr-only" htmlFor="tracking-id">Tracking ID</label><input id="tracking-id" value={trackingId} onChange={e=>{setTrackingId(e.target.value);setTrackingResult(null)}} placeholder="e.g. MOV1234567"/><button className="button button-dark" type="submit">Track parcel <ArrowRight size={16}/></button></form>
            {trackingResult && <div className={`tracking-result ${trackingResult.error ? "tracking-error" : ""}`}>
              {trackingResult.error ? <><CircleHelp size={19}/><p>{trackingResult.error}</p></> : <><CheckCircle2 size={20}/><div><strong>{trackingResult.order ? trackingResult.order.status : "Shipment information"}</strong><p>{trackingResult.order ? `${trackingResult.order.from} → ${trackingResult.order.to}` : "Your sample parcel has been registered in the demo tracking flow."}</p><small>Tracking ID: {trackingResult.order?.id || trackingResult.id}</small>{trackingResult.order && <small>Booked: {trackingResult.order.createdAt}</small>}</div></>}
            </div>}
            <div className="tracking-assurance"><span><CheckCircle2 size={15}/> Simple status lookup</span><span><CheckCircle2 size={15}/> Demo order support</span></div>
          </div>
        </div>
      </section>

      <section className="section how-section" id="how-it-works">
        <div className="container"><div className="center-heading"><div className="eyebrow"><span className="eyebrow-line"></span> HOW IT WORKS <span className="eyebrow-line"></span></div><h2>Three steps. <em>One less thing to worry about.</em></h2><p>We keep the process straightforward, from the first details to the final handover.</p></div>
          <div className="steps-grid"><div className="step"><div className="step-number">01</div><div className="step-icon"><Package size={23}/></div><h3>Share the details</h3><p>Tell us where it starts, where it needs to go and what you're sending.</p><span className="step-line"></span></div><div className="step"><div className="step-number">02</div><div className="step-icon"><Truck size={23}/></div><h3>Get it moving</h3><p>Confirm the service and prepare your parcel for pickup or handover.</p><span className="step-line"></span></div><div className="step"><div className="step-number">03</div><div className="step-icon"><CheckCircle2 size={23}/></div><h3>Follow the journey</h3><p>Keep your tracking ID handy to check the order status in this demo.</p></div></div>
        </div>
      </section>

      <section className="section booking-section" id="book">
        <div className="container booking-layout">
          <div className="booking-copy"><div className="eyebrow"><span className="eyebrow-line"></span> READY WHEN YOU ARE</div><h2>Have something<br/>to <em>send?</em></h2><p>Share a few details to create a demo booking and receive a tracking ID. This prototype saves orders in your current browser only.</p><div className="booking-detail"><span><CheckCircle2 size={17}/></span><div><strong>Easy to get started</strong><small>A short form, with the details you need.</small></div></div><div className="booking-detail"><span><CheckCircle2 size={17}/></span><div><strong>Tracking ID included</strong><small>Use it to look up the demo order status.</small></div></div></div>
          <form className="booking-card" onSubmit={handleOrder}><div className="booking-card-title"><h3>Start a booking</h3><span>DEMO FORM</span></div><div className="field-grid"><label>Your name<input required minLength="2" value={order.name} onChange={e=>setOrder({...order,name:e.target.value})} placeholder="Full name"/></label><label>Mobile number<input required inputMode="numeric" maxLength="10" value={order.phone} onChange={e=>setOrder({...order,phone:e.target.value.replace(/\D/g,"")})} placeholder="10-digit number"/></label></div><label>What are you sending?<span className="select-wrap select-wrap-plain"><select value={order.item} onChange={e=>setOrder({...order,item:e.target.value})}><option>Parcel</option><option>Documents</option><option>Business goods</option><option>Other</option></select><ChevronDown size={15}/></span></label><label>Extra details <span className="optional">(optional)</span><textarea rows="3" value={order.notes} onChange={e=>setOrder({...order,notes:e.target.value})} placeholder="Parcel size, pickup preferences…"></textarea></label>{orderMessage && <div className={`order-message ${orderMessage.startsWith("Enter") ? "form-error" : ""}`} role="status">{orderMessage}</div>}<button className="button button-dark button-full" type="submit">Create demo booking <ArrowRight size={17}/></button><p className="form-footnote"><ShieldCheck size={14}/> Demo only: no real booking or notification is sent.</p></form>
        </div>
      </section>

      <section className="section about-section" id="about"><div className="container about-layout"><div className="about-stamp"><div className="stamp-ring"><span>LOCAL ROUTES</span><Truck size={38}/><span>REAL CARE</span></div><span className="stamp-star">✳</span></div><div className="about-copy"><div className="eyebrow"><span className="eyebrow-line"></span> A LITTLE ABOUT MOVE</div><h2>Local roots.<br/><em>Forward thinking.</em></h2><p>Move is a logistics brand concept built around a simple idea: deliveries should feel dependable, clear and easy to arrange. We want to connect people and businesses across Tiruppur and neighbouring towns with service that puts communication first.</p><p className="about-disclaimer">This website is a prototype. Replace this introduction with your verified company details before publishing it as a live business.</p><a href="#contact" className="button button-dark">Get in touch <ArrowRight size={17}/></a></div></div></section>

      <section className="faq-section section"><div className="container faq-layout"><div><div className="eyebrow"><span className="eyebrow-line"></span> GOOD TO KNOW</div><h2>A few quick<br/><em>answers.</em></h2><p>Have a different question? Reach out using your verified business contact details.</p></div><div className="faq-list">{[
        ["Which locations does Move cover?","This prototype includes Tiruppur Old Bus Stand, Tiruppur New Bus Stand, Kangeyam, Rayapuram, Karuvampalayam, Mannarai, Dharapuram and Coimbatore. Confirm your actual service area before accepting bookings."],
        ["Are the displayed prices final?","No. The calculator uses illustrative demo values based on the selected locations and parcel weight. Set real rates after confirming distance, weight slabs, taxes and service costs."],
        ["Does tracking show a live vehicle location?","No. It looks up demo bookings saved in this browser and one sample tracking ID. Live tracking needs a backend, real shipment status updates and, if needed, GPS integration."],
        ["Will booking send me a WhatsApp or SMS?","Not yet. This frontend does not send messages. Real notifications need a backend and a properly configured messaging provider."],
      ].map(([q,a],i)=><div className={`faq-item ${faqOpen===i?"faq-active":""}`} key={q}><button onClick={()=>setFaqOpen(faqOpen===i?-1:i)} aria-expanded={faqOpen===i}><span>{q}</span><span className="faq-toggle">{faqOpen===i?<X size={16}/>:<ArrowRight size={16}/>}</span></button>{faqOpen===i&&<p>{a}</p>}</div>)}</div></div></section>

      <section className="contact-band" id="contact"><div className="container contact-band-inner"><div><span className="contact-kicker">LET'S TALK LOGISTICS</span><h2>Make your next move a good one.</h2></div><a href="mailto:hello@move-logistics.example" className="button button-lime">Contact the team <ArrowUpRight size={17}/></a></div></section>
    </main>

    <footer className="site-footer"><div className="container footer-main"><div className="footer-brand-col"><Logo light/><p>Thoughtful local logistics, designed to keep your day moving.</p><div className="social-links"><a href="#contact" aria-label="Facebook"><Facebook size={16}/></a><a href="#contact" aria-label="Instagram"><Instagram size={16}/></a><a href="mailto:hello@move-logistics.example" aria-label="Email"><Mail size={16}/></a></div></div><div className="footer-col"><h4>EXPLORE</h4><a href="#services">Our services</a><a href="#how-it-works">How it works</a><a href="#tracking">Track shipment</a><a href="#about">About Move</a></div><div className="footer-col"><h4>POPULAR ROUTES</h4><a href="#quote">Tiruppur</a><a href="#quote">Kangeyam</a><a href="#quote">Dharapuram</a><a href="#quote">Coimbatore</a></div><div className="footer-col footer-contact"><h4>GET IN TOUCH</h4><p><MapPin size={15}/> Rayapuram, Tiruppur, Tamil Nadu</p><p><Phone size={15}/> Add your business phone</p><p><Mail size={15}/> Add your business email</p><small>Replace placeholders before publishing.</small></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Move Logistics. Prototype website.</span><span>Moving forward, together. <span className="footer-heart">✳</span></span></div></footer>
  </div>;
}

export default App;