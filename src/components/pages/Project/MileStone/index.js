import React, { useState, useEffect } from "react";
import "./milestone.css";
import { useHistory } from "react-router-dom";
import Modal from "../../../common/Model";
import DatePicker from "react-datepicker";
import Alert from "../../../common/Alert";
import {
  addProjectMilestone,
  getProjectMilestone,
  deleteMilestone,
  editProjectMilestone,
  setMileStoneID,
} from "../../../../redux/actions/projectActions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import MileStoneModal from "./MileStoneModal";

const ExampleCustomInput = ({ value, onClick }) => {
  return (
    <div>
      <input
        type="text"
        id="lname"
        className="example-custom-input"
        onClick={(e) => onClick(e.preventDefault())}
        value={value}
        style={{
          backgroundImage: "url(images/calendar.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
          backgroundOrigin: "content-box",
          padding: "10px",
        }}
      />
    </div>
  );
};

const MileStone = (props) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [ids, setID] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [showError, SetError] = useState(false);
  const [item, setItem] = useState({
    id: "",
    name: "",
    status: "",
    amount: "",
  });
  const { project, milestones } = useSelector((store) => store.project);
  const history = useHistory();
  const handleRouteChange = (id) => {
    let path = `./Task`;
    dispatch(setMileStoneID(id));
    history.push(path);
  };
  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    SetError(true);
    if (item.name && item.status && item.amount) {
      handleCreate();
      setIsOpen(false);
    }
  };
  const handleEdit = () => {
    let val = item;
    if (val.name && val.status && val.amount && startDate) {
      let req = {
        id: val.id,
        name: val.name,
        status: val.status.toLowerCase(),
        amount: val.amount,
        release_date: moment(startDate).format("YYYY-MM-DD"),
        project_id: project.id,
      };
      let formData = new FormData();
      Object.keys(req).map((key) => {
        formData.append(key, req[key]);
      });
      dispatch(editProjectMilestone(formData));
      setItem({
        id: "",
        name: "",
        status: "",
        amount: "",
      });
      setStartDate(new Date());
    }
    setIsOpenEdit(false);
    setItem({
      id: "",
      name: "",
      status: "",
      amount: "",
    });
  };
  const editItems = (id, e) => {
    e.preventDefault();
    setIsOpenEdit(true);
    let newEditItem = data.find((elem) => {
      return elem.id === id;
    });
    setItem(newEditItem);
  };

  useEffect(() => {
    dispatch(getProjectMilestone(project.id));
  }, [project]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchHandler();
    } else {
      setSearch(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (milestones.length > 0) {
      let newMileS = [];

      milestones.map((ms) => {
        newMileS.push({
          id: ms.id,
          name: ms.name,
          status: ms.status,
          amount: ms.amount,
          release_date: ms.release_date,
        });
      });

      setData(newMileS);
    } else {
      setData([]);
    }
  }, [milestones]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchHandler();
    } else {
      setFilteredProjects([]);
      setSearch(false);
    }
  }, [searchQuery]);

  const searchHandler = () => {
    let filterDAta = data.filter((newdata) =>
      newdata.name.includes(searchQuery)
    );
    if (filterDAta.length > 0) {
      setFilteredProjects(filterDAta);
    }
    
    setSearch(true);
  };

  const handleDelete = (index) => {
    dispatch(deleteMilestone(ids));
    setModalOpen(false);
  };
  const delAlert = (id) => {
    setModalOpen(true);
    setID(id);
  };
  const handleCreate = () => {
    // if (data.length > 0) {
    let val = item;
    if (val.name && val.status && val.amount && startDate) {
      let req = {
        name: val.name,
        status: val.status.toLowerCase(),
        amount: val.amount,
        release_date: moment(startDate).format("YYYY-MM-DD"),
        project_id: project.id,
      };
      let formData = new FormData();
      Object.keys(req).map((key) => {
        formData.append(key, req[key]);
      });
      dispatch(addProjectMilestone(formData));
      setItem({
        id: "",
        name: "",
        status: "",
        amount: "",
      });
      setStartDate(new Date());
    }
    // }
  };
