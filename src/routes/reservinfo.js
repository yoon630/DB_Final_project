import express from "express";
import { ReservateSql, ReservInfoSql } from "../database/sql";
// sql import

const router = express.Router();

router.get("/", async function (req, res) {
  const data = {
    Ssn: req.cookies.user,
  };
  const reservCar = await ReservInfoSql.reservCar(data);
  const reservSuv = await ReservInfoSql.reservSuv(data);
  const reservTruck = await ReservInfoSql.reservTruck(data);
  const reservMotor = await ReservInfoSql.reservMotor(data);

  if (req.cookies.user) {
    // TODO
    // 예약 되어있는 애들 조회
    res.render("reservinfo", {
      user: req.cookies.user,
      reservCar,
      reservSuv,
      reservTruck,
      reservMotor,
    });
  } else {
    res.render("/");
  }
});

router.post("/", async (req, res) => {
  //reservate.hbs에서 설정한 수강신청 버튼 누르면
  const data = {
    Vin: req.body.cancelBtn,
  };
  await ReservateSql.reservateCancel(data); // sql.js에 정의된 reservateCancel실행
  res.redirect("/reservinfo");
});

module.exports = router;
