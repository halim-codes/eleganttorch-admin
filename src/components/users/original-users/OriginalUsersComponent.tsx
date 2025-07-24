"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import { useLocale } from "@/context/LocaleContext";
import { useUsers } from '@/hooks/useUsers';
import { PencilIcon, TrashBinIcon } from "@/icons";
import { User } from "@/types/User";
import AddOrEditUser from "./AddOrEditUser";
import Button from "@/components/ui/button/Button";
import DeleteUserModal from "./DeleteUserModal";

export const OriginalUsersComponent = () => {
  const { messages } = useLocale();
  const { users, loading, error, refetch } = useUsers();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<User | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

    const handleEdit = (user: User) => {
      setSelectedCategory(user);
      setEditModalOpen(true);
    };
    const handleDelete = (user: User) => {
      setSelectedCategory(user);
      setDeleteModalOpen(true);
    };
    const refreshData = async () => {
      setIsRefetching(true);
      await refetch();
      setIsRefetching(false);
    };
  
    const closeEditModal = () => {
      setSelectedCategory(null);
      setEditModalOpen(false);
    };
    const closeDeleteModal = async () => {
      setSelectedCategory(null);
      setDeleteModalOpen(false);
      await refreshData();
  
    };
  

  if (loading || isRefetching) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="flex items-center justify-between mb-5 lg:mb-7">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {messages["nav_original_users"] || "Users"}
        </h3>
        {/* Add New Category Button */}
      <div className="flex justify-end mb-4">
        <Button
          size="sm"
          onClick={() => {
            setSelectedCategory(null); // add mode
            setEditModalOpen(true);
          }}
        >
          {messages["add"] || "Add"}
        </Button>
      </div>

      <AddOrEditUser
        user={null}
        isOpen={!selectedCategory && editModalOpen}
        onClose={closeEditModal}
        onSuccess={refreshData}
      />


      {selectedCategory && (
        <AddOrEditUser
          user={selectedCategory}
          isOpen={editModalOpen}
          onClose={closeEditModal}
          onSuccess={refreshData}
        />
      )}


      {selectedCategory && (
        <DeleteUserModal
          user={selectedCategory}
          isOpen={deleteModalOpen}
          onClose={closeDeleteModal}
          onSuccess={refreshData}
        />
      )}

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
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {messages["product_action"] || "Action"}
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
                        <TableCell className="px-6 py-4 text-gray-800 dark:text-white">
                          <div className="flex items-center gap-5">
                            <button
                            onClick={() => handleEdit(user)}
                            >
                              <PencilIcon />
                            </button>



                            <button
                            onClick={() => handleDelete(user)}
                            >
                              <TrashBinIcon />
                            </button>
                          </div>
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
