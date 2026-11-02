'use client';
import { MotionConfig, motion } from 'framer-motion';

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
};

export function FadeIn({ children, className }: FadeInProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={className}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
