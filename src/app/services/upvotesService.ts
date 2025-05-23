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
    .insert({
      post_id,
      value
    })
    .select()
    .single()
  console.log(JSON.stringify(data, null, 2))
  if (error) {
    throw error
  } else {
    return data
  }
}