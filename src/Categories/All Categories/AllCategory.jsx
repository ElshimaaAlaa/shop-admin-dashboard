import axios from "axios";
import React, { useEffect, useState } from "react";

function AllCategory() {
  const [AllCategory, setAllCategory] = useState([]);
  // Fetch data from API
  useEffect(() => {
    const AllCategory = async () => {
      try {
        const response = await axios({
          url: "https://demo.vrtex.duckdns.org/api/categories",
          method: "GET",
          headers: {
            Authorization:
              "Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990",
          },
        });
        if (response.status === 200) {
          console.log(response.data);
        }
      } catch (error) {}
    };
    AllCategory();
  }, []);
  return <div>AllCategory</div>;
}

export default AllCategory;
