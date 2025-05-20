'use server';

import { getValidToken } from '@/lib/verifyToken';
import { revalidateTag } from 'next/cache';
// import { cookies } from 'next/headers';

// addProject
export const addProject = async (projectData: FormData): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
      method: 'POST',
      body: projectData,
      headers: {
        Authorization: token,
      },
    });
    revalidateTag('PROJECTS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// getAllProjects
export const getAllProjects = async (
  page?: string,
  limit?: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/project?limit=${limit}&page=${page}`,
      {
        next: {
          tags: ['PROJECTS'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

// getSingleProject
export const getSingleProject = async (
  projectId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/project/${projectId}`,
      {
        next: {
          tags: ['PROJECTS'],
          revalidate: 1800, // Revalidate this page every 1800 seconds // this is not needed if I use export const revalidate: 1800; inside the project page
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

// updateProject
export const updateProject = async (
  projectData: FormData,
  projectId: string
): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/project/update/${projectId}`,
      {
        method: 'PATCH',
        body: projectData,
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag('PROJECTS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// deleteProject
export const deleteProject = async (projectId: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/project/${projectId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag('PROJECTS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
