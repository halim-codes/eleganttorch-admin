"use client";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useLocale } from "@/context/LocaleContext";
import AddOrEditProductCategory from "./AddOrEditProductCategory";
import { useCategories } from '@/hooks/useCategories';
import Button from "@/components/ui/button/Button";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { useState, useEffect } from "react";
import { Category } from "@/types/Category";
import { PencilIcon, TrashBinIcon } from "@/icons";


export const ProductCategoriesComponent = () => {
  const { messages } = useLocale();
  const { categories, loading, error, refetch } = useCategories();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);
  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };
  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
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


  if (loading || isRefetching) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        {messages["nav_product_categories"] || "Product Categories"}
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

      <AddOrEditProductCategory
        category={null}
        isOpen={!selectedCategory && editModalOpen}
        onClose={closeEditModal}
        onSuccess={refreshData}
      />


      {selectedCategory && (
        <AddOrEditProductCategory
          category={selectedCategory}
          isOpen={editModalOpen}
          onClose={closeEditModal}
          onSuccess={refreshData}
        />
      )}


      {selectedCategory && (
        <DeleteCategoryModal
          category={selectedCategory}
          isOpen={deleteModalOpen}
          onClose={closeDeleteModal}
          onSuccess={refreshData}
        />
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-6 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                  >
                    {messages["name"] || "Name"}
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                  >
                    {messages["description"] || "Description"}
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                  >
                    {messages["product_action"] || "Action"}
                  </TableCell>
                </TableRow>
              </TableHeader>
              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {categories?.length > 0 &&
                  categories.map((category) => (
                    category && (
                      <TableRow key={category._id}>
                        <TableCell className="px-6 py-4 text-gray-800 dark:text-white">
                          {category.name}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-gray-800 dark:text-white">
                          {category.description}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-gray-800 dark:text-white">
                          <div className="flex items-center gap-5">
                            <button
                              onClick={() => handleEdit(category)}
                            >
                              <PencilIcon />
                            </button>



                            <button
                              onClick={() => handleDelete(category)}
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
