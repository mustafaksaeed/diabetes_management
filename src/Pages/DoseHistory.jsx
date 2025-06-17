const DoseHistory = () => {
  return (
    <div>
      <h1>Coming Soon</h1>
      <p>This page is under construction.</p>
    </div>
  );
};

export default DoseHistory;

// import React, { useContext } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import DoseContext from "../Contexts/DoseContext";

// const DoseHistory = () => {
//   const { doses } = useContext(DoseContext);
//   return (
//     <div>
//       <div>
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="right">dose&nbsp;(mmol)</TableCell>
//                 <TableCell align="right">date</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {doses.reverse()
//                 ? doses.map((dose, key) => (
//                     <TableRow
//                       key={key}
//                       sx={{
//                         "&:last-child td, &:last-child th": { border: 0 },
//                       }}
//                     >
//                       <TableCell
//                         style={{
//                           color:
//                             dose.dose > 4.0 && dose.dose < 10.0
//                               ? "green"
//                               : "red",
//                         }}
//                         component="th"
//                         scope="row"
//                       >
//                         {dose.dose}
//                       </TableCell>
//                       <TableCell align="right">
//                         {dose.date.toString()}
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 : "empty"}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     </div>
//   );
// };

// export default DoseHistory;
