import UpdateSkillForm from '@/components/modules/Skill/UpdateExperienceForm';
import { getSingleSkill } from '@/services/Skill';

const UpdateSkillPage = async ({
  params,
}: {
  params: Promise<{ skillId: string }>;
}) => {
  const { skillId } = await params;

  const { data: skill } = await getSingleSkill(skillId);

  return (
    <div className="flex justify-center items-center">
      <UpdateSkillForm skill={skill} />
    </div>
  );
};

export default UpdateSkillPage;
