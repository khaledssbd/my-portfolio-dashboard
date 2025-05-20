'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderPinwheel } from 'lucide-react';
import { skillValidationSchema } from './SkillValidation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { addSkill } from '@/services/Skill';

const AddSkillForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(skillValidationSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleAddSkill: SubmitHandler<FieldValues> = async data => {
    try {
      const res = await addSkill(data);

      if (res.success) {
        toast.success(res.message);
        router.push('/dashboard/skills');
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

        <h1 className="text-xl font-bold">Add Skill</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAddSkill)}
          className="space-y-10"
        >
          <p className="text-primary font-bold text-center text-xl border-y py-3 my-5 ">
            Skill Information
          </p>

          {/* FormField for Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mx-2">Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ''}
                    placeholder="Name..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FormField for Icon */}
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mx-2">Icon</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ''}
                    placeholder="Icon..."
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
                'Add Skill'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default AddSkillForm;
