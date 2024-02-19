import random
import numpy as np

#-*- coding:utf-8 -*-
brand= ["HYUNDAI","GENESIS","Mercedes-benz","Jeep","VOLVO","CHEVROLET","MINI","RANDROVER","CADILLAC","BMW","AUDI","JAGUAR","Maserati"];

#vin 
vin_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

# motorcycle 속성
level =["쿼터","미들","리터"]

#suv size
size =["S","M","L"]

sid =["456789","586745","374642","634624","435433","576577","676543","356356","345690","123435"]

# 각 테이블에 맞는 쿼리문
vehicle = "INSERT INTO Vehicle (Vin,Fuel_efficiency,Brand,Price,Sid,Ssn) VALUES "
base_Car = "INSERT INTO Car (Vin, Num_seats,Engine_size) VALUES "
base_SUV = "INSERT INTO SUV (Vin, Num_seats, Size) VALUES "
base_Motorcycle = "INSERT INTO Motorcycle (Vin,Level) VALUES "
base_Truck = "INSERT INTO Truck (Vin, Tonnage,No_axles) VALUES "



#100000 data
sql =[]
for i in range(100000):
    if i % 10000 == 0: print(i)

    #VIN 부분
    vin=""
    for j in range(0,11):
          
      v_idx = random.randint(0, len(vin_alphabet)-1)
      vin = vin +vin_alphabet[v_idx]
    vin_num= random.randint(111111,999999)
    vin= vin+ str(vin_num)
    null = "null"
   
    #vehicle 
    brd_idx =random.randint(0,12) # 차량 브랜드 랜덤으로 가져오기
    Brand=brand[brd_idx]
    price = random.randint(7000,100000); # 가격  7000$~100000$ 사이로 랜덤 출력
    sid_idx=random.randint(0,9)
    Sid =sid [sid_idx]

    #fuel_efficiency
    fuel_eff = round( random.uniform(10,25),1) # 연비 km/h 단위
   
    #car
    car_num_seats = random.randint(1,5)
    engine_size = random.randint(1000,3500)

    #SUV
    size_idx=random.randint(0,2)  # 차량 사이즈 list에서 랜덤으로 가져오기
    suv_num_seats = random.randint(1,9)
    Size=size[size_idx] # SUV size

    #TRUCK
    tonnage = random.randint(1,5) # 트럭 톤 수
    no_axles= random.randint(2,6) # 트럭 축 개수 

    #motorcycle 
    level_idx =random.randint(0,2) #오토바이 레벨 랜덤으로 가져오기
    Level=level[level_idx] # motorcycle level

   

    #sql 연결 
    query1 = vehicle +'("' + vin + '",'+ str(fuel_eff) +',"'+ Brand +'",'+ str(price) +',"'+Sid+'",'+null+');\n'
   
    car_idx = random.randint(0,3)
    if car_idx == 0:
      query2 = base_Car +'("'+ vin+'",'+str(car_num_seats)+','+str(engine_size)+');\n'
    elif car_idx == 1:
      query2 = base_SUV +'("' + vin +'",'+str(suv_num_seats)+',"'+Size+'");\n'
    elif car_idx == 2:
      query2 = base_Motorcycle+ '("'+ vin +'","'+str(Level)+'");\n'
    else:
      query2= base_Truck +'("'+ vin +'",'+ str(tonnage) + ','+ str(no_axles)+');\n'

    query =query1+query2
    sql.append(query)

f =open('test.sql','w',encoding='utf-8')
for i,s in enumerate(sql):
  f.writelines(s)

f.close()    
   

