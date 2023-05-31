import React from "react";
import "./Footer.css";
import paymentMethod from "./paymentMethod.svg"

const url = "";

const Footer = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-inside">
        <div className="footer-center">
          <div className="footer-center-wrapper">
            <div>
              <span>Policy</span>
              <ul>
                <li>Home</li>
                <li>Blog</li>
                <li>Pricing</li>
                <li>About</li>
                <li>Faq</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <span>Policy</span>
              <ul>
                <li>Return Policy</li>
                <li>Terms Of use</li>
                <li>Security</li>
                <li>Privacy</li>
                <li>Sitemap</li>
                <li>Faq</li>
              </ul>
            </div>
            <div>
              <span>Policy</span>
              <ul>
                <li>Return Policy</li>
                <li>Terms Of use</li>
                <li>Security</li>
                <li>Privacy</li>
                <li>Sitemap</li>
                <li>Faq</li>
              </ul>
            </div>
            <div>
              <span>Help</span>
              <ul>
                <li>Return Policy</li>
                <li>Terms Of use</li>
                <li>Security</li>
                <li>Privacy</li>
                <li>Sitemap</li>
                <li>Faq</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            Traverse is a platform where you can plan for your next tour with
            ease. We provide a platform where you can select places for your
            tour, hire guide in that places, compare prices of hotels,
            accommodation and do many more. Our AI recommends you the best
            places on the basis of your activities. We also help you to predict
            the weather conditons for your next trip through our AI models that
            is trained with huge data sets.
          </p>
          <div className="footer-icons">
            <a href={url} data-toggle="tooltip" title="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href={url} data-toggle="tooltip" title="Twitter">
              <i className="bi bi-twitter"></i>
            </a>
            <a href={url} data-toggle="tooltip" title="Linkedin">
              <i className="bi bi-linkedin"></i>
            </a>
            <a href={url} data-toggle="tooltip" title="Github">
              <i className="bi bi-github"></i>
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <div>
          <button data-toggle="tooltip" title="Location">
            <i className="bi bi-geo-alt"></i>
          </button>
          <p>
            <span>Thapathali</span> Kathmandu, Nepal
          </p>
        </div>
        <div>
          <button data-toggle="tooltip" title="Contact">
            <i className="bi bi-telephone"></i>
          </button>
          <p>+977 9125485884</p>
        </div>
        <div>
          <button data-toggle="tooltip" title="E-mail">
            <i className="bi bi-envelope"></i>
          </button>
          <p>
            <a href="mailto:support@company.com">contact@traverse.com.np</a>
          </p>
        </div>
        <div>
          <p className="footer-company-name">Traverse &copy; 2022</p>
        </div>
        <div className="payment-method">
          <img src={paymentMethod} alt="payment method" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
