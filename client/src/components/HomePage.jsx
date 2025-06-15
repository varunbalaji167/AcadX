// import { Link } from "react-router-dom";
// import {
//   FaExchangeAlt, FaBook, FaUniversity, FaComments,
//   FaStar, FaLeaf, FaShieldAlt, FaGlobe, FaHandsHelping
// } from "react-icons/fa";
// import Footer from "../components/Footer";

// const HomePage = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#212121]">
//       {/* Header */}
//       <header className="bg-[#1A237E] text-white py-6 px-4 md:px-8 shadow z-10">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
//           <div>
//             <h1 className="text-2xl font-extrabold tracking-wide">AcadX - IIT Indore</h1>
//             <p className="text-sm text-[#C5CAE9]">Swap smart. Live light. Share sustainably.</p>
//           </div>
//           <div className="flex gap-4">
//             <Link to="/login" className="bg-white text-[#3F51B5] px-4 py-2 rounded-lg font-medium hover:bg-[#e8f0fe] transition">Login</Link>
//             <Link to="/register" className="bg-white text-[#3F51B5] px-4 py-2 rounded-lg font-medium hover:bg-[#e8f0fe] transition">Register</Link>
//           </div>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="flex-grow max-w-6xl mx-auto py-12 px-4 space-y-20">

//         {/* Hero Section */}
//         <section className="text-center space-y-6">
//           {/* Optional: Add a student+book-sharing SVG or animated Lottie illustration here */}
//           <h2 className="text-4xl md:text-5xl font-extrabold text-[#3F51B5]">
//             Share Smarter. Waste Less. 🌱
//           </h2>
//           <p className="text-lg text-[#757575] max-w-2xl mx-auto">
//             The fastest way for IITI students to swap books, donate notes, and build a sustainable campus.
//           </p>
//           <blockquote className="italic text-xl font-semibold text-[#3F51B5] bg-[#e8f0fe] px-6 py-4 rounded-lg shadow-sm inline-block">
//             “Don’t throw it. Pass it forward.”
//           </blockquote>
//         </section>

//         {/* Info Cards */}
//         <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           <Card title="What is AcadX?">
//             <p>A campus-exclusive platform where IITI students share books, lab kits & materials. No payment. No junk. Just purpose.</p>
//           </Card>
//           <Card title="Why Use It?">
//             <ul className="space-y-3 text-[#757575]">
//               <ListItem>🎓 Verified IIT Indore students only</ListItem>
//               <ListItem>⚡ Chat instantly, swap easily</ListItem>
//               <ListItem>🌱 Reduce waste, go green</ListItem>
//               <ListItem>🤝 100% free, student-first</ListItem>
//             </ul>
//           </Card>
//         </section>

//         {/* Environmental Quote */}
//         <Quote>
//           “The greatest threat to our planet is the belief that someone else will save it.” <br /> — Robert Swan
//         </Quote>

//         {/* Features */}
//         <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           <FeatureCard icon={<FaExchangeAlt size={24} />} title="Quick Swaps" desc="Trade what you don’t need anymore." />
//           <FeatureCard icon={<FaBook size={24} />} title="Course-Specific" desc="Search by department & semester." />
//           <FeatureCard icon={<FaUniversity size={24} />} title="IITI Only" desc="Verified campus access only." />
//           <FeatureCard icon={<FaComments size={24} />} title="Instant Chat" desc="No delays. Just connect & swap." />
//           <FeatureCard icon={<FaStar size={24} />} title="Ratings" desc="Trust who you swap with." />
//           <FeatureCard icon={<FaLeaf size={24} />} title="Eco-Conscious" desc="Less buying. Less waste." />
//           <FeatureCard icon={<FaHandsHelping size={24} />} title="Peer Support" desc="Help juniors & get help." />
//           <FeatureCard icon={<FaShieldAlt size={24} />} title="Safe & Verified" desc="JWT auth & moderation built-in." />
//           <FeatureCard icon={<FaGlobe size={24} />} title="Build Culture" desc="Make sharing a part of IITI life." />
//         </section>

