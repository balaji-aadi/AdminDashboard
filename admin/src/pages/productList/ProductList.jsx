import "./productList.css";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { deleteProducts, getProducts } from "../../redux/apiCalls";


export default function ProductList() {

  const dispatch = useDispatch()
  const products = useSelector(state => state.product.products)


  useEffect(() => {
    getProducts(dispatch)
  },[dispatch])

  const handleDelete = (id) => {
    deleteProducts(id,dispatch)
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "product",
      headerName: "Product",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={`../upload/${params.row.img}`} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: 'inStock', headerName: "Stock", width: 100 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)} // delete method all by id
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={row => row._id} //adding row id because all rows have unique id
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