const EditModal = () => {
  setIsOpenEdit(false)
  setItem({
        id: "",
        name: "",
        status: "",
        amount: "",
      });
}
  const TableData = ({ product, i }) => {
    return (
      <tr>
        <td>{product.name}</td>
                <td>{product.amount}</td>
                <td>{product.status}</td>
                <td style={{ width: "197px" }}>
                  <button onClick={() => delAlert(product.id)}>
                    <img src="images/Del.png" alt="logo" />
                  </button>
                  <button
                    onClick={(e) => {
                      editItems(product.id, e);
                    }}
                  >
                    <img src="images/Edit.png" alt="logo" />
                  </button>
                  <button onClick={() => handleRouteChange(product.id)}>
                    <img src="images/task.png" alt="logo" />
                  </button>
                </td>
      </tr>
    );
  };

  return (
    <div className="milestone-header">
      <Alert
        message="delete the Milestone"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        setOpenModal={setModalOpen}
        handleDelete={(id) => handleDelete(id)}
        id={ids}
      />

      <div style={{ padding:"5%" }}>
        <div style={{ display: "flex", marginBottom: "2%" }}>
          <img src="images/milestone.png" alt="Project-info-icon" />
          <h4 style={{ alignSelf: "center", paddingLeft: "10px" }}>
            {" "}
            Milestone
          </h4>
        </div>

        <div className="row">
          <div class="col-sm-6">
            <div class="col-sm-5">
              <div class="input-group">
                <input
                  class="form-control  border"
                  type="search"
                  id="example-search-input"
                  placeholder="Search here.."
                  value={searchQuery}
                  onChange={(value) => setSearchQuery(value.target.value)}
                  style={{
                    backgroundImage:
                      search === false ? "url(images/Search.png)" : "",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right",
                    backgroundOrigin: "content-box",
                    padding: "5px",
                    backgroundColor: "#f1f1f1",
                  }}
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div style={{ textAlign: "-webkit-right" }}>
              <button
                className="btn btn-outline-success float-right"
                style={{ backgroundColor: "#003366", color: "white" }}
                type="submit"
                onClick={() => setIsOpen(true)}
              >
                Add Milestone
              </button>
            </div>
          </div>
        </div>

        <div>
        <MileStoneModal header="Edit Milestone" isEdit={isOpenEdit} open={isOpenEdit} onClose={() => EditModal()} showError={showError} handleChange={handleChange} item={item} handleSave={handleEdit} startDate={startDate} setStartDate={setStartDate} ExampleCustomInput={ExampleCustomInput}/>
        <MileStoneModal header="Add Milestone" isEdit={isOpenEdit} open={isOpen} onClose={() => setIsOpen(false)} showError={showError} handleChange={handleChange} item={item} handleSave={handleSave} startDate={startDate} setStartDate={setStartDate} ExampleCustomInput={ExampleCustomInput}/>
         
        </div>

        <table class="mile-header">
          <tr>
            <th>
              Name <img src="images/Sort.png" alt="logo" />
            </th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {data.length == 0 && <h1>NO. MileStone present</h1>}
            {filteredProjects.length > 0
            ? filteredProjects.map((product, i) => {
                return <TableData product={product} i={i} />;
              })
            : data.map((product, i) => {
                return <TableData product={product} i={i} />;
              })}
        </table>

        <div className="d-grid gap-2 d-md-block">
          <div className="addrole_Button">
            {/* <button
              className="btn  float-left"
              type="submit"
              style={{ backgroundColor: "#25344b" }}
              onClick={() => {
                handleCreate();
              }}
            >
              Create
            </button> */}
            <button
              className="btn  float-left"
              type="submit"
              onClick={() => {
                history.goBack();
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MileStone;
