import UpdateExperienceForm from '@/components/modules/Experience/UpdateExperienceForm';
import { getSingleExperience } from '@/services/Experience';

const UpdateExperiencePage = async ({
  params,
}: {
  params: Promise<{ experienceId: string }>;
}) => {
  const { experienceId } = await params;

  const { data: experience } = await getSingleExperience(experienceId);

  return (
    <div className="flex justify-center items-center">
      <UpdateExperienceForm experience={experience} />
    </div>
  );
};

export default UpdateExperiencePage;
