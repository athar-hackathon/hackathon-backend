export const googleCallback = (req: any, res: any) => {
  if (!req.user) return res.redirect("/login-failure");
  return res.header("authorization", req.user.token)
  .json({ email: req.user.email, message: "Login Successful" });

};