import express from "express";
import { insertSql } from "../database/sql";
// sql import

const router = express.Router();

router.get("/", async function (req, res) {
  if (req.cookies.admin) {
    // admin로그인 정보를 넘겨줌
    res.render("insert", {
      // insert.hbs에 정보 넘기기
      admin: req.cookies.admin,
    });
  } else {
    res.render("/"); // admin아니면 홈 보이게
  }
});

router.post("/", async (req, res) => {
  if (req.body.Vin_Car != "") {
    const dataC = {
      Vin: req.body.Vin_Car,
      Fuel_efficiency: req.body.Fuel_efficiency_car,
      Brand: req.body.Brand_car,
      Price: req.body.Price_car,
      Engine_size: req.body.Engine_size_car,
      Num_seats: req.body.Num_seats_car,
    };
    await insertSql.insertCar(dataC);
  } else if (req.body.Vin_Suv != "") {
    const dataS = {
      Vin: req.body.Vin_Suv,
      Fuel_efficiency: req.body.Fuel_efficiency_suv,
      Brand: req.body.Brand_suv,
      Price: req.body.Price_suv,
      Num_seats: req.body.Num_seats_suv,
      Size: req.body.Size_suv,
    };
    await insertSql.insertSuv(dataS);
  } else if (req.body.Vin_Truck != "") {
    const dataT = {
      Vin: req.body.Vin_Truck,
      Fuel_efficiency: req.body.Fuel_efficiency_truck,
      Brand: req.body.Brand_truck,
      Price: req.body.Price_truck,
      Tonnage: req.body.Tonnage_truck,
      No_axles: req.body.No_axles_truck,
    };
    await insertSql.insertTruck(dataT);
  } else {
    const dataM = {
      Vin: req.body.Vin_Motor,
      Fuel_efficiency: req.body.Fuel_efficiency_motor,
      Brand: req.body.Brand_motor,
      Price: req.body.Price_motor,
      Level: req.body.Level_motor,
    };
    await insertSql.insertMotor(dataM);
  }

  res.redirect("/insert");
});

module.exports = router;
