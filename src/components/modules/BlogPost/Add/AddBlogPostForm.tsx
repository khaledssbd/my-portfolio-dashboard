'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import BFImageUploader from '@/components/ui/core/BFImageUploader';
import ImagePreviewer from '@/components/ui/core/BFImageUploader/ImagePreviewer';
import { addBlogPost } from '@/services/BlogPost';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderPinwheel } from 'lucide-react';
import { blogPostValidationSchema } from './BlogPostValidation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import dynamic from 'next/dynamic';

const RichPostEditor = dynamic(() => import('../RichPostEditor/page'), {
  ssr: false,
});

const AddBlogPostForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(blogPostValidationSchema),
  });

  const {
    formState: { isSubmitting },
    setValue,
  } = form;

  const handleAddPost: SubmitHandler<FieldValues> = async data => {
    data.url = data.url.replace(/ /g, '-').toLowerCase();

    if (imageFiles?.length < 3) {
      toast.error('Please upload at least 3 image!');
      return;
    }

    const formData = new FormData();
    formData.append('data', JSON.stringify(data));

    for (const file of imageFiles) {
      formData.append('blogPost', file);
    }

    try {
      const res = await addBlogPost(formData);

      if (res.success) {
        toast.success(res.message);
        router.push('/dashboard/posts');
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5">
      <div className="flex items-center space-x-4 mb-5 ">
        <span className="text-primary font-bold text-xl">Khaled</span>

        <h1 className="text-xl font-bold">Add Post</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAddPost)}
          className="space-y-10"
        >
          <p className="text-primary font-bold text-center text-xl border-y py-3 my-5 ">
            Post Information
          </p>

          {/* FormField for Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mx-2">Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ''}
                    placeholder="Title..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FormField for URL */}
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mx-2">URL</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ''}
                    placeholder="URL..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FormField for content */}
          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem>
                <FormLabel className="mx-2">Content</FormLabel>
                <FormControl>
                  <div className="border rounded p-2">
                    <RichPostEditor
                      onChange={data => {
                        const json = JSON.stringify(data);
                        setValue('content', json);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <p className="text-primary font-bold text-xl text-center border-t border-b py-3 my-5">
              Images
            </p>

            <div className="flex gap-4">
              <BFImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Images"
                className="w-fit mt-0"
              />
              <ImagePreviewer
                className="flex flex-wrap gap-4"
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
          </div>

          <div className="text-center border-t py-3 my-5">
            <Button
              type="submit"
              className="mt-5 w-1/3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="animate-spin">
                  <LoaderPinwheel />
                </div>
              ) : (
                'Add Post'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default AddBlogPostForm;
