import React, { useState } from "react";
import styles from "../Form/Form.module.scss";
import buttonStyles from "../Button/Button.module.scss";
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
    githubpage: { value: "" },
    gender: { value: "", validity: false, touched: false },
    resume: { value: "", validity: false, touched: false },
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
    e.preventDefault();
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
        value: e.target.value,
        touched: true,
        validity: e.target.validity.valid,
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
    if (isFormInvalid()) {
      return;
    } else {
      setOpenFeedBackModal(true);
    }
  };

  const handleCloseFeedbackModal = (e) => {
    setOpenFeedBackModal(false);
    setInputsValue({
      firstname: { value: "" },
      secondname: { value: "" },
      email: { value: "" },
      gender: { value: "" },
      resume: { value: "" },
      githubpage: { value: "" },
      privacyPolicy: { value: false },
    });
  };

  const handleClickForFileInput = (e) => {
    e.target.value = "";
  };

  const handleClickForButtonWrapper = () => {
    if (isFormInvalid) {
      setIsTryToSubmit(true);
    } else return null;
  };

  return (
    <>
      <form className={styles.form} noValidate onSubmit={onSubmit}>
        <h1 className={styles.mainTitle}>???????????? ????????????????????</h1>
        <h2 className={styles.subscribeTitle}>???????????? ????????????</h2>
        <div className={styles.input}>
          <Input
            titleForLabel="?????? *"
            className={`${
              inputsValue.firstname.touched && !inputsValue.firstname.validity
                ? styles.invalidClass
                : styles.validClass
            }`}
            type="text"
            name="firstname"
            placeholder="??????"
            value={inputsValue.firstname.value}
            onChange={handleChange}
            onBlur={handleValid}
            pattern="[A-Za-z??-????-??????]*"
            invalidMsg={"?? ?????????? ?????????? ???????? ???????????? ??????????"}
            required={true}
            isInvalid={
              (!inputsValue.firstname.validity && isTryToSubmit) ||
              (inputsValue.firstname.touched && !inputsValue.firstname.value) ||
              (inputsValue.firstname.value && !inputsValue.firstname.validity)
            }
          />
          <Input
            titleForLabel="?????????????? *"
            className={`${
              inputsValue.secondname.touched && !inputsValue.secondname.validity
                ? styles.invalidClass
                : styles.validClass
            }`}
            type="text"
            name="secondname"
            placeholder="??????????????"
            value={inputsValue.secondname.value}
            onChange={handleChange}
            onBlur={handleValid}
            pattern="[A-Za-z??-????-??????]*"
            invalidMsg="?? ?????????? ?????????? ???????? ???????????? ??????????"
            isInvalid={
              (!inputsValue.secondname.validity && isTryToSubmit) ||
              (inputsValue.secondname.touched &&
                !inputsValue.secondname.value) ||
              (inputsValue.secondname.value && !inputsValue.secondname.validity)
            }
            required={true}
          />
        </div>
        <div className={styles.input}>
          <Input
            titleForLabel="?????????????????????? ?????????? *"
            className={`${
              inputsValue.email.touched && !inputsValue.email.validity
                ? styles.invalidClass
                : styles.validClass
            }`}
            type="email"
            name="email"
            placeholder="?????????????????????? ??????????"
            value={inputsValue.email.value}
            onChange={handleChange}
            onBlur={handleValid}
            invalidMsg="????????????????????, ?????????????? ?????????????????????? ??????????"
            isInvalid={
              (!inputsValue.email.validity && isTryToSubmit) ||
              (inputsValue.email.touched && !inputsValue.email.value) ||
              (inputsValue.email.value && !inputsValue.email.validity)
            }
            required={true}
          />
          <div className={styles.resumeWrapper}>
            <FileInput
              type="file"
              multiple
              id="resume"
              name="resume"
              placeholder="?????????????????? ????????????"
              className={styles.resumeInput}
              onChange={handleChangeForFileInput}
              onClick={handleClickForFileInput}
              isInvalid={inputsValue.resume.value.length === 0 && isTryToSubmit}
              invalidMsg="????????????????????, ?????????????????? ????????????"
              required={true}
            />
            {inputsValue.resume.value ? (
              <label htmlFor="resume" className={styles.resumeLabel}>
                <img
                  src={addedButton}
                  alt="???????????? ????????????????"
                  className={styles.resumeImgExit}
                  onClick={detachFile}
                />
                {inputsValue.resume.value}
              </label>
            ) : (
              <label htmlFor="resume" className={styles.resumeLabel}>
                <img
                  src={addedButton}
                  alt="???????????? ????????????????????"
                  className={styles.resumeImg}
                />
                ?????????????????? ????????????
              </label>
            )}
          </div>
        </div>
        <label className={styles.genderLabel}>
          ?????? *
          <span className={styles.invalidMsgClass}>
            {(!inputsValue.gender.validity && isTryToSubmit) ||
            (inputsValue.gender.value.length === 0 &&
              inputsValue.gender.touched)
              ? "????????????????????, ?????????????? ??????"
              : ""}
          </span>
          <div className={styles.genderInputsWrapper}>
            <input
              type="radio"
              name="gender"
              id="genderMale"
              value="??????????????"
              onChange={handleChange}
            />
            <label className={styles.genderWrapper} htmlFor="genderMale">
              ??????????????
            </label>
            <input
              type="radio"
              name="gender"
              id="genderFemale"
              value="??????????????"
              onChange={handleChange}
            />
            <label className={styles.genderWrapper} htmlFor="genderFemale">
              ??????????????
            </label>
          </div>
        </label>
        <h2 className={styles.subscribeTitle}>Github</h2>
        <label className={styles.label}>
          ???????????????? ???????????? ???? Github
          <input
            className={styles.validClass}
            type="text"
            name="link"
            value={inputsValue.githubpage.value}
            onChange={handleChange}
            placeholder="???????????????? ???????????? ???? Github"
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
            * ?? ???????????????? c{" "}
            <button
              type="button"
              onClick={() => setOpenPtivacyPolicyModal(true)}
              className={styles.privacyPolicyButton}
            >
              ?????????????????? ????????????????????????????????????
            </button>
          </label>
          <span className={styles.invalidMsgClass}>
            {!inputsValue.privacyPolicy.value && isTryToSubmit
              ? "????????????????????, ?????????????????? ??????????????"
              : ""}
          </span>
        </div>
        <Button
          title="??????????????????"
          disabled={isFormInvalid()}
          className={buttonStyles.submitButton}
        >
          <div
            className={buttonStyles.buttonWrapper}
            onClick={handleClickForButtonWrapper}
          ></div>
        </Button>
      </form>
      <Modal
        open={openPrivacyPolicyModal}
        handleClose={() => setOpenPtivacyPolicyModal(false)}
        handleChangeForCheckbox={handleChangeForCheckbox}
      ></Modal>
      <FeedbackModal
        open={openFeedbackModal}
        handleClose={() => handleCloseFeedbackModal()}
        candidateName={inputsValue.firstname.value}
      ></FeedbackModal>
    </>
  );
};

export default Form;
