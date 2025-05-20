'use client';

import { BFTable } from '@/components/ui/core/BFTable/index';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/ui/core/Pagination';
import { Edit, Plus, Trash } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { IMeta, IProject } from '@/types';
import { useState } from 'react';
import Image from 'next/image';
import DeleteConfirmationModal from '@/components/ui/core/BFModal/DeleteConfirmationModal';
import { toast } from 'sonner';
// import moment from 'moment';
import { deleteProject } from '@/services/Project';

const ManageProjects = ({
  projects,
  meta,
  page,
}: {
  projects: IProject[];
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

  const handleDeleteProject = (project: IProject) => {
    setSelectedId(project?._id);
    setSelectedItem(project?.title);
    setModalOpen(true);
  };

  const handleDeleteProjectConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteProject(selectedId);
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

  const columns: ColumnDef<IProject>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.image}
            alt={row.original.title}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.title.slice(0, 20)}...</span>
        </div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <span>{row.original.description.slice(0, 20)}...</span>
      ),
    },
    {
      accessorKey: 'features',
      header: 'Features',
      cell: ({ row }) => <span>{row.original.features.slice(0, 20)}...</span>,
    },
    {
      accessorKey: 'stacks',
      header: 'Stacks',
      cell: ({ row }) => <span>{row.original.stacks.slice(0, 2)}...</span>,
    },
    {
      accessorKey: 'liveURL',
      header: 'LiveURL',
      cell: ({ row }) => <span>{row.original.liveURL.slice(0, 15)}...</span>,
    },
    // {
    //   accessorKey: 'frontEndGitHubURL',
    //   header: 'Client GitHub',
    //   cell: ({ row }) => (
    //     <span>{row.original.frontEndGitHubURL.slice(0, 15)}...</span>
    //   ),
    // },
    // {
    //   accessorKey: 'backEndGitHubURL',
    //   header: 'Server GitHub',
    //   cell: ({ row }) => (
    //     <span>{row.original.backEndGitHubURL.slice(0, 15)}...</span>
    //   ),
    // },
    // {
    //   accessorKey: 'createdAt',
    //   header: 'CreatedAt',
    //   cell: ({ row }) => (
    //     <span className="truncate">
    //       {moment(new Date(row.original.createdAt)).format('DD-MMMM-YY')}
    //     </span>
    //   ),
    // },
    // {
    //   accessorKey: 'updatedAt',
    //   header: 'UpdatedAt',
    //   cell: ({ row }) => (
    //     <span className="truncate">
    //       {moment(new Date(row.original.updatedAt)).format('DD-MMMM-YY')}
    //     </span>
    //   ),
    // },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center space-x-4">
          {/* <button
            className="text-gray-500 hover:text-blue-500"
            title="View this Project"
            onClick={() => router.push(`/projects/${row.original._id}`)}
          >
            <Eye className="w-5 h-5" />
          </button> */}

          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit this Project"
            onClick={() =>
              router.push(`/dashboard/projects/update/${row.original._id}`)
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-red-500"
            title="Delete this Project"
            onClick={() => handleDeleteProject(row.original)}
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
        <h1 className="text-xl font-bold">Manage Projects ({meta?.total})</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push('/dashboard/projects/add')}
            size="sm"
          >
            Add Project <Plus />
          </Button>
        </div>
      </div>
      <BFTable columns={columns} data={projects || []} />
      <Pagination page={Number(page)} totalPage={meta?.totalPage} />

      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteProjectConfirm}
      />
    </div>
  );
};

export default ManageProjects;
