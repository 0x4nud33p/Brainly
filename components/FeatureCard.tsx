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
      className="p-8 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 dark:border-slate-700"
    >
      <div className="mb-6 p-4 bg-slate-200 dark:bg-slate-700 rounded-2xl inline-flex group-hover:bg-slate-300 dark:group-hover:bg-slate-600 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-md leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
