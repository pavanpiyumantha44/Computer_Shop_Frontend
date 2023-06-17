import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card,Form,Table,Badge, Button, Pagination } from 'react-bootstrap';
import { toast,ToastContainer } from 'react-toastify';
import PulseLoader from "react-spinners/PulseLoader";
import axios from 'axios';

const Category = () => {
    const [category,setCategory] = useState([]);
    const[loading,setLoading] = useState(true);
    const[search,setSearch] = useState('');
    const [display,setDisplay] = useState(false);

    //Manage Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5; // Number of items to display per page

    const filteredData = category.filter((value) =>
    value.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategory = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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
        axios.get('http://localhost:5000/dashboard/category')
        .then(res=>{
          console.log(res);
          setCategory(res.data.Result);
          setLoading(false);
        })
        .catch(err=>{
          console.log(err);
        })
      },[display])
  
    const hanldeDelete = (id)=>{
      axios.delete('http://localhost:5000/dashboard/category/delete/'+id)
      .then(res=>{
        console.log(res);
          if(res.data.Status==="Success")
          {
                toast.success("Deleted successfully!!");
                if(!display){

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
    <>
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
            <Link to='/dashboard/category/' className='btn btn-success mx-5'><i class="bi bi-file-earmark-spreadsheet mx-2"></i>Export to Excel</Link>
          <Link to='/dashboard/category/add' className='btn btn-primary'>Add New<i class="bi bi-plus-square mx-2"></i></Link>
            </div>
        </div>
        <div className='mt-4 px-5 pt-3'>
                <Card className='shadow-sm'>
                  <Card.Header>
                    <div className='row'>
                      <div className='col-md-8'>
                        <h3>Category List</h3>
                      </div>
                      <div className='col-md-4'>
                      <Form>
                      <Form.Control
                        type="text"
                        onChange={handleSearchChange}
                        className="form-control w-100"
                        placeholder="Search Category..."
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
                          <th>Name</th>
                          <th>Status</th>
                          <th>Created Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                      {currentCategory.map((values,index)=>{
                        return(
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{values.name}</td>
                          <td>{values.status==="Available"?<Badge bg="success">{values.status}</Badge>:<Badge bg="danger">{values.status}</Badge>}</td>
                          <td>{values.created_date.replace('T',' - ').substr(0,21)}</td>
                          <td>
                            <Link to={"/dashboard/category/read/"+values.cID} className='btn btn-primary mx-2' title='edit'><i className='bi bi-pencil'></i></Link>
                            <Button variant='danger' title='delete' onClick={()=>hanldeDelete(values.cID)}><i className='bi bi-trash'></i></Button>
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
    </>
  )
}

export default Category;