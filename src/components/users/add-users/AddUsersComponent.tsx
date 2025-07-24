"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/context/LocaleContext";
import { useUsers } from "@/hooks/useUsers";

export const AddUsersComponent = () => {
  const { messages } = useLocale();
  const router = useRouter();

  const { add, adding, error } = useUsers();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role:"",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await add(form);
    if (result) {
      setForm({ name: "", phone: "", email: "", password: "" , role: "" });
      setSuccessMessage(messages["user_created_successfully"] || "User created successfully!");

      setTimeout(() => {
        router.push("/users/original-users");
      }, 500);
    }
  };

  return (
    <>      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        {messages["nav_add_users"] || "Add User"}
      </h3>
      
    <div className="max-w-xl p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-red-500">{messages["error"] || error}</p>
        )}

        {successMessage && (
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            {successMessage}
          </p>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {messages["name"] || "Name"}
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {messages["phone"] || "Phone"}
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {messages["email"] || "Email"}
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {messages["password"] || "Password"}
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={adding}
          className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {adding
            ? messages["submitting"] || "Submitting..."
            : messages["submit"] || "Submit"}
        </button>
      </form>
    </div>
    </>
  );
};
