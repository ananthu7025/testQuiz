import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Modals.css";
import Select from "react-select";
import CategoryDataService from "../../services/categoryServices";
import { updateQuestion } from "../../redux/actions/questions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Components.css";
import CreatableSelect from "react-select/creatable";

const EditQuestion = ({ currentId, Editclose }) => {
  const [questionData, setQuestionData] = useState({
    question: "",
    right_option: [],
    category_id: [],
    question_type: "",
    options: [],
    expirence: [],
    _id: null,
  });
  const [catData, setCatData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentId) {
      setQuestionData(currentId);
      setCatData(retrieveCategories());
    }
  }, [currentId]);

  useEffect(() => {
    setValue(questionData.options.map((a) => createOption(a)));
    setRightOption(questionData.right_option.map((a) => createOption(a)))
  }, [questionData]);

  const setEditModal = () => {
    Editclose();
  };

  const retrieveCategories = () => {
    CategoryDataService.getAll()
      .then((res) => {
        setCatData(optionCreate(res.data));
      })
      .catch((err) => console.log(err));
  };
  const optionCreate = (data) => {
    let options = [];
    for (var i = 0; i < data.length; i++) {
      let obj = {};
      obj.value = data[i]._id;
      obj.label = data[i].category;
      options.push(obj);
    }
    return options;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      updateQuestion(questionData._id, {
        ...questionData,
        options: value.map((a) => a.value),
        right_option:rightOption.map((a) => a.value),
      })
    ).then(() => setEditModal());
  };

  const components = {
    DropdownIndicator: null,
  };

  const createOption = (label) => ({
    label,
    value: label,
  });

  const [inputValue, setInputValue] = React.useState("");
  const [value, setValue] = useState([]);
  const [rightOption, setRightOption] = useState([]);


  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");

        event.preventDefault();
    }
  };
  return (
    <>
      <ToastContainer />

      <div
        className="modal show fade"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.8)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Question
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setEditModal()}
              ></button>
            </div>
            <div className="modal-body">
              <div class="form-contact">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="Name" className="form-label">
                      Question Category
                    </label>
                    {
                      <Select
                        value={questionData ? questionData.category_id : null}
                        isMulti
                        isClearable={true}
                        onChange={(item) =>
                          setQuestionData({
                            ...questionData,
                            category_id: item,
                          })
                        }
                        isSearchable={true}
                        closeMenuOnSelect={true}
                        options={catData}
                      />
                    }
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Question
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={questionData ? questionData.question : null}
                      onChange={(e) =>
                        setQuestionData({
                          ...questionData,
                          question: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Options
                    </label>

                    <CreatableSelect
                      components={components}
                      inputValue={inputValue}
                      isClearable
                      isMulti
                      menuIsOpen={false}
                      onChange={(newValue) => setValue(newValue)}
                      onInputChange={(newValue) => setInputValue(newValue)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type something and press enter..."
                      value={value}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Question Type
                    </label>
                    <select
                      value={questionData ? questionData.question_type : null}
                      onChange={(e) =>
                        setQuestionData({
                          ...questionData,
                          question_type: e.target.value,
                        })
                      }
                      className="form-control"
                      id="select-questions"
                      class=" mt-2 "
                    >
                      <option value={"checkbox"}>Checkbox</option>
                      <option value="radio">Radio</option>
                    </select>
                  </div>
                  <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Correct answer
                      </label>
                      <Select
                        value={rightOption}
                        isMulti={questionData.question_type==="checkbox"}
                        isClearable={questionData.question_type==="checkbox"}
                        onChange={(item) => {
                          questionData.question_type==="checkbox"?setRightOption(item):setRightOption([item])
                        }}
                        isSearchable={true}
                        closeMenuOnSelect={true}
                        options={value}
                      />
                     
                    </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Expirence
                    </label>
                    <select
                      style={{ width: "100%" }}
                      class=" mt-2 "
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      required
                      value={questionData ? questionData.expirence : null}
                      onChange={(e) =>
                        setQuestionData({
                          ...questionData,
                          expirence: e.target.value,
                        })
                      }
                    >
                      <option value="Expert">Expert</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Beginner">Beginner</option>
                    </select>
                  </div>

                  
                  <button
                    type="submit"
                    className=" w-100 "
                    data-bs-dismiss="modal"
                  >
                    SUBMIT
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditQuestion;
