import { User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const setUserHeaders = (res: NextResponse, user: User) => {
  res.headers.set('subject', user?.user_metadata['subject']);
  res.headers.set('board', user?.user_metadata['board']);
  res.headers.set('state_board', user?.user_metadata['state_board']);
}

export const getUserHeaders = (req: NextRequest) => {
  const subject = req.headers.get('subject') || "";
  const board = req.headers.get('board') || "";
  const state_board = req.headers.get('state_board') || "";

  console.log('user headers -- ', { subject, board, state_board });

  return {
    subject,
    board,
    state_board
  }
}
