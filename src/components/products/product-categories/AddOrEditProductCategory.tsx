import React, { useState, useEffect } from 'react';
import Button from "@/components/ui/button/Button";
import { useLocale } from "@/context/LocaleContext";
import { useModal } from '@/hooks/useModal';
import Label from "@/components/form/Label";
import { Modal } from "@/components/ui/modal";
import { useCategories } from '@/hooks/useCategories';
import { useRouter } from 'next/navigation';
import { Category } from '@/types/Category';

interface Props {
  category?: Category | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}


const AddOrEditProductCategory: React.FC<Props> = ({ category = null, isOpen, onClose ,onSuccess}) => {
  const { messages } = useLocale();
  const router = useRouter();
  // const { openModal, closeModal} = useModal();
  const { add, update, adding, updating, error } = useCategories();

  const isEditMode = !!category;

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && category) {
      setForm({ name: category.name ?? "", description: category.description ?? "" });
    } else {
      setForm({ name: "", description: "" });
    }
  }, [category, isEditMode]);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const result = isEditMode
    ? await update(category?._id, form)
    : await add(form);

  if (result) {
    const messageKey = isEditMode
      ? "categories_updated_successfully"
      : "categories_created_successfully";
    setSuccessMessage(messages[messageKey]);

    setTimeout(() => {
      onClose();
      onSuccess(); 
    }, 1000);
  }
};


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[584px] p-8 lg:p-12"
    >
      <form onSubmit={handleSubmit}>
        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90 text-center">
          {isEditMode
            ? messages["edit_product_category"] || "Edit Product Category"
            : messages["add_product_title"] || "Add Product Category"}
        </h4>

        {error && (
          <p className="text-red-500">{messages["error"] || error}</p>
        )}

        {successMessage && (
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            {successMessage}
          </p>
        )}

        <div className="grid grid-cols-1 gap-y-6">
          <div className="space-y-4">
            <div>
              <Label className="mb-1 block">
                {messages["product_name_label"] || "Name"}
              </Label>
              <input
                type="text"
                placeholder={messages["product_name_placeholder"] || "Product Name"}
                className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                required
                value={form.name}
                name="name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <Label className="mb-1 block">
                {messages["product_description_name_label"] || "Description"}
              </Label>
              <textarea
                placeholder={messages["product_description_placeholder"] || "Enter product description"}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={6}
                className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden"
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
            className={isEditMode ? "bg-orange-400 hover:bg-orange-500 text-white shadow-sm transition-all duration-200 rounded-md focus:ring-2 focus:ring-orange-300" : ""}
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

export default AddOrEditProductCategory;
