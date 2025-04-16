import axios from 'axios';

const API_BASE_URL = 'https://demo.vrtex.duckdns.org/api/shop/promotions/store';
const live_shop_domain = localStorage.getItem('live_shop_domain');
const role = localStorage.getItem('role');

export const addNewPromotion = async (promotionData) => {
  try {
    // Format the items array as required by the API
    const formattedData = new FormData();
    
    // Add basic fields
    formattedData.append('name', promotionData.name_en);
    formattedData.append('name', promotionData.name_ar);
    formattedData.append('total_price', promotionData.total_price);
    formattedData.append('start_date', promotionData.start_date.toISOString());
    formattedData.append('end_date', promotionData.end_date.toISOString());
    
    // Add category if selected
    if (promotionData.category_id) {
      formattedData.append('category_id', promotionData.category_id);
    }
    
    // Add products
    promotionData.items.forEach((item, index) => {
      formattedData.append(`items[${index}][product_id]`, item.product_id);
      formattedData.append(`items[${index}][quantity]`, item.quantity);
    });
    
    const response = await axios.post(API_BASE_URL, formattedData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'live_shop_domain': live_shop_domain,
        'role': role,
      },
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};