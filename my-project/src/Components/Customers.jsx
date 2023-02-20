import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await axios.get("/customersdata");
      setCustomers(data.data);
      console.log(data);
    };

    fetchCustomers();
  }, []);
  console.log(customers);

  // const jsonObj = JSON.stringify(customers);
  // console.log(jsonObj);

  return (
    <div className="">
      <div className="flex justify-center items-center mt-10 ">
        <table className="">
          <thead className="">
            <tr>
              <th className="bg-blue-100 border border-blue-400 text-left px-8 py-4">
                Name
              </th>
              <th className="bg-blue-100 border border-blue-400 text-left px-8 py-4">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {
              customers.map((customer) => {
                return (
                  <tr key={customer._id} className="border  ">
                    <Link
                      to={`/customer/${customer._id}`}
                      className=""
                    >
                      <td className="px-8 py-4">{customer.name}</td>
                    </Link>
                    <td className="border px-8 py-4">{customer.email}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
