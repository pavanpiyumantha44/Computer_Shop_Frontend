import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import BillPDF from '../Cashier/Billing/BillPDF'
const DropdownTextarea = () => {
  const billData = {
    id: '1234',
    date: '2023-06-10',
    company: {
      name: 'Your Company',
      address: '123 Company Street',
      city: 'City',
      country: 'Country',
    },
    customer: {
      name: 'John Doe',
      address: '456 Customer Street',
      city: 'City',
      country: 'Country',
    },
    items: [
      { name: 'Item 1', quantity: 2, price: 10 },
      { name: 'Item 2', quantity: 1, price: 20 },
      { name: 'Item 3', quantity: 3, price: 5 },
    ],
  };
  return (
    <div>
      <h1>Helo</h1>
      <PDFDownloadLink document={<BillPDF billData={billData} />} fileName="bill.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Generating PDF...' : 'Download Bill'
        }
      </PDFDownloadLink>
    </div>
  )
}

export default DropdownTextarea