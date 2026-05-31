import { createClient } from '@supabase/supabase-js';
import { Course } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const MOCK_COURSES: Course[] = [
  {
    id: '1-mock',
    title: 'Advanced React Patterns',
    progress: 75,
    icon_name: 'BookOpen',
    created_at: new Date().toISOString()
  },
  {
    id: '2-mock',
    title: 'Creative Coding with WebGL',
    progress: 40,
    icon_name: 'Sparkles',
    created_at: new Date().toISOString()
  },
  {
    id: '3-mock',
    title: 'Data Structures & Algorithms',
    progress: 92,
    icon_name: 'Binary',
    created_at: new Date().toISOString()
  },
  {
    id: '4-mock',
    title: 'Next.js Production Architecture',
    progress: 15,
    icon_name: 'Cpu',
    created_at: new Date().toISOString()
  }
];

export async function getCourses() {
  // Simulate delay for skeleton loading state
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!supabase) {
    return { data: MOCK_COURSES, error: null, isFallback: true };
  }

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase query error:', error.message);
      return { data: MOCK_COURSES, error, isFallback: true };
    }

    if (!data || data.length === 0) {
      return { data: MOCK_COURSES, error: null, isFallback: true };
    }

    return { data: data as Course[], error: null, isFallback: false };
  } catch (err) {
    console.error('Database connection failed:', err);
    return { data: MOCK_COURSES, error: err as Error, isFallback: true };
  }
}
