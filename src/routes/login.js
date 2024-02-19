import cookieParser from "cookie-parser";
import express from "express";
import expressSession from "express-session";
import { selectSql } from "../database/sql";

const router = express.Router();

// user table의 id를 저장할 변수
let Uid = "";
export { Uid };

let Admin = "";
export { Admin };

// 쿠키 및 세션 설정
router.use(cookieParser());
router.use(
  expressSession({
    secret: "dilab",
    resave: true,
    saveUninitialized: true,
  })
);

router.get("/", (req, res) => {
  if (req.cookies.user) {
    //로그인을 한 user라면
    res.render("main", { user: req.cookies.user }); //main 페이지의 hbs에 있는 user라는 변수에 쿠키 값을 던져줌
  } else {
    // 로그인한 user없으면
    res.render("login"); // 그냥 login페이지로
  }
});

//logout 하는 부분
router.get("/logout", (req, res) => {
  if (req.cookies.user) {
    res.clearCookie("user");
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

router.post("/", async (req, res) => {
  const vars = req.body; //사용자가 입력한 id와 password가 들어감 , 대소문자 구분 가능
  const users = await selectSql.getUsers();
  let whoAmI = "";
  let checkLogin = false;

  // map은 for loop라고 생각하면 됨
  users.map((user) => {
    if (vars.id === user.id && vars.password === user.password) {
      // id는 hbs의 name="id"를 말함, user테이블의 id, user.Password는 내 db로는 user.password
      checkLogin = true;
      if (vars.id === "admin") {
        whoAmI = "admin"; // 관리자 일경우
        Admin = vars.id;
      } else {
        whoAmI = "user"; // customer일 경우
        Uid = vars.id; // 입력한 id를 id 변수에 저장
      }
    }
  });

  if (checkLogin && whoAmI == "user") {
    res.cookie("user", Uid, {
      // user가 로그인하면 "user"라는 객체에 userState값을 넣어서 쿠키에 전달
      expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)   , expire는 유지하는 시간을 의미
      httpOnly: true,
    });
    res.redirect("/");
  } else if (checkLogin && whoAmI === "admin") {
    res.cookie("admin", Admin, {
      expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)   , expire는 유지하는 시간을 의미
      httpOnly: true,
    });
    res.redirect("/salesinfo"); // admin이 로그인하면 관리자 페이지로 넘어가도록 함
  } else {
    console.log("login failed");
  }
});

module.exports = router;
