'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  LoaderPinwheel,
  // Plus
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IProject } from '@/types';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  FieldValues,
  SubmitHandler,
  // useFieldArray,
  useForm,
} from 'react-hook-form';
import { updateProjectValidationSchema } from '../Add/ProjectValidation';
import { updateProject } from '@/services/Project';

const UpdateProjectForm = ({ project }: { project: IProject }) => {
  const router = useRouter();

  const projectValues = {
    title: project?.title || '',
    description: project?.description || '',
    features: project?.features || '',
    stacks: project?.stacks.join(', ') || '',
    liveURL: project?.liveURL || '',
    frontEndGitHubURL: project?.frontEndGitHubURL || '',
    backEndGitHubURL: project?.backEndGitHubURL || '',
    image: undefined,
  };

  const form = useForm({
    defaultValues: projectValues,
    resolver: zodResolver(updateProjectValidationSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleUpdateProject: SubmitHandler<FieldValues> = async data => {
    data.stacks = data.stacks.split(',').map((stack: string) => stack.trim());

    const formData = new FormData();
    formData.append('data', JSON.stringify(data));

    if (data.image instanceof File) {
      formData.append('project', data.image);
    }

    try {
      const res = await updateProject(formData, project._id);

      if (res.success) {
        toast.success(res.message);
        router.push('/dashboard/projects');
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

        <h1 className="text-xl font-bold">Update Project</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateProject)}
          className="space-y-10"
        >
          <p className="text-primary font-bold text-center text-xl border-y py-3 my-5">
            Project Information
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

          {/* FormField for Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mx-2">Description</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ''}
                    placeholder="Description..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FormField for Features */}
          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mx-2">Features</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ''}
                    placeholder="Features..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FormField for Stacks */}
          <FormField
            control={form.control}
            name="stacks"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mx-2">Stacks(Comma Separated)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ''}
                    placeholder="Stacks..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FormField for Live URL */}
          <FormField
            control={form.control}
            name="liveURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mx-2">Live URL</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ''}
                    placeholder="Live URL..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FormField for Client GitHub URL */}
          <FormField
            control={form.control}
            name="frontEndGitHubURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mx-2">Client GitHub URL</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ''}
                    placeholder="Client GitHub URL..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FormField for Server GitHub URL */}
          <FormField
            control={form.control}
            name="backEndGitHubURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mx-2">Server GitHub URL</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ''}
                    placeholder="Server GitHub URL..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FormField for image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="text-left w-2/3 md:w-full">
                <FormLabel className="mx-2 text-black dark:text-amber-500">
                  Image
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-300 text-black dark:text-amber-500 font-medium"
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      field.onChange(e.target.files?.[0]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                'Update Project'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateProjectForm;
