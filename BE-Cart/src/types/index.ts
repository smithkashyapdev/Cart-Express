export type JwtPayload = {
  id: string;
  role: string;
  // any other fields
};

// Create a utility type that adds `user` to Request
export type AuthenticatedRequest = Omit<Request, 'user'> & { user: JwtPayload }