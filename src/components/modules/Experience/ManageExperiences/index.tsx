'use client';

import { BFTable } from '@/components/ui/core/BFTable/index';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/ui/core/Pagination';
import { Edit, Plus, Trash } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { IExperience, IMeta } from '@/types';
import { useState } from 'react';
import Image from 'next/image';
import DeleteConfirmationModal from '@/components/ui/core/BFModal/DeleteConfirmationModal';
import { toast } from 'sonner';
import moment from 'moment';
import { deleteExperience } from '@/services/Experience';

const ManageExperiences = ({
  experiences,
  meta,
  page,
}: {
  experiences: IExperience[];
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

  const handleDeleteExperience = (experience: IExperience) => {
    setSelectedId(experience?._id);
    setSelectedItem(experience?.company);
    setModalOpen(true);
  };

  const handleDeleteExperienceConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteExperience(selectedId);
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

  const columns: ColumnDef<IExperience>[] = [
    {
      accessorKey: 'company',
      header: 'Company',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.images[0]}
            alt={row.original.company}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">
            {row.original.company.slice(0, 20)}...
          </span>
        </div>
      ),
    },

    {
      accessorKey: 'position',
      header: 'Position',
      cell: ({ row }) => <span>{row.original.position.slice(0, 20)}...</span>,
    },
    {
      accessorKey: 'timeFrame',
      header: 'TimeFrame',
      cell: ({ row }) => <span>{row.original.timeFrame.slice(0, 15)}...</span>,
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
            title="View this Experience"
            onClick={() => router.push(`/experiences/${row.original._id}`)}
          >
            <Eye className="w-5 h-5" />
          </button> */}

          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit this Experience"
            onClick={() =>
              router.push(`/dashboard/experiences/update/${row.original._id}`)
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-red-500"
            title="Delete this Experience"
            onClick={() => handleDeleteExperience(row.original)}
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
        <h1 className="text-xl font-bold">
          Manage Experiences ({meta?.total})
        </h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push('/dashboard/experiences/add')}
            size="sm"
          >
            Add Experience <Plus />
          </Button>
        </div>
      </div>
      <BFTable columns={columns} data={experiences || []} />
      <Pagination page={Number(page)} totalPage={meta?.totalPage} />

      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteExperienceConfirm}
      />
    </div>
  );
};

export default ManageExperiences;
