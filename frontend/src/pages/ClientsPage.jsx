import React, { useEffect, useRef } from 'react'; // Import useRef
import { useSelector, useDispatch } from 'react-redux';
import {
  getClients,
  reset,
  exportClients, // 1. Import new actions
  importClients,
} from '../features/clients/clientSlice';
import Spinner from '../components/Spinner';
import ClientForm from '../components/ClientForm';
import ClientItem from '../components/ClientItem';
import { toast } from 'react-toastify';

const ClientsPage = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null); // 2. Create a ref for the file input

  const { clients, isLoading, isError, message } = useSelector(
    (state) => state.clients
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getClients());
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  // 3. Handlers for export and import
  const onExportClick = () => {
    dispatch(exportClients());
  };

  const onImportClick = () => {
    // This clicks the hidden file input
    fileInputRef.current.click();
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file); // 'file' must match the backend (upload.single('file'))
      dispatch(importClients(formData));
    }
  };

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
        <div className="list-header">
          <h2>My Clients</h2>
          {/* 4. Add the Import/Export button group */}
          <div className="btn-group">
            <button className="btn btn-secondary" onClick={onImportClick}>
              Import CSV
            </button>
            <button className="btn btn-secondary" onClick={onExportClick}>
              Export CSV
            </button>
            {/* 5. The hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileChange}
              style={{ display: 'none' }}
              accept=".csv"
            />
          </div>
        </div>

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