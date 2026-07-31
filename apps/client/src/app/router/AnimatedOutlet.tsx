import { memo, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AnimatedOutletProps {
  children: ReactNode;
}

export const AnimatedOutlet = memo(function AnimatedOutlet({
  children,
}: AnimatedOutletProps) {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
});
