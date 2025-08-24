"use client";
import { useLocale } from "@/context/LocaleContext";
import AddOrEditProduct from "./AddOrEditProduct";
import Button from "@/components/ui/button/Button";
import { useState } from "react";
import { Product } from "@/types/Product";
import DeleteProductModal from "./DeleteProductModal";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { useProducts } from '@/hooks/useProducts';

export const OriginalProductsComponent = () => {

  const { messages } = useLocale();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const { products, loading, error, refetch } = useProducts();
  console.log("Products:", products);
  
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const refreshData = async () => {
    // setIsRefetching(true);
    // await refetch();
    // setIsRefetching(false);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setEditModalOpen(false);
  };

  const closeDeleteModal = async () => {
    setSelectedProduct(null);
    setDeleteModalOpen(false);
    await refreshData();
  };

  // if (loading || isRefetching) return <p>Loading categories...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <>
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        {messages["nav_original_product"] || "Products"}
      </h3>
      <div className="flex justify-end mb-4">
        <Button
          size="sm"
          onClick={() => {
            setSelectedProduct(null);
            setEditModalOpen(true);
          }}
        >
          {messages["add"] || "Add"}
        </Button>
      </div>

      <AddOrEditProduct
        product={null}
        isOpen={!selectedProduct && editModalOpen}
        onClose={closeEditModal}
        onSuccess={refreshData}
      />

      {selectedProduct && (
        <AddOrEditProduct
          product={selectedProduct}
          isOpen={editModalOpen}
          onClose={closeEditModal}
          onSuccess={refreshData}
        />
      )}

      {selectedProduct && (
        <DeleteProductModal
          product={selectedProduct}
          isOpen={deleteModalOpen}
          onClose={closeDeleteModal}
          onSuccess={refreshData}
        />
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="relative">
              <img
                src={product.image}
                alt="no image"
                className="h-48 w-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <div className="relative inline-block text-left">
                  <button
                    onClick={() =>
                      setOpenDropdownId(
                        openDropdownId === product._id ? null : product._id
                      )
                    }
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                  </button>
                  {openDropdownId === product._id && (
                    <Dropdown
                      isOpen
                      onClose={() => setOpenDropdownId(null)}
                      className="w-40 p-2"
                    >
                      <DropdownItem
                        onItemClick={() => {
                          handleEdit(product);
                          setOpenDropdownId(null);
                        }}
                        className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      >
                        {messages["edit"] || "Edit"}
                      </DropdownItem>
                      <DropdownItem
                        onItemClick={() => {
                          handleDelete(product);
                          setOpenDropdownId(null);
                        }}
                        className="flex w-full font-normal text-left text-red-500 rounded-lg hover:bg-red-100 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                      >
                        {messages["delete"] || "Delete"}
                      </DropdownItem>
                    </Dropdown>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4">
              <h4 className="text-md font-semibold text-gray-800 dark:text-white">
                {product.product_name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {product?.category?.name ?? "No category"}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2 line-clamp-2">
                {product.product_description || "No description available."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
