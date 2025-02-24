import React, { useState } from "react";
import ThankYou from "./ThankYou";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    paymentDate: "",
    totalAmount: "",
    membershipName: "",
    membershipInterval: "Monthly",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "radio" ? (checked ? value : prevData[name]) : value,
    }));

    // Clear error when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.clientName.trim()) newErrors.clientName = "Client name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.paymentDate.trim()) newErrors.paymentDate = "Payment date is required.";
    if (!formData.totalAmount.trim()) {
      newErrors.totalAmount = "Total amount is required.";
    } else if (parseFloat(formData.totalAmount) < 0) {
      newErrors.totalAmount = "Total amount cannot be less than 0.";
    }
    if (!formData.membershipName.trim()) newErrors.membershipName = "Membership name is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const payload = {
        amount: parseFloat(formData.totalAmount), // Ensure amount is a number
        created: formData.paymentDate,
        customer_email: formData.email,
        customer_name: formData.clientName,
        membership_name: formData.membershipName,
        interval: formData.membershipInterval.toLowerCase(),
      };

      try {
        const response = await fetch("https://paymentapi.growfit.ch/post_invoice/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer asj3sfsd$%!Qaiefj&h8ha-9"
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          console.log("Form Data:", formData);
          setIsSubmitted(true);
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData);
          // Handle error response
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle network error
      }
    }
  };

  const handleReset = () => {
    setFormData({
      clientName: "",
      email: "",
      paymentDate: "",
      totalAmount: "",
      membershipName: "",
      membershipInterval: "Monthly",
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return <ThankYou onReset={handleReset} />;
  }
  return (
    <div className="form-ui">
      <div className="form-container">
        <p className="title">Payment Details</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group-row">
            <div className="form-group">
              <label className="input-label">Client Name*</label>
              <input
                type="text"
                className="input"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
              />
              {errors.clientName && <p className="error">{errors.clientName}</p>}
            </div>
            <div className="form-group">
              <label className="input-label">Email Address*</label>
              <input
                type="email"
                className="input"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label className="input-label">Date of Payment*</label>
              <input
                type="date"
                className="input"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
              />
              {errors.paymentDate && <p className="error">{errors.paymentDate}</p>}
            </div>
            <div className="form-group">
              <label className="input-label">Total Amount Paid*</label>
              <input
                type="number"
                className="input"
                name="totalAmount"
                min="0"
                value={formData.totalAmount}
                onChange={handleChange}
              />
              {errors.totalAmount && <p className="error">{errors.totalAmount}</p>}
            </div>
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label className="input-label">Membership Name*</label>
              <select
                name="membershipName"
                value={formData.membershipName}
                onChange={handleChange}
              >
                <option value="">Select Option</option>
                <option value="one">One</option>
                <option value="two">Two</option>
              </select>
              {errors.membershipName && <p className="error">{errors.membershipName}</p>}
            </div>
            <div className="form-group">
              <label className="input-label">Membership Interval*</label>
              <div className="radio-inputs">
                <label className="radio">
                  <input
                    type="radio"
                    name="membershipInterval"
                    value="Monthly"
                    checked={formData.membershipInterval === "Monthly"}
                    onChange={handleChange}
                  />
                  <span className="name">Monthly</span>
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="membershipInterval"
                    value="Yearly"
                    checked={formData.membershipInterval === "Yearly"}
                    onChange={handleChange}
                  />
                  <span className="name">Yearly</span>
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="form-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;