//         {/* Environmental Quote 2 */}
//         <Quote>
//           “We do not inherit the Earth from our ancestors, we borrow it from our children.”
//         </Quote>

//         {/* Final CTA */}
//         <section className="text-center mt-16 space-y-4">
//           <h3 className="text-2xl font-bold text-[#3F51B5]">Start Sharing Smarter Today</h3>
//           <p className="text-[#616161]">Join hundreds of students making campus life simpler, cleaner, and smarter.</p>
//           <Link
//             to="/register"
//             className="inline-block bg-[#3F51B5] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#303f9f] transition"
//           >
//             Sign Up — It's Free!
//           </Link>
//         </section>

//       </main>

//       {/* Footer */}
//       <Footer className="mt-auto" />
//     </div>
//   );
// };

// // --- Reusable Components ---
// const Card = ({ title, children }) => (
//   <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition space-y-4">
//     <h3 className="text-2xl font-bold text-[#3F51B5]">{title}</h3>
//     <div className="text-[#212121] text-base">{children}</div>
//   </div>
// );

// const FeatureCard = ({ icon, title, desc }) => (
//   <div className="bg-white p-6 rounded-xl shadow text-center space-y-3 hover:shadow-lg transition">
//     <div className="text-[#3F51B5] mx-auto">{icon}</div>
//     <h4 className="text-xl font-semibold text-[#3F51B5]">{title}</h4>
//     <p className="text-[#757575] text-sm">{desc}</p>
//   </div>
// );

// const ListItem = ({ children }) => (
//   <li className="flex items-start gap-2">
//     <span className="text-[#3F51B5] font-bold">•</span>
//     <span>{children}</span>
//   </li>
// );

// const Quote = ({ children }) => (
//   <blockquote className="text-center text-lg italic text-[#3F51B5] bg-[#e8f0fe] px-6 py-4 rounded-lg shadow-sm">
//     {children}
//   </blockquote>
// );

// export default HomePage;

import { Link } from "react-router-dom";
import {
  FaExchangeAlt, FaBook, FaUniversity, FaComments,
  FaStar, FaLeaf, FaShieldAlt, FaGlobe, FaHandsHelping
} from "react-icons/fa";
import Footer from "../components/Footer";
import Lottie from "lottie-react";
import shareAnim from "../assets/animations/books.json";
import greenCampusAnim from "../assets/animations/clg.json";

