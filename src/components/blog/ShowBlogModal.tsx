import { Blog } from "@/types/Blog";
import { Modal } from "@/components/ui/modal";
import { motion, AnimatePresence } from "framer-motion";
import { DownloadIcon } from "@/icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  blog: Blog | null;
}

export default function ShowBlogModal({ isOpen, onClose, blog }: Props) {
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && blog && (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl p-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full bg-white dark:bg-gray-900 shadow-xl"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 relative">
              <div className="flex items-center justify-between">

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl font-bold text-blue-600 dark:text-blue-400 mx-auto"
                >
                  {blog.title}
                </motion.h2>
                
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDownloadPDF}
                  className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all absolute left-6"
                >
                  <DownloadIcon className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-1 p-6 overflow-y-auto max-h-[70vh] custom-scrollbar"
            >
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                  className="text-gray-700 dark:text-gray-300"
                />
              </div>
            </motion.div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}