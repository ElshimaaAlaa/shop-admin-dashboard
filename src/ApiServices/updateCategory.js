// ApiServices/EditCategoryApi.js
import axios from 'axios';

export const updateCategory = async (categoryId, formData) => {
  try {
    const response = await axios.post(
      `http://demo.localhost:8000/api/shop/categories/update/${categoryId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};