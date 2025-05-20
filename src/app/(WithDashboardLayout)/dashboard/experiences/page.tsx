import ManageExperiences from '@/components/modules/Experience/ManageExperiences';
import { getAllExperiences } from '@/services/Experience';

const ExperiencesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data: experiences, meta } = await getAllExperiences(page, '12');

  return (
    <div>
      <ManageExperiences experiences={experiences} meta={meta} page={page} />
    </div>
  );
};

export default ExperiencesPage;
