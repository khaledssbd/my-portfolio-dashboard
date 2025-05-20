import ManageProjects from '@/components/modules/Project/ManageProjects';
import { getAllProjects } from '@/services/Project';

const ProjectsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data: projects, meta } = await getAllProjects(page, '12');

  return (
    <div>
      <ManageProjects projects={projects} meta={meta} page={page} />
    </div>
  );
};

export default ProjectsPage;
