import { useSupabase } from "./useSupabase";

export const useSignUp = () => {
  const { isLoaded, supabase } = useSupabase();

  const signUp = async ({
    email,
    password,
    username,
    full_name,
  }: {
    email: string;
    password: string;
    username: string;
    full_name: string;
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, full_name },
      },
    });

    if (error) throw error;

    if (data.user?.id) {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ username, full_name })
        .eq("id", data.user.id);

      if (profileError) throw profileError;
    }

    return data.user;
  };

  const verifyOtp = async ({
    email,
    token,
  }: {
    email: string;
    token: string;
  }) => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });
    if (error) throw error;
  };

  return {
    isLoaded,
    signUp,
    verifyOtp,
  };
};
