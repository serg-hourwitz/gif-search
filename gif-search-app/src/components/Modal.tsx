import { motion, AnimatePresence } from 'framer-motion';


interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  backdrop?: boolean;
}

export default function Modal({
  open,
  onClose,
  children,
  backdrop = true,
}: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center ${
            backdrop ? 'bg-black/50' : ''
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg p-4 max-w-full"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
