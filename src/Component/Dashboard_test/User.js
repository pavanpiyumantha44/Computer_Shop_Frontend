import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const User = () => {
  return (
    <>
    <div className="row">
    <div className="col-lg-3">
    <div className={"w-auto position-fixed"}>
            <Sidebar/>
        <div className='col overflow-auto'>
            <Navbar
              toggle = {true}
            />
        </div>
    </div>
    </div>
      <div className="col-lg-9">
    <div className="p-5 bg-light">
      <div className="bg-white rounded p-4 shadow">
        <h2>User Detials</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
    </>
  );
};

export default User;
