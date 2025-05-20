import UpdateProjectForm from '@/components/modules/Project/UpdateProjectForm';
import { getSingleProject } from '@/services/Project';

const UpdateProjectPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  const { data: project } = await getSingleProject(projectId);

  return (
    <div className="flex justify-center items-center">
      <UpdateProjectForm project={project} />
    </div>
  );
};

export default UpdateProjectPage;
