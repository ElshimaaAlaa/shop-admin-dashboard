import axios from 'axios';

export const setupStore = async (formData) => {
  try {
    // For debugging - log form data contents
    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value instanceof File ? value.name : value);
    }

    const response = await axios.post(
      'https://demo.vrtex.duckdns.org/api/shop/setup-store',
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    let errorMessage = 'Failed to setup store';
    
    if (error.response) {
      if (error.response.status === 422) {
        const errors = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
          .join('\n');
        errorMessage = `Validation errors:\n${errors}`;
      } else {
        errorMessage = error.response.data.message || errorMessage;
      }
    } else if (error.request) {
      errorMessage = 'No response received from server';
    } else {
      errorMessage = error.message || errorMessage;
    }

    throw new Error(errorMessage);
  }
};