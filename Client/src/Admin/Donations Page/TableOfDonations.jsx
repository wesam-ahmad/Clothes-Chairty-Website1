
import { useEffect, useState } from "react";
import axios from "axios";

export const TableOfDonations = () => {
  const [donations, setDonations] = useState([]);
 
  
  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/activeDonations")
      .then((response) => {
        setDonations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

 
  
  const tableRows = donations.map((donation) => {
    return (
      <tr key={donation._id} className="border-b ">
        <th
          scope="row"
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
        >
          {donation.name}
        </th>
        <td className="px-4 py-3">{donation.email}</td>
        <td className="px-4 py-3">{donation.phone}</td>
        <td className="px-4 py-3">{donation.address}</td>
        <td className="px-4 py-3">{donation.order_status}</td>
        <td className="px-4 py-3">{donation.number_pieces}</td>
        <td className="px-4 py-3">{donation.type}</td>
        <td className="px-4 py-3">{donation.description}</td>

       
      </tr>
    );
  });

  return (
    <section className="w-full  mt-5 ">
      <div className="">
        <h1 className="text-[30px] font-bold py-3">التبرعات</h1>
        {/* Start coding here */}
        <div className="bg-white  relative shadow-md sm:rounded-2xl overflow-scroll max-h-[300px]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right text-gray-500  table-zebra">
              <thead className="text-xs text-white uppercase bg-teal-600 ">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    اسم المتبرع
                  </th>
                  <th scope="col" className="px-4 py-3">
                    الإيميل
                  </th>
                  <th scope="col" className="px-4 py-3">
                    رقم الهاتف
                  </th>
                  <th scope="col" className="px-4 py-3">
                    العنوان
                  </th>
                  <th scope="col" className="px-4 py-3">
                    حالة التبرع
                  </th>
                  <th scope="col" className="px-4 py-3">
                    عدد القطع
                  </th>
                  <th scope="col" className="px-4 py-3">
                    النوع
                  </th>
                  <th scope="col" className="px-4 py-3">
                    وصف
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.length === 0 ? (
                  <div className="p-3 text-lg">لا يوجد تبرعات</div>
                ) : (
                  tableRows
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
