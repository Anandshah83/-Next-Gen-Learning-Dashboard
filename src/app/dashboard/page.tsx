import React from 'react';
import { getCourses } from '@/lib/supabase';
import DashboardClient from './DashboardClient';

export const revalidate = 0; // Disable caching to ensure live fetching on refresh

export default async function DashboardPage() {
  const { data: courses, isFallback } = await getCourses();

  return (
    <DashboardClient courses={courses} isFallback={isFallback} />
  );
}
