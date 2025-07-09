import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import { User } from "../../types/User";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSave: (updatedUser: User) => void;
}

export const EditUserModal = ({
  isOpen,
  onClose,
}: EditUserModalProps) => {


  const [showPassword, setShowPassword] = useState(false);



 

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Personal Information
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Update your details to keep your profile up-to-date.
          </p>
        </div>
        <form className="flex flex-col">
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
            <div className="mt-4">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Personal Information
              </h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                  />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="text"
                  />
                </div>
                <div className="relative">
                  <Label>Password</Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </button>
                  <Link href="/change-password" legacyBehavior>
                    <a className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400 whitespace-nowrap">
                      Change Password?
                    </a>
                  </Link>
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    type="text"
                  />
                </div>

              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button size="sm" >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
