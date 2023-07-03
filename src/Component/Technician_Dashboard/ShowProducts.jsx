import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';
import PulseLoader from "react-spinners/PulseLoader";
import {Form, Card, Table, Badge, Pagination } from 'react-bootstrap';
import {CSVLink} from 'react-csv';

const ShowProducts = () => {

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
value.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
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
     <div className='alignment' style={{marginLeft:"46%"}}>
     <PulseLoader color={'#1444e0'} loading={loading} size={15}/>
     </div>  
      :
      <div>
        <div className='px-5 mt-4'>
        <div className='d-flex justify-content-start'>
        <h3>Available Products</h3>
        </div>
        </div>
          <div className='mt-4 px-5 pt-1 mb-5' style={{height:'75vh'}}>
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
                </Card><br/><br/><br/>
          </div>
                <div className='container-fluid px-0 shadow-sm w-100'>
                <div className='row flex-nowrap'>
                <div className='d-flex px-0'>
                    <div className="card card-body text-center text-light bg-dark p-4">
                        <h6 className="card-title"><span>&#169;</span> All Rights Reserved</h6>
                    </div>
                </div>
                </div>
                </div>
      </div>
    }
    </div>
  )
}

export default ShowProducts