import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
          {/* Address Section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Address</h4>
            <p className="mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-[#F96176]" />
              Chandigarh,India
            </p>
            <p className="mb-2 flex items-center">
              <FaPhoneAlt className="mr-2 text-[#F96176]" />
              (+91)8960290289
            </p>
            <p className="mb-2 flex items-center">
              <FaEnvelope className="mr-2 text-[#F96176]" />
              atult8556@gmail.com
            </p>
          </div>
          {/* Quick links Section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Contact us
                </a>
              </li>
            </ul>
          </div>
          {/* Services Section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Our Terms</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
          {/* Newsletter Section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Reach Us</h4>
            <p className="text-gray-300 mb-4">
              Stay updated with our latest services and offers.
            </p>
            <div className="relative max-w-xs">
              <div className="flex space-x-4 mt-4">
                <a
                  href="#"
                  className="text-[#F96176] hover:text-[#F96176] rounded bg-white py-2 px-2"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="text-[#F96176] hover:text-[#F96176] rounded bg-white py-2 px-2"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="text-[#F96176] hover:text-[#F96176] rounded bg-white py-2 px-2"
                >
                  <FaYoutube />
                </a>
                <a
                  href="#"
                  className="text-[#F96176] hover:text-[#F96176] rounded bg-white py-2 px-2"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center text-sm">
            <p className="text-gray-400">
              &copy;{" "}
              <a href="#" className="hover:underline">
                OneShop - A 10 min Delivery
              </a>
              , All Right Reserved.
            </p>
            <p className="text-gray-400">
              Designed by{" "}
              <a
                href="https://www.mylexinfotech.com/"
                className="hover:underline"
              >
                Kaju
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
