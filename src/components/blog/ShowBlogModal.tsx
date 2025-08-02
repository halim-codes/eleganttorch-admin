import { Blog } from "@/types/Blog";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  blog: Blog | null;
}

export default function ShowBlogModal({ isOpen, onClose, blog }: Props) {
  if (!isOpen || !blog) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[680px] px-6 py-10 lg:p-12">
      <div className="space-y-8 text-gray-800 dark:text-white">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center leading-tight">
          {blog.title}
        </h2>

        {/* Divider */}
        <div className="w-20 h-1 mx-auto bg-blue-500 rounded-full" />

        {/* Description */}
        <div
          className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert leading-relaxed max-h-[400px] overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* Footer */}
        <div className="flex justify-center pt-4">
          <Button size="sm" variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
