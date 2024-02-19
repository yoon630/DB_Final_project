// Copyright 2022 kms
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express from "express";
import logger from "morgan";
import path from "path";
import liveReload from "livereload";
import connectLiveReload from "connect-livereload"; //서버 재시작 시 변경된 웹브라우저 코드들 반영되어 재시작

import loginRouter from "./routes/login"; // 로그인 라우터
import logoutRouter from "./routes/logout"; // 로그아웃 라우터
import reservateRouter from "./routes/reservate"; // 사용자가 예약하는 페이지 라우터
import reservinfoRouter from "./routes/reservinfo"; // 사용자가 예약을 조회하는 라우터
import insertRouter from "./routes/insert"; // 관리자가 차량을 입력하는 페이지 라우터
import updateRouter from "./routes/update"; // 관리자가 차량 정보를 수정하는 페이지 라우터
import salesinfoRouter from "./routes/salesinfo"; // 관리자가 사용자의 예약 내역을 조회하는 페이지

const PORT = 3000;

const liveReloadServer = liveReload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100); //0.1초 마다 refresh
});

const app = express();
//express의 객체 , app이 자도으로 재시작하는것을 연결하는 역할

//---------------------------------------------------------------------//
app.use(connectLiveReload());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
//hbs가 css파일을 불러와서 쓸건데 그걸 어디서 가져올건지 의미하는 부분

app.use(logger("dev"));

app.use("/", loginRouter);
app.use("/logout", logoutRouter); // logout하면 logoutRouter동작 , logout.js의 router가 동작
app.use("/reservate", reservateRouter); // 사용자가 로그인하면 예약 창으로 이동하도록
app.use("/reservinfo", reservinfoRouter); // 사용자 예약 내역 조회
app.use("/insert", insertRouter); //관리자가 차량 업로드 하는 페이지
app.use("/update", updateRouter); //관리자가 차량 삭제,수정 하는 페이지
app.use("/salesinfo", salesinfoRouter); //관리자가 차량 예약 관리하는 페이지

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
