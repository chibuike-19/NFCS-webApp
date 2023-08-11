import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";

export const Loader = () => {
  return (
    <motion.div
      initial={{ scale: 1.0, opacity: 0.25 }}
      animate={{ scale: 0.9, opacity: 0.75 }}
      transition={{ yoyo: Infinity, duration: 0.5, ease: "easeIn" }}
      
    >
      <FiLoader size={40} />
    </motion.div>
  );
};
