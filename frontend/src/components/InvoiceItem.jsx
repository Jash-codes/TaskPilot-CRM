import React from 'react';
import { useDispatch } from 'react-redux';
import { updateInvoice } from '../features/invoices/invoiceSlice';
import { toast } from 'react-toastify';

const InvoiceItem = ({ invoice }) => {
  const dispatch = useDispatch();

  const handleMarkAsPaid = () => {
    dispatch(updateInvoice({ id: invoice._id, status: 'Paid' }));
    toast.success('Invoice marked as paid!');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="item-card invoice-card">
      <div className="item-card-header">
        <div>
          <h3>Invoice #{invoice.invoiceNumber}</h3>
          <small>Project: {invoice.project?.title || 'N/A'}</small>
        </div>
        <span className={`status-badge status-${invoice.status.toLowerCase()}`}>
          {invoice.status}
        </span>
      </div>
      <div className="item-card-body">
        <p><strong>Client:</strong> {invoice.client?.name || 'N/A'}</p>
        <p><strong>Amount:</strong> ${invoice.totalAmount.toLocaleString()}</p>
        <p><strong>Due Date:</strong> {formatDate(invoice.dueDate)}</p>
      </div>
      <div className="item-card-footer">
        {invoice.status === 'Pending' && (
          <button onClick={handleMarkAsPaid} className="btn btn-small">
            Mark as Paid
          </button>
        )}
        {/* We can add a 'View' button here later */}
      </div>
    </div>
  );
};

export default InvoiceItem;