'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ImagePreviewer from '@/components/ui/core/BFImageUploader/ImagePreviewer';
import BFImageUploader from '@/components/ui/core/BFImageUploader';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  LoaderPinwheel,
  // Plus
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IExperience } from '@/types';
import { useState } from 'react';
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
import { experienceValidationSchema } from '../Add/ExperienceValidation';
import { updateExperience } from '@/services/Experience';

const UpdateExperienceForm = ({ experience }: { experience: IExperience }) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>(
    experience?.images || []
  );

  const router = useRouter();

  const experienceValues = {
    company: experience?.company || '',
    position: experience?.position || '',
    description: experience?.description || '',
    timeFrame: experience?.timeFrame || '',
  };

  const form = useForm({
    defaultValues: experienceValues,
    resolver: zodResolver(experienceValidationSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleUpdateExperience: SubmitHandler<FieldValues> = async data => {
    if (imagePreview?.length < 2) {
      toast.error('Please upload at least 2 image!');
      return;
    }

    const modifiedData = {
      ...data,
      images: imagePreview.filter(url => url.includes('res.cloudinary.com')),
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(modifiedData));

    for (const file of imageFiles) {
      formData.append('experience', file);
    }

    try {
      const res = await updateExperience(formData, experience._id);

      if (res.success) {
        toast.success(res.message);
        router.push('/dashboard/experiences');
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

        <h1 className="text-xl font-bold">Update Experience</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateExperience)}
          className="space-y-10"
        >
          <p className="text-primary font-bold text-center text-xl border-y py-3 my-5">
            Experience Information
          </p>

          {/* FormField for Company */}
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mx-2">Company</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ''}
                    placeholder="Company..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FormField for Position */}
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mx-2">Position</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ''}
                    placeholder="Position..."
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

          {/* FormField for TimeFrame */}
          <FormField
            control={form.control}
            name="timeFrame"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mx-2">Time-Frame</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ''}
                    placeholder="Time-Frame..."
                  />
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
                'Update Experience'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateExperienceForm;
