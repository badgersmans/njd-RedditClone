import { supabase } from "../../lib/supabase";

export const fetchSubreddit = async () => {
  const { data, error } = await supabase.from('groups').select('*');

  if(error) {
    throw error
  } else {
    return data
  }
}