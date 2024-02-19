import cookieParser from "cookie-parser";
import express from "express";
import expressSession from "express-session";
const router = express.Router();

// 쿠키와 session을 사용하는 템플릿
router.use(cookieParser());
router.use(
  expressSession({
    secret: "dilab", //session을 사용할때 쓰는 기본적인 것들
    resave: true,
    saveUninitialized: true,
  })
);

// 웹페이지에서 request를 받음
router.get("/logout", (req, res) => {
  if (req.cookies.user) {
    // 로그인한 user의 쿠키가 있으면
    res.clearCookie("user"); //user라는 쿠키를 초기화
    res.redirect("/");
  } else {
    // 로그인 한 user가 없으면 그냥 원래 페이지로 이동
    res.redirect("/");
  }
});

module.exports = router;
