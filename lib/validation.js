const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s()-]{6,24}$/;

const clean = (value, max) =>
  String(value || "")
    .trim()
    .slice(0, max);

export function validateInquiry(values) {
  const data = {
    name: clean(values.name, 80),
    phone: clean(values.phone, 30),
    email: clean(values.email, 120),
    date: clean(values.date, 20),
    groupSize: clean(values.groupSize, 20),
    message: clean(values.message, 1200),
  };
  const errors = {};

  if (data.name.length < 2) errors.name = "Name must be at least 2 characters.";
  if (!phonePattern.test(data.phone)) {
    errors.phone = "Enter a valid phone or WhatsApp number.";
  }
  if (data.email && !emailPattern.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  return { valid: Object.keys(errors).length === 0, data, errors };
}

export function validateReview(values) {
  const data = {
    name: clean(values.name, 80),
    country: clean(values.country, 80),
    text: clean(values.text, 1500),
    rating: Number(values.rating),
  };
  const errors = {};

  if (data.name.length < 2) errors.name = "Name must be at least 2 characters.";
  if (data.country.length < 2) errors.country = "Country is required.";
  if (!Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5) {
    errors.rating = "Select a rating.";
  }
  if (data.text.length < 10) errors.text = "Review must be at least 10 characters.";

  return { valid: Object.keys(errors).length === 0, data, errors };
}
