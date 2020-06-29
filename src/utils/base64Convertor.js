export default async (file) => {
  try {
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
      reader.onerror = reject;
    });
    return dataUrl;
  } catch (error) {
    console.error(error);
    return error;
  }
};
