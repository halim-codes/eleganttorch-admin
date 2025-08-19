"use client";
import { useLocale } from "@/context/LocaleContext";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { EyeIcon, PencilIcon, TrashBinIcon } from "@/icons";
import { Blog } from "@/types/Blog";
import { useState } from "react";
import { useBlog } from "@/hooks/useBlog";
import Button from "../ui/button/Button";
import AddOrEditBlog from "./AddOrEditBlog";
import DeleteBlogModal from "./DeleteBlogModal";
import ShowBlogModal from "./ShowBlogModal";

export const BlogComponent = () => {
  const { messages } = useLocale();
  const { posts, loading, error, refetch } = useBlog();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);
  const [showModalOpen, setShowModalOpen] = useState(false);
  const [blogToShow, setBlogToShow] = useState<Blog | null>(null);

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setEditModalOpen(true);
  };
  const handleDelete = (blog: Blog) => {
    setSelectedBlog(blog);
    setDeleteModalOpen(true);
  };
  const refreshData = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };
  const closeEditModal = () => {
    setSelectedBlog(null);
    setEditModalOpen(false);
  };
  const closeDeleteModal = async () => {
    setSelectedBlog(null);
    setDeleteModalOpen(false);
    await refreshData();

  };
  const handleShow = (blog: Blog) => {
    setBlogToShow(blog);
    setShowModalOpen(true);
  };

  const closeShowModal = () => {
    setBlogToShow(null);
    setShowModalOpen(false);
  };


  if (loading || isRefetching) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>; return (
    <>
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        {messages["nav_blog"] || "Blog"}
      </h3>


      {/* Add New Blog Button */}
      <div className="flex justify-end mb-4">
        <Button
          size="sm"
          onClick={() => {
            setSelectedBlog(null); // add mode
            setEditModalOpen(true);
          }}
        >
          {messages["add"] || "Add"}
        </Button>
      </div>

      <AddOrEditBlog
        blog={null}
        isOpen={!selectedBlog && editModalOpen}
        onClose={closeEditModal}
        onSuccess={refreshData}
      />


      {selectedBlog && (
        <AddOrEditBlog
          blog={selectedBlog}
          isOpen={editModalOpen}
          onClose={closeEditModal}
          onSuccess={refreshData}
        />
      )}


      {selectedBlog && (
        <DeleteBlogModal
          blog={selectedBlog}
          isOpen={deleteModalOpen}
          onClose={closeDeleteModal}
          onSuccess={refreshData}
        />
      )}

      {blogToShow && (
        <ShowBlogModal
          isOpen={showModalOpen}
          blog={blogToShow}
          onClose={closeShowModal}
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
                    {messages["title"] || "Title"}
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
                    {messages["action"] || "Action"}
                  </TableCell>
                </TableRow>
              </TableHeader>
              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {posts?.length > 0 &&
                  posts.map((post) => (
                    post && (
                      <TableRow key={post._id}>
                        <TableCell className="px-6 py-4 text-gray-800 dark:text-white">
                          {post.title}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-gray-800 dark:text-white">
                          {(post.description ?? "").length > 50
                            ? post.description!.substring(0, 50) + "..."
                            : post.description ?? ""}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-gray-800 dark:text-white">
                          <div className="flex items-center gap-5">
                            <button onClick={() => handleShow(post)}>
                              <EyeIcon />
                            </button>
                            <button
                              onClick={() => handleEdit(post)}
                            >
                              <PencilIcon />
                            </button>

                            <button
                              onClick={() => handleDelete(post)}
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
