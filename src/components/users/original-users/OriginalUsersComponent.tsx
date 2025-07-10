"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Link from "next/link";

import { useLocale } from "@/context/LocaleContext";
import { useUsers } from '@/hooks/useUser';

export const OriginalUsersComponent = () => {
  const { messages } = useLocale();
  const { users, loading, error } = useUsers();

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="flex items-center justify-between mb-5 lg:mb-7">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {messages["nav_original_users"] || "Users"}
        </h3>
        <Link
          href="/users/add-users"
          className="rounded-md bg-blue-900 px-4 py-2 text-white font-semibold hover:bg-blue-950 dark:bg-blue-500 dark:hover:bg-blue-600 whitespace-nowrap"
        >
          {messages["u_add_user"] || "Add New User"}
        </Link>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {messages["name"] || "Name"}
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {messages["role"] || "Role"}
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {messages["email"] || "Email"}
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {messages["phone"] || "Phone"}
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {users?.length > 0 &&
                  users.map((user) => (
                    user && (
                      <TableRow key={user._id}>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <div className="flex items-center gap-3">
                            <div>
                              {user.name}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {user.role}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {user.email}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {user.phone}
                        </TableCell>
                      </TableRow>
                    )
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};
