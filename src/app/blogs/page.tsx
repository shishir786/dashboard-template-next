"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, Eye, Trash2, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import CreateBlogModal from "@/components/modals/CreateBlogModal"

type Blog = {
  id: string
  title: string
  author: string
  category: string
  content: string
  createdAt: string
}

const seedBlogs: Blog[] = [
  {
    id: "1",
    title: "Getting Started with Next.js 14",
    author: "John Doe",
    category: "Technology",
    content: "<p>Next.js 14 brings amazing new features...</p>",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "The Future of Web Development",
    author: "Jane Smith",
    category: "Technology",
    content: "<p>Web development is evolving rapidly...</p>",
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    title: "Healthy Living Tips",
    author: "Mike Johnson",
    category: "Lifestyle",
    content: "<p>Living a healthy lifestyle is important...</p>",
    createdAt: "2024-02-01",
  },
  {
    id: "4",
    title: "Understanding TypeScript",
    author: "Sarah Williams",
    category: "Technology",
    content: "<p>TypeScript adds type safety to JavaScript...</p>",
    createdAt: "2024-02-10",
  },
  {
    id: "5",
    title: "Travel Guide: Europe",
    author: "David Lee",
    category: "Travel",
    content: "<p>Europe offers amazing destinations...</p>",
    createdAt: "2024-02-15",
  },
  {
    id: "6",
    title: "Cooking Made Easy",
    author: "Emily Clark",
    category: "Food",
    content: "<p>Learn simple cooking techniques...</p>",
    createdAt: "2024-02-20",
  },
  {
    id: "7",
    title: "Fitness Fundamentals",
    author: "Robert Brown",
    category: "Health",
    content: "<p>Building a strong fitness foundation...</p>",
    createdAt: "2024-03-01",
  },
  {
    id: "8",
    title: "Digital Marketing Trends",
    author: "Lisa Anderson",
    category: "Business",
    content: "<p>Marketing strategies for 2024...</p>",
    createdAt: "2024-03-05",
  },
  {
    id: "9",
    title: "Photography Basics",
    author: "Tom Wilson",
    category: "Art",
    content: "<p>Master the basics of photography...</p>",
    createdAt: "2024-03-10",
  },
  {
    id: "10",
    title: "Sustainable Living",
    author: "Anna Martinez",
    category: "Lifestyle",
    content: "<p>Tips for living sustainably...</p>",
    createdAt: "2024-03-15",
  },
  {
    id: "11",
    title: "AI and Machine Learning",
    author: "Chris Taylor",
    category: "Technology",
    content: "<p>Understanding AI fundamentals...</p>",
    createdAt: "2024-03-20",
  },
  {
    id: "12",
    title: "Home Decoration Ideas",
    author: "Maria Garcia",
    category: "Home",
    content: "<p>Transform your living space...</p>",
    createdAt: "2024-03-25",
  },
]

function BlogsTable({
  blogs,
  onView,
  onDelete,
  startIndex,
}: {
  blogs: Blog[]
  onView: (blog: Blog) => void
  onDelete: (id: string) => void
  startIndex: number
}) {
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block bg-card rounded-b-lg shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Created Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {blogs.map((blog, idx) => (
                <tr key={blog.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {startIndex + idx + 1}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-foreground line-clamp-1">
                      {blog.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {blog.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {blog.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                        onClick={() => onView(blog)}
                        title="View Blog"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => onDelete(blog.id)}
                        title="Delete Blog"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="md:hidden space-y-3 p-4">
        {blogs.map((blog, idx) => (
          <div key={blog.id} className="bg-card rounded-lg border border-border p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground line-clamp-2">{blog.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">#{startIndex + idx + 1}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0 ml-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                  onClick={() => onView(blog)}
                  title="View Blog"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => onDelete(blog.id)}
                  title="Delete Blog"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Author:</span>
                <span className="text-foreground">{blog.author}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {blog.category}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span className="text-foreground">{blog.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>(seedBlogs)
  const [query, setQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const itemsPerPage = 5

  const filtered = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.author.toLowerCase().includes(query.toLowerCase()) ||
      blog.category.toLowerCase().includes(query.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedBlogs = filtered.slice(startIndex, endIndex)

  React.useEffect(() => {
    setCurrentPage(1)
  }, [query])

  const handleCreateBlog = (newBlog: {
    title: string
    author: string
    category: string
    content: string
  }) => {
    const blog: Blog = {
      id: `${blogs.length + 1}`,
      ...newBlog,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setBlogs([blog, ...blogs])
  }

  const handleDeleteBlog = (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      setBlogs(blogs.filter((b) => b.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Blog List</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blogs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 bg-background text-foreground w-full border-primary-foreground/20"
              />
            </div>
            <Button
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 whitespace-nowrap"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Blog
            </Button>
          </div>
        </div>
      </div>

      {/* Table area */}
      <div>
        <BlogsTable
          blogs={paginatedBlogs}
          onView={setSelectedBlog}
          onDelete={handleDeleteBlog}
          startIndex={startIndex}
        />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-card border-t border-border p-4 rounded-b-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, filtered.length)} of{" "}
              {filtered.length} blogs
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">Previous</span>
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="h-8 w-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-8"
              >
                <span className="hidden sm:inline mr-1">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Blog Modal */}
      <CreateBlogModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onConfirm={handleCreateBlog}
      />

      {/* View Blog Modal (Simple preview) */}
      {selectedBlog && (
        <Dialog open={!!selectedBlog} onOpenChange={() => setSelectedBlog(null)} modal={false}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedBlog.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>By {selectedBlog.author}</span>
                <span>•</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {selectedBlog.category}
                </span>
                <span>•</span>
                <span>{selectedBlog.createdAt}</span>
              </div>
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
