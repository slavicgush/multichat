import { Router } from "express";
import checkAuth from "./check-auth.js";
import { createUser,getUser,get30Msgs } from './model.js'

export default function init(logoutWebsocket) {
  const router = Router();
  router.get("/", (request, response) => {
    response.render("login");
  });
  router.post("/login", async (request, response) => {
    const username = request.body.username;
   const pw = request.body.password;
    const user = await getUser({  username: username, password: pw  });
    //console.log(user);
  if (!user || user.length === 0) {
    response.send(`404 User not found! Wrong username or password`);
    return;
  } else {
    request.session.user = `${user[0].username}`;
  }
    response.redirect("/chat");
  });

  router.post('/createaccount', async (req, res) => {
    const formType = req.body.formType;
    if (formType === 'createAccount') {
        // Handle create account request
        const newUsername = req.body.newUsername;
        const newPassword = req.body.newPassword;
        await createUser({ username: newUsername, password: newPassword });
        res.redirect('/');
    } else {
        // Handle other types of requests (if any)
    }
});

  router.get("/chat", checkAuth, async (request, response) => {
    response.render("chat", { user: request.session.user});

  });
  router.get("/logout", (request, response) => {
    logoutWebsocket(request.session.user);
    delete request.session.user;
    response.redirect("/");
  });
  return router;
}
