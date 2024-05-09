// import { Request, Response } from "express";
// import jwt from "jsonwebtoken"

// // export default async function verifyToken (req: Request, res: Response){
//   // try {    
//   //   const { authorization } = req.headers
//   //   if (authorization){
//   //     const decoded = jwt.verify(authorization?.split(" ")[1], "thisisthekey")
//   //     res.status(200).json({
//   //       valid: true,
//   //       decoded
//   //     })
//   //   }
//   // } catch (error) {
//   //   res.status(404).json({valid: false, error})
//   // }
// // }

// class Middleware {
//   public verifyToken = async (req: Request, res: Response) => {
//     try {    
//       const { authorization } = req.headers
//       if (authorization){
//         const decoded = jwt.verify(authorization?.split(" ")[1], "thisisthekey")
//         res.status(200).json({
//           valid: true,
//           decoded
//         })
//       }
//     } catch (error) {
//       res.status(404).json({valid: false, error})
//     }
//   }
// }

// export default Middleware