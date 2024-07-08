
// import { Request, Response } from 'expo-router/server';

const API_KEY = process.env.CRYPTO_API_KEY;
// export async function GET(request:Request) {
//     return Response.json({message:'hello from api'})
// }

// export async function GET(request:Request) {
//     const ids:any = request.expoUrl.searchParams.get('ids');
//   const response = await fetch(
//     `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${ids}`,
//     {
//         headers:{
//             'X_CMC_PRO_API_KEY':API_KEY
//         }
//     }
//   )

//   const res = await response.json();
//   return Response.json(res.data);
// }