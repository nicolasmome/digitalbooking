import { useState } from "react";

const useForm = (initialValues, validateForm, submitFunction) => {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submited, setSubmited] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
    setSubmited(false);
  };

  const handleSubmit = () => {
    setErrors(validateForm(form));
    submitFunction(form);
    setSubmited(true);
  };

  const handleReset = () => {
    setErrors({});
    setForm(initialValues);
  };

  return {
    form,
    errors,
    submited,
    setForm,
    setErrors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    ...form,
  };
};

export default useForm;
