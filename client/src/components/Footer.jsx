import { FaTools, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1A237E] text-white text-sm px-4 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        {/* Branding & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="font-bold text-white text-lg">AcadX</span>
          <span className="flex items-center gap-1 text-[#FF7043] text-xs sm:text-sm">
            <FaTools />
            <em>In active development</em>
          </span>
        </div>

        {/* Contact & Social */}
        <div className="flex items-center gap-4 justify-center sm:justify-end flex-wrap text-[#E0E0E0]">
          <a
            href="mailto:support@acadx.com"
            className="flex items-center gap-1 hover:text-white transition"
          >
            <FaEnvelope className="text-[#FF7043]" />
            Email
          </a>
          <a
            href="https://github.com/varunbalaji167"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition"
          >
            <FaGithub className="text-[#FF7043]" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/marneni-varun-balaji-9301a22b2/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition"
          >
            <FaLinkedin className="text-[#FF7043]" />
            LinkedIn
          </a>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="border-t border-[#303F9F] mt-3 pt-2 text-center text-xs text-[#B0BEC5]">
        &copy; {new Date().getFullYear()} <span className="font-medium">AcadX</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;