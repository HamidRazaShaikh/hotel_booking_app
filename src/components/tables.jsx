import React from "react";

const Table = ({ data }) => {
  const tableData = {
    Name: data?.name,
    Category: data?.category,
    Description: data?.description,
    Capacity: `${data?.capacity} Adults`,
    Rooms: data?.rooms,
    BathRooms: data?.bathrooms,
    floor: data?.floor,
    contact: data?.manager_contact,
    Rattings: !! data?.reviews.length ? data?.reviews : 'Not available',
    Rent: `$${data?.rent}`,
  };

 
  return (
    <table className ="table table-light table-striped mt-5">
      <tbody>
        {Object.entries(tableData).map((value, key) => {
         
          return (
            <tr key={key}>
              <th scope="row">{value[0]}</th>
              <td colSpan="3">{value[1]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
