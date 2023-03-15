export const isAdmin = (userId: string) => {
  const admins = process.env.ADMINS?.split(",");

  if (!admins) return false;

  return admins.includes(userId);
};
