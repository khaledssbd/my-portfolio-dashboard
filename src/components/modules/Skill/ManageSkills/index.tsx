'use client';

import { BFTable } from '@/components/ui/core/BFTable/index';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/ui/core/Pagination';
import { Edit, Plus, Trash } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { IMeta, ISkill } from '@/types';
import { useState } from 'react';
import DeleteConfirmationModal from '@/components/ui/core/BFModal/DeleteConfirmationModal';
import { toast } from 'sonner';
import moment from 'moment';
import { deleteSkill } from '@/services/Skill';

const ManageSkills = ({
  skills,
  meta,
  page,
}: {
  skills: ISkill[];
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

  const handleDeleteSkill = (skill: ISkill) => {
    setSelectedId(skill?._id);
    setSelectedItem(skill?.name);
    setModalOpen(true);
  };

  const handleDeleteSkillConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteSkill(selectedId);
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

  const columns: ColumnDef<ISkill>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <span className="truncate">{row.original.name.slice(0, 20)}</span>
      ),
    },
    {
      accessorKey: 'icon',
      header: 'Icon',
      cell: ({ row }) => <span>{row.original.icon.slice(0, 20)}</span>,
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
            title="View this Skill"
            onClick={() => router.push(`/skills/${row.original._id}`)}
          >
            <Eye className="w-5 h-5" />
          </button> */}

          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit this Skill"
            onClick={() =>
              router.push(`/dashboard/skills/update/${row.original._id}`)
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-red-500"
            title="Delete this Skill"
            onClick={() => handleDeleteSkill(row.original)}
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
        <h1 className="text-xl font-bold">Manage Skills ({meta?.total})</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push('/dashboard/skills/add')}
            size="sm"
          >
            Add Skill <Plus />
          </Button>
        </div>
      </div>
      <BFTable columns={columns} data={skills || []} />
      <Pagination page={Number(page)} totalPage={meta?.totalPage} />

      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteSkillConfirm}
      />
    </div>
  );
};

export default ManageSkills;
