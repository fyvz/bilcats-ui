import api from "@/lib/axios";

export const profileView = async (username: string) => {
  try{
    const res = await api.get(`/profile/${username}`);
    return  res.data;
  } catch (err:any) {
    const message = err.response?.data?.message || "Failed to get profile"
    throw new Error(message)
  }
};

export const profileEdit = async ({
  username,
  avatar,
  description
}: { username: string; avatar: Number | string; description: string }) => {
  try {
    const res = await api.put(`/profile/${username}`, { avatar, description });
    return res.data;
  } catch (err: any) {
    const message = err.response?.data?.message || "Failed to edit profile";
    throw new Error(message);
  }
};