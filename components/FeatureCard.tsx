import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
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

export default FeatureCard;
