import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { User } from "../../types/User";
import { useLocale } from "@/context/LocaleContext";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSave: (updatedUser: User) => void;
  user: User; // ← نمرر المستخدم هنا
}

export const EditUserModal = ({
  isOpen,
  onClose,
  handleSave,
  user,
}: EditUserModalProps) => {
  const { messages } = useLocale();

  const [formData, setFormData] = useState<User>(user);

  // Sync with passed user when modal opens
  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave(formData);
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {messages["edit_profile_modal_title"]}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            {messages["edit_profile_modal_description"]}
          </p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="custom-scrollbar h-[250px] overflow-y-auto px-2 pb-3">
            <div className="mt-4">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                {messages["edit_profile_modal_sub_title"]}
              </h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>{messages["name"]}</Label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </div>
                <div>
                  <Label>{messages["role"]}</Label>
                  <Input
                    type="text"
                    value={formData.role}
                    readOnly
                    onChange={(e) => handleChange("role", e.target.value)}
                  />
                </div>
                <div>
                  <Label>{messages["email"]}</Label>
                  <Input
                    type="text"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label>{messages["phone"]}</Label>
                  <Input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </div>

              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={onClose}>
              {messages["edit_profile_modal_cancel"]}
            </Button>
            <Button size="sm" >
              {messages["edit_profile_modal_save"]}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
