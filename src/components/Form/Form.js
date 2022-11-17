import React, { useState } from "react";
import styles from "../Form/Form.module.css";
import buttonStyles from "../Button/Button.module.css";
import addedButton from "../../images/plus.svg";
import Modal from "../Modal/Modal";
import FeedbackModal from "../FeedbackModal/FeedbackModal";
import Button from "../Button/Button";
import Input from "../Input/Input";
import FileInput from "../FileInput/FileInput";

const Form = () => {
  const [inputsValue, setInputsValue] = useState({
    firstname: { value: "", validity: false, touched: false },
    secondname: { value: "", validity: false, touched: false },
    email: { value: "", validity: false, touched: false },
    gender: { value: "", validity: false },
    resume: { value: "", validity: false },
    privacyPolicy: { value: false, validity: false, touched: false },
  });
  const [openPrivacyPolicyModal, setOpenPtivacyPolicyModal] = useState(false);
  const [openFeedbackModal, setOpenFeedBackModal] = useState(false);
  const [isTryToSubmit, setIsTryToSubmit] = useState(false);

  const handleChangeForFileInput = (e) => {
    setInputsValue({
      ...inputsValue,
      resume: {
        validity: true,
        value: e.target.files[0].name,
      },
    });
  };

  const detachFile = (e) => {
    e.stopPropagation();
    setInputsValue({
      ...inputsValue,
      resume: {
        validity: false,
        value: "",
      },
    });
  };

  const handleChange = (e) => {
    setInputsValue({
      ...inputsValue,
      [e.target.name]: {
        ...inputsValue[e.target.name],
        touched: true,
      },
    });
  };

  const handleChangeForCheckbox = () => {
    setInputsValue((prev) => ({
      ...prev,
      privacyPolicy: {
        value: !inputsValue.privacyPolicy.value,
        validity: !inputsValue.privacyPolicy.value,
      },
    }));
  };

  const handleValid = (e) => {
    e.preventDefault();
    setInputsValue({
      ...inputsValue,
      [e.target.name]: {
        ...inputsValue[e.target.name],
        touched: true,
      },
    });
  };

  const isFormInvalid = () => {
    return Object.values(inputsValue)
      .map(function (elem) {
        return elem.validity;
      })
      .includes(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsTryToSubmit(true);
    if (isFormInvalid()) {
      return;
    } else {
      setOpenFeedBackModal(true);
    }
  };

  return (
    <>
      <form className={styles.form} noValidate onSubmit={onSubmit}>
        <h1 className={styles.mainTitle}>Анкета соискателя</h1>
        <h2 className={styles.subscribeTitle}>Личные данные</h2>
        <div className={styles.input}>
          <Input
            titleForLabel="Имя *"
            className={`${
              (!inputsValue.firstname.validity && isTryToSubmit) ||
              (inputsValue.firstname.touched && !inputsValue.firstname.validity)
                ? styles.invalidClass
                : styles.validClass
            }`}
            type="text"
            name="firstname"
            placeholder="Имя"
            value={inputsValue.firstname.value}
            onChange={handleChange}
            onBlur={handleValid}
            pattern="[A-Za-zА-Яа-яЁё]*"
            invalidMsg={"В имени могут быть только буквы"}
            required={true}
            isInvalid={
              (!inputsValue.firstname.validity && isTryToSubmit) ||
              (inputsValue.firstname.touched && !inputsValue.firstname.validity)
                ? "В имени могут быть только буквы"
                : ""
            }
          />
          <Input
            titleForLabel="Фамилия *"
            className={`${
              (!inputsValue.secondname.validity && isTryToSubmit) ||
              (inputsValue.secondname.touched &&
                !inputsValue.secondname.validity)
                ? styles.invalidClass
                : styles.validClass
            }`}
            type="text"
            name="secondname"
            placeholder="Фамилия"
            value={inputsValue.secondname.value}
            onChange={handleChange}
            onBlur={handleValid}
            pattern="[A-Za-zА-Яа-яЁё]*"
            invalidMsg="В имени могут быть только буквы"
            isInvalid={
              (!inputsValue.secondname.validity && isTryToSubmit) ||
              (inputsValue.secondname.touched &&
                !inputsValue.secondname.validity)
            }
            required={true}
          />
        </div>
        <div className={styles.input}>
          <Input
            titleForLabel="Электронная почта *"
            className={`${
              (!inputsValue.email.validity && isTryToSubmit) ||
              (inputsValue.email.touched && !inputsValue.email.validity)
                ? styles.invalidClass
                : styles.validClass
            }`}
            type="email"
            name="email"
            placeholder="Электронная почта"
            value={inputsValue.email.value}
            onChange={handleChange}
            onBlur={handleValid}
            invalidMsg="Пожалуйста, укажите электронную почту"
            isInvalid={
              (!inputsValue.email.validity && isTryToSubmit) ||
              (inputsValue.email.touched && !inputsValue.email.validity)
            }
            required={true}
          />
          <div className={styles.resumeWrapper}>
            <FileInput
              type="file"
              multiple
              id="resume"
              name="resume"
              placeholder="Загрузить резюме"
              className={styles.resumeInput}
              onChange={handleChangeForFileInput}
            />
            {inputsValue.resume.value ? (
              <label htmlFor="resume" className={styles.resumeLabel}>
                <img
                  src={addedButton}
                  alt="кнопка удаления"
                  className={styles.resumeImgExit}
                  onClick={detachFile}
                />
                {inputsValue.resume.value}
              </label>
            ) : (
              <label htmlFor="resume" className={styles.resumeLabel}>
                <img
                  src={addedButton}
                  alt="кнопка добавления"
                  className={styles.resumeImg}
                />
                Загрузить резюме
              </label>
            )}
          </div>
        </div>
        <label className={styles.genderLabel}>
          Пол *
          <span className={styles.invalidMsgClass}>
            {inputsValue.gender.value.length === 0 && isTryToSubmit
              ? "Пожалуйста, укажите пол"
              : ""}
          </span>
          <div className={styles.genderInputsWrapper}>
            <input
              type="radio"
              name="gender"
              id="genderMale"
              value="Мужской"
              onChange={handleChange}
            />
            <label className={styles.genderWrapper} htmlFor="genderMale">
              Мужской
            </label>
            <input
              type="radio"
              name="gender"
              id="genderFemale"
              value="Женский"
              onChange={handleChange}
            />
            <label className={styles.genderWrapper} htmlFor="genderFemale">
              Женский
            </label>
          </div>
        </label>
        <h2 className={styles.subscribeTitle}>Github</h2>
        <label className={styles.label}>
          Вставьте ссылку на Github
          <input
            className={styles.validClass}
            type="text"
            name="link"
            placeholder="Вставьте ссылку на Github"
          />
        </label>
        <div className={styles.privacyInput}>
          <input
            className={styles.checkBoxInput}
            type="checkbox"
            name="privacyPolicy"
            checked={inputsValue.privacyPolicy.value}
            value={inputsValue.privacyPolicy.value}
            onChange={handleChangeForCheckbox}
          />
          <label htmlFor="privacyPolicy" className={styles.privacyPolicyLabel}>
            * Я согласен c{" "}
            <button
              type="button"
              onClick={() => setOpenPtivacyPolicyModal(true)}
              className={styles.privacyPolicyButton}
            >
              политикой конфиденциальности
            </button>
          </label>
          <span className={styles.invalidMsgClass}>
            {!inputsValue.privacyPolicy.value && isTryToSubmit
              ? "Пожалуйста, поставьте галочку"
              : ""}
          </span>
        </div>
        <Button
          title="Отправить"
          disabled={isFormInvalid()}
          className={buttonStyles.submitButton}
        />
      </form>
      <Modal
        open={openPrivacyPolicyModal}
        handleClose={() => setOpenPtivacyPolicyModal(false)}
        handleChangeForCheckbox={handleChangeForCheckbox}
      ></Modal>
      <FeedbackModal
        open={openFeedbackModal}
        handleClose={() => setOpenFeedBackModal(false)}
        candidateName={inputsValue.firstname.value}
      ></FeedbackModal>
    </>
  );
};

export default Form;
