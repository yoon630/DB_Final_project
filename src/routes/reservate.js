// Copyright 2021 kms
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
import { selectSql, ReservateSql } from "../database/sql";
// TODO
// sql import

const router = express.Router();

router.get("/", async function (req, res) {
  const carInfo = await selectSql.getCar(); // 예약한 vehicle 정보 불러오는 변수
  const suvInfo = await selectSql.getSuv();
  const truckInfo = await selectSql.getTruck();
  const motorcyInfo = await selectSql.getMotorcycle();
  if (req.cookies.user) {
    // TODO
    // 불러온 vehicle 정보 보여주고 예약하기
    res.render("reservate", {
      user: req.cookies.user,
      carInfo,
      suvInfo,
      truckInfo,
      motorcyInfo,
    });
  } else {
    res.render("/");
  }
});

router.post("/", async (req, res) => {
  //reservate.hbs에서 설정한 수강신청 버튼 누르면
  const data = {
    Vin: req.body.reservBtn,
    Ssn: req.cookies.user,
  };
  await ReservateSql.reservateVehicle(data); // sql.js에 정의된 reservateVehicle 함수 실행
  res.redirect("/reservate"); // sql문 실행후 다시 /sugang 페이지 보여줌
});

module.exports = router;
