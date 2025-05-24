import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types/database.types";

// type CreateUpvote = TablesInsert<'upvotes'>

export const upvotePost = async (
  post_id: string,
  value: 1 | -1,
  supabase: SupabaseClient<Database>
) => {
  const { data, error } = await supabase
    .from('upvotes')
    .upsert({
      post_id,
      value
    })
    .select()
    .single()
  // console.log(JSON.stringify(data, null, 2))
  if (error) {
    throw error
  } else {
    return data
  }
}

export const selectMyVotes = async (post_id: string, user_id: string, supabase: SupabaseClient<Database>) => {
  const { data, error } = await supabase
    .from('upvotes')
    .select('*')
    .eq('post_id', post_id)
    .eq('user_id', user_id)
    .select()
    .single()

  // console.log(JSON.stringify(data, null, 2))
  if (error) {
    throw error
  } else {
    return data
  }
}

export const deleteMyVotes = async (post_id: string, user_id: string, supabase: SupabaseClient<Database>) => {
  const { data, error } = await supabase
    .from('upvotes')
    .delete()
    .eq('post_id', post_id)
    .eq('user_id', user_id)
    // .select()
    // .single()

  // console.log(JSON.stringify(data, null, 2))
  if (error) {
    throw error
  } else {
    return data
  }
}