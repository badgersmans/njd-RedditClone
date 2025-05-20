import { supabase } from "../../lib/supabase";
import { TablesInsert } from "../../types/database.types";

type CreatePost = TablesInsert<'posts'>

export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*, group:groups(*), user:users!posts_user_id_fkey(*)'); // group:groups meaning rename groups to group
  // console.log(JSON.stringify(data, null, 2))
  if (error) {
    throw error
  } else {
    return data
  }
}

export const fetchPostById = async (id: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*, group:groups(*), user:users!posts_user_id_fkey(*)')
    .eq('id', id)
    .single();

  if (error) {
    throw error
  } else {
    return data
  }
}

export const createPost = async (post: CreatePost) => {
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single()

  if (error) {
    throw error
  } else {
    return data
  }
}