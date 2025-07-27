import React, { useState, useEffect } from 'react';
import Button from "@/components/ui/button/Button";
import { useLocale } from "@/context/LocaleContext";
import { useModal } from '@/hooks/useModal';
import Label from "@/components/form/Label";
import { Modal } from "@/components/ui/modal";
import { useRouter } from 'next/navigation';
import { Product } from '@/types/Product';
import { useProducts } from '@/hooks/useProducts';
import FileInput from '@/components/form/input/FileInput';

interface Props {
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}


const AddOrEditProduct: React.FC<Props> = ({ product = null, isOpen, onClose, onSuccess }) => {
  const { messages, locale } = useLocale();
  const router = useRouter();
  // const { openModal, closeModal} = useModal();
  const { add, update, adding, updating, error } = useProducts();

  const isEditMode = !!product;

  const [form, setForm] = useState({
    category_name: "",
    product_name: "",
    product_image: "",
    product_description: ""
  });


  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && product) {
      setForm(
        {
          category_name: product.category_name ?? "",
          product_name: product.product_name ?? "",
          product_image: product.product_image ?? "",
          product_description: product.product_description ?? ""
        }
      );
    } else {
      setForm({ category_name: "", product_name: "", product_image: "", product_description: "" });
    }
  }, [product, isEditMode]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = isEditMode
      ? await update(product?._id, form)
      : await add(form);

    if (result) {
      const messageKey = isEditMode
        ? "product_updated_successfully"
        : "product_created_successfully";
      setSuccessMessage(messages[messageKey]);

      setTimeout(() => {
        onClose();
        onSuccess();
      }, 500);
    }
  };
  const isRtl = locale === "ar";


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[584px] p-8 lg:p-12"
    >
      <form onSubmit={handleSubmit}>
        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90 text-center">
          {isEditMode
            ? messages["edit_product"] || "Edit Product"
            : messages["add_original_product_title"] || "Add Productt"}
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
                {messages["product_name"] || "Product Name"}
              </Label>
              <input
                type="text"
                name="product_name"
                placeholder={messages["product_name_placeholder"] || "Enter product name"}
                value={form.product_name}
                onChange={(e) => setForm({ ...form, product_name: e.target.value })}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            <div>
              <Label className="mb-1 block">
                {messages["category_name"] || "Category Name"}
              </Label>
              <input
                type="text"
                name="category_name"
                placeholder={messages["category_name_placeholder"] || "Enter category name"}
                value={form.category_name}
                onChange={(e) => setForm({ ...form, category_name: e.target.value })}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            <div>
              <Label>{messages["product_image"] || "Product Image"}</Label>
              <FileInput
                onChange={(e) => setForm({ ...form, product_image: e.target.value })}
                className={isRtl
                  ? "file:ml-4 file:mr-auto text-right"
                  : "file:mr-4 file:ml-auto text-left"
                } />
            </div>
            <div>
              <Label className="mb-1 block">
                {messages["product_description"] || "Product Description"}
              </Label>
              <textarea
                placeholder={messages["product_description_placeholder"] || "Enter product description"}
                value={form.product_description}
                onChange={(e) => setForm({ ...form, product_description: e.target.value })}
                rows={6}
                className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-white text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10"
              ></textarea>
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

export default AddOrEditProduct;
