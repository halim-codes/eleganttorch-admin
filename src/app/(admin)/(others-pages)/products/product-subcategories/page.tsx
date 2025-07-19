import type { Metadata } from "next";
import { ProductSubcategoriesComponent } from "@/components/products/product-subcategories/ProductSubcategoriesComponent";

export const metadata: Metadata = {
  title: "Raqeem",
  description: "Quotations",
};

export default function ProductSubcategories() {
  return (
    <>
        <ProductSubcategoriesComponent />
    </>
  );
}
