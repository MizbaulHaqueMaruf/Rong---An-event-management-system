import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { get_seller_payments } from "../../store/Reducers/PaymentReducer";

const Payment = () => {
  const dispatch = useDispatch();
  const { sellerPayments } = useSelector((state) => state.payment);
  const { userInfo } = useSelector((state) => state.auth);
  console.log(sellerPayments);

  // useEffect(() => {
  //   dispatch(get_seller_payments(userInfo._id));
  // }, []);

  // Fetch seller payments on component mount
  useEffect(() => {
    // Assuming you have the sellerId available in your component's state or props
    const sellerId = userInfo._id; // Replace with actual sellerId
    dispatch(get_seller_payments(sellerId));
  }, [dispatch]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Transaction Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Amount
                </th>
                <th scope="col" className="py-3 px-4">
                  Number of Tickets
                </th>
                <th scope="col" className="py-3 px-4">
                  Event Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Customer Id
                </th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {sellerPayments.map((payment, index) => (
                <tr key={index}>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    {payment.transactionId}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    BDT {payment.amount}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    {payment.numberOfTickets}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    {payment.eventId}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    {payment.customerId}
                  </td>
                  {/* Add more columns as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payment;

// import React, { forwardRef, useEffect, useState } from "react";
// import { BsCurrencyDollar } from "react-icons/bs";
// import toast from "react-hot-toast";
// import moment from "moment";
// import { FixedSizeList as List } from "react-window";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   get_seller_payemt_details,
//   send_withdrowal_request,
//   messageClear,
// } from "../../store/Reducers/PaymentReducer";
// function handleOnWheel({ deltaY }) {
//   console.log("handleOnWheel", deltaY);
// }

// const outerElementType = forwardRef((props, ref) => (
//   <div ref={ref} onWheel={handleOnWheel} {...props} />
// ));

// const Payments = () => {
//   const [amount, setAmount] = useState(0);
//   const dispatch = useDispatch();
//   const { userInfo } = useSelector((state) => state.auth);
//   const {
//     successMessage,
//     errorMessage,
//     loader,
//     pendingWithdrows,
//     successWithdrows,
//     totalAmount,
//     withdrowAmount,
//     pendingAmount,
//     availableAmount,
//     sellerPayments
//   } = useSelector((state) => state.payment);

//   const Row = ({ index, style }) => {
//     return (
//       <div style={style} className="flex text-sm">
//         <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
//         <div className="w-[25%] p-2 whitespace-nowrap">
//           ${pendingWithdrows[index]?.amount}
//         </div>
//         <div className="w-[25%] p-2 whitespace-nowrap">
//           <span className="py-[1px] px-[5px] bg-slate-700 text-blue-500 rounded-md text-xs">
//             {pendingWithdrows[index]?.status}
//           </span>
//         </div>
//         <div className="w-[25%] p-2 whitespace-nowrap">
//           {moment(pendingWithdrows[index]?.createdAt).format("LL")}
//         </div>
//       </div>
//     );
//   };

//   const Rows = ({ index, style }) => {
//     return (
//       <div style={style} className="flex text-sm">
//         <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
//         <div className="w-[25%] p-2 whitespace-nowrap">
//           ${successWithdrows[index]?.amount}
//         </div>
//         <div className="w-[25%] p-2 whitespace-nowrap">
//           <span className="py-[1px] px-[5px] bg-slate-700 text-blue-500 rounded-md text-xs">
//             {successWithdrows[index]?.status}
//           </span>
//         </div>
//         <div className="w-[25%] p-2 whitespace-nowrap">
//           {moment(successWithdrows[index]?.createdAt).format("LL")}
//         </div>
//       </div>
//     );
//   };

//   useEffect(() => {
//     dispatch(get_seller_payemt_details(userInfo._id));
//   }, []);

//   useEffect(() => {
//     if (successMessage) {
//       toast.success(successMessage);
//       dispatch(messageClear());
//     }
//     if (errorMessage) {
//       toast.error(errorMessage);
//       dispatch(messageClear());
//     }
//   }, [errorMessage, successMessage]);

//   const sendRequest = (e) => {
//     e.preventDefault();
//     console.log(availableAmount - amount);
//     if (availableAmount - amount > 10) {
//       dispatch(send_withdrowal_request({ amount, sellerId: userInfo._id }));
//       setAmount(0);
//     } else {
//       toast.error("insufficient balance");
//     }
//   };
//   return (
//     <div className="px-2 md:px-7 py-5">
//       {/* <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
//         <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
//           <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
//             <h2 className="text-lg font-bold">${totalAmount}</h2>
//             <span className="text-sm font-normal">Total Sales</span>
//           </div>
//           <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
//             <BsCurrencyDollar className="text-[#28c76f] shadow-lg" />
//           </div>
//         </div>
//         <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
//           <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
//             <h2 className="text-lg font-bold">${availableAmount}</h2>
//             <span className="text-sm font-normal">Avaiable Amount</span>
//           </div>
//           <div className="w-[46px] h-[47px] rounded-full bg-[#e000e81f] flex justify-center items-center text-xl">
//             <BsCurrencyDollar className="text-[#cd00e8] shadow-lg" />
//           </div>
//         </div>
//         <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
//           <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
//             <h2 className="text-lg font-bold">${withdrowAmount}</h2>
//             <span className="text-sm font-normal">Withdrawal Amount</span>
//           </div>
//           <div className="w-[46px] h-[47px] rounded-full bg-[#00cfe81f] flex justify-center items-center text-xl">
//             <BsCurrencyDollar className="text-[#00cfe8] shadow-lg" />
//           </div>
//         </div>
//         <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
//           <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
//             <h2 className="text-lg font-bold">${pendingAmount}</h2>
//             <span className="text-sm font-normal">Pending amount</span>
//           </div>
//           <div className="w-[46px] h-[47px] rounded-full bg-[#7367f01f] flex justify-center items-center text-xl">
//             <BsCurrencyDollar className="text-[#7367f0] shadow-lg" />
//           </div>
//         </div>
//       </div> */}
//       <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
//         {/* <div className="bg-[#283046]  text-[#d0d2d6] rounded-md p-5">
//           <h2 className="text-lg">Send withdrawal Request</h2>
//           <div className="py-5">
//             <form onSubmit={sendRequest}>
//               <div className="flex gap-3 flex-wrap">
//                 <input
//                   onChange={(e) => setAmount(e.target.value)}
//                   required
//                   value={amount}
//                   min="0"
//                   type="number"
//                   className="px-3 md:w-[79%] py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
//                   name="amount"
//                 />
//                 <button
//                   disabled={loader}
//                   className="bg-indigo-500 hover:shadow-indigo-500/50 hover:shadow-lg text-white rounded-sm px-4 py-2 text-sm "
//                 >
//                   {loader ? "loading.." : "Submit"}
//                 </button>
//               </div>
//             </form>
//           </div>
//           <div>
//             <h2 className="text-lg pb-4">Pending withdrawal request</h2>
//             <div className="w-full overflow-x-auto">
//               <div className="flex bg-[#161d31] uppercase text-xs min-w-[340px]">
//                 <div className="w-[25%] p-2">No</div>
//                 <div className="w-[25%] p-2">Amount</div>
//                 <div className="w-[25%] p-2">status</div>
//                 <div className="w-[25%] p-2">date</div>
//               </div>
//               {
//                 <List
//                   style={{ minWidth: "340px", overflowX: "hidden" }}
//                   className="List"
//                   height={350}
//                   itemCount={pendingWithdrows.length}
//                   itemSize={35}
//                   outerElementType={outerElementType}
//                 >
//                   {Row}
//                 </List>
//               }
//             </div>
//           </div>
//         </div> */}
//         <div className="bg-[#283046]  text-[#d0d2d6] rounded-md p-5">
//           <div>
//             <h2 className="text-lg pb-4">Success Withdrawal</h2>
//             <div className="w-full overflow-x-auto">
//               <div className="flex bg-[#161d31] uppercase text-xs min-w-[340px]">
//                 <div className="w-[25%] p-2">Transaction Id</div>
//                 <div className="w-[25%] p-2">Amount</div>
//                 <div className="w-[25%] p-2">Number of Tickets</div>
//                 <div className="w-[25%] p-2">date</div>
//               </div>
//               {
//                 <List
//                   style={{ minWidth: "340px", overflowX: "hidden" }}
//                   className="List"
//                   height={350}
//                   itemCount={successWithdrows.length}
//                   itemSize={35}
//                   outerElementType={outerElementType}
//                 >
//                   {Rows}
//                 </List>
//               }
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payments;
