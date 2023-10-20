import { NextResponse, NextRequest } from "next/server";
import * as jwt from 'jsonwebtoken';
import emailValidation from '@/helpers/emailValidation';
import passwordValidation from '@/helpers/passValidation';

export async function POST(
  req: NextRequest,
  res: NextResponse
) { 
  const { email, password } = await req.json();

  // Validate email format
  if (!emailValidation(email)) {
    return NextResponse.json(
      {
        message: "Invalid email format"
      }, {
        status: 401,
      });
  }

  // Validate password format
  if (!passwordValidation(password)) {
    return NextResponse.json(
      {
        message: "Invalid password format"
      }, {
        status: 401,
      });
  }

  const secretKey = 'TestProject';
  
  if (email === 'demo@gmail.com' && password === 'Test!2password') {
    const jwtToken = jwt.sign({ email, password }, secretKey, { expiresIn: '12h' });

    return NextResponse.json(
      {
        jwtToken,
        message: "Successfully authenticated"
      }, {
        status: 200,
      });
  } else {
    return NextResponse.json(
      {
        message: "Wrong email or password"
      }, {
        status: 401,
      });
  }
}
