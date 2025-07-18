import type { Metadata } from "next";
import { ProductCategoriesComponent } from "@/components/products/product-categories/ProductCategoriesComponent";

export const metadata: Metadata = {
  title: "Raqeem",
  description: "Quotations",
};

export default function ProductCategories() {
  return (
    <>
        <ProductCategoriesComponent />
    </>
  );
}
