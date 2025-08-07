import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { AboutUs } from "@/types/AboutUs";
import { useLocale } from "@/context/LocaleContext";
import Input from "@/components/form/input/InputField";
import { useAboutUs } from "@/hooks/useAboutUs";
import Textarea from "@/components/form/input/TextArea";

interface EditAboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSave: () => void;
  data: AboutUs;
}

export const EditAboutUsModal = ({
  isOpen,
  onClose,
  handleSave,
  data,
}: EditAboutUsModalProps) => {
  const { messages } = useLocale();
  const { update, updating, error } = useAboutUs();

  const [form, setForm] = useState({
    about_us: "",
    vision: "",
    mission: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setForm({
        about_us: data.about_us ?? "",
        vision: data.vision ?? "",
        mission: data.mission ?? "",
      });
    }
  }, [data]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await update(data._id, form);
    if (result) {
      setSuccessMessage(messages["about_us_updated_successfully"] || "Updated successfully");
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
        handleSave();
      }, 500);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {messages["edit_about_us_modal_title"] || "Edit About Us"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            {messages["edit_about_us_modal_description"] || "Update the information displayed on the About Us page."}
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="custom-scrollbar max-h-[calc(100vh-250px)] overflow-y-auto px-4 pb-4">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-lg font-medium text-gray-800">
                  {messages["about_us"]}
                </Label>
                <Textarea
                  className="w-full min-h-[140px] text-gray-800"
                  value={form.about_us}
                  onChange={(e) => handleChange("about_us", e)}
                  placeholder={messages["about_us_placeholder"] || "Enter about us information"}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-lg font-medium text-gray-800">
                  {messages["vision"]}
                </Label>
                <Textarea
                  className="w-full min-h-[140px] text-gray-800"
                  value={form.vision}
                  onChange={(e) => handleChange("vision", e)}
                  placeholder={messages["vision_placeholder"] || "Enter vision statement"}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-lg font-medium text-gray-800">
                  {messages["mission"]}
                </Label>
                <Textarea
                  className="w-full min-h-[140px] text-gray-800"
                  value={form.mission}
                  onChange={(e) => handleChange("mission", e)}
                  placeholder={messages["mission_placeholder"] || "Enter mission statement"}
                />
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {successMessage && (
            <p className="mt-4 text-sm text-green-600 dark:text-green-400">{successMessage}</p>
          )}

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={onClose}>
              {messages["cancel"] || "Cancel"}
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={updating}
              className="bg-primary-500 hover:bg-primary-600 text-white"
            >
              {updating
                ? messages["submitting"] || "Submitting..."
                : messages["save"] || "Save"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
// مودل للتعديل