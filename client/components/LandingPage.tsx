import { motion } from "framer-motion";
import {
  ArrowRight,
  Bookmark,
  Clock,
  Search,
  TagIcon,
  Bell,
  Share,
  Twitter,
  Facebook,
  Instagram,
  Github,
} from "lucide-react";

// Animation configurations
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const LandingPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center px-6">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center py-20">
        <motion.div initial="initial" animate="animate" variants={stagger}>
          <motion.span
            {...fadeInUp}
            className="mb-4 inline-block bg-indigo-100 text-indigo-600 text-sm font-medium px-4 py-1.5 rounded-full"
          >
            Organize your digital life
          </motion.span>

          <motion.h1
            {...fadeInUp}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Save links, <br />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              organize thoughts
            </span>
          </motion.h1>

          <motion.p
            {...fadeInUp}
            className="text-lg text-gray-600 mb-8 max-w-xl"
          >
            Brainly helps you save, organize, and revisit all your important
            links in one place. The smart way to bookmark.
          </motion.p>

          <motion.div {...fadeInUp} className="flex flex-col sm:flex-row gap-4">
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center hover:bg-indigo-700 transition-transform transform hover:-translate-y-1 shadow-lg hover:shadow-indigo-200">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-transform transform hover:-translate-y-1">
              How It Works
            </button>
          </motion.div>

          <motion.div {...fadeInUp} className="mt-12 grid grid-cols-3 gap-8">
            {[
              { value: "10k+", label: "Users" },
              { value: "5M+", label: "Links Saved" },
              { value: "4.8/5", label: "User Rating" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold text-indigo-600">
                  {item.value}
                </p>
                <p className="text-gray-500 text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center relative"
        >
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-between space-y-6 transform hover:scale-[1.02] transition-transform">
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 h-8 w-full rounded-lg animate-pulse"></div>
              <div className="bg-indigo-50 h-6 w-3/4 rounded-lg"></div>
              <div className="bg-indigo-50 h-6 w-5/6 rounded-lg"></div>
            </div>
            <div className="flex justify-between text-sm text-gray-500 pt-6 border-t border-gray-100">
              {["Videos", "Articles", "Watch Later"].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 hover:text-indigo-600 transition-colors"
                >
                  <Bookmark className="h-4 w-4" /> {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div
      {...fadeInUp}
      className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group hover:border-indigo-100 border-2 border-white"
    >
      <div className="mb-6 p-4 bg-indigo-100 rounded-2xl inline-flex group-hover:bg-indigo-200 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-md leading-relaxed">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Bookmark className="w-8 h-8 text-indigo-600" />,
      title: "Smart Bookmarks",
      description:
        "Automatic categorization with AI-powered link analysis and rich previews.",
    },
    // ... other features
  ];

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <motion.h2
          {...fadeInUp}
          className="text-4xl font-bold mb-4 text-gray-900"
        >
          Supercharge Your Productivity
        </motion.h2>
        <motion.p {...fadeInUp} className="text-gray-600 text-lg">
          Designed for focus, built for modern workflows
        </motion.p>
      </div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={stagger}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 font-bold text-2xl mb-6">
            <Bookmark className="w-6 h-6 text-indigo-400" />
            <span className="text-white">Brainly</span>
          </div>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Transform how you organize digital content with AI-powered
            bookmarking.
          </p>
          <div className="flex gap-5">
            {[Twitter, Facebook, Instagram, Github].map((Icon, i) => (
              <motion.a
                {...fadeInUp}
                key={i}
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <Icon className="h-6 w-6" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {[
          {
            title: "Product",
            links: ["Features", "Pricing", "Extension", "Mobile App"],
          },
          {
            title: "Resources",
            links: ["Blog", "Help Center", "Tutorials", "API Docs"],
          },
          { title: "Company", links: ["About", "Careers", "Privacy", "Terms"] },
        ].map((section, i) => (
          <motion.div {...fadeInUp} key={i}>
            <h3 className="text-white font-semibold mb-6 text-lg">
              {section.title}
            </h3>
            <ul className="space-y-4">
              {section.links.map((link, j) => (
                <li key={j}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        {...fadeInUp}
        className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400"
      >
        <p className="mb-4 md:mb-0">© 2025 Brainly. All rights reserved.</p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Cookies"].map((item, i) => (
            <a
              key={i}
              href="#"
              className="hover:text-indigo-400 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
};

export default LandingPage;
