import mysql from "mysql2";
import { Uid } from "../routes/login";

// 데이터베이스 연결
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: "localhost",
    user: "root",
    database: "Car_Dealer",
    password: "0630",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }
);

// async / await 사용
const promisePool = pool.promise();

// selec query
export const selectSql = {
  getVehicle: async () => {
    const [rows] = await promisePool.query(`select * from vehicle`);

    return rows;
  },
  getCar: async () => {
    const [rows] = await promisePool.query(`select * from getCar limit 3`);
    return rows;
  },
  getSuv: async () => {
    const [rows] = await promisePool.query(`select * from getSuv limit 3`);
    return rows;
  },
  getTruck: async () => {
    const [rows] = await promisePool.query(`select * from getTruck limit 3`);
    return rows;
  },
  getMotorcycle: async () => {
    const [rows] = await promisePool.query(
      `select * from getMotorcycle limit 3`
    );
    return rows;
  },
  getSalesperson: async () => {
    const [rows] = await promisePool.query(`select * from salesperson`);
    return rows;
  },
  getCustomer: async () => {
    const [rows] = await promisePool.query(`select * from customer`);
    return rows;
  },
  getUsers: async () => {
    // 여기는 async에서 굳이 변수 없이 모든 걸 가져올 거니까 변수 없음
    const [rows] = await promisePool.query(`select * from user`);

    return rows;
  },

  // 여기서 부터 관리자가 예약 내역 조회할 때 쓰는 함수들
  getReservCar: async () => {
    const [rows] = await promisePool.query(
      `select * from reservCar where ssn is not null`
    );
    return rows;
  },
  getReservSuv: async () => {
    const [rows] = await promisePool.query(
      `select * from reservSuv where ssn is not null`
    );
    return rows;
  },
  getReservTruck: async () => {
    const [rows] = await promisePool.query(
      `select * from reservTruck where ssn is not null`
    );
    return rows;
  },
  getReservMotor: async () => {
    const [rows] = await promisePool.query(
      `select * from reservMotor where ssn is not null`
    );
    return rows;
  },

  carupdate: async () => {
    const [rows] = await promisePool.query(
      `select * from vehicle, car where vehicle.vin=car.vin limit 1;`
    );
    return rows;
  },
  suvupdate: async () => {
    const [rows] = await promisePool.query(
      `select * from vehicle, suv where vehicle.vin=suv.vin limit 1;`
    );
    return rows;
  },
  truckpdate: async () => {
    const [rows] = await promisePool.query(
      `select * from vehicle, truck where vehicle.vin=truck.vin limit 1;`
    );
    return rows;
  },
  motorupdate: async () => {
    const [rows] = await promisePool.query(
      `select * from vehicle,motorcycle where vehicle.vin=motorcycle.vin limit 1;`
    );
    return rows;
  },
};

// 차량정보 입력,수정,삭제 하는 sql문
export const VehicleSql = {
  // 차량 삭제 부분
  deleteCar: async (data) => {
    const deleteCar = `delete from car where vin="${data.Vin}"`;
    const deletevehicle = `delete from vehicle where vin="${data.Vin}"`;
    await promisePool.query(deletevehicle);
    await promisePool.query(deleteCar);
  },
  deleteSuv: async (data) => {
    const deleteSuv = `delete from suv where vin="${data.Vin}"`;
    const deletevehicle = `delete from vehicle where vin="${data.Vin}"`;
    await promisePool.query(deletevehicle);
    await promisePool.query(deleteSuv);
  },
  deleteTruck: async (data) => {
    const deleteTruck = `delete from truck where vin="${data.Vin}"`;
    const deletevehicle = `delete from vehicle where vin="${data.Vin}"`;
    await promisePool.query(deletevehicle);
    await promisePool.query(deleteTruck);
  },
  deleteMotor: async (data) => {
    const deleteMotor = `delete from motorcycle where vin="${data.Vin}"`;
    const deletevehicle = `delete from vehicle where vin="${data.Vin}"`;
    await promisePool.query(deletevehicle);
    await promisePool.query(deleteMotor);
  },

  adminReserv: async (data) => {
    // 관리자가 예약을 수정하는 함수
    const adminupdate1 = `update reservCar set Reservate_date = "${data.Reservate_Date}" where vin ="${data.Vin}"`;
    const adminupdate2 = `update reservCar set Ssn = "${data.Ssn}" where vin ="${data.Vin}"`;
    await promisePool.query(adminupdate1);
    await promisePool.query(adminupdate2);
  },
};

