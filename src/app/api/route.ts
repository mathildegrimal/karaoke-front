import { NextApiRequest } from "next";
import { getSession } from "../lib/session";

export async function POST(request: Request, response: Response): Promise<any> {
  try {
    const requestBody = await request.json();
    const { firstname, lastname }: { firstname: string; lastname: string } =
      requestBody;
    const response = new Response();
    const session = await getSession(request, response);
    session.firstname = firstname;
    session.lastname = lastname;

    await session.save();
    return response;
  } catch (error: unknown) {
    console.error((error as Error).message);
    return new Response(JSON.stringify({ message: (error as Error).message }), {
      status: 500,
    });
  }
}

export async function GET(request: Request, response: Response): Promise<any> {
  try {
    const session = await getSession(request, response);
    const lastname = session.lastname || "unknown lastname";
    const firstname = session.firstname || "unknown firstname";
    return Response.json({ lastname, firstname });
  } catch (error: unknown) {
    console.error((error as Error).message);
    return new Response(JSON.stringify({ message: (error as Error).message }), {
      status: 500,
    });
  }
}
// const mockUsers = [
//   {
//     name: "mathilde",
//   },
// ];

// export default withSessionRoute(async function handler(req: any, res: any) {
//   switch (req.method) {
//     case "POST":
//       const { name } = req.body;
//       const loggedInUsername = mockUsers.find((user) => user.name === name);

//       if (!loggedInUsername) {
//         res.status(404).send("Can't find the user");
//         break;
//       }

//       req.session.username = loggedInUsername.name;
//       await req.session.save();

//       res.status(200).send("Found the user");
//       break;
//     default:
//       res.status(405).end(`${req.method} Not Allowed`);
//       break;
//   }
// });
