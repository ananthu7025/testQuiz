import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createQuestion } from "../../redux/actions/questions";
import "./Modals.css";
import Select from "react-select";
import CategoryDataService from "../../services/categoryServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatableSelect from "react-select/creatable";

const AddQuestion = () => {
  const [questionData, setQuestionData] = useState({
    question: "",
    right_option: [],
    category_id: [],
    question_type: "radio",
    options: [],
    expirence: "",
  });
  const [addModel, setAddModel] = useState(false);
  const [catData, setCatData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    retrieveCategories();
  }, []);

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
      if (data[i].status === "true") {
        obj.value = data[i]._id;
        obj.label = data[i].category;
        options.push(obj);
      }
    }

    return options;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createQuestion(questionData, setAddModel));
  };
  const addModelTrue = () => {
    setAddModel(true);
  };
  const [tags, setTags] = useState([""]);

  const addTag = (e) => {
    if (e.key === "Shift") {
      if (e.target.value.length > 0) {
        setTags([...tags, e.target.value]);
        e.target.value = "";
        setQuestionData({
          ...questionData,
          options: { ...tags },
        });
      }
    }
  };

  const removeTag = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };
  // console.log(tags);

  const components = {
    DropdownIndicator: null,
  };

  // interface Option {
  //   readonly label: string;
  //   readonly value: string;
  // }

  const createOption = (label) => ({
    label,
    value: label,
  });

  const [inputValue, setInputValue] = React.useState("");
  const [value, setValue] = useState([]);
  const [rightOption, setRightOption] = useState([]);

  // console.log(value.map(a => a.value),questionData,95)

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

  useEffect(() => {
    setQuestionData({
      ...questionData,
      options: value.map((a) => a.value),
    });
    console.log(value,112)
  }, [value]);

  useEffect(() => {
    setQuestionData({
      ...questionData,
      right_option: rightOption.map((a) => a.value),
    });
    console.log(rightOption,112,questionData)
  }, [rightOption]);

  return (
    <div>
      <ToastContainer />
      <button type="button" class="addQButton" onClick={addModelTrue}>
        ADD
      </button>

      {addModel ? (
        <div
          className="modal show fade"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Question
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setAddModel(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div class="form-contact">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="Name" className="form-label">
                        Question Category
                      </label>
                      <Select
                        isMulti
                        isClearable={true}
                        onChange={(item) => {
                          setQuestionData({
                            ...questionData,
                            category_id: item,
                          });
                          
                        }}
                        isSearchable={true}
                        closeMenuOnSelect={true}
                        options={catData}
                      />
                      <div class="invalid-feedback">
                        Please fill out this field.
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Question
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        required
                        value={questionData.question}
                        onChange={(e) => {
                          setQuestionData({
                            ...questionData,
                            question: e.target.value,
                          });
                        }}
                      />
                      <div class="invalid-feedback">
                        Please fill out this field.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
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
                        placeholder="Type options and press enter..."
                        value={value}
                      />
                      <div class="invalid-feedback">
                        Please fill out this field.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Question Type
                      </label>
                      <select
                        value={questionData.question_type}
                        onChange={(e) =>
                          setQuestionData({
                            ...questionData,
                            question_type: e.target.value,
                          })
                        }
                        id="select-questions"
                        class=" mt-2"
                        className="form-control"
                        aria-describedby="emailHelp"
                        required
                      >
                        <option value="checkbox">Checkbox</option>
                        <option value="radio">Radio</option>
                      </select>

                      <div class="invalid-feedback">
                        Please fill out this field.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Correct answer
                      </label>
                      <Select
                        isMulti={questionData.question_type==="checkbox"}
                        isClearable={questionData.question_type==="checkbox"}
                        onChange={(item) => {
                          questionData.question_type==="checkbox"?setRightOption(item):setRightOption([item])
                        }}
                        isSearchable={true}
                        closeMenuOnSelect={true}
                        options={value}
                      />
                     
                      <div class="invalid-feedback">
                        Please fill out this field.
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Level
                      </label>
                      <select
                        style={{ width: "100%" }}
                        class=" mt-2 "
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        required
                        value={questionData.expirence}
                        onChange={(e) =>
                          setQuestionData({
                            ...questionData,
                            expirence: e.target.value,
                          })
                        }
                      >
                        <option value="">All</option>
                        <option value="Expert">Expert</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Beginner">Beginner</option>
                      </select>
                      <div class="invalid-feedback">
                        Please fill out this field.
                      </div>
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
      ) : (
        ""
      )}
    </div>
  );
};

export default AddQuestion;
