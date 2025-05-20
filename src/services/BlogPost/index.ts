'use server';

import { getValidToken } from '@/lib/verifyToken';
import { revalidateTag } from 'next/cache';
// import { cookies } from 'next/headers';

// addBlogPost
export const addBlogPost = async (postData: FormData): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogpost`, {
      method: 'POST',
      body: postData,
      headers: {
        Authorization: token,
      },
    });
    revalidateTag('BLOGS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// getAllBlogPosts
export const getAllBlogPosts = async (
  page?: string,
  limit?: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogpost?limit=${limit}&page=${page}`,
      {
        next: {
          tags: ['BLOGS'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

// getSingleBlogPost
export const getSingleBlogPost = async (postId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogpost/${postId}`,
      {
        next: {
          tags: ['BLOGS'],
          revalidate: 1800, // Revalidate this page every 1800 seconds // this is not needed if I use export const revalidate: 1800; inside the blogpost page
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

// updateBlogPost
export const updateBlogPost = async (
  postData: FormData,
  postId: string
): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogpost/update/${postId}`,
      {
        method: 'PATCH',
        body: postData,
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag('BLOGS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// deleteBlogPost
export const deleteBlogPost = async (postId: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogpost/${postId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag('BLOGS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
