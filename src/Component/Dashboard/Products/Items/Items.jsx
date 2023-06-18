import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';
import PulseLoader from "react-spinners/PulseLoader";
import {Form, Card, Table, Badge, Pagination } from 'react-bootstrap';
import {CSVLink} from 'react-csv';

const Item = () => {

    const[items,setItems] = useState([]);
    const[loading,setLoading] = useState(true);
    const[search,setSearch] = useState('');
    const [display,setDisplay] = useState(false);
    const navigate = useNavigate();

    var filename = `Item_list_${new Date().toLocaleDateString()+'_'+new Date().toLocaleTimeString()}`;

//Manage Pagination
const [currentPage, setCurrentPage] = useState(1);
const [searchTerm, setSearchTerm] = useState('');
const itemsPerPage = 5; // Number of items to display per page

const filteredData = items.filter((value) =>
value.name.toLowerCase().includes(searchTerm.toLowerCase())
);
const totalPages = Math.ceil(filteredData.length / itemsPerPage);
const pageNumbers = [];

for (let i = 1; i <= totalPages; i++) {
pageNumbers.push(i);
}

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

// Change page
const handlePageChange = (pageNumber) => {
setCurrentPage(pageNumber);
};

// Handle search input change
const handleSearchChange = (e) => {
setSearchTerm(e.target.value);
setCurrentPage(1); // Reset to first page when search term changes
};


    useEffect(()=>{
      axios.get('http://localhost:5000/dashboard/items')
      .then(res=>{
        console.log(res);
        setItems(res.data.Result);
        setLoading(false);
      })
      .catch(err=>{
        console.log(err);
      })
    },[display])

  const hanldeDelete = (id)=>{
    axios.delete('http://localhost:5000/dashboard/items/delete/'+id)
    .then(res=>{
      console.log(res);
        if(res.data.Status=="Success")
        {
              toast.success("Deleted successfully!!");
              if(!display)
              {
                setDisplay(true);
              }
              else{
                setDisplay(false);
              }
        }
    })
    .catch(err=>{
        console.log(err);
    })
  }

  return (  
    <div>
      <ToastContainer
        position='top-center'
        draggable={false}
        autoClose={1000}
      />
    {loading?
      <div className='alignment'>
      <PulseLoader color={'#1444e0'} loading={loading} size={15}/>
      </div>  
      :
      <div>
        <div className='px-5 mt-5'>
        <div className='d-flex justify-content-end'>
        <CSVLink data={items} filename={filename} onClick={()=>{toast.success("Downloaded Successfully!!")}} className='btn btn-success mx-3'><i className="bi bi-file-earmark-spreadsheet mx-2"></i>Export to Excel</CSVLink>
          <Link to='/dashboard/items/create/' className='btn btn-primary'>Add New<i className="bi bi-plus-square mx-2"></i></Link>
        </div>
        </div>
          <div className='mt-4 px-5 pt-3'>
                <Card className='shadow-sm'>
                  <Card.Header>
                    <div className='row'>
                      <div className='col-md-8'>
                        <h3>Items</h3>
                      </div>
                      <div className='col-md-4'>
                      <Form>
                      <Form.Control
                        type="text"
                        onChange={handleSearchChange}
                        className="form-control w-100"
                        placeholder="Search Item..."
                      />
                    </Form>
                      </div>
                    </div>  
                  </Card.Header>
                  <Card.Body>
                    <Table striped>
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Quantitiy</th>
                          <th>Unit Price</th>
                          <th>Status</th>
                          <th colSpan={2} className='text-center'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                      {currentItems.map((values,index)=>{
                        return(
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{<img src={`http://localhost:5000/images/${values.image}`} style={{width:"50px"}}/>}</td>
                          <td>{values.name}</td>
                          <td>{values.description}</td>
                          <td>{values.qty}</td>
                          <td>{values.unitPrice}</td>
                          <td>{values.status==="Available"?<Badge bg="success">{values.status}</Badge>:<Badge bg="danger">{values.status}</Badge>}</td>
                          <td>
                            <Link to={"/dashboard/items/read/"+values.itemID} className='btn btn-primary mx-2' title='edit'><i className='bi bi-pencil'></i></Link>
                          </td>
                          <td>
                          <button className='btn btn-danger' title='delete' onClick={()=>hanldeDelete(values.itemID)}><i className='bi bi-trash'></i></button>
                          </td>
                        </tr>
                        )
                        })}
                        </tbody>
                    </Table>
                    <Pagination>
                <Pagination.First onClick={() => handlePageChange(1)} />
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {pageNumbers.map((pageNumber) => (
                  <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === currentPage}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} />
                    </Pagination>
                  </Card.Body>
                </Card>
          </div>
      </div>
    }
    </div>
  )
}

export default Item