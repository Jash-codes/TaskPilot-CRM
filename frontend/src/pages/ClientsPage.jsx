import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClients, reset } from '../features/clients/clientSlice';
import Spinner from '../components/Spinner';
import ClientForm from '../components/ClientForm';
import ClientItem from '../components/ClientItem';
import { toast } from 'react-toastify';

const ClientsPage = () => {
  const dispatch = useDispatch();
  
  // Get all state from Redux
  const { clients, isLoading, isError, message } = useSelector(
    (state) => state.clients
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Fetch clients on page load
    dispatch(getClients());

    // Reset state on component unmount
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page-layout">
      {/* Column 1: The Form */}
      <section className="form-column">
        <ClientForm />
      </section>

      {/* Column 2: The List */}
      <section className="list-column">
        <h2>My Clients</h2>
        {clients.length > 0 ? (
          <div className="item-list">
            {clients.map((client) => (
              <ClientItem key={client._id} client={client} />
            ))}
          </div>
        ) : (
          <p>You haven't added any clients yet. Add one to get started!</p>
        )}
      </section>
    </div>
  );
};

export default ClientsPage;