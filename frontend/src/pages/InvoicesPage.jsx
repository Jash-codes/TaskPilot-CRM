import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInvoices, reset } from '../features/invoices/invoiceSlice';
import Spinner from '../components/Spinner';
import InvoiceItem from '../components/InvoiceItem';
import InvoiceForm from '../components/InvoiceForm'; // 1. Import form
import { toast } from 'react-toastify';

const InvoicesPage = () => {
  const dispatch = useDispatch();

  const { invoices, isLoading, isError, message } = useSelector(
    (state) => state.invoices
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getInvoices());
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    // 2. Use the two-column layout
    <div className="page-layout">
      {/* Column 1: The Form */}
      <section className="form-column">
        <InvoiceForm />
      </section>

      {/* Column 2: The List */}
      <section className="list-column">
        <h2>My Invoices</h2>
        {invoices.length > 0 ? (
          <div className="item-list">
            {invoices.map((invoice) => (
              <InvoiceItem key={invoice._id} invoice={invoice} />
            ))}
          </div>
        ) : (
          <p>You haven't created any invoices yet.</p>
        )}
      </section>
    </div>
  );
};

export default InvoicesPage;