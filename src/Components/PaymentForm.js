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
                <option value="Trial period for Market Leader Blueprint1">Trial period for Market Leader Blueprint1</option>
                <option value="1 × Business Accelerator 2.0 regular (at CHF 1,750.00 / month)1">1 × Business Accelerator 2.0 regular (at CHF 1,750.00 / month)1</option>
                <option value="Setup Fee - Business Accelerator1">Setup Fee - Business Accelerator1</option>
                <option value="Trial period for Market Leader Blueprint 1 Month1">Trial period for Market Leader Blueprint 1 Month1</option>
                <option value="Trial period for Business Accelerator1">Trial period for Business Accelerator1</option>
                <option value="1 × Business Accelerator Test Monat (at CHF 12,000.00 / year)1">1 × Business Accelerator Test Monat (at CHF 12,000.00 / year)1</option>
                <option value="Setup Fee - Market Leader Blueprint1">Setup Fee - Market Leader Blueprint1</option>
                <option value="1 × Business Accelerator 3 month upfront (at CHF 1,250.00 / month)2">1 × Business Accelerator 3 month upfront (at CHF 1,250.00 / month)2</option>
                <option value="Setup Fee - Business Accelerator 3 month upfront3">Setup Fee - Business Accelerator 3 month upfront3</option>
                <option value="1 × Market Leader Blueprint - Vitalfit (at CHF 1,000.00 / month)3">1 × Market Leader Blueprint - Vitalfit (at CHF 1,000.00 / month)3</option>
                <option value="1 × Market Leader Blueprint 1 Month (at CHF 2,500.00 / month)3">1 × Market Leader Blueprint 1 Month (at CHF 2,500.00 / month)3</option>
                <option value="Trial period for Business Accelerator 3 month upfront4">Trial period for Business Accelerator 3 month upfront4</option>
                <option value="1 × WHATSAPP_V1 (at CHF 26.68 / month)4">1 × WHATSAPP_V1 (at CHF 26.68 / month)4</option>    
                <option value="1 × WHATSAPP_V1 (at CHF 25.96 / month)5">1 × WHATSAPP_V1 (at CHF 25.96 / month)5</option>
                <option value="1 × Business Accelerator (at CHF 1,250.00 / month)5">1 × Business Accelerator (at CHF 1,250.00 / month)5</option>
                <option value="one5">one5</option>
                <option value="Trial period for Business Accelerator Test Monat6">Trial period for Business Accelerator Test Monat6</option>
                <option value="1 × WHATSAPP_V1 (at $29.99 / month)7">1 × WHATSAPP_V1 (at $29.99 / month)7</option>
                <option value="1 × Business Accelerator Test Monat (at CHF 0.00 / month)7">1 × Business Accelerator Test Monat (at CHF 0.00 / month)7</option>
                <option value="1 × Market Leader Blueprint - Ensy Fit (at CHF 1,500.00 / month)7">1 × Market Leader Blueprint - Ensy Fit (at CHF 1,500.00 / month)7</option>
                <option value="1 × Business Accelerator Test Monat (at CHF 1,250.00 / month)9">1 × Business Accelerator Test Monat (at CHF 1,250.00 / month)9</option>
                <option value="1 × Market Leader Blueprint (at CHF 2,500.00 / month)9">1 × Market Leader Blueprint (at CHF 2,500.00 / month)9</option>
                <option value="1 × Business Accelerator Regular (at CHF 1,250.00 / month)35">1 × Business Accelerator Regular (at CHF 1,250.00 / month)35</option>
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