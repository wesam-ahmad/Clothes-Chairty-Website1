import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

const FormHome = () => {
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});

  async function verifyToken() {
    const token = localStorage.getItem("token") || false;

    if (token) {
      try {
        const res = await axios.get(`http://localhost:8000/Verify_token`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name: event.target.elements["full-name"].value,
      email: event.target.elements.email.value,
      phone: event.target.elements.mobile.value,
      address: event.target.elements.address.value,
      order_status: event.target.elements.status.value,
      number_pieces: event.target.elements.numbers.value,
      description: event.target.elements.details.value,
      type: event.target.elements.type.value,
    };
    const formErrors = validateForm(formData);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});

      try {
        const res = await axios.post(
          "http://localhost:8000/new_order",
          formData
        );
        console.log("Form data sent successfully to server from react");
        const order_id = res.data._id;
        const email = res.data.email;
        const user = await verifyToken();

        let newMove = {
          order_id: order_id,
          email: email,
          donor_id: ''
        };

        if (!user?.donor_id) {
          delete newMove.donor_id
        } else {
          newMove = {...newMove, donor_id: user.userId}
        }

        try {
          const sendRes = await axios.post(
            "http://localhost:8000/donor_movement",
            newMove
          );
        } catch (error) {
          console.log("Error sending data to donor_movement", error);
        }
        formRef.current.reset();
      } catch (error) {
        console.log("Error sending form from react:", error);
      }
    }
  };
  const validateForm = (formData) => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "الإسم بالكامل مطلوب";
    }

    if (!formData.email.trim()) {
      errors.email = "البريد الإلكتروني مطلوب";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!formData.phone.trim()) {
      errors.phone = "رقم الهاتف مطلوب";
    } else if (!isValidPhone(formData.phone)) {
      errors.phone = " 07XXXXXXXX  رقم الهاتف يجب أن يتكون من 10 أرقام و يبدأ ";
    }

    if (!formData.address.trim()) {
      errors.address = "العنوان مطلوب";
    } else if (formData.address.trim().length > 50) {
      errors.address = "العنوان يجب أن يكون أقل من 50 حرفًا";
    }

    if (!formData.order_status.trim()) {
      errors.order_status = "حالة التبرع مطلوبة";
    } else if (
      !formData.order_status ||
      formData.order_status === "حالة التبرع"
    ) {
      errors.order_status = "رجاء اختار حالة التبرع";
    }
    if (!formData.type.trim()) {
      errors.type = "نوع التبرع مطلوب";
    } else if (!formData.type || formData.type === "نوع التبرع") {
      errors.type = "رجاء اختار نوع التبرع";
    }

    if (!formData.number_pieces.trim()) {
      errors.number_pieces = "عدد القطع مطلوب";
    } else if (!isValidNumber(formData.number_pieces)) {
      errors.number_pieces = "عدد القطع يجب أن يكون رقمًا صحيحًا وبحد أقصى 100";
    }

    if (!formData.description) {
      errors.description = "التفاصيل الإضافية مطلوبة";
    } else if (formData.description.length > 150) {
      errors.description = "يجب أن لا تقل التفاصيل عن 150 حرف";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.(net|com)$/.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^07\d{8}$/;
    return phoneRegex.test(phone);
  };

  const isValidNumber = (number) => {
    return /^\d+$/.test(number) && number >= 0 && number <= 100;
  };

  return (
    <>
      <div className="block">
        <div className="border border-[#e6e6e6] rounded-2xl bg-[#e6e6e6] p-7 z-40">
          <h1 className="text-center text-[#059669] font-black text-2xl  mb-2">
            #وشاحك_واصل
          </h1>
          <form
            action="#"
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-1"
          >
            <div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 text-right">
                  {errors.name}
                </p>
              )}
              <input
                type="text"
                id="full-name"
                className={`rounded-lg form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-teal-600 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-teal-800 focus:outline-none${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="الإسم بالكامل"
                name="full-name"
                required
                style={{ direction: "rtl" }}
              />
            </div>
            <div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 text-right">
                  {errors.email}
                </p>
              )}
              <input
                type="email"
                id="contact_subject"
                className={`rounded-lg form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-teal-600 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-teal-800 focus:outline-none  ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="البريد الإلكتروني"
                name="email"
                required
                style={{ direction: "rtl" }}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1 text-right ">
                {errors.phone}
              </p>
            )}
            <input
              type="text"
              id="mobile"
              className={`rounded-lg form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-teal-600 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-teal-800 focus:outline-none  ${
                errors.phone ? "border-red-500" : ""
              }`}
              placeholder="رقم الهاتف"
              name="mobile"
              required
              style={{ direction: "rtl" }}
            />

            <div>
              {errors.address && (
                <p className="text-red-500 text-xs mt-1 text-right">
                  {errors.address}
                </p>
              )}
              <input
                type="text"
                id="address"
                className={`rounded-lg form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-teal-600 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-teal-800 focus:outline-none  ${
                  errors.address ? "border-red-500" : ""
                }`}
                placeholder="العنوان"
                name="address"
                required
                style={{ direction: "rtl" }}
              />
            </div>
            <div>
              {errors.order_status && (
                <p className="text-red-500 text-xs mt-1 text-right">
                  {errors.order_status}
                </p>
              )}
              <select
                labelId="status"
                id="status"
                label="status"
                dir="rtl"
                className={`rounded-lg form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-teal-600 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-teal-800 focus:outline-none  ${
                  errors.order_status ? "border-red-500" : ""
                }`}
              >
                <option>حالة التبرع</option>
                <option>جديد</option>
                <option>مستعمل بحالة جيدة</option>
                <option>مستعمل بحالة متوسطة</option>
              </select>
            </div>
            <div>
              {errors.type && (
                <p className="text-red-500 text-xs mt-1 text-right">
                  {errors.type}
                </p>
              )}
              <select
                labelId="type"
                id="type"
                label="type"
                dir="rtl"
                className={`rounded-lg form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-teal-600 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-teal-800 focus:outline-none  ${
                  errors.type ? "border-red-500" : ""
                }`}
              >
                <option>نوع التبرع</option>
                <option>رجالي</option>
                <option>نسائي</option>
                <option>أطفال</option>
                <option>منوع</option>
              </select>
            </div>

            <div>
              {errors.number_pieces && (
                <p className="text-red-500 text-xs mt-1 text-right">
                  {errors.number_pieces}
                </p>
              )}
              <input
                type="number"
                id="numbers"
                className={`rounded-lg form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-teal-600 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-teal-800 focus:outline-none  ${
                  errors.number_pieces ? "border-red-500" : ""
                }`}
                placeholder="عدد القطع"
                name="numbers"
                required
                style={{ direction: "rtl" }}
              />
            </div>
            <div className="sm:col-span-2">
              {errors.description && (
                <p className="text-red-500 text-xs mt-1 text-right">
                  {errors.description}
                </p>
              )}
              <textarea
                id="details"
                rows="6"
                className={`rounded-lg form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-teal-600 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-teal-800 focus:outline-none  ${
                  errors.description ? "border-red-500" : ""
                }`}
                placeholder="تفاصيل إضافية"
                name="details"
                style={{ direction: "rtl" }}
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 lg:w-full px-5 text-sm font-medium text-center text-white bg-teal-600 transition hover:bg-teal-700 rounded-lg sm:w-fit  border-2 border-[#388175]"
            >
              ارسال تبرع
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormHome;