// 관리자가 차량 정보를 update하는 부분
export const updateSql = {
  updateCar: async (data) => {
    const update1 = `update vehicle set fuel_efficiency="${data.Fuel_efficiency}",brand="${data.Brand}",price="${data.Price}",sid="${data.Sid}" where vin ="${data.Vin}"`;
    const update2 = `update car set engine_size="${data.Engine_size}",num_seats="${data.Num_seats}" where vin ="${data.Vin}"`;
    // query문 실행
    await promisePool.query(update1);
    await promisePool.query(update2);
  },
  updateSuv: async (data) => {
    const updateS1 = `update vehicle set fuel_efficiency="${data.Fuel_efficiency}",brand="${data.Brand}",price="${data.Price}",sid="${data.Sid}" where Vin ="${data.Vin}"`;
    const updateS2 = `update suv set num_seats="${data.Num_seats}",size="${data.Size}" where Vin ="${data.Vin}"`;
    // query문 실행
    await promisePool.query(updateS1);
    await promisePool.query(updateS2);
  },
  updateTruck: async (data) => {
    const updateT1 = `update vehicle set fuel_efficiency="${data.Fuel_efficiency}",brand="${data.Brand}",price="${data.Price}",sid="${data.Sid}" where Vin ="${data.Vin}"`;
    const updateT2 = `update truck set tonnage="${data.Tonnage}",no_axles="${data.No_axles}" where Vin ="${data.Vin}"`;
    // query문 실행
    await promisePool.query(updateT1);
    await promisePool.query(updateT2);
  },
  updateMotor: async (data) => {
    const updateM1 = `update vehicle set fuel_efficiency="${data.Fuel_efficiency}",brand="${data.Brand}",price="${data.Price}",sid="${data.Sid}" where Vin ="${data.Vin}"`;
    const updateM2 = `update motorcycle set level="${data.Level}" where Vin ="${data.Vin}"`;
    // query문 실행
    await promisePool.query(updateM1);
    await promisePool.query(updateM2);
  },
};

//사용자가 얘약 하고 예약 취소 하는 sql부분
export const ReservateSql = {
  reservateVehicle: async (data) => {
    // 예약하는 부분
    const reserv1 = `update vehicle set reservate_date =now() where vin = "${data.Vin}"`;
    const reserv2 = `update vehicle set ssn ="${data.Ssn}" where vin="${data.Vin}"`;

    await promisePool.query(reserv1);
    await promisePool.query(reserv2);
  },
  reservateCancel: async (data) => {
    // 예약 취소하는 부분
    const cancel1 = `update vehicle set reservate_date=NULL where vin="${data.Vin}"`;
    const cancel2 = `update vehicle set ssn=NULL where vin="${data.Vin}"`;

    await promisePool.query(cancel1);
    await promisePool.query(cancel2);
  },
};

// 사용자가 예약을 조회하는 부분
export const ReservInfoSql = {
  reservCar: async (data) => {
    const [rows] = await promisePool.query(
      `select * from reservCar where ssn="${data.Ssn}"`
    );
    return rows;
  },
  reservSuv: async (data) => {
    const [rows] = await promisePool.query(
      `select * from reservSuv where ssn="${data.Ssn}"`
    );
    return rows;
  },
  reservTruck: async (data) => {
    const [rows] = await promisePool.query(
      `select * from reservTruck where ssn="${data.Ssn}"`
    );
    return rows;
  },
  reservMotor: async (data) => {
    const [rows] = await promisePool.query(
      `select * from reservMotor where ssn="${data.Ssn}"`
    );
    return rows;
  },
};

//관리자가 차량 정보를 입력하는 부분
export const insertSql = {
  insertCar: async (data) => {
    const insert1 = `insert into vehicle (Vin,Fuel_efficiency,Brand,Price) values("${data.Vin}","${data.Fuel_efficiency}","${data.Brand}","${data.Price}")`;
    const insert2 = `insert into car (Vin,Num_seats,Engine_size) VALUES ("${data.Vin}","${data.Num_seats}","${data.Engine_size}")`;
    await promisePool.query(insert1);
    await promisePool.query(insert2);
  },
  insertSuv: async (data) => {
    const insertS1 = `insert into vehicle (Vin,Fuel_efficiency,Brand,Price) 
    values ("${data.Vin}","${data.Fuel_efficiency}","${data.Brand}","${data.Price}")`;
    const insertS2 = `insert into Suv (Vin,size,num_seats) 
    values ("${data.Vin}","${data.Size}","${data.Num_seats}")`;
    await promisePool.query(insertS1);
    await promisePool.query(insertS2);
  },
  insertTruck: async (data) => {
    const insertT1 = `insert into vehicle (Vin,Fuel_efficiency,Brand,Price) 
    VALUES ("${data.Vin}","${data.Fuel_efficiency}","${data.Brand}","${data.Price}")`;
    const insertT2 = `insert into truck (Vin,Tonnage,No_axles) 
    VALUES ("${data.Vin}","${data.Tonnage}","${data.No_axles}")`;

    await promisePool.query(insertT1);
    await promisePool.query(insertT2);
  },
  insertMotor: async (data) => {
    const insertM1 = `insert into vehicle (Vin,Fuel_efficiency,Brand,Price) 
    VALUES ("${data.Vin}","${data.Fuel_efficiency}","${data.Brand}","${data.Price}")`;
    const insertM2 = `insert into Motorcycle (Vin,Level) 
    VALUES ("${data.Vin}","${data.Level}")`;

    await promisePool.query(insertM1);
    await promisePool.query(insertM2);
  },
};