const HomePage = () => (
  <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#212121]">
    {/* Header */}
    <header className="bg-[#1A237E] text-white py-6 px-4 md:px-8 shadow z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-wide">AcadX - IITI Culture Hub</h1>
          <p className="text-sm text-[#C5CAE9]">Our culture: Share, reuse, uplift.</p>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="bg-white text-[#3F51B5] px-4 py-2 rounded-lg font-medium hover:bg-[#e8f0fe] transition">Login</Link>
          <Link to="/register" className="bg-white text-[#3F51B5] px-4 py-2 rounded-lg font-medium hover:bg-[#e8f0fe] transition">Register</Link>
        </div>
      </div>
    </header>

    {/* Main Content */}
    <main className="flex-grow max-w-6xl mx-auto py-12 px-4 space-y-20">

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 items-center gap-12">
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#3F51B5] leading-tight">
            From one to another — the IITI way.
          </h2>
          <p className="text-lg text-[#757575] max-w-xl">
            The fastest way for IITI students to swap books, donate notes, and build a sustainable campus.
          </p>
          <Quote>
            “What we throw today, they’ll pay for tomorrow.”
          </Quote>
        </div>
        <div className="w-full max-w-md mx-auto">
          <Lottie animationData={shareAnim} loop autoplay />
        </div>
      </section>

      {/* Info Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Card title="What is AcadX?" icon={<FaUniversity size={24} />}>
          A verified IITI platform where students share books, tools, lab kits & notes—ensuring nothing goes unused.
        </Card>
        <Card title="Why Use It?" icon={<FaLeaf size={24} />}>
          <ul className="space-y-3 text-[#757575]">
            <ListItem>🎓 Seniors leave legacy—resources for juniors</ListItem>
            <ListItem>⚡ Fast in-app chat for quick swaps</ListItem>
            <ListItem>🌿 Reduce clutter, offset carbon</ListItem>
            <ListItem>🤝 Build trust within IITI community</ListItem>
          </ul>
        </Card>
      </section>

      {/* Animation + Culture Quote */}
      <section className="grid md:grid-cols-2 items-center gap-12">
        <div className="w-full max-w-md mx-auto">
          <Lottie animationData={greenCampusAnim} loop autoplay />
        </div>
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3F51B5]">
            Green Campus Starts With You
          </h2>
          <p className="text-[#616161] text-lg max-w-lg">
            Make sustainability a part of IITI’s everyday life—where giving forward becomes the norm.
          </p>
          <Quote>
            “Be the senior who passes it forward — not to the bin, but to a junior who needs it.”
          </Quote>
        </div>
      </section>

      {/* Environmental Quote */}
      <Quote>
        “The greatest threat to our planet is the belief that someone else will save it.”<br /> — Robert Swan
      </Quote>

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <FeatureCard icon={<FaExchangeAlt size={24} />} title="Quick Swaps" desc="Trade what you don’t need anymore." />
        <FeatureCard icon={<FaBook size={24} />} title="Course-Specific" desc="Search by department & semester." />
        <FeatureCard icon={<FaUniversity size={24} />} title="IITI Only" desc="Verified campus access only." />
        <FeatureCard icon={<FaComments size={24} />} title="Instant Chat" desc="No delays. Just connect & swap." />
        <FeatureCard icon={<FaStar size={24} />} title="Ratings" desc="Trust who you swap with." />
        <FeatureCard icon={<FaLeaf size={24} />} title="Eco-Conscious" desc="Less buying. Less waste." />
        <FeatureCard icon={<FaHandsHelping size={24} />} title="Peer Support" desc="Help juniors & get help." />
        <FeatureCard icon={<FaShieldAlt size={24} />} title="Safe & Verified" desc="JWT auth & moderation built-in." />
        <FeatureCard icon={<FaGlobe size={24} />} title="Build Culture" desc="Make sharing a part of IITI life." />
      </section>

      {/* Cultural Quote */}
      <Quote>
        “Swap smart. Live light. Share sustainably.”
      </Quote>

      {/* Final CTA */}
      <section className="text-center mt-16 space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold text-[#3F51B5]">Carry the Culture Forward</h3>
        <p className="text-[#616161] text-lg">Join the wave of sharing that defines IITI life.</p>
        <Link to="/register" className="inline-block bg-[#3F51B5] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#303f9f] transition">
          Sign Up — It's Free!
        </Link>
      </section>
    </main>

    {/* Footer */}
    <Footer className="mt-auto" />
  </div>
);

// --- Reusable Components ---

const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition space-y-4">
    <h3 className="text-2xl font-bold text-[#3F51B5]">{title}</h3>
    <div className="text-[#212121] text-base">{children}</div>
  </div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center space-y-3 hover:shadow-lg transition">
    <div className="text-[#3F51B5] mx-auto">{icon}</div>
    <h4 className="text-xl font-semibold text-[#3F51B5]">{title}</h4>
    <p className="text-[#757575] text-sm">{desc}</p>
  </div>
);

const ListItem = ({ children }) => (
  <li className="flex items-start gap-2">
    <span className="text-[#3F51B5] font-bold">•</span>
    <span>{children}</span>
  </li>
);

const Quote = ({ children }) => (
  <blockquote className="text-center text-lg md:text-xl italic text-[#3F51B5] bg-[#e8f0fe] px-6 py-4 rounded-lg shadow-sm max-w-3xl mx-auto">
    {children}
  </blockquote>
);

export default HomePage;