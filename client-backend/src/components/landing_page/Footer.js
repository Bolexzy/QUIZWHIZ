import React from 'react';
import Data from './FormData';

const Footer = () => {
  const [formData, setFormData] = React.useState(Data);
  const [email, setEmail] = React.useState('JohnDoe@gmail.com');

  const handleInputChange = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Create a new entry in the JSON object
    const newEntry = { email };
    // Add the new entry to the existing form data
    setFormData(prevFormData => [
      ...prevFormData,
      { id: prevFormData[prevFormData.length - 1].id + 1, email: newEntry },
    ]);
    // Clear the email input
    setEmail('');
  };

//   console.log(formData);

  return (
    <footer
      className="w-100 text-center pb-5 pt-5"
      style={({ backgroundColor: '#212121' }, { color: 'azure' })}
    >
      {/* <!-- footer links --> */}
      <div className="container mb-2">
        <ul className="list-inline mb-0 text-center">
          <li className="list-inline-item" style={{ fontSize: '.9rem' }}>
            Get connected with us on social networks!
          </li>
          <li className="list-inline-item">
            <a href="/">
              <span className="fa-brands fa-twitter"></span>
            </a>
          </li>

          <li className="list-inline-item">
            <a href="/">
              <span className="fa-brands fa-linkedin-in"></span>
            </a>
          </li>

          <li className="list-inline-item">
            <a href="/">
              <span className="fa-solid fa-envelope"></span>
            </a>
          </li>

          <li className="list-inline-item">
            <a href="/">
              <span className="fa-brands fa-instagram"></span>
            </a>
          </li>
        </ul>
      </div>

      {/* <!-- footer form --> */}

      <div className="container w-75 mb-4" style={{ marginTop: '20px' }}>
        <form action="" onSubmit={handleSubmit}>
          <h2 className="fs-5">SUBSCRIBE TO OUR NEWSLETTER</h2>
          <p
            className="mt-0"
            style={({ fontSize: '.6rem' }, { fontStyle: 'italic' })}
          >
            We'll never share your email with anyone else
          </p>
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              id="user_mail_1"
              placeholder="Enter your email"
              value={email}
              onChange={handleInputChange}
            />

            <span className="input-group-btn">
              <button className="btn letter-btn" type="submit">
                Subscribe Now
              </button>
            </span>
          </div>
        </form>
      </div>

      <p className="fs-6 fw-light">Copyright © 2023 Quizwhiz</p>
    </footer>
  );
};

export default Footer;
