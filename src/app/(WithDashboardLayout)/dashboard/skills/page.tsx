import ManageSkills from '@/components/modules/Skill/ManageSkills';
import { getAllSkills } from '@/services/Skill';

const SkillsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data: skills, meta } = await getAllSkills(page, '12');

  return (
    <div>
      <ManageSkills skills={skills} meta={meta} page={page} />
    </div>
  );
};

export default SkillsPage;
