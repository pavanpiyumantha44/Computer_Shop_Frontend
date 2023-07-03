import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Table, Pagination, Form } from 'react-bootstrap'


const FullPayment = () => {
    const [display,setDisplay] = useState(false);

    const [paymentType,setPaymentType] = useState(0);
    const [order,setOrder] = useState([]);
  
  
    //Manage Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5; // Number of items to display per page
  
    const filteredData = order.filter((value) =>
    value.cusName.toLowerCase().includes(searchTerm.toLowerCase())||value.nic.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const pageNumbers = [];
  
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrder = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  
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
        axios.get('http://localhost:5000/dashboard/orders/fullPayment')
        .then(res=>{
          console.log(res);
            setOrder(res.data.Result);
        })
        .catch(err=>{
          console.log(err);
        })
      display!==true?setDisplay(true):setDisplay(false);
    },[display])
  
    return (
      <div className='p-3 mx-2'>
        <div className='mt-4 px-5 pt-3'>
              <Card className='shadow-sm'>
                <Card.Header>
                  <div className='row'>
                    <div className='col-8'>
                      <h3>Customer List</h3>
                    </div>
                    <div className='col-4'>
                    <Form>
                        <Form.Control
                          type="text"
                          onChange={handleSearchChange}
                          className="form-control w-100"
                          placeholder="Search Customer..."
                        />
                      </Form>
                    </div>
                  </div>  
                </Card.Header>
                <Card.Body>
                  <Table striped responsive>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>NIC</th>
                      <th>Brand</th>
                      <th>Advance payment</th>
                      <th>Unit Price</th>
                      <th>Total Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrder.map((value, index) => {
                      return(
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{value.cusName}</td>
                        <td>{value.categoryName}</td>
                        <td>{value.brandName}</td>
                        <td className='text-success fw-bold'>{value.advance}</td>
                        <td>{value.unitPrice}</td>
                        <td>{value.totalPrice}</td>
                        <td>
                          <Button variant='danger' onClick={()=>{handleDelete(value.cusID)}}><i className='bi bi-trash'></i></Button>
                        </td>
                      </tr>)
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
    )
}

export default FullPayment