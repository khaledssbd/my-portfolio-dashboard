import UpdateBlogPostForm from '@/components/modules/BlogPost/UpdateBlogPostForm';
import { getSingleBlogPost } from '@/services/BlogPost';

const UpdateBLogPostPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const { postId } = await params;

  const { data: post } = await getSingleBlogPost(postId);

  return (
    <div className="flex justify-center items-center">
      <UpdateBlogPostForm post={post} />
    </div>
  );
};

export default UpdateBLogPostPage;
