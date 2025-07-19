import type { Metadata } from "next";
import { ProductCategoriesComponent } from "@/components/products/product-categories/ProductCategoriesComponent";
import { OriginalProductsComponent } from "@/components/products/original-products/OriginalProductsComponent";

export const metadata: Metadata = {
  title: "Raqeem",
  description: "Quotations",
};

export default function OriginalProducts() {
  return (
    <>
        <OriginalProductsComponent/>
    </>
  );
}
