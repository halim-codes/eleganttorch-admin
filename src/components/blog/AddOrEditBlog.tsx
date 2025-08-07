import React, { useState, useEffect } from 'react';
import Button from "@/components/ui/button/Button";
import { useLocale } from "@/context/LocaleContext";
import Label from "@/components/form/Label";
import { Modal } from "@/components/ui/modal";
import { useRouter } from 'next/navigation';
import { Blog } from '@/types/Blog';
import { useBlog } from '@/hooks/useBlog';
import "../../style/blogStyle.css";
import AdvancedEditor from './AdvancedEditor';


interface Props {
  blog?: Blog | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}


const AddOrEditBlog: React.FC<Props> = ({ blog = null, isOpen, onClose, onSuccess }) => {
  const { messages, locale } = useLocale();
  const isRtl = locale === "ar";
  const router = useRouter();
  // const { openModal, closeModal} = useModal();
  const { add, update, adding, updating, error } = useBlog();

  const isEditMode = !!blog;

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && blog) {
      setForm({ title: blog.title ?? "", description: blog.description ?? "" });
    } else {
      setForm({ title: "", description: "" });
    }
  }, [blog, isEditMode]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = isEditMode
      ? await update(blog?._id, form)
      : await add(form);

    if (result) {
      const messageKey = isEditMode
        ? "blog_updated_successfully"
        : "blog_created_successfully";
      setSuccessMessage(messages[messageKey]);

      setTimeout(() => {
        onClose();
        onSuccess();
      }, 500);
    }
  };


 return (
    <Modal isOpen={isOpen} onClose={onClose}  className="max-w-[584px] p-8 lg:p-12 mt-16 mp-16">
      <form onSubmit={handleSubmit}>
        <h4 className="mb-6 text-lg font-medium text-center text-gray-800 dark:text-white/90">
          {isEditMode ? messages["edit_blog"] || "Edit Blog" : messages["add_blog_title"] || "Add Blog"}
        </h4>

        {error && <p className="text-red-500">{messages["error"] || error}</p>}
        {successMessage && <p className="mt-2 text-sm text-green-600 dark:text-green-400">{successMessage}</p>}

        <div className="grid grid-cols-1 gap-y-6">
          <div className="space-y-4">
            <div>
              <Label className="mb-1 block">{messages["blog_name_label"] || "Title"}</Label>
              <input
                type="text"
                placeholder={messages["blog_name_placeholder"] || "Enter blog title"}
                className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                required
                value={form.title}
                name="title"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <Label className="mb-1 block">{messages["blog_description_label"] || "Description"}</Label>
            <div
              dir={isRtl ? "rtl" : "ltr"}
              className={`ck-editor__wrapper w-full border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 ${isRtl ? "text-right" : "text-left"}`}
            >
              <AdvancedEditor
                value={form.description}
                onChange={(val) => setForm({ ...form, description: val })}
                locale={locale}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end w-full gap-3 mt-8">
          <Button size="sm" variant="outline" onClick={onClose}>
            {messages["close"] || "Close"}
          </Button>
          <Button
            disabled={adding || updating}
            size="sm"
            type="submit"
            className={isEditMode ? "bg-primary-400 hover:bg-primary-500 text-white shadow-sm transition-all duration-200 rounded-md focus:ring-2 focus:ring-primary-300" : ""}
          >
            {(adding || updating)
              ? messages["submitting"] || "Submitting..."
              : isEditMode
                ? messages["update"] || "Update"
                : messages["submit"] || "Submit"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddOrEditBlog;
