'use client';

import { useUser } from '@/context/UserContext';

const DashboardContent = () => {
  const { user } = useUser();

  return (
    <div className="my-20 mx-4 md:mx-10">
      <h2 className="text-3xl text-center mb-10 font-semibold">
        Hi{user?.name ? `, ${user.name}` : ' there'} 👋
      </h2>
    </div>
  );
};

export default DashboardContent;
