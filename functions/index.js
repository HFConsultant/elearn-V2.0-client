export const imageSource = (user) => {
  return user.image ? user.image.url : "/images/thumbnail.jpg";
};
