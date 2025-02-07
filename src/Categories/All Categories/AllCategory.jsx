import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState, useEffect } from "react";
import { Search, Plus, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteCategory from "../Delete Category/DeleteCategory";
import { ClipLoader } from "react-spinners";

function AllCategory() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const paginationModel = { page: 0, pageSize: 5 };

  // Fetch data from API
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://demo.vrtex.duckdns.org/api/shop/categories",
          {
            headers: {
              Authorization:
                "Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990",
            },
          }
        );

        if (response.status === 200) {
          setCategories(response.data.data);
        }
      } catch (error) {
        setError(true);
        console.error("API call failed: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories(); // Call function to fetch categories
  }, []);

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
    window.location.reload();
  };

  const columns = [
    {
      field: "name",
      headerName: "Category",
      width: 590,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={params.row.image}
            alt={params.row.name}
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              marginRight: 10,
            }}
          />
          <span>{params.row.name}</span>
        </div>
      ),
    },
    { field: "stock", headerName: "Stock", width: 590 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div className="flex items-center gap-1">
          <button
            className="h-6 w-6 p-1 me-2"
            onClick={() => navigate("/EditCategory")}
          >
            <Pencil className="h-4 w-4 text-[#E6A86C]" />
          </button>
          <DeleteCategory
            categoryId={params.row.id}
            id={params.row.id}
            onDelete={handleDeleteCategory}
          />
        </div>
      ),
    },
  ];

  const rows = categories.map((category) => ({
    id: category.id,
    name: category.name,
    stock: category.stock || 0,
    image: category.image || "https://via.placeholder.com/30",
  }));

  // Custom function to apply styles to selected rows
  const getRowClassName = (params) => {
    return params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row";
  };

  return (
    <div className="bg-lightgray p-10 min-h-screen">
      <h1 className="font-bold mb-3 p-2" style={{ fontSize: "20px" }}>
        Categories
      </h1>
      <div className="flex justify-between items-center gap-5 bg-white p-4 rounded-lg">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="font-bold w-full pl-10 pr-4 py-3 bg-muted/50 rounded-xl text-sm focus:outline-none border border-gray-200 bg-lightgray"
          />
        </div>
        <div
          className="flex gap-3 bg-primary text-white font-bold p-3 rounded-xl w-52 cursor-pointer"
          onClick={() => navigate("/addCategory")}
        >
          <div className="bg-white text-primary font-bold rounded ">
            <Plus className="p-1 font-bold" />
          </div>
          <p>Add Category</p>
        </div>
      </div>

      {error ? (
        <div className="text-red-500 text-center mt-10 font-bold">
          Failed to fetch data. Please try again.
        </div>
      ) : isLoading ? (
        <div className="text-gray-600 text-center font-bold mt-10">
          <ClipLoader color="#E0A75E" />
        </div>
      ) : (
        <Paper className="mt-6">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5]}
            checkboxSelection
            sx={{
              border: 0,
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: "#FCEFDB",
              },
              "& .MuiDataGrid-row.Mui-selected:hover": {
                backgroundColor: "#FCEFDB",
              },
              "& .MuiCheckbox-root.Mui-checked": {
                color: "#E0A75E",
              },
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-row:focus": {
                outline: "none",
              },
            }}
            getRowClassName={getRowClassName} // Apply custom row styles
          />
        </Paper>
      )}
    </div>
  );
}
export default AllCategory;