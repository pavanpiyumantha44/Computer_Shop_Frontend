// import React, { useState } from 'react';
// import {Form, Table, Pagination, Card } from 'react-bootstrap';
// function DropdownTextarea() {
// //   const [dropdownValue, setDropdownValue] = useState('');
// //   const [inputValue, setInputValue] = useState('');
// //   const [textareaValue, setTextareaValue] = useState('');

// //   const handleDropdownChange = (event) => {
// //     setDropdownValue(event.target.value);
// //   };

// //   const handleInputChange = (event) => {
// //     setInputValue(event.target.value);
// //   };

// //   const handleInsertClick = () => {
// //     setTextareaValue((prevTextareaValue) =>
// //       prevTextareaValue + dropdownValue + ' ' + inputValue + '\n'
// //     );
// //     setDropdownValue('');
// //     setInputValue('');
// //   };

// //   return (
// //     <div>
// //       <label>
// //         Dropdown:
// //         <select value={dropdownValue} onChange={handleDropdownChange}>
// //           <option value="">Select an option</option>
// //           <option value="Option 1">Option 1</option>
// //           <option value="Option 2">Option 2</option>
// //           <option value="Option 3">Option 3</option>
// //         </select>
// //       </label>
// //       <br />
// //       <label>
// //         Input Box:
// //         <input type="text" value={inputValue} onChange={handleInputChange} />
// //       </label>
// //       <br />
// //       <button onClick={handleInsertClick}>Insert into Textarea</button>
// //       <br />
// //       <label>
// //         Textarea:
// //         <textarea value={textareaValue} readOnly />
// //       </label>
// //     </div>
// //   );
// // }
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 3; // Number of items to display per page
//   const[search,setSearch] = useState('');
//   // Sample data for the table
//   const tableData = [
//     { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
//     { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
//     { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 4, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 5, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 6, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 7, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 8, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 9, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 10, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 11, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 12, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 13, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 14, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 15, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 16, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     // Add more data as needed
//   ];

//   // Logic to calculate pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div>
//       <Card>
//       <Card.Header>
//         Data List
//         <div className="row">
//                   <div className="col-md-8">
//                     <h3>Orders</h3>
//                   </div>
//                   <div className="col-md-4">
//                     <Form>
//                       <Form.Control
//                         type="text"
//                         onChange={(e) => {
//                           setSearch(e.target.value);
//                         }}
//                         className="form-control w-100"
//                         placeholder="Search Brand..."
//                       />
//                     </Form>
//                   </div>
//                 </div>
//       </Card.Header>
//       <Card.Body>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.filter((item) => {
//                         return search.toLowerCase() === ""
//                           ? item
//                           : item.name.toLowerCase().includes(search);
//                       }).map((item) => (
//             <tr key={item.id}>
//               <td>{item.id}</td>
//               <td>{item.name}</td>
//               <td>{item.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Pagination>
//         {Array.from({ length: Math.ceil(tableData.length / itemsPerPage) }).map((_, index) => (
//           <Pagination.Item
//             key={index + 1}
//             active={index + 1 === currentPage}
//             onClick={() => handlePageChange(index + 1)}
//           >
//             {index + 1}
//           </Pagination.Item>
//         ))}
//       </Pagination>
//       </Card.Body>
//       </Card>
//     </div>
//   );
// };


// export default DropdownTextarea;
// import React, { useState } from 'react';
// import { Table, Pagination, Form, Card } from 'react-bootstrap';

// const TableWithPaginationAndSearch = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const itemsPerPage = 5; // Number of items to display per page

//   // Sample data for the table
//   const tableData = [
//     { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
//     { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
//     { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 4, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 5, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 6, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 7, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 8, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 9, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 10, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 11, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 12, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 13, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 14, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
//     { id: 15, name: 'Anjana Johnson', email: 'mike.johnson@example.com' },
//     { id: 16, name: 'Kavishka Johnson', email: 'mike.johnson@example.com' }
//   ];

//   // Logic to calculate pagination
//   const filteredData = tableData.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const pageNumbers = [];

//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1); // Reset to first page when search term changes
//   };

//   return (
//     <div>
//       <div className="mt-4 px-5 pt-3">
//       <Card>
//       <Card.Header>
//       <Form.Group controlId="searchForm">
//         <Form.Control
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
        
//       </Form.Group>
//       </Card.Header>
//       <Card.Body>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map((item) => (
//             <tr key={item.id}>
//               <td>{item.id}</td>
//               <td>{item.name}</td>
//               <td>{item.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     <Card.Footer>
//       <Pagination>
//         <Pagination.First onClick={() => handlePageChange(1)} />
//         <Pagination.Prev
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         />

//         {pageNumbers.map((pageNumber) => (
//           <Pagination.Item
//             key={pageNumber}
//             active={pageNumber === currentPage}
//             onClick={() => handlePageChange(pageNumber)}
//           >
//             {pageNumber}
//           </Pagination.Item>
//         ))}

//         <Pagination.Next
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         />
//         <Pagination.Last onClick={() => handlePageChange(totalPages)} />
//       </Pagination>
//       </Card.Footer>
//       </Card.Body>
//       </Card>
//       </div>
//     </div>
//   );
// };

// export default TableWithPaginationAndSearch;
import React, { useState } from 'react';
import { Button, Col, Container, Row, Sidebar, Nav } from 'react-bootstrap';

const SidebarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Button variant="primary" onClick={toggleSidebar}>
            Toggle Sidebar
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
            <Nav>
              <Nav.Item>
                <Nav.Link href="#home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#about">About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#services">Services</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#contact">Contact</Nav.Link>
              </Nav.Item>
            </Nav>
        </Col>
        <Col md={9}>
          <div>Main Content Area</div>
        </Col>
      </Row>
    </Container>
  );
};

export default SidebarComponent;

