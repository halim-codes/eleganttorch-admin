import type { Metadata } from "next";
import { AddProductComponent } from "@/components/products/add-product/AddProductComponent";

export const metadata: Metadata = {
  title: "Raqeem",
  description: "Quotations",
};

export default function AddProduct() {
  return (
    <>
        <AddProductComponent/>
    </>
  );
}
