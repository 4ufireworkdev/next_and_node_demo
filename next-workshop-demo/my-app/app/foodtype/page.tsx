"use client";
import { useEffect, useState } from "react";
import MyModal from "../backoffice/components/MyModal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "@/app/config";

export default function Page() {
  const [name, setName] = useState("");
  const [remark, setRemark] = useState("");
  const [foodTypes, setFoodTypes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const payload = {
        name: name,
        remark: remark,
      };

      await axios.post(config.apiServer + "/api/foodType/create", payload);
      fetchData();
      document.getElementById("modalFoodType_btnClose")?.click();
    } catch (e: any) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const fetchData = async () => {
    try {
      const rows = await axios.get(config.apiServer + "/api/foodType/list");
      setFoodTypes(rows.data.results);
    } catch (e: any) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-header">ประเภทอาหาร/เครื่องดื่ม</div>
      <div className="card-body">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalFoodType"
        >
          <i className="fa fa-plus me-2"></i>เพิ่มรายการ
        </button>
        <table className="mt-3 table table-bordered table-striped">
          <thead>
            <tr>
              <th style={{ width: "200px" }}>ชื่อ</th>
              <th>หมายเหตุ</th>
              <th style={{ width: "110px" }}></th>
            </tr>
          </thead>
          <tbody>
            {foodTypes.map((item: any) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.remark}</td>
                <td className="text-center">
                  <button className="btn btn-primary me-2">
                    <i className=" fa fa-edit"></i>
                  </button>
                  <button className="btn btn-danger">
                    <i className=" fa fa-times"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MyModal id="modalFoodType" title="ประเภทอาหาร/เครื่องดื่ม">
        <div>ชื่อ</div>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="mt-3">หมายเหตุ</div>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setRemark(e.target.value)}
        />
        <div className="mt-3">
          <button className="btn btn-primary" onClick={handleSave}>
            <i className="fa fa-check me-2"></i>บันทึก
          </button>
        </div>
      </MyModal>
    </div>
  );
}
