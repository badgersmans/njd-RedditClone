import { SupabaseClient } from "@supabase/supabase-js";
import { Database, TablesInsert } from "../../types/database.types";

type CreatePost = TablesInsert<'posts'>

export const fetchPosts = async (supabase: SupabaseClient<Database>) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*, group:groups(*), upvotes(value.sum())') // group:groups meaning rename groups to group
    .order('created_at', {ascending: false})
  // console.log(JSON.stringify(data, null, 2))
  if (error) {
    throw error
  } else {
    return data
  }
}

export const fetchPostById = async (id: string, supabase: SupabaseClient<Database>) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*, group:groups(*), upvotes(value.sum())')
    .eq('id', id)
    .single();
    // console.log(data)

  if (error) {
    throw error
  } else {
    return data
  }
}

// export const fetchPostUpvotes = async (id: string, supabase: SupabaseClient<Database>) => {
//   const { data, error } = await supabase
//     .from('upvotes')
//     .select('value.sum()')
//     .eq('post_id', id)
//     console.log(error)
//     // console.log(JSON.stringify(data, null, 2))

//   if (error) {
//     throw error
//   } else {
//     return data
//   }
// }

export const createPost = async (post: CreatePost, supabase: SupabaseClient<Database>) => {
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

export const deletePostById = async (id: string, supabase: SupabaseClient<Database>) => {
  const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw error
  } else {
    return data
  }
}