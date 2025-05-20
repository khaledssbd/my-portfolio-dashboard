'use server';

import { getValidToken } from '@/lib/verifyToken';
import { revalidateTag } from 'next/cache';
import { FieldValues } from 'react-hook-form';
// import { cookies } from 'next/headers';

// addSkill
export const addSkill = async (skillData: FieldValues): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill`, {
      method: 'POST',
      body: JSON.stringify(skillData),
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    revalidateTag('SKILLS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// getAllSkills
export const getAllSkills = async (
  page?: string,
  limit?: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skill?limit=${limit}&page=${page}`,
      {
        next: {
          tags: ['SKILLS'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

// getSingleSkill
export const getSingleSkill = async (skillId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skill/${skillId}`,
      {
        next: {
          tags: ['SKILLS'],
          revalidate: 1800, // Revalidate this page every 1800 seconds // this is not needed if I use export const revalidate: 1800; inside the skill page
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

// updateSkill
export const updateSkill = async (
  skillData: FieldValues,
  skillId: string
): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skill/update/${skillId}`,
      {
        method: 'PATCH',
        body: JSON.stringify(skillData),
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    );
    revalidateTag('SKILLS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// deleteSkill
export const deleteSkill = async (skillId: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skill/${skillId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag('SKILLS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
