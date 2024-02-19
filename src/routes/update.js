//delete.js 긁어온거
import express from "express";
import { selectSql, VehicleSql, updateSql } from "../database/sql";

const router = express.Router();

//기존의 입력값 불러오기
router.get("/", async (req, res) => {
  const updateCar = await selectSql.carupdate();
  const updateSuv = await selectSql.suvupdate();
  const updateTruck = await selectSql.truckpdate();
  const updateMotor = await selectSql.motorupdate();
  if (req.cookies.admin) {
    res.render("update", {
      admin: req.cookies.admin,
      updateCar,
      updateSuv,
      updateTruck,
      updateMotor,
    });
  } else {
    res.render("/");
  }
});

//삭제버튼을 눌렀을 경우 update query를 실행하며 조회 페이지로 이동
router.post("/", async (req, res) => {
  const vars = req.body;
  const data1 = {
    Vin: vars.deleteCarBtn, // delete버튼 누르면 삭제 될 수 있도록
  };
  await VehicleSql.deleteCar(data1);

  const data2 = {
    Vin: vars.deleteSuvBtn,
  };
  await VehicleSql.deleteSuv(data2);

  const data3 = {
    Vin: vars.deleteTruckBtn,
  };
  await VehicleSql.deleteTruck(data3);

  const data4 = {
    Vin: vars.deleteMotorBtn,
  };
  await VehicleSql.deleteMotor(data4);

  // 버튼 누르면 수정하는 부분
  if (vars.Engine_size_car != "") {
    const dataC = {
      Vin: vars.carBtn,
      Fuel_efficiency: vars.Fuel_efficiency_car,
      Brand: vars.Brand_car,
      Price: vars.Price_car,
      Sid: vars.Sid_car,
      Engine_size: vars.Engine_size_car,
      Num_seats: vars.Num_seats_car,
    };
    await updateSql.updateCar(dataC);
  }
  if (vars.Num_seats_suv != "") {
    const dataS = {
      Vin: vars.suvupdateBtn,
      Fuel_efficiency: vars.Fuel_efficiency_suv,
      Brand: vars.Brand_suv,
      Price: vars.Price_suv,
      Sid: vars.Sid_suv,
      Num_seats: vars.Num_seats_suv,
      Size: vars.Size_suv,
    };
    await updateSql.updateSuv(dataS);
  }
  if (vars.Tonnage_truck != "") {
    const dataT = {
      Vin: vars.truckupdateBtn,
      Fuel_efficiency: vars.Fuel_efficiency_truck,
      Brand: vars.Brand_truck,
      Price: vars.Price_truck,
      Sid: vars.Sid_truck,
      Tonnage: vars.Tonnage_truck,
      No_axles: vars.No_axles_truck,
    };
    await updateSql.updateTruck(dataT);
  }
  if (vars.Level_motor != "") {
    const dataM = {
      Vin: vars.motorupdateBtn,
      Fuel_efficiency: vars.Fuel_efficiency_motor,
      Brand: vars.Brand_motor,
      Price: vars.Price_motor,
      Sid: vars.Sid_motor,
      Level: vars.Level_motor,
    };
    await updateSql.updateMotor(dataM);
  }
  res.redirect("/update"); // update페이지가 다시 보임
});

module.exports = router;
