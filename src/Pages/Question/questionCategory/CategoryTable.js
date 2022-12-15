import React, { useEffect, useState } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import CategoryDelete from "../../../component/modals/CategoryDelete";
import EditCategory from "../../../component/modals/editCategory";

const CategoryTable = ({
  data,
  refreshList,
  deleteCategory,
  page,
  pageSize,
  handleStatusChange,
}) => {
  const [currentState, setCurrentState] = useState(1);
  const [newData, setNewData] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { category } = useSelector((state) => state.category);
  const [trigger, setTrigger] = useState("");
  
  useEffect(() => {
    setNewData(data);
  }, [category, currentState, data]);
  const Editclose = () => {
    setEditModal(false);
  };

  useEffect(() => {
    refreshListCall();
  }, [editModal, trigger]);

  const Deleteclose = () => {
    setDeleteModal(false);
  };

  const refreshListCall = () => {
    refreshList();
  };
  return (
    <>
      <div className="table-responsive project-list">
        {editModal ? (
          <EditCategory
            Id={currentState}
            data={data}
            refreshList={refreshList}
            Editclose={Editclose}
          />
        ) : (
          ""
        )}

        {deleteModal ? (
          <CategoryDelete
            Id={currentState}
            deleteCategory={deleteCategory}
            Deleteclose={Deleteclose}
          />
        ) : (
          ""
        )}
        <table className="table project-table table-centered table-nowrap">
          <thead>
            <tr class="border border-dark">
              <th scope="col">SL No</th>
              <th scope="col">Category Name </th>
              <th scope="col" className="p-2">
                Status
              </th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <br />
          <tbody>
            {newData?.map((item, i) => {
              return (
                <>
                  <tr>
                    <th>{(page - 1) * pageSize + (i + 1)}</th>
                    <td>{item.category}</td>
                    <td className="form-switch">
                      {
                        <input
                          className="form-check-input"
                          style={{ marginRight: "15px" }}
                          onChange={(e) => {
                            handleStatusChange(e, item.status, i);
                          }}
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                          checked={item.status === "true"}
                        />
                      }
                      {item.status == "true" ? "(Active)" : "(Not-Active)"}
                    </td>
                    <td>
                      <div className="action">
                        <div className="editCatBtn1">
                          <BsFillPencilFill
                            className="editCatBtn2"
                            type="button"
                            onClick={(e) => {
                              setCurrentState(
                                item._id
                              );
                              setEditModal(true);
                            }}
                          />
                        </div>
                        <div className="delCatBtn1">
                          <BsFillTrashFill
                            className="delCatBtn2 h5 m-0 text-danger mr-4"
                            type="button"
                            onClick={(e) => {
                              setCurrentState(
                                item
                              );
                              setDeleteModal(true);
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoryTable;
