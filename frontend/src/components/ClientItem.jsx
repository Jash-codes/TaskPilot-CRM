import React from 'react';

const ClientItem = ({ client }) => {
  return (
    <div className="item-card">
      <div className="item-card-header">
        <h3>{client.name}</h3>
        {/* We will add Edit/Delete buttons here later */}
      </div>
      <div className="item-card-body">
        <p><strong>Email:</strong> {client.email}</p>
        {client.phone && <p><strong>Phone:</strong> {client.phone}</p>}
        {client.company && <p><strong>Company:</strong> {client.company}</p>}
        {client.notes && <p><strong>Notes:</strong> {client.notes}</p>}
      </div>
    </div>
  );
};

export default ClientItem;