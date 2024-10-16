"use client";
import { useState, useEffect } from "react";
import config from "@/app/config";
import axios from "axios";
import Swal from "sweetalert2";
import { useRef } from "react";

export default function Page() {
  const [table, setTable] = useState(1);
  const [foods, setFoods] = useState([]);
  const [saleTemps, setSaleTemps] = useState([]);
  const myRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getFoods();
    fetchDataSaleTemp();
    (myRef.current as HTMLInputElement).focus();
  }, []);

  const fetchDataSaleTemp = async () => {
    try {
      const res = await axios.get(config.apiServer + "/api/saleTemp/list");
      setSaleTemps(res.data.results);
    } catch (e: any) {
      Swal.fire({
        title: "มีข้อผิดพลาด",
        text: e.message,
        icon: "error",
      });
    }
  };

  const getFoods = async () => {
    try {
      const res = await axios.get(config.apiServer + "/api/food/list");
      setFoods(res.data.results);
    } catch (e: any) {
      Swal.fire({
        title: "มีข้อผิดพลาด",
        text: e.message,
        icon: "error",
      });
    }
  };

  const filterFoods = async (foodType: string) => {
    try {
      const res = await axios.get(
        config.apiServer + "/api/food/filter/" + foodType
      );
    } catch (e: any) {
      Swal.fire({
        title: "มีข้อผิดพลาด",
        text: e.message,
        icon: "error",
      });
    }
  };

  const sale = async (foodId: number) => {
    try {
      const payload = {
        tableNo: table,
        userId: Number(localStorage.getItem("next_user_id")),
        foodId: foodId,
      };
      await axios.post(config.apiServer + "/api/saleTemp/create", payload);
      fetchDataSaleTemp();
    } catch (e: any) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const removeSaleTemp = async (id: number) => {
    try {
      const button = await Swal.fire({
        title: "คุณต้องการลบรายการนี้ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
      });
      if (button.isConfirmed) {
        await axios.delete(config.apiServer + "/api/saleTemp/remove/" + id);
        fetchDataSaleTemp();
      }
    } catch (e: any) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const removeAllSaleTemp = async () => {
    try {
      const button = await Swal.fire({
        title: "คุณต้องการลบรายการนี้ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
      });
      if (button.isConfirmed) {
        const payload = {
          tableNo: table,
          userId: Number(localStorage.getItem("next_user_id")),
        };
        await axios.delete(config.apiServer + "/api/saleTemp/removeAll", {
          data: payload,
        });
        fetchDataSaleTemp();
      }
    } catch (e: any) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };
  return (
    <>
      <div className="card mt-3">
        <div className="card-header">ขายสินค้า</div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <div className="input-group">
                <div className="input-group-text">โต๊ะ</div>
                <input
                  ref={myRef}
                  type="text"
                  className="form-control"
                  value={table}
                  onChange={(e) => setTable(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="col-md-9">
              <button
                className="btn btn-primary me-1"
                onClick={() => filterFoods("food")}
              >
                <i className="fa fa-hamburger me-2"></i>
                อาหาร
              </button>
              <button
                className="btn btn-primary me-1"
                onClick={() => filterFoods("drink")}
              >
                <i className="fa fa-hamburger me-2"></i>
                เครื่องดื่ม
              </button>
              <button
                className="btn btn-primary me-1"
                onClick={() => filterFoods("all")}
              >
                <i className="fa fa-hamburger me-2"></i>
                ทั้งหมด
              </button>
              <button
                disabled={saleTemps.length === 0}
                className="btn btn-primary me-1"
                onClick={() => removeAllSaleTemp()}
              >
                <i className="fa fa-hamburger me-2"></i>
                ล้างอาหาร
              </button>
            </div>
            <div className="row mt-3">
              <div className="col-md-9">
                <div className="row g-1">
                  {foods.map((food: any) => (
                    <div
                      className="col-md3 col-lg-3 col-sm-4 col-6"
                      key={food.id}
                    >
                      <div className="card">
                        <img
                          src={config.apiServer + "/uploads/" + food.img}
                          style={{ height: "200px", objectFit: "cover" }}
                          alt={food.name}
                          className="img-fluid"
                          onClick={(e) => sale(food.id)}
                        />
                        <div className="card-body">
                          <h5>{food.name}</h5>
                          <p className="fw-bold text-success h4">
                            {food.price} .-
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-3">
                <div className="alert p-3 text-end h1 text-white bg-dark">
                  0.00
                </div>
                {saleTempDetails.map((item: any) => (
                  <div className="d-grid mt-2">
                    <div className="card">
                      <div className="card-body">
                        <div className="fw-bold">{item.Food.name}</div>
                        <div>
                          {item.Food.price} x 2 = {item.Food.price * 1}
                        </div>
                        <div className="mt-1">
                          <div className="input-group">
                            <button className="input-group-text btn btn-primary">
                              <i className="fa fa-minus"></i>
                            </button>
                            <input
                              type="text"
                              className="from-control text-center fw-bold"
                              value="1"
                              disabled
                            />
                            <button className="input-group-text btn btn-primary">
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer p-1">
                        <div className="row g-1">
                          <div className="col-md-6">
                            <button
                              className="btn btn-danger btn-block"
                              onClick={(e) => removeSaleTemp(item.id)}
                            >
                              <i className="fa fa-times me-2"></i>
                              ยกเลิก
                            </button>
                          </div>
                          <div className="col-md-6">
                            <button className="btn btn-warning btn-block">
                              <i className="fa fa-cog me-2"></i>
                              แก้ไข
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
