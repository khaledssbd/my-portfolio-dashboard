import Navbar from '@/components/shared/Navbar';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-463px)] my-14">{children}</main>
    </>
  );
};

export default CommonLayout;
