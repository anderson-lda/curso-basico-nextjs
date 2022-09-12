// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  const courses = [
    {id: 1, name: "Next.js com TS"},
    {id: 2, name: "React.js com TS"},
    {id: 3, name: "Node.js com TS"},
    {id: 4, name: "SASS"},
    {id: 5, name: "Styled Components"},
  ];

  return response.json(courses);
}
