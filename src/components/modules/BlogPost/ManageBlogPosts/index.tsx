'use client';

import { BFTable } from '@/components/ui/core/BFTable/index';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/ui/core/Pagination';
import { Edit, Plus, Trash } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { IMeta, IPost } from '@/types';
import { useState } from 'react';
import Image from 'next/image';
import DeleteConfirmationModal from '@/components/ui/core/BFModal/DeleteConfirmationModal';
import { toast } from 'sonner';
import { deleteBlogPost } from '@/services/BlogPost';
import moment from 'moment';

const ManageBlogPosts = ({
  posts,
  meta,
  page,
}: {
  posts: IPost[];
  meta: IMeta;
  page: string;
}) => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const page = searchParams.get('page');
  // const [selectedIds, setSelectedIds] = useState<string[] | []>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDeletePost = (post: IPost) => {
    setSelectedId(post?._id);
    setSelectedItem(post?.title);
    setModalOpen(true);
  };

  const handleDeletePostConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteBlogPost(selectedId);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<IPost>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.images[0]}
            alt={row.original.title}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.title.slice(0, 20)}</span>
        </div>
      ),
    },

    {
      accessorKey: 'images',
      header: 'Images',
      cell: ({ row }) => <span>{row.original.images.length}</span>,
    },
    {
      accessorKey: 'url',
      header: 'URL',
      cell: ({ row }) => <span>{row.original.url.slice(0, 20)}...</span>,
    },

    {
      accessorKey: 'createdAt',
      header: 'CreatedAt',
      cell: ({ row }) => (
        <span className="truncate">
          {moment(new Date(row.original.createdAt)).format('DD-MMMM-YY')}
        </span>
      ),
    },
    {
      accessorKey: 'updatedAt',
      header: 'UpdatedAt',
      cell: ({ row }) => (
        <span className="truncate">
          {moment(new Date(row.original.updatedAt)).format('DD-MMMM-YY')}
        </span>
      ),
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center space-x-4">
          {/* <button
            className="text-gray-500 hover:text-blue-500"
            title="View this Post"
            onClick={() => router.push(`/posts/${row.original._id}`)}
          >
            <Eye className="w-5 h-5" />
          </button> */}

          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit this Post"
            onClick={() =>
              router.push(`/dashboard/posts/update/${row.original._id}`)
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-red-500"
            title="Delete this Post"
            onClick={() => handleDeletePost(row.original)}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Posts ({meta?.total})</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => router.push('/dashboard/posts/add')} size="sm">
            Add Post <Plus />
          </Button>
        </div>
      </div>
      <BFTable columns={columns} data={posts || []} />
      <Pagination page={Number(page)} totalPage={meta?.totalPage} />

      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeletePostConfirm}
      />
    </div>
  );
};

export default ManageBlogPosts;
