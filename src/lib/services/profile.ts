import { supabase } from "../supabase";

export async function getCurrentUserWithProfile() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError.message);
    return { user: null, profile: null, error: userError };
  }

  if (!user) {
    return { user: null, profile: null, error: null };
  }

  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError.message);
    return { user, profile: null, error: profileError };
  }

  return { user, profile, error: null };
}
