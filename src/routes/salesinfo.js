import express from "express";
import { selectSql, VehicleSql } from "../database/sql";
// sql import

const router = express.Router();

router.get("/", async function (req, res) {
  const salesCar = await selectSql.getReservCar();
  const salesSuv = await selectSql.getReservSuv();
  const salesTruck = await selectSql.getReservTruck();
  const salesMotor = await selectSql.getReservMotor();

  if (req.cookies.admin) {
    // TODO
    // 예약 되어있는 애들 조회
    res.render("salesinfo", {
      admin: req.cookies.admin,
      salesCar,
      salesSuv,
      salesTruck,
      salesMotor,
    });
  } else {
    res.render("/");
  }
});

router.post("/", async (req, res) => {
  const data = {
    Vin: req.body.updateBtn, //salesinfo.js에서 updateBtn버튼을 누르면
    Ssn: req.body.Ssn,
    Reservate_Date: req.body.Reservate_Date,
  };
  await VehicleSql.adminReserv(data); // sql.js에 정의된 adminReserv실행
  res.redirect("/salesinfo");
});

module.exports = router;
