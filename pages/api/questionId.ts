import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { QuestionType } from '../../types';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const response = await axios.get<QuestionType>(`${process.env.NEXT_PUBLIC_BACKEND_URL}question/${id}/`);
    const question: QuestionType = response.data;
    console.log(question)
    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch question details' });
  }
}
