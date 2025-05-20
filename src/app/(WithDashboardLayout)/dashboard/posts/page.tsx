import ManageBlogPosts from '@/components/modules/BlogPost/ManageBlogPosts';
import { getAllBlogPosts } from '@/services/BlogPost';

const BlogPostPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data: posts, meta } = await getAllBlogPosts(page, '12');

  return (
    <div>
      <ManageBlogPosts posts={posts} meta={meta} page={page} />
    </div>
  );
};

export default BlogPostPage;
