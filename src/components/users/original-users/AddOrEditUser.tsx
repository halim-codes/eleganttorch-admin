import React, { useState, useEffect } from 'react';
import Button from "@/components/ui/button/Button";
import { useLocale } from "@/context/LocaleContext";
import { useModal } from '@/hooks/useModal';
import Label from "@/components/form/Label";
import { Modal } from "@/components/ui/modal";
import { useRouter } from 'next/navigation';
import { User } from '@/types/User';
import { useUsers } from '@/hooks/useUsers';

interface Props {
  user?: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}


const AddOrEditUser: React.FC<Props> = ({ user = null, isOpen, onClose, onSuccess }) => {
  const { messages } = useLocale();
  const router = useRouter();
  // const { openModal, closeModal} = useModal();
  const { add, update, adding, updating, error } = useUsers();

  const isEditMode = !!user;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: ""
  });


  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && user) {
      setForm(
        { name: user.name ?? "",
         phone: user.phone ?? "",
         email: user.email ?? "",
         password: user.password ?? ""
        }
      );
    } else {
      setForm({ name: "", phone: "", email: "", password: ""});
    }
  }, [user, isEditMode]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = isEditMode
      ? await update(user?._id, form)
      : await add(form);

    if (result) {
      const messageKey = isEditMode
        ? "user_updated_successfully"
        : "user_created_successfully";
      setSuccessMessage(messages[messageKey]);

      setTimeout(() => {
        onClose();
        onSuccess();
      }, 500);
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
            ? messages["edit_user"] || "Edit User"
            : messages["add_user_title"] || "Add User"}
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
                {messages["user_name"] || "Name"}
              </Label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            <div>
              <Label className="mb-1 block">
                {messages["user_phone"] || "Phone"}
              </Label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            <div>
              <Label className="mb-1 block">
                {messages["user_email"] || "Email"}
              </Label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
                {isEditMode
            ? ""
            :<div>
              <Label className="mb-1 block">
                {messages["user_password"] || "Password"}
              </Label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            }
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

export default AddOrEditUser;
