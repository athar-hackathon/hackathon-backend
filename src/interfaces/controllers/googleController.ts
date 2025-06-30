export const googleCallback = (req: any, res: any) => {
  if (!req.user) return res.redirect("/login-failure");
  return res.header("authorization", req.user.token)
  .json({ data: {email: req.user.email}, message: "Login Successful" });

};