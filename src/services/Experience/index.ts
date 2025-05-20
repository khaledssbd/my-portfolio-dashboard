'use server';

import { getValidToken } from '@/lib/verifyToken';
import { revalidateTag } from 'next/cache';
// import { cookies } from 'next/headers';

// addExperience
export const addExperience = async (experienceData: FormData): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/experience`, {
      method: 'POST',
      body: experienceData,
      headers: {
        Authorization: token,
      },
    });
    revalidateTag('EXPERIENCES');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// getAllExperiences
export const getAllExperiences = async (
  page?: string,
  limit?: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/experience?limit=${limit}&page=${page}`,
      {
        next: {
          tags: ['EXPERIENCES'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

// getSingleExperience
export const getSingleExperience = async (
  experienceId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/experience/${experienceId}`,
      {
        next: {
          tags: ['EXPERIENCES'],
          revalidate: 1800, // Revalidate this page every 1800 seconds // this is not needed if I use export const revalidate: 1800; inside the experience page
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

// updateExperience
export const updateExperience = async (
  experienceData: FormData,
  experienceId: string
): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/experience/update/${experienceId}`,
      {
        method: 'PATCH',
        body: experienceData,
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag('EXPERIENCES');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// deleteExperience
export const deleteExperience = async (experienceId: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/experience/${experienceId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag('EXPERIENCES');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
