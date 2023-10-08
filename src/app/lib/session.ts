import {
  IronSessionOptions,
  getIronSession,
  IronSessionData,
} from "iron-session";

export const sessionOptions: IronSessionOptions = {
  password: "change-this-this-is-not-a-secure-password",
  cookieName: "cookieNameInBrowser",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    firstname?: string;
    lastname?: string;
  }
}

const getSession = async (req: Request, res: Response) => {
  const session = getIronSession(req, res, sessionOptions);
  return session;
};

export { getSession };
