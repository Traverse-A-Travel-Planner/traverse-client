import React from "react";
import "./Footer.css";
import paymentMethod from "./paymentMethod.svg"
import { Divider, Typography } from "@arco-design/web-react";

const url = "";

const Footer = () => {
  return (
    <footer className="footer-distributed" id="traverse-footer">
      <div className="footer-inside">
        <div className="footer-center">
          <div className="footer-center-wrapper">
            <div className="newsletter">
              <Typography.Text className="mt-0">Newsletter</Typography.Text>
                <Typography.Text 
                style={{fontSize: 14}}
                type="secondary">
                  Join our newsletter for more awesome places to visit on your next trip
                </Typography.Text>
                <div className="input-wrapper">
                    <input type="text" placeholder="Email" />
                    <button type="submit"><i className="bi bi-send"></i></button>
                </div>
            </div>

            <div>
              <span>Home</span>
                <ul>
                    <li><a href="/">Tarverse</a></li>
                    <li><a href="/favourites">Favourites</a></li>
                    <li><a href="/shareTrip">Share Trip</a></li>
                    <li><a href="/contribute">Contribute</a></li>
                </ul>
            </div>

            <div>
              <span>Profile</span>
                <ul>
                    <li><a href="/dashboard">Dashbaord</a></li>
                    <li><a href="/changePassword">Change Password</a></li>
                    <li><a href="/reviews">My Reviews</a></li>
                </ul>
            </div>
          </div>
        </div>

        <div className="footer-right">
          <span>About us</span>
          <p className="footer-company-about">
          Welcome to Traverse! 
          We are dedicated to providing seamless and delightful travel experiences. 
          Discover hidden gems and embark on stress-free exploration with our trusted travel companion. 
          Join us today and unlock the secrets to unforgettable and hassle-free journeys.
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
      <Divider />
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
          <p>+977 9827314543</p>
        </div>
        <div>
          <button data-toggle="tooltip" title="E-mail">
            <i className="bi bi-envelope"></i>
          </button>
          <p>
            <a href="mailto:contact@traverse.com.np">contact@traverse.com.np</a>
          </p>
        </div>
        <div>
          <p className="footer-company-name">Traverse &copy; 2023</p>
        </div>
        <div className="payment-method">
          <img src={paymentMethod} alt="payment method" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
